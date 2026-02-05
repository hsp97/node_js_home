import Header from "@/components/Header";
import MarketTicker from "@/components/MarketTicker";
import MarketOverview from "@/components/MarketOverview";
import LatestNews from "@/components/LatestNews";
import Sidebar from "@/components/Sidebar";
import MarketMovers from "@/components/MarketMovers";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MarketTicker />

      <main className="flex-1 max-w-[1260px] mx-auto w-full px-4 py-6">
        {/* Market Overview */}
        <div className="mb-6">
          <MarketOverview />
        </div>

        {/* Two column layout: News + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 space-y-6">
            <LatestNews />
            <MarketMovers />
          </div>
          <div className="lg:col-span-1">
            <Sidebar />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
