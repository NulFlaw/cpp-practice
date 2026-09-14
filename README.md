# C++ 分梯度练习（牛客风格）

150 道 C++ 题库网页：入门 50｜简单 50｜较难 30｜困难 20。支持在线作答、智能缩进、本地 g++ 样例验证。

## 功能

- 按难度 / 分册浏览题目（题目描述、输入输出、样例、提示、参考代码）
- 在线编辑器：Tab / Shift+Tab 缩进，Enter 自动对齐
- 提交验证：本机 `g++` 编译运行，对照样例给出 AC / WA / CE / RE / TLE

## 使用方法

1. 安装 [Node.js](https://nodejs.org/) 与 MinGW/`g++`（本仓库默认使用 `C:\msys64\ucrt64\bin\g++.exe`）
2. 双击 `start-verify.bat`，或执行：

```bash
node verify-server.js
```

3. 浏览器打开 http://127.0.0.1:3789/
4. 选题 → 在【在线作答】写代码 → 点「提交验证」

不要直接双击 `index.html`，否则无法连接验证服务。

若编译器不在默认路径，可设置环境变量：

```bash
set GPP_PATH=C:\path\to\g++.exe
node verify-server.js
```

## 目录

| 路径 | 说明 |
|------|------|
| `index.html` / `app.js` / `style.css` | 题库页面 |
| `nowcoder/` | 牛客风格 Markdown 题库 |
| `nowcoder-data.js` | 页面使用的题库数据 |
| `verify-server.js` | 本地编译与样例验证服务 |

修改 `nowcoder/*.md` 后，在 `nowcoder` 目录执行 `node build-web-data.js` 可刷新网页数据。
