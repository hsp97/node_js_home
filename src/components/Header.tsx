"use client";

import { useState } from "react";

const navItems = [
  {
    label: "Markets",
    submenu: ["Stocks", "Indices", "Commodities", "Currencies", "Crypto", "Bonds", "ETFs", "Funds"],
  },
  {
    label: "News",
    submenu: ["Latest News", "Stock Markets", "Economy", "Commodities", "Forex", "Crypto", "Politics"],
  },
  {
    label: "Analysis",
    submenu: ["Technical Analysis", "Fundamental Analysis", "Opinion", "Market Overview"],
  },
  {
    label: "Charts",
    submenu: ["Real-Time Charts", "Advanced Charts", "Forex Charts", "Crypto Charts"],
  },
  {
    label: "Tools",
    submenu: ["Economic Calendar", "Earnings Calendar", "Technical Summary", "Currency Converter", "Fibonacci Calculator"],
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
            <span className="text-inv-text-light hover:text-white cursor-pointer">Edition: Global</span>
            <span className="text-inv-text-light">|</span>
            <span className="text-inv-text-light hover:text-white cursor-pointer">English</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-inv-text-light hover:text-white transition-colors">
              InvestingPro
            </button>
            <span className="text-inv-text-light">|</span>
            <button className="text-inv-text-light hover:text-white transition-colors">
              App
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
                    placeholder="Search quotes, news & more..."
                    className="w-full px-3 py-2 border border-inv-border rounded text-inv-text text-sm focus:outline-none focus:border-inv-blue"
                    autoFocus
                  />
                </div>
              )}
            </div>

            {/* Auth buttons */}
            <button className="hidden sm:block text-sm hover:text-orange-400 transition-colors">
              Sign In
            </button>
            <button className="hidden sm:block bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded transition-colors">
              Sign Up
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
                <button className="text-sm hover:text-orange-400">Sign In</button>
                <button className="bg-orange-500 text-white text-sm font-medium px-4 py-2 rounded">Sign Up</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
