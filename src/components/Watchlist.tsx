"use client";

import { useState, useEffect } from "react";
import { useLocale } from "@/lib/i18n";
import { getWatchlist } from "@/lib/api";
import type { WatchlistItem } from "@/types/market";

export default function Watchlist() {
  const { t } = useLocale();
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    getWatchlist()
      .then((data) => {
        setWatchlist(data);
        setError(false);
      })
      .catch(() => {
        setWatchlist([]);
        setError(true);
      })
      .finally(() => setLoading(false));
  }, []);

  function handleRemove(symbol: string) {
    setWatchlist((prev) => prev.filter((item) => item.symbol !== symbol));
  }

  return (
    <div className="h-full bg-white rounded-lg border border-inv-border shadow-sm flex flex-col">
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-inv-border shrink-0">
        <h2 className="text-base font-bold text-inv-text flex items-center gap-2">
          <svg className="w-5 h-5 text-inv-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          {t.watchlist.title}
        </h2>
        <button className="text-inv-blue text-xs font-medium hover:underline flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {t.watchlist.add}
        </button>
      </div>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-inv-blue" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : error ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <svg className="w-12 h-12 text-inv-red/50 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <p className="text-sm text-inv-text-light">데이터를 불러올 수 없습니다</p>
        </div>
      ) : watchlist.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
          </svg>
          <p className="text-sm text-inv-text-light mb-2">{t.watchlist.empty}</p>
          <p className="text-xs text-gray-400">{t.watchlist.emptyDesc}</p>
        </div>
      ) : (
        <div className="flex-1 divide-y divide-inv-border overflow-y-auto">
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
                  title={t.watchlist.remove}
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
