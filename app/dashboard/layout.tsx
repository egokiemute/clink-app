"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { getKey, clearKey } from "./_lib/api";

const NAV = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="9.5" y="1.5" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="1.5" y="9.5" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <rect x="9.5" y="9.5" width="5" height="5" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    href: "/dashboard/payments",
    label: "Payments",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1.5" y="4" width="13" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M1.5 7h13" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    href: "/dashboard/settings",
    label: "API Key",
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="6" cy="9" r="3.5" stroke="currentColor" strokeWidth="1.3" />
        <path d="M8.5 6.5l5 -4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
        <path d="M12 4.5l1.5 1.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    ),
  },
];

const AUTH_PATHS = ["/dashboard/login", "/dashboard/signup"];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [ready, setReady] = useState(false);

  const isAuthPage = AUTH_PATHS.includes(pathname);

  useEffect(() => {
    if (isAuthPage) { setReady(true); return; }
    const key = getKey();
    if (!key) {
      router.replace("/dashboard/login");
    } else {
      setReady(true);
    }
  }, [pathname]);

  if (!ready) return null;

  if (isAuthPage) return <>{children}</>;

  return (
    <div className="flex min-h-dvh">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 flex-col border-r border-border bg-white px-4 py-6 md:flex">
        <a href="https://tryclink.com" className="mb-8 px-2 text-sm font-medium tracking-[-0.03em] text-primary">
          Clink
        </a>
        <nav className="flex flex-1 flex-col gap-1">
          {NAV.map((item) => {
            const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-surface font-medium text-primary"
                    : "text-primary/55 hover:bg-surface hover:text-primary"
                }`}
              >
                {item.icon}
                {item.label}
              </a>
            );
          })}
        </nav>
        <button
          onClick={() => { clearKey(); router.replace("/dashboard/login"); }}
          className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-primary/40 transition hover:text-primary/70"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M6 2H3a1 1 0 00-1 1v10a1 1 0 001 1h3M10.5 11l3-3-3-3M13.5 8H6" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Sign out
        </button>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Mobile top bar */}
        <header className="flex items-center justify-between border-b border-border bg-white px-4 py-3 md:hidden">
          <a href="https://tryclink.com" className="text-sm font-medium tracking-[-0.03em] text-primary">Clink</a>
          <nav className="flex items-center gap-1">
            {NAV.map((item) => (
              <a key={item.href} href={item.href} className="rounded-lg p-2 text-primary/55 hover:text-primary">
                {item.icon}
              </a>
            ))}
          </nav>
        </header>
        <main className="flex-1 px-4 py-6 md:px-8 md:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
