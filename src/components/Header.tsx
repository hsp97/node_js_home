"use client";

import { useState } from "react";

const navItems = [
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

export default function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-inv-dark text-white">
        <div className="max-w-[1260px] mx-auto px-4 flex items-center justify-between h-12 text-sm">
          <div className="flex items-center gap-4">
            <span className="text-inv-text-light hover:text-white cursor-pointer">에디션: 한국</span>
            <span className="text-inv-text-light">|</span>
            <span className="text-inv-text-light hover:text-white cursor-pointer">한국어</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-inv-text-light hover:text-white transition-colors">
              프로
            </button>
            <span className="text-inv-text-light">|</span>
            <button className="text-inv-text-light hover:text-white transition-colors">
              앱 다운로드
            </button>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-inv-nav text-white shadow-md">
        <div className="max-w-[1260px] mx-auto px-4 flex items-center justify-between h-14">
          {/* Logo */}
          <div className="flex items-center gap-6">
            <a href="/" className="flex items-center gap-2 shrink-0">
              <div className="flex items-center">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <rect width="28" height="28" rx="4" fill="#F7931A" />
                  <path d="M8 20V8h4l4 5 4-5h0v12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                <span className="ml-2 text-lg font-bold tracking-tight">Investing.com</span>
              </div>
            </a>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveMenu(item.label)}
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  <button className="px-3 py-4 text-sm font-medium hover:text-orange-400 transition-colors flex items-center gap-1">
                    {item.label}
                    <svg className="w-3 h-3 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {activeMenu === item.label && (
                    <div className="absolute top-full left-0 bg-white text-inv-text rounded shadow-lg border border-inv-border min-w-[200px] py-2 z-50">
                      {item.submenu.map((sub) => (
                        <a
                          key={sub}
                          href="#"
                          className="block px-4 py-2 text-sm hover:bg-inv-light transition-colors"
                        >
                          {sub}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 hover:bg-white/10 rounded transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              {searchOpen && (
                <div className="absolute right-0 top-full mt-1 w-80 bg-white rounded shadow-lg border border-inv-border p-3 z-50">
                  <input
                    type="text"
                    placeholder="종목, 뉴스 검색..."
                    className="w-full px-3 py-2 border border-inv-border rounded text-inv-text text-sm focus:outline-none focus:border-inv-blue"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Auth buttons */}
            <button className="hidden sm:block text-sm hover:text-orange-400 transition-colors">
              로그인
            </button>
            <button className="hidden sm:block bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded transition-colors">
              회원가입
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-white/10 rounded transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-inv-nav">
            <div className="max-w-[1260px] mx-auto px-4 py-4">
              {navItems.map((item) => (
                <div key={item.label} className="py-2">
                  <div className="text-sm font-medium text-orange-400 mb-1">{item.label}</div>
                  <div className="flex flex-wrap gap-2">
                    {item.submenu.map((sub) => (
                      <a key={sub} href="#" className="text-sm text-gray-300 hover:text-white">
                        {sub}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
              <div className="flex gap-3 mt-4 pt-4 border-t border-white/10">
                <button className="text-sm hover:text-orange-400">로그인</button>
                <button className="bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded">회원가입</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
