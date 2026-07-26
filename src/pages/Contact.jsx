export default function Contact() {
  return (
    <div className="min-h-screen" style={{backgroundColor: '#ffffff'}}>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{background: 'linear-gradient(135deg, #0A0A0A 0%, #111827 100%)'}}>
        <div className="absolute inset-0 opacity-15">
          <img src="/images/split_screen_electrical_wires.webp" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <span className="inline-block px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full mb-6" style={{backgroundColor: 'rgba(0,102,179,0.2)', color: '#4da6ff'}}>
            Get in Touch
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white">
            Contact Us
          </h1>
          <p className="text-base text-gray-400 max-w-xl mx-auto">
            Have questions about our products? Need expert advice? We're here to help you find the right electrical solutions.
          </p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-16 relative z-10">
            {/* Phone Card */}
            <a href="tel:+923429619908" className="group p-6 rounded-2xl bg-white transition-all hover:shadow-xl" style={{boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
                <svg className="w-7 h-7" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold mb-1" style={{color: '#0A0A0A'}}>Call Us</h3>
              <p className="text-sm" style={{color: '#6b7280'}}>+92 342 9619908</p>
            </a>

            {/* WhatsApp Card */}
            <a href="https://wa.me/923429619908" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl bg-white transition-all hover:shadow-xl" style={{boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{backgroundColor: 'rgba(37,211,102,0.1)'}}>
                <svg className="w-7 h-7" fill="#25D366" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold mb-1" style={{color: '#0A0A0A'}}>WhatsApp</h3>
              <p className="text-sm" style={{color: '#6b7280'}}>Chat with us instantly</p>
            </a>

            {/* Visit Card */}
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="group p-6 rounded-2xl bg-white transition-all hover:shadow-xl" style={{boxShadow: '0 4px 20px rgba(0,0,0,0.08)'}}>
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-all group-hover:scale-110" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
                <svg className="w-7 h-7" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold mb-1" style={{color: '#0A0A0A'}}>Visit Store</h3>
              <p className="text-sm" style={{color: '#6b7280'}}>Saidu Sharif, KPK</p>
            </a>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left - Store Info */}
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block" style={{color: '#0066B3'}}>Store Information</span>
              <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{color: '#0A0A0A'}}>Visit Our Store</h2>
              
              <div className="space-y-5 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
                    <svg className="w-5 h-5" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-wider uppercase mb-1" style={{color: '#9ca3af'}}>Location</p>
                    <p className="text-sm font-medium" style={{color: '#0A0A0A'}}>Saidu Sharif, Khyber Pakhtunkhwa, Pakistan</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
                    <svg className="w-5 h-5" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-wider uppercase mb-1" style={{color: '#9ca3af'}}>Phone</p>
                    <a href="tel:+923429619908" className="text-sm font-medium hover:underline" style={{color: '#0066B3'}}>+92 342 9619908</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
                    <svg className="w-5 h-5" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-wider uppercase mb-1" style={{color: '#9ca3af'}}>Email</p>
                    <a href="mailto:sayyadzada@hotmail.com" className="text-sm font-medium hover:underline" style={{color: '#0066B3'}}>sayyadzada@hotmail.com</a>
                  </div>
                </div>
              </div>

              {/* Business Hours */}
              <div className="p-6 rounded-2xl" style={{backgroundColor: '#f8fafc'}}>
                <h3 className="text-sm font-bold mb-4 flex items-center gap-2" style={{color: '#0A0A0A'}}>
                  <svg className="w-4 h-4" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Business Hours
                </h3>
                <div className="space-y-3">
                  {[
                    { day: "Monday - Thursday", hours: "7:00 AM - 7:00 PM", active: true },
                    { day: "Saturday", hours: "7:00 AM - 7:00 PM", active: true },
                    { day: "Friday", hours: "Closed", active: false },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center py-2 border-b last:border-0" style={{borderColor: '#e5e7eb'}}>
                      <span className="text-sm" style={{color: '#6b7280'}}>{item.day}</span>
                      <span className="text-sm font-semibold" style={{color: item.active ? '#0066B3' : '#9ca3af'}}>{item.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - FAQ */}
            <div>
              <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block" style={{color: '#0066B3'}}>FAQ</span>
              <h2 className="text-2xl lg:text-3xl font-bold mb-6" style={{color: '#0A0A0A'}}>Common Questions</h2>
              
              <div className="space-y-4">
                {[
                  { 
                    q: "What products do you sell?", 
                    a: "We offer a complete range of electrical products including light bulbs, LED fixtures, sockets, switches, wires & cables, ceiling fans, exhaust fans, home appliances, and accessories." 
                  },
                  { 
                    q: "Do you offer bulk/wholesale pricing?", 
                    a: "Yes! We offer competitive bulk pricing for contractors, electricians, and businesses. Contact us directly for a custom quote." 
                  },
                  { 
                    q: "Are your products genuine?", 
                    a: "Absolutely. Every product we sell is 100% authentic with official manufacturer warranty. We source directly from authorized distributors." 
                  },
                  { 
                    q: "Can I visit the store?", 
                    a: "Yes! We welcome customers to visit our store in Saidu Sharif, KPK. Come see our products in person and get expert advice from our team." 
                  },
                  { 
                    q: "Do you provide installation services?", 
                    a: "We can recommend trusted electricians in the area for installation services. Ask our staff for more details." 
                  },
                ].map((faq, i) => (
                  <details key={i} className="group p-5 rounded-xl cursor-pointer" style={{backgroundColor: '#f8fafc'}}>
                    <summary className="flex items-center justify-between text-sm font-semibold list-none" style={{color: '#0A0A0A'}}>
                      {faq.q}
                      <svg className="w-5 h-5 shrink-0 ml-4 transition-transform group-open:rotate-180" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </summary>
                    <p className="text-sm leading-relaxed mt-3" style={{color: '#6b7280'}}>{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-12 lg:py-16" style={{backgroundColor: '#f8fafc'}}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase mb-3 block" style={{color: '#0066B3'}}>Find Us</span>
            <h2 className="text-2xl lg:text-3xl font-bold" style={{color: '#0A0A0A'}}>Our Location</h2>
          </div>
          <div className="relative h-[250px] lg:h-[400px] rounded-2xl overflow-hidden" style={{boxShadow: '0 4px 20px rgba(0,0,0,0.1)'}}>
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
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4" style={{color: '#0A0A0A'}}>Ready to Visit?</h2>
          <p className="text-base mb-8 max-w-lg mx-auto" style={{color: '#6b7280'}}>
            Drop by our store or give us a call. We're always happy to help you find the perfect electrical products.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="tel:+923429619908"
              className="px-8 py-3.5 text-sm font-bold tracking-wider uppercase rounded-lg transition-all hover:scale-105 flex items-center gap-2"
              style={{backgroundColor: '#0066B3', color: '#ffffff'}}
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
