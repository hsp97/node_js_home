import type { ApiResponse, MarketIndex, ExchangeRate, VixData, MarketItem, WatchlistItem, NewsItem, CommodityData, NewsDataApi, EconomicCalendarData } from "@/types/market";
import { getTokenClient } from "./auth";

// Next.js rewrites /api/* → http://localhost:4000/* 으로 프록시
// 클라이언트에서 직접 localhost:4000 호출 시 CORS 문제 방지
const API_BASE = "/api";

/** API 호출 (인증 토큰 자동 첨부) */
async function fetchApi<T>(path: string): Promise<T> {
  const token = getTokenClient();
  const headers: HeadersInit = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, { headers });
  if (!res.ok) throw new Error(`API error: ${res.status} ${res.statusText}`);
  const json: ApiResponse<T> = await res.json();
  if (!json.success) throw new Error("API returned success: false");
  return json.data;
}

// ── Auth ──

export interface VerifyTokenResult {
  success: boolean;
  message?: string;
}

/** JWT 토큰 검증 (보호된 엔드포인트 호출로 검증) */
export async function verifyToken(token: string): Promise<VerifyTokenResult> {
  try {
    const res = await fetch(`${API_BASE}/stock/wishlist`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (res.status === 401) {
      return { success: false, message: "유효하지 않은 토큰입니다." };
    }
    if (!res.ok) {
      return { success: false, message: "서버 오류가 발생했습니다." };
    }
    return { success: true };
  } catch {
    return { success: false, message: "서버 연결에 실패했습니다." };
  }
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
export async function getLatestNews(): Promise<NewsDataApi[]> {
  return fetchApi<NewsDataApi[]>("/market/news");
}

/** 경제 캘린더 */
export async function getEconomicCalendar(): Promise<EconomicCalendarData> {
  return fetchApi<EconomicCalendarData>("/market/calendar");
}
