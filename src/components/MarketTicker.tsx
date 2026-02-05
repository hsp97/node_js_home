"use client";

import { tickerItems } from "@/data/mockData";

function formatNumber(num: number): string {
  if (num >= 10000) return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (num >= 100) return num.toFixed(2);
  if (num >= 1) return num.toFixed(4);
  return num.toFixed(4);
}

export default function MarketTicker() {
  const items = [...tickerItems, ...tickerItems];

  return (
    <div className="bg-inv-dark text-white overflow-hidden border-b border-white/10">
      <div className="max-w-full overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {items.map((item, idx) => (
            <a
              key={`${item.name}-${idx}`}
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs hover:bg-white/5 transition-colors shrink-0 border-r border-white/5"
            >
              <span className="text-gray-300 font-medium">{item.name}</span>
              <span className="font-semibold">{formatNumber(item.last)}</span>
              <span className={item.change >= 0 ? "text-inv-green" : "text-inv-red"}>
                {item.change >= 0 ? "+" : ""}
                {item.change >= 100 ? item.change.toFixed(2) : item.change >= 1 ? item.change.toFixed(2) : item.change.toFixed(4)}
              </span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  item.changePercent >= 0 ? "bg-inv-green/20 text-inv-green" : "bg-inv-red/20 text-inv-red"
                }`}
              >
                {item.changePercent >= 0 ? "+" : ""}
                {item.changePercent.toFixed(2)}%
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
