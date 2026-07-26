export default function About() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#ffffff'}}>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{background: 'linear-gradient(135deg, #0A0A0A 0%, #111827 100%)'}}>
        <div className="absolute inset-0 opacity-20">
          <img src="/images/split_screen_hero.webp" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <span className="inline-block px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full mb-6" style={{backgroundColor: 'rgba(0,102,179,0.2)', color: '#4da6ff'}}>
                Est. Since 2021
              </span>
              <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-white leading-tight">
                Sadaat Electrical Store
              </h1>
              <p className="text-lg text-blue-200 mb-2 font-medium" style={{direction: 'rtl'}}>
                سادات الیکٹریکل سٹور
              </p>
              <p className="text-base text-gray-400 max-w-lg mx-auto lg:mx-0">
                Your trusted neighborhood electrical store in Saidu Sharif, serving homes and businesses with quality products since 2021.
              </p>
            </div>
            <div className="shrink-0">
              <img src="/sadaat_logo_transparent.png" alt="Sadaat Electrical Store" className="h-32 lg:h-40 w-auto" style={{filter: 'brightness(0) invert(1)'}} />
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block" style={{color: '#0066B3'}}>What We Do</span>
            <h2 className="text-2xl lg:text-3xl font-bold" style={{color: '#0A0A0A'}}>Meeting All Your Electrical Needs</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-base leading-relaxed" style={{color: '#4b5563'}}>
                We are here to meet all your electrical items needs — from light bulbs and LED fixtures to sockets, switches, wires, fans, and home appliances. Whether you're building a new home, renovating, or just need a simple repair, we've got you covered.
              </p>
              <p className="text-base leading-relaxed" style={{color: '#4b5563'}}>
                As a trusted local store in Saidu Sharif, we take pride in offering genuine products at fair prices with personal customer service that big retailers can't match.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                {["Light Bulbs", "LED Fixtures", "Sockets", "Switches", "Wires & Cables", "Fans", "Home Appliances"].map((item, i) => (
                  <span key={i} className="px-4 py-2 text-xs font-semibold rounded-full" style={{backgroundColor: 'rgba(0,102,179,0.08)', color: '#0066B3'}}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="relative">
              <img src="/images/laundry_room_split_screen.webp" alt="Our Store" className="rounded-2xl w-full h-[300px] lg:h-[350px] object-cover" />
              <div className="absolute bottom-4 left-4 lg:bottom-[-24px] lg:left-[-24px] p-4 lg:p-5 rounded-xl shadow-lg" style={{backgroundColor: '#0066B3'}}>
                <p className="text-2xl lg:text-3xl font-bold text-white">5+</p>
                <p className="text-[10px] lg:text-xs text-blue-100 font-medium">Years Serving</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories We Serve */}
      <section className="py-16 lg:py-20" style={{backgroundColor: '#f8fafc'}}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block" style={{color: '#0066B3'}}>Our Products</span>
            <h2 className="text-2xl lg:text-3xl font-bold" style={{color: '#0A0A0A'}}>Everything Electrical, One Place</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { name: 'Lighting', image: '/images/led_split_screen_poster.webp' },
              { name: 'Switches', image: '/images/switches_bedroom_split_screen.webp' },
              { name: 'Wiring', image: '/images/copper_wire_split_screen.webp' },
              { name: 'Fans', image: '/images/split_screen_fan_poster.webp' },
              { name: 'Appliances', image: '/images/split_screen_heating_appliances_bathroom.webp' },
              { name: 'Accessories', image: '/images/pvc_conduit_split_screen.webp' },
            ].map((cat, i) => (
              <div key={i} className="relative overflow-hidden rounded-xl group cursor-pointer aspect-square">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3 text-center">
                  <p className="text-sm font-bold text-white">{cat.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Review */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block" style={{color: '#0066B3'}}>Testimonials</span>
            <h2 className="text-2xl lg:text-3xl font-bold" style={{color: '#0A0A0A'}}>What Our Customers Say</h2>
          </div>
          <div className="relative p-8 lg:p-12 rounded-2xl" style={{backgroundColor: '#f8fafc'}}>
            <svg className="absolute top-6 left-6 w-12 h-12 opacity-10" style={{color: '#0066B3'}} fill="currentColor" viewBox="0 0 24 24">
              <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151C7.563 6.068 6 8.789 6 11h4v10H0z" />
            </svg>
            <div className="relative z-10">
              <div className="flex items-center gap-1 mb-4">
                {[1,2,3,4,5].map((star) => (
                  <svg key={star} className="w-5 h-5" fill="#fbbf24" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <p className="text-lg lg:text-xl italic mb-6" style={{color: '#374151'}}>
                "I recommend to everyone... find your everything with Sadaat Electrical Store. Great products, great prices, and amazing service!"
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white" style={{backgroundColor: '#0066B3'}}>
                  UK
                </div>
                <div>
                  <p className="font-bold" style={{color: '#0A0A0A'}}>Usman Khan</p>
                  <p className="text-xs" style={{color: '#6b7280'}}>Verified Customer</p>
                </div>
                <div className="ml-auto">
                  <svg className="w-8 h-8" fill="#1877F2" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 lg:py-20" style={{backgroundColor: '#f8fafc'}}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block" style={{color: '#0066B3'}}>Why Us</span>
            <h2 className="text-2xl lg:text-3xl font-bold" style={{color: '#0A0A0A'}}>The Sadaat Difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "In-Store Shopping", 
                desc: "Visit our store, see products firsthand, and get expert advice from our knowledgeable staff. Touch, feel, and choose with confidence.",
                icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              },
              { 
                title: "Genuine Products", 
                desc: "Every product we sell is 100% authentic with official manufacturer warranty. No knockoffs, no compromises on quality.",
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              },
              { 
                title: "Best Market Prices", 
                desc: "Competitive pricing on all products. We offer the best deals in town with special discounts for bulk and wholesale orders.",
                icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              },
            ].map((value, i) => (
              <div key={i} className="text-center p-8 rounded-2xl bg-white transition-all hover:shadow-xl" style={{boxShadow: '0 1px 3px rgba(0,0,0,0.05)'}}>
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
                  <svg className="w-8 h-8" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={value.icon} />
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3" style={{color: '#0A0A0A'}}>{value.title}</h3>
                <p className="text-sm leading-relaxed" style={{color: '#6b7280'}}>{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Store CTA */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl" style={{background: 'linear-gradient(135deg, #0066B3 0%, #003D6B 100%)'}}>
            <div className="absolute inset-0 opacity-10">
              <img src="/images/copper_wire_split_screen.webp" alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative p-8 lg:p-16 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">Visit Our Store Today</h2>
              <p className="text-base text-blue-100 mb-8 max-w-xl mx-auto">
                Come see our full range of electrical products in person. Our friendly staff is ready to help you find exactly what you need.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <div className="flex items-center gap-2 text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm">Saidu Sharif, KPK</span>
                </div>
                <div className="hidden sm:block w-1 h-1 rounded-full bg-blue-300" />
                <div className="flex items-center gap-2 text-white">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">Mon-Sat: 7AM - 7PM (Fri Closed)</span>
                </div>
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="tel:+923429619908"
                  className="px-8 py-3.5 text-sm font-bold tracking-wider uppercase rounded-lg bg-white transition-all hover:scale-105 flex items-center gap-2"
                  style={{color: '#0066B3'}}
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
                  className="px-8 py-3.5 text-sm font-bold tracking-wider uppercase rounded-lg bg-green-500 text-white transition-all hover:scale-105 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
