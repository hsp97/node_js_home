const footerSections = [
  {
    title: "About",
    links: ["About Us", "Careers", "Advertising", "Contact Us", "Terms of Use", "Privacy Policy", "Cookie Policy"],
  },
  {
    title: "Products",
    links: ["InvestingPro", "Free Tools", "Portfolio", "Charts", "Screeners", "Webmaster Tools"],
  },
  {
    title: "Markets",
    links: ["Stocks", "Indices", "Forex", "Commodities", "Crypto", "Bonds", "ETFs", "Funds"],
  },
  {
    title: "More",
    links: ["News", "Analysis", "Technical", "Economic Calendar", "Earnings Calendar", "Broker Reviews"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-inv-dark text-gray-400 mt-8">
      {/* Main footer */}
      <div className="max-w-[1260px] mx-auto px-4 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-bold text-sm mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social and apps */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-10 pt-8 border-t border-white/10">
          <div className="flex items-center gap-4 mb-4 sm:mb-0">
            <span className="text-sm text-gray-500">Follow us:</span>
            <div className="flex gap-3">
              {["Twitter", "Facebook", "Instagram", "YouTube", "Telegram"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  title={social}
                >
                  <span className="text-xs font-bold text-white">
                    {social[0]}
                  </span>
                </a>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <a
              href="#"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-lg px-4 py-2 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] text-gray-400 leading-none">Download on the</div>
                <div className="text-xs font-semibold text-white leading-tight">App Store</div>
              </div>
            </a>
            <a
              href="#"
              className="flex items-center gap-2 bg-white/5 hover:bg-white/10 rounded-lg px-4 py-2 transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 01-.61-.92V2.734a1 1 0 01.609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.199l2.302 2.302a1 1 0 010 1.38l-2.302 2.302L15.395 13l2.303-2.492zM5.864 3.458L16.8 9.79l-2.302 2.302-8.634-8.634z" />
              </svg>
              <div className="text-left">
                <div className="text-[10px] text-gray-400 leading-none">Get it on</div>
                <div className="text-xs font-semibold text-white leading-tight">Google Play</div>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1260px] mx-auto px-4 py-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="4" fill="#F7931A" />
                <path d="M8 20V8h4l4 5 4-5h0v12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
              <span className="text-sm font-bold text-white">Investing.com</span>
            </div>
            <p className="text-xs text-gray-500 max-w-2xl leading-relaxed">
              Risk Disclosure: Trading in financial instruments and/or cryptocurrencies involves high risks including the risk of losing some, or all, of your investment amount, and may not be suitable for all investors. Prices of cryptocurrencies are extremely volatile and may be affected by external factors such as financial, regulatory or political events.
            </p>
          </div>
          <div className="mt-4 text-xs text-gray-600">
            © 2007-2026 Investing.com. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
