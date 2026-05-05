export type Locale = "ko" | "en";

export const translations = {
  ko: {
    // Header
    header: {
      markets: "시장",
      news: "뉴스",
      analysis: "분석",
      charts: "차트",
      tools: "도구",
      search: "종목, 뉴스 검색...",
      login: "로그인",
      signup: "회원가입",
      edition: "한국판",
      language: "한국어",
    },
    // Market Overview
    marketOverview: {
      title: "시장 개요",
      tabs: {
        indices: "주요 지수",
        currencies: "환율",
        commodities: "원자재",
        crypto: "암호화폐",
      },
      columns: {
        name: "종목",
        last: "현재가",
        high: "고가",
        low: "저가",
        change: "변동",
        changePercent: "변동률",
      },
      loading: "로딩 중...",
      viewAll: "전체보기",
    },
    // Watchlist
    watchlist: {
      title: "관심종목",
      add: "추가",
      empty: "관심종목이 없습니다",
      emptyDesc: "종목을 추가하여 실시간 시세를 확인하세요",
      remove: "관심종목에서 삭제",
    },
    // VIX Gauge
    vixGauge: {
      title: "공포 & 탐욕 지수",
      vix: "VIX",
      levels: {
        extreme_greed: "극단적 탐욕",
        greed: "탐욕",
        normal: "중립",
        fear: "공포",
        extreme_fear: "극단적 공포",
      },
      error: "VIX 데이터를 불러올 수 없습니다",
    },
    // Economic Calendar
    calendar: {
      title: "경제 캘린더",
      viewAll: "전체보기",
      viewAllEvents: "모든 이벤트 보기",
      showLess: "기본 보기로 돌아가기",
      noEvents: "표시할 이벤트가 없습니다",
      impact: {
        high: "높음",
        medium: "중간",
        low: "낮음",
      },
      actual: "실제",
      forecast: "예상",
      previous: "이전",
    },
    // Footer
    footer: {
      sections: {
        about: "회사소개",
        aboutLinks: ["소개", "채용", "광고문의", "문의하기", "이용약관", "개인정보처리방침", "쿠키 정책"],
        services: "서비스",
        servicesLinks: ["프로", "무료 도구", "포트폴리오", "차트", "스크리너", "웹마스터 도구"],
        markets: "시장",
        marketsLinks: ["주식", "지수", "외환", "원자재", "암호화폐", "채권", "ETF", "펀드"],
        more: "더보기",
        moreLinks: ["뉴스", "분석", "기술적 분석", "경제 캘린더", "실적 캘린더", "브로커 리뷰"],
      },
      follow: "팔로우:",
      download: "다운로드",
      riskWarning: "위험 고지: 금융상품 및/또는 암호화폐 거래는 투자 금액의 일부 또는 전부를 잃을 수 있는 높은 위험을 포함하며, 모든 투자자에게 적합하지 않을 수 있습니다. 암호화폐 가격은 매우 변동성이 높으며 금융, 규제 또는 정치적 사건 등 외부 요인의 영향을 받을 수 있습니다.",
    },
    // Latest News
    news: {
      title: "최신 뉴스",
      readMore: "더 읽기",
      viewAll: "전체보기",
    },
    // Common
    common: {
      loading: "로딩 중...",
      error: "오류가 발생했습니다",
    },
  },
  en: {
    // Header
    header: {
      markets: "Markets",
      news: "News",
      analysis: "Analysis",
      charts: "Charts",
      tools: "Tools",
      search: "Search stocks, news...",
      login: "Sign In",
      signup: "Sign Up",
      edition: "International",
      language: "English",
    },
    // Market Overview
    marketOverview: {
      title: "Market Overview",
      tabs: {
        indices: "Major Indices",
        currencies: "Currencies",
        commodities: "Commodities",
        crypto: "Crypto",
      },
      columns: {
        name: "Name",
        last: "Last",
        high: "High",
        low: "Low",
        change: "Change",
        changePercent: "Chg %",
      },
      loading: "Loading...",
      viewAll: "View All",
    },
    // Watchlist
    watchlist: {
      title: "Watchlist",
      add: "Add",
      empty: "No items in watchlist",
      emptyDesc: "Add stocks to track real-time prices",
      remove: "Remove from watchlist",
    },
    // VIX Gauge
    vixGauge: {
      title: "Fear & Greed Index",
      vix: "VIX",
      levels: {
        extreme_greed: "Extreme Greed",
        greed: "Greed",
        normal: "Neutral",
        fear: "Fear",
        extreme_fear: "Extreme Fear",
      },
      error: "Unable to load VIX data",
    },
    // Economic Calendar
    calendar: {
      title: "Economic Calendar",
      viewAll: "View All",
      viewAllEvents: "View All Events",
      showLess: "Show Less",
      noEvents: "No events to display",
      impact: {
        high: "High",
        medium: "Medium",
        low: "Low",
      },
      actual: "Actual",
      forecast: "Forecast",
      previous: "Previous",
    },
    // Footer
    footer: {
      sections: {
        about: "About",
        aboutLinks: ["About Us", "Careers", "Advertising", "Contact", "Terms of Use", "Privacy Policy", "Cookie Policy"],
        services: "Services",
        servicesLinks: ["Pro", "Free Tools", "Portfolio", "Charts", "Screener", "Webmaster Tools"],
        markets: "Markets",
        marketsLinks: ["Stocks", "Indices", "Forex", "Commodities", "Crypto", "Bonds", "ETFs", "Funds"],
        more: "More",
        moreLinks: ["News", "Analysis", "Technical Analysis", "Economic Calendar", "Earnings Calendar", "Broker Reviews"],
      },
      follow: "Follow:",
      download: "Download",
      riskWarning: "Risk Warning: Trading financial instruments and/or cryptocurrencies involves high risks including the risk of losing some or all of your investment. Cryptocurrency prices are highly volatile and may be affected by external factors such as financial, regulatory, or political events.",
    },
    // Latest News
    news: {
      title: "Latest News",
      readMore: "Read More",
      viewAll: "View All",
    },
    // Common
    common: {
      loading: "Loading...",
      error: "An error occurred",
    },
  },
} as const;

export type Translations = typeof translations.ko | typeof translations.en;
