"use client";

import AuthGuard from "@/app/admin/AuthGuard";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAdminToken } from "@/lib/adminApi";
import { Home, Package, Briefcase, MessageSquare, Mail, Users, Settings, LogOut, ChevronRight, Gauge, ChevronLeft } from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/admin", label: "Overview", icon: Home },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquare },
  { href: "/admin/contact-requests", label: "Contact Requests", icon: Mail },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // Exclude login page from layout
  if (pathname === "/admin/login") {
    return children;
  }

  function handleLogout() {
    clearAdminToken();
    router.push("/admin/login");
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-black text-white flex">
        {/* Sidebar */}
        <aside
          className={`bg-gradient-to-b from-zinc-950 via-black to-zinc-950 border-r border-cyan-500/20 flex flex-col relative overflow-hidden transition-all duration-300 ease-in-out ${
            sidebarExpanded ? "w-72" : "w-20"
          }`}
          style={{ height: "100vh" }}
        >
          {/* Animated background accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-red-500/5 animate-pulse opacity-30" />
          
          {/* Racing stripe accent */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-blue-500 to-red-500" />
          
           {/* Header */}
          <div className="relative px-6 py-6 border-b border-cyan-500/20">
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12 lg:w-14 lg:h-14 rounded-full overflow-hidden bg-white/5 flex items-center justify-center ring-1 ring-white/10 shadow-lg drop-shadow-[0_0_10px_rgba(34,211,238,0.12)]">
                <img src="/1.png" alt="JN logo" className="w-full h-full object-cover" />
                {/* Subtle radial glow for theme match */}
                <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_40%)] opacity-80 mix-blend-screen" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-300 bg-clip-text text-transparent">
                  ADMIN
                </h1>
                <p className="text-xs text-gray-400 tracking-wider">Parts & Accessories</p>
              </div>
            </div>
          </div>

          {/* Toggle Button */}
          <button
            onClick={() => setSidebarExpanded(!sidebarExpanded)}
            className="absolute -right-3 top-24 z-10 w-6 h-6 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110"
          >
            {sidebarExpanded ? (
              <ChevronLeft className="w-4 h-4 text-white" />
            ) : (
              <ChevronRight className="w-4 h-4 text-white" />
            )}
          </button>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-6 space-y-2 relative overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              const isHovered = hoveredItem === item.href;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onMouseEnter={() => setHoveredItem(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`w-full group relative px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 flex items-center ${
                    sidebarExpanded ? "gap-3" : "justify-center"
                  } ${
                    isActive
                      ? "bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 shadow-lg shadow-cyan-500/20"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                  title={!sidebarExpanded ? item.label : undefined}
                >
                  {/* Active indicator line */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500 rounded-r-full" />
                  )}
                  
                  {/* Icon with glow effect */}
                  <div className={`relative transition-transform duration-300 flex-shrink-0 ${isHovered ? 'scale-110' : ''}`}>
                    <Icon className={`w-5 h-5 ${isActive ? 'drop-shadow-[0_0_8px_rgba(34,211,238,0.6)]' : ''}`} />
                  </div>
                  
                  {/* Label */}
                  {sidebarExpanded && (
                    <span className="flex-1 text-left tracking-wide whitespace-nowrap overflow-hidden">
                      {item.label}
                    </span>
                  )}
                  
                  {/* Arrow indicator */}
                  {sidebarExpanded && (
                    <ChevronRight className={`w-4 h-4 transition-all duration-300 flex-shrink-0 ${
                      isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
                    }`} />
                  )}
                  
                  {/* Hover glow */}
                  {isHovered && !isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-xl" />
                  )}

                  {/* Tooltip for collapsed state */}
                  {!sidebarExpanded && isHovered && (
                    <div className="absolute left-full ml-2 px-3 py-2 bg-gradient-to-br from-zinc-900 to-black border border-cyan-500/30 rounded-lg shadow-xl shadow-cyan-500/20 whitespace-nowrap z-50">
                      <span className="text-sm text-white">{item.label}</span>
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* System status indicator */}
          {sidebarExpanded && (
            <div className="relative px-6 py-4 border-t border-cyan-500/20">
              <div className="flex items-center gap-2 text-xs">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
                <span className="text-gray-400">SYSTEM ONLINE</span>
              </div>
            </div>
          )}

          {/* Logout button */}
          <button
            onClick={handleLogout}
            className={`relative m-3 px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-red-600/80 to-orange-600/80 hover:from-red-600 hover:to-orange-600 transition-all duration-300 flex items-center ${
              sidebarExpanded ? "justify-center gap-2" : "justify-center"
            } group overflow-hidden`}
            title={!sidebarExpanded ? "Logout" : undefined}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <LogOut className="w-4 h-4 transition-transform group-hover:translate-x-1 flex-shrink-0" />
            {sidebarExpanded && <span className="tracking-wider">LOGOUT</span>}
          </button>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-gradient-to-br from-black via-zinc-950 to-black relative overflow-auto">
          {/* Subtle grid pattern overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.03)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_80%)] pointer-events-none" />
          
          {/* Content wrapper */}
          <div className="relative">
            {children}
          </div>
        </main>
      </div>
    </AuthGuard>
  );
}