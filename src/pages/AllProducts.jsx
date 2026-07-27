import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchProducts, fetchCategories } from "../lib/api";
import ProductCard from "../components/ProductCard";

const ITEMS_PER_PAGE = 12;
const SEARCH_DEBOUNCE_MS = 300;

const fallbackCategories = [
  { name: "All Products", slug: "all", image: "/images/split_screen_hero.webp" },
];

export default function AllProducts({ handleAddToCart, toggleFavorite, favorites }) {
  const location = useLocation();
  const navigate = useNavigate();
  const debounceRef = useRef(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(fallbackCategories);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  useEffect(() => {
    fetchCategories()
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setCategories([...fallbackCategories, ...data]);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearchTerm(searchInput);
      setPage(1);
    }, SEARCH_DEBOUNCE_MS);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [searchInput]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get("category");
    const search = params.get("search");
    const p = params.get("page");
    if (cat) setSelectedCategory(cat);
    if (search) { setSearchInput(search); setSearchTerm(search); }
    if (p) setPage(parseInt(p) || 1);
  }, [location]);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchProducts({
        page,
        limit: ITEMS_PER_PAGE,
        category: selectedCategory,
        search: searchTerm,
        sort: sortBy,
      });
      setProducts((data.products || []).map(p => ({ ...p, id: p._id })));
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Error loading products:", err);
    }
    setLoading(false);
  }, [page, selectedCategory, searchTerm, sortBy]);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleFilterChange = (updates) => {
    setPage(1);
    Object.entries(updates).forEach(([key, value]) => {
      if (key === 'category') setSelectedCategory(value);
      if (key === 'search') setSearchTerm(value);
      if (key === 'sort') setSortBy(value);
    });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentCategory = categories.find(c => c.slug === selectedCategory) || categories[0];

  return (
    <div className="min-h-screen" style={{backgroundColor: '#ffffff'}}>
      {/* Hero Header */}
      <section className="relative py-16 lg:py-24 overflow-hidden" style={{background: 'linear-gradient(135deg, #0A0A0A 0%, #111827 100%)'}}>
        <div className="absolute inset-0 opacity-30">
          <img src={currentCategory.image} alt="" loading="lazy" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 lg:px-8">
          <span className="inline-block px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase rounded-full mb-4" style={{backgroundColor: 'rgba(0,102,179,0.2)', color: '#4da6ff'}}>
            Collection
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-2">
            {selectedCategory === 'all' ? 'All Products' : currentCategory.name}
          </h1>
          <p className="text-base text-gray-400">
            {total} {total === 1 ? "product" : "products"} available
          </p>
        </div>
      </section>

      {/* Search & Sort Bar */}
      <section className="py-6" style={{backgroundColor: '#f8fafc'}}>
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md w-full">
              <input
                type="text"
                placeholder="Search products..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full px-5 py-3 pr-12 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{borderColor: '#e5e7eb'}}
              />
              <svg className="absolute right-4 top-3.5 w-4 h-4" style={{color: '#9ca3af'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium" style={{color: '#6b7280'}}>Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => handleFilterChange({ sort: e.target.value })}
                className="px-4 py-3 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{borderColor: '#e5e7eb'}}
              >
                <option value="latest">Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          {loading ? (
            <div className="text-center py-24">
              <div className="w-10 h-10 border-3 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto" />
              <p className="text-sm mt-4" style={{color: '#6b7280'}}>Loading products...</p>
            </div>
          ) : products.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => handleAddToCart(product)}
                    isFavorite={favorites?.some(f => f.id === product.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12 pt-8" style={{borderTop: '1px solid #e5e7eb'}}>
                  <button
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                    className="w-11 h-11 flex items-center justify-center text-sm font-medium border rounded-lg hover:border-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    style={{borderColor: '#e5e7eb'}}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (page <= 3) {
                      pageNum = i + 1;
                    } else if (page >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = page - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className="w-11 h-11 text-sm font-medium rounded-lg transition-all"
                        style={page === pageNum ? 
                          {backgroundColor: '#0066B3', color: '#ffffff'} : 
                          {border: '1px solid #e5e7eb', color: '#374151'}
                        }
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page === totalPages}
                    className="w-11 h-11 flex items-center justify-center text-sm font-medium border rounded-lg hover:border-blue-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    style={{borderColor: '#e5e7eb'}}
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}

              <p className="text-center text-xs mt-4" style={{color: '#9ca3af'}}>
                Page {page} of {totalPages}
              </p>
            </>
          ) : (
            <div className="text-center py-24">
              <svg className="w-16 h-16 mx-auto mb-4" style={{color: '#d1d5db'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p className="text-lg font-medium mb-2" style={{color: '#374151'}}>No products found</p>
              <p className="text-sm mb-6" style={{color: '#6b7280'}}>Try adjusting your search or filter criteria</p>
              <button
                onClick={() => handleFilterChange({ category: "all", search: "" })}
                className="px-6 py-3 text-sm font-semibold rounded-lg transition-all"
                style={{backgroundColor: '#0066B3', color: '#ffffff'}}
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
