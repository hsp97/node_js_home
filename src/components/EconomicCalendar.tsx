"use client";

import { useState, useCallback, useMemo } from "react";
import { useMarketData } from "@/lib/useMarketData";
import { useLocale } from "@/lib/i18n";
import { getEconomicCalendar } from "@/lib/api";
import type { EconomicCalendarData, EconomicEvent } from "@/types/market";

const DEFAULT_LIMIT = 10;

function ImpactDot({ impact, label }: { impact: string; label: string }) {
  const colors: Record<string, string> = {
    high: "bg-inv-red",
    medium: "bg-orange-400",
    low: "bg-yellow-400",
  };
  return (
    <span
      className={`inline-block w-2 h-2 rounded-full ${colors[impact] || colors.low}`}
      title={label}
    />
  );
}

function FlagEmoji({ code }: { code: string }) {
  const flags: Record<string, string> = {
    US: "\u{1F1FA}\u{1F1F8}",
    EU: "\u{1F1EA}\u{1F1FA}",
    GB: "\u{1F1EC}\u{1F1E7}",
    JP: "\u{1F1EF}\u{1F1F5}",
    CN: "\u{1F1E8}\u{1F1F3}",
    KR: "\u{1F1F0}\u{1F1F7}",
    DE: "\u{1F1E9}\u{1F1EA}",
    FR: "\u{1F1EB}\u{1F1F7}",
    AU: "\u{1F1E6}\u{1F1FA}",
    CA: "\u{1F1E8}\u{1F1E6}",
  };
  return <span className="text-sm">{flags[code] || "\u{1F3F3}\u{FE0F}"}</span>;
}

/** 숫자 + 단위 포맷 */
function formatValue(value: number | null, unit: string): string | null {
  if (value === null) return null;
  return `${value}${unit}`;
}

export default function EconomicCalendar() {
  const { t } = useLocale();
  const [showAll, setShowAll] = useState(false);
  const fetcher = useCallback(() => getEconomicCalendar(), []);
  const { data, loading, error } = useMarketData<EconomicCalendarData>(fetcher, 600_000); // 10분 주기

  // 기본: 중간/높음 중요도만 최대 10개
  // 전체보기: 모든 이벤트
  const displayedEvents = useMemo<EconomicEvent[]>(() => {
    if (!data?.events) return [];
    if (showAll) return data.events;
    return data.events
      .filter((e) => e.impact === "high" || e.impact === "medium")
      .slice(0, DEFAULT_LIMIT);
  }, [data, showAll]);

  function toggleShowAll() {
    setShowAll((prev) => !prev);
  }

  // 로딩
  if (loading && !data) {
    return (
      <div className="h-full bg-white rounded-lg border border-inv-border shadow-sm flex flex-col">
        <div className="px-4 pt-4 pb-3 border-b border-inv-border shrink-0">
          <h3 className="text-base font-bold text-inv-text">{t.calendar.title}</h3>
        </div>
        <div className="flex-1 p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="animate-pulse space-y-2">
              <div className="h-3 bg-gray-200 rounded w-1/3" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  // 에러
  if (error || !data) {
    return (
      <div className="h-full bg-white rounded-lg border border-inv-border shadow-sm flex flex-col">
        <div className="px-4 pt-4 pb-3 border-b border-inv-border shrink-0">
          <h3 className="text-base font-bold text-inv-text">{t.calendar.title}</h3>
        </div>
        <div className="flex-1 flex items-center justify-center p-4">
          <p className="text-sm text-inv-text-light">데이터를 불러올 수 없습니다</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-white rounded-lg border border-inv-border shadow-sm flex flex-col">
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-inv-border shrink-0">
        <h3 className="text-base font-bold text-inv-text">{t.calendar.title}</h3>
        <button
          onClick={toggleShowAll}
          className="text-inv-blue text-xs font-medium hover:underline"
        >
          {showAll ? t.calendar.showLess : t.calendar.viewAll} &rarr;
        </button>
      </div>

      <div className="flex-1 divide-y divide-inv-border overflow-y-auto">
        {displayedEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-sm text-inv-text-light">
            <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p>{t.calendar.noEvents}</p>
          </div>
        ) : (
          displayedEvents.map((event, idx) => (
            <div key={idx} className="px-4 py-3 hover:bg-blue-50/30 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-inv-text-light">{event.time}</span>
                <FlagEmoji code={event.country} />
                <ImpactDot
                  impact={event.impact}
                  label={t.calendar.impact?.[event.impact as "high" | "medium" | "low"] || event.impact}
                />
              </div>
              <div className="text-sm font-medium text-inv-text leading-snug">
                {event.event}
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-inv-text-light">
                {event.actual !== null && (
                  <span>
                    {t.calendar.actual}:{" "}
                    <strong className="text-inv-text">
                      {formatValue(event.actual, event.unit)}
                    </strong>
                  </span>
                )}
                {event.estimate !== null && (
                  <span>{t.calendar.forecast}: {formatValue(event.estimate, event.unit)}</span>
                )}
                {event.prev !== null && (
                  <span>{t.calendar.previous}: {formatValue(event.prev, event.unit)}</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="px-4 py-3 border-t border-inv-border shrink-0">
        <button
          onClick={toggleShowAll}
          className="text-inv-blue text-sm font-medium hover:underline"
        >
          {showAll ? t.calendar.showLess : t.calendar.viewAllEvents} &rarr;
        </button>
      </div>
    </div>
  );
}
