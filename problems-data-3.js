// 追加：困难档 131~150
window.PRACTICE_PROBLEMS.push(
  { id: "P131", level: "hard", title: "完全背包", point: "完全背包 DP 计数",
    hint: "求恰好装满背包的方案总数。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int main() {
    int n, V;
    cin >> n >> V;
    vector<int> w(n);
    for (auto& x : w) cin >> x;
    vector<long long> dp(V + 1);
    dp[0] = 1;
    for (int i = 0; i < n; i++)
        for (int j = w[i]; j <= V; j++)
            dp[j] += dp[j - w[i]];
    cout << dp[V] << "\\n";
    return 0;
}` },
  { id: "P132", level: "hard", title: "Dijkstra 堆优化", point: "堆优化最短路",
    hint: "无负权单源最短路。",
    code: `#include <iostream>
#include <vector>
#include <queue>
#include <cstring>
using namespace std;
const int N = 100010;
vector<pair<int, int>> e[N];
int dist[N];
bool vis[N];
int main() {
    int n, m, s;
    cin >> n >> m >> s;
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        e[u].push_back({v, w});
    }
    memset(dist, 0x3f, sizeof(dist));
    dist[s] = 0;
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    pq.push({0, s});
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (vis[u]) continue;
        vis[u] = true;
        for (auto [v, w] : e[u]) {
            if (dist[v] > dist[u] + w) {
                dist[v] = dist[u] + w;
                pq.push({dist[v], v});
            }
        }
    }
    for (int i = 1; i <= n; i++)
        cout << (dist[i] == 0x3f3f3f3f ? -1 : dist[i]) << (i < n ? ' ' : '\\n');
    return 0;
}` },
  { id: "P133", level: "hard", title: "Kruskal MST", point: "并查集 + kruskal",
    hint: "求无向图最小生成树。",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;
vector<int> fa;
int find(int x) { return fa[x] == x ? x : fa[x] = find(fa[x]); }
struct Edge { int u, v, w; };
int main() {
    int n, m;
    cin >> n >> m;
    vector<Edge> edges(m);
    for (auto& [u, v, w] : edges) cin >> u >> v >> w;
    sort(edges.begin(), edges.end(), [](auto& a, auto& b) { return a.w < b.w; });
    fa.resize(n + 1);
    for (int i = 1; i <= n; i++) fa[i] = i;
    long long sum = 0;
    int cnt = 0;
    for (auto& [u, v, w] : edges) {
        int fu = find(u), fv = find(v);
        if (fu != fv) {
            fa[fu] = fv;
            sum += w;
            cnt++;
        }
    }
    cout << (cnt == n - 1 ? sum : -1) << "\\n";
    return 0;
}` },
  { id: "P134", level: "hard", title: "Prim MST", point: "prim",
    hint: "最小生成树。",
    code: `#include <iostream>
#include <vector>
#include <queue>
#include <cstring>
using namespace std;
const int N = 5010;
vector<pair<int, int>> e[N];
int dist[N];
bool vis[N];
int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        e[u].push_back({v, w});
        e[v].push_back({u, w});
    }
    memset(dist, 0x3f, sizeof(dist));
    dist[1] = 0;
    priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> pq;
    pq.push({0, 1});
    long long sum = 0;
    int cnt = 0;
    while (!pq.empty()) {
        auto [d, u] = pq.top(); pq.pop();
        if (vis[u]) continue;
        vis[u] = true;
        sum += d;
        cnt++;
        for (auto [v, w] : e[u])
            if (!vis[v] && w < dist[v]) {
                dist[v] = w;
                pq.push({w, v});
            }
    }
    cout << (cnt == n ? sum : -1) << "\\n";
    return 0;
}` },
  { id: "P135", level: "hard", title: "拓扑排序", point: "图拓扑",
    hint: "判断有向图是否存在环，输出拓扑序列。",
    code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;
int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> e(n + 1);
    vector<int> indeg(n + 1);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        e[u].push_back(v);
        indeg[v]++;
    }
    queue<int> q;
    for (int i = 1; i <= n; i++)
        if (indeg[i] == 0) q.push(i);
    vector<int> ans;
    while (!q.empty()) {
        int u = q.front(); q.pop();
        ans.push_back(u);
        for (int v : e[u])
            if (--indeg[v] == 0) q.push(v);
    }
    if ((int)ans.size() != n) { cout << "has cycle\\n"; return 0; }
    for (size_t i = 0; i < ans.size(); i++)
        cout << ans[i] << (i + 1 < ans.size() ? ' ' : '\\n');
    return 0;
}` },
  { id: "P136", level: "hard", title: "KMP 匹配", point: "KMP，next 数组",
    hint: "实现模式串匹配，输出所有匹配位置。",
    code: `#include <iostream>
#include <vector>
#include <string>
using namespace std;
vector<int> getNext(const string& p) {
    int m = p.size();
    vector<int> nxt(m);
    for (int i = 1, j = 0; i < m; i++) {
        while (j > 0 && p[i] != p[j]) j = nxt[j - 1];
        if (p[i] == p[j]) j++;
        nxt[i] = j;
    }
    return nxt;
}
int main() {
    string s, p;
    cin >> s >> p;
    int n = s.size(), m = p.size();
    auto nxt = getNext(p);
    for (int i = 0, j = 0; i < n; i++) {
        while (j > 0 && s[i] != p[j]) j = nxt[j - 1];
        if (s[i] == p[j]) j++;
        if (j == m) {
            cout << i - m + 1 << "\\n";
            j = nxt[j - 1];
        }
    }
    return 0;
}` },
  { id: "P137", level: "hard", title: "线段树单点改区间和", point: "线段树基础",
    hint: "单点修改 + 区间求和。",
    code: `#include <iostream>
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
    int q;
    cin >> n >> q;
    tr.assign(4 * n + 10, 0);
    vector<long long> a(n + 1);
    for (int i = 1; i <= n; i++) { cin >> a[i]; update(i, a[i], 1, 1, n); }
    while (q--) {
        int op, x, y;
        cin >> op >> x >> y;
        if (op == 1) update(x, y, 1, 1, n);
        else cout << query(x, y, 1, 1, n) << "\\n";
    }
    return 0;
}` },
  { id: "P138", level: "hard", title: "线段树区间改区间和", point: "懒标记线段树",
    hint: "区间加 + 区间求和。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int n;
vector<long long> tr, lazy;
void push(int i, int l, int r) {
    if (lazy[i]) {
        int mid = (l + r) / 2;
        tr[i * 2] += lazy[i] * (mid - l + 1);
        lazy[i * 2] += lazy[i];
        tr[i * 2 + 1] += lazy[i] * (r - mid);
        lazy[i * 2 + 1] += lazy[i];
        lazy[i] = 0;
    }
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
    int q;
    cin >> n >> q;
    tr.assign(4 * n + 10, 0);
    lazy.assign(4 * n + 10, 0);
    for (int i = 1; i <= n; i++) {
        long long x;
        cin >> x;
        update(i, i, x, 1, 1, n);
    }
    while (q--) {
        int op, l, r;
        long long v;
        cin >> op >> l >> r;
        if (op == 1) { cin >> v; update(l, r, v, 1, 1, n); }
        else cout << query(l, r, 1, 1, n) << "\\n";
    }
    return 0;
}` },
  { id: "P139", level: "hard", title: "数位 DP 不含 4", point: "数位 DP",
    hint: "统计区间 [L,R] 不含数字 4 的数字个数。",
    code: `#include <iostream>
#include <string>
#include <cstring>
using namespace std;
string s;
long long dp[20][2];
long long dfs(int pos, bool limit, bool started) {
    if (pos == (int)s.size()) return started ? 1 : 0;
    if (!limit && dp[pos][started] != -1) return dp[pos][started];
    int up = limit ? s[pos] - '0' : 9;
    long long ans = 0;
    for (int d = 0; d <= up; d++) {
        if (d == 4) continue;
        ans += dfs(pos + 1, limit && d == up, started || d > 0);
    }
    if (!limit) dp[pos][started] = ans;
    return ans;
}
long long solve(long long n) {
    if (n < 0) return 0;
    s = to_string(n);
    memset(dp, -1, sizeof(dp));
    return dfs(0, true, false);
}
int main() {
    long long L, R;
    cin >> L >> R;
    cout << solve(R) - solve(L - 1) << "\\n";
    return 0;
}` },
  { id: "P140", level: "hard", title: "状压 TSP", point: "状态压缩 DP",
    hint: "小 n 集合状态压缩，旅行商 TSP 小规模。",
    code: `#include <iostream>
#include <vector>
#include <cstring>
using namespace std;
int n;
int dist[20][20];
long long dp[1 << 20][20];
int main() {
    cin >> n;
    for (int i = 0; i < n; i++)
        for (int j = 0; j < n; j++)
            cin >> dist[i][j];
    memset(dp, 0x3f, sizeof(dp));
    dp[1][0] = 0;
    for (int s = 1; s < (1 << n); s++)
        for (int u = 0; u < n; u++) {
            if (!(s >> u & 1) || dp[s][u] > 1e18) continue;
            for (int v = 0; v < n; v++) {
                if (s >> v & 1) continue;
                dp[s | (1 << v)][v] = min(dp[s | (1 << v)][v], dp[s][u] + dist[u][v]);
            }
        }
    long long ans = 1e18;
    for (int i = 1; i < n; i++)
        ans = min(ans, dp[(1 << n) - 1][i] + dist[i][0]);
    cout << ans << "\\n";
    return 0;
}` },
  { id: "P141", level: "hard", title: "Tarjan SCC", point: "Tarjan 算法",
    hint: "求有向图强连通分量。",
    code: `#include <iostream>
#include <vector>
#include <stack>
using namespace std;
int n, m, timer = 0, sccCnt = 0;
vector<vector<int>> e;
vector<int> dfn, low, belong, inStk;
stack<int> stk;
void tarjan(int u) {
    dfn[u] = low[u] = ++timer;
    stk.push(u);
    inStk[u] = 1;
    for (int v : e[u]) {
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
    cin >> n >> m;
    e.assign(n + 1, {});
    dfn.assign(n + 1, 0);
    low.assign(n + 1, 0);
    belong.assign(n + 1, 0);
    inStk.assign(n + 1, 0);
    for (int i = 0; i < m; i++) {
        int u, v;
        cin >> u >> v;
        e[u].push_back(v);
    }
    for (int i = 1; i <= n; i++)
        if (!dfn[i]) tarjan(i);
    cout << sccCnt << "\\n";
    for (int i = 1; i <= n; i++)
        cout << belong[i] << (i < n ? ' ' : '\\n');
    return 0;
}` },
  { id: "P142", level: "hard", title: "SPFA 负环", point: "SPFA",
    hint: "带负权边最短路，判断负环。",
    code: `#include <iostream>
#include <vector>
#include <queue>
#include <cstring>
using namespace std;
const int N = 100010;
vector<pair<int, int>> e[N];
int dist[N], cnt[N];
bool inq[N];
int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < m; i++) {
        int u, v, w;
        cin >> u >> v >> w;
        e[u].push_back({v, w});
    }
    memset(dist, 0x3f, sizeof(dist));
    dist[1] = 0;
    queue<int> q;
    q.push(1);
    inq[1] = true;
    bool neg = false;
    while (!q.empty() && !neg) {
        int u = q.front(); q.pop();
        inq[u] = false;
        for (auto [v, w] : e[u]) {
            if (dist[v] > dist[u] + w) {
                dist[v] = dist[u] + w;
                cnt[v] = cnt[u] + 1;
                if (cnt[v] >= n) { neg = true; break; }
                if (!inq[v]) { q.push(v); inq[v] = true; }
            }
        }
    }
    cout << (neg ? "negative cycle" : "no negative cycle") << "\\n";
    return 0;
}` },
  { id: "P143", level: "hard", title: "树的最大独立集", point: "树上 DP",
    hint: "树的最大独立集。",
    code: `#include <iostream>
#include <vector>
using namespace std;
int n;
vector<vector<int>> e;
vector<int> f0, f1;
void dfs(int u, int fa) {
    f0[u] = 0; f1[u] = 1;
    for (int v : e[u]) {
        if (v == fa) continue;
        dfs(v, u);
        f0[u] += max(f0[v], f1[v]);
        f1[u] += f0[v];
    }
}
int main() {
    cin >> n;
    e.assign(n + 1, {});
    f0.assign(n + 1, 0);
    f1.assign(n + 1, 0);
    for (int i = 0; i < n - 1; i++) {
        int u, v;
        cin >> u >> v;
        e[u].push_back(v);
        e[v].push_back(u);
    }
    dfs(1, 0);
    cout << max(f0[1], f1[1]) << "\\n";
    return 0;
}` },
  { id: "P144", level: "hard", title: "LCA 倍增", point: "倍增预处理 LCA",
    hint: "树的最近公共祖先。",
    code: `#include <iostream>
#include <vector>
#include <cstring>
using namespace std;
const int N = 500010, LOG = 20;
vector<int> e[N];
int fa[N][LOG], dep[N];
void dfs(int u, int f) {
    fa[u][0] = f;
    dep[u] = dep[f] + 1;
    for (int i = 1; i < LOG; i++)
        fa[u][i] = fa[fa[u][i - 1]][i - 1];
    for (int v : e[u])
        if (v != f) dfs(v, u);
}
int lca(int u, int v) {
    if (dep[u] < dep[v]) swap(u, v);
    int diff = dep[u] - dep[v];
    for (int i = 0; i < LOG; i++)
        if (diff >> i & 1) u = fa[u][i];
    if (u == v) return u;
    for (int i = LOG - 1; i >= 0; i--)
        if (fa[u][i] != fa[v][i]) {
            u = fa[u][i];
            v = fa[v][i];
        }
    return fa[u][0];
}
int main() {
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
        cout << lca(u, v) << "\\n";
    }
    return 0;
}` },
  { id: "P145", level: "hard", title: "离散化+二维差分", point: "离散化 + 差分",
    hint: "大范围坐标压缩，二维差分求矩形覆盖点数。",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <map>
using namespace std;
int main() {
    int n, q;
    cin >> n >> q;
    vector<array<int, 4>> rects(n);
    vector<int> xs, ys;
    for (auto& [x1, y1, x2, y2] : rects) {
        cin >> x1 >> y1 >> x2 >> y2;
        xs.push_back(x1); xs.push_back(x2 + 1);
        ys.push_back(y1); ys.push_back(y2 + 1);
    }
    sort(xs.begin(), xs.end());
    xs.erase(unique(xs.begin(), xs.end()), xs.end());
    sort(ys.begin(), ys.end());
    ys.erase(unique(ys.begin(), ys.end()), ys.end());
    int W = xs.size(), H = ys.size();
    vector<vector<int>> d(W + 1, vector<int>(H + 1));
    auto getX = [&](int x) { return lower_bound(xs.begin(), xs.end(), x) - xs.begin(); };
    auto getY = [&](int y) { return lower_bound(ys.begin(), ys.end(), y) - ys.begin(); };
    for (auto& [x1, y1, x2, y2] : rects) {
        int a = getX(x1), b = getX(x2 + 1);
        int c = getY(y1), dd = getY(y2 + 1);
        d[a][c]++;
        d[a][dd]--;
        d[b][c]--;
        d[b][dd]++;
    }
    for (int i = 0; i < W; i++)
        for (int j = 0; j < H; j++) {
            if (i) d[i][j] += d[i - 1][j];
            if (j) d[i][j] += d[i][j - 1];
            if (i && j) d[i][j] -= d[i - 1][j - 1];
        }
    while (q--) {
        int x, y;
        cin >> x >> y;
        int i = upper_bound(xs.begin(), xs.end(), x) - xs.begin() - 1;
        int j = upper_bound(ys.begin(), ys.end(), y) - ys.begin() - 1;
        cout << (i >= 0 && j >= 0 ? d[i][j] : 0) << "\\n";
    }
    return 0;
}` },
  { id: "P146", level: "hard", title: "AC 自动机", point: "AC 自动机",
    hint: "多模式串匹配。",
    code: `#include <iostream>
#include <vector>
#include <queue>
#include <string>
using namespace std;
struct Node { int next[26] = {}, fail = 0, cnt = 0; };
vector<Node> tr(1);
void insert(const string& s) {
    int u = 0;
    for (char c : s) {
        int v = c - 'a';
        if (!tr[u].next[v]) {
            tr[u].next[v] = tr.size();
            tr.emplace_back();
        }
        u = tr[u].next[v];
    }
    tr[u].cnt++;
}
void build() {
    queue<int> q;
    for (int i = 0; i < 26; i++)
        if (tr[0].next[i]) q.push(tr[0].next[i]);
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
    for (char c : s) {
        u = tr[u].next[c - 'a'];
        for (int v = u; v && tr[v].cnt != -1; v = tr[v].fail) {
            ans += tr[v].cnt;
            tr[v].cnt = -1;
        }
    }
    return ans;
}
int main() {
    int n;
    cin >> n;
    string s;
    for (int i = 0; i < n; i++) { cin >> s; insert(s); }
    build();
    cin >> s;
    cout << query(s) << "\\n";
    return 0;
}` },
  { id: "P147", level: "hard", title: "二分图判定", point: "图染色",
    hint: "染色法判断二分图。",
    code: `#include <iostream>
#include <vector>
#include <queue>
using namespace std;
int main() {
    int n, m;
    cin >> n >> m;
    vector<vector<int>> e(n + 1);
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
            for (int v : e[u]) {
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
    cout << (ok ? "yes" : "no") << "\\n";
    return 0;
}` },
  { id: "P148", level: "hard", title: "匈牙利算法", point: "匈牙利",
    hint: "二分图最大匹配。",
    code: `#include <iostream>
#include <vector>
#include <cstring>
using namespace std;
int n, m, k;
vector<int> e[510];
int match[510];
bool vis[510];
bool dfs(int u) {
    for (int v : e[u]) {
        if (vis[v]) continue;
        vis[v] = true;
        if (!match[v] || dfs(match[v])) {
            match[v] = u;
            return true;
        }
    }
    return false;
}
int main() {
    cin >> n >> m >> k;
    for (int i = 0; i < k; i++) {
        int u, v;
        cin >> u >> v;
        e[u].push_back(v);
    }
    int ans = 0;
    for (int i = 1; i <= n; i++) {
        memset(vis, 0, sizeof(vis));
        if (dfs(i)) ans++;
    }
    cout << ans << "\\n";
    return 0;
}` },
  { id: "P149", level: "hard", title: "莫队算法", point: "莫队",
    hint: "区间查询离线处理。",
    code: `#include <iostream>
#include <vector>
#include <algorithm>
#include <cmath>
using namespace std;
struct Query { int l, r, i; };
int main() {
    int n, q;
    cin >> n >> q;
    vector<int> a(n);
    for (auto& x : a) cin >> x;
    vector<Query> qs(q);
    for (int i = 0; i < q; i++) {
        cin >> qs[i].l >> qs[i].r;
        qs[i].i = i;
        qs[i].l--; qs[i].r--;
    }
    int block = sqrt(n);
    sort(qs.begin(), qs.end(), [&](auto& x, auto& y) {
        if (x.l / block != y.l / block) return x.l / block < y.l / block;
        return (x.l / block & 1) ? x.r > y.r : x.r < y.r;
    });
    vector<long long> ans(q);
    vector<int> cnt(n + 1);
    long long cur = 0;
    int l = 0, r = -1;
    auto add = [&](int p) { cur += 2LL * cnt[a[p]] + 1; cnt[a[p]]++; };
    auto del = [&](int p) { cnt[a[p]]--; cur -= 2LL * cnt[a[p]] + 1; };
    for (auto& [ql, qr, i] : qs) {
        while (l > ql) add(--l);
        while (r < qr) add(++r);
        while (l < ql) del(l++);
        while (r > qr) del(r--);
        ans[i] = cur;
    }
    for (long long x : ans) cout << x << "\\n";
    return 0;
}` },
  { id: "P150", level: "hard", title: "后缀数组", point: "后缀数组基础",
    hint: "字符串后缀排序。",
    code: `#include <iostream>
#include <vector>
#include <string>
#include <algorithm>
using namespace std;
int main() {
    string s;
    cin >> s;
    int n = s.size();
    vector<int> sa(n), rnk(n), tmp(n);
    for (int i = 0; i < n; i++) {
        sa[i] = i;
        rnk[i] = s[i];
    }
    for (int k = 1; ; k <<= 1) {
        auto cmp = [&](int i, int j) {
            if (rnk[i] != rnk[j]) return rnk[i] < rnk[j];
            int ri = i + k < n ? rnk[i + k] : -1;
            int rj = j + k < n ? rnk[j + k] : -1;
            return ri < rj;
        };
        sort(sa.begin(), sa.end(), cmp);
        tmp[sa[0]] = 0;
        for (int i = 1; i < n; i++)
            tmp[sa[i]] = tmp[sa[i - 1]] + cmp(sa[i - 1], sa[i]);
        rnk = tmp;
        if (rnk[sa[n - 1]] == n - 1) break;
    }
    for (int i = 0; i < n; i++)
        cout << sa[i] << (i + 1 < n ? ' ' : '\\n');
    return 0;
}` }
);
