"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";

type Overview = {
  products: number;
  contacts: number;
  testimonials: number;
  admins: number;
};

export default function AdminHome() {
  const [stats, setStats] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await adminFetch("/admin/api/overview");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="p-6 text-white space-y-4">
      <h1 className="text-2xl font-bold mb-2">Dashboard Overview</h1>
      {loading || !stats ? (
        <p className="text-gray-400 text-sm">Loading stats…</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Products" value={stats.products} />
          <StatCard label="Contact Requests" value={stats.contacts} />
          <StatCard label="Testimonials" value={stats.testimonials} />
          <StatCard label="Admins" value={stats.admins} />
        </div>
      )}
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-gray-900 border border-white/10 rounded-xl p-4">
      <p className="text-xs text-gray-400">{label}</p>
      <p className="text-3xl font-bold mt-1">{value}</p>
    </div>
  );
}
