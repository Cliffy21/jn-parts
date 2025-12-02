"use client";

import { useState, useEffect, FormEvent } from "react";
import { adminFetch } from "@/lib/adminApi";
import { MessageSquare, Plus, Edit3, Trash2, Save, X, User, MapPin, Star, Loader2 } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  message: string;
}

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [form, setForm] = useState({
    name: "",
    location: "",
    rating: 5,
    message: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    try {
      setLoading(true);
      const res = await adminFetch("/admin/api/testimonials");
      setItems(await res.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function updateField(key: string, val: any) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `/admin/api/testimonials/${editingId}`
        : `/admin/api/testimonials`;

      await adminFetch(url, {
        method,
        body: JSON.stringify(form),
      });

      setForm({ name: "", location: "", rating: 5, message: "" });
      setEditingId(null);
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    if (confirm("Delete this testimonial?")) {
      await adminFetch(`/admin/api/testimonials/${id}`, {
        method: "DELETE",
      });
      await load();
    }
  }

  function startEdit(item: Testimonial) {
    setEditingId(item.id);
    setForm({
      name: item.name,
      location: item.location,
      rating: item.rating,
      message: item.message,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ name: "", location: "", rating: 5, message: "" });
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
            Testimonials Management
          </h1>
        </div>
        <p className="text-gray-400 tracking-wide text-xs sm:text-sm">
          Manage customer reviews and feedback for your automotive services
        </p>
      </div>

      {/* Create / Edit Form */}
      <section className="bg-gradient-to-br from-zinc-900/80 to-black border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            {editingId ? (
              <Edit3 className="w-6 h-6 text-blue-400" />
            ) : (
              <Plus className="w-6 h-6 text-cyan-400" />
            )}
            <h2 className="text-xl font-bold text-white">
              {editingId ? "Edit Testimonial" : "Add New Testimonial"}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <User className="w-3 h-3" />
                  Customer Name *
                </label>
                <input
                  className="w-full bg-black/60 border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="Enter customer name"
                  value={form.name}
                  onChange={(e) => updateField("name", e.target.value)}
                />
              </div>

              {/* Location Input */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <MapPin className="w-3 h-3" />
                  Location
                </label>
                <input
                  className="w-full bg-black/60 border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="e.g., Nairobi, Kenya"
                  value={form.location}
                  onChange={(e) => updateField("location", e.target.value)}
                />
              </div>
            </div>

            {/* Rating Input */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Star className="w-3 h-3" />
                Rating (1-5)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min={1}
                  max={5}
                  className="w-24 bg-black/60 border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  value={form.rating}
                  onChange={(e) => updateField("rating", e.target.value)}
                />
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-6 h-6 cursor-pointer transition-all duration-200 ${
                        star <= Number(form.rating)
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.6)]"
                          : "text-gray-600"
                      }`}
                      onClick={() => updateField("rating", star)}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <MessageSquare className="w-3 h-3" />
                Testimonial Message *
              </label>
              <textarea
                className="w-full bg-black/60 border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                placeholder="Enter customer feedback..."
                rows={4}
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={save}
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
                    {editingId ? "Update Testimonial" : "Create Testimonial"}
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

      {/* Testimonials Grid */}
      <section className="bg-gradient-to-br from-zinc-900/80 to-black border border-cyan-500/20 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-cyan-500/20">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-cyan-400" />
            Customer Testimonials
            <span className="ml-auto text-sm font-normal text-gray-400">
              {items.length} {items.length === 1 ? 'testimonial' : 'testimonials'}
            </span>
          </h2>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12 gap-3">
              <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
              <p className="text-gray-400">Loading testimonials...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No testimonials found. Add your first testimonial above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group bg-gradient-to-br from-zinc-900/50 to-black border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 flex flex-col"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {item.name}
                      </h3>
                      {item.location && (
                        <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`w-5 h-5 ${
                          star <= item.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-700"
                        }`}
                      />
                    ))}
                  </div>

                  {/* Message */}
                  <div className="flex-1 mb-4">
                    <p className="text-gray-300 text-sm leading-relaxed">
                      "{item.message}"
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t border-white/5">
                    <button
                      onClick={() => startEdit(item)}
                      className="flex-1 p-2 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 hover:bg-blue-500/20 hover:border-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium group/btn"
                    >
                      <Edit3 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      Edit
                    </button>
                    <button
                      onClick={() => remove(item.id)}
                      className="flex-1 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 hover:border-red-500/40 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium group/btn"
                    >
                      <Trash2 className="w-4 h-4 group-hover/btn:scale-110 transition-transform" />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}