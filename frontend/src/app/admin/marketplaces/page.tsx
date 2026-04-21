import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

const marketplaces = [
  { name: 'Temu', id: 'temu', icon: '🛒', color: '#ff6900', connected: true, products: 3241, lastSync: '5 min ago', status: 'connected' },
  { name: 'AliExpress', id: 'aliexpress', icon: '🔴', color: '#ff4747', connected: true, products: 2867, lastSync: '12 min ago', status: 'connected' },
  { name: 'Amazon', id: 'amazon', icon: '📦', color: '#ff9900', connected: true, products: 1942, lastSync: '1 hour ago', status: 'connected' },
  { name: 'eBay', id: 'ebay', icon: '🔵', color: '#0064d2', connected: false, products: 0, lastSync: 'Never', status: 'disconnected' },
];

export default function MarketplacesPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Marketplace Integrations</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-5">
        {marketplaces.map((mp) => (
          <Card key={mp.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-3xl border"
                  style={{ borderColor: `${mp.color}33`, background: `${mp.color}11` }}
                >
                  {mp.icon}
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg">{mp.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${mp.connected ? 'text-green-400 bg-green-400/10' : 'text-gray-400 bg-gray-400/10'}`}>
                    {mp.connected ? '● Connected' : '○ Disconnected'}
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[#0d0d15] rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Products</p>
                <p className="text-[#00f5ff] font-bold text-lg">{mp.products.toLocaleString()}</p>
              </div>
              <div className="bg-[#0d0d15] rounded-lg p-3">
                <p className="text-gray-400 text-xs mb-1">Last Sync</p>
                <p className="text-white font-medium text-sm">{mp.lastSync}</p>
              </div>
            </div>

            <div className="flex gap-2">
              {mp.connected ? (
                <>
                  <Button size="sm" className="flex-1">Sync Now</Button>
                  <a href={`/admin/marketplaces/${mp.id}`}>
                    <Button size="sm" variant="outline">Configure</Button>
                  </a>
                </>
              ) : (
                <a href={`/admin/marketplaces/${mp.id}`} className="flex-1">
                  <Button className="w-full">Connect</Button>
                </a>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <h2 className="text-lg font-semibold text-white mb-3">Sync Summary</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-[#00f5ff]">3</p>
            <p className="text-gray-400 text-sm">Connected</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#ff00ff]">8,050</p>
            <p className="text-gray-400 text-sm">Total Products</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#39ff14]">98.2%</p>
            <p className="text-gray-400 text-sm">Sync Success</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-[#9d4edd]">4</p>
            <p className="text-gray-400 text-sm">Auto Rules</p>
          </div>
        </div>
      </Card>
    </div>
  );
}
