import { redirect } from "next/navigation";
import { getSessionServer } from "@/lib/auth";
import Header from "@/components/Header";
import MarketTicker from "@/components/MarketTicker";
import DashboardGrid from "@/components/DashboardGrid";
import Footer from "@/components/Footer";

export default async function DashboardPage() {
  const chatId = await getSessionServer();
  if (!chatId) {
    redirect("/login");
  }
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
