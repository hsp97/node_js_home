import { latestNews } from "@/data/mockData";

export default function LatestNews() {
  const featured = latestNews[0];
  const rest = latestNews.slice(1);

  return (
    <section className="bg-white rounded-lg border border-inv-border shadow-sm">
      <div className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-inv-border">
        <h2 className="text-lg font-bold text-inv-text">Latest News</h2>
        <a href="#" className="text-inv-blue text-sm font-medium hover:underline">
          All News →
        </a>
      </div>

      {/* Featured article */}
      <div className="p-4 border-b border-inv-border">
        <a href="#" className="group block">
          {/* Image placeholder */}
          <div className="w-full h-48 bg-gradient-to-br from-inv-nav to-inv-dark rounded-lg mb-3 flex items-center justify-center overflow-hidden">
            <div className="text-center px-6">
              <div className="text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
                {featured.category}
              </div>
              <div className="text-white text-lg font-bold leading-tight">
                {featured.title}
              </div>
            </div>
          </div>
          <h3 className="text-base font-bold text-inv-text group-hover:text-inv-blue transition-colors leading-snug">
            {featured.title}
          </h3>
          <p className="text-sm text-inv-text-light mt-1.5 leading-relaxed line-clamp-2">
            {featured.summary}
          </p>
          <div className="flex items-center gap-2 mt-2 text-xs text-inv-text-light">
            <span className="font-medium text-inv-blue">{featured.source}</span>
            <span>·</span>
            <span>{featured.time}</span>
          </div>
        </a>
      </div>

      {/* News list */}
      <div className="divide-y divide-inv-border">
        {rest.map((news) => (
          <a key={news.id} href="#" className="flex gap-4 p-4 hover:bg-blue-50/30 transition-colors group">
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
              {news.summary && (
                <p className="text-xs text-inv-text-light mt-1 line-clamp-2">{news.summary}</p>
              )}
              <span className="text-xs text-inv-text-light mt-1 block">{news.source}</span>
            </div>
            <div className="w-20 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded flex-shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
