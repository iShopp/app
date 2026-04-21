const features = [
  { name: 'Product Descriptions', requests: 1247, cost: 12.47, model: 'GPT-4o', icon: '📝', color: '#00f5ff' },
  { name: 'Dynamic Pricing', requests: 893, cost: 8.93, model: 'GPT-4o-mini', icon: '💲', color: '#ff00ff' },
  { name: 'Recommendations', requests: 2341, cost: 4.68, model: 'GPT-4o-mini', icon: '🎯', color: '#9d4edd' },
  { name: 'SEO Optimization', requests: 156, cost: 3.12, model: 'GPT-4o', icon: '🔍', color: '#39ff14' },
  { name: 'Builder Suggestions', requests: 43, cost: 1.29, model: 'GPT-4o', icon: '🔮', color: '#ff6900' },
];

const dailyCosts = [1.2, 3.4, 2.1, 4.8, 3.2, 5.1, 4.4, 3.7, 6.2, 5.8, 4.1, 7.3, 6.9, 5.4];
const maxCost = Math.max(...dailyCosts);

export default function AIUsagePage() {
  const totalCost = features.reduce((s, f) => s + f.cost, 0);
  const totalRequests = features.reduce((s, f) => s + f.requests, 0);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">AI Usage & Costs</h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="sm:col-span-2">
          <div className="p-6 rounded-xl border border-[rgba(0,245,255,0.15)] bg-gradient-to-br from-[rgba(0,245,255,0.05)] to-[rgba(157,78,221,0.05)]">
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">Total AI API Costs (Month)</p>
            <p className="text-4xl font-bold text-[#00f5ff]">${totalCost.toFixed(2)}</p>
            <p className="text-gray-400 text-sm mt-1">{totalRequests.toLocaleString()} requests this month</p>
          </div>
        </div>
        {[
          { label: 'Requests Today', value: '247', color: '#ff00ff' },
          { label: 'Avg Cost/Request', value: `$${(totalCost / totalRequests * 1000).toFixed(4)}`, color: '#9d4edd' },
        ].map((s) => (
          <div key={s.label} className="p-5 rounded-xl border border-[rgba(0,245,255,0.1)] bg-[#111118]">
            <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">{s.label}</p>
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Cost Trend */}
      <div className="p-6 rounded-xl border border-[rgba(0,245,255,0.15)] bg-[#111118]">
        <h2 className="text-lg font-semibold text-white mb-4">Daily Cost Trend (Last 14 days)</h2>
        <div className="flex items-end gap-1.5 h-24">
          {dailyCosts.map((cost, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full rounded-t-sm"
                style={{
                  height: `${(cost / maxCost) * 100}%`,
                  background: `linear-gradient(to top, #9d4edd, #00f5ff)`,
                  opacity: 0.6 + (cost / maxCost) * 0.4,
                }}
              />
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-500">
          <span>14 days ago</span>
          <span>Today</span>
        </div>
      </div>

      {/* Feature Breakdown */}
      <div className="p-6 rounded-xl border border-[rgba(0,245,255,0.15)] bg-[#111118]">
        <h2 className="text-lg font-semibold text-white mb-4">Usage Breakdown by Feature</h2>
        <div className="space-y-4">
          {features.map((f) => {
            const pct = (f.cost / totalCost) * 100;
            return (
              <div key={f.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{f.icon}</span>
                    <div>
                      <p className="text-white text-sm font-medium">{f.name}</p>
                      <p className="text-gray-500 text-xs">{f.requests.toLocaleString()} requests · {f.model}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold" style={{ color: f.color }}>${f.cost.toFixed(2)}</p>
                    <p className="text-gray-500 text-xs">{pct.toFixed(1)}%</p>
                  </div>
                </div>
                <div className="h-2 bg-[#0d0d15] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: f.color }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
