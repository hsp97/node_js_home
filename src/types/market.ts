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
