"use client";

import AuthGuard from "@/app/admin/AuthGuard";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearAdminToken } from "@/lib/adminApi";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/contact-requests", label: "Contact Requests" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/portfolio", label: "Portfolio" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // login page uses its own UI
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
        <aside className="w-60 bg-gradient-to-b from-gray-900 to-black border-r border-white/10 flex flex-col">
          <div className="px-4 py-4 border-b border-white/10">
            <h1 className="text-lg font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
              JN Admin
            </h1>
            <p className="text-xs text-gray-400">Parts & Accessories</p>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-1 text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-3 py-2 rounded-lg hover:bg-white/5 ${
                  pathname === item.href ? "bg-white/10" : ""
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={handleLogout}
            className="m-3 mb-4 px-3 py-2 rounded-lg text-sm bg-red-600 hover:bg-red-700"
          >
            Logout
          </button>
        </aside>
        <main className="flex-1 bg-gradient-to-b from-black to-gray-900">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
