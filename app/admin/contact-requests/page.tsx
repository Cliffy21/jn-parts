"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import { Mail, Phone, Car, MessageSquare, CheckCircle, Clock, Filter, Loader2, User } from "lucide-react";

interface ContactRequest {
  id: number;
  name: string;
  email: string;
  phone: string;
  vehicle_model: string;
  message: string;
  handled: boolean;
}

export default function ContactRequestsPage() {
  const [items, setItems] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "handled">("all");
  const [processing, setProcessing] = useState<number | null>(null);

  async function load() {
    try {
      setLoading(true);
      const res = await adminFetch("/admin/api/contact-requests");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function markHandled(id: number) {
    try {
      setProcessing(id);
      await adminFetch(`/admin/api/contact-requests/${id}/mark-handled`, {
        method: "POST",
        body: JSON.stringify({ handled: true }),
      });
      await load();
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(null);
    }
  }

  useEffect(() => { load(); }, []);

  const filteredItems = items.filter((item) => {
    if (filter === "pending") return !item.handled;
    if (filter === "handled") return item.handled;
    return true;
  });

  const pendingCount = items.filter(i => !i.handled).length;
  const handledCount = items.filter(i => i.handled).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Mail className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
            Contact Requests
          </h1>
        </div>
        <p className="text-gray-400 tracking-wide text-xs sm:text-sm">
          Manage and respond to customer inquiries and service requests
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-zinc-900/80 to-black border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Requests</p>
              <p className="text-3xl font-bold text-white">{items.length}</p>
            </div>
            <Mail className="w-12 h-12 text-cyan-400/30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900/80 to-black border border-orange-500/20 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Pending</p>
              <p className="text-3xl font-bold text-orange-400">{pendingCount}</p>
            </div>
            <Clock className="w-12 h-12 text-orange-400/30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900/80 to-black border border-green-500/20 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Handled</p>
              <p className="text-3xl font-bold text-green-400">{handledCount}</p>
            </div>
            <CheckCircle className="w-12 h-12 text-green-400/30" />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-gradient-to-br from-zinc-900/80 to-black border border-cyan-500/20 rounded-xl p-2 backdrop-blur-sm inline-flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-sm ${
            filter === "all"
              ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg shadow-cyan-500/30"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Filter className="w-4 h-4" />
          All ({items.length})
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={`px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-sm ${
            filter === "pending"
              ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/30"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <Clock className="w-4 h-4" />
          Pending ({pendingCount})
        </button>
        <button
          onClick={() => setFilter("handled")}
          className={`px-4 sm:px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 text-sm ${
            filter === "handled"
              ? "bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg shadow-green-500/30"
              : "text-gray-400 hover:text-white hover:bg-white/5"
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          Handled ({handledCount})
        </button>
      </div>

      {/* Contact Requests List */}
      <section className="bg-gradient-to-br from-zinc-900/80 to-black border border-cyan-500/20 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-cyan-500/20">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <MessageSquare className="w-6 h-6 text-cyan-400" />
            {filter === "all" ? "All Requests" : filter === "pending" ? "Pending Requests" : "Handled Requests"}
            <span className="ml-auto text-sm font-normal text-gray-400">
              {filteredItems.length} {filteredItems.length === 1 ? 'request' : 'requests'}
            </span>
          </h2>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12 gap-3">
              <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
              <p className="text-gray-400">Loading contact requests...</p>
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="text-center py-12">
              <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">
                {filter === "all" 
                  ? "No contact requests found." 
                  : filter === "pending"
                  ? "No pending requests. Great job!"
                  : "No handled requests yet."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`group bg-gradient-to-br from-zinc-900/50 to-black border rounded-xl p-6 hover:border-cyan-500/40 transition-all duration-300 ${
                    item.handled 
                      ? "border-green-500/20 hover:shadow-green-500/10" 
                      : "border-orange-500/20 hover:shadow-orange-500/10"
                  } hover:shadow-lg`}
                >
                  {/* Header Row */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {item.name}
                        </h3>
                        {item.handled ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-semibold uppercase tracking-wider border border-green-500/30">
                            <CheckCircle className="w-3 h-3" />
                            Handled
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-semibold uppercase tracking-wider border border-orange-500/30 animate-pulse">
                            <Clock className="w-3 h-3" />
                            Pending
                          </span>
                        )}
                      </div>
                      
                      {/* Vehicle Model */}
                      {item.vehicle_model && (
                        <div className="flex items-center gap-2 text-cyan-400 mb-3">
                          <Car className="w-4 h-4" />
                          <span className="font-medium">{item.vehicle_model}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail className="w-4 h-4 text-cyan-400" />
                      <a href={`mailto:${item.email}`} className="hover:text-cyan-400 transition-colors">
                        {item.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Phone className="w-4 h-4 text-cyan-400" />
                      <a href={`tel:${item.phone}`} className="hover:text-cyan-400 transition-colors">
                        {item.phone}
                      </a>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="bg-black/40 border border-cyan-500/10 rounded-lg p-4 mb-4">
                    <p className="text-gray-300 leading-relaxed">
                      {item.message}
                    </p>
                  </div>

                  {/* Action Button */}
                  {!item.handled && (
                    <button
                      onClick={() => markHandled(item.id)}
                      disabled={processing === item.id}
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-green-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group/btn"
                    >
                      {processing === item.id ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 transition-transform group-hover/btn:scale-110" />
                          Mark as Handled
                        </>
                      )}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}