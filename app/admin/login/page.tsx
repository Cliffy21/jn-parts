"use client";

import { FormEvent, useState } from "react";
import { API_BASE, setAdminToken } from "@/lib/adminApi";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@jnparts.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/admin/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");

      setAdminToken(data.access_token);
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl p-8 text-white">
        <h1 className="text-2xl font-bold mb-2 text-center">
          JN Admin Dashboard
        </h1>
        <p className="text-gray-400 text-sm mb-6 text-center">
          Sign in to manage products & leads.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-black/70 border border-white/10 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-black/70 border border-white/10 rounded-lg px-3 py-2 text-sm"
            />
          </div>
          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 py-2.5 rounded-lg font-semibold text-sm hover:scale-105 disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
