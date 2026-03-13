"use client";

import { useState, useEffect, useCallback } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import MarketOverview from "./MarketOverview";
import LatestNews from "./LatestNews";
import VixGauge from "./VixGauge";
import Watchlist from "./Watchlist";
import EconomicCalendar from "./EconomicCalendar";
import { useLocale } from "@/lib/i18n";

const STORAGE_KEY = "dashboard-layout";
const COLS = 12;
const ROW_HEIGHT = 30;

interface WidgetConfig {
  id: string;
  component: React.ComponentType;
  minW: number;
  minH: number;
  titleKo: string;
  titleEn: string;
}

const widgets: WidgetConfig[] = [
  { id: "vix", component: VixGauge, minW: 2, minH: 6, titleKo: "공포 & 탐욕 지수", titleEn: "Fear & Greed" },
  { id: "watchlist", component: Watchlist, minW: 2, minH: 8, titleKo: "관심종목", titleEn: "Watchlist" },
  { id: "calendar", component: EconomicCalendar, minW: 2, minH: 10, titleKo: "경제 캘린더", titleEn: "Calendar" },
  { id: "market", component: MarketOverview, minW: 4, minH: 12, titleKo: "시장 개요", titleEn: "Market Overview" },
  { id: "news", component: LatestNews, minW: 4, minH: 14, titleKo: "최신 뉴스", titleEn: "Latest News" },
];

const defaultLayout: Layout[] = [
  { i: "vix", x: 0, y: 0, w: 3, h: 7, minW: 2, minH: 6 },
  { i: "watchlist", x: 0, y: 7, w: 3, h: 10, minW: 2, minH: 8 },
  { i: "calendar", x: 0, y: 17, w: 3, h: 12, minW: 2, minH: 10 },
  { i: "market", x: 3, y: 0, w: 9, h: 14, minW: 4, minH: 12 },
  { i: "news", x: 3, y: 14, w: 9, h: 16, minW: 4, minH: 14 },
];

export default function DashboardGrid() {
  const { locale } = useLocale();
  const [layout, setLayout] = useState<Layout[]>(defaultLayout);
  const [containerWidth, setContainerWidth] = useState(1768);
  const [mounted, setMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // 컨테이너 너비 측정
  useEffect(() => {
    setMounted(true);
    const updateWidth = () => {
      const container = document.getElementById("dashboard-container");
      if (container) {
        setContainerWidth(container.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // 로컬 스토리지에서 레이아웃 복원
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setLayout(parsed);
        } catch {
          // 파싱 실패 시 기본 레이아웃 사용
        }
      }
    }
  }, []);

  // 레이아웃 변경 저장
  const handleLayoutChange = useCallback((newLayout: Layout[]) => {
    setLayout(newLayout);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newLayout));
    }
  }, []);

  // 레이아웃 초기화
  const resetLayout = useCallback(() => {
    setLayout(defaultLayout);
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  if (!mounted) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-64 bg-gray-200 rounded-lg" />
        <div className="h-64 bg-gray-200 rounded-lg" />
      </div>
    );
  }

  return (
    <div id="dashboard-container" className="relative">
      {/* 레이아웃 초기화 버튼 */}
      <div className="flex justify-end mb-3">
        <button
          onClick={resetLayout}
          className="text-xs text-inv-text-light hover:text-inv-blue transition-colors flex items-center gap-1"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {locale === "ko" ? "레이아웃 초기화" : "Reset Layout"}
        </button>
      </div>

      <GridLayout
        className="layout"
        layout={layout}
        cols={COLS}
        rowHeight={ROW_HEIGHT}
        width={containerWidth}
        onLayoutChange={handleLayoutChange}
        onDragStart={() => setIsDragging(true)}
        onDragStop={() => setIsDragging(false)}
        onResizeStart={() => setIsDragging(true)}
        onResizeStop={() => setIsDragging(false)}
        draggableHandle=".drag-handle"
        isResizable={true}
        isDraggable={true}
        compactType="vertical"
        preventCollision={false}
        margin={[16, 16]}
      >
        {widgets.map((widget) => {
          const Widget = widget.component;
          return (
            <div
              key={widget.id}
              className={`group relative ${isDragging ? "cursor-grabbing" : ""}`}
            >
              {/* 드래그 핸들 */}
              <div className="drag-handle absolute top-0 left-0 right-0 h-8 z-10 cursor-grab active:cursor-grabbing flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-inv-blue/90 text-white text-xs px-3 py-1 rounded-b-md flex items-center gap-1.5 shadow-md">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8h16M4 16h16" />
                  </svg>
                  {locale === "ko" ? widget.titleKo : widget.titleEn}
                </div>
              </div>

              {/* 리사이즈 인디케이터 */}
              <div className="absolute bottom-0 right-0 w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none">
                <svg className="w-4 h-4 text-inv-blue" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 22H20V20H22V22ZM22 18H20V16H22V18ZM18 22H16V20H18V22ZM22 14H20V12H22V14ZM18 18H16V16H18V18ZM14 22H12V20H14V22Z" />
                </svg>
              </div>

              {/* 위젯 콘텐츠 */}
              <div className="h-full overflow-auto rounded-lg border border-transparent group-hover:border-inv-blue/30 transition-colors">
                <Widget />
              </div>
            </div>
          );
        })}
      </GridLayout>

      {/* 드래그 중 안내 */}
      {isDragging && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-inv-dark text-white px-4 py-2 rounded-full text-sm shadow-lg z-50">
          {locale === "ko" ? "원하는 위치에 놓으세요" : "Drop to place"}
        </div>
      )}
    </div>
  );
}
