import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";

export default function Home({ products, categories, handleAddToCart, productStats = {}, toggleFavorite, favorites }) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const heroSlides = [
    {
      title: "Quality Electrical Products",
      subtitle: "Trusted brands for your home and business",
      titleUrdu: "اعلیٰ معیار کے الیکٹریکل پروڈکٹس",
      subtitleUrdu: "آپ کے گھر اور کاروبار کے لیے قابل اعتماد برانڈز",
      cta: "Shop Now",
      image: "/images/split_screen_hero.webp"
    },
    {
      title: "LED Lighting Solutions",
      subtitle: "Illuminate your space with premium fixtures",
      titleUrdu: "ایل ای ڈی لائٹنگ حل",
      subtitleUrdu: "پریمیم فکسچرز کے ساتھ اپنی جگہ کو روشن کریں",
      cta: "Explore Lighting",
      image: "/images/led_split_screen_poster.webp"
    },
    {
      title: "Smart Switches & Wiring",
      subtitle: "Modern switches, sockets & wiring solutions",
      titleUrdu: "سمارٹ سوئچز اور وائرنگ",
      subtitleUrdu: "جدید سوئچز، ساکٹس اور وائرنگ حل",
      cta: "Discover More",
      image: "/images/switches_bedroom_split_screen.webp"
    }
  ];

  // Auto-rotate hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const trustFeatures = [
    { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Genuine Products", desc: "100% authentic warranty" },
    { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "Best Prices", desc: "Competitive market rates" },
    { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", title: "Easy Payment", desc: "Cash & bank transfer" },
    { icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z", title: "Expert Support", desc: "Call: +92 342 9619908" },
  ];

  const categoryIcons = {
    lighting: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    switches: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
    wiring: "M13 10V3L4 14h7v7l9-11h-7z",
    fans: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15",
    appliances: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
    accessories: "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
  };

  return (
    <div className="min-h-screen" style={{backgroundColor: '#fafafa'}}>
      {/* Hero Carousel */}
      <section className="relative" style={{backgroundColor: '#0A0A0A'}}>
        <div className="relative overflow-hidden" style={{height: 'clamp(300px, 50vw, 550px)'}}>
          {/* Slides */}
          <div 
            className="flex transition-transform duration-700 ease-in-out h-full"
            style={{transform: `translateX(-${currentSlide * 100}%)`}}
          >
            {heroSlides.map((slide, i) => (
              <div key={i} className="min-w-full h-full relative">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/40 transition-all"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Slide indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2.5 rounded-full transition-all min-w-[44px] min-h-[44px] flex items-center justify-center`}
                aria-label={`Go to slide ${i + 1}`}
              >
                <span className={`block h-1.5 rounded-full transition-all ${currentSlide === i ? 'w-8' : 'w-2'}`}
                  style={{backgroundColor: currentSlide === i ? '#ffffff' : 'rgba(255,255,255,0.5)'}}
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Text Content Below Hero */}
      <div className="w-full" style={{backgroundColor: '#ffffff'}}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 pt-12 lg:pt-16 pb-8 lg:pb-10">
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-5 py-2 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full mb-6" style={{backgroundColor: 'rgba(0,102,179,0.08)', color: '#0066B3'}}>
              Sadaat Electrical Store
            </span>
          </div>
        </div>

        {/* Marquee - Full Width */}
        <div className="overflow-hidden py-6" style={{backgroundColor: '#f8fafc'}}>
          <div className="marquee-scroll flex">
            {[...heroSlides, ...heroSlides, ...heroSlides, ...heroSlides, ...heroSlides, ...heroSlides].map((slide, i) => (
              <div key={i} className="shrink-0 px-10 lg:px-14 text-center">
                <div className="text-xl lg:text-3xl font-bold whitespace-nowrap" style={{color: '#0A0A0A'}}>{slide.title}</div>
                <div className="text-xs lg:text-sm whitespace-nowrap mt-2" style={{color: '#6b7280'}}>{slide.subtitle}</div>
                <div className="w-8 h-px mx-auto my-4" style={{backgroundColor: '#d1d5db'}} />
                <div className="text-xl lg:text-3xl font-bold whitespace-nowrap" style={{color: '#0A0A0A', fontFamily: 'serif'}}>{slide.titleUrdu}</div>
                <div className="text-xs lg:text-sm whitespace-nowrap mt-2" style={{color: '#6b7280', fontFamily: 'serif'}}>{slide.subtitleUrdu}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-8 lg:py-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => navigate('/products')}
                className="px-8 py-3.5 text-sm font-bold tracking-wider uppercase rounded-lg transition-all hover:scale-105"
                style={{backgroundColor: '#0066B3', color: '#ffffff'}}
              >
                Shop Now
              </button>
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-3.5 text-sm font-bold tracking-wider uppercase rounded-lg border-2 transition-all hover:bg-gray-50"
                style={{borderColor: '#e5e7eb', color: '#374151'}}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Bar */}
      <section className="border-b" style={{borderColor: '#e5e7eb', backgroundColor: '#ffffff'}}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 divide-x" style={{borderColor: '#f3f4f6'}}>
            {trustFeatures.map((feature, i) => (
              <div key={i} className="flex items-center gap-3 py-5 px-4 lg:px-6">
                <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
                  <svg className="w-5 h-5" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={feature.icon} />
                  </svg>
                </div>
                <div>
                  <h4 className="text-xs font-bold tracking-wide" style={{color: '#0A0A0A'}}>{feature.title}</h4>
                  <p className="text-[10px] mt-0.5" style={{color: '#6b7280'}}>{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories - Tamkeen Style */}
      <section className="py-12 lg:py-16" style={{backgroundColor: '#ffffff'}}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl lg:text-2xl font-bold" style={{color: '#0A0A0A'}}>Shop by Category</h2>
              <p className="text-sm mt-1" style={{color: '#6b7280'}}>Browse our wide range of electrical products</p>
            </div>
            <button
              onClick={() => navigate('/products')}
              className="text-xs font-bold tracking-wider uppercase flex items-center gap-1 hover:gap-2 transition-all"
              style={{color: '#0066B3'}}
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'Lighting', slug: 'lighting', image: '/images/led_split_screen_poster.webp' },
              { name: 'Switches', slug: 'switches', image: '/images/switches_bedroom_split_screen.webp' },
              { name: 'Wiring', slug: 'wiring', image: '/images/copper_wire_split_screen.webp' },
              { name: 'Fans', slug: 'fans', image: '/images/split_screen_fan_poster.webp' },
              { name: 'Appliances', slug: 'appliances', image: '/images/split_screen_heating_appliances_bathroom.webp' },
              { name: 'Accessories', slug: 'accessories', image: '/images/pvc_conduit_split_screen.webp' },
            ].map((cat, i) => (
              <button
                key={i}
                onClick={() => navigate(`/products?category=${cat.slug}`)}
                className="group relative overflow-hidden rounded-xl transition-all hover:shadow-lg hover:-translate-y-1 aspect-square"
              >
                <img 
                  src={cat.image} 
                  alt={cat.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="text-xs font-bold text-white tracking-wider uppercase">{cat.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Jarir Style */}
      {products && products.length > 0 && (
        <section className="py-12 lg:py-16" style={{backgroundColor: '#f9fafb'}}>
          <div className="max-w-7xl mx-auto px-4 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl lg:text-2xl font-bold" style={{color: '#0A0A0A'}}>Featured Products</h2>
                <p className="text-sm mt-1" style={{color: '#6b7280'}}>Handpicked for quality and value</p>
              </div>
              <button
                onClick={() => navigate('/products')}
                className="text-xs font-bold tracking-wider uppercase flex items-center gap-1 hover:gap-2 transition-all"
                style={{color: '#0066B3'}}
              >
                View All
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {products.slice(0, 4).map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  className="group bg-white rounded-xl overflow-hidden cursor-pointer transition-all hover:shadow-xl hover:-translate-y-1"
                  style={{boxShadow: '0 1px 3px rgba(0,0,0,0.1)'}}
                >
                  {/* Image */}
                  <div className="relative aspect-square bg-gray-50 overflow-hidden">
                    <img
                      src={product.mainImage}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Wishlist button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(product);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110"
                      style={{boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}
                    >
                      <svg className="w-4 h-4" fill={favorites?.some(f => f.id === product.id) ? "#ef4444" : "none"} stroke={favorites?.some(f => f.id === product.id) ? "#ef4444" : "#6b7280"} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <span className="text-[10px] font-medium tracking-wider uppercase" style={{color: '#9ca3af'}}>
                      {product.category}
                    </span>
                    <h3 className="text-sm font-semibold mt-1 line-clamp-2 group-hover:text-[#0066B3] transition-colors" style={{color: '#111827'}}>
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-lg font-bold" style={{color: '#0066B3'}}>
                        Rs. {product.price}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="w-full mt-3 py-2.5 text-xs font-bold tracking-wider uppercase rounded-lg transition-all hover:opacity-90"
                      style={{backgroundColor: '#0066B3', color: '#0A0A0A'}}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Promo Banners */}
      <section className="py-12 lg:py-16" style={{backgroundColor: '#ffffff'}}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Banner 1 - Lighting */}
            <div 
              className="relative overflow-hidden rounded-2xl p-8 lg:p-12 min-h-[280px] flex items-center cursor-pointer group"
              onClick={() => navigate('/products?category=lighting')}
            >
              <img 
                src="/images/led_split_screen_poster.webp" 
                alt="LED Lighting" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div className="relative z-10">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block text-blue-400">Limited Offer</span>
                <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-white">Up to 20% Off</h3>
                <p className="text-sm mb-6 text-white/70">On premium lighting solutions</p>
                <span className="px-6 py-2.5 text-xs font-bold tracking-wider uppercase rounded-lg transition-all hover:scale-105 inline-block bg-blue-600 text-white">
                  Shop Lighting
                </span>
              </div>
            </div>

            {/* Banner 2 - Wiring */}
            <div 
              className="relative overflow-hidden rounded-2xl p-8 lg:p-12 min-h-[280px] flex items-center cursor-pointer group"
              onClick={() => navigate('/products?category=wiring')}
            >
              <img 
                src="/images/copper_wire_split_screen.webp" 
                alt="Copper Wiring" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
              <div className="relative z-10">
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block text-blue-400">Premium Quality</span>
                <h3 className="text-2xl lg:text-3xl font-bold mb-2 text-white">Copper Wiring</h3>
                <p className="text-sm mb-6 text-white/70">ISI certified wires for safe installations</p>
                <span className="px-6 py-2.5 text-xs font-bold tracking-wider uppercase rounded-lg transition-all hover:scale-105 inline-block bg-blue-600 text-white">
                  Shop Now
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Summer Season Section */}
      <section className="py-12 lg:py-16" style={{background: 'linear-gradient(135deg, #0EA5E9 0%, #0284C7 50%, #0369A1 100%)'}}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
            {/* Left Content */}
            <div className="flex-1 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6" style={{backgroundColor: 'rgba(255,255,255,0.2)'}}>
                <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zm11.894-4.308a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
                <span className="text-xs font-bold text-white tracking-wider uppercase">Summer Collection 2026</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Beat the Heat This Summer</h2>
              <p className="text-base text-white/80 mb-8 max-w-lg mx-auto lg:mx-0">
                Stay cool with our premium range of fans, cooling solutions, and energy-efficient appliances. Special summer discounts on bestsellers!
              </p>
              <button
                onClick={() => navigate('/products?category=fans')}
                className="px-8 py-3.5 text-sm font-bold tracking-wider uppercase rounded-lg transition-all hover:scale-105 bg-white text-sky-600 hover:bg-gray-100"
              >
                Shop Summer Deals
              </button>
            </div>

            {/* Right - Product Grid */}
            <div className="flex-1 w-full">
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Ceiling Fans', image: '/images/split_screen_fan_poster.webp', discount: '15% OFF' },
                  { name: 'Exhaust Fans', image: '/images/split_screen_heating_appliances_bathroom.webp', discount: '10% OFF' },
                  { name: 'LED Lights', image: '/images/led_split_screen_poster.webp', discount: '20% OFF' },
                  { name: 'Smart Switches', image: '/images/switches_bedroom_split_screen.webp', discount: '12% OFF' },
                ].map((item, i) => (
                  <div 
                    key={i} 
                    onClick={() => navigate('/products')}
                    className="relative overflow-hidden rounded-xl cursor-pointer group aspect-square"
                  >
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wider uppercase bg-red-500 text-white">
                      {item.discount}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <p className="text-sm font-bold text-white">{item.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banners Grid */}
      <section className="py-12 lg:py-16" style={{backgroundColor: '#ffffff'}}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block" style={{color: '#0066B3'}}>Featured Collections</span>
            <h2 className="text-2xl lg:text-3xl font-bold" style={{color: '#0A0A0A'}}>Explore Our Range</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Solar Solutions */}
            <div 
              onClick={() => navigate('/products?category=appliances')}
              className="relative overflow-hidden rounded-2xl min-h-[320px] flex items-end cursor-pointer group"
            >
              <img 
                src="/images/solar_split_screen.webp" 
                alt="Solar Solutions" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 p-6 w-full">
                <span className="text-[10px] font-bold tracking-wider uppercase text-green-400 mb-2 block">New Arrival</span>
                <h3 className="text-xl font-bold text-white mb-1">Solar Solutions</h3>
                <p className="text-xs text-white/70 mb-3">Energy efficient solar panels & inverters</p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-white group-hover:gap-2 transition-all">
                  Shop Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Luxury Lighting */}
            <div 
              onClick={() => navigate('/products?category=lighting')}
              className="relative overflow-hidden rounded-2xl min-h-[320px] flex items-end cursor-pointer group"
            >
              <img 
                src="/images/luxury_lighting_split_screen.webp" 
                alt="Luxury Lighting" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 p-6 w-full">
                <span className="text-[10px] font-bold tracking-wider uppercase text-yellow-400 mb-2 block">Premium</span>
                <h3 className="text-xl font-bold text-white mb-1">Luxury Lighting</h3>
                <p className="text-xs text-white/70 mb-3">Designer chandeliers & modern fixtures</p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-white group-hover:gap-2 transition-all">
                  Shop Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>

            {/* Electrical Components */}
            <div 
              onClick={() => navigate('/products?category=accessories')}
              className="relative overflow-hidden rounded-2xl min-h-[320px] flex items-end cursor-pointer group"
            >
              <img 
                src="/images/electrical_components_ceiling_split.webp" 
                alt="Electrical Components" 
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 p-6 w-full">
                <span className="text-[10px] font-bold tracking-wider uppercase text-blue-400 mb-2 block">Essentials</span>
                <h3 className="text-xl font-bold text-white mb-1">Electrical Components</h3>
                <p className="text-xs text-white/70 mb-3">Ceiling fans, junction boxes & more</p>
                <span className="inline-flex items-center gap-1 text-xs font-bold text-white group-hover:gap-2 transition-all">
                  Shop Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full Width Promo Banner */}
      <section className="relative overflow-hidden cursor-pointer group" onClick={() => navigate('/products?category=switches')} style={{minHeight: '300px'}}>
        <img 
          src="/images/split_screen_electrical_poster.webp" 
          alt="Premium Electrical" 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 py-16 lg:py-20 flex items-center" style={{minHeight: '300px'}}>
          <div className="max-w-lg">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block text-blue-400">Limited Time Offer</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3">Premium Switches & Sockets</h2>
            <p className="text-sm text-white/70 mb-6">Upgrade your home with our collection of modern, touch-sensitive switches and sockets. Available in multiple finishes.</p>
            <div className="flex flex-wrap gap-3">
              <span className="px-6 py-3 text-xs font-bold tracking-wider uppercase rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors">
                Shop Switches
              </span>
              <span className="px-6 py-3 text-xs font-bold tracking-wider uppercase rounded-lg border border-white/30 text-white hover:bg-white/10 transition-colors">
                View Catalog
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-12 lg:py-16" style={{backgroundColor: '#f9fafb'}}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-xl lg:text-2xl font-bold" style={{color: '#0A0A0A'}}>Why Choose Us</h2>
            <p className="text-sm mt-2" style={{color: '#6b7280'}}>Trusted by customers across Pakistan</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Genuine Products", desc: "100% authentic from authorized dealers", icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" },
              { title: "Best Prices", desc: "Competitive market rates guaranteed", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
              { title: "Fast Delivery", desc: "Nationwide shipping within 3-5 days", icon: "M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" },
              { title: "Expert Support", desc: "Professional guidance for your needs", icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" },
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-white" style={{boxShadow: '0 1px 3px rgba(0,0,0,0.08)'}}>
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
                  <svg className="w-7 h-7" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                  </svg>
                </div>
                <h3 className="text-sm font-bold mb-1" style={{color: '#0A0A0A'}}>{item.title}</h3>
                <p className="text-xs" style={{color: '#6b7280'}}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Our Store */}
      <section className="py-12 lg:py-16" style={{backgroundColor: '#ffffff'}}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block" style={{color: '#0066B3'}}>Visit Us</span>
              <h2 className="text-2xl lg:text-3xl font-bold mb-4" style={{color: '#0A0A0A'}}>Come Visit Our Store</h2>
              <p className="text-sm leading-relaxed mb-6" style={{color: '#6b7280'}}>
                Visit our store in Saidu Sharif to explore our wide range of electrical products. Our expert team is ready to help you find the right solutions.
              </p>
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
                    <svg className="w-5 h-5" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{color: '#0A0A0A'}}>Location</p>
                    <p className="text-xs" style={{color: '#6b7280'}}>Saidu Sharif, Khyber Pakhtunkhwa</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
                    <svg className="w-5 h-5" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{color: '#0A0A0A'}}>Call Us</p>
                    <p className="text-xs" style={{color: '#6b7280'}}>+92 342 9619908</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
                    <svg className="w-5 h-5" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{color: '#0A0A0A'}}>Store Hours</p>
                    <p className="text-xs" style={{color: '#6b7280'}}>Mon-Sat: 7AM - 7PM (Fri Closed)</p>
                  </div>
                </div>
              </div>
              <a
                href="tel:+923429619908"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold tracking-wider uppercase rounded-lg transition-all hover:scale-105"
                style={{backgroundColor: '#0066B3', color: '#ffffff'}}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
            </div>
            
            <div className="relative h-[350px] lg:h-[400px] rounded-2xl overflow-hidden bg-gray-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13605435.82338966!2d60.93428445!3d30.375321!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38db52d2f3d59673%3A0x7f7409cf6da3f30f!2sPakistan!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Store Location"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Partners */}
      <section className="py-12 lg:py-16" style={{backgroundColor: '#ffffff'}}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-8">
          <div className="text-center">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block" style={{color: '#0066B3'}}>Our Partners</span>
            <h2 className="text-2xl lg:text-3xl font-bold" style={{color: '#0A0A0A'}}>Trusted By Leading Brands</h2>
          </div>
        </div>
        <div className="overflow-hidden py-4" style={{borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb'}}>
          <div className="marquee-scroll whitespace-nowrap flex items-center">
            {[1,2,3,4,5,6,1,2,3,4,5,6].map((num, i) => (
              <div key={i} className="inline-flex items-center justify-center mx-8 lg:mx-12 shrink-0" style={{height: '60px'}}>
                <img 
                  src="/sadaat_header_logo_transparent.png" 
                  alt="Partner" 
                  className="h-10 w-auto opacity-40 hover:opacity-70 transition-opacity"
                  style={{filter: 'grayscale(100%)'}}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Most Sold Products */}
      {(() => {
        const mostSold = useMemo(() => {
          if (!products || products.length === 0) return [];
          if (productStats && Object.keys(productStats).length > 0) {
            return Object.entries(productStats)
              .map(([id, stats]) => {
                const product = products.find(p => p.id === id);
                return product ? { ...product, cartAdds: stats.cartAdds || 0, views: stats.views || 0 } : null;
              })
              .filter(Boolean)
              .sort((a, b) => b.cartAdds - a.cartAdds)
              .slice(0, 8);
          }
          const shuffled = [...products].sort(() => Math.random() - 0.5);
          return shuffled.slice(0, 8);
        }, [products, productStats]);

        if (mostSold.length === 0) return null;

        return (
          <section className="py-12 lg:py-16" style={{backgroundColor: '#f9fafb'}}>
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-2 block" style={{color: '#0066B3'}}>Popular Items</span>
                  <h2 className="text-2xl lg:text-3xl font-bold" style={{color: '#0A0A0A'}}>Most Sold Products</h2>
                </div>
                <button
                  onClick={() => navigate('/products')}
                  className="text-xs font-semibold tracking-wider uppercase flex items-center gap-1 hover:gap-2 transition-all min-h-[44px]"
                  style={{color: '#0066B3'}}
                >
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {mostSold.map((product) => (
                  <div
                    key={product.id}
                    className="group cursor-pointer"
                    onClick={() => { navigate(`/product/${product.id}`); window.scrollTo(0, 0); }}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden mb-3 rounded-xl" style={{backgroundColor: '#f3f4f6'}}>
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      {product.cartAdds > 0 && (
                        <span className="absolute top-3 left-3 px-3 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full" style={{backgroundColor: '#0066B3', color: '#ffffff'}}>
                          Best Seller
                        </span>
                      )}
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleFavorite(product); }}
                        className="absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                        style={{backgroundColor: 'rgba(255,255,255,0.9)', boxShadow: '0 2px 8px rgba(0,0,0,0.1)'}}
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill={favorites?.some(f => f.id === product.id) ? "#ef4444" : "none"} stroke={favorites?.some(f => f.id === product.id) ? "#ef4444" : "#6b7280"} strokeWidth={2}>
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>
                    <h3 className="text-sm font-medium truncate mb-1" style={{color: '#0A0A0A'}}>{product.name}</h3>
                    <p className="text-sm font-bold" style={{color: '#0066B3'}}>Rs. {product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* CTA Section */}
      <section className="py-16 lg:py-20" style={{background: 'linear-gradient(135deg, #0A0A0A 0%, #1a1a1a 100%)'}}>
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4 block" style={{color: '#0066B3'}}>Get in Touch</span>
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{color: '#0066B3'}}>Ready to Power Up?</h2>
          <p className="text-sm mb-8 max-w-lg mx-auto" style={{color: 'rgba(0,102,179,0.7)'}}>
            Whether you're renovating your home or setting up a new office, we have the right electrical solutions for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+923429619908"
              className="px-8 py-3.5 text-sm font-bold tracking-wider uppercase rounded-lg transition-all hover:scale-105 flex items-center gap-2"
              style={{backgroundColor: '#0066B3', color: '#0A0A0A'}}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call Now
            </a>
            <a
              href="https://wa.me/923429619908"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3.5 text-sm font-bold tracking-wider uppercase rounded-lg transition-all hover:scale-105 flex items-center gap-2"
              style={{backgroundColor: '#25D366', color: '#ffffff'}}
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
