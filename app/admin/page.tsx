"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "./_lib/api";
import type { Payment } from "../dashboard/_lib/types";

interface Merchant {
  id: string;
  name: string;
  email: string;
  company?: string;
  createdAt: string;
}

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  settled: "bg-green-100 text-green-700",
  expired: "bg-surface-strong text-primary/50",
  failed: "bg-red-100 text-red-700",
};

export default function AdminOverviewPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      adminFetch<Payment[]>("/admin/payments?limit=10"),
      adminFetch<Merchant[]>("/admin/merchants"),
    ])
      .then(([p, m]) => { setPayments(p); setMerchants(m); })
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    merchants: merchants.length,
    total: payments.length,
    settled: payments.filter((p) => p.status === "settled").length,
    totalUsdc: payments.filter((p) => p.status === "settled").reduce((s, p) => s + p.amount, 0),
  };

  if (loading) return <div className="space-y-8 animate-pulse">{[1,2,3].map((i) => <div key={i} className="h-24 rounded-2xl bg-surface-strong" />)}</div>;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.12em] text-primary/40">Admin</p>
        <h1 className="mt-1 text-2xl font-medium tracking-[-0.04em] text-primary">Overview</h1>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Merchants", value: stats.merchants },
          { label: "Total payments", value: stats.total },
          { label: "Settled", value: stats.settled },
          { label: "USDC processed", value: stats.totalUsdc.toFixed(2) },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-white px-4 py-4">
            <p className="text-xs text-primary/45">{s.label}</p>
            <p className="mt-1.5 text-2xl font-medium tracking-[-0.04em] text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium text-primary">Recent payments</h2>
          <a href="/admin/payments" className="text-xs text-primary/50 underline underline-offset-4 hover:text-primary">View all</a>
        </div>
        {payments.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white px-6 py-10 text-center">
            <p className="text-sm text-primary/40">No payments yet.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-white">
            {payments.map((p, i) => (
              <div key={p.id} className={`flex items-center justify-between px-5 py-4 ${i !== 0 ? "border-t border-border" : ""}`}>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-primary">{p.description ?? "—"}</p>
                  <p className="mt-0.5 font-mono text-xs text-primary/40">{p.id}</p>
                </div>
                <div className="ml-4 flex items-center gap-3">
                  <span className="text-sm font-medium text-primary">{p.amount} USDC</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[p.status]}`}>{p.status}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
