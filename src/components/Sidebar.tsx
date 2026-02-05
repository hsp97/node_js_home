import { mostPopular, economicEvents } from "@/data/mockData";
import VixGauge from "@/components/VixGauge";

function ImpactDot({ impact }: { impact: "high" | "medium" | "low" }) {
  const colors = {
    high: "bg-inv-red",
    medium: "bg-orange-400",
    low: "bg-yellow-400",
  };
  return (
    <span className={`inline-block w-2 h-2 rounded-full ${colors[impact]}`} title={`${impact} impact`} />
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

export default function Sidebar() {
  return (
    <aside className="space-y-5">
      {/* VIX Fear & Greed 실시간 위젯 */}
      <VixGauge />

      {/* InvestingPro CTA */}
      <div className="bg-gradient-to-br from-inv-nav to-inv-dark rounded-lg p-5 text-white">
        <div className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
          InvestingPro
        </div>
        <h3 className="text-base font-bold mb-2">
          Make Smarter Decisions with AI-Powered Insights
        </h3>
        <p className="text-sm text-gray-300 mb-4 leading-relaxed">
          Fair Value estimates, financial health scores, and Pro stock picks powered by AI.
        </p>
        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold py-2.5 rounded transition-colors">
          Try InvestingPro
        </button>
      </div>

      {/* Most Popular */}
      <div className="bg-white rounded-lg border border-inv-border shadow-sm">
        <div className="px-4 pt-4 pb-3 border-b border-inv-border">
          <h3 className="text-base font-bold text-inv-text">Most Popular</h3>
        </div>
        <div className="divide-y divide-inv-border">
          {mostPopular.map((article, idx) => (
            <a key={article.id} href="#" className="flex items-start gap-3 p-4 hover:bg-blue-50/30 transition-colors group">
              <span className="text-lg font-bold text-inv-text-light/40 leading-none mt-0.5">
                {idx + 1}
              </span>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-inv-text group-hover:text-inv-blue transition-colors leading-snug line-clamp-2">
                  {article.title}
                </h4>
                <div className="flex items-center gap-2 mt-1 text-xs text-inv-text-light">
                  <span>{article.category}</span>
                  <span>&middot;</span>
                  <span>{article.time}</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Economic Calendar */}
      <div className="bg-white rounded-lg border border-inv-border shadow-sm">
        <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-inv-border">
          <h3 className="text-base font-bold text-inv-text">Economic Calendar</h3>
          <a href="#" className="text-inv-blue text-xs font-medium hover:underline">
            Full Calendar &rarr;
          </a>
        </div>
        <div className="divide-y divide-inv-border">
          {economicEvents.map((event, idx) => (
            <div key={idx} className="px-4 py-3 hover:bg-blue-50/30 transition-colors">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-inv-text-light">{event.time}</span>
                <FlagEmoji code={event.countryCode} />
                <ImpactDot impact={event.impact} />
              </div>
              <div className="text-sm font-medium text-inv-text leading-snug">
                {event.event}
              </div>
              <div className="flex items-center gap-3 mt-1 text-xs text-inv-text-light">
                {event.actual && (
                  <span>
                    Actual: <strong className="text-inv-text">{event.actual}</strong>
                  </span>
                )}
                {event.forecast && <span>Forecast: {event.forecast}</span>}
                {event.previous && <span>Previous: {event.previous}</span>}
              </div>
            </div>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-inv-border">
          <a href="#" className="text-inv-blue text-sm font-medium hover:underline">
            View All Events &rarr;
          </a>
        </div>
      </div>
    </aside>
  );
}
