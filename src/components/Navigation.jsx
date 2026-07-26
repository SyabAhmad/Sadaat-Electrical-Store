import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navigation({ cartCount, favCount, categories }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* Top Trust Bar - eXtra Style */}
      <div className="hidden md:block" style={{backgroundColor: '#003D6B', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-9 text-[10px] tracking-wider" style={{color: 'rgba(255,255,255,0.8)'}}>
            <div className="flex items-center gap-6">
              <a href="tel:+923429619908" className="flex items-center gap-1.5 hover:text-white transition-colors">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                +92 342 9619908
              </a>
              <span className="w-px h-3" style={{backgroundColor: 'rgba(255,255,255,0.2)'}} />
              <span className="flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                sayyadzada@hotmail.com
              </span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/about" className="hover:text-white transition-colors uppercase">About Us</Link>
              <Link to="/contact" className="hover:text-white transition-colors uppercase">Contact</Link>
              <span className="flex items-center gap-1.5">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Saidu Sharif, KPK
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation - Tamkeen/Jarir Style */}
      <nav style={{backgroundColor: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.08)'}}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 -ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center"
              style={{color: '#0066B3'}}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Logo */}
            <Link to="/" className="shrink-0">
              <img src="/sadaat_header_logo_transparent.png" alt="Sadaat Electrical Store" className="h-12 lg:h-14 w-auto" />
            </Link>

            {/* Categories Button - Desktop */}
            <button className="hidden lg:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors hover:bg-gray-100" style={{color: '#0066B3'}}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              Categories
            </button>

            {/* Search Bar - eXtra/Tamkeen Style */}
            <div className="flex-1 max-w-xl relative hidden md:block">
              <div className="flex items-center rounded-full overflow-hidden" style={{border: '2px solid #e5e7eb', backgroundColor: '#f9fafb'}}>
                <input
                  type="text"
                  placeholder="Search for products, brands, and more..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearch}
                  className="flex-1 px-5 py-2.5 text-sm focus:outline-none bg-transparent"
                  style={{color: '#1a1a1a'}}
                />
                <button 
                  onClick={() => {
                    if (searchTerm.trim()) {
                      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
                      setSearchTerm("");
                    }
                  }}
                  className="px-5 py-2.5 transition-colors hover:opacity-90"
                  style={{backgroundColor: '#0066B3', color: '#ffffff'}}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 lg:gap-4">
              {/* Mobile Search */}
              <button 
                onClick={() => navigate('/products')}
                className="md:hidden p-3 rounded-full hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
                style={{color: '#0066B3'}}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>

              {/* Wishlist */}
              <Link to="/favorites" className="relative p-3 rounded-full hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center" style={{color: '#0066B3'}}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {favCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold" style={{backgroundColor: '#0066B3', color: '#ffffff'}}>
                    {favCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative p-3 rounded-full hover:bg-gray-100 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center" style={{color: '#0066B3'}}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-bold" style={{backgroundColor: '#0066B3', color: '#ffffff'}}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

      </nav>

      {/* Desktop Promo Bar */}
      <div className="hidden lg:block" style={{backgroundColor: '#003D6B', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center h-9 overflow-hidden">
            <div className="marquee-scroll whitespace-nowrap flex items-center">
              <span className="inline-flex items-center gap-6 mx-8 text-[11px] font-medium tracking-wider" style={{color: 'rgba(255,255,255,0.9)'}}>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  100% Genuine Products
                </span>
                <span className="w-1 h-1 rounded-full" style={{backgroundColor: 'rgba(255,255,255,0.4)'}} />
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Best Market Prices
                </span>
                <span className="w-1 h-1 rounded-full" style={{backgroundColor: 'rgba(255,255,255,0.4)'}} />
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Call: +92 342 9619908
                </span>
                <span className="w-1 h-1 rounded-full" style={{backgroundColor: 'rgba(255,255,255,0.4)'}} />
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Saidu Sharif, KPK
                </span>
                <span className="w-1 h-1 rounded-full" style={{backgroundColor: 'rgba(255,255,255,0.4)'}} />
              </span>
              <span className="inline-flex items-center gap-6 mx-8 text-[11px] font-medium tracking-wider" style={{color: 'rgba(255,255,255,0.9)'}}>
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  100% Genuine Products
                </span>
                <span className="w-1 h-1 rounded-full" style={{backgroundColor: 'rgba(255,255,255,0.4)'}} />
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Best Market Prices
                </span>
                <span className="w-1 h-1 rounded-full" style={{backgroundColor: 'rgba(255,255,255,0.4)'}} />
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  Call: +92 342 9619908
                </span>
                <span className="w-1 h-1 rounded-full" style={{backgroundColor: 'rgba(255,255,255,0.4)'}} />
                <span className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Saidu Sharif, KPK
                </span>
                <span className="w-1 h-1 rounded-full" style={{backgroundColor: 'rgba(255,255,255,0.4)'}} />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed inset-x-0 top-16 bottom-0 overflow-hidden transition-all duration-300 bg-white z-50 ${
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="h-full overflow-y-auto p-6">
          {/* Mobile Search */}
          <div className="mb-6">
            <div className="flex items-center rounded-lg overflow-hidden" style={{border: '2px solid #e5e7eb'}}>
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleSearch}
                className="flex-1 px-4 py-3 text-sm focus:outline-none"
              />
              <button className="px-4 py-3" style={{backgroundColor: '#0066B3', color: '#ffffff'}}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Nav Links */}
          <div className="space-y-1">
            <Link to="/products" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-4 text-sm font-medium rounded-lg hover:bg-gray-50" style={{color: '#0A0A0A'}}>
              All Products
            </Link>
            <Link to="/products?category=lighting" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-4 text-sm font-medium rounded-lg hover:bg-gray-50" style={{color: '#4b5563'}}>
              Lighting
            </Link>
            <Link to="/products?category=switches" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-4 text-sm font-medium rounded-lg hover:bg-gray-50" style={{color: '#4b5563'}}>
              Switches & Sockets
            </Link>
            <Link to="/products?category=wiring" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-4 text-sm font-medium rounded-lg hover:bg-gray-50" style={{color: '#4b5563'}}>
              Wiring
            </Link>
            <Link to="/products?category=fans" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-4 text-sm font-medium rounded-lg hover:bg-gray-50" style={{color: '#4b5563'}}>
              Fans
            </Link>
            <Link to="/products?category=appliances" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-4 text-sm font-medium rounded-lg hover:bg-gray-50" style={{color: '#4b5563'}}>
              Home Appliances
            </Link>
            <Link to="/products?category=accessories" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-4 text-sm font-medium rounded-lg hover:bg-gray-50" style={{color: '#4b5563'}}>
              Accessories
            </Link>
          </div>

          <div className="my-4 border-t" style={{borderColor: '#f3f4f6'}} />

          <div className="space-y-1">
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-4 text-sm font-medium rounded-lg hover:bg-gray-50" style={{color: '#0A0A0A'}}>
              About Us
            </Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="block py-3 px-4 text-sm font-medium rounded-lg hover:bg-gray-50" style={{color: '#0A0A0A'}}>
              Contact
            </Link>
          </div>

          {/* Mobile Contact Info */}
          <div className="mt-6 p-4 rounded-lg" style={{backgroundColor: '#E6F2FF'}}>
            <p className="text-xs font-medium mb-2" style={{color: '#6b7280'}}>Need Help?</p>
            <a href="tel:+923429619908" className="flex items-center gap-2 text-sm font-medium" style={{color: '#0066B3'}}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +92 342 9619908
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
