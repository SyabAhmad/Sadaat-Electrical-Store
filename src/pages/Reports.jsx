import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchProductStats } from "../lib/api";
import AdminHeader from "../components/AdminHeader";

const ROWS = [
  { key: "pageViews", label: "Page Views" },
  { key: "productViews", label: "Product Views" },
  { key: "addToCart", label: "Add to Cart" },
  { key: "checkouts", label: "Checkouts" },
];

function formatNum(n) { return n.toLocaleString(); }

function csvEscape(val) {
  const s = String(val);
  return s.includes(',') || s.includes('"') || s.includes('\n') ? `"${s.replace(/"/g, '""')}"` : s;
}

function downloadCSV(filename, rows) {
  const csv = rows.map(r => r.join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  a.click();
  URL.revokeObjectURL(a.href);
}

export default function Reports() {
  const [currentData, setCurrentData] = useState({});
  const [prevData, setPrevData] = useState({});
  const [productStats, setProductStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [days, setDays] = useState(30);
  const navigate = useNavigate();

  useEffect(() => { fetchAll(days); }, [days]);

  const fetchAll = async (d) => {
    setLoading(true);
    try {
      const [curr, prev] = await Promise.all([
        fetchProductStats(d),
        fetchProductStats(d * 2).then(r => {
          const currDays = Object.keys(r.daily || {}).sort();
          const cutoff = currDays.length > 0 ? new Date(Date.now() - d * 86400000).toISOString().split('T')[0] : '';
          const prevDaily = {};
          Object.entries(r.daily || {}).forEach(([date, vals]) => {
            if (cutoff && date < cutoff) prevDaily[date] = vals;
          });
          return { daily: prevDaily, productStats: {} };
        }),
      ]);
      setCurrentData(curr?.daily || {});
      setPrevData(prev?.daily || {});
      setProductStats(curr?.productStats || {});
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const totals = useMemo(() => {
    const sum = (data) => {
      const days = Object.values(data);
      return {
        pageViews: days.reduce((s, d) => s + (d.pageViews || 0), 0),
        productViews: days.reduce((s, d) => s + (d.productViews || 0), 0),
        addToCart: days.reduce((s, d) => s + (d.addToCart || 0), 0),
        checkouts: days.reduce((s, d) => s + (d.checkouts || 0), 0),
      };
    };
    return { current: sum(currentData), previous: sum(prevData) };
  }, [currentData, prevData]);

  const pctChange = (curr, prev) => {
    if (prev === 0) return curr > 0 ? 100 : 0;
    return ((curr - prev) / prev * 100);
  };

  const topProducts = useMemo(() => {
    return Object.entries(productStats)
      .map(([id, s]) => ({ id, ...s }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 20);
  }, [productStats]);

  const handleExport = () => {
    const rows = [
      ['Metric', 'Current Period', 'Previous Period', 'Change %'],
      ...ROWS.map(r => [r.label, totals.current[r.key], totals.previous[r.key], pctChange(totals.current[r.key], totals.previous[r.key]).toFixed(1) + '%']),
      [],
      ['Top Products'],
      ['Product', 'Views', 'Cart Adds', 'Rate %'],
      ...topProducts.map(p => [p.productName || p.id.slice(-6), p.views, p.cartAdds, p.views > 0 ? ((p.cartAdds / p.views) * 100).toFixed(1) : '0.0']),
    ];
    downloadCSV(`sadaat-report-${days}d-${new Date().toISOString().split('T')[0]}.csv`, rows);
  };

  const handleExportDaily = () => {
    const days = Object.keys(currentData).sort();
    const rows = [
      ['Date', 'Page Views', 'Product Views', 'Add to Cart', 'Checkouts', 'Total'],
      ...days.map(d => {
        const day = currentData[d] || {};
        const total = (day.pageViews || 0) + (day.productViews || 0) + (day.addToCart || 0) + (day.checkouts || 0);
        return [d, day.pageViews || 0, day.productViews || 0, day.addToCart || 0, day.checkouts || 0, total];
      }),
    ];
    downloadCSV(`sadaat-daily-${days}d-${new Date().toISOString().split('T')[0]}.csv`, rows);
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#f8fafc'}}>
      <AdminHeader userEmail="" />

      {/* Controls */}
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4 flex flex-wrap items-center gap-3">
        <div className="flex bg-white border rounded-lg" style={{borderColor: '#e5e7eb'}}>
          {[7, 30, 90].map(d => (
            <button key={d} onClick={() => setDays(d)}
              className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all rounded-lg ${
                days === d ? "text-white" : ""
              }`}
              style={days === d ? {backgroundColor: '#0066B3', color: '#ffffff'} : {color: '#6b7280'}}>
              {d}D
            </button>
          ))}
        </div>
        <button onClick={handleExport} disabled={loading}
          className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all hover:scale-[1.02] disabled:opacity-50 flex items-center gap-2 text-white"
          style={{backgroundColor: '#0066B3'}}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export
        </button>
      </div>

      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-3 rounded-full animate-spin" style={{borderColor: '#e5e7eb', borderTopColor: '#0066B3'}} />
          </div>
        ) : (
          <>
            {/* Comparison Table */}
            <div className="rounded-xl overflow-hidden mb-8" style={{backgroundColor: '#ffffff', border: '1px solid #e5e7eb'}}>
              <div className="p-5 flex justify-between items-center" style={{borderBottom: '1px solid #e5e7eb'}}>
                <h3 className="text-sm font-semibold" style={{color: '#0A0A0A'}}>Performance Overview</h3>
                <span className="text-xs" style={{color: '#6b7280'}}>Current vs Previous {days} days</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr style={{borderBottom: '1px solid #e5e7eb', backgroundColor: '#f8fafc'}}>
                      <th className="text-left p-4 text-xs font-semibold" style={{color: '#6b7280'}}>Metric</th>
                      <th className="text-right p-4 text-xs font-semibold" style={{color: '#6b7280'}}>Current</th>
                      <th className="text-right p-4 text-xs font-semibold" style={{color: '#6b7280'}}>Previous</th>
                      <th className="text-right p-4 text-xs font-semibold" style={{color: '#6b7280'}}>Change</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROWS.map(r => {
                      const curr = totals.current[r.key];
                      const prev = totals.previous[r.key];
                      const change = pctChange(curr, prev);
                      return (
                        <tr key={r.key} style={{borderBottom: '1px solid #f3f4f6'}}>
                          <td className="p-4 font-medium" style={{color: '#0A0A0A'}}>{r.label}</td>
                          <td className="p-4 text-right">{formatNum(curr)}</td>
                          <td className="p-4 text-right" style={{color: '#9ca3af'}}>{formatNum(prev)}</td>
                          <td className="p-4 text-right">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              change > 0 ? 'bg-green-50 text-green-700' : change < 0 ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'
                            }`}>
                              {change > 0 ? '+' : ''}{change.toFixed(1)}%
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Top Products */}
            <div className="rounded-xl overflow-hidden mb-8" style={{backgroundColor: '#ffffff', border: '1px solid #e5e7eb'}}>
              <div className="p-5" style={{borderBottom: '1px solid #e5e7eb'}}>
                <h3 className="text-sm font-semibold" style={{color: '#0A0A0A'}}>Top Products</h3>
              </div>
              {topProducts.length === 0 ? (
                <div className="p-8 text-center text-sm" style={{color: '#9ca3af'}}>No data</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{borderBottom: '1px solid #e5e7eb', backgroundColor: '#f8fafc'}}>
                        <th className="text-left p-4 text-xs font-semibold" style={{color: '#6b7280'}}>#</th>
                        <th className="text-left p-4 text-xs font-semibold" style={{color: '#6b7280'}}>Product</th>
                        <th className="text-right p-4 text-xs font-semibold" style={{color: '#6b7280'}}>Views</th>
                        <th className="text-right p-4 text-xs font-semibold" style={{color: '#6b7280'}}>Cart</th>
                        <th className="text-right p-4 text-xs font-semibold" style={{color: '#6b7280'}}>Rate</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topProducts.map((p, i) => (
                        <tr key={p.id} style={{borderBottom: '1px solid #f3f4f6'}}>
                          <td className="p-4" style={{color: '#9ca3af'}}>{i + 1}</td>
                          <td className="p-4 font-medium truncate max-w-[200px]" style={{color: '#0A0A0A'}}>{p.productName || `Product ${p.id.slice(-6)}`}</td>
                          <td className="p-4 text-right">{formatNum(p.views)}</td>
                          <td className="p-4 text-right">{formatNum(p.cartAdds)}</td>
                          <td className="p-4 text-right" style={{color: '#6b7280'}}>{p.views > 0 ? ((p.cartAdds / p.views) * 100).toFixed(1) : '0.0'}%</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Daily Breakdown */}
            <div className="rounded-xl overflow-hidden" style={{backgroundColor: '#ffffff', border: '1px solid #e5e7eb'}}>
              <div className="p-5 flex justify-between items-center" style={{borderBottom: '1px solid #e5e7eb'}}>
                <h3 className="text-sm font-semibold" style={{color: '#0A0A0A'}}>Daily Breakdown</h3>
                <button onClick={handleExportDaily} className="text-xs font-medium flex items-center gap-1 transition-colors hover:underline" style={{color: '#0066B3'}}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Export CSV
                </button>
              </div>
              <div className="overflow-x-auto max-h-96 overflow-y-auto">
                <table className="w-full text-sm">
                  <thead className="sticky top-0" style={{backgroundColor: '#f8fafc'}}>
                    <tr style={{borderBottom: '1px solid #e5e7eb'}}>
                      <th className="text-left p-3 text-xs font-semibold" style={{color: '#6b7280'}}>Date</th>
                      <th className="text-right p-3 text-xs font-semibold" style={{color: '#6b7280'}}>Views</th>
                      <th className="text-right p-3 text-xs font-semibold" style={{color: '#6b7280'}}>Prod</th>
                      <th className="text-right p-3 text-xs font-semibold" style={{color: '#6b7280'}}>Cart</th>
                      <th className="text-right p-3 text-xs font-semibold" style={{color: '#6b7280'}}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(currentData).sort(([a], [b]) => a.localeCompare(b)).map(([date, day]) => {
                      const total = (day.pageViews || 0) + (day.productViews || 0) + (day.addToCart || 0) + (day.checkouts || 0);
                      return (
                        <tr key={date} style={{borderBottom: '1px solid #f3f4f6'}}>
                          <td className="p-3" style={{color: '#6b7280'}}>{new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                          <td className="p-3 text-right">{day.pageViews || 0}</td>
                          <td className="p-3 text-right">{day.productViews || 0}</td>
                          <td className="p-3 text-right">{day.addToCart || 0}</td>
                          <td className="p-3 text-right font-semibold" style={{color: '#0066B3'}}>{total}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
