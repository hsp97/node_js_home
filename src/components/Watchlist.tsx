"use client";

import { useState } from "react";

interface WatchlistItem {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

// TODO: API 연동 후 실제 데이터로 교체
const mockWatchlist: WatchlistItem[] = [
  { symbol: "AAPL", name: "Apple Inc.", price: 227.63, change: 3.45, changePercent: 1.54 },
  { symbol: "MSFT", name: "Microsoft Corp.", price: 411.22, change: -2.18, changePercent: -0.53 },
  { symbol: "GOOGL", name: "Alphabet Inc.", price: 191.62, change: -15.40, changePercent: -7.44 },
  { symbol: "NVDA", name: "NVIDIA Corp.", price: 878.35, change: 24.67, changePercent: 2.89 },
  { symbol: "TSLA", name: "Tesla Inc.", price: 248.50, change: -8.30, changePercent: -3.23 },
];

export default function Watchlist() {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(mockWatchlist);

  function handleRemove(symbol: string) {
    setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol));
  }

  return (
    <div className="bg-white rounded-lg border border-inv-border shadow-sm">
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-inv-border">
        <h2 className="text-base font-bold text-inv-text flex items-center gap-2">
          <svg className="w-5 h-5 text-inv-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          관심종목
        </h2>
        <button className="text-inv-blue text-xs font-medium hover:underline flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          추가
        </button>
      </div>

      {watchlist.length === 0 ? (
        <div className="p-8 text-center">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <p className="text-sm text-inv-text-light mb-2">관심종목이 없습니다</p>
          <p className="text-xs text-gray-400">종목을 추가하여 실시간 시세를 확인하세요</p>
        </div>
      ) : (
        <div className="divide-y divide-inv-border max-h-[300px] overflow-y-auto">
          {watchlist.map((item) => (
            <div
              key={item.symbol}
              className="flex items-center justify-between px-4 py-3 hover:bg-blue-50/30 transition-colors group"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-inv-blue">{item.symbol}</span>
                  <span className="text-xs text-inv-text-light truncate">{item.name}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-sm font-semibold text-inv-text">
                    ${item.price.toFixed(2)}
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    <span className={`text-xs font-medium ${item.change >= 0 ? "text-inv-green" : "text-inv-red"}`}>
                      {item.change >= 0 ? "+" : ""}{item.change.toFixed(2)}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1 py-0.5 rounded ${
                        item.changePercent >= 0
                          ? "bg-inv-green/10 text-inv-green"
                          : "bg-inv-red/10 text-inv-red"
                      }`}
                    >
                      {item.changePercent >= 0 ? "+" : ""}{item.changePercent.toFixed(2)}%
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleRemove(item.symbol)}
                  className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-inv-red transition-all"
                  title="관심종목에서 삭제"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
