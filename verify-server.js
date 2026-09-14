/**
 * 本地 C++ 样例验证服务
 * - 静态托管 cpp-practice 页面
 * - POST /api/verify 编译运行并对照样例
 *
 * 启动：node verify-server.js
 * 浏览器打开：http://127.0.0.1:3789/
 */
const http = require("http");
const fs = require("fs");
const path = require("path");
const os = require("os");
const { spawn } = require("child_process");
const crypto = require("crypto");

const PORT = 3789;
const ROOT = __dirname;
const GPP = process.env.GPP_PATH || "C:/msys64/ucrt64/bin/g++.exe";
const MSYS_BIN = "C:/msys64/ucrt64/bin";
const MSYS_USR = "C:/msys64/usr/bin";
const TMP_ROOT = path.join(ROOT, ".verify-tmp");
const MAX_CODE = 200 * 1024;
const COMPILE_TIMEOUT_MS = 15000;
const RUN_TIMEOUT_MS = 3000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
  ".png": "image/png",
  ".ico": "image/x-icon",
};

function ensureTmp() {
  if (!fs.existsSync(TMP_ROOT)) fs.mkdirSync(TMP_ROOT, { recursive: true });
}

function normalizeOutput(s) {
  return String(s || "")
    .replace(/\r\n/g, "\n")
    .replace(/\r/g, "\n")
    .split("\n")
    .map((line) => line.replace(/[ \t]+$/g, ""))
    .join("\n")
    .replace(/\n+$/g, "");
}

function isNoInput(sampleIn) {
  const t = String(sampleIn || "").trim();
  return !t || t === "（无）" || t === "(无)" || t === "无";
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (c) => {
      size += c.length;
      if (size > MAX_CODE + 64 * 1024) {
        reject(new Error("请求体过大"));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

function runCmd(cmd, args, options) {
  return new Promise((resolve) => {
    const env = Object.assign({}, process.env, options.env || {});
    // 确保能找到 g++ 依赖 dll
    env.PATH = [MSYS_BIN, MSYS_USR, env.PATH || ""].join(";");

    const child = spawn(cmd, args, {
      cwd: options.cwd,
      env,
      windowsHide: true,
      stdio: ["pipe", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    let killed = false;
    const timer = setTimeout(() => {
      killed = true;
      try {
        child.kill();
      } catch (_) {}
    }, options.timeoutMs);

    if (options.input != null) {
      child.stdin.write(String(options.input));
    }
    child.stdin.end();

    child.stdout.on("data", (d) => {
      stdout += d.toString("utf8");
      if (stdout.length > 200000) {
        killed = true;
        child.kill();
      }
    });
    child.stderr.on("data", (d) => {
      stderr += d.toString("utf8");
      if (stderr.length > 200000) {
        killed = true;
        child.kill();
      }
    });

    child.on("close", (code) => {
      clearTimeout(timer);
      resolve({
        code: code == null ? -1 : code,
        stdout,
        stderr,
        timeout: killed,
      });
    });
  });
}

function diffLines(expected, actual) {
  const e = expected.split("\n");
  const a = actual.split("\n");
  const max = Math.max(e.length, a.length);
  const diffs = [];
  for (let i = 0; i < max; i++) {
    const el = e[i] === undefined ? "<缺失>" : e[i];
    const al = a[i] === undefined ? "<缺失>" : a[i];
    if (el !== al) {
      diffs.push({ line: i + 1, expected: el, actual: al });
      if (diffs.length >= 8) break;
    }
  }
  return diffs;
}

async function verifyOne(code, sampleIn, sampleOut, caseName) {
  ensureTmp();
  const id = crypto.randomBytes(8).toString("hex");
  const work = path.join(TMP_ROOT, id);
  fs.mkdirSync(work, { recursive: true });
  const src = path.join(work, "main.cpp");
  const exe = path.join(work, "main.exe");
  fs.writeFileSync(src, code, "utf8");

  const result = {
    name: caseName || "样例1",
    status: "pending",
    message: "",
    input: isNoInput(sampleIn) ? "" : String(sampleIn),
    expected: normalizeOutput(sampleOut),
    actual: "",
    compileLog: "",
    diffs: [],
  };

  try {
    if (!fs.existsSync(GPP)) {
      result.status = "error";
      result.message = `未找到编译器：${GPP}`;
      return result;
    }

    const compile = await runCmd(
      GPP,
      ["-std=c++11", "-O2", "-Wall", src, "-o", exe],
      { cwd: work, timeoutMs: COMPILE_TIMEOUT_MS, input: "" }
    );

    if (compile.timeout) {
      result.status = "CE";
      result.message = "编译超时";
      result.compileLog = compile.stderr || compile.stdout;
      return result;
    }
    if (compile.code !== 0 || !fs.existsSync(exe)) {
      result.status = "CE";
      result.message = "编译失败";
      result.compileLog = (compile.stderr || compile.stdout || "").trim();
      return result;
    }

    const run = await runCmd(exe, [], {
      cwd: work,
      timeoutMs: RUN_TIMEOUT_MS,
      input: result.input,
    });

    if (run.timeout) {
      result.status = "TLE";
      result.message = `运行超时（>${RUN_TIMEOUT_MS}ms）`;
      result.actual = normalizeOutput(run.stdout);
      return result;
    }
    if (run.code !== 0) {
      result.status = "RE";
      result.message = `运行时错误（退出码 ${run.code}）`;
      result.actual = normalizeOutput(run.stdout);
      result.compileLog = (run.stderr || "").trim();
      return result;
    }

    result.actual = normalizeOutput(run.stdout);
    if (result.actual === result.expected) {
      result.status = "AC";
      result.message = "通过";
    } else {
      result.status = "WA";
      result.message = "答案错误";
      result.diffs = diffLines(result.expected, result.actual);
    }
    return result;
  } finally {
    try {
      fs.rmSync(work, { recursive: true, force: true });
    } catch (_) {}
  }
}

async function handleVerify(req, res) {
  try {
    const raw = await readBody(req);
    const body = JSON.parse(raw || "{}");
    const code = body.code || "";
    if (!code.trim()) {
      json(res, 400, { ok: false, error: "代码为空" });
      return;
    }
    if (code.length > MAX_CODE) {
      json(res, 400, { ok: false, error: "代码过长" });
      return;
    }

    let cases = Array.isArray(body.cases) ? body.cases : null;
    if (!cases || !cases.length) {
      cases = [
        {
          name: "样例1",
          input: body.sampleIn || "",
          output: body.sampleOut || "",
        },
      ];
    }

    const results = [];
    for (let i = 0; i < cases.length; i++) {
      const c = cases[i];
      results.push(
        await verifyOne(code, c.input, c.output, c.name || `样例${i + 1}`)
      );
    }

    const passed = results.filter((r) => r.status === "AC").length;
    const failed = results.length - passed;
    json(res, 200, {
      ok: true,
      summary: {
        total: results.length,
        passed,
        failed,
        allPassed: failed === 0,
      },
      results,
    });
  } catch (e) {
    json(res, 500, { ok: false, error: e.message || String(e) });
  }
}

function json(res, code, obj) {
  const data = JSON.stringify(obj);
  res.writeHead(code, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
  });
  res.end(data);
}

function serveStatic(req, res) {
  let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
  if (urlPath === "/") urlPath = "/index.html";
  const filePath = path.normalize(path.join(ROOT, urlPath));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    res.writeHead(404);
    res.end("Not Found");
    return;
  }
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { "Content-Type": MIME[ext] || "application/octet-stream" });
  fs.createReadStream(filePath).pipe(res);
}

const server = http.createServer(async (req, res) => {
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end();
    return;
  }

  if (req.method === "POST" && req.url === "/api/verify") {
    await handleVerify(req, res);
    return;
  }

  if (req.method === "GET" && req.url === "/api/health") {
    json(res, 200, {
      ok: true,
      gpp: GPP,
      gppExists: fs.existsSync(GPP),
    });
    return;
  }

  if (req.method === "GET") {
    serveStatic(req, res);
    return;
  }

  res.writeHead(405);
  res.end("Method Not Allowed");
});

ensureTmp();
server.listen(PORT, "127.0.0.1", () => {
  console.log(`C++ 样例验证服务已启动`);
  console.log(`请打开: http://127.0.0.1:${PORT}/`);
  console.log(`编译器: ${GPP} (${fs.existsSync(GPP) ? "找到" : "未找到"})`);
});
