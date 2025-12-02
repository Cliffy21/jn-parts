"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "@/lib/adminApi";
import { Package, Mail, MessageSquare, Briefcase, Users, TrendingUp, Activity } from "lucide-react";

type Overview = {
  products: number;
  contacts: number;
  testimonials: number;
  portfolio: number;
  admins: number;
};

export default function AdminHome() {
  const [stats, setStats] = useState<Overview | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await adminFetch("/admin/api/overview");

        if (!res.ok) {
          const err = await res.json();
          setErrorMsg(JSON.stringify(err));
          return;
        }

        const data = await res.json();
        setStats(data);
      } catch (err) {
        setErrorMsg("Failed to fetch overview stats");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
          <p className="text-cyan-400 text-lg font-medium">Loading system data...</p>
        </div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="p-8">
        <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            <h3 className="text-red-400 font-semibold text-lg">System Error</h3>
          </div>
          <p className="text-red-300/80">Failed to load stats: {errorMsg}</p>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 sm:gap-3">
          <Activity className="w-6 h-6 sm:w-8 sm:h-8 text-cyan-400" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
            Dashboard Overview
          </h1>
        </div>
        <p className="text-gray-400 text-xs sm:text-sm tracking-wide">Real-time system metrics and statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
        <StatCard 
          label="Products" 
          value={stats.products} 
          icon={Package}
          color="cyan"
          delay={0}
        />
        <StatCard 
          label="Contacts" 
          value={stats.contacts} 
          icon={Mail}
          color="blue"
          delay={100}
        />
        <StatCard 
          label="Testimonials" 
          value={stats.testimonials} 
          icon={MessageSquare}
          color="purple"
          delay={200}
        />
        <StatCard 
          label="Portfolio" 
          value={stats.portfolio} 
          icon={Briefcase}
          color="green"
          delay={300}
        />
        <StatCard 
          label="Admins" 
          value={stats.admins} 
          icon={Users}
          color="orange"
          delay={400}
        />
      </div>

      {/* Quick Stats Summary */}
      <div className="bg-gradient-to-br from-zinc-900/50 to-black border border-cyan-500/20 rounded-xl p-6 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-400 text-sm mb-1">Total System Entries</p>
            <p className="text-3xl font-bold text-white">
              {stats.products + stats.contacts + stats.testimonials + stats.portfolio}
            </p>
          </div>
          <div className="flex items-center gap-2 text-green-400">
            <TrendingUp className="w-5 h-5" />
            <span className="text-sm font-medium">All Systems Operational</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  icon: Icon,
  color,
  delay 
}: { 
  label: string; 
  value: number;
  icon: any;
  color: "cyan" | "blue" | "purple" | "green" | "orange";
  delay: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHasAnimated(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const colorConfig = {
    cyan: {
      gradient: "from-cyan-500/20 to-blue-500/20",
      border: "border-cyan-500/30",
      icon: "from-cyan-400 to-blue-500",
      text: "text-cyan-400",
      shadow: "shadow-cyan-500/20",
      glow: "drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]"
    },
    blue: {
      gradient: "from-blue-500/20 to-indigo-500/20",
      border: "border-blue-500/30",
      icon: "from-blue-400 to-indigo-500",
      text: "text-blue-400",
      shadow: "shadow-blue-500/20",
      glow: "drop-shadow-[0_0_12px_rgba(59,130,246,0.6)]"
    },
    purple: {
      gradient: "from-purple-500/20 to-pink-500/20",
      border: "border-purple-500/30",
      icon: "from-purple-400 to-pink-500",
      text: "text-purple-400",
      shadow: "shadow-purple-500/20",
      glow: "drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]"
    },
    green: {
      gradient: "from-green-500/20 to-emerald-500/20",
      border: "border-green-500/30",
      icon: "from-green-400 to-emerald-500",
      text: "text-green-400",
      shadow: "shadow-green-500/20",
      glow: "drop-shadow-[0_0_12px_rgba(34,197,94,0.6)]"
    },
    orange: {
      gradient: "from-orange-500/20 to-red-500/20",
      border: "border-orange-500/30",
      icon: "from-orange-400 to-red-500",
      text: "text-orange-400",
      shadow: "shadow-orange-500/20",
      glow: "drop-shadow-[0_0_12px_rgba(249,115,22,0.6)]"
    }
  };

  const config = colorConfig[color];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative group bg-gradient-to-br from-zinc-900/80 to-black border ${config.border} rounded-xl p-6 transition-all duration-500 cursor-pointer overflow-hidden
        ${isHovered ? `${config.shadow} shadow-lg scale-105 border-opacity-60` : 'border-opacity-30'}
        ${hasAnimated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Background glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* Animated corner accent */}
      <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${config.icon} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity duration-500`} />
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon */}
        <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${config.icon} flex items-center justify-center mb-4 transition-all duration-300 ${isHovered ? config.glow + ' scale-110' : ''}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        
        {/* Label */}
        <p className="text-sm text-gray-400 mb-2 tracking-wide uppercase">{label}</p>
        
        {/* Value with counter animation */}
        <div className="flex items-baseline gap-2">
          <p className={`text-4xl font-bold ${config.text} transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
            {value}
          </p>
          {isHovered && (
            <span className="text-green-400 text-sm animate-pulse">●</span>
          )}
        </div>
        
        {/* Progress bar */}
        <div className="mt-4 h-1 bg-white/5 rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${config.icon} rounded-full transition-all duration-1000 ease-out`}
            style={{ 
              width: hasAnimated ? '100%' : '0%',
              transitionDelay: `${delay + 200}ms`
            }}
          />
        </div>
      </div>
      
      {/* Hover indicator */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${config.icon} transform origin-left transition-transform duration-300 ${isHovered ? 'scale-x-100' : 'scale-x-0'}`} />
    </div>
  );
}