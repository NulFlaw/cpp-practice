// 牛客题库 + C++ 八股：目录 / 详情 / 本地样例验证
(function () {
  const guide = window.NOWCODER_GUIDE;
  const catalog = window.NOWCODER_CATALOG;
  const problems = window.NOWCODER_PROBLEMS;
  const baguGuide = window.BAGU_GUIDE;
  const baguCatalog = window.BAGU_CATALOG || [];
  const baguQuestions = window.BAGU_QUESTIONS || [];

  let mode = "oj"; // oj | bagu
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
  const copyBtn = document.getElementById("copyBtn");
  const footerEl = document.getElementById("footer");

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function inlineMd(s) {
    let t = escapeHtml(s);
    t = t.replace(/`([^`]+)`/g, "<code>$1</code>");
    t = t.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
    return t;
  }

  /** 轻量 Markdown → HTML（列表 / 表格 / 段落） */
  function renderMd(md) {
    if (!md) return "";
    const lines = String(md).replace(/\r\n/g, "\n").split("\n");
    const out = [];
    let i = 0;

    function flushPara(buf) {
      const text = buf.join(" ").trim();
      if (text) out.push(`<p>${inlineMd(text)}</p>`);
      buf.length = 0;
    }

    while (i < lines.length) {
      const line = lines[i];

      if (!line.trim()) {
        i++;
        continue;
      }

      // 表格
      if (
        line.includes("|") &&
        i + 1 < lines.length &&
        /^\s*\|?[\s-:|]+\|?\s*$/.test(lines[i + 1])
      ) {
        const rows = [];
        while (i < lines.length && lines[i].includes("|")) {
          if (/^\s*\|?[\s-:|]+\|?\s*$/.test(lines[i])) {
            i++;
            continue;
          }
          const cells = lines[i]
            .replace(/^\s*\|/, "")
            .replace(/\|\s*$/, "")
            .split("|")
            .map((c) => c.trim());
          rows.push(cells);
          i++;
        }
        if (rows.length) {
          let html = "<table><thead><tr>";
          rows[0].forEach((c) => {
            html += `<th>${inlineMd(c)}</th>`;
          });
          html += "</tr></thead><tbody>";
          rows.slice(1).forEach((r) => {
            html += "<tr>";
            r.forEach((c) => {
              html += `<td>${inlineMd(c)}</td>`;
            });
            html += "</tr>";
          });
          html += "</tbody></table>";
          out.push(html);
        }
        continue;
      }

      // 无序 / 有序列表
      if (/^\s*[-*]\s+/.test(line) || /^\s*\d+\.\s+/.test(line)) {
        const ordered = /^\s*\d+\.\s+/.test(line);
        const tag = ordered ? "ol" : "ul";
        const items = [];
        while (i < lines.length) {
          const L = lines[i];
          const m = ordered
            ? L.match(/^\s*\d+\.\s+(.*)$/)
            : L.match(/^\s*[-*]\s+(.*)$/);
          if (!m) break;
          items.push(`<li>${inlineMd(m[1])}</li>`);
          i++;
        }
        out.push(`<${tag}>${items.join("")}</${tag}>`);
        continue;
      }

      // 普通段落（连续非空、非特殊行）
      const buf = [];
      while (
        i < lines.length &&
        lines[i].trim() &&
        !lines[i].includes("|") &&
        !/^\s*[-*]\s+/.test(lines[i]) &&
        !/^\s*\d+\.\s+/.test(lines[i])
      ) {
        buf.push(lines[i].trim());
        i++;
      }
      flushPara(buf);
    }

    return out.join("");
  }

  function levelName(id) {
    const lv = catalog.find((x) => x.id === id);
    return lv ? lv.name : id;
  }

  function topicName(id) {
    const t = baguCatalog.find((x) => x.id === id);
    return t ? t.name : id;
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

  const INDENT = "    ";

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
        editor.selectionStart = editor.selectionEnd = Math.max(
          from,
          start - Math.min(INDENT.length, shrink)
        );
      } else {
        editor.selectionStart = from;
        editor.selectionEnd = from + out.length;
      }
      editor.dispatchEvent(new Event("input", { bubbles: true }));
    }

    editor.addEventListener("keydown", (e) => {
      if (e.key === "Tab") {
        e.preventDefault();
        if (e.shiftKey) unindentSelection();
        else indentSelection();
        return;
      }

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

        if (openBrace && nextIsClose) {
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

      if (e.key === "}") {
        const v = editor.value;
        const start = editor.selectionStart;
        const end = editor.selectionEnd;
        if (start !== end) return;
        const ls = lineStart(start);
        const prefix = v.slice(ls, start);
        if (/^[ \t]+$/.test(prefix) && prefix.length >= INDENT.length) {
          e.preventDefault();
          const dedented =
            prefix.slice(0, Math.max(0, prefix.length - INDENT.length)) + "}";
          replaceRange(ls, start, dedented);
        }
      }
    });
  }

  function updateChrome() {
    if (mode === "oj") {
      if (guide && guide.summary) {
        headerSub.textContent = guide.summary + " · 牛客网风格";
      }
      searchEl.placeholder = "搜题目 / 编号 / 专题";
      copyBtn.textContent = "复制参考代码";
      copyBtn.style.display = "";
      if (serverBadge) serverBadge.style.display = "";
      if (footerEl) {
        footerEl.innerHTML =
          '验证：运行 <code>start-verify.bat</code> 后打开 <code>http://127.0.0.1:3789/</code> → 选题写代码 → 点「提交验证」。也可切换到「八股」浏览面试问答。';
      }
    } else {
      if (baguGuide && baguGuide.summary) {
        headerSub.textContent = baguGuide.summary + " · 面试口述";
      }
      searchEl.placeholder = "搜问题 / 专题 / 关键词";
      copyBtn.textContent = "复制答要点";
      copyBtn.style.display = "";
      if (serverBadge) serverBadge.style.display = "none";
      if (footerEl) {
        footerEl.innerHTML =
          "八股模式：左侧按专题浏览，右侧看答要点与追问。建议结合项目经历口述，不要死记。";
      }
    }

    document.querySelectorAll("#modeTabs button").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-mode") === mode);
    });
  }

  function setMode(next) {
    if (next === mode) return;
    const editor = document.getElementById("codeEditor");
    if (editor && currentId && mode === "oj") saveCode(currentId, editor.value);
    mode = next;
    currentLevel = "all";
    currentFile = null;
    currentId = null;
    view = "home";
    updateChrome();
    renderAll();
  }

  // ---------- 刷题数据过滤 ----------
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

  function currentBatchesOj() {
    if (currentLevel === "all") {
      return catalog.flatMap((lv) =>
        lv.files.map((f) => ({ ...f, level: lv.id, levelName: lv.name }))
      );
    }
    const lv = catalog.find((x) => x.id === currentLevel);
    if (!lv) return [];
    return lv.files.map((f) => ({ ...f, level: lv.id, levelName: lv.name }));
  }

  // ---------- 八股数据过滤 ----------
  function filteredBagu() {
    const q = searchEl.value.trim().toLowerCase();
    return baguQuestions.filter((item) => {
      if (currentLevel !== "all" && item.topic !== currentLevel) return false;
      if (currentFile && item.file !== currentFile) return false;
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        String(item.num).includes(q) ||
        item.id.toLowerCase().includes(q) ||
        (item.answer || "").toLowerCase().includes(q) ||
        (item.followUp || "").toLowerCase().includes(q) ||
        (item.topicName || "").toLowerCase().includes(q) ||
        (item.file || "").toLowerCase().includes(q)
      );
    });
  }

  function currentBatchesBagu() {
    const list =
      currentLevel === "all"
        ? baguCatalog
        : baguCatalog.filter((t) => t.id === currentLevel);
    return list.map((t) => ({
      level: t.id,
      levelName: t.name,
      file: t.file,
      range: `Q1～Q${t.count}`,
      topic: t.desc,
      count: t.count,
    }));
  }

  function renderTabs() {
    levelTabsEl.innerHTML = "";
    if (mode === "oj") {
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
    } else {
      const tabs = [{ id: "all", name: "全部" }].concat(
        baguCatalog.map((t) => ({ id: t.id, name: t.name }))
      );
      tabs.forEach((t) => {
        const btn = document.createElement("button");
        btn.textContent = t.name;
        btn.title = t.name;
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
  }

  function renderBatches() {
    batchListEl.innerHTML = "";
    if (mode === "oj") {
      currentBatchesOj().forEach((b) => {
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
    } else {
      currentBatchesBagu().forEach((b) => {
        const el = document.createElement("button");
        el.className = "batch-item" + (currentFile === b.file ? " active" : "");
        el.innerHTML = `
          <div class="batch-title">${escapeHtml(b.levelName)} · ${b.count} 题</div>
          <div class="batch-meta">${escapeHtml(b.topic)}</div>`;
        el.onclick = () => {
          currentLevel = b.level;
          currentFile = b.file;
          view = "home";
          const items = filteredBagu();
          if (items.length) selectBagu(items[0].id);
          else renderAll();
        };
        batchListEl.appendChild(el);
      });
    }
  }

  function renderList() {
    listEl.innerHTML = "";
    if (mode === "oj") {
      const items = filteredProblems();
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
    } else {
      const items = filteredBagu();
      items.forEach((q) => {
        const li = document.createElement("li");
        li.className = q.id === currentId ? "active" : "";
        li.innerHTML = `
          <div>
            <div class="title">${escapeHtml(q.title)}</div>
            <div class="point">${escapeHtml(q.topicName)} · Q${q.num}</div>
          </div>
          <div class="id">Q${q.num}</div>`;
        li.onclick = () => selectBagu(q.id);
        listEl.appendChild(li);
      });
      if (!items.length) {
        listEl.innerHTML = '<li style="cursor:default">没有匹配的问题</li>';
      }
    }
  }

  function renderHomeOj() {
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
        <p class="mode-hint">右上角可切换到「八股」浏览面试问答。</p>
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

  function renderHomeBagu() {
    let html = `
      <div class="guide-card">
        <h2>C++ 大厂面试八股</h2>
        <p>${escapeHtml(baguGuide.summary)}</p>
        <p>${escapeHtml(baguGuide.format)}</p>
        <p><strong style="color:var(--text)">怎么用</strong></p>
        <ul>${(baguGuide.tips || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
        <p><strong style="color:var(--text)">建议优先级</strong></p>
        <ul>${(baguGuide.priority || []).map((x) => `<li>${escapeHtml(x)}</li>`).join("")}</ul>
        <p class="mode-hint">右上角可切回「刷题」做编程题。</p>
      </div>
      <div class="level-block">
        <h3><span class="badge level">专题</span> ${baguCatalog.length} 个分册 · ${baguQuestions.length} 题</h3>
        <div class="file-grid">`;

    const topics =
      currentLevel === "all"
        ? baguCatalog
        : baguCatalog.filter((t) => t.id === currentLevel);

    topics.forEach((t) => {
      html += `<button class="file-card" data-topic="${t.id}" data-file="${escapeHtml(t.file)}">
        <div class="name">${escapeHtml(t.name)}</div>
        <div class="meta">${t.count} 题 · ${escapeHtml(t.desc)}</div>
      </button>`;
    });
    html += `</div></div>`;

    contentEl.innerHTML = html;
    contentEl.querySelectorAll(".file-card").forEach((card) => {
      card.onclick = () => {
        currentLevel = card.getAttribute("data-topic");
        currentFile = card.getAttribute("data-file");
        const items = filteredBagu();
        if (items.length) selectBagu(items[0].id);
        else renderAll();
      };
    });
  }

  function renderHome() {
    if (mode === "oj") renderHomeOj();
    else renderHomeBagu();
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
    if (!document.getElementById("indentHint")) {
      const tip = document.createElement("div");
      tip.id = "indentHint";
      tip.className = "indent-hint";
      tip.textContent =
        "编辑提示：Tab 缩进 · Shift+Tab 取消缩进 · Enter 自动对齐（遇到 { 会多缩进一层）";
      editor.parentElement.insertBefore(tip, editor);
    }

    renderTabs();
    renderBatches();
    renderList();
  }

  function renderBaguQuestion(q) {
    view = "problem";
    currentId = q.id;
    currentLevel = q.topic;
    currentFile = q.file;

    contentEl.innerHTML = `
      <div class="problem-view bagu-view">
        <div class="problem-head">
          <div>
            <h2>Q${q.num}. ${escapeHtml(q.title)}</h2>
            <div class="badges">
              <span class="badge level">${escapeHtml(q.topicName)}</span>
              <span class="badge">${escapeHtml(q.file)}</span>
              <span class="badge">${escapeHtml(q.id)}</span>
            </div>
          </div>
          <div class="toolbar">
            <button id="backHomeBtn" class="ghost">返回目录</button>
            <button id="copyInlineBtn" class="ghost">复制答要点</button>
            <button id="prevQBtn" class="ghost">上一题</button>
            <button id="nextQBtn" class="ghost">下一题</button>
          </div>
        </div>

        <div class="oj-block">
          <h3>【答要点】</h3>
          <div class="body md-body">${renderMd(q.answer)}</div>
        </div>
        ${
          q.followUp
            ? `<div class="oj-block follow-block">
          <h3>【追问】</h3>
          <div class="body md-body">${renderMd(q.followUp)}</div>
        </div>`
            : ""
        }
        <div class="oj-block tip-block">
          <h3>【口述提示】</h3>
          <div class="body">先一句话下定义，再讲原理 / 对比 / 坑点，最后用项目里的例子收尾。追问部分优先准备。</div>
        </div>
      </div>`;

    document.getElementById("backHomeBtn").onclick = () => {
      view = "home";
      currentId = null;
      renderAll();
    };
    document.getElementById("copyInlineBtn").onclick = copyCode;

    const siblings = filteredBagu();
    const idx = siblings.findIndex((x) => x.id === q.id);
    document.getElementById("prevQBtn").onclick = () => {
      if (idx > 0) selectBagu(siblings[idx - 1].id);
      else showToast("已经是第一题");
    };
    document.getElementById("nextQBtn").onclick = () => {
      if (idx >= 0 && idx < siblings.length - 1) selectBagu(siblings[idx + 1].id);
      else showToast("已经是最后一题");
    };

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

  function selectBagu(id) {
    const q = baguQuestions.find((x) => x.id === id);
    if (!q) return;
    renderBaguQuestion(q);
  }

  async function copyCode() {
    if (mode === "oj") {
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
      return;
    }

    const q = baguQuestions.find((x) => x.id === currentId);
    if (!q) {
      showToast("请先选择一道八股");
      return;
    }
    const text = `Q${q.num}. ${q.title}\n\n【答要点】\n${q.answer}${
      q.followUp ? `\n\n【追问】\n${q.followUp}` : ""
    }`;
    try {
      await navigator.clipboard.writeText(text);
      showToast("已复制答要点");
    } catch (e) {
      showToast("复制失败，请手动选择文本");
    }
  }

  function showToast(msg) {
    toastEl.textContent = msg;
    toastEl.style.display = "block";
    setTimeout(() => (toastEl.style.display = "none"), 2000);
  }

  function randomPick() {
    if (mode === "oj") {
      const items = filteredProblems();
      if (!items.length) return;
      selectProblem(items[Math.floor(Math.random() * items.length)].id);
    } else {
      const items = filteredBagu();
      if (!items.length) return;
      selectBagu(items[Math.floor(Math.random() * items.length)].id);
    }
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
      if (mode === "oj") {
        const p = problems.find((x) => x.id === currentId);
        if (p) {
          renderProblem(p);
          return;
        }
      } else {
        const q = baguQuestions.find((x) => x.id === currentId);
        if (q) {
          renderBaguQuestion(q);
          return;
        }
      }
    }
    renderHome();
  }

  document.querySelectorAll("#modeTabs button").forEach((btn) => {
    btn.onclick = () => setMode(btn.getAttribute("data-mode"));
  });

  document.getElementById("copyBtn").onclick = copyCode;
  document.getElementById("randomBtn").onclick = randomPick;
  document.getElementById("homeBtn").onclick = () => {
    const editor = document.getElementById("codeEditor");
    if (editor && currentId && mode === "oj") saveCode(currentId, editor.value);
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

  updateChrome();
  checkServer();
  setInterval(checkServer, 5000);
  renderAll();
})();
