// ── 프론트 UI용 범용 타입 ──

export interface MarketItem {
  name: string;
  last: number;
  change: number;
  changePercent: number;
  high?: number;
  low?: number;
  time?: string;
}

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  source: string;
  time: string;
  imageUrl?: string;
  category: string;
}

export interface EconomicEvent {
  time: string;
  country: string;
  countryCode: string;
  event: string;
  impact: "high" | "medium" | "low";
  actual?: string;
  forecast?: string;
  previous?: string;
}

// ── NestJS API 응답 타입 ──

/** API 공통 응답 래퍼 */
export interface ApiResponse<T> {
  success: boolean;
  data: T;
}

/** 환율 (USDKRW, JPYKRW) */
export interface ExchangeRate {
  code: string;
  name: string;
  price: number;
  previousClose: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  updatedAt: string;
}

/** VIX 공포 탐욕 지수 */
export type VixLevel = "extreme_greed" | "greed" | "normal" | "fear" | "extreme_fear";

export interface VixData {
  code: string;
  value: number;
  change: number;
  changePercent: number;
  level: VixLevel;
  updatedAt: string;
}

/** 주요 지수 (나스닥, 다우, S&P500, 러셀2000) */
export interface MarketIndex {
  code: string;
  name: string;
  price: number;
  previousClose: number;
  change: number;
  changePercent: number;
  updatedAt: string;
}
