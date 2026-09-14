// 牛客风格题库页面：目录 + 分册 + 题目详情 + 本地样例验证
(function () {
  const guide = window.NOWCODER_GUIDE;
  const catalog = window.NOWCODER_CATALOG;
  const problems = window.NOWCODER_PROBLEMS;

  let currentLevel = "all";
  let currentFile = null;
  let currentId = null;
  let view = "home"; // home | problem
  let serverOnline = false;

  const levelTabsEl = document.getElementById("levelTabs");
  const batchListEl = document.getElementById("batchList");
  const listEl = document.getElementById("list");
  const contentEl = document.getElementById("content");
  const searchEl = document.getElementById("search");
  const toastEl = document.getElementById("toast");
  const headerSub = document.getElementById("headerSub");
  const serverBadge = document.getElementById("serverBadge");

  if (guide && guide.summary) headerSub.textContent = guide.summary + " · 牛客网风格";

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function levelName(id) {
    const lv = catalog.find((x) => x.id === id);
    return lv ? lv.name : id;
  }

  function codeKey(id) {
    return "cpp-practice-code:" + id;
  }

  function loadSavedCode(id, fallback) {
    try {
      const v = localStorage.getItem(codeKey(id));
      if (v != null && v !== "") return v;
    } catch (_) {}
    return fallback || "";
  }

  function saveCode(id, code) {
    try {
      localStorage.setItem(codeKey(id), code);
    } catch (_) {}
  }

  function starterCode() {
    return `#include <iostream>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);

    // TODO: 在这里写你的代码

    return 0;
}
`;
  }

  const INDENT = "    "; // 4 空格，符合常见 C++ 习惯

  function enableSmartIndent(editor) {
    if (!editor || editor.dataset.smartIndent === "1") return;
    editor.dataset.smartIndent = "1";

    function lineStart(pos) {
      const v = editor.value;
      let i = pos;
      while (i > 0 && v[i - 1] !== "\n") i--;
      return i;
    }

    function lineEnd(pos) {
      const v = editor.value;
      let i = pos;
      while (i < v.length && v[i] !== "\n") i++;
      return i;
    }

    function leadingWs(line) {
      const m = line.match(/^[ \t]*/);
      return m ? m[0] : "";
    }

    function replaceRange(start, end, text) {
      const v = editor.value;
      editor.value = v.slice(0, start) + text + v.slice(end);
      const caret = start + text.length;
      editor.selectionStart = editor.selectionEnd = caret;
      editor.dispatchEvent(new Event("input", { bubbles: true }));
    }

    function indentSelection() {
      const v = editor.value;
      let start = editor.selectionStart;
      let end = editor.selectionEnd;
      if (start === end) {
        replaceRange(start, end, INDENT);
        return;
      }
      const from = lineStart(start);
      const to = lineEnd(end);
      const block = v.slice(from, to);
      const indented = block
        .split("\n")
        .map((line) => INDENT + line)
        .join("\n");
      editor.value = v.slice(0, from) + indented + v.slice(to);
      editor.selectionStart = from;
      editor.selectionEnd = from + indented.length;
      editor.dispatchEvent(new Event("input", { bubbles: true }));
    }

    function unindentSelection() {
      const v = editor.value;
      let start = editor.selectionStart;
      let end = editor.selectionEnd;
      const from = lineStart(start);
      const to = start === end ? lineEnd(start) : lineEnd(end);
      const block = v.slice(from, to);
      const out = block
        .split("\n")
        .map((line) => {
          if (line.startsWith(INDENT)) return line.slice(INDENT.length);
          if (line.startsWith("\t")) return line.slice(1);
          if (line.startsWith(" ")) return line.replace(/^ {1,4}/, "");
          return line;
        })
        .join("\n");
      editor.value = v.slice(0, from) + out + v.slice(to);
      const shrink = block.length - out.length;
      if (start === end) {
        editor.selectionStart = editor.selectionEnd = Math.max(from, start - Math.min(INDENT.length, shrink));
      } else {
        editor.selectionStart = from;
        editor.selectionEnd = from + out.length;
      }
      editor.dispatchEvent(new Event("input", { bubbles: true }));
    }

    editor.addEventListener("keydown", (e) => {
      // Tab / Shift+Tab
      if (e.key === "Tab") {
        e.preventDefault();
        if (e.shiftKey) unindentSelection();
        else indentSelection();
        return;
      }

      // Enter：继承缩进；上一行以 { 结尾则再缩进一层；光标夹在 {|} 之间则自动换行对齐 }
      if (e.key === "Enter" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        e.preventDefault();
        const v = editor.value;
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        const ls = lineStart(start);
        const before = v.slice(ls, start);
        const afterInLine = v.slice(end, lineEnd(end));
        const baseIndent = leadingWs(before);
        const trimmedRight = before.replace(/[ \t]+$/g, "");
        const openBrace = /\{\s*$/.test(trimmedRight);
        const nextIsClose = /^\s*\}/.test(afterInLine);

        let insert = "\n" + baseIndent;
        if (openBrace) insert += INDENT;

        // for/while/if/else/switch 后紧跟 { 已覆盖；若写成 for(...) 下一行再写 {，只继承原缩进即可
        if (openBrace && nextIsClose) {
          // {
          //     |
          // }
          insert = "\n" + baseIndent + INDENT + "\n" + baseIndent;
          editor.value = v.slice(0, start) + insert + v.slice(end);
          const caret = start + ("\n" + baseIndent + INDENT).length;
          editor.selectionStart = editor.selectionEnd = caret;
        } else {
          editor.value = v.slice(0, start) + insert + v.slice(end);
          editor.selectionStart = editor.selectionEnd = start + insert.length;
        }
        editor.dispatchEvent(new Event("input", { bubbles: true }));
        return;
      }

      // 单独输入 }：若当前行只有空白，回退一层缩进
      if (e.key === "}") {
        const v = editor.value;
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        if (start !== end) return;
        const ls = lineStart(start);
        const prefix = v.slice(ls, start);
        if (/^[ \t]+$/.test(prefix) && prefix.length >= INDENT.length) {
          e.preventDefault();
          const dedented = prefix.slice(0, Math.max(0, prefix.length - INDENT.length)) + "}";
          replaceRange(ls, start, dedented);
        }
      }
    });
  }

  function filteredProblems() {
    const q = searchEl.value.trim().toLowerCase();
    return problems.filter((p) => {
      if (currentLevel !== "all" && p.level !== currentLevel) return false;
      if (currentFile && p.file !== currentFile) return false;
      if (!q) return true;
      return (
        p.title.toLowerCase().includes(q) ||
        String(p.num).includes(q) ||
        p.id.toLowerCase().includes(q) ||
        (p.hint || "").toLowerCase().includes(q) ||
        (p.file || "").toLowerCase().includes(q)
      );
    });
  }

  function currentBatches() {
    if (currentLevel === "all") {
      return catalog.flatMap((lv) =>
        lv.files.map((f) => ({ ...f, level: lv.id, levelName: lv.name }))
      );
    }
    const lv = catalog.find((x) => x.id === currentLevel);
    if (!lv) return [];
    return lv.files.map((f) => ({ ...f, level: lv.id, levelName: lv.name }));
  }

  function renderTabs() {
    levelTabsEl.innerHTML = "";
    const tabs = [{ id: "all", name: "全部" }].concat(
      catalog.map((lv) => ({ id: lv.id, name: `${lv.name}${lv.count}` }))
    );
    tabs.forEach((t) => {
      const btn = document.createElement("button");
      btn.textContent = t.name;
      btn.className = currentLevel === t.id ? "active" : "";
      btn.onclick = () => {
        currentLevel = t.id;
        currentFile = null;
        view = "home";
        renderAll();
      };
      levelTabsEl.appendChild(btn);
    });
  }

  function renderBatches() {
    batchListEl.innerHTML = "";
    const batches = currentBatches();
    batches.forEach((b) => {
      const el = document.createElement("button");
      el.className = "batch-item" + (currentFile === b.file ? " active" : "");
      el.innerHTML = `
        <div class="batch-title">${escapeHtml(b.levelName)} · ${escapeHtml(b.range)}</div>
        <div class="batch-meta">${escapeHtml(b.topic)}</div>`;
      el.onclick = () => {
        currentLevel = b.level;
        currentFile = b.file;
        view = "home";
        const items = filteredProblems();
        if (items.length) selectProblem(items[0].id);
        else renderAll();
      };
      batchListEl.appendChild(el);
    });
  }

  function renderList() {
    const items = filteredProblems();
    listEl.innerHTML = "";
    items.forEach((p) => {
      const li = document.createElement("li");
      li.className = p.id === currentId ? "active" : "";
      li.innerHTML = `
        <div>
          <div class="title">${escapeHtml(p.title)}</div>
          <div class="point">${escapeHtml(p.file)} · 第 ${p.num} 题</div>
        </div>
        <div class="id">#${p.num}</div>`;
      li.onclick = () => selectProblem(p.id);
      listEl.appendChild(li);
    });
    if (!items.length) {
      listEl.innerHTML = '<li style="cursor:default">没有匹配的题目</li>';
    }
  }

  function renderHome() {
    let html = `
      <div class="guide-card">
        <h2>C++ 分梯度题库（牛客网风格）</h2>
        <p>${escapeHtml(guide.summary)}</p>
        <p>${escapeHtml(guide.format)}</p>
        <p>代码约定：${escapeHtml(guide.convention)}</p>
        <p><strong style="color:var(--text)">样例验证</strong></p>
        <ul>
          <li>先运行 <code>start-verify.bat</code>（或 <code>node verify-server.js</code>）</li>
          <li>用浏览器打开 <code>http://127.0.0.1:3789/</code>（不要直接双击 html）</li>
          <li>选题后在编辑器写代码，点「提交验证」对照样例判题</li>
        </ul>
        <p><strong style="color:var(--text)">建议做题顺序</strong></p>
        <ul>${guide.order.map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
      </div>`;

    const levelsToShow =
      currentLevel === "all" ? catalog : catalog.filter((x) => x.id === currentLevel);

    levelsToShow.forEach((lv) => {
      html += `<div class="level-block">
        <h3><span class="badge level">${escapeHtml(lv.name)}</span> ${lv.count} 题｜${escapeHtml(lv.desc)}</h3>
        <div class="file-grid">`;
      lv.files.forEach((f) => {
        html += `<button class="file-card" data-level="${lv.id}" data-file="${escapeHtml(f.file)}">
          <div class="name">${escapeHtml(f.file)}</div>
          <div class="meta">题号 ${escapeHtml(f.range)} · ${escapeHtml(f.topic)}</div>
        </button>`;
      });
      html += `</div></div>`;
    });

    contentEl.innerHTML = html;
    contentEl.querySelectorAll(".file-card").forEach((card) => {
      card.onclick = () => {
        currentLevel = card.getAttribute("data-level");
        currentFile = card.getAttribute("data-file");
        const items = filteredProblems();
        if (items.length) selectProblem(items[0].id);
        else renderAll();
      };
    });
  }

  function statusClass(st) {
    if (st === "AC") return "ok";
    if (st === "WA" || st === "CE" || st === "RE" || st === "TLE") return "bad";
    return "";
  }

  function renderVerifyResult(data) {
    const box = document.getElementById("verifyResult");
    if (!box) return;
    if (!data || !data.ok) {
      box.innerHTML = `<div class="verify-summary bad">${escapeHtml(
        (data && data.error) || "验证失败"
      )}</div>`;
      return;
    }
    const s = data.summary;
    let html = `<div class="verify-summary ${s.allPassed ? "ok" : "bad"}">
      ${s.allPassed ? "全部通过" : "未全部通过"}：${s.passed}/${s.total}
    </div>`;

    data.results.forEach((r) => {
      html += `<div class="case-card ${statusClass(r.status)}">
        <div class="case-head">
          <strong>${escapeHtml(r.name)}</strong>
          <span class="case-status">${escapeHtml(r.status)} · ${escapeHtml(r.message)}</span>
        </div>`;
      if (r.status === "CE" || r.compileLog) {
        html += `<div class="case-label">编译/错误信息</div><pre>${escapeHtml(
          r.compileLog || r.message
        )}</pre>`;
      }
      if (r.status === "WA" || r.status === "RE" || r.status === "TLE") {
        html += `<div class="case-grid">
          <div><div class="case-label">输入</div><pre>${escapeHtml(r.input || "(空)")}</pre></div>
          <div><div class="case-label">期望输出</div><pre>${escapeHtml(r.expected)}</pre></div>
          <div><div class="case-label">你的输出</div><pre>${escapeHtml(r.actual || "(空)")}</pre></div>
        </div>`;
        if (r.diffs && r.diffs.length) {
          html += `<div class="case-label">差异（前几处）</div><ul class="diff-list">`;
          r.diffs.forEach((d) => {
            html += `<li>第 ${d.line} 行：期望 <code>${escapeHtml(
              d.expected
            )}</code> ，实际 <code>${escapeHtml(d.actual)}</code></li>`;
          });
          html += `</ul>`;
        }
      }
      if (r.status === "AC") {
        html += `<div class="case-label">输出正确</div><pre>${escapeHtml(r.actual)}</pre>`;
      }
      html += `</div>`;
    });
    box.innerHTML = html;
  }

  async function submitVerify() {
    const p = problems.find((x) => x.id === currentId);
    const editor = document.getElementById("codeEditor");
    const box = document.getElementById("verifyResult");
    if (!p || !editor) return;

    const code = editor.value;
    saveCode(p.id, code);

    if (!serverOnline) {
      renderVerifyResult({
        ok: false,
        error:
          "验证服务未启动。请先运行 start-verify.bat，然后打开 http://127.0.0.1:3789/",
      });
      return;
    }

    box.innerHTML = `<div class="verify-summary">正在编译并验证样例…</div>`;
    const btn = document.getElementById("submitBtn");
    if (btn) btn.disabled = true;

    try {
      const resp = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code,
          sampleIn: p.sampleIn,
          sampleOut: p.sampleOut,
          cases: [
            {
              name: "样例1",
              input: p.sampleIn,
              output: p.sampleOut,
            },
          ],
        }),
      });
      const data = await resp.json();
      renderVerifyResult(data);
      if (data.ok && data.summary && data.summary.allPassed) {
        showToast("样例全部通过");
      } else if (data.ok) {
        showToast("存在未通过样例");
      }
    } catch (e) {
      renderVerifyResult({
        ok: false,
        error: "无法连接验证服务，请确认已启动 start-verify.bat",
      });
      serverOnline = false;
      updateServerBadge();
    } finally {
      if (btn) btn.disabled = false;
    }
  }

  function renderProblem(p) {
    view = "problem";
    currentId = p.id;
    currentLevel = p.level;
    currentFile = p.file;
    const saved = loadSavedCode(p.id, starterCode());

    contentEl.innerHTML = `
      <div class="problem-view">
        <div class="problem-head">
          <div>
            <h2>第 ${p.num} 题 · ${escapeHtml(p.title)}</h2>
            <div class="badges">
              <span class="badge level">${escapeHtml(levelName(p.level))}</span>
              <span class="badge">${escapeHtml(p.file)}</span>
              <span class="badge">${escapeHtml(p.id)}</span>
            </div>
          </div>
          <div class="toolbar">
            <button id="backHomeBtn" class="ghost">返回目录</button>
            <button id="copyInlineBtn" class="ghost">复制参考代码</button>
          </div>
        </div>

        <div class="oj-block"><h3>【题目描述】</h3><div class="body">${escapeHtml(p.desc)}</div></div>
        <div class="oj-block"><h3>【输入描述】</h3><div class="body">${escapeHtml(p.inputDesc)}</div></div>
        <div class="oj-block"><h3>【输出描述】</h3><div class="body">${escapeHtml(p.outputDesc)}</div></div>
        <div class="oj-block"><h3>【输入样例】</h3><pre>${escapeHtml(p.sampleIn)}</pre></div>
        <div class="oj-block"><h3>【输出样例】</h3><pre>${escapeHtml(p.sampleOut)}</pre></div>
        <div class="oj-block"><h3>【提示】</h3><div class="body">${escapeHtml(p.hint)}</div></div>
        <div class="oj-block"><h3>【C++参考代码】</h3><pre id="codeBlock">${escapeHtml(p.code)}</pre></div>

        <div class="oj-block editor-block">
          <h3>【在线作答】</h3>
          <div class="editor-toolbar">
            <button id="loadRefBtn" class="ghost">填入参考代码</button>
            <button id="resetCodeBtn" class="ghost">重置模板</button>
            <button id="submitBtn" class="primary">提交验证</button>
          </div>
          <textarea id="codeEditor" spellcheck="false">${escapeHtml(saved)}</textarea>
          <div id="verifyResult" class="verify-result"></div>
        </div>
      </div>`;

    document.getElementById("backHomeBtn").onclick = () => {
      const editor = document.getElementById("codeEditor");
      if (editor) saveCode(p.id, editor.value);
      view = "home";
      currentId = null;
      renderAll();
    };
    document.getElementById("copyInlineBtn").onclick = copyCode;
    document.getElementById("loadRefBtn").onclick = () => {
      document.getElementById("codeEditor").value = p.code;
      saveCode(p.id, p.code);
      showToast("已填入参考代码");
    };
    document.getElementById("resetCodeBtn").onclick = () => {
      document.getElementById("codeEditor").value = starterCode();
      saveCode(p.id, starterCode());
    };
    document.getElementById("submitBtn").onclick = submitVerify;
    const editor = document.getElementById("codeEditor");
    editor.addEventListener("input", (e) => {
      saveCode(p.id, e.target.value);
    });
    enableSmartIndent(editor);
    // 提示：Tab 缩进，Shift+Tab 取消缩进，Enter 自动对齐
    if (!document.getElementById("indentHint")) {
      const tip = document.createElement("div");
      tip.id = "indentHint";
      tip.className = "indent-hint";
      tip.textContent = "编辑提示：Tab 缩进 · Shift+Tab 取消缩进 · Enter 自动对齐（遇到 { 会多缩进一层）";
      editor.parentElement.insertBefore(tip, editor);
    }

    renderTabs();
    renderBatches();
    renderList();
  }

  function selectProblem(id) {
    const prev = document.getElementById("codeEditor");
    if (prev && currentId) saveCode(currentId, prev.value);
    const p = problems.find((x) => x.id === id);
    if (!p) return;
    renderProblem(p);
  }

  async function copyCode() {
    const p = problems.find((x) => x.id === currentId);
    if (!p) {
      showToast("请先选择一道题");
      return;
    }
    try {
      await navigator.clipboard.writeText(p.code);
      showToast("已复制参考代码");
    } catch (e) {
      showToast("复制失败，请手动全选代码");
    }
  }

  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.style.display = "block";
    setTimeout(() => (toastEl.style.display = "none"), 2000);
  }

  function randomPick() {
    const items = filteredProblems();
    if (!items.length) return;
    selectProblem(items[Math.floor(Math.random() * items.length)].id);
  }

  function updateServerBadge() {
    if (!serverBadge) return;
    if (serverOnline) {
      serverBadge.textContent = "验证服务：已连接";
      serverBadge.className = "server-badge on";
    } else {
      serverBadge.textContent = "验证服务：未连接";
      serverBadge.className = "server-badge off";
    }
  }

  async function checkServer() {
    try {
      const resp = await fetch("/api/health", { cache: "no-store" });
      const data = await resp.json();
      serverOnline = !!(data && data.ok);
    } catch (_) {
      serverOnline = false;
    }
    updateServerBadge();
  }

  function renderAll() {
    renderTabs();
    renderBatches();
    renderList();
    if (view === "problem" && currentId) {
      const p = problems.find((x) => x.id === currentId);
      if (p) {
        renderProblem(p);
        return;
      }
    }
    renderHome();
  }

  document.getElementById("copyBtn").onclick = copyCode;
  document.getElementById("randomBtn").onclick = randomPick;
  document.getElementById("homeBtn").onclick = () => {
    const editor = document.getElementById("codeEditor");
    if (editor && currentId) saveCode(currentId, editor.value);
    view = "home";
    currentId = null;
    currentFile = null;
    renderAll();
  };
  searchEl.oninput = () => {
    renderBatches();
    renderList();
    if (view === "home") renderHome();
  };

  checkServer();
  setInterval(checkServer, 5000);
  renderAll();
})();
