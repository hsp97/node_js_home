"use client";

import { useState } from "react";
import { topGainers, topLosers } from "@/data/mockData";

type Tab = "gainers" | "losers";

export default function MarketMovers() {
  const [activeTab, setActiveTab] = useState<Tab>("gainers");
  const data = activeTab === "gainers" ? topGainers : topLosers;

  return (
    <section className="bg-white rounded-lg border border-inv-border shadow-sm">
      <div className="px-4 pt-4 pb-0">
        <h2 className="text-lg font-bold text-inv-text">Market Movers</h2>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-inv-border px-4 mt-2">
        <button
          onClick={() => setActiveTab("gainers")}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "gainers"
              ? "border-inv-green text-inv-green"
              : "border-transparent text-inv-text-light hover:text-inv-text"
          }`}
        >
          🔺 Top Gainers
        </button>
        <button
          onClick={() => setActiveTab("losers")}
          className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "losers"
              ? "border-inv-red text-inv-red"
              : "border-transparent text-inv-text-light hover:text-inv-text"
          }`}
        >
          🔻 Top Losers
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-inv-text-light text-xs uppercase tracking-wider">
              <th className="text-left py-3 px-4 font-medium">Name</th>
              <th className="text-right py-3 px-4 font-medium">Last</th>
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
                  {item.last.toFixed(2)}
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
      </div>

      <div className="px-4 py-3 border-t border-inv-border">
        <a href="#" className="text-inv-blue text-sm font-medium hover:underline">
          View All Market Movers →
        </a>
      </div>
    </section>
  );
}
