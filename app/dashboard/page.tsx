"use client";

import { useEffect, useState } from "react";
import { apiFetch } from "./_lib/api";
import type { Payment, Developer } from "./_lib/types";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-[#CFEADC] text-[#1F6B3F]",
  settled: "bg-green-100 text-green-700",
  expired: "bg-surface-strong text-primary/50",
  failed: "bg-red-100 text-red-700",
};

export default function DashboardOverviewPage() {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiFetch<Payment[]>("/payments?limit=5"),
      apiFetch<Developer>("/me"),
    ])
      .then(([p, d]) => { setPayments(p); setDeveloper(d); })
      .finally(() => setLoading(false));
  }, []);

  const stats = {
    total: payments.length,
    settled: payments.filter((p) => p.status === "settled").length,
    pending: payments.filter((p) => p.status === "pending").length,
    totalUsdc: payments
      .filter((p) => p.status === "settled")
      .reduce((sum, p) => sum + p.amount, 0),
  };

  if (loading) return <SkeletonOverview />;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.12em] text-primary/40">Dashboard</p>
        <h1 className="mt-1 text-2xl font-medium tracking-[-0.04em] text-primary">
          {developer ? `Welcome, ${developer.name.split(" ")[0]}` : "Overview"}
        </h1>
        {developer?.company && (
          <p className="mt-0.5 text-sm text-primary/50">{developer.company}</p>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: "Total payments", value: stats.total },
          { label: "Settled", value: stats.settled },
          { label: "Pending", value: stats.pending },
          { label: "USDC processed", value: `${stats.totalUsdc.toFixed(2)}` },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-white px-4 py-4">
            <p className="text-xs text-primary/45">{s.label}</p>
            <p className="mt-1.5 text-2xl font-medium tracking-[-0.04em] text-primary">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Recent payments */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-sm font-medium tracking-[-0.02em] text-primary">Recent payments</h2>
          <a href="/dashboard/payments" className="text-xs text-primary/50 underline underline-offset-4 hover:text-primary">
            View all
          </a>
        </div>

        {payments.length === 0 ? (
          <div className="rounded-2xl border border-border bg-white px-6 py-10 text-center">
            <p className="text-sm text-primary/40">No payments yet.</p>
            <p className="mt-1 text-xs text-primary/30">Payments will appear here once you start receiving them.</p>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border bg-white">
            {payments.map((p, i) => (
              <a
                key={p.id}
                href={`/dashboard/payments/${p.id}`}
                className={`flex items-center justify-between px-5 py-4 transition hover:bg-surface ${i !== 0 ? "border-t border-border" : ""}`}
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-primary">{p.description ?? p.id}</p>
                  <p className="mt-0.5 text-xs text-primary/45">
                    {new Date(p.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                  </p>
                </div>
                <div className="ml-4 flex items-center gap-3">
                  <span className="text-sm font-medium text-primary">{p.amount} USDC</span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[p.status]}`}>
                    {p.status}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function SkeletonOverview() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="h-8 w-48 rounded-xl bg-surface-strong" />
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[1,2,3,4].map((i) => <div key={i} className="h-20 rounded-2xl bg-surface-strong" />)}
      </div>
      <div className="h-48 rounded-2xl bg-surface-strong" />
    </div>
  );
}
