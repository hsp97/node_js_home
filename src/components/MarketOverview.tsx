"use client";

import { useState, useCallback } from "react";
import { useMarketData } from "@/lib/useMarketData";
import { getMarketIndices, getExchangeRates } from "@/lib/api";
import { commodities, crypto } from "@/data/mockData";
import type { MarketItem, MarketIndex, ExchangeRate } from "@/types/market";

type Tab = "indices" | "commodities" | "currencies" | "crypto";

const tabs: { key: Tab; label: string }[] = [
  { key: "indices", label: "Major Indices" },
  { key: "currencies", label: "Currencies" },
  { key: "commodities", label: "Commodities" },
  { key: "crypto", label: "Crypto" },
];

function formatPrice(num: number): string {
  if (num >= 10000) return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (num >= 100) return num.toFixed(2);
  return num.toFixed(2);
}

/** API MarketIndex → UI MarketItem */
function indicesToItems(arr: MarketIndex[]): MarketItem[] {
  return arr.map((i) => ({
    name: i.name,
    last: i.price,
    change: i.change,
    changePercent: i.changePercent,
  }));
}

/** API ExchangeRate → UI MarketItem */
function ratesToItems(arr: ExchangeRate[]): MarketItem[] {
  return arr.map((r) => ({
    name: r.name ?? r.code.replace("=X", ""),
    last: r.price,
    change: r.change,
    changePercent: r.changePercent,
    high: r.high,
    low: r.low,
  }));
}

export default function MarketOverview() {
  const [activeTab, setActiveTab] = useState<Tab>("indices");

  const fetchIndices = useCallback(() => getMarketIndices(), []);
  const fetchRates = useCallback(() => getExchangeRates(), []);

  const { data: apiIndices, loading: indicesLoading } = useMarketData(fetchIndices, 30_000);
  const { data: apiRates, loading: ratesLoading } = useMarketData(fetchRates, 30_000);

  // 실제 API 데이터를 MarketItem 형태로 변환, 없으면 빈 배열
  const indicesItems = apiIndices ? indicesToItems(apiIndices) : [];
  const currencyItems = apiRates ? ratesToItems(apiRates) : [];

  // 탭별 데이터 맵 (commodities, crypto는 아직 mock)
  const dataMap: Record<Tab, { items: MarketItem[]; loading: boolean }> = {
    indices: { items: indicesItems, loading: indicesLoading },
    currencies: { items: currencyItems, loading: ratesLoading },
    commodities: { items: commodities, loading: false },
    crypto: { items: crypto, loading: false },
  };

  const { items: data, loading } = dataMap[activeTab];

  return (
    <section className="bg-white rounded-lg border border-inv-border shadow-sm">
      <div className="flex items-center justify-between px-4 pt-4 pb-0">
        <h2 className="text-lg font-bold text-inv-text">Market Overview</h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-inv-border px-4 mt-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-inv-blue text-inv-blue"
                : "border-transparent text-inv-text-light hover:text-inv-text"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading && data.length === 0 ? (
          <div className="flex items-center justify-center py-12 text-sm text-inv-text-light">
            <svg className="animate-spin h-5 w-5 mr-2 text-inv-blue" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading...
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-inv-text-light text-xs uppercase tracking-wider">
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-right py-3 px-4 font-medium">Last</th>
                <th className="text-right py-3 px-4 font-medium">High</th>
                <th className="text-right py-3 px-4 font-medium">Low</th>
                <th className="text-right py-3 px-4 font-medium">Chg.</th>
                <th className="text-right py-3 px-4 font-medium">Chg. %</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, idx) => (
                <tr
                  key={item.name}
                  className={`border-t border-inv-border hover:bg-blue-50/50 transition-colors cursor-pointer ${
                    idx % 2 === 0 ? "bg-white" : "bg-inv-light/50"
                  }`}
                >
                  <td className="py-3 px-4 font-semibold text-inv-blue hover:underline">
                    {item.name}
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-inv-text">
                    {formatPrice(item.last)}
                  </td>
                  <td className="py-3 px-4 text-right text-inv-text-light">
                    {item.high ? formatPrice(item.high) : "-"}
                  </td>
                  <td className="py-3 px-4 text-right text-inv-text-light">
                    {item.low ? formatPrice(item.low) : "-"}
                  </td>
                  <td className={`py-3 px-4 text-right font-medium ${item.change >= 0 ? "text-inv-green" : "text-inv-red"}`}>
                    {item.change >= 0 ? "+" : ""}
                    {item.change.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                        item.changePercent >= 0
                          ? "bg-inv-green/10 text-inv-green"
                          : "bg-inv-red/10 text-inv-red"
                      }`}
                    >
                      {item.changePercent >= 0 ? "+" : ""}
                      {item.changePercent.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="px-4 py-3 border-t border-inv-border">
        <a href="#" className="text-inv-blue text-sm font-medium hover:underline">
          View All →
        </a>
      </div>
    </section>
  );
}
