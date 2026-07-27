import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, fetchProducts, fetchCategories, createProduct, updateProduct, deleteProduct, uploadImage } from "../lib/api";
import AdminHeader from "../components/AdminHeader";

export default function AdminDashboard() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [apiCategories, setApiCategories] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "", price: "", category: "lighting", description: "", mainImage: "", thumbnails: "",
  });
  const [mainImageFile, setMainImageFile] = useState(null);
  const [thumbnailFiles, setThumbnailFiles] = useState([]);

  useEffect(() => { checkUser(); }, []);

  const checkUser = async () => {
    try {
      const userData = await getCurrentUser();
      if (userData.error || !userData._id) { navigate("/admin/login"); return; }
      setUser(userData);
      await loadProducts();
      await loadCategories();
    } catch { navigate("/admin/login"); }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = async (file) => {
    if (!file) return null;
    setUploading(true);
    try {
      const result = await uploadImage(file);
      return result.url;
    } catch (err) {
      alert("Upload error: " + err.message);
      return null;
    } finally { setUploading(false); }
  };

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setFormData({ ...formData, mainImage: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleThumbnailChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) { alert("Maximum 5 images"); return; }
    const readers = files.map(file => new Promise(resolve => {
      const reader = new FileReader();
      reader.onloadend = () => resolve({ file, preview: URL.createObjectURL(file), dataUrl: reader.result });
      reader.readAsDataURL(file);
    }));
    Promise.all(readers).then(results => {
      setThumbnailFiles(prev => [...prev, ...results].slice(0, 5));
      results.forEach(r => {
        setFormData(prev => ({ ...prev, thumbnails: [...(prev.thumbnails || []), r.dataUrl] }));
      });
    });
  };

  const removeThumbnail = (index) => {
    setThumbnailFiles(prev => prev.filter((_, i) => i !== index));
    setFormData(prev => ({
      ...prev,
      thumbnails: (prev.thumbnails || []).filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let mainImageUrl = formData.mainImage;
    let thumbnailUrls = [];

    if (mainImageFile && mainImageFile instanceof File) {
      const uploadedUrl = await handleFileUpload(mainImageFile);
      if (!uploadedUrl) { setLoading(false); return; }
      mainImageUrl = uploadedUrl;
    }
    if (!mainImageUrl) { alert("Please select a main image"); setLoading(false); return; }

    let existingThumbnails = [];
    if (formData.thumbnails && Array.isArray(formData.thumbnails)) {
      existingThumbnails = formData.thumbnails.filter(t => typeof t === 'string' && t.startsWith('http'));
    }
    for (const thumb of thumbnailFiles) {
      if (thumb.file && thumb.file instanceof File) {
        const url = await handleFileUpload(thumb.file);
        if (url) thumbnailUrls.push(url);
      }
    }
    thumbnailUrls = [...existingThumbnails, ...thumbnailUrls];

    const productData = {
      name: formData.name, price: parseInt(formData.price), category: formData.category,
      description: formData.description, mainImage: mainImageUrl, thumbnails: thumbnailUrls,
    };

    try {
      if (editingProduct) {
        const result = await updateProduct(editingProduct.id, productData);
        if (result.error) throw new Error(result.error);
      } else {
        const result = await createProduct(productData);
        if (result.error) throw new Error(result.error);
      }
      setFormData({ name: "", price: "", category: apiCategories[0]?.slug || "lighting", description: "", mainImage: "", thumbnails: [] });
      setMainImageFile(null); setThumbnailFiles([]); setShowForm(false); setEditingProduct(null); setShowNewCategory(false);
      await loadProducts();
    } catch (err) { alert("Error: " + err.message); }
    finally { setLoading(false); }
  };

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts({ page: 1, limit: 100 });
      const items = Array.isArray(data) ? data : (data?.products || []);
      setProducts(items.map(p => ({ ...p, id: p._id })));
    } catch (err) { console.error("Error:", err); }
    setLoading(false);
  };

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      if (Array.isArray(data)) setApiCategories(data);
    } catch {}
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name, price: product.price.toString(), category: product.category,
      description: product.description || "", mainImage: product.mainImage || "",
      thumbnails: Array.isArray(product.thumbnails) ? product.thumbnails : [],
    });
    setMainImageFile(null); setThumbnailFiles([]); setShowForm(true); setShowNewCategory(false);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    try {
      const result = await deleteProduct(id);
      if (result.error) alert("Error: " + result.error);
      else await loadProducts();
    } catch (err) { alert("Error: " + err.message); }
  };

  const filteredProducts = products.filter(p => {
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = categoryFilter === "all" || p.category === categoryFilter;
    return matchSearch && matchCategory;
  });

  const categories = [...new Set(products.map(p => p.category))];

  if (!user) return null;

  return (
    <div className="min-h-screen" style={{backgroundColor: '#f8fafc'}}>
      <AdminHeader userEmail={user.email} />

      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-xl" style={{backgroundColor: '#ffffff', border: '1px solid #e5e7eb'}}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: 'rgba(0,102,179,0.1)'}}>
                <svg className="w-5 h-5" style={{color: '#0066B3'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold" style={{color: '#0A0A0A'}}>{products.length}</p>
                <p className="text-xs" style={{color: '#6b7280'}}>Total Products</p>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-xl" style={{backgroundColor: '#ffffff', border: '1px solid #e5e7eb'}}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: 'rgba(16,185,129,0.1)'}}>
                <svg className="w-5 h-5" style={{color: '#10b981'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold" style={{color: '#0A0A0A'}}>{categories.length}</p>
                <p className="text-xs" style={{color: '#6b7280'}}>Categories</p>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-xl" style={{backgroundColor: '#ffffff', border: '1px solid #e5e7eb'}}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: 'rgba(245,158,11,0.1)'}}>
                <svg className="w-5 h-5" style={{color: '#f59e0b'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold" style={{color: '#0A0A0A'}}>Rs. {filteredProducts.reduce((sum, p) => sum + p.price, 0).toLocaleString()}</p>
                <p className="text-xs" style={{color: '#6b7280'}}>Total Value</p>
              </div>
            </div>
          </div>
          <div className="p-5 rounded-xl" style={{backgroundColor: '#ffffff', border: '1px solid #e5e7eb'}}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{backgroundColor: 'rgba(139,92,246,0.1)'}}>
                <svg className="w-5 h-5" style={{color: '#8b5cf6'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold" style={{color: '#0A0A0A'}}>{filteredProducts.length}</p>
                <p className="text-xs" style={{color: '#6b7280'}}>Showing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Actions bar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold" style={{color: '#0A0A0A'}}>Products</h2>
            <p className="text-sm mt-1" style={{color: '#6b7280'}}>{products.length} total products</p>
          </div>
          <button onClick={() => {
            setShowForm(!showForm); setEditingProduct(null);
            setFormData({ name: "", price: "", category: "lighting", description: "", mainImage: "", thumbnails: [] });
            setMainImageFile(null); setThumbnailFiles([]); setShowNewCategory(false);
          }}
            className={`px-5 py-2.5 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all hover:scale-[1.02] flex items-center gap-2 ${showForm ? "bg-gray-100 text-gray-600" : "text-white"}`}
            style={!showForm ? {backgroundColor: '#0066B3'} : {}}>
            {showForm ? (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Cancel
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Product
              </>
            )}
          </button>
        </div>

        {/* Form */}
        {showForm && (
          <div className="p-6 rounded-xl mb-6" style={{backgroundColor: '#ffffff', border: '1px solid #e5e7eb'}}>
            <h3 className="text-lg font-semibold mb-5" style={{color: '#0A0A0A'}}>{editingProduct ? "Edit Product" : "New Product"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{color: '#374151'}}>Product Name</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{borderColor: '#e5e7eb'}} required />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{color: '#374151'}}>Price (Rs.)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange}
                    className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{borderColor: '#e5e7eb'}} required />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{color: '#374151'}}>Category</label>
                  {!showNewCategory ? (
                    <div className="flex gap-2">
                      <select name="category" value={formData.category} onChange={handleInputChange}
                        className="flex-1 px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{borderColor: '#e5e7eb', backgroundColor: '#ffffff'}}>
                        {apiCategories.map(c => (
                          <option key={c.slug || c.name} value={c.slug || c.name}>
                            {c.name.charAt(0).toUpperCase() + c.name.slice(1)}
                          </option>
                        ))}
                      </select>
                      <button type="button" onClick={() => { setShowNewCategory(true); setFormData({ ...formData, category: '' }); }}
                        className="px-3 py-3 text-xs font-semibold rounded-lg border transition-colors hover:bg-gray-50 whitespace-nowrap"
                        style={{borderColor: '#e5e7eb', color: '#0066B3'}}>
                        + New
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input type="text" name="category" value={formData.category} onChange={handleInputChange}
                        placeholder="Enter new category name"
                        className="flex-1 px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        style={{borderColor: '#e5e7eb'}} required />
                      <button type="button" onClick={() => { setShowNewCategory(false); setFormData({ ...formData, category: apiCategories[0]?.slug || 'lighting' }); }}
                        className="px-3 py-3 text-xs font-semibold rounded-lg border transition-colors hover:bg-gray-50 whitespace-nowrap"
                        style={{borderColor: '#e5e7eb', color: '#6b7280'}}>
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{color: '#374151'}}>Main Image</label>
                  <input type="file" accept="image/*" onChange={handleMainImageChange}
                    className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    style={{borderColor: '#e5e7eb'}} />
                  {formData.mainImage && <img src={formData.mainImage} alt="Preview" className="mt-3 w-20 h-20 object-cover rounded-lg" />}
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{color: '#374151'}}>Additional Images (max 5)</label>
                <input type="file" accept="image/*" multiple onChange={handleThumbnailChange}
                  className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  style={{borderColor: '#e5e7eb'}} />
                {Array.isArray(formData.thumbnails) && formData.thumbnails.filter(t => typeof t === 'string').length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {formData.thumbnails.filter(t => typeof t === 'string').map(url => (
                      <div key={url} className="relative group">
                        <img src={url} alt="" className="w-16 h-16 object-cover rounded-lg" />
                        <button type="button" onClick={() => setFormData(prev => ({ ...prev, thumbnails: prev.thumbnails.filter(t => t !== url) }))}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                      </div>
                    ))}
                  </div>
                )}
                {thumbnailFiles.length > 0 && (
                  <div className="flex gap-2 mt-3 flex-wrap">
                    {thumbnailFiles.map((thumb, idx) => (
                      <div key={thumb.preview} className="relative group">
                        <img src={thumb.preview} alt="" className="w-16 h-16 object-cover rounded-lg" />
                        <button type="button" onClick={() => removeThumbnail(idx)}
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{color: '#374151'}}>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3"
                  className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  style={{borderColor: '#e5e7eb'}} />
              </div>
              <button type="submit" disabled={loading || uploading}
                className="px-6 py-3 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all hover:scale-[1.02] disabled:opacity-50 text-white"
                style={{backgroundColor: '#0066B3'}}>
                {loading ? "Saving..." : uploading ? "Uploading..." : editingProduct ? "Update Product" : "Create Product"}
              </button>
            </form>
          </div>
        )}

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-sm">
            <input type="text" placeholder="Search products..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{borderColor: '#e5e7eb', backgroundColor: '#ffffff'}} />
            <svg className="absolute left-3 top-3.5 w-4 h-4" style={{color: '#9ca3af'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}
            className="px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            style={{borderColor: '#e5e7eb', backgroundColor: '#ffffff'}}>
            <option value="all">All Categories</option>
            {categories.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
        </div>

        {/* Products table */}
        {loading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-3 rounded-full animate-spin mx-auto" style={{borderColor: '#e5e7eb', borderTopColor: '#0066B3'}} />
            <p className="text-sm mt-4" style={{color: '#6b7280'}}>Loading products...</p>
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden" style={{backgroundColor: '#ffffff', border: '1px solid #e5e7eb'}}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{backgroundColor: '#f8fafc', borderBottom: '1px solid #e5e7eb'}}>
                    <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase" style={{color: '#6b7280'}}>Product</th>
                    <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase hidden sm:table-cell" style={{color: '#6b7280'}}>Category</th>
                    <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase" style={{color: '#6b7280'}}>Price</th>
                    <th className="text-right p-4 text-xs font-semibold tracking-wider uppercase" style={{color: '#6b7280'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="transition-colors hover:bg-gray-50" style={{borderBottom: '1px solid #f3f4f6'}}>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {product.mainImage && <img src={product.mainImage} alt="" className="w-12 h-12 object-cover rounded-lg" />}
                          <span className="font-medium truncate max-w-[200px]" style={{color: '#0A0A0A'}}>{product.name}</span>
                        </div>
                      </td>
                      <td className="p-4 hidden sm:table-cell">
                        <span className="px-3 py-1 text-xs font-medium rounded-full capitalize" style={{backgroundColor: 'rgba(0,102,179,0.1)', color: '#0066B3'}}>{product.category}</span>
                      </td>
                      <td className="p-4 font-semibold" style={{color: '#0066B3'}}>Rs. {product.price.toLocaleString()}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a href={`/product/${product.slug}`} target="_blank" rel="noopener noreferrer"
                            className="p-2 rounded-lg transition-colors hover:bg-blue-50" style={{color: '#0066B3'}} title="View">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </a>
                          <button onClick={() => handleEdit(product)} className="p-2 rounded-lg transition-colors hover:bg-yellow-50" style={{color: '#f59e0b'}} title="Edit">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button onClick={() => handleDelete(product.id)} className="p-2 rounded-lg transition-colors hover:bg-red-50" style={{color: '#ef4444'}} title="Delete">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <svg className="w-12 h-12 mx-auto mb-4" style={{color: '#d1d5db'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
                <p className="text-sm" style={{color: '#6b7280'}}>
                  {searchQuery || categoryFilter !== "all" ? "No products match your filters." : "No products yet."}
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
