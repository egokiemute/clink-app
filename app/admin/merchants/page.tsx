"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "../_lib/api";

interface Merchant {
  id: string;
  name: string;
  email: string;
  company?: string;
  createdAt: string;
}

export default function AdminMerchantsPage() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminFetch<Merchant[]>("/admin/merchants").then(setMerchants).finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-primary/40">Admin</p>
          <h1 className="mt-1 text-2xl font-medium tracking-[-0.04em] text-primary">Merchants</h1>
        </div>
        <p className="text-sm text-primary/50">{merchants.length} registered</p>
      </div>

      {loading ? (
        <div className="space-y-2 animate-pulse">
          {[1,2,3].map((i) => <div key={i} className="h-16 rounded-2xl bg-surface-strong" />)}
        </div>
      ) : merchants.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white px-6 py-12 text-center">
          <p className="text-sm text-primary/40">No merchants yet.</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          {merchants.map((m, i) => (
            <div key={m.id} className={`flex items-center justify-between px-5 py-4 ${i !== 0 ? "border-t border-border" : ""}`}>
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-strong text-sm font-medium text-primary">
                  {m.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-primary">{m.name}</p>
                  <p className="text-xs text-primary/45">{m.email}</p>
                </div>
              </div>
              <div className="text-right">
                {m.company && <p className="text-sm text-primary/60">{m.company}</p>}
                <p className="text-xs text-primary/35">
                  Joined {new Date(m.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
