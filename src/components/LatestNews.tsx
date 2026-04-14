"use client";

import { useCallback } from "react";
import { useMarketData } from "@/lib/useMarketData";
import { getLatestNews } from "@/lib/api";
import { useLocale } from "@/lib/i18n";
import type { NewsItem, NewsDataApi } from "@/types/market";

/** API NewsDataApi → UI NewsItem */
function newsToItems(arr: NewsDataApi[]): NewsItem[] {
  return arr.map((n, idx) => ({
    id: idx + 1,
    title: n.title,
    summary: "",
    source: n.source,
    time: n.time,
    imageUrl: n.thumbnailUrl,
    category: n.category,
    link: n.link,
  }));
}

export default function LatestNews() {
  const { t } = useLocale();

  const fetchNews = useCallback(() => getLatestNews(), []);
  const { data, loading } = useMarketData(fetchNews, 60_000);

  // API 응답 변환 후 사용
  const newsList = data ? newsToItems(data) : [];
  const featured = newsList[0];
  const rest = newsList.slice(1, 6);

  return (
    <section className="h-full bg-white rounded-lg border border-inv-border shadow-sm flex flex-col">
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-inv-border shrink-0">
        <h2 className="text-lg font-bold text-inv-text">{t.news.title}</h2>
        <a href="#" className="text-inv-blue text-sm font-medium hover:underline">
          {t.news.viewAll} →
        </a>
      </div>

      {loading && !data ? (
        <div className="flex-1 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-inv-blue" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>
      ) : newsList.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p className="text-sm text-inv-text-light">뉴스가 없습니다</p>
        </div>
      ) : (
        <>
          {/* Featured article */}
          <div className="p-4 border-b border-inv-border shrink-0">
            <a href={featured.link ?? "#"} target="_blank" rel="noopener noreferrer" className="group block">
              <div className="w-full h-32 bg-gradient-to-br from-inv-nav to-inv-dark rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                {featured.imageUrl ? (
                  <img src={featured.imageUrl} alt={featured.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center px-6">
                    <div className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
                      {featured.category}
                    </div>
                    <div className="text-white text-base font-bold leading-tight line-clamp-2">
                      {featured.title}
                    </div>
                  </div>
                )}
              </div>
              <h3 className="text-base font-bold text-inv-text group-hover:text-inv-blue transition-colors leading-snug line-clamp-2">
                {featured.title}
              </h3>
              {featured.summary && (
                <p className="text-sm text-inv-text-light mt-1.5 leading-relaxed line-clamp-2">
                  {featured.summary}
                </p>
              )}
              <div className="flex items-center gap-2 mt-2 text-xs text-inv-text-light">
                <span className="font-medium text-inv-blue">{featured.source}</span>
                <span>·</span>
                <span>{featured.time}</span>
              </div>
            </a>
          </div>

          {/* News list */}
          <div className="flex-1 divide-y divide-inv-border overflow-y-auto">
            {rest.map((news) => (
              <a
                key={news.id}
                href={news.link ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-4 p-4 hover:bg-blue-50/30 transition-colors group"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-inv-blue bg-inv-blue/5 px-1.5 py-0.5 rounded">
                      {news.category}
                    </span>
                    <span className="text-xs text-inv-text-light">{news.time}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-inv-text group-hover:text-inv-blue transition-colors leading-snug line-clamp-2">
                    {news.title}
                  </h3>
                  <span className="text-xs text-inv-text-light mt-1 block">{news.source}</span>
                </div>
                <div className="w-16 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex-shrink-0 flex items-center justify-center overflow-hidden">
                  {news.imageUrl ? (
                    <img src={news.imageUrl} alt={news.title} className="w-full h-full object-cover" />
                  ) : (
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  )}
                </div>
              </a>
            ))}
          </div>
        </>
      )}
    </section>
  );
}
