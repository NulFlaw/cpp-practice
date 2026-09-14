window.BAGU_GUIDE = {
  "summary": "共 82 道大厂 C++ 面试高频问答",
  "format": "每题包含：问题、答要点、常见追问",
  "tips": [
    "能口头讲清「是什么 / 为什么 / 怎么用 / 常见坑」",
    "每题末的追问优先准备，面试官常往下挖",
    "能画图的画：内存布局、vtable、控制块、进程地址空间",
    "结合项目经历展开，不要死记硬背"
  ],
  "priority": [
    "必会：内存管理、虚函数与虚析构、智能指针、移动语义、vector 扩容、mutex / atomic",
    "加分：内存序、模板/SFINAE、虚继承布局、异常安全等级"
  ]
};
window.BAGU_CATALOG = [
  {
    "id": "memory",
    "name": "语言基础与内存",
    "file": "01-语言基础与内存.md",
    "desc": "类型、栈堆、new/malloc、进程布局、对齐",
    "count": 12
  },
  {
    "id": "oop",
    "name": "面向对象与虚函数",
    "file": "02-面向对象与虚函数.md",
    "desc": "多态、vtable、虚析构、继承布局、菱形继承",
    "count": 12
  },
  {
    "id": "smartptr",
    "name": "智能指针与RAII",
    "file": "03-智能指针与RAII.md",
    "desc": "RAII、unique/shared/weak、循环引用、线程安全",
    "count": 10
  },
  {
    "id": "modern",
    "name": "现代C++与移动语义",
    "file": "04-现代C++与移动语义.md",
    "desc": "拷贝/移动、值类别、右值引用、三五零法则",
    "count": 10
  },
  {
    "id": "stl",
    "name": "STL容器",
    "file": "05-STL容器.md",
    "desc": "vector/list/deque/map/unordered_map、迭代器失效",
    "count": 10
  },
  {
    "id": "thread",
    "name": "多线程与内存模型",
    "file": "06-多线程与内存模型.md",
    "desc": "mutex、原子、内存序、条件变量、死锁",
    "count": 10
  },
  {
    "id": "template",
    "name": "模板与泛型",
    "file": "07-模板与泛型.md",
    "desc": "特化、SFINAE、类型擦除、CRTP、完美转发",
    "count": 8
  },
  {
    "id": "build",
    "name": "编译链接与工程杂项",
    "file": "08-编译链接与工程杂项.md",
    "desc": "编译链接、ODR、inline、异常安全、ABI",
    "count": 10
  }
];
window.BAGU_QUESTIONS = [
  {
    "id": "memory-1",
    "topic": "memory",
    "topicName": "语言基础与内存",
    "file": "01-语言基础与内存.md",
    "num": 1,
    "title": "进程地址空间大致怎么划分？",
    "answer": "- **代码段（text）**：机器指令，通常只读\n- **只读数据（rodata）**：字符串字面量、`const` 全局等\n- **数据段（data）**：已初始化的全局 / 静态变量\n- **BSS**：未初始化或初始化为 0 的全局 / 静态变量（可执行文件里常不占实际空间）\n- **堆（heap）**：动态分配，一般向高地址增长\n- **栈（stack）**：局部变量、调用帧，一般向低地址增长\n- 还有映射区（共享库、mmap 等）",
    "followUp": "全局变量和静态局部变量分别放哪？静态局部变量有什么初始化特点？"
  },
  {
    "id": "memory-2",
    "topic": "memory",
    "topicName": "语言基础与内存",
    "file": "01-语言基础与内存.md",
    "num": 2,
    "title": "栈和堆有什么区别？什么时候用哪个？",
    "answer": "| | 栈 | 堆 |\n|--|--|--|\n| 分配 | 自动、极快 | `new`/`malloc`，有分配器开销 |\n| 释放 | 离开作用域自动析构 | 需手动或智能指针 |\n| 大小 | 通常较小（如默认数 MB 级） | 受系统内存限制，更灵活 |\n| 典型用途 | 小对象、短生命周期 | 大对象、跨作用域共享、运行期才定大小 |",
    "followUp": "大数组放栈上可能怎样？递归过深会怎样？"
  },
  {
    "id": "memory-3",
    "topic": "memory",
    "topicName": "语言基础与内存",
    "file": "01-语言基础与内存.md",
    "num": 3,
    "title": "`new`/`delete` 和 `malloc`/`free` 有什么区别？",
    "answer": "1. `new`：分配 + 调用构造；`delete`：析构 + 释放\n2. `malloc`：只按字节分配，不调构造/析构；返回 `void*`\n3. `new` 失败默认抛 `std::bad_alloc`；`malloc` 失败返回 `nullptr`\n4. 必须配对：`new`↔`delete`，`new[]`↔`delete[]`，`malloc`↔`free`；混用是未定义行为\n5. `new` 可重载、可配合定位 `new`；C++ 里优先 RAII / 智能指针，少直接裸 `new`",
    "followUp": "`delete` 和 `delete[]` 混用会怎样？定位 `new` 是什么？"
  },
  {
    "id": "memory-4",
    "topic": "memory",
    "topicName": "语言基础与内存",
    "file": "01-语言基础与内存.md",
    "num": 4,
    "title": "什么是内存泄漏？悬空指针？野指针？",
    "answer": "- **内存泄漏**：堆内存不再可达却未释放（或资源未归还）\n- **悬空指针**：指向已释放对象的指针\n- **野指针**：未初始化的指针\n\n**预防**：RAII、智能指针、尽快置空、限制裸指针生命周期、AddressSanitizer / Valgrind。",
    "followUp": ""
  },
  {
    "id": "memory-5",
    "topic": "memory",
    "topicName": "语言基础与内存",
    "file": "01-语言基础与内存.md",
    "num": 5,
    "title": "什么是内存对齐？为什么要对齐？",
    "answer": "- 编译器按类型自然对齐要求在结构体成员间插入 padding，使地址满足对齐\n- 目的：硬件访问效率、部分架构强制对齐否则 trap\n- `sizeof`、`alignof`、`#pragma pack` / `alignas` 可观察或调整\n- 面试常考：手算结构体 `sizeof`（注意顺序影响 padding）\n\n**示例思路**：`struct { char; int; }` 与 `struct { int; char; }` 的大小可能不同。",
    "followUp": ""
  },
  {
    "id": "memory-6",
    "topic": "memory",
    "topicName": "语言基础与内存",
    "file": "01-语言基础与内存.md",
    "num": 6,
    "title": "指针和引用有什么区别？",
    "answer": "1. 引用必须绑定对象，不能为空（语义上）；指针可以为空\n2. 引用一经绑定不可再绑到别的对象；指针可改指向\n3. 引用没有独立「再分配」语义，用起来像别名；指针是对象\n4. 取引用的地址是被引用对象的地址；sizeof 引用是所指类型大小\n5. 函数传参：引用避免拷贝且表达「必有对象」；指针表达可选 / 可空",
    "followUp": "右值引用和左值引用区别？`const T&` 能绑临时量吗？"
  },
  {
    "id": "memory-7",
    "topic": "memory",
    "topicName": "语言基础与内存",
    "file": "01-语言基础与内存.md",
    "num": 7,
    "title": "`const` 有哪些常见用法？顶层 const 和底层 const？",
    "answer": "- 修饰变量：不可修改\n- 成员函数后加 `const`：承诺不修改对象逻辑状态（可改 `mutable`）\n- 指针：`const T*` / `T* const` / `const T* const`\n- **顶层 const**：指针/引用本身不可改；**底层 const**：所指对象不可改\n- 与 `constexpr` 对比见下一题",
    "followUp": ""
  },
  {
    "id": "memory-8",
    "topic": "memory",
    "topicName": "语言基础与内存",
    "file": "01-语言基础与内存.md",
    "num": 8,
    "title": "`const` 和 `constexpr` 区别？",
    "answer": "- `const`：运行期常量语义（初始化可在运行期完成）\n- `constexpr`：强调编译期可求值（变量、函数、构造等，C++11 起逐步放宽）\n- 数组大小、模板非类型参数、`static_assert` 等更常需要 `constexpr`\n- C++14/17/20 对 `constexpr` 能力不断增强",
    "followUp": ""
  },
  {
    "id": "memory-9",
    "topic": "memory",
    "topicName": "语言基础与内存",
    "file": "01-语言基础与内存.md",
    "num": 9,
    "title": "`sizeof` 和 `strlen` 区别？对指针和数组呢？",
    "answer": "- `sizeof`：编译期运算符，求类型/对象占用字节数\n- `strlen`：运行期函数，数 C 字符串到 `\\0` 的长度\n- 数组名多数语境退化为指针，但 `sizeof(arr)` 仍是整个数组大小\n- 指针的 `sizeof` 是指针本身大小（如 8 字节）",
    "followUp": ""
  },
  {
    "id": "memory-10",
    "topic": "memory",
    "topicName": "语言基础与内存",
    "file": "01-语言基础与内存.md",
    "num": 10,
    "title": "深拷贝和浅拷贝？",
    "answer": "- **浅拷贝**：只拷贝指针值，多个对象共享同一块资源 → 双重释放风险\n- **深拷贝**：拷贝资源内容，各自独立\n- 含裸资源的类需正确实现拷贝控制（或禁用拷贝、用智能指针 / Rule of Zero）",
    "followUp": ""
  },
  {
    "id": "memory-11",
    "topic": "memory",
    "topicName": "语言基础与内存",
    "file": "01-语言基础与内存.md",
    "num": 11,
    "title": "强制类型转换：C 风格 vs C++ 四种转换？",
    "answer": "- `static_cast`：相关类型间的显式转换（上下转换要注意安全性）\n- `const_cast`：去/加 const（改真正 const 对象是 UB）\n- `reinterpret_cast`：位模式级重解释，危险\n- `dynamic_cast`：多态类型安全向下转换，失败指针得 `nullptr`、引用抛异常\n- 面试倾向：少用 C 风格强转，意图更清晰、更好搜",
    "followUp": ""
  },
  {
    "id": "memory-12",
    "topic": "memory",
    "topicName": "语言基础与内存",
    "file": "01-语言基础与内存.md",
    "num": 12,
    "title": "什么是未定义行为（UB）？举几个 C++ 里的例子",
    "answer": "- 标准不规定结果，编译器可任意优化；调试与发布表现可不同\n- 例子：解引用空/悬空指针、有符号溢出、数组越界、未初始化读、错误 `delete`、数据竞争（严格说是竞态相关 UB）\n- 工程上：开 sanitizer、静态分析、遵守 Core Guidelines",
    "followUp": "未定义、未指定、实现定义行为三者区别？"
  },
  {
    "id": "oop-1",
    "topic": "oop",
    "topicName": "面向对象与虚函数",
    "file": "02-面向对象与虚函数.md",
    "num": 1,
    "title": "C++ 里多态是怎么实现的？虚函数表做什么？",
    "answer": "1. **运行时多态**靠虚函数：通过基类指针/引用调用时，按对象**真实类型**分派\n2. 含虚函数的类通常有一份 **vtable**（虚函数地址表）；对象里有 **vptr** 指向该类的表\n3. 调用过程：取对象 `vptr` → 按偏移取函数指针 → 间接调用（动态绑定）\n4. vtable 按**类**共享；对象通常只多一个指针大小；**多继承**时可能有多张表 / 多个 vptr",
    "followUp": "静态多态还有哪些？（函数重载、模板、CRTP）"
  },
  {
    "id": "oop-2",
    "topic": "oop",
    "topicName": "面向对象与虚函数",
    "file": "02-面向对象与虚函数.md",
    "num": 2,
    "title": "为什么基类析构函数常常要写成 `virtual`？",
    "answer": "1. 用基类指针 `delete` 派生对象时，若析构非虚，只会调基类析构 → 派生部分资源泄漏 / UB\n2. 虚析构走动态绑定：先派生后基类，顺序正确\n3. 若类不打算作为多态基类、也不通过基类指针删除，可不虚，避免引入虚表开销\n4. 接口类即使只有纯虚函数，也常提供 `virtual ~Base() = default`",
    "followUp": ""
  },
  {
    "id": "oop-3",
    "topic": "oop",
    "topicName": "面向对象与虚函数",
    "file": "02-面向对象与虚函数.md",
    "num": 3,
    "title": "构造 / 析构函数里调用虚函数会发生多态吗？为什么？",
    "answer": "- **不会**按「最终派生类型」多态\n- 构造时：基类构造阶段对象还只是「基类部分」，vptr 指向基类表；派生未构造完\n- 析构时：派生已析构完，vptr 调回基类表\n- 因此在构造/析构里调虚函数，实际绑定的是**当前正在构造/析构的那一层**",
    "followUp": ""
  },
  {
    "id": "oop-4",
    "topic": "oop",
    "topicName": "面向对象与虚函数",
    "file": "02-面向对象与虚函数.md",
    "num": 4,
    "title": "对象内存布局大概怎样？（成员、虚函数、继承）",
    "answer": "1. 非静态成员大致按声明顺序排布，中间可能有对齐填充；静态成员不占对象空间\n2. 有虚函数时，对象中常有 vptr（实现相关，常见在开头）\n3. 单继承：基类子对象在前，派生成员在后；覆盖虚函数改的是表项\n4. 虚继承会引入虚基类偏移相关机制，避免菱形继承中基类子对象重复",
    "followUp": "能否手画 `Base` / `Derived` 的布局和虚表？"
  },
  {
    "id": "oop-5",
    "topic": "oop",
    "topicName": "面向对象与虚函数",
    "file": "02-面向对象与虚函数.md",
    "num": 5,
    "title": "重载、重写（覆盖）、隐藏的区别？",
    "answer": "| | 含义 |\n|--|--|\n| **重载 overload** | 同作用域，函数名同、参数不同；编译期决议 |\n| **重写 override** | 派生类覆盖基类**虚函数**（签名匹配）；运行期多态 |\n| **隐藏 hide** | 派生类同名函数（即使参数不同）会隐藏基类同名；通过作用域分辨 |\n\n建议：覆盖时写 `override`，防止签名写错变成隐藏。",
    "followUp": ""
  },
  {
    "id": "oop-6",
    "topic": "oop",
    "topicName": "面向对象与虚函数",
    "file": "02-面向对象与虚函数.md",
    "num": 6,
    "title": "纯虚函数与抽象类？",
    "answer": "- 纯虚：`virtual void f() = 0;`\n- 含纯虚的类是抽象类，**不能实例化**\n- 用于定义接口；派生类必须实现（或仍保持抽象）\n- 纯虚析构也要有定义（可 `= default` 在类外）",
    "followUp": ""
  },
  {
    "id": "oop-7",
    "topic": "oop",
    "topicName": "面向对象与虚函数",
    "file": "02-面向对象与虚函数.md",
    "num": 7,
    "title": "菱形继承问题是什么？虚继承如何解决？代价？",
    "answer": "- 两条路径继承同一基类 → 子对象重复、二义性\n- **虚继承**：共享一份虚基类子对象，通过偏移 / vbptr 等机制定位\n- 代价：对象更大、构造更复杂、访问虚基类成员多一层间接，性能略差\n- 设计上优先组合或更清晰的层次，慎用复杂多继承",
    "followUp": ""
  },
  {
    "id": "oop-8",
    "topic": "oop",
    "topicName": "面向对象与虚函数",
    "file": "02-面向对象与虚函数.md",
    "num": 8,
    "title": "虚函数调用的性能开销来自哪里？如何优化？",
    "answer": "- 对象多一个 vptr；调用多一次间接；妨碍内联\n- 优化思路：最终类标 `final`、热点路径去虚化（CRTP / 模板）、`std::variant` + visit、函数指针表、按类型分桶批处理（提高预测与缓存）",
    "followUp": ""
  },
  {
    "id": "oop-9",
    "topic": "oop",
    "topicName": "面向对象与虚函数",
    "file": "02-面向对象与虚函数.md",
    "num": 9,
    "title": "`virtual`、`override`、`final` 分别干什么？",
    "answer": "- `virtual`：启用动态绑定\n- `override`：显式声明覆盖，编译期检查基类虚函数存在\n- `final`：禁止再被覆盖，或禁止类再被继承",
    "followUp": ""
  },
  {
    "id": "oop-10",
    "topic": "oop",
    "topicName": "面向对象与虚函数",
    "file": "02-面向对象与虚函数.md",
    "num": 10,
    "title": "什么是 RTTI？`dynamic_cast` / `typeid` 怎么用？",
    "answer": "- RTTI：运行时类型信息，依赖多态类型（通常要有虚函数）\n- `dynamic_cast`：安全向下转换\n- `typeid`：查询类型信息\n- 代价：依赖类型信息表；滥用说明设计可能过弱（可考虑访问者模式等）",
    "followUp": ""
  },
  {
    "id": "oop-11",
    "topic": "oop",
    "topicName": "面向对象与虚函数",
    "file": "02-面向对象与虚函数.md",
    "num": 11,
    "title": "继承多态 vs `std::variant` / 类型擦除，怎么选？",
    "answer": "- **虚函数**：开放扩展新类型方便，调用有间接开销，适合插件式层次\n- **variant**：封闭集合，访问可静态分派、缓存友好，加新类型要改所有 visit\n- **类型擦除**（如 `std::function`、自定义 erase）：接口统一、可有堆分配与间接",
    "followUp": ""
  },
  {
    "id": "oop-12",
    "topic": "oop",
    "topicName": "面向对象与虚函数",
    "file": "02-面向对象与虚函数.md",
    "num": 12,
    "title": "拷贝构造、移动构造、赋值运算符在继承体系里要注意什么？",
    "answer": "- 基类资源要正确拷贝/移动；派生类别忘调用基类对应操作\n- 多态对象常禁止拷贝，或提供 `clone()` 虚函数做深拷贝\n- 赋值注意自赋值、异常安全；优先 Rule of Zero（成员自己管资源）",
    "followUp": ""
  },
  {
    "id": "smartptr-1",
    "topic": "smartptr",
    "topicName": "智能指针与RAII",
    "file": "03-智能指针与RAII.md",
    "num": 1,
    "title": "什么是 RAII？为什么 C++ 特别强调它？",
    "answer": "- **Resource Acquisition Is Initialization**：资源获取即初始化——在构造里获取，在析构里释放\n- 作用域结束（包括异常栈展开）会自动调析构 → 不易泄漏\n- 适用：内存、文件、锁、socket、句柄等\n- Core Guidelines 核心实践；优先对象管理资源，而不是裸 `new`/`lock`/`fopen`",
    "followUp": ""
  },
  {
    "id": "smartptr-2",
    "topic": "smartptr",
    "topicName": "智能指针与RAII",
    "file": "03-智能指针与RAII.md",
    "num": 2,
    "title": "`unique_ptr` / `shared_ptr` / `weak_ptr` 怎么选？",
    "answer": "| 类型 | 语义 | 特点 |\n|------|------|------|\n| `unique_ptr` | 独占所有权 | 几乎零开销，不可拷贝只可移动；默认首选 |\n| `shared_ptr` | 共享所有权 | 引用计数；有控制块开销 |\n| `weak_ptr` | 观察、不延长寿命 | 打破循环引用；使用前 `lock()` |\n\n原则：**能 unique 就不要 shared**。",
    "followUp": ""
  },
  {
    "id": "smartptr-3",
    "topic": "smartptr",
    "topicName": "智能指针与RAII",
    "file": "03-智能指针与RAII.md",
    "num": 3,
    "title": "`shared_ptr` 的原理？控制块里有什么？",
    "answer": "- 每个共享对象关联一块 **控制块**：强引用计数、弱引用计数、删除器、分配器等\n- `shared_ptr` 拷贝增加强引用；强引用归零时销毁对象；弱引用也归零时销毁控制块\n- `weak_ptr` 只影响弱计数，不阻止对象销毁",
    "followUp": "`make_shared` 和 `shared_ptr(new T)` 的区别？"
  },
  {
    "id": "smartptr-4",
    "topic": "smartptr",
    "topicName": "智能指针与RAII",
    "file": "03-智能指针与RAII.md",
    "num": 4,
    "title": "为什么推荐 `make_shared` / `make_unique`？",
    "answer": "1. **异常安全**：`foo(shared_ptr<T>(new T), bar())` 中若 `bar` 抛异常可能泄漏；`make_*` 更安全\n2. `make_shared` 常把**对象和控制块一次分配**，更好的局部性、少一次分配\n3. 自定义删除器 / 不公开构造时，可能仍需 `shared_ptr(new T, deleter)`",
    "followUp": ""
  },
  {
    "id": "smartptr-5",
    "topic": "smartptr",
    "topicName": "智能指针与RAII",
    "file": "03-智能指针与RAII.md",
    "num": 5,
    "title": "什么是循环引用？如何解决？",
    "answer": "- A 持有 B 的 `shared_ptr`，B 持有 A 的 `shared_ptr` → 计数永远不为 0 → 泄漏\n- 典型：父子、图中双向边、观察者\n- 解法：一侧改用 `weak_ptr`；或重新设计所有权（谁拥有谁）",
    "followUp": ""
  },
  {
    "id": "smartptr-6",
    "topic": "smartptr",
    "topicName": "智能指针与RAII",
    "file": "03-智能指针与RAII.md",
    "num": 6,
    "title": "`enable_shared_from_this` 解决什么问题？",
    "answer": "- 在成员函数里需要「指向 this 的 `shared_ptr`」时，不能直接 `shared_ptr<T>(this)`（会新建控制块 → 双重释放）\n- 继承 `enable_shared_from_this<T>`，用 `shared_from_this()`\n- 前提：对象必须已由某个 `shared_ptr` 管理；否则抛异常 / UB（视标准库）",
    "followUp": ""
  },
  {
    "id": "smartptr-7",
    "topic": "smartptr",
    "topicName": "智能指针与RAII",
    "file": "03-智能指针与RAII.md",
    "num": 7,
    "title": "`shared_ptr` 线程安全吗？",
    "answer": "- **控制块上的引用计数**是原子的，多线程拷贝/销毁 `shared_ptr` 管理同一对象通常安全\n- **被管理对象本身的读写**不保证线程安全，仍需 mutex / 原子 / 不可变设计\n- 多线程下**同一个 `shared_ptr` 实例**被并发读写（非 const）也不安全，应各线程持有自己的拷贝，或加锁保护该指针变量",
    "followUp": ""
  },
  {
    "id": "smartptr-8",
    "topic": "smartptr",
    "topicName": "智能指针与RAII",
    "file": "03-智能指针与RAII.md",
    "num": 8,
    "title": "`unique_ptr` 能用于数组吗？自定义删除器怎么写？",
    "answer": "- `unique_ptr<T[]>` 会用 `delete[]`\n- 自定义删除器：函数对象 / 函数指针 / lambda，作为模板第二参数或 `shared_ptr` 构造参数\n- 管理文件句柄、`malloc` 内存、C API 资源时很常见",
    "followUp": ""
  },
  {
    "id": "smartptr-9",
    "topic": "smartptr",
    "topicName": "智能指针与RAII",
    "file": "03-智能指针与RAII.md",
    "num": 9,
    "title": "智能指针和裸指针如何协作？",
    "answer": "- 所有权用智能指针；非拥有观察可用裸指针 / 引用 / `weak_ptr` / `span`\n- 不要从临时 `shared_ptr` 取出裸指针再长期保存\n- 函数参数：不涉及所有权传递时优先 `T*` / `T&` / `span`，避免无意义的智能指针传参增加计数",
    "followUp": ""
  },
  {
    "id": "smartptr-10",
    "topic": "smartptr",
    "topicName": "智能指针与RAII",
    "file": "03-智能指针与RAII.md",
    "num": 10,
    "title": "手写一个简易 `shared_ptr` 要考虑哪些点？（常考设计题）",
    "answer": "1. 控制块：强/弱计数（可用 `atomic`）\n2. 拷贝构造/赋值增减计数；析构减计数并在归零时 delete\n3. 移动语义：偷指针与控制块，源置空\n4. 自赋值安全\n5. 可选：`weak_ptr`、自定义删除器、`make_shared` 一体分配\n6. 线程安全策略要说清楚（计数原子 ≠ 对象安全）",
    "followUp": ""
  },
  {
    "id": "modern-1",
    "topic": "modern",
    "topicName": "现代C++与移动语义",
    "file": "04-现代C++与移动语义.md",
    "num": 1,
    "title": "什么是左值、右值？左值引用、右值引用？",
    "answer": "- **左值**：有身份、通常可取地址（变量名等）\n- **右值**：即将过期的临时量、字面量等（简化说法）\n- `T&` 绑左值；`T&&` 绑右值（可移动）\n- `const T&` 可绑临时量并延长生命周期（到引用所在作用域）\n\n更细：还有 xvalue / prvalue / glvalue（值类别），面试提到「可被移动的将亡值」即可加分。",
    "followUp": ""
  },
  {
    "id": "modern-2",
    "topic": "modern",
    "topicName": "现代C++与移动语义",
    "file": "04-现代C++与移动语义.md",
    "num": 2,
    "title": "移动语义解决什么问题？`std::move` 做了什么？",
    "answer": "- 避免不必要的深拷贝：把资源「偷」过来（指针移交），源置于可析构的空状态\n- `std::move` **不移动任何东西**，只是 `static_cast` 成右值引用，允许走移动构造/赋值\n- 移动后源对象应处于合法但未指定状态，通常不再使用其值",
    "followUp": ""
  },
  {
    "id": "modern-3",
    "topic": "modern",
    "topicName": "现代C++与移动语义",
    "file": "04-现代C++与移动语义.md",
    "num": 3,
    "title": "什么时候会调用移动构造而不是拷贝？",
    "answer": "1. 用右值初始化 / 赋值，且类提供移动操作\n2. 返回局部对象时可能发生 RVO/NRVO 或移动（C++17 起部分强制省略拷贝）\n3. 容器扩容时，元素若 noexcept 可移动，则移动，否则可能回退拷贝",
    "followUp": "为什么移动构造最好标 `noexcept`？（`vector` 强异常安全相关）"
  },
  {
    "id": "modern-4",
    "topic": "modern",
    "topicName": "现代C++与移动语义",
    "file": "04-现代C++与移动语义.md",
    "num": 4,
    "title": "三法则 / 五法则 / 零法则？",
    "answer": "- **三法则**（C++98）：析构、拷贝构造、拷贝赋值 —— 管资源则往往三者都要写\n- **五法则**（C++11）：再加上移动构造、移动赋值\n- **零法则**：尽量让成员（智能指针、容器、标准类型）自己管理资源，类本身不写特殊成员函数\n\n现代风格优先 **Rule of Zero**；必须管裸资源时再 Rule of Five。",
    "followUp": ""
  },
  {
    "id": "modern-5",
    "topic": "modern",
    "topicName": "现代C++与移动语义",
    "file": "04-现代C++与移动语义.md",
    "num": 5,
    "title": "完美转发是什么？`std::forward` 干什么？",
    "answer": "- 模板里既要接受左值也要接受右值，并**保持值类别**传给下层\n- 万能引用：`T&&` 在类型推导上下文中\n- `std::forward<T>(arg)`：左值保持左值，右值保持右值，避免多余拷贝/错误移动\n\n经典场景：工厂函数、`emplace`、包装器。",
    "followUp": ""
  },
  {
    "id": "modern-6",
    "topic": "modern",
    "topicName": "现代C++与移动语义",
    "file": "04-现代C++与移动语义.md",
    "num": 6,
    "title": "`auto` 和 `decltype` 的推导规则（常考点）？",
    "answer": "- `auto`：类似模板参数推导，会丢掉顶层 const / 引用（除非 `auto&` / `const auto&`）\n- `decltype(expr)`：保留更精确的类型与引用性\n- `decltype(auto)`：用 decltype 规则推导（如完美返回引用）\n- 结构化绑定、范围 for 里注意要不要 `&`",
    "followUp": ""
  },
  {
    "id": "modern-7",
    "topic": "modern",
    "topicName": "现代C++与移动语义",
    "file": "04-现代C++与移动语义.md",
    "num": 7,
    "title": "Lambda 捕获有哪些形式？悬空捕获怎么避免？",
    "answer": "- `[=]` 值捕获、`[&]` 引用捕获、指名捕获、C++14 初始化捕获\n- 引用捕获局部变量后，lambda 若逃逸出作用域 → 悬空\n- 异步 / 存起来的回调优先值捕获或 `shared_ptr`；注意 `this` 捕获生命周期",
    "followUp": ""
  },
  {
    "id": "modern-8",
    "topic": "modern",
    "topicName": "现代C++与移动语义",
    "file": "04-现代C++与移动语义.md",
    "num": 8,
    "title": "`std::function` 是什么？有什么代价？",
    "answer": "- 可调用对象的**类型擦除**包装（函数指针、lambda、函数对象）\n- 可能有堆分配与间接调用，不能内联\n- 小对象优化（SBO）时可能不堆分配，但是实现细节\n- 性能热点可考虑模板、函数指针、或更轻的包装",
    "followUp": ""
  },
  {
    "id": "modern-9",
    "topic": "modern",
    "topicName": "现代C++与移动语义",
    "file": "04-现代C++与移动语义.md",
    "num": 9,
    "title": "`=default` 和 `=delete` 的用途？",
    "answer": "- `=default`：显式要求编译器生成默认版本（如虚析构、移动）\n- `=delete`：禁止拷贝/移动/某些重载（如禁止按值传大对象的某个重载）\n- 声明自定义析构后，移动可能不再自动生成 —— 要清楚特殊成员函数的「生成规则」",
    "followUp": ""
  },
  {
    "id": "modern-10",
    "topic": "modern",
    "topicName": "现代C++与移动语义",
    "file": "04-现代C++与移动语义.md",
    "num": 10,
    "title": "列表初始化、收窄转换、`explicit`？",
    "answer": "- `{}` 初始化更防收窄（如 `double`→`int`）\n- `explicit` 构造函数禁止隐式转换，避免意外临时对象\n- 多参数构造、转换运算符也常标 `explicit`（C++11 起转换运算符可 explicit）",
    "followUp": ""
  },
  {
    "id": "stl-1",
    "topic": "stl",
    "topicName": "STL容器",
    "file": "05-STL容器.md",
    "num": 1,
    "title": "`vector` 的底层原理？扩容策略？",
    "answer": "- 动态数组：连续内存；`size` 与 `capacity`\n- 空间不足时分配更大块、搬迁元素、释放旧块（扩容因子实现相关，常见约 1.5～2 倍）\n- 均摊 O(1) 尾插；中间插入/删除 O(n)\n- 随机访问 O(1)，缓存友好",
    "followUp": "为什么搬迁后迭代器、指针、引用可能全部失效？"
  },
  {
    "id": "stl-2",
    "topic": "stl",
    "topicName": "STL容器",
    "file": "05-STL容器.md",
    "num": 2,
    "title": "`vector` 哪些操作导致迭代器失效？",
    "answer": "- **扩容**相关：`push_back` / `emplace_back` / `insert` / `reserve` 不足时再分配 → 几乎全部失效\n- **插入/删除**：插入点及之后迭代器失效；`erase` 返回新的下一位置迭代器\n- `reserve` 足够时可避免扩容失效；`shrink_to_fit` 可能再分配",
    "followUp": ""
  },
  {
    "id": "stl-3",
    "topic": "stl",
    "topicName": "STL容器",
    "file": "05-STL容器.md",
    "num": 3,
    "title": "`vector` vs `list` vs `deque`？",
    "answer": "| | vector | list | deque |\n|--|--|--|--|\n| 结构 | 连续数组 | 双向链表 | 分块数组 |\n| 随机访问 | O(1) | O(n) | 均摊 O(1) |\n| 头插 | O(n) | O(1) | 均摊 O(1) |\n| 尾插 | 均摊 O(1) | O(1) | 均摊 O(1) |\n| 缓存 | 最好 | 差 | 较好 |\n| 失效 | 扩容影响大 | 仅涉及时节点 | 两端插删时中间引用常仍有效（实现相关，需谨慎） |\n\n默认优先 `vector`，除非有明确链表/双端需求。",
    "followUp": ""
  },
  {
    "id": "stl-4",
    "topic": "stl",
    "topicName": "STL容器",
    "file": "05-STL容器.md",
    "num": 4,
    "title": "`map` 和 `unordered_map` 区别？",
    "answer": "| | `map` | `unordered_map` |\n|--|--|--|\n| 底层 | 红黑树（平衡 BST） | 哈希表 |\n| 复杂度 | 查找/插入 O(log n) | 均摊 O(1)，最坏 O(n) |\n| 有序 | 按 key 有序 | 无序 |\n| 对 key 要求 | 可比较 `<` | 可哈希 + 相等 |",
    "followUp": "哈希冲突怎么解决？负载因子？rehash 时迭代器？"
  },
  {
    "id": "stl-5",
    "topic": "stl",
    "topicName": "STL容器",
    "file": "05-STL容器.md",
    "num": 5,
    "title": "为什么 `unordered_map` 的 key 需要哈希和相等？自定义类型怎么用？",
    "answer": "- 特化 `std::hash<Key>` 或传自定义 Hash；提供 `operator==` 或 Equal\n- 相等的对象必须有相同哈希（一致性）\n- 哈希质量影响冲突与性能",
    "followUp": ""
  },
  {
    "id": "stl-6",
    "topic": "stl",
    "topicName": "STL容器",
    "file": "05-STL容器.md",
    "num": 6,
    "title": "`string` 的 SSO（小字符串优化）？",
    "answer": "- 短字符串存在对象内部缓冲区，避免堆分配\n- 超过阈值后改用堆\n- 阈值与布局是实现细节（libc++ / libstdc++ / MSVC 不同）\n- 影响：短串拷贝/移动成本、取 `data()` 后失效规则仍要注意",
    "followUp": ""
  },
  {
    "id": "stl-7",
    "topic": "stl",
    "topicName": "STL容器",
    "file": "05-STL容器.md",
    "num": 7,
    "title": "`reserve` 和 `resize` 区别？",
    "answer": "- `reserve(n)`：保证 capacity ≥ n，**不改变 size**，不构造新元素（对 vector）\n- `resize(n)`：改变 size；变大则默认构造/填充新元素，变小则析构多余元素",
    "followUp": ""
  },
  {
    "id": "stl-8",
    "topic": "stl",
    "topicName": "STL容器",
    "file": "05-STL容器.md",
    "num": 8,
    "title": "迭代器分类有哪些？对算法意味着什么？",
    "answer": "- 输入 / 输出 / 前向 / 双向 / 随机访问\n- 算法要求决定容器是否适用（如 `sort` 需要随机访问 → list 不行，要用 `list::sort`）\n- C++20 起 Concepts 把这些约束说得更清楚",
    "followUp": ""
  },
  {
    "id": "stl-9",
    "topic": "stl",
    "topicName": "STL容器",
    "file": "05-STL容器.md",
    "num": 9,
    "title": "`emplace` 和 `push`/`insert` 区别？",
    "answer": "- `emplace*`：原地构造，完美转发参数，少一次临时对象\n- `push_back(T{})` 可能先构造临时再移动/拷贝\n- 对不可拷贝类型、构造昂贵类型更友好；注意 `explicit` 构造与括号歧义",
    "followUp": ""
  },
  {
    "id": "stl-10",
    "topic": "stl",
    "topicName": "STL容器",
    "file": "05-STL容器.md",
    "num": 10,
    "title": "`vector<bool>` 有什么问题？",
    "answer": "- 特殊位压缩代理实现，不是真正的 `bool` 容器\n- 无法得到正常的 `bool&`；并发、部分泛型代码会出坑\n- 需要真正 bool 序列时用 `vector<char>` / `deque<bool>` / `bitset` 等按场景选择",
    "followUp": ""
  },
  {
    "id": "thread-1",
    "topic": "thread",
    "topicName": "多线程与内存模型",
    "file": "06-多线程与内存模型.md",
    "num": 1,
    "title": "进程和线程的区别？",
    "answer": "- 进程：资源分配单位（独立地址空间）\n- 线程：CPU 调度单位，同进程共享地址空间与大部分资源\n- 线程通信便宜但易数据竞争；进程隔离更好、IPC 成本高",
    "followUp": ""
  },
  {
    "id": "thread-2",
    "topic": "thread",
    "topicName": "多线程与内存模型",
    "file": "06-多线程与内存模型.md",
    "num": 2,
    "title": "什么是数据竞争？怎么避免？",
    "answer": "- 多线程同时访问同一内存，至少一方写入，且无同步 → C++ 中是 UB\n- 手段：mutex、原子操作、不可变数据、线程局部、消息传递（队列）\n- 「看起来偶尔对」仍可能是 UB，不能依赖",
    "followUp": ""
  },
  {
    "id": "thread-3",
    "topic": "thread",
    "topicName": "多线程与内存模型",
    "file": "06-多线程与内存模型.md",
    "num": 3,
    "title": "`mutex`、`lock_guard`、`unique_lock`、`scoped_lock`？",
    "answer": "- `mutex`：互斥锁原语\n- `lock_guard`：RAII 上锁，作用域结束解锁；简单不可推迟锁\n- `unique_lock`：更灵活（延迟锁、条件变量、转移所有权）\n- `scoped_lock`（C++17）：可同时锁多个，避免死锁（按固定算法加锁）",
    "followUp": ""
  },
  {
    "id": "thread-4",
    "topic": "thread",
    "topicName": "多线程与内存模型",
    "file": "06-多线程与内存模型.md",
    "num": 4,
    "title": "死锁的条件与预防？",
    "answer": "- 经典条件：互斥、占有且等待、不可抢占、循环等待\n- 预防：固定加锁顺序、一次性锁多个（`scoped_lock`）、超时锁、缩小临界区、避免嵌套锁、无锁结构 / 分层设计",
    "followUp": ""
  },
  {
    "id": "thread-5",
    "topic": "thread",
    "topicName": "多线程与内存模型",
    "file": "06-多线程与内存模型.md",
    "num": 5,
    "title": "`atomic` 和 `volatile` 区别？（高频坑）",
    "answer": "- `atomic`：原子性 + 内存序语义，用于并发\n- `volatile`：禁止编译器「优化掉」对该对象的读写（硬件寄存器、信号处理等），**不是**线程安全工具\n- 多线程共享可变状态用 `atomic` / mutex，不要用 `volatile` 当锁",
    "followUp": ""
  },
  {
    "id": "thread-6",
    "topic": "thread",
    "topicName": "多线程与内存模型",
    "file": "06-多线程与内存模型.md",
    "num": 6,
    "title": "内存序（memory order）是干什么的？常见几档？",
    "answer": "- 约束指令重排与可见性，定义线程间同步 happens-before\n- 常见：\n  - `memory_order_relaxed`：只保证原子性\n  - `acquire` / `release`：同步一对，建立可见性\n  - `acq_rel`：读改写\n  - `seq_cst`：默认最强，全局总序，最好懂但可能更慢\n- 面试能说清「计数器用 relaxed，发布数据用 release-acquire」即加分",
    "followUp": ""
  },
  {
    "id": "thread-7",
    "topic": "thread",
    "topicName": "多线程与内存模型",
    "file": "06-多线程与内存模型.md",
    "num": 7,
    "title": "条件变量怎么用？为什么要和 mutex 一起？",
    "answer": "1. 线程持锁检查条件；不满足则 `wait`（原子地解锁并休眠）\n2. 被 `notify` 唤醒后重新加锁并**再次检查条件**（防虚假唤醒）\n3. 典型：生产者-消费者队列\n4. 用 `unique_lock`；谓词重载 `wait(lock, pred)` 更安全",
    "followUp": ""
  },
  {
    "id": "thread-8",
    "topic": "thread",
    "topicName": "多线程与内存模型",
    "file": "06-多线程与内存模型.md",
    "num": 8,
    "title": "`async` / `future` / `promise` / `packaged_task`？",
    "answer": "- `promise` 设置值，`future` 获取结果（可跨线程）\n- `packaged_task` 包装可调用对象并关联 future\n- `async`：异步执行策略（可能新线程或延迟惰性）\n- 注意 `async` 的 future 析构可能阻塞；明确策略与生命周期",
    "followUp": ""
  },
  {
    "id": "thread-9",
    "topic": "thread",
    "topicName": "多线程与内存模型",
    "file": "06-多线程与内存模型.md",
    "num": 9,
    "title": "假共享（false sharing）是什么？",
    "answer": "- 不同线程写的变量落在同一缓存行 → 缓存行来回失效，性能骤降\n- 对策：对齐填充、按线程分核数据、批处理减少跨核写",
    "followUp": ""
  },
  {
    "id": "thread-10",
    "topic": "thread",
    "topicName": "多线程与内存模型",
    "file": "06-多线程与内存模型.md",
    "num": 10,
    "title": "线程池为什么比每任务 `thread` 更好？实现要点？",
    "answer": "- 避免频繁创建/销毁线程；控制并发度；复用工作线程\n- 要点：任务队列 + 条件变量、优雅停机、异常处理、可选工作窃取\n- 和无锁队列、优先级队列等可扩展讨论",
    "followUp": ""
  },
  {
    "id": "template-1",
    "topic": "template",
    "topicName": "模板与泛型",
    "file": "07-模板与泛型.md",
    "num": 1,
    "title": "函数模板和类模板？实例化发生在什么时候？",
    "answer": "- 模板是编译期代码生成机制；用到具体类型时**实例化**\n- 定义通常放头文件（或显式实例化）\n- 编译错误常又臭又长，因为在实例化点展开",
    "followUp": ""
  },
  {
    "id": "template-2",
    "topic": "template",
    "topicName": "模板与泛型",
    "file": "07-模板与泛型.md",
    "num": 2,
    "title": "全特化与偏特化？",
    "answer": "- **全特化**：针对完全确定的模板实参给出实现\n- **偏特化**：只针对类模板；固定部分参数或加约束形式（函数模板用重载/SFINAE/concepts 代替偏特化）\n- 常用于类型特质（type traits）",
    "followUp": ""
  },
  {
    "id": "template-3",
    "topic": "template",
    "topicName": "模板与泛型",
    "file": "07-模板与泛型.md",
    "num": 3,
    "title": "什么是 SFINAE？",
    "answer": "- **Substitution Failure Is Not An Error**：替换失败不是错误，而是丢掉该重载候选\n- 用于在模板重载集里按类型能力启用/禁用接口（`enable_if`、`void_t` 等）\n- C++20 起大量场景被 **Concepts** 替代，可读性更好",
    "followUp": ""
  },
  {
    "id": "template-4",
    "topic": "template",
    "topicName": "模板与泛型",
    "file": "07-模板与泛型.md",
    "num": 4,
    "title": "可变参数模板怎么用？典型场景？",
    "answer": "- `typename... Args`，包展开、递归或 fold expression（C++17）\n- 场景：`emplace`、日志、元组、转发工厂、类型列表元编程",
    "followUp": ""
  },
  {
    "id": "template-5",
    "topic": "template",
    "topicName": "模板与泛型",
    "file": "07-模板与泛型.md",
    "num": 5,
    "title": "完美转发与引用折叠规则？（简述）",
    "answer": "- 万能引用 `T&&` + `std::forward`\n- 引用折叠：`T& &` → `T&`，`T&& &&` → `T&&` 等\n- 目的是既绑左值又绑右值且不丢类别",
    "followUp": ""
  },
  {
    "id": "template-6",
    "topic": "template",
    "topicName": "模板与泛型",
    "file": "07-模板与泛型.md",
    "num": 6,
    "title": "CRTP 是什么？解决什么问题？",
    "answer": "- **Curiously Recurring Template Pattern**：`template<class D> class Base { ... static_cast<D*>(this) ... }; class Derived : public Base<Derived>`\n- **编译期多态**：无虚表间接，可内联\n- 用于静态接口、混入、减少虚调用开销",
    "followUp": ""
  },
  {
    "id": "template-7",
    "topic": "template",
    "topicName": "模板与泛型",
    "file": "07-模板与泛型.md",
    "num": 7,
    "title": "类型擦除（type erasure）常见实现？",
    "answer": "- 虚基类接口 + 堆上派生包装\n- `std::function`、`std::any`、自定义 concept-based 设计\n- 代价：分配与间接；收益：统一异构可调用/可存储",
    "followUp": ""
  },
  {
    "id": "template-8",
    "topic": "template",
    "topicName": "模板与泛型",
    "file": "07-模板与泛型.md",
    "num": 8,
    "title": "C++20 Concepts 相对 SFINAE 的好处？",
    "answer": "- 约束写在接口上，错误信息更友好\n- `requires` 子句表达能力清晰\n- 逐步替代繁琐 `enable_if` 技巧（遗留代码仍常见 SFINAE）",
    "followUp": ""
  },
  {
    "id": "build-1",
    "topic": "build",
    "topicName": "编译链接与工程杂项",
    "file": "08-编译链接与工程杂项.md",
    "num": 1,
    "title": "从源码到可执行文件经历哪些阶段？",
    "answer": "1. **预处理**：头文件展开、宏替换 → 翻译单元\n2. **编译**：语法/语义分析 → 汇编 / 目标文件（.o/.obj）\n3. **汇编**：生成机器码目标文件\n4. **链接**：合并符号、重定位，生成可执行文件或库\n5. 还有优化遍、LTO 等可选",
    "followUp": ""
  },
  {
    "id": "build-2",
    "topic": "build",
    "topicName": "编译链接与工程杂项",
    "file": "08-编译链接与工程杂项.md",
    "num": 2,
    "title": "静态库和动态库区别？",
    "answer": "| | 静态库 (.a/.lib) | 动态库 (.so/.dll) |\n|--|--|--|\n| 链接时机 | 链接期打进产物 | 运行期加载 |\n| 体积 | 可执行文件更大 | 可共享，省内存/磁盘 |\n| 更新 | 需重新链接应用 | 可替换库（注意 ABI） |\n| 启动 | 无额外加载 | 需加载与符号解析 |",
    "followUp": ""
  },
  {
    "id": "build-3",
    "topic": "build",
    "topicName": "编译链接与工程杂项",
    "file": "08-编译链接与工程杂项.md",
    "num": 3,
    "title": "什么是 ODR（One Definition Rule）？",
    "answer": "- 同一实体在整个程序中只能有一个定义（特例：inline / 模板在每个 TU 可有相同定义）\n- 违反 ODR：重复定义链接错误，或更糟的静默 UB（定义不一致）\n- 头文件里普通非 inline 函数/变量定义是常见坑 → 用 inline、放 .cpp、或 `inline` 变量（C++17）",
    "followUp": ""
  },
  {
    "id": "build-4",
    "topic": "build",
    "topicName": "编译链接与工程杂项",
    "file": "08-编译链接与工程杂项.md",
    "num": 4,
    "title": "`inline` 在现代 C++ 里主要意味什么？",
    "answer": "- 历史：给编译器内联暗示（现已弱化）\n- 现代更重要：**允许在多个翻译单元有相同定义**（函数、变量）\n- 是否真正内联由编译器决定；`inline` 不保证内联",
    "followUp": ""
  },
  {
    "id": "build-5",
    "topic": "build",
    "topicName": "编译链接与工程杂项",
    "file": "08-编译链接与工程杂项.md",
    "num": 5,
    "title": "声明和定义的区别？头文件该放什么？",
    "answer": "- 声明引入名字；定义完成实体（分配存储/给出函数体）\n- 头文件：声明、类定义、模板、inline/constexpr、常量\n- 源文件：非 inline 函数实现、全局变量定义",
    "followUp": ""
  },
  {
    "id": "build-6",
    "topic": "build",
    "topicName": "编译链接与工程杂项",
    "file": "08-编译链接与工程杂项.md",
    "num": 6,
    "title": "异常安全的三个等级？",
    "answer": "1. **基本保证**：抛异常后无泄漏，对象可用但不确定值\n2. **强保证**：操作失败则状态回滚如未调用（如 copy-and-swap）\n3. **不抛保证**：保证不抛（析构、move 常期望 noexcept）\n\n析构函数中一般不要让异常逃逸。",
    "followUp": ""
  },
  {
    "id": "build-7",
    "topic": "build",
    "topicName": "编译链接与工程杂项",
    "file": "08-编译链接与工程杂项.md",
    "num": 7,
    "title": "栈展开（stack unwinding）是什么？",
    "answer": "- 异常抛出后，沿调用栈回退，销毁已构造的自动对象（调析构）\n- 因此 RAII 在异常路径上依然能释放资源\n- `catch` 按类型匹配；`catch(...)` 兜底；重新抛出用 `throw;`",
    "followUp": ""
  },
  {
    "id": "build-8",
    "topic": "build",
    "topicName": "编译链接与工程杂项",
    "file": "08-编译链接与工程杂项.md",
    "num": 8,
    "title": "`const` 成员函数、`mutable`、逻辑 const？",
    "answer": "- `const` 成员函数不可修改普通非静态成员（除非 `mutable`）\n- `mutable`：用于缓存、互斥锁等不影响抽象状态的字段\n- 比特 const vs 逻辑 const 的区分常被追问",
    "followUp": ""
  },
  {
    "id": "build-9",
    "topic": "build",
    "topicName": "编译链接与工程杂项",
    "file": "08-编译链接与工程杂项.md",
    "num": 9,
    "title": "什么是 ABI？升级编译器 / 标准库要注意什么？",
    "answer": "- ABI：二进制接口（对象布局、调用约定、名称修饰、标准库布局）\n- 不同编译器、甚至同编译器不同版本、不同标准库实现可能不兼容\n- 动态库对外接口要稳定；跨 DLL 传 STL 对象尤其危险",
    "followUp": ""
  },
  {
    "id": "build-10",
    "topic": "build",
    "topicName": "编译链接与工程杂项",
    "file": "08-编译链接与工程杂项.md",
    "num": 10,
    "title": "后端 C++ 岗还常顺带问哪些（简表）？",
    "answer": "可另开专题，此处作检查清单：\n\n- **OS**：虚拟内存、缺页、用户态/内核态、零拷贝概念\n- **网络**：TCP 握手/状态、粘包、epoll/IOCP、Reactor\n- **存储**：B+ 树、WAL、缓存淘汰\n- **性能**：火焰图、伪共享、分支预测、SIMD 概念\n- **工程**：CMake、sanitizer、coredump、协议兼容\n\n结合岗位 JD 加深，不必一次背完。",
    "followUp": ""
  }
];
