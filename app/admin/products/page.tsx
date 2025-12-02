"use client";

import { useEffect, useState, FormEvent } from "react";
import { adminFetch } from "@/lib/adminApi";
import ImageUploader from "@/app/admin/ImageUploader";
import { Package, Edit3, Trash2, Plus, Save, X, DollarSign, Tag, FileText, Loader2 } from "lucide-react";

type Product = {
  id: number;
  name: string;
  category?: string;
  price?: string | number;
  description?: string;
  image_url?: string;
};

const emptyForm: Omit<Product, "id"> = {
  name: "",
  category: "",
  price: "",
  description: "",
  image_url: "",
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function loadProducts() {
    try {
      setLoading(true);
      const res = await adminFetch("/admin/api/products");
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Failed to load products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  function handleChange(field: keyof typeof form, value: any) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (!form.name) {
      setError("Product name is required");
      return;
    }

    try {
      setSaving(true);
      const res = await adminFetch("/admin/api/products", {
        method: "POST",
        body: JSON.stringify({
          ...form,
          price: form.price ? Number(form.price) : 0,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to create product");
      }

      setForm(emptyForm);
      await loadProducts();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to create product");
    } finally {
      setSaving(false);
    }
  }

  function startEdit(product: Product) {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      category: product.category || "",
      price: product.price || "",
      description: product.description || "",
      image_url: product.image_url || "",
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm(emptyForm);
    setError("");
  }

  async function handleUpdate(e: FormEvent) {
    e.preventDefault();
    if (!editingId) return;
    setError("");

    try {
      setSaving(true);
      const res = await adminFetch(`/admin/api/products/${editingId}`, {
        method: "PUT",
        body: JSON.stringify({
          ...form,
          price: form.price ? Number(form.price) : 0,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.message || "Failed to update product");
      }

      setEditingId(null);
      setForm(emptyForm);
      await loadProducts();
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this product?")) return;
    try {
      await adminFetch(`/admin/api/products/${id}`, { method: "DELETE" });
      await loadProducts();
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    }
  }

  const handleFormSubmit = editingId ? handleUpdate : handleCreate;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Package className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
            Products Management
          </h1>
        </div>
        <p className="text-gray-400 tracking-wide text-xs sm:text-sm">
          Manage automotive parts and accessories displayed on the customer website
        </p>
      </div>

      {/* Create / Edit Form */}
      <section className="bg-gradient-to-br from-zinc-900/80 to-black border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden">
        {/* Background accent */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            {editingId ? (
              <Edit3 className="w-6 h-6 text-blue-400" />
            ) : (
              <Plus className="w-6 h-6 text-cyan-400" />
            )}
            <h2 className="text-xl font-bold text-white">
              {editingId ? "Edit Product" : "Add New Product"}
            </h2>
          </div>

          {error && (
            <div className="mb-4 bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Tag className="w-3 h-3" />
                  Product Name *
                </label>
                <input
                  placeholder="Enter product name"
                  className="w-full bg-black/60 border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  value={form.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </div>

              {/* Category Input */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Package className="w-3 h-3" />
                  Category
                </label>
                <input
                  placeholder="e.g., engine, exterior, interior"
                  className="w-full bg-black/60 border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                />
              </div>

              {/* Price Input */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <DollarSign className="w-3 h-3" />
                  Price (KES)
                </label>
                <input
                  placeholder="0.00"
                  type="number"
                  className="w-full bg-black/60 border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  value={form.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Product Image
                </label>
                <input
                  placeholder="Image URL (optional)"
                  className="w-full bg-black/60 border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  value={form.image_url}
                  onChange={(e) => handleChange("image_url", e.target.value)}
                />
                <ImageUploader
                  value={form.image_url as string}
                  onChange={(url) => handleChange("image_url", url)}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-3 h-3" />
                Description
              </label>
              <textarea
                placeholder="Enter product description..."
                className="w-full bg-black/60 border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                rows={3}
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handleFormSubmit}
                disabled={saving}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {editingId ? "Updating..." : "Saving..."}
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5 transition-transform group-hover:scale-110" />
                    {editingId ? "Update Product" : "Add Product"}
                  </>
                )}
              </button>
              
              {editingId && (
                <button
                  onClick={cancelEdit}
                  className="px-6 py-3 rounded-lg border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white transition-all duration-300 flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Products Table */}
      <section className="bg-gradient-to-br from-zinc-900/80 to-black border border-cyan-500/20 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-cyan-500/20">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Package className="w-6 h-6 text-cyan-400" />
            Existing Products
            <span className="ml-auto text-sm font-normal text-gray-400">
              {products.length} {products.length === 1 ? 'product' : 'products'}
            </span>
          </h2>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12 gap-3">
              <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
              <p className="text-gray-400">Loading products...</p>
            </div>
          ) : !products.length ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No products found. Add your first product above!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-cyan-500/20">
                    <th className="py-4 pr-4 font-semibold uppercase text-xs tracking-wider">Product Name</th>
                    <th className="py-4 px-4 font-semibold uppercase text-xs tracking-wider">Category</th>
                    <th className="py-4 px-4 font-semibold uppercase text-xs tracking-wider">Price</th>
                    <th className="py-4 px-4 font-semibold uppercase text-xs tracking-wider text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr 
                      key={p.id} 
                      className="border-b border-white/5 hover:bg-cyan-500/5 transition-colors group"
                    >
                      <td className="py-4 pr-4">
                        <div className="flex items-center gap-3">
                          {p.image_url ? (
                            <img 
                              src={p.image_url} 
                              alt={p.name}
                              className="w-10 h-10 rounded-lg object-cover border border-cyan-500/20"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-gray-800 border border-cyan-500/20 flex items-center justify-center">
                              <Package className="w-5 h-5 text-gray-600" />
                            </div>
                          )}
                          <span className="text-white font-medium">{p.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {p.category ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-medium border border-cyan-500/20">
                            {p.category}
                          </span>
                        ) : (
                          <span className="text-gray-600">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        {p.price ? (
                          <span className="text-green-400 font-semibold">KES {Number(p.price).toLocaleString()}</span>
                        ) : (
                          <span className="text-gray-600">-</span>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2 justify-end">
                          <button
                            onClick={() => startEdit(p)}
                            className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/40 transition-all duration-300 group/btn"
                          >
                            <Edit3 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-300 group/btn"
                          >
                            <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}