/**
 * 生成简单档 21~50
 */
const fs = require("fs");
const path = require("path");

function problem(num, title, desc, inputDesc, outputDesc, sampleIn, sampleOut, hint, code) {
  return [
    `## 第 ${num} 题 · ${title}`, "",
    "### 【题目描述】", desc, "",
    "### 【输入描述】", inputDesc, "",
    "### 【输出描述】", outputDesc, "",
    "### 【输入样例】", "```", sampleIn, "```", "",
    "### 【输出样例】", "```", sampleOut, "```", "",
    "### 【提示】", hint, "",
    "### 【C++参考代码】", "```cpp", code.trim(), "```", "",
    "---", "",
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
#include <cctype>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
${body}
    return 0;
}`;
}

const ps = [];

ps.push(problem(21, "字符串长度",
  "输入一行字符串（可能包含空格），输出它的长度。",
  "一行字符串（长度不超过 $1000$）。",
  "一行，输出字符串长度。",
  "hello world",
  "11",
  "使用 `getline` 读入整行。",
  wrapMain(`
    string s;
    getline(cin, s);
    cout << s.size() << '\\n';
`)));

ps.push(problem(22, "倒序输出字符串",
  "输入一行字符串，倒序输出。",
  "一行字符串（长度不超过 $1000$，不含换行）。",
  "一行，输出倒序后的字符串。",
  "abcd",
  "dcba",
  "从后往前遍历输出即可。",
  wrapMain(`
    string s;
    getline(cin, s);
    for (int i = (int)s.size() - 1; i >= 0; i--) cout << s[i];
    cout << '\\n';
`)));

ps.push(problem(23, "回文字符串判断",
  "输入一个字符串（不含空格），判断是否为回文。是则输出 `yes`，否则输出 `no`。",
  "一行，一个字符串（长度不超过 $1000$）。",
  "一行，输出 `yes` 或 `no`。",
  "abba",
  "yes",
  "左右指针向中间移动比较。",
  wrapMain(`
    string s;
    cin >> s;
    bool ok = true;
    for (int i = 0, j = (int)s.size() - 1; i < j; i++, j--) {
        if (s[i] != s[j]) { ok = false; break; }
    }
    cout << (ok ? "yes" : "no") << '\\n';
`)));

ps.push(problem(24, "统计字母数量",
  "输入一行字符串，统计其中英文字母（大小写）的个数。",
  "一行字符串（长度不超过 $1000$）。",
  "一行，输出字母个数。",
  "Hello, C++ 11!",
  "7",
  "可用 `isalpha`。",
  wrapMain(`
    string s;
    getline(cin, s);
    int cnt = 0;
    for (size_t i = 0; i < s.size(); i++) {
        if (isalpha((unsigned char)s[i])) cnt++;
    }
    cout << cnt << '\\n';
`)));

ps.push(problem(25, "统计数字字符数量",
  "输入一行字符串，统计其中数字字符 `'0'`～`'9'` 的个数。",
  "一行字符串（长度不超过 $1000$）。",
  "一行，输出数字字符个数。",
  "a1b23c",
  "3",
  "可用 `isdigit`。",
  wrapMain(`
    string s;
    getline(cin, s);
    int cnt = 0;
    for (size_t i = 0; i < s.size(); i++) {
        if (isdigit((unsigned char)s[i])) cnt++;
    }
    cout << cnt << '\\n';
`)));

ps.push(problem(26, "统计空格数量",
  "输入一行字符串，统计空格个数。",
  "一行字符串（长度不超过 $1000$）。",
  "一行，输出空格个数。",
  "a b  c",
  "3",
  "注意连续空格都要计数。",
  wrapMain(`
    string s;
    getline(cin, s);
    int cnt = 0;
    for (size_t i = 0; i < s.size(); i++) {
        if (s[i] == ' ') cnt++;
    }
    cout << cnt << '\\n';
`)));

ps.push(problem(27, "字符串转小写",
  "将字符串中所有大写字母转为小写后输出，其他字符不变。",
  "一行字符串（长度不超过 $1000$）。",
  "一行，输出转换后的字符串。",
  "Hello World",
  "hello world",
  "可用 `tolower`。",
  wrapMain(`
    string s;
    getline(cin, s);
    for (size_t i = 0; i < s.size(); i++) {
        s[i] = (char)tolower((unsigned char)s[i]);
    }
    cout << s << '\\n';
`)));

ps.push(problem(28, "字符串转大写",
  "将字符串中所有小写字母转为大写后输出，其他字符不变。",
  "一行字符串（长度不超过 $1000$）。",
  "一行，输出转换后的字符串。",
  "Hello World",
  "HELLO WORLD",
  "可用 `toupper`。",
  wrapMain(`
    string s;
    getline(cin, s);
    for (size_t i = 0; i < s.size(); i++) {
        s[i] = (char)toupper((unsigned char)s[i]);
    }
    cout << s << '\\n';
`)));

ps.push(problem(29, "删除所有空格",
  "输入一行字符串，删除其中所有空格后输出。",
  "一行字符串（长度不超过 $1000$）。",
  "一行，输出删除空格后的字符串。",
  "a b c",
  "abc",
  "把非空格字符拼到新字符串。",
  wrapMain(`
    string s, r;
    getline(cin, s);
    for (size_t i = 0; i < s.size(); i++) {
        if (s[i] != ' ') r += s[i];
    }
    cout << r << '\\n';
`)));

ps.push(problem(30, "查找子串位置（模拟）",
  "输入主串 $s$ 和模式串 $t$，输出 $t$ 在 $s$ 中第一次出现的起始下标（从 $0$ 开始）。若不存在输出 $-1$。不允许使用 `string::find`。",
  "第一行字符串 $s$。\n第二行字符串 $t$。\n（长度均不超过 $1000$）",
  "一行，输出下标或 $-1$。",
  "abcdef\ncd",
  "2",
  "枚举起始位置暴力匹配。",
  wrapMain(`
    string s, t;
    getline(cin, s);
    getline(cin, t);
    int ans = -1;
    if (t.size() <= s.size()) {
        for (int i = 0; i + (int)t.size() <= (int)s.size(); i++) {
            bool ok = true;
            for (int j = 0; j < (int)t.size(); j++) {
                if (s[i + j] != t[j]) { ok = false; break; }
            }
            if (ok) { ans = i; break; }
        }
    }
    cout << ans << '\\n';
`)));

ps.push(problem(31, "水仙花数",
  "输出 $100$ 到 $999$ 中所有水仙花数（各位数字立方和等于该数本身），每个数占一行。",
  "无输入。",
  "若干行，从小到大输出水仙花数。",
  "（无）",
  "153\n370\n371\n407",
  "枚举三位数并拆位即可。",
  wrapMain(`
    for (int n = 100; n <= 999; n++) {
        int a = n / 100, b = n / 10 % 10, c = n % 10;
        if (a * a * a + b * b * b + c * c * c == n) {
            cout << n << '\\n';
        }
    }
`)));

ps.push(problem(32, "百钱买百鸡",
  "鸡翁一值钱五，鸡母一值钱三，鸡雏三值钱一。百钱买百鸡，输出所有方案。每行输出三个整数：鸡翁、鸡母、鸡雏数量。",
  "无输入。",
  "若干行，每行一种方案。",
  "（无）",
  "0 25 75\n4 18 78\n8 11 81\n12 4 84",
  "三重循环枚举，注意鸡雏数是 $3$ 的倍数。",
  wrapMain(`
    // x 翁 y 母 z 雏，x+y+z=100，5x+3y+z/3=100
    for (int x = 0; x <= 20; x++) {
        for (int y = 0; y <= 33; y++) {
            int z = 100 - x - y;
            if (z >= 0 && z % 3 == 0 && 5 * x + 3 * y + z / 3 == 100) {
                cout << x << ' ' << y << ' ' << z << '\\n';
            }
        }
    }
`)));

ps.push(problem(33, "秒转时分秒",
  "输入一个非负整数秒数，转换成 `hh:mm:ss` 格式输出（不足两位补零）。小时可以超过 $24$。",
  "一行，一个非负整数 $s$（$0 \\le s \\le 10^{9}$）。",
  "一行，输出 `hh:mm:ss`。",
  "3661",
  "01:01:01",
  "边界：输入 `0` 输出 `00:00:00`。",
  wrapMain(`
    long long s;
    cin >> s;
    long long h = s / 3600;
    long long m = (s % 3600) / 60;
    long long sec = s % 60;
    cout << setfill('0') << setw(2) << h << ':'
         << setw(2) << m << ':' << setw(2) << sec << '\\n';
`)));

ps.push(problem(34, "一年中的第几天（忽略闰年）",
  "输入年、月、日，输出这一天是当年的第几天。不考虑闰年，二月按 $28$ 天计算。",
  "一行，三个整数 $y,m,d$（$1 \\le y \\le 9999$，$1 \\le m \\le 12$，日期合法）。",
  "一行，输出天数。",
  "2024 3 1",
  "60",
  "把前 $m-1$ 个月天数累加再加上 $d$。",
  wrapMain(`
    int y, m, d;
    cin >> y >> m >> d;
    int days[13] = {0,31,28,31,30,31,30,31,31,30,31,30,31};
    int ans = d;
    for (int i = 1; i < m; i++) ans += days[i];
    cout << ans << '\\n';
`)));

ps.push(problem(35, "十进制转二进制",
  "输入一个非负整数，输出它的二进制表示（不使用库函数直接转换）。",
  "一行，一个非负整数 $n$（$0 \\le n \\le 10^{9}$）。",
  "一行，输出二进制字符串（不含前导零，除非 $n=0$）。",
  "10",
  "1010",
  "$n=0$ 输出 `0`。",
  wrapMain(`
    long long n;
    cin >> n;
    if (n == 0) {
        cout << "0\\n";
        return 0;
    }
    string s;
    while (n > 0) {
        s = char('0' + (n % 2)) + s;
        n /= 2;
    }
    cout << s << '\\n';
`)));

ps.push(problem(36, "二进制字符串相加",
  "输入两个二进制字符串，输出它们的和（仍为二进制字符串，不含前导零，除非结果为 $0$）。",
  "一行，两个二进制字符串 $a,b$（长度不超过 $1000$，仅含 `0/1`）。",
  "一行，输出二进制和。",
  "1010 1011",
  "10101",
  "从低位到高位模拟加法进位。",
  wrapMain(`
    string a, b;
    cin >> a >> b;
    string r;
    int i = (int)a.size() - 1, j = (int)b.size() - 1, c = 0;
    while (i >= 0 || j >= 0 || c) {
        int sum = c;
        if (i >= 0) sum += a[i--] - '0';
        if (j >= 0) sum += b[j--] - '0';
        r = char('0' + sum % 2) + r;
        c = sum / 2;
    }
    // 去掉前导零
    int p = 0;
    while (p + 1 < (int)r.size() && r[p] == '0') p++;
    cout << r.substr(p) << '\\n';
`)));

ps.push(problem(37, "模拟投票",
  "输入 $n$ 张选票（候选人编号），统计每个候选人的得票数，按编号从小到大输出。",
  "第一行一个整数 $n$（$1 \\le n \\le 1000$）。\n第二行 $n$ 个整数，表示候选人编号（$1 \\le$ 编号 $\\le 1000$）。",
  "若干行，每行：编号 票数。",
  "6\n1 2 1 3 2 1",
  "1 3\n2 2\n3 1",
  "可用数组计数或 `map`。",
  wrapMain(`
    int n;
    cin >> n;
    map<int, int> cnt;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        cnt[x]++;
    }
    for (map<int, int>::iterator it = cnt.begin(); it != cnt.end(); ++it) {
        cout << it->first << ' ' << it->second << '\\n';
    }
`)));

ps.push(problem(38, "最高最低平均分",
  "输入 $n$ 个学生分数，输出最高分、最低分和平均分（平均分保留两位小数）。",
  "第一行一个整数 $n$（$1 \\le n \\le 1000$）。\n第二行 $n$ 个整数分数（$0 \\le$ 分数 $\\le 100$）。",
  "一行，输出最高分、最低分、平均分，空格隔开。",
  "4\n80 90 70 100",
  "100 70 85.00",
  "$n=1$ 时三者分别为该分数、该分数、该分数。",
  wrapMain(`
    int n;
    cin >> n;
    int mx, mn;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        if (i == 0) mx = mn = x;
        else {
            if (x > mx) mx = x;
            if (x < mn) mn = x;
        }
        sum += x;
    }
    cout << mx << ' ' << mn << ' ' << fixed << setprecision(2) << (double)sum / n << '\\n';
`)));

ps.push(problem(39, "输出所有两位素数",
  "输出所有两位素数，每个数占一行。",
  "无输入。",
  "若干行，从小到大输出。",
  "（无）",
  "11\n13\n17\n19\n23\n29\n31\n37\n41\n43\n47\n53\n59\n61\n67\n71\n73\n79\n83\n89\n97",
  "枚举 $10$ 到 $99$。",
  wrapMain(`
    for (int n = 10; n <= 99; n++) {
        bool ok = true;
        for (int i = 2; i * i <= n; i++) {
            if (n % i == 0) { ok = false; break; }
        }
        if (ok) cout << n << '\\n';
    }
`)));

ps.push(problem(40, "FizzBuzz",
  "输入正整数 $n$，对 $1$ 到 $n$：能被 $3$ 整除输出 `Fizz`，能被 $5$ 整除输出 `Buzz`，同时被 $3$ 和 $5$ 整除输出 `FizzBuzz`，否则输出数字本身。每个结果占一行。",
  "一行，一个正整数 $n$（$1 \\le n \\le 1000$）。",
  "共 $n$ 行。",
  "15",
  "1\n2\nFizz\n4\nBuzz\nFizz\n7\n8\nFizz\nBuzz\n11\nFizz\n13\n14\nFizzBuzz",
  "先判断 $15$ 的倍数，再判断 $3$ 或 $5$。",
  wrapMain(`
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        if (i % 15 == 0) cout << "FizzBuzz\\n";
        else if (i % 3 == 0) cout << "Fizz\\n";
        else if (i % 5 == 0) cout << "Buzz\\n";
        else cout << i << '\\n';
    }
`)));

ps.push(problem(41, "统计单词个数",
  "输入一行英文句子，单词之间由空格分隔，统计单词个数。",
  "一行字符串（长度不超过 $1000$）。",
  "一行，输出单词个数。",
  "I love C++",
  "3",
  "可用 `stringstream` 分割。",
  wrapMain(`
    string s, w;
    getline(cin, s);
    stringstream ss(s);
    int cnt = 0;
    while (ss >> w) cnt++;
    cout << cnt << '\\n';
`)));

ps.push(problem(42, "去重保留首次顺序",
  "输入 $n$ 个整数，输出去重后的序列，保留每个数第一次出现的顺序。",
  "第一行一个整数 $n$（$1 \\le n \\le 1000$）。\n第二行 $n$ 个整数。",
  "一行，输出去重后的序列。",
  "7\n1 2 1 3 2 4 1",
  "1 2 3 4",
  "可用标记数组或双重循环判断是否出现过。",
  wrapMain(`
    int n;
    cin >> n;
    vector<int> a, res;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        a.push_back(x);
    }
    for (int i = 0; i < n; i++) {
        bool seen = false;
        for (int j = 0; j < i; j++) {
            if (a[j] == a[i]) { seen = true; break; }
        }
        if (!seen) res.push_back(a[i]);
    }
    for (int i = 0; i < (int)res.size(); i++) {
        if (i) cout << ' ';
        cout << res[i];
    }
    cout << '\\n';
`)));

ps.push(problem(43, "空心正方形",
  "输入正整数 $n$，打印 $n$ 行空心正方形星号图案（边框为 `*`，内部为空格）。",
  "一行，一个正整数 $n$（$2 \\le n \\le 50$）。",
  "共 $n$ 行图案。",
  "4",
  "****\n*  *\n*  *\n****",
  "边界位置输出 `*`，否则输出空格。",
  wrapMain(`
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++) {
            if (i == 0 || i == n - 1 || j == 0 || j == n - 1) cout << '*';
            else cout << ' ';
        }
        cout << '\\n';
    }
`)));

ps.push(problem(44, "质因数分解",
  "输入正整数 $n$，输出它的质因数分解（按从小到大，重复质因数重复输出），数字之间用空格隔开。",
  "一行，一个正整数 $n$（$2 \\le n \\le 10^{12}$）。",
  "一行，输出所有质因数。",
  "12",
  "2 2 3",
  "从 $2$ 开始试除。",
  wrapMain(`
    long long n;
    cin >> n;
    bool first = true;
    for (long long i = 2; i * i <= n; i++) {
        while (n % i == 0) {
            if (!first) cout << ' ';
            cout << i;
            first = false;
            n /= i;
        }
    }
    if (n > 1) {
        if (!first) cout << ' ';
        cout << n;
    }
    cout << '\\n';
`)));

ps.push(problem(45, "大整数竖式加法（非负）",
  "输入两个非负大整数（以字符串形式，长度可达 $1000$），输出它们的和。",
  "一行，两个非负整数字符串 $a,b$（不含前导零，除非本身为 $0$）。",
  "一行，输出和（不含前导零，除非结果为 $0$）。",
  "999 1",
  "1000",
  "按位从低到高相加并处理进位。",
  wrapMain(`
    string a, b;
    cin >> a >> b;
    reverse(a.begin(), a.end());
    reverse(b.begin(), b.end());
    string r;
    int carry = 0;
    for (int i = 0; i < (int)max(a.size(), b.size()) || carry; i++) {
        int sum = carry;
        if (i < (int)a.size()) sum += a[i] - '0';
        if (i < (int)b.size()) sum += b[i] - '0';
        r += char('0' + sum % 10);
        carry = sum / 10;
    }
    reverse(r.begin(), r.end());
    cout << r << '\\n';
`)));

ps.push(problem(46, "相邻差值最大值",
  "输入 $n$ 个整数，求相邻两个元素差的绝对值的最大值。",
  "第一行一个整数 $n$（$2 \\le n \\le 1000$）。\n第二行 $n$ 个整数。",
  "一行，输出最大相邻差。",
  "5\n1 5 2 9 3",
  "7",
  "$|2-9|=7$ 最大。",
  wrapMain(`
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int mx = 0;
    for (int i = 1; i < n; i++) {
        int d = abs(a[i] - a[i - 1]);
        if (d > mx) mx = d;
    }
    cout << mx << '\\n';
`)));

ps.push(problem(47, "只保留字母",
  "输入一行字符串，删除所有非字母字符后输出。",
  "一行字符串（长度不超过 $1000$）。",
  "一行，输出只含字母的字符串。",
  "H3ll0, W0rld!",
  "HllWrld",
  "用 `isalpha` 过滤。",
  wrapMain(`
    string s, r;
    getline(cin, s);
    for (size_t i = 0; i < s.size(); i++) {
        if (isalpha((unsigned char)s[i])) r += s[i];
    }
    cout << r << '\\n';
`)));

ps.push(problem(48, "第二大元素（不重复）",
  "输入 $n$ 个整数，求严格第二大的元素。保证至少存在两个不同的数。",
  "第一行一个整数 $n$（$2 \\le n \\le 1000$）。\n第二行 $n$ 个整数。",
  "一行，输出第二大元素。",
  "5\n5 5 3 1 4",
  "4",
  "维护最大值与次大值，注意跳过与最大值相等的数。",
  wrapMain(`
    int n;
    cin >> n;
    long long first = -1e18, second = -1e18;
    for (int i = 0; i < n; i++) {
        long long x;
        cin >> x;
        if (x > first) {
            second = first;
            first = x;
        } else if (x > second && x != first) {
            second = x;
        }
    }
    cout << second << '\\n';
`)));

ps.push(problem(49, "矩阵转置",
  "输入一个 $n$ 行 $m$ 列矩阵，输出它的转置矩阵。",
  "第一行两个整数 $n,m$（$1 \\le n,m \\le 100$）。\n接下来 $n$ 行，每行 $m$ 个整数。",
  "输出 $m$ 行，每行 $n$ 个整数。",
  "2 3\n1 2 3\n4 5 6",
  "1 4\n2 5\n3 6",
  "转置后第 $j$ 行第 $i$ 列为原矩阵第 $i$ 行第 $j$ 列。",
  wrapMain(`
    int n, m;
    cin >> n >> m;
    vector<vector<int> > a(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> a[i][j];
    for (int j = 0; j < m; j++) {
        for (int i = 0; i < n; i++) {
            if (i) cout << ' ';
            cout << a[i][j];
        }
        cout << '\\n';
    }
`)));

ps.push(problem(50, "3×3 矩阵求和",
  "输入一个 $3\\times 3$ 矩阵，求所有元素之和。",
  "三行，每行三个整数。",
  "一行，输出元素之和。",
  "1 2 3\n4 5 6\n7 8 9",
  "45",
  "直接累加九个数。",
  wrapMain(`
    long long sum = 0;
    for (int i = 0; i < 9; i++) {
        long long x;
        cin >> x;
        sum += x;
    }
    cout << sum << '\\n';
`)));

fs.writeFileSync(path.join(__dirname, "08-简单-21-30.md"),
  "# 简单档（第 21～30 题）\n\n> 风格：牛客网编程题 | 标准 C++11 | cin/cout\n\n---\n\n" +
  ps.slice(0, 10).join("\n") + "\n**本批结束：简单档第 21～30 题。**\n");
fs.writeFileSync(path.join(__dirname, "09-简单-31-40.md"),
  "# 简单档（第 31～40 题）\n\n> 风格：牛客网编程题 | 标准 C++11 | cin/cout\n\n---\n\n" +
  ps.slice(10, 20).join("\n") + "\n**本批结束：简单档第 31～40 题。**\n");
fs.writeFileSync(path.join(__dirname, "10-简单-41-50.md"),
  "# 简单档（第 41～50 题）\n\n> 风格：牛客网编程题 | 标准 C++11 | cin/cout\n\n---\n\n" +
  ps.slice(20, 30).join("\n") + "\n**简单档全部 50 题已完成。**\n");

console.log("wrote easy 21-50");
