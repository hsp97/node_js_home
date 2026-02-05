"use client";

import { useState } from "react";
import { majorIndices, commodities, currencies, crypto } from "@/data/mockData";
import type { MarketItem } from "@/types/market";

type Tab = "indices" | "commodities" | "currencies" | "crypto";

const tabs: { key: Tab; label: string }[] = [
  { key: "indices", label: "Major Indices" },
  { key: "commodities", label: "Commodities" },
  { key: "currencies", label: "Currencies" },
  { key: "crypto", label: "Crypto" },
];

const dataMap: Record<Tab, MarketItem[]> = {
  indices: majorIndices,
  commodities,
  currencies,
  crypto,
};

function formatPrice(num: number): string {
  if (num >= 10000) return num.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (num >= 100) return num.toFixed(2);
  if (num >= 1) return num.toFixed(4);
  return num.toFixed(4);
}

export default function MarketOverview() {
  const [activeTab, setActiveTab] = useState<Tab>("indices");
  const data = dataMap[activeTab];

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
                  {item.change >= 100 ? item.change.toFixed(2) : item.change >= 1 ? item.change.toFixed(2) : item.change.toFixed(4)}
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
      </div>

      <div className="px-4 py-3 border-t border-inv-border">
        <a href="#" className="text-inv-blue text-sm font-medium hover:underline">
          View All →
        </a>
      </div>
    </section>
  );
}
