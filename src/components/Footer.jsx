import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{backgroundColor: '#0A0A0A'}}>
      {/* Trust Bar - eXtra Style */}
      <div style={{backgroundColor: '#111111', borderBottom: '1px solid rgba(0,102,179,0.1)'}}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-5 divide-x" style={{borderColor: 'rgba(255,255,255,0.05)'}}>
            {[
              { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "Genuine Products", desc: "100% Authentic" },
              { icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z", title: "Fast Delivery", desc: "3-5 Days Nationwide" },
              { icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z", title: "Cash on Delivery", desc: "Pay When You Receive" },
              { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "Warranty", desc: "Official Manufacturer" },
              { icon: "M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z", title: "Expert Support", desc: "Call: +92 342 9619908" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 py-5 px-4">
                <svg className="w-5 h-5 shrink-0" style={{color: '#4da6ff'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                </svg>
                <div>
                  <p className="text-xs font-semibold" style={{color: '#ffffff'}}>{item.title}</p>
                  <p className="text-[10px] mt-0.5" style={{color: 'rgba(255,255,255,0.5)'}}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link to="/" className="mb-4 block">
              <img src="/sadaat_logo_transparent.png" alt="Sadaat Electrical Store" className="h-20 w-auto" style={{filter: 'brightness(0) invert(1)'}} />
            </Link>
            <p className="text-sm leading-relaxed mb-6" style={{color: 'rgba(255,255,255,0.5)'}}>
              Your trusted partner for quality electrical products. Serving homes and businesses across Pakistan with reliable solutions.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="https://www.facebook.com/SadaatElectricalStore"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{backgroundColor: 'rgba(0,102,179,0.2)', color: '#4da6ff'}}
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://wa.me/923429619908"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:scale-110"
                style={{backgroundColor: 'rgba(37,211,102,0.2)', color: '#25D366'}}
                aria-label="WhatsApp"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-6" style={{color: '#4da6ff'}}>Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'All Products', path: '/products' },
                { name: 'Lighting', path: '/products?category=lighting' },
                { name: 'Switches & Sockets', path: '/products?category=switches' },
                { name: 'Wiring', path: '/products?category=wiring' },
                { name: 'Fans', path: '/products?category=fans' },
                { name: 'Home Appliances', path: '/products?category=appliances' },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-sm transition-colors hover:text-[#4da6ff]" style={{color: 'rgba(255,255,255,0.6)'}}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-6" style={{color: '#4da6ff'}}>Company</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', path: '/about' },
                { name: 'Contact', path: '/contact' },
                { name: 'Blog', path: '/blog' },
                { name: 'Privacy Policy', path: '#' },
                { name: 'Terms & Conditions', path: '#' },
              ].map((link, i) => (
                <li key={i}>
                  <Link to={link.path} className="text-sm transition-colors hover:text-[#4da6ff]" style={{color: 'rgba(255,255,255,0.6)'}}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs font-bold tracking-widest uppercase mb-6" style={{color: '#4da6ff'}}>Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0" style={{color: '#4da6ff'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <div>
                  <p className="text-sm" style={{color: 'rgba(255,255,255,0.6)'}}>Saidu Sharif, Khyber Pakhtunkhwa</p>
                  <p className="text-sm" style={{color: 'rgba(255,255,255,0.6)'}}>Pakistan</p>
                </div>
              </div>
              
              <a href="tel:+923429619908" className="flex items-center gap-3 transition-colors hover:text-[#4da6ff]" style={{color: 'rgba(255,255,255,0.6)'}}>
                <svg className="w-5 h-5 shrink-0" style={{color: '#4da6ff'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm">+92 342 9619908</span>
              </a>
              
              <a href="mailto:sayyadzada@hotmail.com" className="flex items-center gap-3 transition-colors hover:text-[#4da6ff]" style={{color: 'rgba(255,255,255,0.6)'}}>
                <svg className="w-5 h-5 shrink-0" style={{color: '#4da6ff'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm">sayyadzada@hotmail.com</span>
              </a>
            </div>

            {/* Payment Methods */}
            <div className="mt-6">
              <p className="text-xs font-semibold mb-3" style={{color: 'rgba(255,255,255,0.5)'}}>We Accept</p>
              <div className="flex gap-3">
                <div className="px-3 py-1.5 rounded text-[10px] font-bold" style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)'}}>
                  Cash on Delivery
                </div>
                <div className="px-3 py-1.5 rounded text-[10px] font-bold" style={{backgroundColor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.6)'}}>
                  Bank Transfer
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t" style={{borderColor: 'rgba(255,255,255,0.05)'}}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs" style={{color: 'rgba(255,255,255,0.4)'}}>
              &copy; 2026 Sadaat Electrical Store. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="https://www.facebook.com/SadaatElectricalStore" target="_blank" rel="noopener noreferrer" className="text-xs transition-colors hover:text-[#4da6ff]" style={{color: 'rgba(255,255,255,0.4)'}}>
                Facebook
              </a>
              <span className="text-xs" style={{color: 'rgba(255,255,255,0.2)'}}>|</span>
              <Link to="/privacy" className="text-xs transition-colors hover:text-[#4da6ff]" style={{color: 'rgba(255,255,255,0.4)'}}>
                Privacy Policy
              </Link>
              <span className="text-xs" style={{color: 'rgba(255,255,255,0.2)'}}>|</span>
              <Link to="/terms" className="text-xs transition-colors hover:text-[#4da6ff]" style={{color: 'rgba(255,255,255,0.4)'}}>
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
