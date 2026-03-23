import { useState } from "react";
import { ChevronDown } from "lucide-react";

const rawData = [
  { month: "Jan", current: 2000, previous: 1500 },
  { month: "Feb", current: 2000, previous: 1800 },
  { month: "Mar", current: 2000, previous: 2200 },
  { month: "Apr", current: 1000, previous: 1600 },
  { month: "May", current: 2000, previous: 1900 },
  { month: "Jun", current: 2000, previous: 2100 },
  { month: "Jul", current: 3000, previous: 2400 },
  { month: "Aug", current: 2000, previous: 1700 },
  { month: "Sep", current: 2000, previous: 2300 },
  { month: "Oct", current: 2000, previous: 1900 },
  { month: "Nov", current: 2000, previous: 2100 },
];

const W = 680;
const H = 170;
const PAD_L = 40;
const PAD_R = 10;
const PAD_T = 16;
const PAD_B = 28;
const MIN = 0;
const MAX = 3500;

function getX(i: number) {
  return PAD_L + (i / (rawData.length - 1)) * (W - PAD_L - PAD_R);
}

function getY(v: number) {
  return PAD_T + (1 - (v - MIN) / (MAX - MIN)) * (H - PAD_T - PAD_B);
}

function toPoints(key: "current" | "previous") {
  return rawData.map((d, i) => `${getX(i)},${getY(d[key])}`).join(" ");
}

function formatY(v: number) {
  if (v >= 1000) return `${v / 1000}K`;
  return `${v}`;
}

const yTicks = [0, 1000, 2000, 3000];

export function MonthlyVisitChart() {
  const [tooltip, setTooltip] = useState<{ idx: number } | null>(null);

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">Lượt Truy Cập Hàng Tháng</h3>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
            Monthly
            <ChevronDown className="w-3 h-3" />
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-orange-200 rounded-lg text-orange-600 bg-orange-50">
            <div className="w-2 h-2 rounded-full bg-orange-400" />
            Monthly
            <ChevronDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          style={{ height: 175 }}
          onMouseLeave={() => setTooltip(null)}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const relX = ((e.clientX - rect.left) / rect.width) * W;
            const idx = Math.round(((relX - PAD_L) / (W - PAD_L - PAD_R)) * (rawData.length - 1));
            if (idx >= 0 && idx < rawData.length) setTooltip({ idx });
          }}
        >
          {/* Y grid */}
          {yTicks.map((tick) => {
            const y = getY(tick);
            return (
              <g key={`yt-${tick}`}>
                <line x1={PAD_L} y1={y} x2={W - PAD_R} y2={y} stroke="#f0f0f0" strokeWidth={1} />
                <text x={PAD_L - 4} y={y + 4} textAnchor="end" fontSize={9} fill="#9ca3af">
                  {formatY(tick)}
                </text>
              </g>
            );
          })}

          {/* X labels */}
          {rawData.map((d, i) => (
            <text key={`xl-${d.month}`} x={getX(i)} y={H - 6} textAnchor="middle" fontSize={9} fill="#9ca3af">
              {d.month}
            </text>
          ))}

          {/* Previous line (dashed) */}
          <polyline
            points={toPoints("previous")}
            fill="none"
            stroke="#f97316"
            strokeWidth={2}
            strokeDasharray="5 4"
            strokeLinejoin="round"
          />

          {/* Current line */}
          <polyline
            points={toPoints("current")}
            fill="none"
            stroke="#22c55e"
            strokeWidth={2.5}
            strokeLinejoin="round"
          />

          {/* Dots for current */}
          {rawData.map((d, i) => (
            <circle
              key={`dot-${d.month}`}
              cx={getX(i)}
              cy={getY(d.current)}
              r={3}
              fill="#22c55e"
              stroke="white"
              strokeWidth={1}
            />
          ))}

          {/* Hover line */}
          {tooltip && (
            <line
              x1={getX(tooltip.idx)}
              y1={PAD_T}
              x2={getX(tooltip.idx)}
              y2={H - PAD_B}
              stroke="#d1d5db"
              strokeWidth={1}
              strokeDasharray="3 3"
            />
          )}
        </svg>

        {/* Tooltip */}
        {tooltip && (() => {
          const d = rawData[tooltip.idx];
          const xPct = (tooltip.idx / (rawData.length - 1)) * 100;
          return (
            <div
              className="absolute pointer-events-none bg-white rounded-lg shadow-lg border border-gray-100 p-3 z-10 text-xs"
              style={{ left: `${Math.min(xPct, 80)}%`, top: 10, transform: "translateX(-50%)" }}
            >
              <p className="font-semibold text-gray-600 mb-1">{d.month}</p>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-gray-500">Hiện tại:</span>
                <span className="font-semibold">{formatY(d.current)}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-orange-400" />
                <span className="text-gray-500">Trước đó:</span>
                <span className="font-semibold">{formatY(d.previous)}</span>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-2">
        <div className="flex items-center gap-1.5">
          <div className="w-5 h-0.5 bg-green-500" />
          <span className="text-xs text-gray-500">Hiện tại</span>
        </div>
        <div className="flex items-center gap-1.5">
          <svg width="20" height="2" className="overflow-visible">
            <line x1="0" y1="1" x2="20" y2="1" stroke="#f97316" strokeWidth="2" strokeDasharray="5 3" />
          </svg>
          <span className="text-xs text-gray-500">Trước đó</span>
        </div>
      </div>
    </div>
  );
}
