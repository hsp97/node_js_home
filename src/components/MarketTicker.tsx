"use client";

import { useCallback } from "react";
import { useMarketData } from "@/lib/useMarketData";
import { getMarketIndices, getExchangeRates } from "@/lib/api";
import type { MarketIndex, ExchangeRate } from "@/types/market";

interface TickerEntry {
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

function formatNumber(num: number): string {
  if (num >= 10000) return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (num >= 100) return num.toFixed(2);
  return num.toFixed(2);
}

function toTicker(indices: MarketIndex[], rates: ExchangeRate[]): TickerEntry[] {
  const fromIndices: TickerEntry[] = indices.map((i) => ({
    name: i.name,
    price: i.price,
    change: i.change,
    changePercent: i.changePercent,
  }));
  const fromRates: TickerEntry[] = rates.map((r) => ({
    name: r.name ?? r.code.replace("=X", ""),
    price: r.price,
    change: r.change,
    changePercent: r.changePercent,
  }));
  return [...fromIndices, ...fromRates];
}

export default function MarketTicker() {
  const fetchIndices = useCallback(() => getMarketIndices(), []);
  const fetchRates = useCallback(() => getExchangeRates(), []);

  const { data: indices, loading: li } = useMarketData(fetchIndices, 30_000);
  const { data: rates, loading: lr } = useMarketData(fetchRates, 30_000);

  const loading = li || lr;
  const items = indices && rates ? toTicker(indices, rates) : [];
  const doubled = [...items, ...items]; // 무한 스크롤 효과를 위해 2배

  if (loading && items.length === 0) {
    return (
      <div className="bg-inv-dark text-gray-400 overflow-hidden border-b border-white/10 h-9 flex items-center justify-center text-xs">
        Loading market data...
      </div>
    );
  }

  if (items.length === 0) return null;

  return (
    <div className="bg-inv-dark text-white overflow-hidden border-b border-white/10">
      <div className="max-w-full overflow-hidden">
        <div className="flex animate-ticker whitespace-nowrap">
          {doubled.map((item, idx) => (
            <a
              key={`${item.name}-${idx}`}
              href="#"
              className="inline-flex items-center gap-2 px-4 py-2 text-xs hover:bg-white/5 transition-colors shrink-0 border-r border-white/5"
            >
              <span className="text-gray-300 font-medium">{item.name}</span>
              <span className="font-semibold">{formatNumber(item.price)}</span>
              <span className={item.change >= 0 ? "text-inv-green" : "text-inv-red"}>
                {item.change >= 0 ? "+" : ""}
                {item.change.toFixed(2)}
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
