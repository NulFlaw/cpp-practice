// 追加：简单档 51~100 与 较难档 101~130
// 简单档
window.PRACTICE_PROBLEMS.push(
  { id: "P051", level: "easy", title: "拆位输出", point: "数字拆位",
    hint: "输入 n，按顺序输出每一位数字。",
    code: `#include <iostream>
using namespace std;
int main() {
    long long n;
    cin >> n;
    if (n == 0) { cout << "0\\n"; return 0; }
    int d[20], cnt = 0;
    while (n) { d[cnt++] = n % 10; n /= 10; }
    for (int i = cnt - 1; i >= 0; i--)
        cout << d[i] << (i ? ' ' : '\\n');
    return 0;
}` },
  { id: "P052", level: "easy", title: "反转数字", point: "拆位重组",
    hint: "输入 n，反转输出。例 123→321。",
    code: `#include <iostream>
using namespace std;
int main() {
    long long n, r = 0;
    cin >> n;
    while (n) { r = r * 10 + n % 10; n /= 10; }
    cout << r << '\\n';
    return 0;
}` },
  { id: "P053", level: "easy", title: "回文整数", point: "拆位回文判断",
    hint: "判断整数是否回文。",
    code: `#include <iostream>
using namespace std;
int main() {
    long long n, t, r = 0;
    cin >> n;
    t = n;
    while (t) { r = r * 10 + t % 10; t /= 10; }
    cout << (r == n ? "yes" : "no") << '\\n';
    return 0;
}` },
  { id: "P054", level: "easy", title: "素数判断", point: "素数枚举",
    hint: "判断 n 是不是素数。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    if (n < 2) { cout << "no\\n"; return 0; }
    for (int i = 2; 1LL * i * i <= n; i++)
        if (n % i == 0) { cout << "no\\n"; return 0; }
    cout << "yes\\n";
    return 0;
}` },
  { id: "P055", level: "easy", title: "最大公约数", point: "辗转相除",
    hint: "求 gcd(a,b)。",
    code: `#include <iostream>
using namespace std;
long long gcd(long long a, long long b) { return b ? gcd(b, a % b) : a; }
int main() {
    long long a, b;
    cin >> a >> b;
    cout << gcd(a, b) << '\\n';
    return 0;
}` },
  { id: "P056", level: "easy", title: "最小公倍数", point: "gcd 推导 lcm",
    hint: "lcm = a / gcd * b。",
    code: `#include <iostream>
using namespace std;
long long gcd(long long a, long long b) { return b ? gcd(b, a % b) : a; }
int main() {
    long long a, b;
    cin >> a >> b;
    cout << a / gcd(a, b) * b << '\\n';
    return 0;
}` },
  { id: "P057", level: "easy", title: "1~100 素数", point: "素数筛选",
    hint: "输出 1~100 所有素数。",
    code: `#include <iostream>
using namespace std;
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; 1LL * i * i <= n; i++)
        if (n % i == 0) return false;
    return true;
}
int main() {
    for (int i = 2; i <= 100; i++)
        if (isPrime(i)) cout << i << '\\n';
    return 0;
}` },
  { id: "P058", level: "easy", title: "斐波那契", point: "递推",
    hint: "输出前 n 项（F1=1, F2=1）。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    long long a = 1, b = 1;
    for (int i = 1; i <= n; i++) {
        cout << a << (i < n ? ' ' : '\\n');
        long long t = a + b;
        a = b; b = t;
    }
    return 0;
}` },
  { id: "P059", level: "easy", title: "约数之和", point: "枚举约数",
    hint: "求 n 所有正约数之和。",
    code: `#include <iostream>
using namespace std;
int main() {
    long long n, sum = 0;
    cin >> n;
    for (long long i = 1; i * i <= n; i++)
        if (n % i == 0) {
            sum += i;
            if (i * i != n) sum += n / i;
        }
    cout << sum << '\\n';
    return 0;
}` },
  { id: "P060", level: "easy", title: "约数个数", point: "枚举约数计数",
    hint: "统计 n 的正约数个数。",
    code: `#include <iostream>
using namespace std;
int main() {
    long long n, cnt = 0;
    cin >> n;
    for (long long i = 1; i * i <= n; i++)
        if (n % i == 0) cnt += (i * i == n ? 1 : 2);
    cout << cnt << '\\n';
    return 0;
}` },

  { id: "P061", level: "easy", title: "数组逆序输出", point: "数组反转",
    hint: "读 n 个数，逆序输出。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    for (int i = n - 1; i >= 0; i--)
        cout << a[i] << (i ? ' ' : '\\n');
    return 0;
}` },
  { id: "P062", level: "easy", title: "右移一位", point: "数组移位",
    hint: "数组元素整体右移一位。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    if (n == 0) return 0;
    int last = a.back();
    for (int i = n - 1; i > 0; i--) a[i] = a[i - 1];
    a[0] = last;
    for (int i = 0; i < n; i++)
        cout << a[i] << (i + 1 < n ? ' ' : '\\n');
    return 0;
}` },
  { id: "P063", level: "easy", title: "左移一位", point: "数组移位",
    hint: "数组元素整体左移一位。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    if (n == 0) return 0;
    int first = a[0];
    for (int i = 0; i + 1 < n; i++) a[i] = a[i + 1];
    a[n - 1] = first;
    for (int i = 0; i < n; i++)
        cout << a[i] << (i + 1 < n ? ' ' : '\\n');
    return 0;
}` },
  { id: "P064", level: "easy", title: "冒泡排序", point: "冒泡",
    hint: "从小到大排序输出。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    for (int i = 0; i < n; i++)
        for (int j = 0; j + 1 < n - i; j++)
            if (a[j] > a[j + 1]) swap(a[j], a[j + 1]);
    for (int i = 0; i < n; i++)
        cout << a[i] << (i + 1 < n ? ' ' : '\\n');
    return 0;
}` },
  { id: "P065", level: "easy", title: "选择排序", point: "选择排序",
    hint: "从小到大排序输出。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    for (int i = 0; i < n; i++) {
        int mn = i;
        for (int j = i + 1; j < n; j++)
            if (a[j] < a[mn]) mn = j;
        swap(a[i], a[mn]);
    }
    for (int i = 0; i < n; i++)
        cout << a[i] << (i + 1 < n ? ' ' : '\\n');
    return 0;
}` },
  { id: "P066", level: "easy", title: "合并两个数组", point: "数组合并",
    hint: "合并两个数组并顺序输出。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n, m;
    cin >> n >> m;
    vector<int> a(n + m);
    for (auto& x : a) cin >> x;
    for (int i = 0; i < n + m; i++)
        cout << a[i] << (i + 1 < n + m ? ' ' : '\\n');
    return 0;
}` },
  { id: "P067", level: "easy", title: "删除等于 x 的元素", point: "数组删除",
    hint: "删除数组中等于 x 的元素。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n, x;
    cin >> n >> x;
    vector<int> a;
    for (int i = 0; i < n; i++) {
        int v; cin >> v;
        if (v != x) a.push_back(v);
    }
    for (size_t i = 0; i < a.size(); i++)
        cout << a[i] << (i + 1 < a.size() ? ' ' : '\\n');
    return 0;
}` },
  { id: "P068", level: "easy", title: "第 k 位插入", point: "数组插入",
    hint: "在第 k 个位置插入 x。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n, k, x;
    cin >> n >> k >> x;
    vector<int> a(n);
    for (auto& v : a) cin >> v;
    a.insert(a.begin() + k, x);
    for (size_t i = 0; i < a.size(); i++)
        cout << a[i] << (i + 1 < a.size() ? ' ' : '\\n');
    return 0;
}` },
  { id: "P069", level: "easy", title: "统计重复次数", point: "双重循环统计",
    hint: "统计每个元素出现次数（仅示例第一个重复元素）。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    for (int i = 0; i < n; i++) {
        int cnt = 0;
        for (int j = 0; j < n; j++)
            if (a[j] == a[i]) cnt++;
        if (cnt > 1) { cout << a[i] << " " << cnt << "\\n"; break; }
    }
    return 0;
}` },
  { id: "P070", level: "easy", title: "奇数前偶数后", point: "数组划分",
    hint: "奇数放前面，偶数放后面。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> odd, even;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        (x % 2 ? odd : even).push_back(x);
    }
    for (int x : odd) cout << x << ' ';
    for (int x : even) cout << x << ' ';
    cout << '\\n';
    return 0;
}` },

  { id: "P071", level: "easy", title: "字符串长度", point: "string、size()",
    hint: "输出字符串长度。",
    code: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s;
    getline(cin, s);
    cout << s.size() << '\\n';
    return 0;
}` },
  { id: "P072", level: "easy", title: "倒序输出字符串", point: "string 反向遍历",
    hint: "倒序输出字符串。",
    code: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s;
    getline(cin, s);
    for (int i = (int)s.size() - 1; i >= 0; i--) cout << s[i];
    cout << '\\n';
    return 0;
}` },
  { id: "P073", level: "easy", title: "回文字符串", point: "字符串回文",
    hint: "判断字符串是否回文。",
    code: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s;
    getline(cin, s);
    bool ok = true;
    for (size_t i = 0; i < s.size() / 2; i++)
        if (s[i] != s[s.size() - 1 - i]) { ok = false; break; }
    cout << (ok ? "yes" : "no") << '\\n';
    return 0;
}` },
  { id: "P074", level: "easy", title: "统计字母数量", point: "遍历 string",
    hint: "统计字母数量。",
    code: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;
int main() {
    string s;
    getline(cin, s);
    int cnt = 0;
    for (char c : s) if (isalpha((unsigned char)c)) cnt++;
    cout << cnt << '\\n';
    return 0;
}` },
  { id: "P075", level: "easy", title: "统计数字字符", point: "字符判断",
    hint: "统计数字字符数量。",
    code: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;
int main() {
    string s;
    getline(cin, s);
    int cnt = 0;
    for (char c : s) if (isdigit((unsigned char)c)) cnt++;
    cout << cnt << '\\n';
    return 0;
}` },
  { id: "P076", level: "easy", title: "统计空格数量", point: "空格字符",
    hint: "统计空格数量。",
    code: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s;
    getline(cin, s);
    int cnt = 0;
    for (char c : s) if (c == ' ') cnt++;
    cout << cnt << '\\n';
    return 0;
}` },
  { id: "P077", level: "easy", title: "大写转小写", point: "大小写转换",
    hint: "所有大写字母转小写。",
    code: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;
int main() {
    string s;
    getline(cin, s);
    for (char& c : s) c = tolower((unsigned char)c);
    cout << s << '\\n';
    return 0;
}` },
  { id: "P078", level: "easy", title: "小写转大写", point: "大小写转换",
    hint: "所有小写字母转大写。",
    code: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;
int main() {
    string s;
    getline(cin, s);
    for (char& c : s) c = toupper((unsigned char)c);
    cout << s << '\\n';
    return 0;
}` },
  { id: "P079", level: "easy", title: "删除空格", point: "字符过滤",
    hint: "删除所有空格后输出。",
    code: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s, r;
    getline(cin, s);
    for (char c : s) if (c != ' ') r += c;
    cout << r << '\\n';
    return 0;
}` },
  { id: "P080", level: "easy", title: "查找子串位置", point: "字符串查找模拟",
    hint: "不用 string::find，模拟查找子串第一次出现位置。",
    code: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string s, t;
    getline(cin, s);
    getline(cin, t);
    if (t.empty()) { cout << 0 << '\\n'; return 0; }
    for (size_t i = 0; i + t.size() <= s.size(); i++) {
        if (s.substr(i, t.size()) == t) { cout << i << '\\n'; return 0; }
    }
    cout << -1 << '\\n';
    return 0;
}` },

  { id: "P081", level: "easy", title: "水仙花数", point: "枚举拆位",
    hint: "找出 100~999 所有水仙花数。",
    code: `#include <iostream>
using namespace std;
int main() {
    for (int n = 100; n <= 999; n++) {
        int a = n / 100, b = n / 10 % 10, c = n % 10;
        if (a * a * a + b * b * b + c * c * c == n)
            cout << n << '\\n';
    }
    return 0;
}` },
  { id: "P082", level: "easy", title: "百钱买百鸡", point: "三重循环枚举",
    hint: "输出所有方案。",
    code: `#include <iostream>
using namespace std;
int main() {
    for (int x = 0; x <= 20; x++)
        for (int y = 0; y <= 33; y++) {
            int z = 100 - x - y;
            if (z >= 0 && 5 * x + 3 * y + z / 3 == 100 && z % 3 == 0)
                cout << x << " " << y << " " << z << "\\n";
        }
    return 0;
}` },
  { id: "P083", level: "easy", title: "秒转 hh:mm:ss", point: "时间换算",
    hint: "输入秒数，转换成 hh:mm:ss。",
    code: `#include <iostream>
#include <iomanip>
using namespace std;
int main() {
    long long s;
    cin >> s;
    long long h = s / 3600, m = s % 3600 / 60, sec = s % 60;
    cout << setfill('0') << setw(2) << h << ":"
         << setw(2) << m << ":" << setw(2) << sec << "\\n";
    return 0;
}` },
  { id: "P084", level: "easy", title: "年内第几天", point: "月份累加",
    hint: "不考虑闰年简化版。",
    code: `#include <iostream>
using namespace std;
int main() {
    int y, m, d;
    cin >> y >> m >> d;
    int days[] = {0,31,28,31,30,31,30,31,31,30,31,30,31};
    int ans = d;
    for (int i = 1; i < m; i++) ans += days[i];
    cout << ans << "\\n";
    return 0;
}` },
  { id: "P085", level: "easy", title: "二进制输出", point: "除 2 取余",
    hint: "不用库函数输出二进制。",
    code: `#include <iostream>
#include <string>
using namespace std;
int main() {
    long long n;
    cin >> n;
    if (n == 0) { cout << "0\\n"; return 0; }
    string s;
    while (n) { s = char('0' + n % 2) + s; n /= 2; }
    cout << s << "\\n";
    return 0;
}` },
  { id: "P086", level: "easy", title: "二进制相加", point: "模拟二进制加法",
    hint: "两个二进制字符串相加。",
    code: `#include <iostream>
#include <string>
using namespace std;
int main() {
    string a, b, r;
    cin >> a >> b;
    int i = a.size() - 1, j = b.size() - 1, c = 0;
    while (i >= 0 || j >= 0 || c) {
        int s = c;
        if (i >= 0) s += a[i--] - '0';
        if (j >= 0) s += b[j--] - '0';
        r = char('0' + s % 2) + r;
        c = s / 2;
    }
    cout << r << "\\n";
    return 0;
}` },
  { id: "P087", level: "easy", title: "模拟投票", point: "数组计数",
    hint: "统计每个人票数。",
    code: `#include <iostream>
#include <map>
using namespace std;
int main() {
    int n;
    cin >> n;
    map<int, int> cnt;
    for (int i = 0; i < n; i++) {
        int x; cin >> x; cnt[x]++;
    }
    for (auto& [k, v] : cnt) cout << k << " " << v << "\\n";
    return 0;
}` },
  { id: "P088", level: "easy", title: "最高最低平均", point: "数组统计",
    hint: "输出最高分、最低分、平均分。",
    code: `#include <iostream>
#include <iomanip>
using namespace std;
int main() {
    int n;
    cin >> n;
    int mx, mn, x;
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        cin >> x;
        if (i == 0) mx = mn = x;
        else { if (x > mx) mx = x; if (x < mn) mn = x; }
        sum += x;
    }
    cout << mx << " " << mn << " " << fixed << setprecision(2) << (double)sum / n << "\\n";
    return 0;
}` },
  { id: "P089", level: "easy", title: "两位素数", point: "枚举+素数",
    hint: "输出所有 2 位素数。",
    code: `#include <iostream>
using namespace std;
bool isPrime(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) if (n % i == 0) return false;
    return true;
}
int main() {
    for (int i = 10; i <= 99; i++)
        if (isPrime(i)) cout << i << '\\n';
    return 0;
}` },
  { id: "P090", level: "easy", title: "FizzBuzz", point: "枚举条件判断",
    hint: "1~n，3 倍数 Fizz，5 倍数 Buzz，同时 FizzBuzz。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 1; i <= n; i++) {
        if (i % 15 == 0) cout << "FizzBuzz\\n";
        else if (i % 3 == 0) cout << "Fizz\\n";
        else if (i % 5 == 0) cout << "Buzz\\n";
        else cout << i << "\\n";
    }
    return 0;
}` },

  { id: "P091", level: "easy", title: "统计单词个数", point: "字符串遍历单词计数",
    hint: "空格分隔单词。",
    code: `#include <iostream>
#include <sstream>
#include <string>
using namespace std;
int main() {
    string s, w;
    getline(cin, s);
    stringstream ss(s);
    int cnt = 0;
    while (ss >> w) cnt++;
    cout << cnt << "\\n";
    return 0;
}` },
  { id: "P092", level: "easy", title: "去重保留顺序", point: "数组去重",
    hint: "输出去重后的序列（保留首次出现顺序）。",
    code: `#include <iostream>
#include <vector>
#include <set>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> a;
    set<int> seen;
    for (int i = 0; i < n; i++) {
        int x; cin >> x;
        if (seen.insert(x).second) a.push_back(x);
    }
    for (size_t i = 0; i < a.size(); i++)
        cout << a[i] << (i + 1 < a.size() ? ' ' : '\\n');
    return 0;
}` },
  { id: "P093", level: "easy", title: "空心正方形", point: "嵌套循环+边界",
    hint: "打印 n 行空心正方形星号图案。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < n; j++)
            cout << ((i == 0 || i == n - 1 || j == 0 || j == n - 1) ? '*' : ' ');
        cout << "\\n";
    }
    return 0;
}` },
  { id: "P094", level: "easy", title: "质因数分解", point: "质因数分解",
    hint: "输出 n 的所有质因数。",
    code: `#include <iostream>
using namespace std;
int main() {
    long long n;
    cin >> n;
    for (long long i = 2; i * i <= n; i++)
        while (n % i == 0) { cout << i << ' '; n /= i; }
    if (n > 1) cout << n;
    cout << "\\n";
    return 0;
}` },
  { id: "P095", level: "easy", title: "竖式加法", point: "按位相加模拟",
    hint: "模拟两个大整数竖式加法。",
    code: `#include <iostream>
#include <string>
#include <algorithm>
using namespace std;
int main() {
    string a, b;
    cin >> a >> b;
    reverse(a.begin(), a.end());
    reverse(b.begin(), b.end());
    string r;
    int c = 0;
    for (size_t i = 0; i < max(a.size(), b.size()) || c; i++) {
        int s = c;
        if (i < a.size()) s += a[i] - '0';
        if (i < b.size()) s += b[i] - '0';
        r += char('0' + s % 10);
        c = s / 10;
    }
    reverse(r.begin(), r.end());
    cout << r << "\\n";
    return 0;
}` },
  { id: "P096", level: "easy", title: "相邻差值最大", point: "遍历求差值",
    hint: "求相邻两个元素差值的最大值。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    int mx = 0;
    for (int i = 1; i < n; i++)
        if (abs(a[i] - a[i - 1]) > mx) mx = abs(a[i] - a[i - 1]);
    cout << mx << "\\n";
    return 0;
}` },
  { id: "P097", level: "easy", title: "只保留字母", point: "字符筛选",
    hint: "只保留字母，其余删除。",
    code: `#include <iostream>
#include <string>
#include <cctype>
using namespace std;
int main() {
    string s, r;
    getline(cin, s);
    for (char c : s) if (isalpha((unsigned char)c)) r += c;
    cout << r << "\\n";
    return 0;
}` },
  { id: "P098", level: "easy", title: "第二大元素", point: "遍历找次大",
    hint: "求第二大元素（不重复）。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    int first = -1e9, second = -1e9;
    for (int x : a) {
        if (x > first) { second = first; first = x; }
        else if (x > second && x != first) second = x;
    }
    cout << second << "\\n";
    return 0;
}` },
  { id: "P099", level: "easy", title: "矩阵转置", point: "二维数组基础",
    hint: "矩阵转置输出。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> a(n, vector<int>(m));
    for (auto& row : a) for (auto& x : row) cin >> x;
    for (int j = 0; j < m; j++) {
        for (int i = 0; i < n; i++)
            cout << a[i][j] << (i + 1 < n ? ' ' : '\\n');
    }
    return 0;
}` },
  { id: "P100", level: "easy", title: "3x3 矩阵求和", point: "二维数组遍历",
    hint: "求矩阵所有元素之和。",
    code: `#include <iostream>
using namespace std;
int main() {
    long long sum = 0, x;
    for (int i = 0; i < 9; i++) { cin >> x; sum += x; }
    cout << sum << "\\n";
    return 0;
}` },

  // ===== 较难档 101~130 =====
  { id: "P101", level: "mid", title: "vector 排序去重", point: "vector sort unique",
    hint: "读 n 个数，排序并去重输出。",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    sort(a.begin(), a.end());
    a.erase(unique(a.begin(), a.end()), a.end());
    for (size_t i = 0; i < a.size(); i++)
        cout << a[i] << (i + 1 < a.size() ? ' ' : '\\n');
    return 0;
}` },
  { id: "P102", level: "mid", title: "map 统计单词", point: "map<string,int>",
    hint: "读单词序列，统计每个单词出现次数。",
    code: `#include <iostream>
#include <map>
#include <string>
using namespace std;
int main() {
    int n;
    cin >> n;
    map<string, int> cnt;
    string w;
    for (int i = 0; i < n; i++) { cin >> w; cnt[w]++; }
    for (auto& [k, v] : cnt) cout << k << " " << v << "\\n";
    return 0;
}` },
  { id: "P103", level: "mid", title: "set 去重", point: "set",
    hint: "读数字存入 set，输出集合元素。",
    code: `#include <iostream>
#include <set>
using namespace std;
int main() {
    int n;
    cin >> n;
    set<int> s;
    for (int i = 0; i < n; i++) {
        int x; cin >> x; s.insert(x);
    }
    for (int x : s) cout << x << ' ';
    cout << "\\n";
    return 0;
}` },
  { id: "P104", level: "mid", title: "前缀和", point: "前缀和预处理",
    hint: "多次询问区间 [l,r] 和。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n, q;
    cin >> n >> q;
    vector<long long> a(n + 1), s(n + 1);
    for (int i = 1; i <= n; i++) { cin >> a[i]; s[i] = s[i - 1] + a[i]; }
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << s[r] - s[l - 1] << "\\n";
    }
    return 0;
}` },
  { id: "P105", level: "mid", title: "差分", point: "差分思想",
    hint: "区间 [l,r] 统一加 v，最后输出数组。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n, q;
    cin >> n >> q;
    vector<long long> d(n + 2);
    while (q--) {
        int l, r, v;
        cin >> l >> r >> v;
        d[l] += v; d[r + 1] -= v;
    }
    for (int i = 1; i <= n; i++) {
        d[i] += d[i - 1];
        cout << d[i] << (i < n ? ' ' : '\\n');
    }
    return 0;
}` },
  { id: "P106", level: "mid", title: "二分查找", point: "二分模板",
    hint: "有序数组查找目标值，返回下标。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n, t;
    cin >> n >> t;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    int l = 0, r = n - 1, ans = -1;
    while (l <= r) {
        int mid = (l + r) / 2;
        if (a[mid] == t) { ans = mid; break; }
        else if (a[mid] < t) l = mid + 1;
        else r = mid - 1;
    }
    cout << ans << "\\n";
    return 0;
}` },
  { id: "P107", level: "mid", title: "二分答案", point: "二分答案基础",
    hint: "求最小 x，满足 1+2+…+x ≥ S。",
    code: `#include <iostream>
using namespace std;
int main() {
    long long S;
    cin >> S;
    long long l = 1, r = 2e9, ans = 0;
    while (l <= r) {
        long long mid = (l + r) / 2;
        if (mid * (mid + 1) / 2 >= S) { ans = mid; r = mid - 1; }
        else l = mid + 1;
    }
    cout << ans << "\\n";
    return 0;
}` },
  { id: "P108", level: "mid", title: "pair 排序", point: "pair+sort 自定义",
    hint: "按分数降序排序输出。",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <string>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<pair<int, string>> a(n);
    for (auto& [s, name] : a) cin >> s >> name;
    sort(a.begin(), a.end(), [](auto& x, auto& y) {
        return x.first > y.first;
    });
    for (auto& [s, name] : a) cout << s << " " << name << "\\n";
    return 0;
}` },
  { id: "P109", level: "mid", title: "stringstream", point: "字符串流",
    hint: "一行读取多个单词。",
    code: `#include <iostream>
#include <sstream>
#include <string>
using namespace std;
int main() {
    string line, w;
    getline(cin, line);
    stringstream ss(line);
    while (ss >> w) cout << w << "\\n";
    return 0;
}` },
  { id: "P110", level: "mid", title: "vector 模拟栈", point: "vector 模拟栈",
    hint: "模拟栈 push/pop/top。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    vector<int> st;
    string op;
    while (cin >> op) {
        if (op == "push") { int x; cin >> x; st.push_back(x); }
        else if (op == "pop") { if (!st.empty()) st.pop_back(); }
        else if (op == "top") { cout << (st.empty() ? -1 : st.back()) << "\\n"; }
    }
    return 0;
}` },

  { id: "P111", level: "mid", title: "活动选择", point: "贪心",
    hint: "求最多可参加活动数量。",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<pair<int, int>> a(n);
    for (auto& [s, e] : a) cin >> s >> e;
    sort(a.begin(), a.end(), [](auto& x, auto& y) { return x.second < y.second; });
    int cnt = 0, last = -1;
    for (auto& [s, e] : a)
        if (s > last) { cnt++; last = e; }
    cout << cnt << "\\n";
    return 0;
}` },
  { id: "P112", level: "mid", title: "钱币找零", point: "贪心",
    hint: "用最少纸币凑出金额。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n, amount;
    cin >> n >> amount;
    vector<int> coins(n);
    for (auto& c : coins) cin >> c;
    sort(coins.rbegin(), coins.rend());
    int cnt = 0;
    for (int c : coins) {
        cnt += amount / c;
        amount %= c;
    }
    cout << cnt << "\\n";
    return 0;
}` },
  { id: "P113", level: "mid", title: "DFS 迷宫可达", point: "DFS 回溯",
    hint: "判断起点到终点是否可达。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int n, m;
vector<vector<int>> g;
vector<vector<bool>> vis;
bool dfs(int x, int y) {
    if (x == n - 1 && y == m - 1) return true;
    vis[x][y] = true;
    int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};
    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        if (nx >= 0 && nx < n && ny >= 0 && ny < m && !vis[nx][ny] && g[nx][ny] == 0)
            if (dfs(nx, ny)) return true;
    }
    return false;
}
int main() {
    cin >> n >> m;
    g.assign(n, vector<int>(m));
    vis.assign(n, vector<bool>(m));
    for (auto& row : g) for (auto& x : row) cin >> x;
    cout << (dfs(0, 0) ? "yes" : "no") << "\\n";
    return 0;
}` },
  { id: "P114", level: "mid", title: "BFS 迷宫最短", point: "队列 BFS",
    hint: "求迷宫起点到终点最短步数。",
    code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;
int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> g(n, vector<int>(m));
    for (auto& row : g) for (auto& x : row) cin >> x;
    vector<vector<int>> dist(n, vector<int>(m, -1));
    queue<pair<int, int>> q;
    q.push({0, 0});
    dist[0][0] = 0;
    int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};
    while (!q.empty()) {
        auto [x, y] = q.front(); q.pop();
        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m && g[nx][ny] == 0 && dist[nx][ny] == -1) {
                dist[nx][ny] = dist[x][y] + 1;
                q.push({nx, ny});
            }
        }
    }
    cout << dist[n - 1][m - 1] << "\\n";
    return 0;
}` },
  { id: "P115", level: "mid", title: "全排列", point: "回溯全排列",
    hint: "输出 1~n 全部排列。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int n;
vector<int> path;
vector<bool> used;
void dfs() {
    if (path.size() == n) {
        for (int x : path) cout << x << ' ';
        cout << "\\n";
        return;
    }
    for (int i = 1; i <= n; i++) {
        if (used[i]) continue;
        used[i] = true;
        path.push_back(i);
        dfs();
        path.pop_back();
        used[i] = false;
    }
}
int main() {
    cin >> n;
    used.assign(n + 1, false);
    dfs();
    return 0;
}` },
  { id: "P116", level: "mid", title: "子集枚举", point: "DFS 子集",
    hint: "输出 n 个元素所有子集。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int n;
vector<int> path;
void dfs(int i) {
    if (i > n) {
        for (int x : path) cout << x << ' ';
        cout << "\\n";
        return;
    }
    dfs(i + 1);
    path.push_back(i);
    dfs(i + 1);
    path.pop_back();
}
int main() {
    cin >> n;
    dfs(1);
    return 0;
}` },
  { id: "P117", level: "mid", title: "跳跃游戏", point: "贪心",
    hint: "判断能否跳到末尾。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    int reach = 0;
    for (int i = 0; i < n && i <= reach; i++)
        reach = max(reach, i + a[i]);
    cout << (reach >= n - 1 ? "yes" : "no") << "\\n";
    return 0;
}` },
  { id: "P118", level: "mid", title: "BFS 连通块", point: "BFS 连通块",
    hint: "统计矩阵中相连 1 的块数量。",
    code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;
int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> g(n, vector<int>(m));
    for (auto& row : g) for (auto& x : row) cin >> x;
    vector<vector<bool>> vis(n, vector<bool>(m));
    int cnt = 0;
    int dx[] = {0,0,1,-1}, dy[] = {1,-1,0,0};
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++) {
            if (g[i][j] == 1 && !vis[i][j]) {
                cnt++;
                queue<pair<int, int>> q;
                q.push({i, j});
                vis[i][j] = true;
                while (!q.empty()) {
                    auto [x, y] = q.front(); q.pop();
                    for (int k = 0; k < 4; k++) {
                        int nx = x + dx[k], ny = y + dy[k];
                        if (nx >= 0 && nx < n && ny >= 0 && ny < m && g[nx][ny] == 1 && !vis[nx][ny]) {
                            vis[nx][ny] = true;
                            q.push({nx, ny});
                        }
                    }
                }
            }
        }
    cout << cnt << "\\n";
    return 0;
}` },
  { id: "P119", level: "mid", title: "DFS 连通块", point: "DFS 连通块",
    hint: "矩阵连通块计数。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int n, m;
vector<vector<int>> g;
void dfs(int x, int y) {
    if (x < 0 || x >= n || y < 0 || y >= m || g[x][y] == 0) return;
    g[x][y] = 0;
    dfs(x+1, y); dfs(x-1, y); dfs(x, y+1); dfs(x, y-1);
}
int main() {
    cin >> n >> m;
    g.assign(n, vector<int>(m));
    for (auto& row : g) for (auto& x : row) cin >> x;
    int cnt = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if (g[i][j] == 1) { cnt++; dfs(i, j); }
    cout << cnt << "\\n";
    return 0;
}` },
  { id: "P120", level: "mid", title: "分发饼干", point: "贪心双指针",
    hint: "最多满足多少孩子。",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
int main() {
    int n, m;
    cin >> n >> m;
    vector<int> g(n), s(m);
    for (auto& x : g) cin >> x;
    for (auto& x : s) cin >> x;
    sort(g.begin(), g.end());
    sort(s.begin(), s.end());
    int i = 0, j = 0;
    while (i < n && j < m) {
        if (s[j] >= g[i]) i++;
        j++;
    }
    cout << i << "\\n";
    return 0;
}` },

  { id: "P121", level: "mid", title: "01 背包", point: "01 背包 DP",
    hint: "背包容量 V 求最大价值。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n, V;
    cin >> n >> V;
    vector<int> w(n), v(n);
    for (int i = 0; i < n; i++) cin >> w[i] >> v[i];
    vector<int> dp(V + 1);
    for (int i = 0; i < n; i++)
        for (int j = V; j >= w[i]; j--)
            dp[j] = max(dp[j], dp[j - w[i]] + v[i]);
    cout << dp[V] << "\\n";
    return 0;
}` },
  { id: "P122", level: "mid", title: "最长上升子序列", point: "一维 DP",
    hint: "LIS O(n²)。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    vector<int> dp(n, 1);
    int ans = 1;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++)
            if (a[j] < a[i]) dp[i] = max(dp[i], dp[j] + 1);
        ans = max(ans, dp[i]);
    }
    cout << ans << "\\n";
    return 0;
}` },
  { id: "P123", level: "mid", title: "最长公共子序列", point: "二维 DP",
    hint: "LCS。",
    code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;
int main() {
    string a, b;
    cin >> a >> b;
    int n = a.size(), m = b.size();
    vector<vector<int>> dp(n + 1, vector<int>(m + 1));
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= m; j++) {
            if (a[i - 1] == b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    cout << dp[n][m] << "\\n";
    return 0;
}` },
  { id: "P124", level: "mid", title: "爬楼梯", point: "DP 递推",
    hint: "一次走 1 或 2 阶，求方案数。",
    code: `#include <iostream>
using namespace std;
int main() {
    int n;
    cin >> n;
    if (n <= 2) { cout << n << "\\n"; return 0; }
    long long a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        long long c = a + b;
        a = b; b = c;
    }
    cout << b << "\\n";
    return 0;
}` },
  { id: "P125", level: "mid", title: "双指针两数和", point: "双指针",
    hint: "有序数组找两个数相加等于 target。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n, target;
    cin >> n >> target;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    int l = 0, r = n - 1;
    while (l < r) {
        int s = a[l] + a[r];
        if (s == target) { cout << l << " " << r << "\\n"; return 0; }
        else if (s < target) l++;
        else r--;
    }
    cout << "-1 -1\\n";
    return 0;
}` },
  { id: "P126", level: "mid", title: "滑动窗口", point: "滑动窗口",
    hint: "求数组最长子数组，元素和不大于 S。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n;
    long long S;
    cin >> n >> S;
    vector<long long> a(n);
    for (auto& x : a) cin >> x;
    int l = 0, ans = 0;
    long long sum = 0;
    for (int r = 0; r < n; r++) {
        sum += a[r];
        while (sum > S) sum -= a[l++];
        ans = max(ans, r - l + 1);
    }
    cout << ans << "\\n";
    return 0;
}` },
  { id: "P127", level: "mid", title: "邻接表存图", point: "图基础邻接表",
    hint: "无向图存储，输出每个点邻接点。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    for (int i = 1; i <= n; i++) {
        cout << i << ":";
        for (int v : adj[i]) cout << " " << v;
        cout << "\\n";
    }
    return 0;
}` },
  { id: "P128", level: "mid", title: "二叉树遍历", point: "二叉树基础",
    hint: "手动建树，前/中/后序遍历。",
    code: `#include <iostream>
using namespace std;
struct Node { int val; Node *l, *r; };
void pre(Node* p) { if (!p) return; cout << p->val << ' '; pre(p->l); pre(p->r); }
void in(Node* p) { if (!p) return; in(p->l); cout << p->val << ' '; in(p->r); }
void post(Node* p) { if (!p) return; post(p->l); post(p->r); cout << p->val << ' '; }
int main() {
    Node* root = new Node{1, new Node{2, nullptr, nullptr}, new Node{3, nullptr, nullptr}};
    pre(root); cout << "\\n";
    in(root); cout << "\\n";
    post(root); cout << "\\n";
    return 0;
}` },
  { id: "P129", level: "mid", title: "并查集", point: "DSU 基础",
    hint: "实现合并与查询。",
    code: `#include <iostream>
#include <vector>
using namespace std;
vector<int> fa;
int find(int x) { return fa[x] == x ? x : fa[x] = find(fa[x]); }
void unite(int x, int y) { fa[find(x)] = find(y); }
int main() {
    int n, q;
    cin >> n >> q;
    fa.resize(n + 1);
    for (int i = 1; i <= n; i++) fa[i] = i;
    while (q--) {
        int op, x, y;
        cin >> op >> x >> y;
        if (op == 1) unite(x, y);
        else cout << (find(x) == find(y) ? "yes" : "no") << "\\n";
    }
    return 0;
}` },
  { id: "P130", level: "mid", title: "单调栈", point: "单调栈基础",
    hint: "求数组每个元素右侧第一个更大元素。",
    code: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;
int main() {
    int n;
    cin >> n;
    vector<int> a(n), ans(n, -1);
    for (auto& x : a) cin >> x;
    stack<int> st;
    for (int i = 0; i < n; i++) {
        while (!st.empty() && a[st.top()] < a[i]) {
            ans[st.top()] = a[i];
            st.pop();
        }
        st.push(i);
    }
    for (int i = 0; i < n; i++)
        cout << ans[i] << (i + 1 < n ? ' ' : '\\n');
    return 0;
}` }
);
