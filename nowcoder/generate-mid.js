/**
 * 生成较难档 1~30
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

function wrapMain(body, extraIncludes = "") {
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
${extraIncludes}using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
${body}
    return 0;
}`;
}

const ps = [];

ps.push(problem(1, "vector 排序去重",
  "读入 $n$ 个整数，排序并去重后输出。",
  "第一行一个整数 $n$（$1 \\le n \\le 10^5$）。\n第二行 $n$ 个整数。",
  "一行，输出排序去重后的序列。",
  "6\n3 1 2 1 3 2",
  "1 2 3",
  "先 `sort` 再 `unique`。",
  wrapMain(`
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    sort(a.begin(), a.end());
    a.erase(unique(a.begin(), a.end()), a.end());
    for (int i = 0; i < (int)a.size(); i++) {
        if (i) cout << ' ';
        cout << a[i];
    }
    cout << '\\n';
`)));

ps.push(problem(2, "map 统计单词",
  "读入 $n$ 个单词，统计每个单词出现次数，按字典序输出。",
  "第一行一个整数 $n$（$1 \\le n \\le 10^5$）。\n第二行 $n$ 个单词（仅小写字母，长度不超过 $20$）。",
  "若干行，每行：单词 次数。",
  "5\napple banana apple orange banana",
  "apple 2\nbanana 2\norange 1",
  "使用 `map<string,int>`。",
  wrapMain(`
    int n;
    cin >> n;
    map<string, int> cnt;
    for (int i = 0; i < n; i++) {
        string w;
        cin >> w;
        cnt[w]++;
    }
    for (map<string, int>::iterator it = cnt.begin(); it != cnt.end(); ++it) {
        cout << it->first << ' ' << it->second << '\\n';
    }
`)));

ps.push(problem(3, "set 去重排序",
  "读入一串数字，存入 `set` 后输出集合中的元素。",
  "第一行一个整数 $n$（$1 \\le n \\le 10^5$）。\n第二行 $n$ 个整数。",
  "一行，输出集合元素（升序）。",
  "5\n4 2 4 1 2",
  "1 2 4",
  "`set` 自动去重并排序。",
  wrapMain(`
    int n;
    cin >> n;
    set<int> s;
    for (int i = 0; i < n; i++) {
        int x;
        cin >> x;
        s.insert(x);
    }
    bool first = true;
    for (set<int>::iterator it = s.begin(); it != s.end(); ++it) {
        if (!first) cout << ' ';
        cout << *it;
        first = false;
    }
    cout << '\\n';
`)));

ps.push(problem(4, "前缀和区间查询",
  "给定长度为 $n$ 的数组，有 $q$ 次询问，每次询问区间 $[l,r]$（$1$ 下标）的元素和。",
  "第一行两个整数 $n,q$（$1 \\le n,q \\le 10^5$）。\n第二行 $n$ 个整数。\n接下来 $q$ 行，每行两个整数 $l,r$。",
  "共 $q$ 行，每行一个区间和。",
  "5 3\n1 2 3 4 5\n1 3\n2 5\n3 3",
  "6\n14\n3",
  "预处理前缀和 $s[i]=s[i-1]+a[i]$，查询 $s[r]-s[l-1]$。",
  wrapMain(`
    int n, q;
    cin >> n >> q;
    vector<long long> s(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        long long x;
        cin >> x;
        s[i] = s[i - 1] + x;
    }
    while (q--) {
        int l, r;
        cin >> l >> r;
        cout << s[r] - s[l - 1] << '\\n';
    }
`)));

ps.push(problem(5, "差分数组",
  "长度为 $n$ 的数组初始全为 $0$，进行 $q$ 次操作：将区间 $[l,r]$ 同时加上 $v$。输出最终数组。",
  "第一行两个整数 $n,q$（$1 \\le n,q \\le 10^5$）。\n接下来 $q$ 行，每行三个整数 $l,r,v$（$1 \\le l \\le r \\le n$）。",
  "一行，输出最终数组 $n$ 个整数。",
  "5 2\n1 3 2\n2 5 1",
  "2 3 3 1 1",
  "差分：$d[l]+=v$，$d[r+1]-=v$，再前缀还原。",
  wrapMain(`
    int n, q;
    cin >> n >> q;
    vector<long long> d(n + 2, 0);
    while (q--) {
        int l, r, v;
        cin >> l >> r >> v;
        d[l] += v;
        d[r + 1] -= v;
    }
    for (int i = 1; i <= n; i++) {
        d[i] += d[i - 1];
        if (i > 1) cout << ' ';
        cout << d[i];
    }
    cout << '\\n';
`)));

ps.push(problem(6, "二分查找",
  "给定升序数组，二分查找目标值 $t$，找到则输出任意一个下标（$0$ 开始），否则输出 $-1$。",
  "第一行两个整数 $n,t$（$1 \\le n \\le 10^5$）。\n第二行 $n$ 个升序整数。",
  "一行，输出下标或 $-1$。",
  "5 4\n1 2 4 4 7",
  "2",
  "样例中下标 $2$ 或 $3$ 均可，本参考输出第一次找到的位置。",
  wrapMain(`
    int n, t;
    cin >> n >> t;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int l = 0, r = n - 1, ans = -1;
    while (l <= r) {
        int mid = (l + r) / 2;
        if (a[mid] == t) { ans = mid; break; }
        else if (a[mid] < t) l = mid + 1;
        else r = mid - 1;
    }
    cout << ans << '\\n';
`)));

ps.push(problem(7, "二分答案：最小 x",
  "求最小的正整数 $x$，使得 $1+2+\\cdots+x \\ge S$。",
  "一行，一个正整数 $S$（$1 \\le S \\le 10^{18}$）。",
  "一行，输出最小的 $x$。",
  "10",
  "4",
  "因为 $1+2+3+4=10$。对 $x$ 二分，判断 $x(x+1)/2 \\ge S$。",
  wrapMain(`
    long long S;
    cin >> S;
    long long l = 1, r = 2e9, ans = 1;
    while (l <= r) {
        long long mid = (l + r) / 2;
        // 求最小 x 使 1+..+x >= S
        if (mid * (mid + 1) / 2 >= S) {
            ans = mid;
            r = mid - 1;
        } else {
            l = mid + 1;
        }
    }
    cout << ans << '\\n';
`)));

ps.push(problem(8, "pair 按分数降序",
  "有 $n$ 名学生，每人有分数和姓名。按分数从高到低输出；分数相同则按输入顺序稳定即可（本参考按分数降序）。",
  "第一行一个整数 $n$（$1 \\le n \\le 10^5$）。\n接下来 $n$ 行，每行：分数 姓名。",
  "按排序后的顺序输出，每行：分数 姓名。",
  "3\n90 Alice\n100 Bob\n90 Carol",
  "100 Bob\n90 Alice\n90 Carol",
  "使用 `vector<pair<int,string>>` + 自定义比较。",
  wrapMain(`
    int n;
    cin >> n;
    vector<pair<int, string> > a(n);
    for (int i = 0; i < n; i++) cin >> a[i].first >> a[i].second;
    // 按分数降序
    sort(a.begin(), a.end(), [](const pair<int, string>& x, const pair<int, string>& y) {
        return x.first > y.first;
    });
    for (int i = 0; i < n; i++) {
        cout << a[i].first << ' ' << a[i].second << '\\n';
    }
`)));

ps.push(problem(9, "stringstream 分割单词",
  "读入一行文本，用空格分割出所有单词并每个单词占一行输出。",
  "一行字符串（长度不超过 $10^5$）。",
  "若干行，每行一个单词。",
  "I love C++ very much",
  "I\nlove\nC++\nvery\nmuch",
  "使用 `stringstream`。",
  wrapMain(`
    string line, w;
    getline(cin, line);
    stringstream ss(line);
    while (ss >> w) cout << w << '\\n';
`)));

ps.push(problem(10, "vector 模拟栈",
  "用 `vector` 模拟栈。操作：\n- `push x`：入栈\n- `pop`：出栈（栈空则忽略）\n- `top`：输出栈顶（栈空输出 `-1`）\n- `exit`：结束",
  "若干行操作，以 `exit` 结束。",
  "对每个 `top` 输出一行。",
  "push 1\npush 2\ntop\npop\ntop\npop\ntop\nexit",
  "2\n1\n-1",
  "用 `vector` 的 `push_back/pop_back/back`。",
  wrapMain(`
    vector<int> st;
    string op;
    while (cin >> op) {
        if (op == "exit") break;
        if (op == "push") {
            int x;
            cin >> x;
            st.push_back(x);
        } else if (op == "pop") {
            if (!st.empty()) st.pop_back();
        } else if (op == "top") {
            if (st.empty()) cout << -1 << '\\n';
            else cout << st.back() << '\\n';
        }
    }
`)));

ps.push(problem(11, "活动选择",
  "有 $n$ 个活动，每个活动有开始与结束时间。同一时刻只能参加一个活动，求最多能参加多少个活动（结束时间等于下一活动开始时间允许）。",
  "第一行一个整数 $n$（$1 \\le n \\le 10^5$）。\n接下来 $n$ 行，每行两个整数 $s,e$（$0 \\le s < e \\le 10^9$）。",
  "一行，输出最多活动数。",
  "4\n1 3\n2 5\n4 7\n6 9",
  "2",
  "按结束时间排序，贪心选取。",
  wrapMain(`
    int n;
    cin >> n;
    vector<pair<int, int> > a(n);
    for (int i = 0; i < n; i++) cin >> a[i].first >> a[i].second;
    sort(a.begin(), a.end(), [](const pair<int, int>& x, const pair<int, int>& y) {
        return x.second < y.second;
    });
    int cnt = 0, last = -1;
    for (int i = 0; i < n; i++) {
        if (a[i].first >= last) {
            cnt++;
            last = a[i].second;
        }
    }
    cout << cnt << '\\n';
`)));

ps.push(problem(12, "钱币找零（贪心面额）",
  "给定 $n$ 种面额（保证可用贪心），求凑出金额 $amount$ 所需最少纸币数。保证一定能凑出。",
  "第一行两个整数 $n,amount$（$1 \\le n \\le 20$，$1 \\le amount \\le 10^9$）。\n第二行 $n$ 个面额（含 $1$）。",
  "一行，输出最少纸币数。",
  "3 30\n25 10 1",
  "3",
  "从大到小贪心。",
  wrapMain(`
    int n, amount;
    cin >> n >> amount;
    vector<int> coins(n);
    for (int i = 0; i < n; i++) cin >> coins[i];
    sort(coins.begin(), coins.end(), greater<int>());
    int cnt = 0;
    for (int i = 0; i < n; i++) {
        cnt += amount / coins[i];
        amount %= coins[i];
    }
    cout << cnt << '\\n';
`)));

ps.push(problem(13, "DFS 迷宫可达",
  "给定 $n\\times m$ 迷宫，$0$ 表示通路，$1$ 表示墙。判断从左上角 $(0,0)$ 是否能到达右下角 $(n-1,m-1)$。能则输出 `yes`，否则输出 `no`。保证起点终点是 $0$。",
  "第一行两个整数 $n,m$（$1 \\le n,m \\le 100$）。\n接下来 $n$ 行，每行 $m$ 个整数。",
  "一行，输出 `yes` 或 `no`。",
  "3 3\n0 0 1\n1 0 1\n1 0 0",
  "yes",
  "DFS/BFS 均可。",
  `#include <iostream>
#include <vector>
using namespace std;

int n, m;
vector<vector<int> > g;
vector<vector<int> > vis;

bool dfs(int x, int y) {
    if (x == n - 1 && y == m - 1) return true;
    vis[x][y] = 1;
    int dx[4] = {0, 0, 1, -1};
    int dy[4] = {1, -1, 0, 0};
    for (int i = 0; i < 4; i++) {
        int nx = x + dx[i], ny = y + dy[i];
        if (nx >= 0 && nx < n && ny >= 0 && ny < m && !vis[nx][ny] && g[nx][ny] == 0) {
            if (dfs(nx, ny)) return true;
        }
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cin >> n >> m;
    g.assign(n, vector<int>(m));
    vis.assign(n, vector<int>(m, 0));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> g[i][j];
    cout << (dfs(0, 0) ? "yes" : "no") << '\\n';
    return 0;
}`));

ps.push(problem(14, "BFS 迷宫最短路",
  "在 $n\\times m$ 迷宫中，$0$ 通路 $1$ 墙，求从 $(0,0)$ 到 $(n-1,m-1)$ 的最短步数（相邻四方向一步）。若不可达输出 $-1$。",
  "第一行两个整数 $n,m$（$1 \\le n,m \\le 100$）。\n接下来 $n$ 行，每行 $m$ 个整数。",
  "一行，输出最短步数或 $-1$。",
  "3 3\n0 0 0\n1 1 0\n0 0 0",
  "4",
  "经典 BFS。",
  wrapMain(`
    int n, m;
    cin >> n >> m;
    vector<vector<int> > g(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> g[i][j];
    vector<vector<int> > dist(n, vector<int>(m, -1));
    queue<pair<int, int> > q;
    q.push(make_pair(0, 0));
    dist[0][0] = 0;
    int dx[4] = {0, 0, 1, -1};
    int dy[4] = {1, -1, 0, 0};
    while (!q.empty()) {
        int x = q.front().first, y = q.front().second;
        q.pop();
        for (int i = 0; i < 4; i++) {
            int nx = x + dx[i], ny = y + dy[i];
            if (nx >= 0 && nx < n && ny >= 0 && ny < m && g[nx][ny] == 0 && dist[nx][ny] == -1) {
                dist[nx][ny] = dist[x][y] + 1;
                q.push(make_pair(nx, ny));
            }
        }
    }
    cout << dist[n - 1][m - 1] << '\\n';
`)));

ps.push(problem(15, "全排列",
  "输出 $1$ 到 $n$ 的所有排列，每行一个排列，数字用空格隔开。按字典序输出。",
  "一行，一个整数 $n$（$1 \\le n \\le 8$）。",
  "输出所有排列。",
  "3",
  "1 2 3\n1 3 2\n2 1 3\n2 3 1\n3 1 2\n3 2 1",
  "回溯搜索。",
  `#include <iostream>
#include <vector>
using namespace std;

int n;
vector<int> path;
vector<int> used;

void dfs() {
    if ((int)path.size() == n) {
        for (int i = 0; i < n; i++) {
            if (i) cout << ' ';
            cout << path[i];
        }
        cout << '\\n';
        return;
    }
    for (int i = 1; i <= n; i++) {
        if (used[i]) continue;
        used[i] = 1;
        path.push_back(i);
        dfs();
        path.pop_back();
        used[i] = 0;
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cin >> n;
    used.assign(n + 1, 0);
    dfs();
    return 0;
}`));

ps.push(problem(16, "子集枚举",
  "输出集合 $\\{1,2,\\ldots,n\\}$ 的所有子集。每个子集一行，元素升序，数字用空格隔开；空集输出空行。子集之间的顺序不限。",
  "一行，一个整数 $n$（$1 \\le n \\le 10$）。",
  "输出所有子集。",
  "2",
  "\n1\n2\n1 2",
  "样例顺序仅供参考。DFS 选或不选。",
  `#include <iostream>
#include <vector>
using namespace std;

int n;
vector<int> path;

void dfs(int i) {
    if (i > n) {
        for (int j = 0; j < (int)path.size(); j++) {
            if (j) cout << ' ';
            cout << path[j];
        }
        cout << '\\n';
        return;
    }
    // 不选 i
    dfs(i + 1);
    // 选 i
    path.push_back(i);
    dfs(i + 1);
    path.pop_back();
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cin >> n;
    dfs(1);
    return 0;
}`));

ps.push(problem(17, "跳跃游戏",
  "数组 $a[i]$ 表示在位置 $i$ 最多能向前跳 $a[i]$ 步。判断能否从下标 $0$ 跳到最后一个下标。能则输出 `yes`，否则输出 `no`。",
  "第一行一个整数 $n$（$1 \\le n \\le 10^5$）。\n第二行 $n$ 个非负整数。",
  "一行，输出 `yes` 或 `no`。",
  "5\n2 3 1 1 4",
  "yes",
  "维护最远可达位置。",
  wrapMain(`
    int n;
    cin >> n;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int reach = 0;
    for (int i = 0; i < n && i <= reach; i++) {
        reach = max(reach, i + a[i]);
    }
    cout << (reach >= n - 1 ? "yes" : "no") << '\\n';
`)));

ps.push(problem(18, "BFS 连通块计数",
  "给定 $n\\times m$ 的 $0/1$ 矩阵，统计由上下左右相邻的 $1$ 组成的连通块数量。",
  "第一行两个整数 $n,m$（$1 \\le n,m \\le 100$）。\n接下来 $n$ 行，每行 $m$ 个 $0/1$。",
  "一行，输出连通块数量。",
  "3 4\n1 1 0 0\n0 1 0 1\n0 0 0 1",
  "2",
  "对每个未访问的 $1$ 做 BFS。",
  wrapMain(`
    int n, m;
    cin >> n >> m;
    vector<vector<int> > g(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> g[i][j];
    vector<vector<int> > vis(n, vector<int>(m, 0));
    int cnt = 0;
    int dx[4] = {0, 0, 1, -1};
    int dy[4] = {1, -1, 0, 0};
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            if (g[i][j] == 1 && !vis[i][j]) {
                cnt++;
                queue<pair<int, int> > q;
                q.push(make_pair(i, j));
                vis[i][j] = 1;
                while (!q.empty()) {
                    int x = q.front().first, y = q.front().second;
                    q.pop();
                    for (int k = 0; k < 4; k++) {
                        int nx = x + dx[k], ny = y + dy[k];
                        if (nx >= 0 && nx < n && ny >= 0 && ny < m && g[nx][ny] == 1 && !vis[nx][ny]) {
                            vis[nx][ny] = 1;
                            q.push(make_pair(nx, ny));
                        }
                    }
                }
            }
        }
    }
    cout << cnt << '\\n';
`)));

ps.push(problem(19, "DFS 连通块计数",
  "同上一题，改用 DFS 统计连通块数量。",
  "第一行两个整数 $n,m$（$1 \\le n,m \\le 100$）。\n接下来 $n$ 行，每行 $m$ 个 $0/1$。",
  "一行，输出连通块数量。",
  "3 4\n1 1 0 0\n0 1 0 1\n0 0 0 1",
  "2",
  "访问到 $1$ 就置为 $0$，避免额外 vis 数组。",
  `#include <iostream>
#include <vector>
using namespace std;

int n, m;
vector<vector<int> > g;

void dfs(int x, int y) {
    if (x < 0 || x >= n || y < 0 || y >= m || g[x][y] == 0) return;
    g[x][y] = 0;
    dfs(x + 1, y); dfs(x - 1, y); dfs(x, y + 1); dfs(x, y - 1);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cin >> n >> m;
    g.assign(n, vector<int>(m));
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            cin >> g[i][j];
    int cnt = 0;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < m; j++)
            if (g[i][j] == 1) {
                cnt++;
                dfs(i, j);
            }
    cout << cnt << '\\n';
    return 0;
}`));

ps.push(problem(20, "分发饼干",
  "有 $n$ 个孩子，胃口值为 $g_i$；有 $m$ 块饼干，大小为 $s_j$。只有 $s_j \\ge g_i$ 才能满足孩子 $i$。每个孩子最多一块饼干，求最多能满足多少孩子。",
  "第一行两个整数 $n,m$。\n第二行 $n$ 个整数 $g$。\n第三行 $m$ 个整数 $s$。",
  "一行，输出最多满足的孩子数。",
  "3 2\n1 2 3\n1 1",
  "1",
  "两边排序后双指针贪心。",
  wrapMain(`
    int n, m;
    cin >> n >> m;
    vector<int> g(n), s(m);
    for (int i = 0; i < n; i++) cin >> g[i];
    for (int i = 0; i < m; i++) cin >> s[i];
    sort(g.begin(), g.end());
    sort(s.begin(), s.end());
    int i = 0, j = 0;
    while (i < n && j < m) {
        if (s[j] >= g[i]) i++;
        j++;
    }
    cout << i << '\\n';
`)));

ps.push(problem(21, "01 背包",
  "有 $n$ 件物品，第 $i$ 件重量 $w_i$、价值 $v_i$。背包容量为 $V$，每件最多选一次，求最大价值。",
  "第一行两个整数 $n,V$（$1 \\le n \\le 100$，$1 \\le V \\le 1000$）。\n接下来 $n$ 行，每行两个整数 $w_i,v_i$。",
  "一行，输出最大价值。",
  "3 5\n2 3\n3 4\n4 5",
  "7",
  "经典一维 DP：逆序更新。",
  wrapMain(`
    int n, V;
    cin >> n >> V;
    vector<int> dp(V + 1, 0);
    for (int i = 0; i < n; i++) {
        int w, v;
        cin >> w >> v;
        for (int j = V; j >= w; j--) {
            dp[j] = max(dp[j], dp[j - w] + v);
        }
    }
    cout << dp[V] << '\\n';
`)));

ps.push(problem(22, "最长上升子序列 LIS",
  "给定长度为 $n$ 的序列，求最长严格上升子序列长度。$O(n^2)$ 做法即可。",
  "第一行一个整数 $n$（$1 \\le n \\le 1000$）。\n第二行 $n$ 个整数。",
  "一行，输出 LIS 长度。",
  "6\n1 4 2 3 5 2",
  "4",
  "例如 $1,2,3,5$。",
  wrapMain(`
    int n;
    cin >> n;
    vector<int> a(n), dp(n, 1);
    for (int i = 0; i < n; i++) cin >> a[i];
    int ans = 1;
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (a[j] < a[i]) dp[i] = max(dp[i], dp[j] + 1);
        }
        ans = max(ans, dp[i]);
    }
    cout << ans << '\\n';
`)));

ps.push(problem(23, "最长公共子序列 LCS",
  "给定两个字符串，求最长公共子序列长度。",
  "两行，两个字符串（长度不超过 $1000$，仅小写字母）。",
  "一行，输出 LCS 长度。",
  "abcde\nace",
  "3",
  "二维 DP。",
  wrapMain(`
    string a, b;
    cin >> a >> b;
    int n = a.size(), m = b.size();
    vector<vector<int> > dp(n + 1, vector<int>(m + 1, 0));
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j <= m; j++) {
            if (a[i - 1] == b[j - 1]) dp[i][j] = dp[i - 1][j - 1] + 1;
            else dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    cout << dp[n][m] << '\\n';
`)));

ps.push(problem(24, "爬楼梯",
  "一次可走 $1$ 或 $2$ 阶，求走到第 $n$ 阶的方案数。",
  "一行，一个整数 $n$（$1 \\le n \\le 40$）。",
  "一行，输出方案数。",
  "5",
  "8",
  "递推：$f(n)=f(n-1)+f(n-2)$。",
  wrapMain(`
    int n;
    cin >> n;
    if (n <= 2) {
        cout << n << '\\n';
        return 0;
    }
    long long a = 1, b = 2;
    for (int i = 3; i <= n; i++) {
        long long c = a + b;
        a = b;
        b = c;
    }
    cout << b << '\\n';
`)));

ps.push(problem(25, "双指针两数之和",
  "给定升序数组，找两个下标 $i<j$ 使得 $a[i]+a[j]=target$。输出任意一组下标（$0$ 开始）；若不存在输出 `-1 -1`。",
  "第一行两个整数 $n,target$。\n第二行 $n$ 个升序整数。",
  "一行，两个下标或 `-1 -1`。",
  "4 9\n2 3 6 7",
  "0 3",
  "左右指针相向移动。",
  wrapMain(`
    int n, target;
    cin >> n >> target;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int l = 0, r = n - 1;
    while (l < r) {
        int sum = a[l] + a[r];
        if (sum == target) {
            cout << l << ' ' << r << '\\n';
            return 0;
        } else if (sum < target) l++;
        else r--;
    }
    cout << "-1 -1\\n";
`)));

ps.push(problem(26, "滑动窗口最长子数组",
  "给定数组与上限 $S$，求元素和不超过 $S$ 的最长连续子数组长度。若不存在输出 $0$。",
  "第一行两个整数 $n,S$（$1 \\le n \\le 10^5$，$0 \\le S \\le 10^{14}$）。\n第二行 $n$ 个非负整数。",
  "一行，输出最长长度。",
  "5 7\n2 3 1 2 4",
  "3",
  "例如 $3,1,2$ 和为 $6$。",
  wrapMain(`
    int n;
    long long S;
    cin >> n >> S;
    vector<long long> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    int l = 0, ans = 0;
    long long sum = 0;
    for (int r = 0; r < n; r++) {
        sum += a[r];
        while (l <= r && sum > S) {
            sum -= a[l];
            l++;
        }
        ans = max(ans, r - l + 1);
    }
    cout << ans << '\\n';
`)));

ps.push(problem(27, "邻接表存图",
  "给定 $n$ 个点 $m$ 条无向边，用邻接表存储并输出每个点的邻居（按输入加入顺序）。",
  "第一行两个整数 $n,m$（$1 \\le n \\le 1000$，$0 \\le m \\le 5000$）。\n接下来 $m$ 行，每行两个整数 $u,v$。",
  "输出 $n$ 行，第 $i$ 行格式：`i:` 后跟邻居列表。",
  "3 2\n1 2\n2 3",
  "1: 2\n2: 1 3\n3: 2",
  "无向边要加两次。",
  wrapMain(`
    int n, m;
    cin >> n >> m;
    vector<vector<int> > adj(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v);
        adj[v].push_back(u);
    }
    for (int i = 1; i <= n; i++) {
        cout << i << ':';
        for (int j = 0; j < (int)adj[i].size(); j++) {
            cout << ' ' << adj[i][j];
        }
        cout << '\\n';
    }
`)));

ps.push(problem(28, "二叉树三种遍历",
  "手动建立如下二叉树并输出前序、中序、后序遍历（每行一种，数字用空格隔开）：\n```\n    1\n   / \\\n  2   3\n```",
  "无输入。",
  "三行，分别为前序、中序、后序。",
  "（无）",
  "1 2 3\n2 1 3\n2 3 1",
  "递归遍历模板。",
  `#include <iostream>
using namespace std;

struct Node {
    int val;
    Node *l, *r;
    Node(int v) : val(v), l(0), r(0) {}
};

void pre(Node* p) {
    if (!p) return;
    cout << p->val << ' ';
    pre(p->l);
    pre(p->r);
}
void inorder(Node* p) {
    if (!p) return;
    inorder(p->l);
    cout << p->val << ' ';
    inorder(p->r);
}
void post(Node* p) {
    if (!p) return;
    post(p->l);
    post(p->r);
    cout << p->val << ' ';
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    Node* root = new Node(1);
    root->l = new Node(2);
    root->r = new Node(3);
    pre(root); cout << '\\n';
    inorder(root); cout << '\\n';
    post(root); cout << '\\n';
    return 0;
}`));

ps.push(problem(29, "并查集",
  "实现并查集。操作：\n- `1 x y`：合并 $x,y$\n- `2 x y`：查询是否连通，是输出 `yes`，否输出 `no`",
  "第一行两个整数 $n,q$（$1 \\le n \\le 10^5$，$1 \\le q \\le 10^5$）。\n接下来 $q$ 行操作。",
  "对每个查询输出一行。",
  "5 5\n1 1 2\n1 2 3\n2 1 3\n2 1 4\n1 4 5",
  "yes\nno",
  "路径压缩。",
  `#include <iostream>
#include <vector>
using namespace std;

vector<int> fa;
int find(int x) {
    return fa[x] == x ? x : fa[x] = find(fa[x]);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n, q;
    cin >> n >> q;
    fa.resize(n + 1);
    for (int i = 1; i <= n; i++) fa[i] = i;
    while (q--) {
        int op, x, y;
        cin >> op >> x >> y;
        if (op == 1) {
            fa[find(x)] = find(y);
        } else {
            cout << (find(x) == find(y) ? "yes" : "no") << '\\n';
        }
    }
    return 0;
}`));

ps.push(problem(30, "单调栈：右侧更大元素",
  "对数组每个位置，求它右侧第一个严格更大的元素；若不存在输出 $-1$。",
  "第一行一个整数 $n$（$1 \\le n \\le 10^5$）。\n第二行 $n$ 个整数。",
  "一行，$n$ 个答案。",
  "5\n2 1 2 4 3",
  "4 2 4 -1 -1",
  "从左到右维护单调递减栈。",
  wrapMain(`
    int n;
    cin >> n;
    vector<int> a(n), ans(n, -1);
    for (int i = 0; i < n; i++) cin >> a[i];
    stack<int> st; // 存下标
    for (int i = 0; i < n; i++) {
        while (!st.empty() && a[st.top()] < a[i]) {
            ans[st.top()] = a[i];
            st.pop();
        }
        st.push(i);
    }
    for (int i = 0; i < n; i++) {
        if (i) cout << ' ';
        cout << ans[i];
    }
    cout << '\\n';
`)));

function writeBatch(filename, title, start, end, footer) {
  const content =
    `# ${title}\n\n> 风格：牛客网编程题 | 标准 C++11 | cin/cout\n\n---\n\n` +
    ps.slice(start, end).join("\n") +
    `\n${footer}\n`;
  fs.writeFileSync(path.join(__dirname, filename), content);
}

writeBatch("11-较难-01-10.md", "较难档（第 1～10 题）", 0, 10, "**本批结束：较难档第 1～10 题。**");
writeBatch("12-较难-11-20.md", "较难档（第 11～20 题）", 10, 20, "**本批结束：较难档第 11～20 题。**");
writeBatch("13-较难-21-30.md", "较难档（第 21～30 题）", 20, 30, "**较难档全部 30 题已完成。**");
console.log("wrote mid 1-30");
