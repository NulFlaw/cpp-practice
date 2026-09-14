/**
 * 把 nowcoder/*.md 解析成网页可用的 nowcoder-data.js
 */
const fs = require("fs");
const path = require("path");

const dir = __dirname;
const catalog = [
  {
    id: "intro",
    name: "入门",
    count: 50,
    desc: "语法基础",
    files: [
      { file: "01-入门-01-10.md", range: "1～10", topic: "输入输出、变量、分支" },
      { file: "02-入门-11-20.md", range: "11～20", topic: "for 循环基础" },
      { file: "03-入门-21-30.md", range: "21～30", topic: "嵌套循环、图形打印" },
      { file: "04-入门-31-40.md", range: "31～40", topic: "一维数组基础" },
      { file: "05-入门-41-50.md", range: "41～50", topic: "函数、字符基础" },
    ],
  },
  {
    id: "easy",
    name: "简单",
    count: 50,
    desc: "基础模拟",
    files: [
      { file: "06-简单-01-10.md", range: "1～10", topic: "简单数学模拟" },
      { file: "07-简单-11-20.md", range: "11～20", topic: "数组操作" },
      { file: "08-简单-21-30.md", range: "21～30", topic: "字符串基础" },
      { file: "09-简单-31-40.md", range: "31～40", topic: "枚举模拟" },
      { file: "10-简单-41-50.md", range: "41～50", topic: "简单综合模拟" },
    ],
  },
  {
    id: "mid",
    name: "较难",
    count: 30,
    desc: "STL / 基础算法",
    files: [
      { file: "11-较难-01-10.md", range: "1～10", topic: "STL、二分、前缀和" },
      { file: "12-较难-11-20.md", range: "11～20", topic: "贪心、BFS/DFS" },
      { file: "13-较难-21-30.md", range: "21～30", topic: "DP 入门、图/树、双指针" },
    ],
  },
  {
    id: "hard",
    name: "困难",
    count: 20,
    desc: "进阶算法",
    files: [
      { file: "14-困难-01-10.md", range: "1～10", topic: "背包、最短路、MST、拓扑、KMP、线段树、数位DP、TSP" },
      { file: "15-困难-11-20.md", range: "11～20", topic: "Tarjan、SPFA、树DP、LCA、离散化、AC自动机、二分图、莫队、后缀数组" },
    ],
  },
];

function parseMd(text, levelId, fileName) {
  const problems = [];
  const parts = text.split(/^## 第 /m).slice(1);
  for (const part of parts) {
    const titleMatch = part.match(/^(\d+)\s*题\s*·\s*(.+)\s*$/m);
    if (!titleMatch) continue;
    const num = Number(titleMatch[1]);
    const title = titleMatch[2].trim();

    function section(name) {
      const re = new RegExp(
        `### 【${name}】\\s*\\n([\\s\\S]*?)(?=\\n### 【|\\n---\\s*$|$)`
      );
      const m = part.match(re);
      return m ? m[1].trim() : "";
    }

    function stripFence(s) {
      return s
        .replace(/^```(?:cpp)?\s*\n?/i, "")
        .replace(/\n?```\s*$/i, "")
        .trim();
    }

    const desc = section("题目描述");
    const inputDesc = section("输入描述");
    const outputDesc = section("输出描述");
    const sampleIn = stripFence(section("输入样例"));
    const sampleOut = stripFence(section("输出样例"));
    const hint = section("提示");
    const code = stripFence(section("C\\+\\+参考代码"));

    problems.push({
      id: `${levelId}-${num}`,
      level: levelId,
      file: fileName,
      num,
      title,
      desc,
      inputDesc,
      outputDesc,
      sampleIn,
      sampleOut,
      hint,
      code,
    });
  }
  return problems;
}

const all = [];
for (const lv of catalog) {
  for (const f of lv.files) {
    const full = path.join(dir, f.file);
    const text = fs.readFileSync(full, "utf8");
    const parsed = parseMd(text, lv.id, f.file);
    f.problemCount = parsed.length;
    all.push(...parsed);
    console.log(f.file, parsed.length);
  }
}

const guide = {
  summary: "共 150 题：入门 50｜简单 50｜较难 30｜困难 20",
  format: "每题包含：题目描述、输入描述、输出描述、输入样例、输出样例、提示、C++参考代码",
  convention: "标准 C++11，cin/cout，必要时 ios::sync_with_stdio(false)",
  order: [
    "先完整做完 入门 1～50",
    "再做 简单 1～50",
    "较难 / 困难 按专题选做，配合 Core Guidelines 把代码写规范",
  ],
  workflow: [
    "左侧选题或点开分册",
    "复制参考代码（或自己写）到 practice/src/main.cpp",
    "Ctrl+Shift+B 编译",
    "运行 .\\practice\\build\\practice.exe，按样例输入验证",
  ],
};

const out = `window.NOWCODER_GUIDE = ${JSON.stringify(guide, null, 2)};
window.NOWCODER_CATALOG = ${JSON.stringify(catalog, null, 2)};
window.NOWCODER_PROBLEMS = ${JSON.stringify(all, null, 2)};
`;

fs.writeFileSync(path.join(dir, "..", "nowcoder-data.js"), out);
console.log("total problems:", all.length);
console.log("wrote ../nowcoder-data.js");
