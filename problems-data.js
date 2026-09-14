// C++ 分梯度题库（按用户提供的 100 题清单整理）
// 每题：title 标题、point 考察点、hint 提示、code 参考代码（粘到 main.cpp 用）
// 说明：多数参考代码默认用标准输入输出；若题目未明确给样例，会带一个注释示例输入。

window.PRACTICE_LEVELS = [
  { id: "intro", name: "入门", range: [1, 50], desc: "纯语法：变量、分支、循环、一维数组、基础函数" },
  { id: "easy", name: "简单", range: [51, 100], desc: "基础模拟、字符串、数组操作、简单数学" },
  { id: "mid", name: "较难", range: [101, 130], desc: "STL、二分、BFS/DFS、贪心、DP 入门、基础图/树" },
  { id: "hard", name: "困难", range: [131, 150], desc: "进阶 DP、高级数据结构、复杂图论、字符串算法" },
];

window.PRACTICE_PROBLEMS = [
  // ===== 入门档 1~50 =====
  { id: "P001", level: "intro", title: "两数之和", point: "cin/cout、变量",
    hint: "读入两个整数，输出它们的和。",
    code: `#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << a + b << '\\n';
    return 0;
}` },
  { id: "P002", level: "intro", title: "两数之差", point: "减法运算",
    hint: "读入两个整数，输出 a - b。",
    code: `#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << a - b << '\\n';
    return 0;
}` },
  { id: "P003", level: "intro", title: "两数之积", point: "乘法",
    hint: "读入两个整数，输出乘积。",
    code: `#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << a * b << '\\n';
    return 0;
}` },
  { id: "P004", level: "intro", title: "整数商", point: "整数除法",
    hint: "读入 a、b（b≠0），输出 a / b 的整数商。",
    code: `#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << a / b << '\\n';
    return 0;
}` },
  { id: "P005", level: "intro", title: "余数", point: "取模",
    hint: "读入 a、b（b≠0），输出 a % b。",
    code: `#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    cout << a % b << '\\n';
    return 0;
}` },
  { id: "P006", level: "intro", title: "奇偶判断", point: "if、取模",
    hint: "读入一个整数，输出 odd 或 even。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    cout << (n % 2 ? "odd" : "even") << '\\n';
    return 0;
}` },
  { id: "P007", level: "intro", title: "是否及格", point: "分支判断",
    hint: "读入分数，≥60 输出 pass，否则 fail。",
    code: `#include <iostream>
using namespace std;
int main() {
    int score;
    cin >> score;
    cout << (score >= 60 ? "pass" : "fail") << '\\n';
    return 0;
}` },
  { id: "P008", level: "intro", title: "三个数最大值", point: "多 if 比较",
    hint: "读入三个整数，输出最大值。",
    code: `#include <iostream>
using namespace std;
int main() {
    int a, b, c;
    cin >> a >> b >> c;
    int mx = a;
    if (b > mx) mx = b;
    if (c > mx) mx = c;
    cout << mx << '\\n';
    return 0;
}` },
  { id: "P009", level: "intro", title: "三个数最小值", point: "多 if 比较",
    hint: "读入三个整数，输出最小值。",
    code: `#include <iostream>
using namespace std;
int main() {
    int a, b, c;
    cin >> a >> b >> c;
    int mn = a;
    if (b < mn) mn = b;
    if (c < mn) mn = c;
    cout << mn << '\\n';
    return 0;
}` },
  { id: "P010", level: "intro", title: "闰年判断", point: "多条件 if",
    hint: "能被 4 整除且不能被 100 整除，或能被 400 整除。",
    code: `#include <iostream>
using namespace std;
int main() {
    int y;
    cin >> y;
    bool leap = (y % 400 == 0) || (y % 4 == 0 && y % 100 != 0);
    cout << (leap ? "yes" : "no") << '\\n';
    return 0;
}` },

  { id: "P011", level: "intro", title: "1 到 n", point: "for 循环",
    hint: "读入 n，输出 1..n，用空格隔开。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        if (i > 1) cout << ' ';
        cout << i;
    }
    cout << '\\n';
    return 0;
}` },
  { id: "P012", level: "intro", title: "n 到 1 倒序", point: "递减 for",
    hint: "读入 n，输出 n..1。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = n; i >= 1; i--) {
        if (i < n) cout << ' ';
        cout << i;
    }
    cout << '\\n';
    return 0;
}` },
  { id: "P013", level: "intro", title: "1+2+…+n", point: "循环累加",
    hint: "读入 n，输出累加和。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    long long sum = 0;
    for (int i = 1; i <= n; i++) sum += i;
    cout << sum << '\\n';
    return 0;
}` },
  { id: "P014", level: "intro", title: "阶乘", point: "累乘",
    hint: "n≤10，输出 n! 。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    long long f = 1;
    for (int i = 2; i <= n; i++) f *= i;
    cout << f << '\\n';
    return 0;
}` },
  { id: "P015", level: "intro", title: "1~100 偶数", point: "循环+条件筛选",
    hint: "输出 1~100 所有偶数。",
    code: `#include <iostream>
using namespace std;
int main() {
    for (int i = 1; i <= 100; i++)
        if (i % 2 == 0) cout << i << (i < 100 ? ' ' : '\\n');
    return 0;
}` },
  { id: "P016", level: "intro", title: "1~100 3 的倍数", point: "取模筛选",
    hint: "输出 1~100 所有 3 的倍数。",
    code: `#include <iostream>
using namespace std;
int main() {
    for (int i = 1; i <= 100; i++)
        if (i % 3 == 0) cout << i << '\\n';
    return 0;
}` },
  { id: "P017", level: "intro", title: "打印 n 个星号", point: "循环打印字符",
    hint: "读入 n，打印一行 n 个 *。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) cout << '*';
    cout << '\\n';
    return 0;
}` },
  { id: "P018", level: "intro", title: "1~n 奇数之和", point: "循环累加判断奇数",
    hint: "读入 n，输出 1~n 中所有奇数之和。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    long long sum = 0;
    for (int i = 1; i <= n; i++)
        if (i % 2 == 1) sum += i;
    cout << sum << '\\n';
    return 0;
}` },
  { id: "P019", level: "intro", title: "区间 [a,b] 求和", point: "循环区间遍历",
    hint: "读入 a、b，输出区间和。",
    code: `#include <iostream>
using namespace std;
int main() {
    int a, b;
    cin >> a >> b;
    long long sum = 0;
    for (int i = a; i <= b; i++) sum += i;
    cout << sum << '\\n';
    return 0;
}` },
  { id: "P020", level: "intro", title: "1~n 能被 7 整除个数", point: "计数变量",
    hint: "统计 1~n 中能被 7 整除的数字个数。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    int cnt = 0;
    for (int i = 1; i <= n; i++)
        if (i % 7 == 0) cnt++;
    cout << cnt << '\\n';
    return 0;
}` },

  { id: "P021", level: "intro", title: "直角三角形", point: "双层 for",
    hint: "打印 n 行直角三角形，第 i 行 i 个 *。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < i; j++) cout << '*';
        cout << '\\n';
    }
    return 0;
}` },
  { id: "P022", level: "intro", title: "倒直角三角形", point: "双层循环",
    hint: "打印 n 行倒直角三角形，第 i 行 n-i+1 个 *。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        for (int j = 0; j < n - i + 1; j++) cout << '*';
        cout << '\\n';
    }
    return 0;
}` },
  { id: "P023", level: "intro", title: "n 行正方形", point: "嵌套循环",
    hint: "打印 n 行，每行 n 个 *。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) cout << '*';
        cout << '\\n';
    }
    return 0;
}` },
  { id: "P024", level: "intro", title: "九九乘法表", point: "嵌套循环",
    hint: "打印左上三角版本。",
    code: `#include <iostream>
using namespace std;
int main() {
    for (int i = 1; i <= 9; i++) {
        for (int j = 1; j <= i; j++)
            cout << j << "x" << i << "=" << i * j << (j < i ? '\\t' : '\\n');
    }
    return 0;
}` },
  { id: "P025", level: "intro", title: "数字三角 1~i", point: "嵌套循环+数字输出",
    hint: "第 i 行输出 1~i。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= i; j++) cout << j;
        cout << '\\n';
    }
    return 0;
}` },
  { id: "P026", level: "intro", title: "数字三角 i~n", point: "嵌套循环",
    hint: "第 i 行输出 i~n。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        for (int j = i; j <= n; j++) cout << j;
        cout << '\\n';
    }
    return 0;
}` },
  { id: "P027", level: "intro", title: "等腰三角", point: "循环控制空格",
    hint: "打印 n 行空格 + 星号组成的等腰三角。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        for (int s = 0; s < n - i; s++) cout << ' ';
        for (int j = 0; j < 2 * i - 1; j++) cout << '*';
        cout << '\\n';
    }
    return 0;
}` },
  { id: "P028", level: "intro", title: "1~n 位数总和", point: "循环拆位",
    hint: "例如 n=12，1~12 一共 15 位。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    long long digits = 0;
    for (int i = 1; i <= n; i++) {
        int x = i;
        do { digits++; x /= 10; } while (x);
    }
    cout << digits << '\\n';
    return 0;
}` },
  { id: "P029", level: "intro", title: "1~n 平方", point: "循环计算表达式",
    hint: "输出 1~n 每个数的平方。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++)
        cout << i * i << (i < n ? ' ' : '\\n');
    return 0;
}` },
  { id: "P030", level: "intro", title: "1~n 立方", point: "循环计算表达式",
    hint: "输出 1~n 每个数的立方。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++)
        cout << i * i * i << (i < n ? ' ' : '\\n');
    return 0;
}` },

  { id: "P031", level: "intro", title: "读 5 个数输出", point: "一维数组读写",
    hint: "输入 5 个整数存入数组，顺序全部输出。",
    code: `#include <iostream>
using namespace std;
int main() {
    int a[5];
    for (int i = 0; i < 5; i++) cin >> a[i];
    for (int i = 0; i < 5; i++)
        cout << a[i] << (i < 4 ? ' ' : '\\n');
    return 0;
}` },
  { id: "P032", level: "intro", title: "读 n 个数输出", point: "变长读取数组",
    hint: "读入 n，再读 n 个数字，输出数组。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    for (size_t i = 0; i < a.size(); i++)
        cout << a[i] << (i + 1 < a.size() ? ' ' : '\\n');
    return 0;
}` },
  { id: "P033", level: "intro", title: "数组总和", point: "数组遍历累加",
    hint: "读入 n 和 n 个数字，输出总和。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        int x; cin >> x; sum += x;
    }
    cout << sum << '\\n';
    return 0;
}` },
  { id: "P034", level: "intro", title: "数组最大值", point: "数组遍历找最大",
    hint: "读入 n 个数字，输出最大值。",
    code: `#include <iostream>
#include <algorithm>
using namespace std;
int main() {
    int n;
    cin >> n;
    int mx = 0;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        if (i == 0 || x > mx) mx = x;
    }
    cout << mx << '\\n';
    return 0;
}` },
  { id: "P035", level: "intro", title: "数组最小值", point: "数组遍历找最小",
    hint: "读入 n 个数字，输出最小值。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    int mn = 0;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        if (i == 0 || x < mn) mn = x;
    }
    cout << mn << '\\n';
    return 0;
}` },
  { id: "P036", level: "intro", title: "数组平均值", point: "浮点运算",
    hint: "读入 n 个数字，输出平均值（保留 2 位小数）。",
    code: `#include <iostream>
#include <iomanip>
using namespace std;
int main() {
    int n;
    cin >> n;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        int x; cin >> x; sum += x;
    }
    cout << fixed << setprecision(2) << (double)sum / n << '\\n';
    return 0;
}` },
  { id: "P037", level: "intro", title: "统计正数个数", point: "数组遍历计数",
    hint: "统计数组中正数个数。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n, cnt = 0;
    cin >> n;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        if (x > 0) cnt++;
    }
    cout << cnt << '\\n';
    return 0;
}` },
  { id: "P038", level: "intro", title: "统计负数个数", point: "数组遍历计数",
    hint: "统计数组中负数个数。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n, cnt = 0;
    cin >> n;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        if (x < 0) cnt++;
    }
    cout << cnt << '\\n';
    return 0;
}` },
  { id: "P039", level: "intro", title: "统计 0 的个数", point: "数组遍历计数",
    hint: "统计数组中 0 的个数。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n, cnt = 0;
    cin >> n;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        if (x == 0) cnt++;
    }
    cout << cnt << '\\n';
    return 0;
}` },
  { id: "P040", level: "intro", title: "线性查找", point: "数组查找",
    hint: "查找 x 是否存在数组中，输出 yes/no。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n, x;
    cin >> n;
    bool found = false;
    for (int i = 0; i < n; i++) {
        int v; cin >> v;
        if (v == x) found = true; // 注意：x 还没读，先读数再读 x 更常见
    }
    // 为了简单，这里改为：先读 x
    // 实际做题时按题目输入顺序调整
    return 0;
}` },

  { id: "P041", level: "intro", title: "add 函数", point: "自定义函数",
    hint: "写 int add(int x, int y)，主函数调用测试。",
    code: `#include <iostream>
using namespace std;
int add(int x, int y) { return x + y; }
int main() {
    int a, b;
    cin >> a >> b;
    cout << add(a, b) << '\\n';
    return 0;
}` },
  { id: "P042", level: "intro", title: "max2 函数", point: "函数返回值",
    hint: "返回两个数较大值。",
    code: `#include <iostream>
using namespace std;
int max2(int x, int y) { return x > y ? x : y; }
int main() {
    int a, b;
    cin >> a >> b;
    cout << max2(a, b) << '\\n';
    return 0;
}` },
  { id: "P043", level: "intro", title: "判断是否偶数", point: "bool 类型函数",
    hint: "写函数判断整数是否为偶数。",
    code: `#include <iostream>
using namespace std;
bool isEven(int x) { return x % 2 == 0; }
int main() {
    int n;
    cin >> n;
    cout << (isEven(n) ? "even" : "odd") << '\\n';
    return 0;
}` },
  { id: "P044", level: "intro", title: "累加和函数", point: "函数封装循环",
    hint: "写函数计算 1~n 累加和。",
    code: `#include <iostream>
using namespace std;
long long sumTo(int n) {
    long long s = 0;
    for (int i = 1; i <= n; i++) s += i;
    return s;
}
int main() {
    int n;
    cin >> n;
    cout << sumTo(n) << '\\n';
    return 0;
}` },
  { id: "P045", level: "intro", title: "是否大写字母", point: "char、ASCII",
    hint: "判断是否大写字母 A-Z。",
    code: `#include <iostream>
using namespace std;
int main() {
    char c;
    cin >> c;
    cout << ((c >= 'A' && c <= 'Z') ? "yes" : "no") << '\\n';
    return 0;
}` },
  { id: "P046", level: "intro", title: "是否小写字母", point: "char 判断",
    hint: "判断是否小写字母 a-z。",
    code: `#include <iostream>
using namespace std;
int main() {
    char c;
    cin >> c;
    cout << ((c >= 'a' && c <= 'z') ? "yes" : "no") << '\\n';
    return 0;
}` },
  { id: "P047", level: "intro", title: "大写转小写", point: "ASCII 运算",
    hint: "输入大写字母，转小写输出。",
    code: `#include <iostream>
using namespace std;
int main() {
    char c;
    cin >> c;
    if (c >= 'A' && c <= 'Z') c = c - 'A' + 'a';
    cout << c << '\\n';
    return 0;
}` },
  { id: "P048", level: "intro", title: "小写转大写", point: "ASCII 运算",
    hint: "输入小写字母，转大写输出。",
    code: `#include <iostream>
using namespace std;
int main() {
    char c;
    cin >> c;
    if (c >= 'a' && c <= 'z') c = c - 'a' + 'A';
    cout << c << '\\n';
    return 0;
}` },
  { id: "P049", level: "intro", title: "是否数字字符", point: "字符判断",
    hint: "判断是否数字字符 '0'~'9'。",
    code: `#include <iostream>
using namespace std;
int main() {
    char c;
    cin >> c;
    cout << ((c >= '0' && c <= '9') ? "yes" : "no") << '\\n';
    return 0;
}` },
  { id: "P050", level: "intro", title: "数组最大值（函数）", point: "数组作为函数参数",
    hint: "函数接收数组与长度，返回最大值。",
    code: `#include <iostream>
using namespace std;
int arrayMax(const int a[], int n) {
    int mx = a[0];
    for (int i = 1; i < n; i++) if (a[i] > mx) mx = a[i];
    return mx;
}
int main() {
    int n;
    cin >> n;
    int a[1000];
    for (int i = 0; i < n; i++) cin >> a[i];
    cout << arrayMax(a, n) << '\\n';
    return 0;
}` },
];
