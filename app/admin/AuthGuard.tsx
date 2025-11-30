"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { getAdminToken } from "@/lib/adminApi";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const token = getAdminToken();
    if (!token && pathname !== "/admin/login") {
      router.replace("/admin/login");
      return;
    }
    setReady(true);
  }, [router, pathname]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <p>Checking admin session…</p>
      </div>
    );
  }

  return <>{children}</>;
}
