"use client";

import { economicEvents } from "@/data/mockData";
import { useLocale } from "@/lib/i18n";

function ImpactDot({ impact, label }: { impact: "high" | "medium" | "low"; label: string }) {
  const colors = {
    high: "bg-inv-red",
    medium: "bg-orange-400",
    low: "bg-yellow-400",
  };
  return (
    <span className={`inline-block w-2 h-2 rounded-full ${colors[impact]}`} title={label} />
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
  };
  return <span className="text-sm">{flags[code] || "\u{1F3F3}\u{FE0F}"}</span>;
}

export default function EconomicCalendar() {
  const { t } = useLocale();

  return (
    <div className="bg-white rounded-lg border border-inv-border shadow-sm">
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-inv-border">
        <h3 className="text-base font-bold text-inv-text">{t.calendar.title}</h3>
        <a href="#" className="text-inv-blue text-xs font-medium hover:underline">
          {t.calendar.viewAll} &rarr;
        </a>
      </div>
      <div className="divide-y divide-inv-border">
        {economicEvents.map((event, idx) => (
          <div key={idx} className="px-4 py-3 hover:bg-blue-50/30 transition-colors">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono text-inv-text-light">{event.time}</span>
              <FlagEmoji code={event.countryCode} />
              <ImpactDot impact={event.impact} label={t.calendar.impact[event.impact]} />
            </div>
            <div className="text-sm font-medium text-inv-text leading-snug">
              {event.event}
            </div>
            <div className="flex items-center gap-3 mt-1 text-xs text-inv-text-light">
              {event.actual && (
                <span>
                  {t.calendar.actual}: <strong className="text-inv-text">{event.actual}</strong>
                </span>
              )}
              {event.forecast && <span>{t.calendar.forecast}: {event.forecast}</span>}
              {event.previous && <span>{t.calendar.previous}: {event.previous}</span>}
            </div>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-t border-inv-border">
        <a href="#" className="text-inv-blue text-sm font-medium hover:underline">
          {t.calendar.viewAllEvents} &rarr;
        </a>
      </div>
    </div>
  );
}
