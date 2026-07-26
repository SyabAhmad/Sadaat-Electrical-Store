import { Link, useLocation } from "react-router-dom";

const categories = [
  { name: 'All Products', path: '/products' },
  { name: 'Lighting', path: '/products?category=lighting' },
  { name: 'Switches & Sockets', path: '/products?category=switches' },
  { name: 'Wiring', path: '/products?category=wiring' },
  { name: 'Fans', path: '/products?category=fans' },
  { name: 'Home Appliances', path: '/products?category=appliances' },
  { name: 'Accessories', path: '/products?category=accessories' },
];

export default function CategoryBar() {
  const location = useLocation();

  const isActive = (path) => {
    const currentPath = location.pathname + location.search;
    return currentPath === path || (path === '/products' && location.pathname === '/products' && !location.search);
  };

  return (
    <div className="sticky top-16 lg:top-20 z-40" style={{backgroundColor: '#ffffff', borderBottom: '1px solid #e5e7eb'}}>
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-1.5 lg:gap-2 h-14 overflow-x-auto no-scrollbar">
          {categories.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className={`px-4 py-2.5 text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all rounded-lg min-h-[44px] flex items-center ${
                isActive(item.path) ? 'text-white' : 'hover:bg-gray-100'
              }`}
              style={isActive(item.path) ? 
                {backgroundColor: '#0066B3', color: '#ffffff'} : 
                {color: '#4b5563'}
              }
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
