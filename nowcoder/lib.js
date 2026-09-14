/**
 * 稳健生成器：代码用数组拼接，避免嵌套反引号
 */
const fs = require("fs");
const path = require("path");

function problem(num, title, desc, inputDesc, outputDesc, sampleIn, sampleOut, hint, codeLines) {
  const code = Array.isArray(codeLines) ? codeLines.join("\n") : codeLines;
  return [
    `## 第 ${num} 题 · ${title}`,
    "",
    "### 【题目描述】",
    desc,
    "",
    "### 【输入描述】",
    inputDesc,
    "",
    "### 【输出描述】",
    outputDesc,
    "",
    "### 【输入样例】",
    "```",
    sampleIn,
    "```",
    "",
    "### 【输出样例】",
    "```",
    sampleOut,
    "```",
    "",
    "### 【提示】",
    hint,
    "",
    "### 【C++参考代码】",
    "```cpp",
    code.trim(),
    "```",
    "",
    "---",
    "",
  ].join("\n");
}

function mainCode(lines) {
  return [
    "#include <iostream>",
    "#include <vector>",
    "#include <string>",
    "#include <algorithm>",
    "#include <cmath>",
    "#include <queue>",
    "#include <stack>",
    "#include <map>",
    "#include <set>",
    "#include <sstream>",
    "#include <iomanip>",
    "#include <cctype>",
    "using namespace std;",
    "",
    "int main() {",
    "    ios::sync_with_stdio(false);",
    "    cin.tie(0);",
    ...lines.map((l) => (l.length ? "    " + l : "")),
    "    return 0;",
    "}",
  ].join("\n");
}

function writeFile(name, title, problems, footer) {
  const body =
    `# ${title}\n\n> 风格：牛客网编程题 | 标准 C++11 | cin/cout\n\n---\n\n` +
    problems.join("\n") +
    `\n${footer}\n`;
  fs.writeFileSync(path.join(__dirname, name), body);
  console.log("wrote", name, "count=", problems.length);
}

module.exports = { problem, mainCode, writeFile };
