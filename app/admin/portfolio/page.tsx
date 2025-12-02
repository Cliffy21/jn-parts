"use client";

import { useState, useEffect, FormEvent } from "react";
import { adminFetch } from "@/lib/adminApi";
import ImageUploader from "@/app/admin/ImageUploader";
import { Briefcase, Plus, Edit3, Trash2, Save, X, Tag, FileText, Loader2 } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  tag: string;
  description: string;
  image_url: string;
}

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [form, setForm] = useState({
    title: "",
    tag: "",
    description: "",
    image_url: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function load() {
    try {
      setLoading(true);
      const res = await adminFetch("/admin/api/portfolio");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  function updateField(k: string, v: any) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `/admin/api/portfolio/${editingId}`
        : `/admin/api/portfolio`;

      await adminFetch(url, {
        method,
        body: JSON.stringify(form),
      });

      setForm({ title: "", tag: "", description: "", image_url: "" });
      setEditingId(null);
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: number) {
    if (confirm("Delete this project?")) {
      await adminFetch(`/admin/api/portfolio/${id}`, {
        method: "DELETE",
      });
      load();
    }
  }

  function startEdit(item: PortfolioItem) {
    setEditingId(item.id);
    setForm({
      title: item.title,
      tag: item.tag,
      description: item.description,
      image_url: item.image_url,
    });
  }

  function cancelEdit() {
    setEditingId(null);
    setForm({ title: "", tag: "", description: "", image_url: "" });
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Briefcase className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
            Portfolio Management
          </h1>
        </div>
        <p className="text-gray-400 tracking-wide text-xs sm:text-sm">
          Showcase your best automotive work and completed projects
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
              {editingId ? "Edit Project" : "Add New Project"}
            </h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title Input */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Briefcase className="w-3 h-3" />
                  Project Title *
                </label>
                <input
                  className="w-full bg-black/60 border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="Enter project title"
                  value={form.title}
                  onChange={(e) => updateField("title", e.target.value)}
                />
              </div>

              {/* Tag Input */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Tag className="w-3 h-3" />
                  Project Tag
                </label>
                <input
                  className="w-full bg-black/60 border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  placeholder="e.g., wrap, ppf, detailing"
                  value={form.tag}
                  onChange={(e) => updateField("tag", e.target.value)}
                />
              </div>
            </div>

            {/* Image Upload */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Project Image
              </label>
              <ImageUploader
                value={form.image_url}
                onChange={(url) => updateField("image_url", url)}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-3 h-3" />
                Project Description
              </label>
              <textarea
                className="w-full bg-black/60 border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                placeholder="Describe the project details..."
                rows={4}
                value={form.description}
                onChange={(e) => updateField("description", e.target.value)}
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
                    {editingId ? "Update Project" : "Create Project"}
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

      {/* Portfolio Grid */}
      <section className="bg-gradient-to-br from-zinc-900/80 to-black border border-cyan-500/20 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-cyan-500/20">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-cyan-400" />
            Portfolio Projects
            <span className="ml-auto text-sm font-normal text-gray-400">
              {items.length} {items.length === 1 ? 'project' : 'projects'}
            </span>
          </h2>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12 gap-3">
              <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
              <p className="text-gray-400">Loading portfolio...</p>
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-12">
              <Briefcase className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No portfolio items found. Add your first project above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group bg-gradient-to-br from-zinc-900/50 to-black border border-cyan-500/20 rounded-xl overflow-hidden hover:border-cyan-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10"
                >
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden bg-black">
                    {item.image_url ? (
                      <img
                        src={item.image_url}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Briefcase className="w-16 h-16 text-gray-700" />
                      </div>
                    )}
                    
                    {/* Tag Badge */}
                    {item.tag && (
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/90 text-white text-xs font-semibold uppercase tracking-wider backdrop-blur-sm">
                          {item.tag}
                        </span>
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Project Info */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-gray-400 text-sm line-clamp-3">
                      {item.description || "No description provided"}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2 border-t border-white/5">
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
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}