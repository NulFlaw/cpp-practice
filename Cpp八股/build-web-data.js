/**
 * 把 Cpp八股/*.md 解析成网页可用的 bagu-data.js
 */
const fs = require("fs");
const path = require("path");

const dir = __dirname;

const catalog = [
  {
    id: "memory",
    name: "语言基础与内存",
    file: "01-语言基础与内存.md",
    desc: "类型、栈堆、new/malloc、进程布局、对齐",
  },
  {
    id: "oop",
    name: "面向对象与虚函数",
    file: "02-面向对象与虚函数.md",
    desc: "多态、vtable、虚析构、继承布局、菱形继承",
  },
  {
    id: "smartptr",
    name: "智能指针与RAII",
    file: "03-智能指针与RAII.md",
    desc: "RAII、unique/shared/weak、循环引用、线程安全",
  },
  {
    id: "modern",
    name: "现代C++与移动语义",
    file: "04-现代C++与移动语义.md",
    desc: "拷贝/移动、值类别、右值引用、三五零法则",
  },
  {
    id: "stl",
    name: "STL容器",
    file: "05-STL容器.md",
    desc: "vector/list/deque/map/unordered_map、迭代器失效",
  },
  {
    id: "thread",
    name: "多线程与内存模型",
    file: "06-多线程与内存模型.md",
    desc: "mutex、原子、内存序、条件变量、死锁",
  },
  {
    id: "template",
    name: "模板与泛型",
    file: "07-模板与泛型.md",
    desc: "特化、SFINAE、类型擦除、CRTP、完美转发",
  },
  {
    id: "build",
    name: "编译链接与工程杂项",
    file: "08-编译链接与工程杂项.md",
    desc: "编译链接、ODR、inline、异常安全、ABI",
  },
];

function splitQuestions(text) {
  const parts = text.split(/^## /m).slice(1);
  const items = [];
  for (const part of parts) {
    const lines = part.split(/\r?\n/);
    const head = (lines[0] || "").trim();
    const m = head.match(/^Q(\d+)\.\s*(.+)$/i);
    if (!m) continue;
    const num = Number(m[1]);
    const title = m[2].trim();
    let body = lines.slice(1).join("\n").trim();
    // 去掉末尾单独的 ---
    body = body.replace(/\n---\s*$/g, "").trim();

    let followUp = "";
    const followMatch = body.match(/\*\*追问\*\*[：:]\s*([\s\S]*?)(?=\n---|\n\*\*|$)/);
    if (followMatch) {
      followUp = followMatch[1].trim();
      body = body.replace(/\n?\*\*追问\*\*[：:][\s\S]*?(?=\n---|$)/, "").trim();
    }

    // 去掉 **答要点** 标题行，正文保留
    body = body.replace(/^\*\*答要点\*\*\s*\n+/i, "").trim();

    items.push({ num, title, answer: body, followUp });
  }
  return items;
}

const all = [];
for (const topic of catalog) {
  const full = path.join(dir, topic.file);
  const text = fs.readFileSync(full, "utf8");
  const parsed = splitQuestions(text);
  topic.count = parsed.length;
  for (const q of parsed) {
    all.push({
      id: `${topic.id}-${q.num}`,
      topic: topic.id,
      topicName: topic.name,
      file: topic.file,
      num: q.num,
      title: q.title,
      answer: q.answer,
      followUp: q.followUp,
    });
  }
  console.log(topic.file, parsed.length);
}

const guide = {
  summary: `共 ${all.length} 道大厂 C++ 面试高频问答`,
  format: "每题包含：问题、答要点、常见追问",
  tips: [
    "能口头讲清「是什么 / 为什么 / 怎么用 / 常见坑」",
    "每题末的追问优先准备，面试官常往下挖",
    "能画图的画：内存布局、vtable、控制块、进程地址空间",
    "结合项目经历展开，不要死记硬背",
  ],
  priority: [
    "必会：内存管理、虚函数与虚析构、智能指针、移动语义、vector 扩容、mutex / atomic",
    "加分：内存序、模板/SFINAE、虚继承布局、异常安全等级",
  ],
};

const out = `window.BAGU_GUIDE = ${JSON.stringify(guide, null, 2)};
window.BAGU_CATALOG = ${JSON.stringify(catalog, null, 2)};
window.BAGU_QUESTIONS = ${JSON.stringify(all, null, 2)};
`;

fs.writeFileSync(path.join(dir, "..", "bagu-data.js"), out);
console.log("total questions:", all.length);
console.log("wrote ../bagu-data.js");
