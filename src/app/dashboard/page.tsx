import Header from "@/components/Header";
import MarketTicker from "@/components/MarketTicker";
import MarketOverview from "@/components/MarketOverview";
import LatestNews from "@/components/LatestNews";
import Sidebar from "@/components/Sidebar";
import Watchlist from "@/components/Watchlist";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MarketTicker />

      <main className="flex-1 max-w-[1400px] mx-auto w-full px-4 py-6">
        {/* Market Overview - Full width */}
        <div className="mb-6">
          <MarketOverview />
        </div>

        {/* 3 column layout: Watchlist | News | Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left - Watchlist */}
          <div className="lg:col-span-3">
            <Watchlist />
          </div>

          {/* Center - News */}
          <div className="lg:col-span-5">
            <LatestNews />
          </div>

          {/* Right - Sidebar */}
          <div className="lg:col-span-4">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
