"use client";

import { useEffect, useState, FormEvent } from "react";
import { adminFetch } from "@/lib/adminApi";
import ImageUploader from "@/app/admin/ImageUploader";

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

  return (
    <div className="p-6 space-y-6 text-white">
      <div>
        <h1 className="text-2xl font-bold">Products</h1>
        <p className="text-gray-400 text-sm">
          Manage products shown on the customer website.
        </p>
      </div>

      {/* Create / Edit Form */}
      <section className="bg-gray-900 border border-white/10 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">
          {editingId ? "Edit Product" : "Add Product"}
        </h2>
        {error && (
          <p className="text-sm text-red-400 mb-2">
            {error}
          </p>
        )}
        <form
          onSubmit={editingId ? handleUpdate : handleCreate}
          className="grid md:grid-cols-2 gap-3 text-sm"
        >
          <input
            placeholder="Name *"
            className="bg-black/60 border border-white/10 rounded-lg px-3 py-2"
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <input
            placeholder="Category (engine, exterior, etc.)"
            className="bg-black/60 border border-white/10 rounded-lg px-3 py-2"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
          />

          <input
            placeholder="Price (KES)"
            type="number"
            className="bg-black/60 border border-white/10 rounded-lg px-3 py-2"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
          />

          <div className="space-y-1">
            <input
              placeholder="Image URL (optional)"
              className="bg-black/60 border border-white/10 rounded-lg px-3 py-2 w-full"
              value={form.image_url}
              onChange={(e) => handleChange("image_url", e.target.value)}
            />
            <ImageUploader
              value={form.image_url as string}
              onChange={(url) => handleChange("image_url", url)}
            />
          </div>

          <textarea
            placeholder="Description"
            className="md:col-span-2 bg-black/60 border border-white/10 rounded-lg px-3 py-2 resize-none"
            rows={2}
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <div className="md:col-span-2 flex gap-2">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 bg-gradient-to-r from-red-500 to-orange-500 py-2 rounded-lg font-semibold hover:scale-105 disabled:opacity-60"
            >
              {saving
                ? editingId
                  ? "Updating..."
                  : "Saving..."
                : editingId
                ? "Update Product"
                : "Add Product"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-4 py-2 rounded-lg border border-white/20 text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      {/* Products Table */}
      <section className="bg-gray-900 border border-white/10 rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-3">Existing Products</h2>
        {loading ? (
          <p className="text-gray-400 text-sm">Loading products…</p>
        ) : !products.length ? (
          <p className="text-gray-400 text-sm">No products found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-white/10">
                  <th className="py-2 pr-2">Name</th>
                  <th className="py-2 px-2">Category</th>
                  <th className="py-2 px-2">Price</th>
                  <th className="py-2 px-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className="border-b border-white/5">
                    <td className="py-2 pr-2">{p.name}</td>
                    <td className="py-2 px-2">{p.category || "-"}</td>
                    <td className="py-2 px-2">
                      {p.price ? `KES ${p.price}` : "-"}
                    </td>
                    <td className="py-2 px-2 space-x-2">
                      <button
                        onClick={() => startEdit(p)}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        className="text-xs text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
