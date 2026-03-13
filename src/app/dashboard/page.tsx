import Header from "@/components/Header";
import MarketTicker from "@/components/MarketTicker";
import DashboardGrid from "@/components/DashboardGrid";
import Footer from "@/components/Footer";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <MarketTicker />

      <main className="flex-1 max-w-[1800px] mx-auto w-full px-4 py-6">
        <DashboardGrid />
      </main>

      <Footer />
    </div>
  );
}
