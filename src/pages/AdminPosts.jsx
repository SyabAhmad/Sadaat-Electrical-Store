import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout, fetchAdminPosts, createPost, updatePost, deletePost, uploadImage } from "../lib/api";
import AdminHeader from "../components/AdminHeader";

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export default function AdminPosts() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  const [uploadingImg, setUploadingImg] = useState(false);
  const [uploadingFeatured, setUploadingFeatured] = useState(false);

  const [form, setForm] = useState({
    title: '', slug: '', content: '', excerpt: '', author: '',
    published: false, tags: '', featuredImage: '', seoTitle: '', seoDescription: '',
  });

  const contentRef = useRef(null);

  const handleFeaturedUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingFeatured(true);
    try {
      const { url } = await uploadImage(file);
      setForm({ ...form, featuredImage: url });
    } catch (err) {
      alert('Upload error: ' + err.message);
    }
    setUploadingFeatured(false);
  };

  const insertContentImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadingImg(true);
    try {
      const { url } = await uploadImage(file);
      const imgMd = `![image](${url})`;
      const textarea = contentRef.current;
      if (textarea) {
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const before = form.content.substring(0, start);
        const after = form.content.substring(end);
        setForm({ ...form, content: before + imgMd + after });
        requestAnimationFrame(() => {
          textarea.selectionStart = textarea.selectionEnd = start + imgMd.length;
          textarea.focus();
        });
      } else {
        setForm({ ...form, content: form.content + '\n' + imgMd });
      }
    } catch (err) {
      alert('Upload error: ' + err.message);
    }
    setUploadingImg(false);
  };

  useEffect(() => {
    getCurrentUser().then(u => {
      if (u.error || !u._id) { navigate('/admin/login'); return; }
      setUser(u);
      loadPosts();
    }).catch(() => navigate('/admin/login'));
  }, []);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const data = await fetchAdminPosts();
      setPosts(Array.isArray(data) ? data : []);
    } catch (err) { console.error(err); setPosts([]); }
    setLoading(false);
  };

  const resetForm = () => {
    setForm({ title: '', slug: '', content: '', excerpt: '', author: '', published: false, tags: '', featuredImage: '', seoTitle: '', seoDescription: '' });
    setEditing(null);
  };

  const handleEdit = (post) => {
    setForm({
      title: post.title, slug: post.slug, content: post.content || '', excerpt: post.excerpt || '',
      author: post.author || '', published: post.published || false,
      tags: (post.tags || []).join(', '), featuredImage: post.featuredImage || '',
      seoTitle: post.seoTitle || '', seoDescription: post.seoDescription || '',
    });
    setEditing(post); setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = { ...form, tags: form.tags.split(',').map(t => t.trim()).filter(Boolean) };
    try {
      if (editing) await updatePost(editing._id, payload);
      else await createPost(payload);
      resetForm(); setShowForm(false); await loadPosts();
    } catch (err) { alert('Error: ' + err.message); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this post?')) return;
    try { await deletePost(id); await loadPosts(); } catch (err) { alert('Error: ' + err.message); }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen" style={{backgroundColor: '#f8fafc'}}>
      <AdminHeader userEmail={user.email} />

      <main className="max-w-6xl mx-auto px-4 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold" style={{color: '#0A0A0A'}}>Blog Posts</h2>
            <p className="text-sm mt-1" style={{color: '#6b7280'}}>{posts.length} total posts</p>
          </div>
          <button onClick={() => { resetForm(); setShowForm(!showForm); }}
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
                New Post
              </>
            )}
          </button>
        </div>

        {showForm && (
          <div className="p-6 rounded-xl mb-6" style={{backgroundColor: '#ffffff', border: '1px solid #e5e7eb'}}>
            <h3 className="text-lg font-semibold mb-5" style={{color: '#0A0A0A'}}>{editing ? "Edit Post" : "New Post"}</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{color: '#374151'}}>Title</label>
                  <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })}
                    className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{borderColor: '#e5e7eb'}} required />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{color: '#374151'}}>Slug</label>
                  <input type="text" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{borderColor: '#e5e7eb'}} required />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{color: '#374151'}}>Author</label>
                  <input type="text" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{borderColor: '#e5e7eb'}} />
                </div>
                <div>
                  <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{color: '#374151'}}>Featured Image</label>
                  <div className="flex gap-2">
                    <input type="text" value={form.featuredImage} onChange={e => setForm({ ...form, featuredImage: e.target.value })}
                      className="flex-1 px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      style={{borderColor: '#e5e7eb'}} placeholder="Paste URL or upload" />
                    <label className={`px-4 py-3 text-xs font-semibold uppercase tracking-wider cursor-pointer rounded-lg transition-all ${uploadingFeatured ? 'bg-gray-100 text-gray-400' : 'text-white'}`}
                      style={!uploadingFeatured ? {backgroundColor: '#0066B3'} : {}}>
                      {uploadingFeatured ? 'Uploading...' : 'Upload'}
                      <input type="file" accept="image/*" onChange={handleFeaturedUpload} className="hidden" disabled={uploadingFeatured} />
                    </label>
                  </div>
                  {form.featuredImage && <img src={form.featuredImage} alt="" className="mt-3 w-20 h-14 object-cover rounded-lg" />}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{color: '#374151'}}>Tags (comma separated)</label>
                  <input type="text" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })}
                    className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{borderColor: '#e5e7eb'}} placeholder="electrical, tips, products" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs font-semibold tracking-wider uppercase mb-2" style={{color: '#374151'}}>Excerpt</label>
                  <textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows="2"
                    className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    style={{borderColor: '#e5e7eb'}} />
                </div>
                <div className="md:col-span-2">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold tracking-wider uppercase" style={{color: '#374151'}}>Content</label>
                    <label className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium tracking-wider uppercase cursor-pointer rounded-lg transition-all ${uploadingImg ? 'bg-gray-100 text-gray-400' : 'hover:bg-gray-100'}`}
                      style={!uploadingImg ? {color: '#0066B3'} : {}}>
                      {uploadingImg ? 'Uploading...' : '+ Insert Image'}
                      <input type="file" accept="image/*" onChange={insertContentImage} className="hidden" disabled={uploadingImg} />
                    </label>
                  </div>
                  <textarea ref={contentRef} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows="10"
                    className="w-full px-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono"
                    style={{borderColor: '#e5e7eb'}} />
                </div>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })}
                    className="w-4 h-4 rounded" style={{borderColor: '#d1d5db', accentColor: '#0066B3'}} />
                  <span className="text-sm" style={{color: '#374151'}}>Published</span>
                </label>
                <button type="submit" disabled={loading}
                  className="px-6 py-3 text-xs font-semibold tracking-wider uppercase rounded-lg transition-all hover:scale-[1.02] disabled:opacity-50 ml-auto text-white"
                  style={{backgroundColor: '#0066B3'}}>
                  {loading ? "Saving..." : editing ? "Update Post" : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        )}

        {loading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-3 rounded-full animate-spin mx-auto" style={{borderColor: '#e5e7eb', borderTopColor: '#0066B3'}} />
            <p className="text-sm mt-4" style={{color: '#6b7280'}}>Loading posts...</p>
          </div>
        ) : (
          <div className="rounded-xl overflow-hidden" style={{backgroundColor: '#ffffff', border: '1px solid #e5e7eb'}}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr style={{backgroundColor: '#f8fafc', borderBottom: '1px solid #e5e7eb'}}>
                    <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase" style={{color: '#6b7280'}}>Title</th>
                    <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase hidden sm:table-cell" style={{color: '#6b7280'}}>Status</th>
                    <th className="text-left p-4 text-xs font-semibold tracking-wider uppercase hidden md:table-cell" style={{color: '#6b7280'}}>Date</th>
                    <th className="text-right p-4 text-xs font-semibold tracking-wider uppercase" style={{color: '#6b7280'}}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(post => (
                    <tr key={post._id} className="transition-colors hover:bg-gray-50" style={{borderBottom: '1px solid #f3f4f6'}}>
                      <td className="p-4 font-medium truncate max-w-[200px]" style={{color: '#0A0A0A'}}>{post.title}</td>
                      <td className="p-4 hidden sm:table-cell">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${post.published ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {post.published ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td className="p-4 text-xs hidden md:table-cell" style={{color: '#6b7280'}}>{new Date(post.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer"
                            className="p-2 rounded-lg transition-colors hover:bg-blue-50"
                            style={post.published ? {color: '#0066B3'} : {color: '#d1d5db', pointerEvents: 'none'}}
                            title="View">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          </a>
                          <button onClick={() => handleEdit(post)} className="p-2 rounded-lg transition-colors hover:bg-yellow-50" style={{color: '#f59e0b'}} title="Edit">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button onClick={() => handleDelete(post._id)} className="p-2 rounded-lg transition-colors hover:bg-red-50" style={{color: '#ef4444'}} title="Delete">
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
            {posts.length === 0 && (
              <div className="text-center py-16">
                <svg className="w-12 h-12 mx-auto mb-4" style={{color: '#d1d5db'}} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <p className="text-sm" style={{color: '#6b7280'}}>No posts yet.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
