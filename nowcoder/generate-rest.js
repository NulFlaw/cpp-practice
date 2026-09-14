/**
 * 生成牛客风格题库（简单/较难/困难）
 * 运行：node generate-rest.js
 */
const fs = require("fs");
const path = require("path");

function problem(num, title, desc, inputDesc, outputDesc, sampleIn, sampleOut, hint, code) {
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

function wrapMain(body) {
  return `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
#include <cmath>
#include <cstring>
#include <queue>
#include <stack>
#include <map>
#include <set>
#include <sstream>
#include <iomanip>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
${body}
    return 0;
}`;
}

const easy = [];

// 1~10 简单数学
easy.push(problem(1, "拆位输出",
  "输入一个非负整数 $n$，按从高到低的顺序输出它的每一位数字，数字之间用空格隔开。",
  "一行，一个非负整数 $n$（$0 \\le n \\le 10^{18}$）。",
  "一行，输出各位数字，相邻数字用空格隔开。",
  "123",
  "1 2 3",
  "注意 $n=0$ 时应输出 `0`。",
  wrapMain(`
    long long n;
    cin >> n;
    if (n == 0) {
        cout << "0\\n";
        return 0;
    }
    int d[20], cnt = 0;
    // 拆位：从低到高取出
    while (n > 0) {
        d[cnt++] = n % 10;
        n /= 10;
    }
    for (int i = cnt - 1; i >= 0; i--) {
        if (i < cnt - 1) cout << ' ';
        cout << d[i];
    }
    cout << '\\n';
`)));

easy.push(problem(2, "反转数字",
  "输入一个非负整数 $n$，将其数字反转后输出。注意：若反转后有前导零，前导零不输出（例如 $100$ 反转后为 $1$）。",
  "一行，一个非负整数 $n$（$0 \\le n \\le 10^{9}$）。",
  "一行，输出反转后的整数。",
  "123",
  "321",
  "边界：输入 `100` 输出 `1`；输入 `0` 输出 `0`。",
  wrapMain(`
    long long n;
    cin >> n;
    long long r = 0;
    // 不断取末位拼到结果上
    while (n > 0) {
        r = r * 10 + n % 10;
        n /= 10;
    }
    cout << r << '\\n';
`)));

easy.push(problem(3, "回文整数判断",
  "输入一个非负整数 $n$，判断它是否为回文数（正读与反读相同）。是则输出 `yes`，否则输出 `no`。",
  "一行，一个非负整数 $n$（$0 \\le n \\le 10^{9}$）。",
  "一行，输出 `yes` 或 `no`。",
  "1221",
  "yes",
  "例如 `123` 不是回文；`0` 是回文。",
  wrapMain(`
    long long n;
    cin >> n;
    long long t = n, r = 0;
    while (t > 0) {
        r = r * 10 + t % 10;
        t /= 10;
    }
    cout << (r == n ? "yes" : "no") << '\\n';
`)));

easy.push(problem(4, "素数判断",
  "输入一个正整数 $n$，判断它是否为素数。是则输出 `yes`，否则输出 `no`。",
  "一行，一个正整数 $n$（$1 \\le n \\le 10^{7}$）。",
  "一行，输出 `yes` 或 `no`。",
  "17",
  "yes",
  "$1$ 不是素数。枚举到 $\\sqrt{n}$ 即可。",
  wrapMain(`
    int n;
    cin >> n;
    if (n < 2) {
        cout << "no\\n";
        return 0;
    }
    bool ok = true;
    for (int i = 2; 1LL * i * i <= n; i++) {
        if (n % i == 0) {
            ok = false;
            break;
        }
    }
    cout << (ok ? "yes" : "no") << '\\n';
`)));

easy.push(problem(5, "最大公约数",
  "输入两个正整数 $a$ 和 $b$，求它们的最大公约数。",
  "一行，两个正整数 $a$ 和 $b$（$1 \\le a,b \\le 10^{9}$）。",
  "一行，输出 $\\gcd(a,b)$。",
  "12 18",
  "6",
  "使用辗转相除法。",
  wrapMain(`
    long long a, b;
    cin >> a >> b;
    while (b != 0) {
        long long t = a % b;
        a = b;
        b = t;
    }
    cout << a << '\\n';
`)));

easy.push(problem(6, "最小公倍数",
  "输入两个正整数 $a$ 和 $b$，求它们的最小公倍数。",
  "一行，两个正整数 $a$ 和 $b$（$1 \\le a,b \\le 10^{6}$）。",
  "一行，输出 $\\mathrm{lcm}(a,b)$。",
  "4 6",
  "12",
  "利用公式 $\\mathrm{lcm}(a,b)=a/\\gcd(a,b)\\times b$，注意先除后乘防止溢出。",
  wrapMain(`
    long long a, b;
    cin >> a >> b;
    long long x = a, y = b;
    while (y != 0) {
        long long t = x % y;
        x = y;
        y = t;
    }
    cout << a / x * b << '\\n';
`)));

easy.push(problem(7, "输出 1～100 所有素数",
  "输出 $1$ 到 $100$ 之间的所有素数，每个素数占一行。",
  "无输入。",
  "若干行，从小到大输出素数。",
  "（无）",
  "2\n3\n5\n7\n11\n13\n17\n19\n23\n29\n31\n37\n41\n43\n47\n53\n59\n61\n67\n71\n73\n79\n83\n89\n97",
  "对每个数判断是否为素数即可。",
  wrapMain(`
    for (int n = 2; n <= 100; n++) {
        bool ok = true;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) { ok = false; break; }
        }
        if (ok) cout << n << '\\n';
    }
`)));

easy.push(problem(8, "斐波那契前 n 项",
  "输入正整数 $n$，输出斐波那契数列前 $n$ 项。约定 $F_1=1$，$F_2=1$，相邻数字用空格隔开。",
  "一行，一个正整数 $n$（$1 \\le n \\le 40$）。",
  "一行，输出前 $n$ 项。",
  "6",
  "1 1 2 3 5 8",
  "$n=1$ 时只输出 `1`。",
  wrapMain(`
    int n;
    cin >> n;
    long long a = 1, b = 1;
    for (int i = 1; i <= n; i++) {
        if (i > 1) cout << ' ';
        cout << a;
        long long c = a + b;
        a = b;
        b = c;
    }
    cout << '\\n';
`)));

easy.push(problem(9, "正约数之和",
  "输入正整数 $n$，求 $n$ 的所有正约数之和。",
  "一行，一个正整数 $n$（$1 \\le n \\le 10^{12}$）。",
  "一行，输出约数之和。",
  "12",
  "28",
  "$12$ 的约数有 $1,2,3,4,6,12$，和为 $28$。枚举到 $\\sqrt{n}$。",
  wrapMain(`
    long long n;
    cin >> n;
    long long sum = 0;
    for (long long i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            sum += i;
            if (i * i != n) sum += n / i;
        }
    }
    cout << sum << '\\n';
`)));

easy.push(problem(10, "正约数个数",
  "输入正整数 $n$，统计 $n$ 的正约数个数。",
  "一行，一个正整数 $n$（$1 \\le n \\le 10^{12}$）。",
  "一行，输出约数个数。",
  "12",
  "6",
  "成对枚举约数，注意完全平方数不要重复计数。",
  wrapMain(`
    long long n;
    cin >> n;
    long long cnt = 0;
    for (long long i = 1; i * i <= n; i++) {
        if (n % i == 0) {
            cnt += (i * i == n ? 1 : 2);
        }
    }
    cout << cnt << '\\n';
`)));

// 11~20 数组操作
easy.push(problem(11, "数组逆序输出",
  "输入 $n$ 和 $n$ 个整数，按逆序输出。",
  "第一行一个整数 $n$（$1 \\le n \\le 1000$）。\n第二行 $n$ 个整数。",
  "一行，逆序输出数组元素。",
  "4\n1 2 3 4",
  "4 3 2 1",
  "$n=1$ 时输出该元素即可。",
  wrapMain(`
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = n - 1; i >= 0; i--) {
        if (i < n - 1) cout << ' ';
        cout << a[i];
    }
    cout << '\\n';
`)));

easy.push(problem(12, "数组右移一位",
  "将数组整体向右循环移动一位：最后一个元素移到最前面。",
  "第一行一个整数 $n$（$1 \\le n \\le 1000$）。\n第二行 $n$ 个整数。",
  "一行，输出右移后的数组。",
  "5\n1 2 3 4 5",
  "5 1 2 3 4",
  "$n=1$ 时数组不变。",
  wrapMain(`
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int last = a[n - 1];
    for (int i = n - 1; i > 0; i--) a[i] = a[i - 1];
    a[0] = last;
    for (int i = 0; i < n; i++) {
        if (i) cout << ' ';
        cout << a[i];
    }
    cout << '\\n';
`)));

easy.push(problem(13, "数组左移一位",
  "将数组整体向左循环移动一位：第一个元素移到末尾。",
  "第一行一个整数 $n$（$1 \\le n \\le 1000$）。\n第二行 $n$ 个整数。",
  "一行，输出左移后的数组。",
  "5\n1 2 3 4 5",
  "2 3 4 5 1",
  "$n=1$ 时数组不变。",
  wrapMain(`
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int first = a[0];
    for (int i = 0; i + 1 < n; i++) a[i] = a[i + 1];
    a[n - 1] = first;
    for (int i = 0; i < n; i++) {
        if (i) cout << ' ';
        cout << a[i];
    }
    cout << '\\n';
`)));

easy.push(problem(14, "冒泡排序",
  "输入 $n$ 和 $n$ 个整数，使用冒泡排序从小到大排序后输出。",
  "第一行一个整数 $n$（$1 \\le n \\le 1000$）。\n第二行 $n$ 个整数。",
  "一行，输出排序后的数组。",
  "5\n5 1 4 2 3",
  "1 2 3 4 5",
  "练习冒泡排序过程，不要直接调用 `sort`（本题参考实现为冒泡）。",
  wrapMain(`
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    // 冒泡排序
    for (int i = 0; i < n; i++) {
        for (int j = 0; j + 1 < n - i; j++) {
            if (a[j] > a[j + 1]) swap(a[j], a[j + 1]);
        }
    }
    for (int i = 0; i < n; i++) {
        if (i) cout << ' ';
        cout << a[i];
    }
    cout << '\\n';
`)));

easy.push(problem(15, "选择排序",
  "输入 $n$ 和 $n$ 个整数，使用选择排序从小到大排序后输出。",
  "第一行一个整数 $n$（$1 \\le n \\le 1000$）。\n第二行 $n$ 个整数。",
  "一行，输出排序后的数组。",
  "5\n5 1 4 2 3",
  "1 2 3 4 5",
  "每轮选未排序区间的最小值放到前面。",
  wrapMain(`
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < n; i++) {
        int mn = i;
        for (int j = i + 1; j < n; j++) {
            if (a[j] < a[mn]) mn = j;
        }
        swap(a[i], a[mn]);
    }
    for (int i = 0; i < n; i++) {
        if (i) cout << ' ';
        cout << a[i];
    }
    cout << '\\n';
`)));

easy.push(problem(16, "合并两个数组",
  "输入两个数组，长度分别为 $n$ 和 $m$，按输入顺序合并后输出。",
  "第一行两个整数 $n,m$（$1 \\le n,m \\le 500$）。\n第二行 $n$ 个整数。\n第三行 $m$ 个整数。",
  "一行，输出合并后的数组。",
  "3 2\n1 2 3\n4 5",
  "1 2 3 4 5",
  "先输出第一个数组，再输出第二个数组。",
  wrapMain(`
    int n, m;
    cin >> n >> m;
    vector<int> a(n), b(m);
    for (int i = 0; i < n; i++) cin >> a[i];
    for (int i = 0; i < m; i++) cin >> b[i];
    bool first = true;
    for (int i = 0; i < n; i++) {
        if (!first) cout << ' ';
        cout << a[i];
        first = false;
    }
    for (int i = 0; i < m; i++) {
        if (!first) cout << ' ';
        cout << b[i];
        first = false;
    }
    cout << '\\n';
`)));

easy.push(problem(17, "删除等于 x 的元素",
  "输入数组和一个整数 $x$，删除数组中所有等于 $x$ 的元素，按原相对顺序输出剩余元素。若删完为空，输出空行。",
  "第一行两个整数 $n,x$（$1 \\le n \\le 1000$）。\n第二行 $n$ 个整数。",
  "一行，输出删除后的数组；若为空则输出空行。",
  "6 2\n1 2 3 2 4 2",
  "1 3 4",
  "可用新数组收集不等于 $x$ 的元素。",
  wrapMain(`
    int n, x;
    cin >> n >> x;
    vector<int> res;
    for (int i = 0; i < n; i++) {
        int v;
        cin >> v;
        if (v != x) res.push_back(v);
    }
    for (int i = 0; i < (int)res.size(); i++) {
        if (i) cout << ' ';
        cout << res[i];
    }
    cout << '\\n';
`)));

easy.push(problem(18, "第 k 个位置插入",
  "在数组第 $k$ 个位置（下标从 $0$ 开始）插入整数 $x$，输出插入后的数组。",
  "第一行三个整数 $n,k,x$（$1 \\le n \\le 1000$，$0 \\le k \\le n$）。\n第二行 $n$ 个整数。",
  "一行，输出新数组。",
  "4 2 9\n1 2 3 4",
  "1 2 9 3 4",
  "$k=0$ 插到开头，$k=n$ 插到末尾。",
  wrapMain(`
    int n, k, x;
    cin >> n >> k >> x;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    a.insert(a.begin() + k, x);
    for (int i = 0; i < (int)a.size(); i++) {
        if (i) cout << ' ';
        cout << a[i];
    }
    cout << '\\n';
`)));

easy.push(problem(19, "统计每个元素出现次数",
  "输入 $n$ 个整数，按元素从小到大的顺序，输出每个不同元素及其出现次数。",
  "第一行一个整数 $n$（$1 \\le n \\le 1000$）。\n第二行 $n$ 个整数（绝对值不超过 $10^6$）。",
  "若干行，每行两个整数：数值 出现次数。",
  "6\n1 2 1 3 2 1",
  "1 3\n2 2\n3 1",
  "可用排序后扫描，或双重循环（$n$ 不大）。",
  wrapMain(`
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    sort(a.begin(), a.end());
    for (int i = 0; i < n; ) {
        int j = i;
        while (j < n && a[j] == a[i]) j++;
        cout << a[i] << ' ' << (j - i) << '\\n';
        i = j;
    }
`)));

easy.push(problem(20, "奇数前偶数后",
  "将数组中奇数放到前面，偶数放到后面，相对顺序不做要求。",
  "第一行一个整数 $n$（$1 \\le n \\le 1000$）。\n第二行 $n$ 个整数。",
  "一行，输出调整后的数组。",
  "6\n1 2 3 4 5 6",
  "1 3 5 2 4 6",
  "样例仅作一种合法输出参考；只要奇数都在偶数前即可。",
  wrapMain(`
    int n;
    cin >> n;
    vector<int> odd, even;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (x % 2 != 0) odd.push_back(x);
        else even.push_back(x);
    }
    bool first = true;
    for (int i = 0; i < (int)odd.size(); i++) {
        if (!first) cout << ' ';
        cout << odd[i];
        first = false;
    }
    for (int i = 0; i < (int)even.size(); i++) {
        if (!first) cout << ' ';
        cout << even[i];
        first = false;
    }
    cout << '\\n';
`)));

fs.writeFileSync(path.join(__dirname, "06-简单-01-10.md"),
  "# 简单档（第 1～10 题）\n\n> 风格：牛客网编程题 | 标准 C++11 | cin/cout\n\n---\n\n" +
  easy.slice(0, 10).join("\n") +
  "\n**本批结束：简单档第 1～10 题。**\n");

fs.writeFileSync(path.join(__dirname, "07-简单-11-20.md"),
  "# 简单档（第 11～20 题）\n\n> 风格：牛客网编程题 | 标准 C++11 | cin/cout\n\n---\n\n" +
  easy.slice(10, 20).join("\n") +
  "\n**本批结束：简单档第 11～20 题。**\n");

console.log("wrote easy 1-20");
