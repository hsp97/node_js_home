"use client";

import { useState } from "react";
import { useLocale } from "@/lib/i18n";

const navItemsKo = [
  {
    label: "시장",
    submenu: ["주식", "지수", "원자재", "통화", "암호화폐", "채권", "ETF", "펀드"],
  },
  {
    label: "뉴스",
    submenu: ["최신 뉴스", "주식 시장", "경제", "원자재", "외환", "암호화폐", "정치"],
  },
  {
    label: "분석",
    submenu: ["기술적 분석", "기본적 분석", "전문가 의견", "시장 개요"],
  },
  {
    label: "차트",
    submenu: ["실시간 차트", "고급 차트", "외환 차트", "암호화폐 차트"],
  },
  {
    label: "도구",
    submenu: ["경제 캘린더", "실적 캘린더", "기술적 요약", "환율 계산기", "피보나치 계산기"],
  },
];

const navItemsEn = [
  {
    label: "Markets",
    submenu: ["Stocks", "Indices", "Commodities", "Currencies", "Crypto", "Bonds", "ETFs", "Funds"],
  },
  {
    label: "News",
    submenu: ["Latest News", "Stock Market", "Economy", "Commodities", "Forex", "Crypto", "Politics"],
  },
  {
    label: "Analysis",
    submenu: ["Technical Analysis", "Fundamental Analysis", "Expert Opinions", "Market Overview"],
  },
  {
    label: "Charts",
    submenu: ["Real-time Charts", "Advanced Charts", "Forex Charts", "Crypto Charts"],
  },
  {
    label: "Tools",
    submenu: ["Economic Calendar", "Earnings Calendar", "Technical Summary", "Currency Converter", "Fibonacci Calculator"],
  },
];

export default function Header() {
  const { locale, t, toggleLocale } = useLocale();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const navItems = locale === "ko" ? navItemsKo : navItemsEn;

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-inv-dark text-white">
        <div className="max-w-[1260px] mx-auto px-4 flex items-center justify-between h-12 text-sm">
          <div className="flex items-center gap-4">
            <span className="text-inv-text-light hover:text-white cursor-pointer">
              {locale === "ko" ? "에디션: 한국" : "Edition: International"}
            </span>
            <span className="text-inv-text-light">|</span>
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 text-inv-text-light hover:text-white cursor-pointer transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span>{t.header.language}</span>
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-inv-text-light hover:text-white transition-colors">
              {locale === "ko" ? "프로" : "Pro"}
            </button>
            <span className="text-inv-text-light">|</span>
            <button className="text-inv-text-light hover:text-white transition-colors">
              {locale === "ko" ? "앱 다운로드" : "Download App"}
            </button>
          </div>
        </div>
      </div>

    </header>
  );
}
