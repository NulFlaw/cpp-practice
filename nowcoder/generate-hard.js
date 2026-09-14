/**
 * 生成困难档 1~20
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

const ps = [];

ps.push(problem(1, "完全背包方案数",
  "有 $n$ 种物品，第 $i$ 种重量为 $w_i$，每种无限。背包容量为 $V$，求恰好装满的方案数（顺序不同算同一种组合）。",
  "第一行两个整数 $n,V$（$1 \\le n \\le 100$，$1 \\le V \\le 1000$）。\n第二行 $n$ 个正整数重量。",
  "一行，输出方案数。",
  "3 5\n1 2 3",
  "5",
  "完全背包计数：正序更新。",
  `#include <iostream>
#include <vector>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n, V;
    cin >> n >> V;
    vector<int> w(n);
    for (int i = 0; i < n; i++) cin >> w[i];
    vector<long long> dp(V + 1, 0);
    dp[0] = 1;
    for (int i = 0; i < n; i++) {
        for (int j = w[i]; j <= V; j++) {
            dp[j] += dp[j - w[i]];
        }
    }
    cout << dp[V] << '\\n';
    return 0;
}`));

ps.push(problem(2, "Dijkstra 最短路",
  "给定 $n$ 个点 $m$ 条有向边（边权非负），求从源点 $s$ 到每个点的最短路。不可达输出 $-1$。",
  "第一行三个整数 $n,m,s$（$1 \\le n \\le 10^5$，$1 \\le m \\le 2\\times 10^5$）。\n接下来 $m$ 行：u v w。",
  "一行，$n$ 个整数，表示 $1..n$ 的最短路。",
  "4 4 1\n1 2 1\n1 3 4\n2 3 2\n3 4 1",
  "0 1 3 4",
  "堆优化 Dijkstra。",
  `#include <iostream>
#include <vector>
#include <queue>
#include <cstring>
using namespace std;

const int N = 100010;
vector<pair<int, int> > e[N];
long long dist[N];
bool vis[N];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n, m, s;
    cin >> n >> m >> s;
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        e[u].push_back(make_pair(v, w));
    }
    for (int i = 1; i <= n; i++) dist[i] = 1e18;
    dist[s] = 0;
    priority_queue<pair<long long, int>, vector<pair<long long, int> >, greater<pair<long long, int> > > pq;
    pq.push(make_pair(0, s));
    while (!pq.empty()) {
        int u = pq.top().second;
        pq.pop();
        if (vis[u]) continue;
        vis[u] = true;
        for (int i = 0; i < (int)e[u].size(); i++) {
            int v = e[u][i].first, w = e[u][i].second;
            if (dist[v] > dist[u] + w) {
                dist[v] = dist[u] + w;
                pq.push(make_pair(dist[v], v));
            }
        }
    }
    for (int i = 1; i <= n; i++) {
        if (i > 1) cout << ' ';
        cout << (dist[i] >= 1e18 ? -1 : dist[i]);
    }
    cout << '\\n';
    return 0;
}`));

ps.push(problem(3, "Kruskal 最小生成树",
  "给定无向连通图，求最小生成树边权之和；若不连通输出 $-1$。",
  "第一行两个整数 $n,m$。\n接下来 $m$ 行：u v w。",
  "一行，输出 MST 权值和或 $-1$。",
  "4 5\n1 2 1\n1 3 4\n2 3 2\n2 4 5\n3 4 3",
  "6",
  "边排序 + 并查集。",
  `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

struct Edge {
    int u, v, w;
};
vector<int> fa;
int find(int x) { return fa[x] == x ? x : fa[x] = find(fa[x]); }

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n, m;
    cin >> n >> m;
    vector<Edge> edges(m);
    for (int i = 0; i < m; i++) cin >> edges[i].u >> edges[i].v >> edges[i].w;
    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) { return a.w < b.w; });
    fa.resize(n + 1);
    for (int i = 1; i <= n; i++) fa[i] = i;
    long long sum = 0;
    int cnt = 0;
    for (int i = 0; i < m; i++) {
        int fu = find(edges[i].u), fv = find(edges[i].v);
        if (fu != fv) {
            fa[fu] = fv;
            sum += edges[i].w;
            cnt++;
        }
    }
    cout << (cnt == n - 1 ? sum : -1) << '\\n';
    return 0;
}`));

ps.push(problem(4, "Prim 最小生成树",
  "用 Prim 算法求无向连通图最小生成树权值和；不连通输出 $-1$。",
  "第一行两个整数 $n,m$。\n接下来 $m$ 行：u v w。",
  "一行，输出权值和或 $-1$。",
  "4 5\n1 2 1\n1 3 4\n2 3 2\n2 4 5\n3 4 3",
  "6",
  "堆优化 Prim。",
  `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

const int N = 5010;
vector<pair<int, int> > e[N];
long long dist[N];
bool vis[N];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        e[u].push_back(make_pair(v, w));
        e[v].push_back(make_pair(u, w));
    }
    for (int i = 1; i <= n; i++) dist[i] = 1e18;
    dist[1] = 0;
    priority_queue<pair<long long, int>, vector<pair<long long, int> >, greater<pair<long long, int> > > pq;
    pq.push(make_pair(0, 1));
    long long sum = 0;
    int cnt = 0;
    while (!pq.empty()) {
        int u = pq.top().second;
        long long d = pq.top().first;
        pq.pop();
        if (vis[u]) continue;
        vis[u] = true;
        sum += d;
        cnt++;
        for (int i = 0; i < (int)e[u].size(); i++) {
            int v = e[u][i].first, w = e[u][i].second;
            if (!vis[v] && w < dist[v]) {
                dist[v] = w;
                pq.push(make_pair(w, v));
            }
        }
    }
    cout << (cnt == n ? sum : -1) << '\\n';
    return 0;
}`));

ps.push(problem(5, "拓扑排序",
  "给定有向图，若存在拓扑序则输出任意一个；若有环输出 `has cycle`。",
  "第一行两个整数 $n,m$。\n接下来 $m$ 行有向边 u->v。",
  "一行拓扑序，或 `has cycle`。",
  "4 3\n1 2\n2 3\n1 4",
  "1 2 4 3",
  "样例拓扑序不唯一。",
  `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n, m;
    cin >> n >> m;
    vector<vector<int> > e(n + 1);
    vector<int> indeg(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        e[u].push_back(v);
        indeg[v]++;
    }
    queue<int> q;
    for (int i = 1; i <= n; i++) if (indeg[i] == 0) q.push(i);
    vector<int> ans;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        ans.push_back(u);
        for (int i = 0; i < (int)e[u].size(); i++) {
            int v = e[u][i];
            if (--indeg[v] == 0) q.push(v);
        }
    }
    if ((int)ans.size() != n) {
        cout << "has cycle\\n";
        return 0;
    }
    for (int i = 0; i < n; i++) {
        if (i) cout << ' ';
        cout << ans[i];
    }
    cout << '\\n';
    return 0;
}`));

ps.push(problem(6, "KMP 字符串匹配",
  "在文本串 $s$ 中查找模式串 $p$ 的所有出现位置（从 $0$ 开始），每个位置占一行。",
  "第一行字符串 $s$。\n第二行字符串 $p$。",
  "若干行匹配位置；若无匹配则不输出。",
  "abababa\naba",
  "0\n2\n4",
  "先求 next 数组再匹配。",
  `#include <iostream>
#include <vector>
#include <string>
using namespace std;

vector<int> getNext(const string& p) {
    int m = p.size();
    vector<int> nxt(m, 0);
    for (int i = 1, j = 0; i < m; i++) {
        while (j > 0 && p[i] != p[j]) j = nxt[j - 1];
        if (p[i] == p[j]) j++;
        nxt[i] = j;
    }
    return nxt;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    string s, p;
    cin >> s >> p;
    vector<int> nxt = getNext(p);
    int n = s.size(), m = p.size();
    for (int i = 0, j = 0; i < n; i++) {
        while (j > 0 && s[i] != p[j]) j = nxt[j - 1];
        if (s[i] == p[j]) j++;
        if (j == m) {
            cout << i - m + 1 << '\\n';
            j = nxt[j - 1];
        }
    }
    return 0;
}`));

ps.push(problem(7, "线段树单点修改区间和",
  "维护长度为 $n$ 的数组：\n- 操作 1：把位置 $x$ 修改为 $y$\n- 操作 2：查询区间 $[l,r]$ 的和",
  "第一行两个整数 $n,q$。\n第二行 $n$ 个整数。\n接下来 $q$ 行操作。",
  "对每个查询输出一行。",
  "5 3\n1 2 3 4 5\n2 1 5\n1 3 10\n2 2 4",
  "15\n16",
  "线段树基础。",
  `#include <iostream>
#include <vector>
using namespace std;

int n;
vector<long long> tr;

void update(int p, long long v, int i, int l, int r) {
    if (l == r) { tr[i] = v; return; }
    int mid = (l + r) / 2;
    if (p <= mid) update(p, v, i * 2, l, mid);
    else update(p, v, i * 2 + 1, mid + 1, r);
    tr[i] = tr[i * 2] + tr[i * 2 + 1];
}

long long query(int ql, int qr, int i, int l, int r) {
    if (ql <= l && r <= qr) return tr[i];
    int mid = (l + r) / 2;
    long long s = 0;
    if (ql <= mid) s += query(ql, qr, i * 2, l, mid);
    if (qr > mid) s += query(ql, qr, i * 2 + 1, mid + 1, r);
    return s;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int q;
    cin >> n >> q;
    tr.assign(4 * n + 5, 0);
    for (int i = 1; i <= n; i++) {
        long long x;
        cin >> x;
        update(i, x, 1, 1, n);
    }
    while (q--) {
        int op, x, y;
        cin >> op >> x >> y;
        if (op == 1) update(x, y, 1, 1, n);
        else cout << query(x, y, 1, 1, n) << '\\n';
    }
    return 0;
}`));

ps.push(problem(8, "线段树区间加区间和",
  "维护数组：\n- 操作 1：区间 $[l,r]$ 同时加 $v$\n- 操作 2：查询区间 $[l,r]$ 的和",
  "第一行两个整数 $n,q$。\n第二行 $n$ 个整数。\n接下来 $q$ 行：\n`1 l r v` 或 `2 l r`",
  "对每个查询输出一行。",
  "5 3\n1 2 3 4 5\n1 2 4 1\n2 1 5\n2 2 3",
  "18\n7",
  "懒标记线段树。",
  `#include <iostream>
#include <vector>
using namespace std;

int n;
vector<long long> tr, lazy;

void push(int i, int l, int r) {
    if (!lazy[i] || l == r) return;
    int mid = (l + r) / 2;
    tr[i * 2] += lazy[i] * (mid - l + 1);
    lazy[i * 2] += lazy[i];
    tr[i * 2 + 1] += lazy[i] * (r - mid);
    lazy[i * 2 + 1] += lazy[i];
    lazy[i] = 0;
}

void update(int ql, int qr, long long v, int i, int l, int r) {
    if (ql <= l && r <= qr) {
        tr[i] += v * (r - l + 1);
        lazy[i] += v;
        return;
    }
    push(i, l, r);
    int mid = (l + r) / 2;
    if (ql <= mid) update(ql, qr, v, i * 2, l, mid);
    if (qr > mid) update(ql, qr, v, i * 2 + 1, mid + 1, r);
    tr[i] = tr[i * 2] + tr[i * 2 + 1];
}

long long query(int ql, int qr, int i, int l, int r) {
    if (ql <= l && r <= qr) return tr[i];
    push(i, l, r);
    int mid = (l + r) / 2;
    long long s = 0;
    if (ql <= mid) s += query(ql, qr, i * 2, l, mid);
    if (qr > mid) s += query(ql, qr, i * 2 + 1, mid + 1, r);
    return s;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int q;
    cin >> n >> q;
    tr.assign(4 * n + 5, 0);
    lazy.assign(4 * n + 5, 0);
    for (int i = 1; i <= n; i++) {
        long long x;
        cin >> x;
        update(i, i, x, 1, 1, n);
    }
    while (q--) {
        int op, l, r;
        cin >> op >> l >> r;
        if (op == 1) {
            long long v;
            cin >> v;
            update(l, r, v, 1, 1, n);
        } else {
            cout << query(l, r, 1, 1, n) << '\\n';
        }
    }
    return 0;
}`));

ps.push(problem(9, "数位 DP：不含数字 4",
  "统计区间 $[L,R]$ 中十进制表示不含数字 $4$ 的整数个数。",
  "一行两个整数 $L,R$（$0 \\le L \\le R \\le 10^{18}$）。",
  "一行，输出个数。",
  "1 20",
  "18",
  "因为 $4$ 和 $14$ 不含（这里 1..20 中含 4 的是 4,14，共 2 个，故 20-2=18）。含前导情况用数位 DP 处理。",
  `#include <iostream>
#include <string>
#include <cstring>
using namespace std;

string s;
long long dp[20][2];

long long dfs(int pos, bool limit, bool started) {
    if (pos == (int)s.size()) return started ? 1 : 1; // 含 0
    if (!limit && started && dp[pos][started] != -1) return dp[pos][started];
    // 简化：统一记忆化键
    int up = limit ? s[pos] - '0' : 9;
    long long ans = 0;
    for (int d = 0; d <= up; d++) {
        if (d == 4) continue;
        ans += dfs(pos + 1, limit && d == up, started || d > 0);
    }
    // 对未开始的状态也返回（全 0）
    if (!started) {
        // 上面循环已包含继续不开始的情况（d=0）
    }
    if (!limit && started) dp[pos][started] = ans;
    return ans;
}

long long solve(long long n) {
    if (n < 0) return 0;
    s = to_string(n);
    memset(dp, -1, sizeof(dp));
    return dfs(0, true, false);
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    long long L, R;
    cin >> L >> R;
    cout << solve(R) - solve(L - 1) << '\\n';
    return 0;
}`));

ps.push(problem(10, "状压 DP：TSP",
  "给出 $n$ 个城市两两距离，求从城市 $0$ 出发经过所有城市恰好一次再回到 $0$ 的最短路径（小规模 TSP）。",
  "第一行一个整数 $n$（$2 \\le n \\le 16$）。\n接下来 $n$ 行，每行 $n$ 个整数表示距离矩阵。",
  "一行，输出最短回路长度。",
  "4\n0 1 2 3\n1 0 4 5\n2 4 0 6\n3 5 6 0",
  "14",
  "状态压缩 DP：`dp[s][u]`。",
  `#include <iostream>
#include <vector>
#include <cstring>
using namespace std;

int n;
int dist[20][20];
long long dp[1 << 16][16];

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> dist[i][j];
    memset(dp, 0x3f, sizeof(dp));
    dp[1][0] = 0;
    for (int s = 1; s < (1 << n); s++) {
        for (int u = 0; u < n; u++) {
            if (!(s >> u & 1)) continue;
            for (int v = 0; v < n; v++) {
                if (s >> v & 1) continue;
                int ns = s | (1 << v);
                dp[ns][v] = min(dp[ns][v], dp[s][u] + dist[u][v]);
            }
        }
    }
    long long ans = 1e18;
    for (int i = 1; i < n; i++) {
        ans = min(ans, dp[(1 << n) - 1][i] + dist[i][0]);
    }
    cout << ans << '\\n';
    return 0;
}`));

ps.push(problem(11, "Tarjan 强连通分量",
  "求有向图的强连通分量个数，并输出每个点所属 SCC 编号（编号不要求固定，只要同一分量相同即可）。",
  "第一行两个整数 $n,m$。\n接下来 $m$ 行有向边。",
  "第一行输出 SCC 个数。\n第二行输出 $n$ 个编号。",
  "5 5\n1 2\n2 3\n3 1\n2 4\n4 5",
  "3\n1 1 1 2 3",
  "样例编号仅示意。",
  `#include <iostream>
#include <vector>
#include <stack>
using namespace std;

int n, m, timer = 0, sccCnt = 0;
vector<vector<int> > e;
vector<int> dfn, low, belong, inStk;
stack<int> stk;

void tarjan(int u) {
    dfn[u] = low[u] = ++timer;
    stk.push(u);
    inStk[u] = 1;
    for (int i = 0; i < (int)e[u].size(); i++) {
        int v = e[u][i];
        if (!dfn[v]) {
            tarjan(v);
            low[u] = min(low[u], low[v]);
        } else if (inStk[v]) {
            low[u] = min(low[u], dfn[v]);
        }
    }
    if (dfn[u] == low[u]) {
        sccCnt++;
        while (true) {
            int x = stk.top(); stk.pop();
            inStk[x] = 0;
            belong[x] = sccCnt;
            if (x == u) break;
        }
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cin >> n >> m;
    e.assign(n + 1, vector<int>());
    dfn.assign(n + 1, 0);
    low.assign(n + 1, 0);
    belong.assign(n + 1, 0);
    inStk.assign(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        e[u].push_back(v);
    }
    for (int i = 1; i <= n; i++) if (!dfn[i]) tarjan(i);
    cout << sccCnt << '\\n';
    for (int i = 1; i <= n; i++) {
        if (i > 1) cout << ' ';
        cout << belong[i];
    }
    cout << '\\n';
    return 0;
}`));

ps.push(problem(12, "SPFA 判负环",
  "给定有向图，判断是否存在负环。存在输出 `yes`，否则输出 `no`。",
  "第一行两个整数 $n,m$。\n接下来 $m$ 行：u v w（w 可为负）。",
  "一行，输出 `yes` 或 `no`。",
  "3 3\n1 2 1\n2 3 -3\n3 1 1",
  "yes",
  "某点入队次数达到 $n$ 则存在负环。",
  `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n, m;
    cin >> n >> m;
    vector<vector<pair<int, int> > > e(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        e[u].push_back(make_pair(v, w));
    }
    vector<long long> dist(n + 1, 0);
    vector<int> cnt(n + 1, 0), inq(n + 1, 0);
    queue<int> q;
    for (int i = 1; i <= n; i++) {
        q.push(i);
        inq[i] = 1;
    }
    bool neg = false;
    while (!q.empty() && !neg) {
        int u = q.front(); q.pop();
        inq[u] = 0;
        for (int i = 0; i < (int)e[u].size(); i++) {
            int v = e[u][i].first, w = e[u][i].second;
            if (dist[v] > dist[u] + w) {
                dist[v] = dist[u] + w;
                cnt[v] = cnt[u] + 1;
                if (cnt[v] >= n) { neg = true; break; }
                if (!inq[v]) { q.push(v); inq[v] = 1; }
            }
        }
    }
    cout << (neg ? "yes" : "no") << '\\n';
    return 0;
}`));

ps.push(problem(13, "树的最大独立集",
  "给定一棵 $n$ 个节点的树，求最大独立集大小（任意两选中点不相邻）。",
  "第一行一个整数 $n$（$1 \\le n \\le 10^5$）。\n接下来 $n-1$ 行树边。",
  "一行，输出最大独立集大小。",
  "4\n1 2\n1 3\n1 4",
  "3",
  "树上 DP：选或不选根。",
  `#include <iostream>
#include <vector>
using namespace std;

int n;
vector<vector<int> > e;
vector<int> f0, f1;

void dfs(int u, int fa) {
    f0[u] = 0;
    f1[u] = 1;
    for (int i = 0; i < (int)e[u].size(); i++) {
        int v = e[u][i];
        if (v == fa) continue;
        dfs(v, u);
        f0[u] += max(f0[v], f1[v]);
        f1[u] += f0[v];
    }
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    cin >> n;
    e.assign(n + 1, vector<int>());
    f0.assign(n + 1, 0);
    f1.assign(n + 1, 0);
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        e[u].push_back(v);
        e[v].push_back(u);
    }
    dfs(1, 0);
    cout << max(f0[1], f1[1]) << '\\n';
    return 0;
}`));

ps.push(problem(14, "LCA 倍增",
  "给定有根树，处理 $q$ 次询问，每次求两点最近公共祖先。",
  "第一行三个整数 $n,q,root$。\n接下来 $n-1$ 行树边。\n接下来 $q$ 行询问 u v。",
  "共 $q$ 行，每行一个 LCA。",
  "5 3 1\n1 2\n1 3\n2 4\n2 5\n4 5\n4 3\n2 3",
  "2\n1\n1",
  "倍增预处理。",
  `#include <iostream>
#include <vector>
using namespace std;

const int N = 100010, LOG = 18;
vector<int> e[N];
int fa[N][LOG], dep[N];

void dfs(int u, int f) {
    fa[u][0] = f;
    dep[u] = dep[f] + 1;
    for (int i = 1; i < LOG; i++) fa[u][i] = fa[fa[u][i - 1]][i - 1];
    for (int i = 0; i < (int)e[u].size(); i++) {
        int v = e[u][i];
        if (v != f) dfs(v, u);
    }
}

int lca(int u, int v) {
    if (dep[u] < dep[v]) swap(u, v);
    int diff = dep[u] - dep[v];
    for (int i = 0; i < LOG; i++) if (diff >> i & 1) u = fa[u][i];
    if (u == v) return u;
    for (int i = LOG - 1; i >= 0; i--) {
        if (fa[u][i] != fa[v][i]) {
            u = fa[u][i];
            v = fa[v][i];
        }
    }
    return fa[u][0];
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n, q, root;
    cin >> n >> q >> root;
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        e[u].push_back(v);
        e[v].push_back(u);
    }
    dfs(root, 0);
    while (q--) {
        int u, v;
        cin >> u >> v;
        cout << lca(u, v) << '\\n';
    }
    return 0;
}`));

ps.push(problem(15, "离散化 + 扫描（矩形覆盖点数）",
  "平面上有 $n$ 个轴对齐矩形（含边界），再给出 $q$ 个询问点，输出每个点被多少个矩形覆盖。",
  "第一行两个整数 $n,q$。\n接下来 $n$ 行：x1 y1 x2 y2（左下与右上）。\n接下来 $q$ 行：x y。",
  "共 $q$ 行，每行一个覆盖数。",
  "2 3\n1 1 3 3\n2 2 4 4\n2 2\n1 1\n5 5",
  "2\n1\n0",
  "坐标离散化 + 二维差分。",
  `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n, q;
    cin >> n >> q;
    vector<int> xs, ys;
    vector<int> x1(n), y1(n), x2(n), y2(n);
    for (int i = 0; i < n; i++) {
        cin >> x1[i] >> y1[i] >> x2[i] >> y2[i];
        xs.push_back(x1[i]); xs.push_back(x2[i] + 1);
        ys.push_back(y1[i]); ys.push_back(y2[i] + 1);
    }
    vector<int> qx(q), qy(q);
    for (int i = 0; i < q; i++) {
        cin >> qx[i] >> qy[i];
        xs.push_back(qx[i]);
        ys.push_back(qy[i]);
    }
    sort(xs.begin(), xs.end());
    xs.erase(unique(xs.begin(), xs.end()), xs.end());
    sort(ys.begin(), ys.end());
    ys.erase(unique(ys.begin(), ys.end()), ys.end());
    int W = xs.size(), H = ys.size();
    vector<vector<int> > d(W + 1, vector<int>(H + 1, 0));
    for (int i = 0; i < n; i++) {
        int a = lower_bound(xs.begin(), xs.end(), x1[i]) - xs.begin();
        int b = lower_bound(xs.begin(), xs.end(), x2[i] + 1) - xs.begin();
        int c = lower_bound(ys.begin(), ys.end(), y1[i]) - ys.begin();
        int e = lower_bound(ys.begin(), ys.end(), y2[i] + 1) - ys.begin();
        d[a][c]++; d[a][e]--; d[b][c]--; d[b][e]++;
    }
    for (int i = 0; i < W; i++) {
        for (int j = 0; j < H; j++) {
            if (i) d[i][j] += d[i - 1][j];
            if (j) d[i][j] += d[i][j - 1];
            if (i && j) d[i][j] -= d[i - 1][j - 1];
        }
    }
    for (int i = 0; i < q; i++) {
        int xi = lower_bound(xs.begin(), xs.end(), qx[i]) - xs.begin();
        int yi = lower_bound(ys.begin(), ys.end(), qy[i]) - ys.begin();
        cout << d[xi][yi] << '\\n';
    }
    return 0;
}`));

ps.push(problem(16, "AC 自动机（多模式匹配计数）",
  "给定 $n$ 个模式串和一个文本串，统计文本中出现了多少个不同的模式串（每个模式最多计一次）。",
  "第一行一个整数 $n$。\n接下来 $n$ 行模式串。\n最后一行文本串。",
  "一行，输出出现的不同模式串个数。",
  "3\na\nba\nbaa\nbbaaa",
  "2",
  "AC 自动机 + fail 链统计。",
  `#include <iostream>
#include <vector>
#include <queue>
#include <string>
using namespace std;

struct Node {
    int next[26];
    int fail, cnt;
    Node() {
        for (int i = 0; i < 26; i++) next[i] = 0;
        fail = 0; cnt = 0;
    }
};
vector<Node> tr(1);

void insert(const string& s) {
    int u = 0;
    for (int i = 0; i < (int)s.size(); i++) {
        int v = s[i] - 'a';
        if (!tr[u].next[v]) {
            tr[u].next[v] = (int)tr.size();
            tr.push_back(Node());
        }
        u = tr[u].next[v];
    }
    tr[u].cnt++;
}

void build() {
    queue<int> q;
    for (int i = 0; i < 26; i++) if (tr[0].next[i]) q.push(tr[0].next[i]);
    while (!q.empty()) {
        int u = q.front(); q.pop();
        for (int i = 0; i < 26; i++) {
            if (tr[u].next[i]) {
                tr[tr[u].next[i]].fail = tr[tr[u].fail].next[i];
                q.push(tr[u].next[i]);
            } else {
                tr[u].next[i] = tr[tr[u].fail].next[i];
            }
        }
    }
}

int query(const string& s) {
    int u = 0, ans = 0;
    for (int i = 0; i < (int)s.size(); i++) {
        u = tr[u].next[s[i] - 'a'];
        for (int v = u; v && tr[v].cnt != -1; v = tr[v].fail) {
            ans += tr[v].cnt;
            tr[v].cnt = -1;
        }
    }
    return ans;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n;
    cin >> n;
    string s;
    for (int i = 0; i < n; i++) {
        cin >> s;
        insert(s);
    }
    build();
    cin >> s;
    cout << query(s) << '\\n';
    return 0;
}`));

ps.push(problem(17, "二分图判定",
  "给定无向图，判断是否为二分图。是输出 `yes`，否输出 `no`。",
  "第一行两个整数 $n,m$。\n接下来 $m$ 行无向边。",
  "一行，输出 `yes` 或 `no`。",
  "3 3\n1 2\n2 3\n3 1",
  "no",
  "染色法 BFS/DFS。",
  `#include <iostream>
#include <vector>
#include <queue>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n, m;
    cin >> n >> m;
    vector<vector<int> > e(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        e[u].push_back(v);
        e[v].push_back(u);
    }
    vector<int> color(n + 1, -1);
    bool ok = true;
    for (int i = 1; i <= n && ok; i++) {
        if (color[i] != -1) continue;
        queue<int> q;
        q.push(i);
        color[i] = 0;
        while (!q.empty() && ok) {
            int u = q.front(); q.pop();
            for (int j = 0; j < (int)e[u].size(); j++) {
                int v = e[u][j];
                if (color[v] == -1) {
                    color[v] = color[u] ^ 1;
                    q.push(v);
                } else if (color[v] == color[u]) {
                    ok = false;
                    break;
                }
            }
        }
    }
    cout << (ok ? "yes" : "no") << '\\n';
    return 0;
}`));

ps.push(problem(18, "二分图最大匹配（匈牙利）",
  "左右部大小分别为 $n$ 和 $m$，有 $k$ 条边，求最大匹配数。",
  "第一行三个整数 $n,m,k$。\n接下来 $k$ 行：u v（左部 u 连右部 v）。",
  "一行，输出最大匹配数。",
  "2 2 3\n1 1\n1 2\n2 2",
  "2",
  "匈牙利算法。",
  `#include <iostream>
#include <vector>
#include <cstring>
using namespace std;

vector<int> e[510];
int matchR[510];
bool vis[510];

bool dfs(int u) {
    for (int i = 0; i < (int)e[u].size(); i++) {
        int v = e[u][i];
        if (vis[v]) continue;
        vis[v] = true;
        if (!matchR[v] || dfs(matchR[v])) {
            matchR[v] = u;
            return true;
        }
    }
    return false;
}

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n, m, k;
    cin >> n >> m >> k;
    for (int i = 0; i < k; i++) {
        int u, v;
        cin >> u >> v;
        e[u].push_back(v);
    }
    int ans = 0;
    memset(matchR, 0, sizeof(matchR));
    for (int i = 1; i <= n; i++) {
        memset(vis, 0, sizeof(vis));
        if (dfs(i)) ans++;
    }
    cout << ans << '\\n';
    return 0;
}`));

ps.push(problem(19, "莫队算法（区间不同数个数示意）",
  "给定数组，有 $q$ 个离线区间询问，求每个区间内所有元素出现次数的平方和 $\\sum cnt_x^2$。",
  "第一行两个整数 $n,q$。\n第二行 $n$ 个整数（值域映射到 $1..n$）。\n接下来 $q$ 行：l r（$1$ 下标）。",
  "共 $q$ 行，每行一个答案。",
  "5 2\n1 2 1 3 2\n1 3\n2 5",
  "5\n4",
  "经典莫队。",
  `#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;

struct Query {
    int l, r, id;
};

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    int n, q;
    cin >> n >> q;
    vector<int> a(n);
    for (int i = 0; i < n; i++) cin >> a[i];
    vector<Query> qs(q);
    for (int i = 0; i < q; i++) {
        cin >> qs[i].l >> qs[i].r;
        qs[i].l--; qs[i].r--;
        qs[i].id = i;
    }
    int block = sqrt(n) + 1;
    sort(qs.begin(), qs.end(), [block](const Query& x, const Query& y) {
        if (x.l / block != y.l / block) return x.l / block < y.l / block;
        return ((x.l / block) & 1) ? (x.r > y.r) : (x.r < y.r);
    });
    vector<long long> ans(q);
    vector<int> cnt(n + 1, 0);
    long long cur = 0;
    int l = 0, r = -1;
    for (int i = 0; i < q; i++) {
        int ql = qs[i].l, qr = qs[i].r;
        while (r < qr) {
            r++;
            cur -= 1LL * cnt[a[r]] * cnt[a[r]];
            cnt[a[r]]++;
            cur += 1LL * cnt[a[r]] * cnt[a[r]];
        }
        while (l > ql) {
            l--;
            cur -= 1LL * cnt[a[l]] * cnt[a[l]];
            cnt[a[l]]++;
            cur += 1LL * cnt[a[l]] * cnt[a[l]];
        }
        while (r > qr) {
            cur -= 1LL * cnt[a[r]] * cnt[a[r]];
            cnt[a[r]]--;
            cur += 1LL * cnt[a[r]] * cnt[a[r]];
            r--;
        }
        while (l < ql) {
            cur -= 1LL * cnt[a[l]] * cnt[a[l]];
            cnt[a[l]]--;
            cur += 1LL * cnt[a[l]] * cnt[a[l]];
            l++;
        }
        ans[qs[i].id] = cur;
    }
    for (int i = 0; i < q; i++) cout << ans[i] << '\\n';
    return 0;
}`));

ps.push(problem(20, "后缀数组（倍增）",
  "给定字符串 $s$，输出其后缀数组 SA：即所有后缀按字典序排序后的起始下标序列。",
  "一行，一个仅含小写字母的字符串 $s$（$1 \\le |s| \\le 10^5$）。",
  "一行，$|s|$ 个整数，表示 SA。",
  "aaba",
  "3 0 1 2",
  "后缀：`a`,`aaba`,`aba`,`ba`，排序后下标为 3,0,1,2。",
  `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(0);
    string s;
    cin >> s;
    int n = s.size();
    vector<int> sa(n), rnk(n), tmp(n);
    for (int i = 0; i < n; i++) {
        sa[i] = i;
        rnk[i] = s[i];
    }
    for (int k = 1;; k <<= 1) {
        sort(sa.begin(), sa.end(), [&](int i, int j) {
            if (rnk[i] != rnk[j]) return rnk[i] < rnk[j];
            int ri = i + k < n ? rnk[i + k] : -1;
            int rj = j + k < n ? rnk[j + k] : -1;
            return ri < rj;
        });
        tmp[sa[0]] = 0;
        for (int i = 1; i < n; i++) {
            bool less = rnk[sa[i - 1]] < rnk[sa[i]] ||
                (rnk[sa[i - 1]] == rnk[sa[i]] &&
                 (sa[i - 1] + k < n ? rnk[sa[i - 1] + k] : -1) <
                 (sa[i] + k < n ? rnk[sa[i] + k] : -1));
            tmp[sa[i]] = tmp[sa[i - 1]] + (less ? 1 : 0);
        }
        rnk = tmp;
        if (rnk[sa[n - 1]] == n - 1) break;
    }
    for (int i = 0; i < n; i++) {
        if (i) cout << ' ';
        cout << sa[i];
    }
    cout << '\\n';
    return 0;
}`));

fs.writeFileSync(path.join(__dirname, "14-困难-01-10.md"),
  "# 困难档（第 1～10 题）\n\n> 风格：牛客网编程题 | 标准 C++11 | cin/cout\n\n---\n\n" +
  ps.slice(0, 10).join("\n") + "\n**本批结束：困难档第 1～10 题。**\n");
fs.writeFileSync(path.join(__dirname, "15-困难-11-20.md"),
  "# 困难档（第 11～20 题）\n\n> 风格：牛客网编程题 | 标准 C++11 | cin/cout\n\n---\n\n" +
  ps.slice(10, 20).join("\n") + "\n**困难档全部 20 题已完成。**\n");
console.log("wrote hard 1-20");
