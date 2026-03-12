import Header from "@/components/Header";
import MarketTicker from "@/components/MarketTicker";
import MarketOverview from "@/components/MarketOverview";
import LatestNews from "@/components/LatestNews";
import VixGauge from "@/components/VixGauge";
import Watchlist from "@/components/Watchlist";
import EconomicCalendar from "@/components/EconomicCalendar";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MarketTicker />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 py-6">
        {/* 2 column layout: Left sidebar | Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left - VIX → Watchlist → Calendar */}
          <div className="lg:col-span-3 space-y-5">
            <VixGauge />
            <Watchlist />
            <EconomicCalendar />
          </div>

          {/* Right - Market Overview, News */}
          <div className="lg:col-span-9 space-y-6">
            <MarketOverview />
            <LatestNews />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
