import { useState, useMemo } from "react";
import { Filter, ChevronDown } from "lucide-react";

const rawData = [
  { month: "T1", luotXem: 1200, luotTruyCap: 800, chuNhaMoi: 200 },
  { month: "T2", luotXem: 2100, luotTruyCap: 1400, chuNhaMoi: 350 },
  { month: "T3", luotXem: 1800, luotTruyCap: 1800, chuNhaMoi: 500 },
  { month: "T4", luotXem: 3200, luotTruyCap: 2600, chuNhaMoi: 700 },
  { month: "T5", luotXem: 5800, luotTruyCap: 4200, chuNhaMoi: 900 },
  { month: "T6", luotXem: 7200, luotTruyCap: 5600, chuNhaMoi: 1100 },
  { month: "T7", luotXem: 8500, luotTruyCap: 7200, chuNhaMoi: 1400 },
  { month: "T8", luotXem: 6800, luotTruyCap: 6000, chuNhaMoi: 1200 },
  { month: "T9", luotXem: 7500, luotTruyCap: 5800, chuNhaMoi: 1350 },
  { month: "T10", luotXem: 8200, luotTruyCap: 6400, chuNhaMoi: 1600 },
  { month: "T11", luotXem: 9500, luotTruyCap: 7800, chuNhaMoi: 1900 },
  { month: "T12", luotXem: 10200, luotTruyCap: 8500, chuNhaMoi: 2100 },
];

const W = 680;
const H = 200;
const PAD_L = 40;
const PAD_R = 10;
const PAD_T = 10;
const PAD_B = 30;

function toPoints(data: number[], min: number, max: number): string {
  const n = data.length;
  const range = max - min || 1;
  return data
    .map((v, i) => {
      const x = PAD_L + (i / (n - 1)) * (W - PAD_L - PAD_R);
      const y = PAD_T + (1 - (v - min) / range) * (H - PAD_T - PAD_B);
      return `${x},${y}`;
    })
    .join(" ");
}

function toAreaPath(data: number[], min: number, max: number): string {
  const n = data.length;
  const range = max - min || 1;
  const pts = data.map((v, i) => {
    const x = PAD_L + (i / (n - 1)) * (W - PAD_L - PAD_R);
    const y = PAD_T + (1 - (v - min) / range) * (H - PAD_T - PAD_B);
    return `${x},${y}`;
  });
  const base = H - PAD_B;
  const startX = PAD_L;
  const endX = PAD_L + (W - PAD_L - PAD_R);
  return `M${startX},${base} L${pts.join(" L")} L${endX},${base} Z`;
}

function formatY(v: number) {
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
  return `${v}`;
}

export function TrendChart() {
  const [activeFilters, setActiveFilters] = useState({
    luotTruyCap: true,
    chuNhaMoi: true,
  });
  const [tooltip, setTooltip] = useState<{ x: number; y: number; idx: number } | null>(null);

  const allValues = useMemo(() => {
    const vals = rawData.flatMap((d) => [d.luotXem, d.luotTruyCap, d.chuNhaMoi]);
    return { min: 0, max: Math.max(...vals) };
  }, []);

  const { min, max } = allValues;

  const xem = rawData.map((d) => d.luotXem);
  const truy = rawData.map((d) => d.luotTruyCap);
  const chu = rawData.map((d) => d.chuNhaMoi);

  const yTicks = [0, 3000, 6000, 9000, max];

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Biểu Đồ Xu Hướng Hoạt Động</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            <Filter className="w-3.5 h-3.5" />
            Filters
            <ChevronDown className="w-3 h-3" />
          </button>
          <button
            onClick={() => setActiveFilters((f) => ({ ...f, luotTruyCap: !f.luotTruyCap }))}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
              activeFilters.luotTruyCap
                ? "bg-teal-50 border-teal-200 text-teal-600"
                : "border-gray-200 text-gray-500"
            }`}
          >
            Lượt Truy Cập
          </button>
          <button
            onClick={() => setActiveFilters((f) => ({ ...f, chuNhaMoi: !f.chuNhaMoi }))}
            className={`px-3 py-1.5 text-xs rounded-lg border transition-colors ${
              activeFilters.chuNhaMoi
                ? "bg-blue-50 border-blue-200 text-blue-600"
                : "border-gray-200 text-gray-500"
            }`}
          >
            Chủ Nhà Mới
          </button>
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ height: 220 }}
          onMouseLeave={() => setTooltip(null)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = ((e.clientX - rect.left) / rect.width) * W;
            const chartW = W - PAD_L - PAD_R;
            const idx = Math.round(((relX - PAD_L) / chartW) * (rawData.length - 1));
            if (idx >= 0 && idx < rawData.length) {
              setTooltip({ x: relX, y: e.clientY - rect.top, idx });
            }
          }}
        >
          {/* Y grid lines */}
          {yTicks.map((tick) => {
            const y = PAD_T + (1 - (tick - min) / (max - min)) * (H - PAD_T - PAD_B);
            return (
              <g key={`ytick-${tick}`}>
                <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y} stroke="#f0f0f0" strokeWidth={1} />
                <text x={PAD_L - 4} y={y + 4} textAnchor="end" fontSize={9} fill="#9ca3af">
                  {formatY(tick)}
                </text>
              </g>
            );
          })}

          {/* X labels */}
          {rawData.map((d, i) => {
            const x = PAD_L + (i / (rawData.length - 1)) * (W - PAD_L - PAD_R);
            return (
              <text key={`xlabel-${d.month}`} x={x} y={H - 8} textAnchor="middle" fontSize={9} fill="#9ca3af">
                {d.month}
              </text>
            );
          })}

          {/* Area fills */}
          <path d={toAreaPath(xem, min, max)} fill="#22c55e" fillOpacity={0.08} />
          {activeFilters.luotTruyCap && (
            <path d={toAreaPath(truy, min, max)} fill="#f97316" fillOpacity={0.08} />
          )}
          {activeFilters.chuNhaMoi && (
            <path d={toAreaPath(chu, min, max)} fill="#6366f1" fillOpacity={0.08} />
          )}

          {/* Lines */}
          <polyline points={toPoints(xem, min, max)} fill="none" stroke="#22c55e" strokeWidth={2} strokeLinejoin="round" />
          {activeFilters.luotTruyCap && (
            <polyline points={toPoints(truy, min, max)} fill="none" stroke="#f97316" strokeWidth={2} strokeLinejoin="round" />
          )}
          {activeFilters.chuNhaMoi && (
            <polyline points={toPoints(chu, min, max)} fill="none" stroke="#6366f1" strokeWidth={2} strokeLinejoin="round" />
          )}

          {/* Hover line */}
          {tooltip && (() => {
            const x = PAD_L + (tooltip.idx / (rawData.length - 1)) * (W - PAD_L - PAD_R);
            return <line x1={x} y1={PAD_T} x2={x} y2={H - PAD_B} stroke="#d1d5db" strokeWidth={1} strokeDasharray="3 3" />;
          })()}
        </svg>

        {/* Tooltip */}
        {tooltip && (() => {
          const d = rawData[tooltip.idx];
          const xPct = (tooltip.idx / (rawData.length - 1)) * 100;
          return (
            <div
              className="absolute pointer-events-none bg-white rounded-lg shadow-lg border border-gray-100 p-3 z-10 text-xs"
              style={{
                left: `${Math.min(xPct, 75)}%`,
                top: 10,
                transform: "translateX(-50%)",
              }}
            >
              <p className="font-semibold text-gray-600 mb-1">{d.month}</p>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-gray-500">Lượt Xem:</span>
                <span className="font-semibold">{formatY(d.luotXem)}</span>
              </div>
              {activeFilters.luotTruyCap && (
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-teal-500" />
                  <span className="text-gray-500">Truy Cập:</span>
                  <span className="font-semibold">{formatY(d.luotTruyCap)}</span>
                </div>
              )}
              {activeFilters.chuNhaMoi && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="text-gray-500">Chủ Nhà:</span>
                  <span className="font-semibold">{formatY(d.chuNhaMoi)}</span>
                </div>
              )}
            </div>
          );
        })()}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-green-500" />
          <span className="text-xs text-gray-500">Lượt Xem</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-teal-500" />
          <span className="text-xs text-gray-500">Lượt Truy Cập</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-indigo-500" />
          <span className="text-xs text-gray-500">Chủ Nhà Mới</span>
        </div>
      </div>
    </div>
  );
}
