import { useNavigate } from "react-router-dom";
import { trackCheckout } from "../lib/analytics";

export default function Cart({ cart, removeFromCart, updateQuantity }) {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

  const handleCheckout = () => {
    trackCheckout(total, cart.length);
    const siteUrl = window.location.origin;
    const itemsList = cart
      .map((item, i) => {
        const link = item.slug ? `${siteUrl}/product/${item.slug}` : '';
        return `${i + 1}. ${item.name} (Qty: ${item.quantity || 1}) - Rs.${item.price * item.quantity}${link ? '\n   🔗 ' + link : ''}`;
      })
      .join("\n\n");
    const message = `Hi Sadaat, I'd like to order these items. Can I get more info?

📦 *Order:*
${itemsList}

💰 *Total:* Rs.${total}

Please respond, thanks!`;
    window.location.href = `https://wa.me/${import.meta.env.VITE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  if (cart.length === 0) {
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
              Your Selection
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
              Shopping Cart
            </h1>
            <p className="text-base text-gray-400">
              Ready to place your order?
            </p>
          </div>
        </section>

        {/* Empty State */}
        <section className="py-20 lg:py-28">
          <div className="max-w-md mx-auto px-4 text-center">
            <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
              <svg className="w-12 h-12" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{color: '#0A0A0A'}}>Your cart is empty</h2>
            <p className="text-sm mb-8" style={{color: '#6b7280'}}>
              Discover our curated collection and add items you love.
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-8 py-3.5 text-sm font-bold tracking-wider uppercase rounded-lg transition-all hover:scale-105"
              style={{backgroundColor: '#0066B3', color: '#ffffff'}}
            >
              Browse Products
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
            Your Selection
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-3">
            Shopping Cart
          </h1>
          <p className="text-base text-gray-400">
            {cart.length} {cart.length === 1 ? "item" : "items"} ready
          </p>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-10 lg:py-14">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 rounded-xl border transition-all hover:shadow-md" style={{borderColor: '#e5e7eb', backgroundColor: '#ffffff'}}>
                    <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-lg overflow-hidden shrink-0" style={{backgroundColor: '#f3f4f6'}}>
                      <img src={item.mainImage} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between gap-2">
                          <h3 className="text-sm font-semibold truncate" style={{color: '#0A0A0A'}}>{item.name}</h3>
                           <button
                            onClick={() => removeFromCart(item.id)}
                            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-all hover:scale-110"
                            style={{backgroundColor: '#fef2f2'}}
                            title="Remove"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="#ef4444" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-xs capitalize mt-1" style={{color: '#6b7280'}}>{item.category}</p>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <div className="flex items-center rounded-lg" style={{border: '1px solid #e5e7eb'}}>
                          <button
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            className="w-10 h-10 flex items-center justify-center text-sm font-medium hover:bg-gray-50 rounded-l-lg transition-colors"
                            style={{color: '#374151'}}
                          >
                            -
                          </button>
                          <span className="w-11 text-center text-sm font-semibold" style={{color: '#0A0A0A', borderLeft: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb'}}>
                            {item.quantity || 1}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            className="w-10 h-10 flex items-center justify-center text-sm font-medium hover:bg-gray-50 rounded-r-lg transition-colors"
                            style={{color: '#374151'}}
                          >
                            +
                          </button>
                        </div>
                        <span className="text-base font-bold" style={{color: '#0066B3'}}>Rs. {item.price * (item.quantity || 1)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <div className="p-6 rounded-xl border sticky top-24" style={{borderColor: '#e5e7eb', backgroundColor: '#f8fafc'}}>
                <h2 className="text-sm font-bold tracking-wider uppercase mb-5" style={{color: '#0A0A0A'}}>Order Summary</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span style={{color: '#6b7280'}}>Subtotal ({cart.length} items)</span>
                    <span className="font-semibold" style={{color: '#0A0A0A'}}>Rs. {total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span style={{color: '#6b7280'}}>Shipping</span>
                    <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{backgroundColor: 'rgba(0,102,179,0.1)', color: '#0066B3'}}>
                      Call to confirm
                    </span>
                  </div>
                  <div className="border-t pt-3" style={{borderColor: '#e5e7eb'}}>
                    <div className="flex justify-between">
                      <span className="font-semibold" style={{color: '#0A0A0A'}}>Total</span>
                      <span className="text-xl font-bold" style={{color: '#0066B3'}}>Rs. {total}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-4 rounded-xl text-sm font-bold tracking-wider uppercase transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                  style={{backgroundColor: '#25D366', color: '#ffffff'}}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Order via WhatsApp
                </button>

                <p className="text-[10px] text-center mt-3" style={{color: '#9ca3af'}}>
                  Share your location after sending the message
                </p>

                {/* Store Info */}
                <div className="mt-6 pt-5 border-t" style={{borderColor: '#e5e7eb'}}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
                      <svg className="w-5 h-5" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-semibold" style={{color: '#0A0A0A'}}>Prefer to call?</p>
                      <a href="tel:+923429619908" className="text-xs font-medium" style={{color: '#0066B3'}}>+92 342 9619908</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
