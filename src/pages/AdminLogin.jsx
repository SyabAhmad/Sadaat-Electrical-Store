import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/api";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const data = await login(email, password);
      if (data.error) throw new Error(data.error);
      if (data.user) navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{backgroundColor: '#f8fafc'}}>
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden" style={{background: 'linear-gradient(135deg, #0A0A0A 0%, #111827 100%)'}}>
        <div className="absolute inset-0 opacity-20">
          <img src="/images/split_screen_hero.webp" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full p-12">
          <img src="/sadaat_logo_transparent.png" alt="Sadaat Electrical Store" className="h-24 w-auto mb-8" style={{filter: 'brightness(0) invert(1)'}} />
          <h1 className="text-3xl font-bold text-white text-center mb-3">Sadaat Electrical Store</h1>
          <p className="text-blue-200 text-center text-sm" style={{direction: 'rtl'}}>سادات الیکٹریکل سٹور</p>
          <div className="mt-8 flex items-center gap-6 text-gray-400 text-xs">
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Saidu Sharif, KPK
            </span>
            <span className="w-px h-3" style={{backgroundColor: 'rgba(255,255,255,0.3)'}} />
            <span className="flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +92 342 9619908
            </span>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-10">
            <img src="/sadaat_logo_transparent.png" alt="Sadaat Electrical Store" className="h-14 w-auto mx-auto mb-4" />
            <h1 className="text-xl font-bold tracking-wider uppercase mb-1" style={{color: '#0A0A0A'}}>Admin Portal</h1>
            <p className="text-sm" style={{color: '#6b7280'}}>Sadaat Electrical Store</p>
          </div>

          {/* Desktop Header */}
          <div className="hidden lg:block mb-10">
            <h1 className="text-2xl font-bold mb-2" style={{color: '#0A0A0A'}}>Welcome Back</h1>
            <p className="text-sm" style={{color: '#6b7280'}}>Sign in to manage your store</p>
          </div>

          {error && (
            <div className="flex items-center gap-3 p-4 rounded-lg mb-6" style={{backgroundColor: '#fef2f2', border: '1px solid #fecaca'}}>
              <svg className="w-5 h-5 shrink-0" style={{color: '#ef4444'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="text-sm" style={{color: '#dc2626'}}>{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{color: '#374151'}}>Email Address</label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={{borderColor: '#e5e7eb', backgroundColor: '#ffffff'}}
                  placeholder="admin@sadaatelectricalstore.com"
                  required
                />
                <svg className="absolute right-4 top-3.5 w-4 h-4" style={{color: '#9ca3af'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{color: '#374151'}}>Password</label>
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  style={{borderColor: '#e5e7eb', backgroundColor: '#ffffff'}}
                  placeholder="Enter your password"
                  required
                />
                <svg className="absolute right-4 top-3.5 w-4 h-4" style={{color: '#9ca3af'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-lg text-sm font-bold tracking-wider uppercase transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{backgroundColor: '#0066B3', color: '#ffffff'}}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In
                </>
              )}
            </button>
          </form>

          <button
            onClick={() => navigate("/")}
            className="w-full mt-8 flex items-center justify-center gap-2 text-xs font-medium transition-colors hover:gap-3"
            style={{color: '#6b7280'}}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Store
          </button>
        </div>
      </div>
    </div>
  );
}
