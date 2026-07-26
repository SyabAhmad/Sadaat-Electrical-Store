import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { trackProductView } from "../lib/analytics";
import { fetchProductBySlug } from "../lib/api";

export default function ProductDetail({ products, handleAddToCart, toggleFavorite, favorites }) {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const isFav = product ? favorites.some(f => f.id === product.id) : false;

  useEffect(() => {
    const foundProduct = products.find((p) => p.slug === slug);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.mainImage || "");
      trackProductView(foundProduct.id, foundProduct.name);
    } else if (slug) {
      fetchProductBySlug(slug).then((data) => {
        if (data && !data.error) {
          setProduct(data);
          setSelectedImage(data.mainImage || "");
          trackProductView(data.id, data.name);
        }
      }).catch(() => {});
    }
  }, [slug, products]);

  if (!product) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-8 h-8 border-3 rounded-full animate-spin" style={{borderColor: '#e5e7eb', borderTopColor: '#0066B3'}} />
      </div>
    );
  }

  const handleWhatsAppOrder = () => {
    const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "923429619908";
    const cleanNumber = rawNumber.replace(/\D/g, "");
    const message = `Hi Sadaat, I'm interested in this product. Can I get more info?

*${product.name}*
Rs. ${product.price} x ${quantity} = Rs. ${product.price * quantity}

🔗 ${window.location.href}

Please respond, thanks!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanNumber}?text=${encodedMessage}`, "_blank");
  };

  const related = products
    .filter((p) => p.id !== product.id)
    .sort((a, b) => {
      const sameCat = a.category === product.category ? 0 : 1;
      const bSameCat = b.category === product.category ? 0 : 1;
      return sameCat - bSameCat;
    })
    .slice(0, 4);

  return (
    <div className="min-h-screen" style={{backgroundColor: '#ffffff'}}>
      {/* Breadcrumb */}
      <div className="py-4" style={{borderBottom: '1px solid #f3f4f6'}}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-medium hover:underline inline-flex items-center gap-1 min-h-[44px]"
            style={{color: '#0066B3'}}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square overflow-hidden mb-4 rounded-xl" style={{backgroundColor: '#f3f4f6'}}>
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.thumbnails && product.thumbnails.length > 0 && (
              <div className="grid grid-cols-5 gap-2">
                {[product.mainImage, ...product.thumbnails].filter(Boolean).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all min-h-[44px] ${
                      selectedImage === img ? "border-blue-500" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <span className="text-xs font-bold tracking-[0.2em] uppercase mb-3 block" style={{color: '#0066B3'}}>
              {product.category}
            </span>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold mb-2" style={{color: '#0A0A0A'}}>{product.name}</h1>
                <p className="text-2xl font-bold" style={{color: '#0066B3'}}>Rs. {product.price}</p>
              </div>
              <button onClick={() => toggleFavorite(product)}
                className={`shrink-0 w-11 h-11 flex items-center justify-center border rounded-full transition-all hover:scale-110 ${
                  isFav ? 'bg-red-50 border-red-200' : 'hover:bg-gray-50'
                }`}
                style={isFav ? {color: '#ef4444'} : {borderColor: '#e5e7eb', color: '#9ca3af'}}
                title={isFav ? 'Remove from Wishlist' : 'Add to Wishlist'}>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth={2}>
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {product.description && (
              <p className="text-sm leading-relaxed my-6" style={{color: '#6b7280'}}>{product.description}</p>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="text-xs font-semibold tracking-wider uppercase mb-3 block" style={{color: '#374151'}}>
                Quantity
              </label>
              <div className="inline-flex items-center rounded-lg" style={{border: '1px solid #e5e7eb'}}>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors rounded-l-lg"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-semibold" style={{color: '#0A0A0A', borderLeft: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb'}}>{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center hover:bg-gray-50 transition-colors rounded-r-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={() => handleAddToCart(product)}
                className="flex-1 py-4 rounded-xl text-sm font-bold tracking-wider uppercase transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                style={{backgroundColor: '#0066B3', color: '#ffffff'}}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                Add to Cart
              </button>
              <button
                onClick={handleWhatsAppOrder}
                className="flex-1 py-4 rounded-xl text-sm font-bold tracking-wider uppercase transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                style={{backgroundColor: '#25D366', color: '#ffffff'}}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Order
              </button>
            </div>

            {/* Store Info */}
            <div className="p-4 rounded-xl" style={{backgroundColor: '#f8fafc', border: '1px solid #e5e7eb'}}>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
                  <svg className="w-5 h-5" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{color: '#0A0A0A'}}>Visit our store</p>
                  <p className="text-xs" style={{color: '#6b7280'}}>Saidu Sharif, KPK, Pakistan</p>
                </div>
              </div>
              <a href="tel:+923429619908" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
                  <svg className="w-5 h-5" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold" style={{color: '#0A0A0A'}}>Call to order</p>
                  <p className="text-xs font-medium" style={{color: '#0066B3'}}>+92 342 9619908</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16 lg:mt-20 pt-10 lg:pt-12" style={{borderTop: '1px solid #e5e7eb'}}>
            <h2 className="text-xl font-bold mb-6" style={{color: '#0A0A0A'}}>You Might Also Like</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {related.map((p) => (
                <div
                  key={p.id}
                  className="cursor-pointer group"
                  onClick={() => { navigate(`/product/${p.slug}`); window.scrollTo(0, 0); }}
                >
                  <div className="aspect-[3/4] overflow-hidden mb-3 rounded-lg" style={{backgroundColor: '#f3f4f6'}}>
                    <img src={p.mainImage} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <h3 className="text-sm font-medium truncate" style={{color: '#0A0A0A'}}>{p.name}</h3>
                  <p className="text-sm font-semibold" style={{color: '#0066B3'}}>Rs. {p.price}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
