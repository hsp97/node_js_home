"use client";

import { useCallback } from "react";
import { useMarketData } from "@/lib/useMarketData";
import { getVixData } from "@/lib/api";
import type { VixLevel } from "@/types/market";

const LEVEL_CONFIG: Record<VixLevel, { label: string; color: string; bg: string; emoji: string }> = {
  extreme_greed: { label: "극단적 탐욕", color: "text-inv-green", bg: "bg-inv-green", emoji: "🟢" },
  greed:         { label: "탐욕",       color: "text-emerald-500", bg: "bg-emerald-500", emoji: "🟡" },
  normal:        { label: "중립",       color: "text-yellow-500", bg: "bg-yellow-500", emoji: "🟡" },
  fear:          { label: "공포",       color: "text-orange-500", bg: "bg-orange-500", emoji: "🟠" },
  extreme_fear:  { label: "극단적 공포", color: "text-inv-red", bg: "bg-inv-red", emoji: "🔴" },
};

/** VIX 값에 따른 게이지 바 위치 (0~100) */
function vixToPercent(vix: number): number {
  // VIX 범위: ~9(극단적 탐욕) ~ ~80(극단적 공포)
  // 0% = extreme greed, 100% = extreme fear
  const clamped = Math.max(9, Math.min(80, vix));
  return ((clamped - 9) / (80 - 9)) * 100;
}

export default function VixGauge() {
  const fetcher = useCallback(() => getVixData(), []);
  const { data: vix, loading, error } = useMarketData(fetcher, 60_000);

  if (loading && !vix) {
    return (
      <div className="bg-white rounded-lg border border-inv-border shadow-sm p-5">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/2" />
          <div className="h-8 bg-gray-200 rounded" />
          <div className="h-3 bg-gray-200 rounded w-3/4" />
        </div>
      </div>
    );
  }

  if (error || !vix) {
    return (
      <div className="bg-white rounded-lg border border-inv-border shadow-sm p-5">
        <h3 className="text-base font-bold text-inv-text mb-2">공포 & 탐욕 지수</h3>
        <p className="text-sm text-inv-text-light">VIX 데이터를 불러올 수 없습니다</p>
      </div>
    );
  }

  const config = LEVEL_CONFIG[vix.level];
  const pct = vixToPercent(vix.value);

  return (
    <div className="bg-white rounded-lg border border-inv-border shadow-sm p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-base font-bold text-inv-text">공포 & 탐욕 지수</h3>
        <span className="text-xs text-inv-text-light">VIX</span>
      </div>

      {/* VIX value + level */}
      <div className="flex items-end gap-3 mb-4">
        <span className="text-3xl font-bold text-inv-text">{vix.value.toFixed(2)}</span>
        <div className="pb-1">
          <span className={`text-sm font-bold ${config.color}`}>
            {config.emoji} {config.label}
          </span>
          <div className="flex items-center gap-1 mt-0.5">
            <span className={`text-xs font-medium ${vix.change >= 0 ? "text-inv-red" : "text-inv-green"}`}>
              {vix.change >= 0 ? "+" : ""}{vix.change.toFixed(2)}
            </span>
            <span className={`text-xs ${vix.changePercent >= 0 ? "text-inv-red" : "text-inv-green"}`}>
              ({vix.changePercent >= 0 ? "+" : ""}{vix.changePercent.toFixed(2)}%)
            </span>
          </div>
        </div>
      </div>

      {/* Gauge bar */}
      <div className="relative h-3 rounded-full overflow-hidden bg-gradient-to-r from-inv-green via-yellow-400 to-inv-red">
        <div
          className="absolute top-0 h-full w-1 bg-white border border-gray-800 rounded-full shadow-md transition-all duration-700"
          style={{ left: `${pct}%` }}
        />
      </div>
      <div className="flex justify-between mt-1 text-[10px] text-inv-text-light">
        <span>극단적 탐욕</span>
        <span>극단적 공포</span>
      </div>
    </div>
  );
}
