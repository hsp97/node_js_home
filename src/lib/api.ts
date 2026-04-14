import type { ApiResponse, MarketIndex, ExchangeRate, VixData, MarketItem, WatchlistItem, NewsItem, CommodityData } from "@/types/market";

// Next.js rewrites /api/* → http://localhost:4000/* 으로 프록시
// 클라이언트에서 직접 localhost:4000 호출 시 CORS 문제 방지
const API_BASE = "/api";

async function fetchApi<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  const json: ApiResponse<T> = await res.json();
  if (!json.success) throw new Error("API returned success: false");
  return json.data;
}

// ── Auth ──

export interface LoginResponse {
  chatId: string;
}

export interface LoginResult {
  success: boolean;
  data?: LoginResponse;
  message?: string;
}

/** 텔레그램 Chat ID로 로그인 */
export async function login(chatId: string): Promise<LoginResult> {
  // TODO: 백엔드 auth/login 구현 후 아래 임시 코드 제거
  return { success: true, data: { chatId } };

  // const res = await fetch(`${API_BASE}/auth/login`, {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ chatId }),
  // });
  // const json = await res.json();
  // return json;
}

// ── Watchlist ──

/** 사용자 관심종목 (user=1 하드코딩, 추후 chatId 기반으로 변경) */
export async function getWatchlist(): Promise<WatchlistItem[]> {
  return fetchApi<WatchlistItem[]>("/stock/wishlist");
}

// ── Market Data ──

/** 주요 지수 (나스닥, 다우, S&P500, 러셀2000) */
export async function getMarketIndices(): Promise<MarketIndex[]> {
  return fetchApi<MarketIndex[]>("/market/indices");
}

/** 환율 (USDKRW, JPYKRW) */
export async function getExchangeRates(): Promise<ExchangeRate[]> {
  return fetchApi<ExchangeRate[]>("/market/exchange");
}

/** VIX 공포탐욕 지수 */
export async function getVixData(): Promise<VixData> {
  return fetchApi<VixData>("/market/vix");
}

/** 원자재 (Gold, Silver, WTI, Brent, Natural Gas 등) */
export async function getCommodities(): Promise<CommodityData[]> {
  return fetchApi<CommodityData[]>("/market/commodities");
}

/** 암호화폐 (BTC, ETH, BNB, SOL 등) */
export async function getCryptoList(): Promise<CommodityData[]> {
  return fetchApi<CommodityData[]>("/market/crypto");
}

/** 최신 금융 뉴스 */
export async function getLatestNews(): Promise<NewsItem[]> {
  return fetchApi<NewsItem[]>("/market/news");
}
