# C++ 分梯度练习（牛客风格）

150 道 C++ 题库网页：入门 50｜简单 50｜较难 30｜困难 20。支持在线作答、智能缩进、本地 g++ 样例验证。

## 指导背景：C++ Core Guidelines

本项目的学习路径与编码习惯，以 [**C++ Core Guidelines**](https://isocpp.github.io/CppCoreGuidelines/CppCoreGuidelines) 为权威参考。

该指南由 **Bjarne Stroustrup**（C++ 之父）与 **Herb Sutter** 等主编，由 ISO C++ 基金会维护，是业界广泛认可的现代 C++（C++11 及更新）实践规范，覆盖资源管理、接口设计、类型安全、并发等内容。

我们以此为背景来组织练习：

- **题库**：用牛客风格题目练语法与算法，尽快写得出、跑得通
- **八股**：[`Cpp八股/`](Cpp八股/) 按主题整理虚函数、智能指针、移动语义、STL、多线程等面试问答
- **规范**：鼓励对照 Core Guidelines 改代码习惯（如 RAII、避免裸 `new`/`delete`、优先 `const` / `span` / 智能指针等）
- **工具链**：可用 `clang-tidy` 的 `cppcoreguidelines-*` 检查，与指南规则对齐

指南原文仓库：[isocpp/CppCoreGuidelines](https://github.com/isocpp/CppCoreGuidelines)

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
| `Cpp八股/` | 大厂 C++ 面试高频问答（原理向） |
| `nowcoder-data.js` | 刷题页数据 |
| `bagu-data.js` | 八股页数据 |
| `verify-server.js` | 本地编译与样例验证服务 |

页面右上角可在「刷题 / 八股」间切换。

修改 `nowcoder/*.md` 后，在 `nowcoder` 目录执行 `node build-web-data.js` 可刷新刷题数据。  
修改 `Cpp八股/*.md` 后，在 `Cpp八股` 目录执行 `node build-web-data.js` 可刷新八股数据。
