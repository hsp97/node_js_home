"use client";

import { useState } from "react";
import StockChat from "./StockChat";

const POPULAR_TICKERS = ["AAPL", "MSFT", "GOOGL", "NVDA", "AMZN", "META", "TSLA"];

export default function ChatPanel() {
  const [open, setOpen] = useState(false);
  const [ticker, setTicker] = useState("AAPL");
  const [tickerInput, setTickerInput] = useState("");

  function handleTickerSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = tickerInput.trim().toUpperCase();
    if (trimmed) {
      setTicker(trimmed);
      setTickerInput("");
    }
  }

  return (
    <>
      {/* 토글 버튼 (닫혀있을 때만) */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-inv-blue hover:bg-blue-700 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-110"
          title="실시간 채팅 열기"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
      )}

      {/* 채팅 패널 (오른쪽 슬라이드인) */}
      <div
        className={`fixed top-0 right-0 h-screen w-full sm:w-96 bg-white shadow-2xl z-40 transition-transform duration-300 flex flex-col border-l border-inv-border ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Ticker 선택 영역 */}
        <div className="px-4 py-3 border-b border-inv-border bg-gray-50 shrink-0">
          <form onSubmit={handleTickerSubmit} className="flex gap-2 mb-2">
            <input
              type="text"
              value={tickerInput}
              onChange={(e) => setTickerInput(e.target.value)}
              placeholder="종목 검색 (예: AAPL)"
              className="flex-1 px-3 py-1.5 text-sm border border-inv-border rounded-lg
                focus:outline-none focus:ring-2 focus:ring-inv-blue focus:border-transparent"
              maxLength={10}
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-inv-blue text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              검색
            </button>
          </form>
          <div className="flex flex-wrap gap-1.5">
            {POPULAR_TICKERS.map((t) => (
              <button
                key={t}
                onClick={() => setTicker(t)}
                className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                  ticker === t
                    ? "bg-inv-blue text-white"
                    : "bg-white border border-inv-border text-inv-text hover:border-inv-blue hover:text-inv-blue"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* 채팅 콘텐츠 */}
        <div className="flex-1 min-h-0">
          {open && <StockChat ticker={ticker} onClose={() => setOpen(false)} />}
        </div>
      </div>
    </>
  );
}
