"use client";

import { useState, useEffect, FormEvent } from "react";
import { adminFetch } from "@/lib/adminApi";
import { Users, UserPlus, Shield, Mail, Lock, Crown, User, Loader2, Eye, EyeOff } from "lucide-react";

interface User {
  id: number;
  email: string;
  role: string;
}

const roleConfig = {
  superadmin: {
    label: "Super Admin",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/30",
    textColor: "text-purple-400",
    icon: Crown,
  },
  admin: {
    label: "Admin",
    color: "from-cyan-500 to-blue-500",
    bgColor: "bg-cyan-500/10",
    borderColor: "border-cyan-500/30",
    textColor: "text-cyan-400",
    icon: Shield,
  },
  staff: {
    label: "Staff",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/30",
    textColor: "text-green-400",
    icon: User,
  },
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [form, setForm] = useState({ email: "", password: "", role: "admin" });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  async function load() {
    try {
      setLoading(true);
      const res = await adminFetch("/admin/api/users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  async function create(e: FormEvent) {
    e.preventDefault();
    setSaving(true);

    try {
      await adminFetch("/admin/api/users", {
        method: "POST",
        body: JSON.stringify(form),
      });
      setForm({ email: "", password: "", role: "admin" });
      load();
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  const roleStats = {
    superadmin: users.filter(u => u.role === "superadmin").length,
    admin: users.filter(u => u.role === "admin").length,
    staff: users.filter(u => u.role === "staff").length,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Users className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
            User Management
          </h1>
        </div>
        <p className="text-gray-400 tracking-wide text-xs sm:text-sm">
          Manage admin users and their access permissions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-zinc-900/80 to-black border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Total Users</p>
              <p className="text-3xl font-bold text-white">{users.length}</p>
            </div>
            <Users className="w-12 h-12 text-cyan-400/30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900/80 to-black border border-purple-500/20 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Super Admins</p>
              <p className="text-3xl font-bold text-purple-400">{roleStats.superadmin}</p>
            </div>
            <Crown className="w-12 h-12 text-purple-400/30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900/80 to-black border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Admins</p>
              <p className="text-3xl font-bold text-cyan-400">{roleStats.admin}</p>
            </div>
            <Shield className="w-12 h-12 text-cyan-400/30" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-zinc-900/80 to-black border border-green-500/20 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Staff</p>
              <p className="text-3xl font-bold text-green-400">{roleStats.staff}</p>
            </div>
            <User className="w-12 h-12 text-green-400/30" />
          </div>
        </div>
      </div>

      {/* Create User Form */}
      <section className="bg-gradient-to-br from-zinc-900/80 to-black border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 blur-3xl rounded-full" />
        
        <div className="relative">
          <div className="flex items-center gap-3 mb-6">
            <UserPlus className="w-6 h-6 text-cyan-400" />
            <h2 className="text-xl font-bold text-white">Add New User</h2>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Mail className="w-3 h-3" />
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="user@example.com"
                  className="w-full bg-black/60 border border-cyan-500/20 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                  <Lock className="w-3 h-3" />
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter secure password"
                    className="w-full bg-black/60 border border-cyan-500/20 rounded-lg px-4 py-3 pr-12 text-white placeholder-gray-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-cyan-400 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Role Selection */}
            <div className="space-y-2">
              <label className="text-xs text-gray-400 uppercase tracking-wider flex items-center gap-2">
                <Shield className="w-3 h-3" />
                User Role *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {Object.entries(roleConfig).map(([role, config]) => {
                  const Icon = config.icon;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() => setForm({ ...form, role })}
                      className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                        form.role === role
                          ? `${config.borderColor} ${config.bgColor} shadow-lg`
                          : "border-gray-700 bg-black/40 hover:border-gray-600"
                      }`}
                    >
                      <Icon className={`w-6 h-6 mx-auto mb-2 ${form.role === role ? config.textColor : "text-gray-500"}`} />
                      <p className={`text-sm font-semibold ${form.role === role ? config.textColor : "text-gray-400"}`}>
                        {config.label}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={create}
              disabled={saving}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 py-3 rounded-lg font-semibold text-white transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
            >
              {saving ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Creating User...
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5 transition-transform group-hover:scale-110" />
                  Create User
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Users List */}
      <section className="bg-gradient-to-br from-zinc-900/80 to-black border border-cyan-500/20 rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="p-6 border-b border-cyan-500/20">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" />
            System Users
            <span className="ml-auto text-sm font-normal text-gray-400">
              {users.length} {users.length === 1 ? 'user' : 'users'}
            </span>
          </h2>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex items-center justify-center py-12 gap-3">
              <Loader2 className="w-6 h-6 text-cyan-400 animate-spin" />
              <p className="text-gray-400">Loading users...</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400">No users found. Create your first admin user above!</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {users.map((user) => {
                const config = roleConfig[user.role as keyof typeof roleConfig] || roleConfig.admin;
                const Icon = config.icon;
                
                return (
                  <div
                    key={user.id}
                    className={`group bg-gradient-to-br from-zinc-900/50 to-black border ${config.borderColor} rounded-xl p-5 hover:border-opacity-60 transition-all duration-300 hover:shadow-lg flex items-center justify-between`}
                  >
                    <div className="flex items-center gap-4">
                      {/* Avatar */}
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${config.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      {/* User Info */}
                      <div>
                        <div className="flex items-center gap-3">
                          <h3 className="text-lg font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {user.email}
                          </h3>
                        </div>
                        <p className="text-gray-400 text-sm flex items-center gap-1 mt-1">
                          <Shield className="w-3 h-3" />
                          User ID: {user.id}
                        </p>
                      </div>
                    </div>

                    {/* Role Badge */}
                    <div>
                      <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg ${config.bgColor} ${config.textColor} text-sm font-semibold uppercase tracking-wider border ${config.borderColor}`}>
                        <Icon className="w-4 h-4" />
                        {config.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}