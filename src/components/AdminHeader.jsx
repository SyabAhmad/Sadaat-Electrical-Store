import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { logout } from "../lib/api";

const navItems = [
  { path: "/admin/dashboard", label: "Products", icon: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" },
  { path: "/admin/analytics", label: "Analytics", icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" },
  { path: "/admin/reports", label: "Reports", icon: "M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" },
  { path: "/admin/posts", label: "Posts", icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" },
];

export default function AdminHeader({ userEmail }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/admin/login");
  };

  return (
    <header className="sticky top-0 z-50" style={{backgroundColor: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.08)'}}>
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          {/* Mobile menu button */}
          <button onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors">
            <svg className="w-5 h-5" style={{color: '#374151'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <Link to="/" className="flex items-center gap-3">
            <img src="/sadaat_header_logo_transparent.png" alt="Sadaat Electrical Store" className="h-8 w-auto" />
            <div className="hidden sm:block">
              <span className="text-xs font-bold tracking-wider uppercase px-2 py-1 rounded" style={{backgroundColor: 'rgba(0,102,179,0.1)', color: '#0066B3'}}>
                Admin
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(item => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-2 px-3 py-2 text-xs font-medium tracking-wider uppercase rounded-lg transition-all ${
                  location.pathname === item.path
                    ? "text-white"
                    : "hover:bg-gray-100"
                }`}
                style={location.pathname === item.path ? 
                  {backgroundColor: '#0066B3', color: '#ffffff'} : 
                  {color: '#6b7280'}
                }
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 px-3 py-2 rounded-lg" style={{backgroundColor: '#f8fafc'}}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
              <svg className="w-4 h-4" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <span className="text-xs font-medium" style={{color: '#374151'}}>{userEmail}</span>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all hover:bg-red-50" style={{color: '#ef4444'}}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign Out
          </button>
        </div>
      </div>

      {/* Mobile nav dropdown */}
      {menuOpen && (
        <div className="lg:hidden border-t" style={{borderColor: '#e5e7eb', backgroundColor: '#ffffff'}}>
          <div className="px-4 py-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.path}
                onClick={() => { navigate(item.path); setMenuOpen(false); }}
                className={`flex items-center gap-3 w-full px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  location.pathname === item.path
                    ? "text-white"
                    : ""
                }`}
                style={location.pathname === item.path ? 
                  {backgroundColor: '#0066B3', color: '#ffffff'} : 
                  {color: '#374151'}
                }
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                </svg>
                {item.label}
              </button>
            ))}
            <div className="pt-2 mt-2 border-t" style={{borderColor: '#e5e7eb'}}>
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
                  <svg className="w-4 h-4" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="text-xs font-medium" style={{color: '#6b7280'}}>{userEmail}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
