import { useState } from "react";
import { Search, Calendar, ChevronDown, Sun, TrendingUp } from "lucide-react";
import { StatCard } from "./StatCard";
import { TrendChart } from "./TrendChart";
import { MonthlyVisitChart } from "./MonthlyVisitChart";

const trendData1 = [
  { v: 1800 }, { v: 2200 }, { v: 1900 }, { v: 2400 }, { v: 2100 },
  { v: 2700 }, { v: 2850 }, { v: 2600 }, { v: 2900 }, { v: 2850 },
];
const trendData2 = [
  { v: 900 }, { v: 1000 }, { v: 950 }, { v: 1100 }, { v: 1050 },
  { v: 1150 }, { v: 1200 }, { v: 1100 }, { v: 1250 }, { v: 1200 },
];
const trendData3 = [
  { v: 28000 }, { v: 33000 }, { v: 30000 }, { v: 38000 }, { v: 42000 },
  { v: 40000 }, { v: 44000 }, { v: 43000 }, { v: 45000 }, { v: 45000 },
];
const trendData4 = [
  { v: 8000 }, { v: 9500 }, { v: 9000 }, { v: 10500 }, { v: 11000 },
  { v: 11500 }, { v: 12000 }, { v: 11800 }, { v: 12300 }, { v: 12500 },
];

export function Overview() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("May 2021");

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-xl font-bold text-gray-800">Tổng Quan Hoạt Động</h1>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none focus:border-teal-400 focus:ring-1 focus:ring-teal-200 bg-white w-40 transition-all"
            />
          </div>
          {/* Month Picker */}
          <button className="flex items-center gap-2 px-3 py-1.5 text-sm border border-gray-200 rounded-lg bg-white text-gray-600 hover:bg-gray-50 transition-colors">
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            {selectedMonth}
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="flex gap-4 mb-5">
        <StatCard
          title="Tổng Số Tin"
          value="2,850"
          data={trendData1}
          color="#22c55e"
        />
        <StatCard
          title="Số Chủ Nhà"
          value="1,200"
          data={trendData2}
          color="#22c55e"
        />
        <StatCard
          title="Lượt Xem"
          value="45K"
          data={trendData3}
          color="#f97316"
          icon={<Sun className="w-4 h-4 text-teal-500" />}
          iconBg="bg-teal-100"
        />
        <StatCard
          title="Lượt Truy Cập"
          value="12.5K"
          data={trendData4}
          color="#f97316"
          icon={<TrendingUp className="w-4 h-4 text-teal-400" />}
          iconBg="bg-teal-50"
        />
      </div>

      {/* Trend Chart */}
      <div className="mb-5">
        <TrendChart />
      </div>

      {/* Monthly Visit Chart */}
      <MonthlyVisitChart />
    </div>
  );
}
