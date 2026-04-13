import type { ApiResponse, MarketIndex, ExchangeRate, VixData } from "@/types/market";

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
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chatId }),
  });

  const json = await res.json();
  return json;
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
