import { MarketItem, NewsItem, EconomicEvent } from "@/types/market";

export const majorIndices: MarketItem[] = [
  { name: "S&P 500", last: 6025.99, change: 22.09, changePercent: 0.37, high: 6032.48, low: 5994.62, time: "20:30" },
  { name: "Dow Jones", last: 44556.34, change: 134.13, changePercent: 0.30, high: 44617.50, low: 44340.22, time: "20:30" },
  { name: "Nasdaq", last: 19654.02, change: 262.07, changePercent: 1.35, high: 19676.11, low: 19343.50, time: "20:30" },
  { name: "Nikkei 225", last: 38801.17, change: -304.43, changePercent: -0.78, high: 39183.15, low: 38702.67, time: "15:00" },
  { name: "KOSPI", last: 2517.37, change: 9.39, changePercent: 0.37, high: 2522.32, low: 2504.58, time: "15:30" },
  { name: "DAX", last: 21734.36, change: 241.96, changePercent: 1.13, high: 21748.70, low: 21461.90, time: "17:35" },
  { name: "FTSE 100", last: 8620.44, change: 28.64, changePercent: 0.33, high: 8634.43, low: 8585.97, time: "16:35" },
  { name: "Hang Seng", last: 20597.09, change: 168.70, changePercent: 0.83, high: 20716.89, low: 20373.55, time: "16:08" },
  { name: "Shanghai", last: 3250.60, change: -2.97, changePercent: -0.09, high: 3271.80, low: 3244.54, time: "15:00" },
  { name: "Euro Stoxx 50", last: 5308.94, change: 60.13, changePercent: 1.15, high: 5315.82, low: 5245.80, time: "17:50" },
];

export const commodities: MarketItem[] = [
  { name: "Gold", last: 2867.40, change: 21.70, changePercent: 0.76, high: 2873.30, low: 2835.70 },
  { name: "Silver", last: 32.345, change: 0.267, changePercent: 0.83, high: 32.445, low: 31.910 },
  { name: "Crude Oil WTI", last: 71.03, change: -1.67, changePercent: -2.30, high: 72.94, low: 70.84 },
  { name: "Brent Oil", last: 74.61, change: -1.53, changePercent: -2.01, high: 76.30, low: 74.38 },
  { name: "Natural Gas", last: 3.071, change: -0.115, changePercent: -3.61, high: 3.241, low: 3.048 },
  { name: "Copper", last: 4.5327, change: 0.0630, changePercent: 1.41, high: 4.5555, low: 4.4505 },
  { name: "Platinum", last: 982.80, change: 9.60, changePercent: 0.99, high: 989.00, low: 968.20 },
];

export const currencies: MarketItem[] = [
  { name: "EUR/USD", last: 1.0387, change: 0.0010, changePercent: 0.10, high: 1.0413, low: 1.0316 },
  { name: "GBP/USD", last: 1.2497, change: -0.0012, changePercent: -0.10, high: 1.2550, low: 1.2406 },
  { name: "USD/JPY", last: 152.48, change: -1.88, changePercent: -1.22, high: 154.79, low: 152.13 },
  { name: "USD/KRW", last: 1452.50, change: -4.30, changePercent: -0.30, high: 1460.20, low: 1449.80 },
  { name: "USD/CNY", last: 7.2878, change: 0.0051, changePercent: 0.07, high: 7.2997, low: 7.2783 },
  { name: "AUD/USD", last: 0.6285, change: 0.0018, changePercent: 0.29, high: 0.6310, low: 0.6240 },
  { name: "USD/CHF", last: 0.9059, change: -0.0019, changePercent: -0.21, high: 0.9115, low: 0.9032 },
];

export const crypto: MarketItem[] = [
  { name: "Bitcoin", last: 98264.50, change: 1245.30, changePercent: 1.28, high: 99012.00, low: 96380.00 },
  { name: "Ethereum", last: 2755.80, change: -76.40, changePercent: -2.70, high: 2872.50, low: 2685.00 },
  { name: "BNB", last: 658.30, change: 12.50, changePercent: 1.94, high: 665.00, low: 641.20 },
  { name: "Solana", last: 206.42, change: 8.15, changePercent: 4.11, high: 210.80, low: 195.70 },
  { name: "XRP", last: 2.5340, change: -0.0420, changePercent: -1.63, high: 2.6100, low: 2.4800 },
  { name: "Cardano", last: 0.7645, change: 0.0320, changePercent: 4.37, high: 0.7820, low: 0.7290 },
];

export const tickerItems: MarketItem[] = [
  { name: "S&P 500", last: 6025.99, change: 22.09, changePercent: 0.37 },
  { name: "Nasdaq", last: 19654.02, change: 262.07, changePercent: 1.35 },
  { name: "Dow 30", last: 44556.34, change: 134.13, changePercent: 0.30 },
  { name: "EUR/USD", last: 1.0387, change: 0.0010, changePercent: 0.10 },
  { name: "Gold", last: 2867.40, change: 21.70, changePercent: 0.76 },
  { name: "Crude Oil", last: 71.03, change: -1.67, changePercent: -2.30 },
  { name: "Bitcoin", last: 98264.50, change: 1245.30, changePercent: 1.28 },
  { name: "USD/KRW", last: 1452.50, change: -4.30, changePercent: -0.30 },
  { name: "Nikkei 225", last: 38801.17, change: -304.43, changePercent: -0.78 },
  { name: "KOSPI", last: 2517.37, change: 9.39, changePercent: 0.37 },
  { name: "Silver", last: 32.345, change: 0.267, changePercent: 0.83 },
  { name: "Natural Gas", last: 3.071, change: -0.115, changePercent: -3.61 },
];

export const topGainers: MarketItem[] = [
  { name: "Palantir Technologies", last: 106.88, change: 22.06, changePercent: 26.00 },
  { name: "Super Micro Computer", last: 47.33, change: 10.86, changePercent: 29.77 },
  { name: "MicroStrategy", last: 368.71, change: 24.54, changePercent: 7.13 },
  { name: "SoundHound AI", last: 22.35, change: 3.52, changePercent: 18.70 },
  { name: "Arm Holdings", last: 176.89, change: 15.32, changePercent: 9.48 },
];

export const topLosers: MarketItem[] = [
  { name: "Alphabet (Google)", last: 191.62, change: -15.40, changePercent: -7.44 },
  { name: "AMD", last: 112.50, change: -8.87, changePercent: -7.31 },
  { name: "PayPal Holdings", last: 77.12, change: -6.32, changePercent: -7.58 },
  { name: "Snap Inc.", last: 11.45, change: -1.15, changePercent: -9.13 },
  { name: "Estee Lauder", last: 62.87, change: -12.75, changePercent: -16.86 },
];

export const latestNews: NewsItem[] = [
  {
    id: 1,
    title: "S&P 500 Closes Higher as Tech Stocks Rebound Amid Easing Trade War Fears",
    summary: "Wall Street rallied on Wednesday as investors shook off concerns about escalating trade tensions between the U.S. and China. The S&P 500 gained 0.4%, led by strong performance in the technology sector.",
    source: "Investing.com",
    time: "2 hours ago",
    category: "Stock Markets",
  },
  {
    id: 2,
    title: "Gold Hits New Record High Above $2,870 on Safe-Haven Demand",
    summary: "Gold prices surged to a fresh all-time high as investors sought safe-haven assets amid geopolitical uncertainty and expectations of further Federal Reserve rate cuts.",
    source: "Investing.com",
    time: "3 hours ago",
    category: "Commodities",
  },
  {
    id: 3,
    title: "Fed Officials Signal Patience on Rate Cuts, Cite Sticky Inflation",
    summary: "Several Federal Reserve officials emphasized the need for patience in cutting interest rates, pointing to persistent inflationary pressures in the services sector despite progress in bringing down overall inflation.",
    source: "Reuters",
    time: "4 hours ago",
    category: "Economy",
  },
  {
    id: 4,
    title: "Bitcoin Approaches $100K as Institutional Adoption Accelerates",
    summary: "Bitcoin surged past $98,000 as major financial institutions continued to increase their cryptocurrency exposure through spot ETFs and direct purchases.",
    source: "Investing.com",
    time: "5 hours ago",
    category: "Cryptocurrency",
  },
  {
    id: 5,
    title: "Crude Oil Falls Over 2% as OPEC+ Considers Output Increase",
    summary: "Oil prices dropped sharply after reports emerged that OPEC+ members are discussing a potential increase in oil production quotas starting in March.",
    source: "Bloomberg",
    time: "6 hours ago",
    category: "Commodities",
  },
  {
    id: 6,
    title: "Euro Holds Steady Against Dollar Ahead of ECB Policy Decision",
    summary: "The euro traded flat against the U.S. dollar as traders positioned themselves ahead of tomorrow's European Central Bank interest rate decision, widely expected to hold rates steady.",
    source: "Investing.com",
    time: "7 hours ago",
    category: "Forex",
  },
  {
    id: 7,
    title: "Palantir Stock Surges 26% After Blowout Earnings Beat Expectations",
    summary: "Palantir Technologies shares soared after the company reported quarterly revenue and earnings that significantly exceeded Wall Street estimates, driven by strong AI platform demand.",
    source: "Investing.com",
    time: "8 hours ago",
    category: "Stock Markets",
  },
  {
    id: 8,
    title: "Japan's Nikkei Drops as Yen Strengthens on BoJ Rate Hike Bets",
    summary: "Japanese stocks fell as the yen strengthened against the dollar, with traders pricing in higher odds of a Bank of Japan interest rate hike at its next policy meeting.",
    source: "Reuters",
    time: "10 hours ago",
    category: "Stock Markets",
  },
];

export const mostPopular: NewsItem[] = [
  { id: 101, title: "Palantir Stock Surges 26% After Blowout Earnings", summary: "", source: "Investing.com", time: "8h ago", category: "Stocks" },
  { id: 102, title: "Gold Hits New All-Time High Above $2,870", summary: "", source: "Investing.com", time: "3h ago", category: "Commodities" },
  { id: 103, title: "Bitcoin Eyes $100K Milestone", summary: "", source: "Investing.com", time: "5h ago", category: "Crypto" },
  { id: 104, title: "Alphabet Stock Drops 7% on Cloud Revenue Miss", summary: "", source: "Investing.com", time: "9h ago", category: "Stocks" },
  { id: 105, title: "Fed Signals No Rush to Cut Rates Further", summary: "", source: "Reuters", time: "4h ago", category: "Economy" },
];

export const economicEvents: EconomicEvent[] = [
  { time: "08:30", country: "United States", countryCode: "US", event: "Initial Jobless Claims", impact: "high", actual: "219K", forecast: "215K", previous: "207K" },
  { time: "10:00", country: "United States", countryCode: "US", event: "ISM Services PMI", impact: "high", actual: "52.8", forecast: "54.0", previous: "54.1" },
  { time: "12:00", country: "Eurozone", countryCode: "EU", event: "ECB Interest Rate Decision", impact: "high", forecast: "2.90%", previous: "2.90%" },
  { time: "14:00", country: "United Kingdom", countryCode: "GB", event: "BoE Interest Rate Decision", impact: "high", forecast: "4.50%", previous: "4.75%" },
  { time: "19:00", country: "United States", countryCode: "US", event: "Fed Waller Speech", impact: "medium" },
  { time: "21:30", country: "Japan", countryCode: "JP", event: "Household Spending (YoY)", impact: "medium", forecast: "0.5%", previous: "0.4%" },
];
