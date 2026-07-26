import { useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";

export default function Favorites({ favorites, addToCart, removeFromFavorites }) {
  const navigate = useNavigate();

  if (favorites.length === 0) {
    return (
      <div className="min-h-screen" style={{backgroundColor: '#ffffff'}}>
        {/* Hero Section */}
        <section className="relative py-20 lg:py-28 overflow-hidden" style={{background: 'linear-gradient(135deg, #0A0A0A 0%, #111827 100%)'}}>
          <div className="absolute inset-0 opacity-15">
            <img src="/images/luxury_lighting_split_screen.webp" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
          <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
            <span className="inline-block px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full mb-6" style={{backgroundColor: 'rgba(0,102,179,0.2)', color: '#4da6ff'}}>
              Your Collection
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
              Wishlist
            </h1>
            <p className="text-base text-gray-400">
              Save items you love for later
            </p>
          </div>
        </section>

        {/* Empty State */}
        <section className="py-20 lg:py-28">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
              <svg className="w-12 h-12" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{color: '#0A0A0A'}}>Your wishlist is empty</h2>
            <p className="text-sm mb-8" style={{color: '#6b7280'}}>
              Browse our products and save your favorites by clicking the heart icon.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-8 py-3.5 text-sm font-bold tracking-wider uppercase rounded-lg transition-all hover:scale-105"
              style={{backgroundColor: '#0066B3', color: '#ffffff'}}
            >
              Discover Products
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{backgroundColor: '#ffffff'}}>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{background: 'linear-gradient(135deg, #0A0A0A 0%, #111827 100%)'}}>
        <div className="absolute inset-0 opacity-15">
          <img src="/images/luxury_lighting_split_screen.webp" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full mb-6" style={{backgroundColor: 'rgba(0,102,179,0.2)', color: '#4da6ff'}}>
            Your Collection
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
            Wishlist
          </h1>
          <p className="text-base text-gray-400">
            {favorites.length} {favorites.length === 1 ? "item" : "items"} saved
          </p>
        </div>
      </section>

      {/* Actions Bar */}
      <section className="py-4" style={{borderBottom: '1px solid #e5e7eb'}}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" style={{color: '#0066B3'}} fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-sm font-semibold" style={{color: '#0A0A0A'}}>
                {favorites.length} {favorites.length === 1 ? "item" : "items"}
              </span>
            </div>
            <button
              onClick={() => navigate("/products")}
              className="text-xs font-semibold tracking-wider uppercase flex items-center gap-1 hover:gap-2 transition-all"
              style={{color: '#0066B3'}}
            >
              Continue Shopping
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {favorites.map((product) => (
              <div key={product.id} className="group relative">
                <ProductCard product={product} onAddToCart={() => addToCart(product)} />
                <button
                  onClick={() => removeFromFavorites(product.id)}
                  className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center z-10 hover:scale-110 transition-all"
                  style={{backgroundColor: '#ffffff', boxShadow: '0 2px 8px rgba(0,0,0,0.15)'}}
                  title="Remove from wishlist"
                >
                  <svg className="w-4 h-4" fill="none" stroke="#ef4444" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 lg:py-16" style={{backgroundColor: '#f8fafc'}}>
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-3" style={{color: '#0A0A0A'}}>Found what you were looking for?</h2>
          <p className="text-sm mb-8" style={{color: '#6b7280'}}>
            Add more items to your wishlist or proceed to contact us for orders.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate("/products")}
              className="px-8 py-3.5 text-sm font-bold tracking-wider uppercase rounded-lg transition-all hover:scale-105"
              style={{backgroundColor: '#0066B3', color: '#ffffff'}}
            >
              Browse Products
            </button>
            <a
              href="tel:+923429619908"
              className="px-8 py-3.5 text-sm font-bold tracking-wider uppercase rounded-lg border-2 transition-all hover:bg-gray-50 flex items-center gap-2"
              style={{borderColor: '#e5e7eb', color: '#374151'}}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call to Order
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
