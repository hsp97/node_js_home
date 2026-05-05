import VixGauge from "@/components/VixGauge";
import EconomicCalendar from "@/components/EconomicCalendar";

export default function Sidebar() {
  return (
    <aside className="space-y-5">
      {/* VIX Fear & Greed 실시간 위젯 */}
      <VixGauge />

      {/* Economic Calendar - API 연동 */}
      <EconomicCalendar />
    </aside>
  );
}
