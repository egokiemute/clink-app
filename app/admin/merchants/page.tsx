"use client";

import { useEffect, useState } from "react";
import { adminFetch } from "../_lib/api";
import type { MerchantVerificationStatus } from "../../dashboard/_lib/types";

interface Merchant {
  id: string;
  name: string;
  email: string;
  company?: string;
  businessName?: string;
  businessType?: string;
  country?: string;
  verificationStatus?: MerchantVerificationStatus;
  verificationNote?: string;
  createdAt: string;
}

type StatusFilter = "all" | MerchantVerificationStatus;

const STATUS_BADGE: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-green-100 text-green-700",
  rejected: "bg-red-100 text-red-700",
};

export default function AdminMerchantsPage() {
  const [merchants, setMerchants] = useState<Merchant[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<StatusFilter>("all");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [rejectModal, setRejectModal] = useState<{
    id: string;
    name: string;
  } | null>(null);
  const [rejectNote, setRejectNote] = useState("");

  function fetchMerchants(status?: StatusFilter) {
    setLoading(true);
    const path =
      status && status !== "all"
        ? `/admin/merchants?status=${status}`
        : "/admin/merchants";
    adminFetch<Merchant[]>(path)
      .then(setMerchants)
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchMerchants(filter);
  }, [filter]);

  async function handleApprove(id: string) {
    setActionLoading(id);
    try {
      const result = await adminFetch<{ merchant: Merchant; warning?: string }>(
        `/admin/merchants/${id}/approve`,
        { method: "POST" },
      );
      setMerchants((prev) =>
        prev.map((m) =>
          m.id === id ? { ...m, verificationStatus: "approved" } : m,
        ),
      );
      if (result.warning) {
        alert(`Approved — but: ${result.warning}`);
      }
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to approve merchant");
    } finally {
      setActionLoading(null);
    }
  }

  async function handleReject(id: string, note: string) {
    setActionLoading(id);
    try {
      await adminFetch(`/admin/merchants/${id}/reject`, {
        method: "POST",
        body: JSON.stringify({ note }),
      });
      setMerchants((prev) =>
        prev.map((m) =>
          m.id === id
            ? { ...m, verificationStatus: "rejected", verificationNote: note }
            : m,
        ),
      );
      setRejectModal(null);
      setRejectNote("");
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to reject merchant");
    } finally {
      setActionLoading(null);
    }
  }

  const tabs: { label: string; value: StatusFilter }[] = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Approved", value: "approved" },
    { label: "Rejected", value: "rejected" },
  ];

  const pendingCount = merchants.filter(
    (m) => m.verificationStatus === "pending",
  ).length;

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-primary/40">
            Admin
          </p>
          <h1 className="mt-1 text-2xl font-medium tracking-[-0.04em] text-primary">
            Merchants
          </h1>
        </div>
        <p className="text-sm text-primary/50">{merchants.length} shown</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-2xl border border-border bg-surface p-1">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            className={`flex flex-1 items-center justify-center gap-1.5 rounded-xl px-3 py-2 text-sm font-medium transition ${
              filter === tab.value
                ? "bg-white text-primary shadow-sm"
                : "text-primary/50 hover:text-primary"
            }`}
          >
            {tab.label}
            {tab.value === "pending" &&
              pendingCount > 0 &&
              filter !== "pending" && (
                <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[10px] font-semibold text-white">
                  {pendingCount}
                </span>
              )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="space-y-2 animate-pulse">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 rounded-2xl bg-surface-strong" />
          ))}
        </div>
      ) : merchants.length === 0 ? (
        <div className="rounded-2xl border border-border bg-white px-6 py-12 text-center">
          <p className="text-sm text-primary/40">
            No merchants in this category.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          {merchants.map((m, i) => (
            <div
              key={m.id}
              className={`px-5 py-4 ${i !== 0 ? "border-t border-border" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-surface-strong text-sm font-medium text-primary">
                    {m.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium text-primary">
                        {m.name}
                      </p>
                      {m.verificationStatus && (
                        <span
                          className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${STATUS_BADGE[m.verificationStatus] ?? "bg-surface-strong text-primary/50"}`}
                        >
                          {m.verificationStatus}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-primary/45">{m.email}</p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  {m.verificationStatus === "pending" && (
                    <>
                      <button
                        onClick={() => handleApprove(m.id)}
                        disabled={actionLoading === m.id}
                        className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 transition hover:bg-green-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {actionLoading === m.id ? "…" : "Approve"}
                      </button>
                      <button
                        onClick={() => {
                          setRejectModal({ id: m.id, name: m.name });
                          setRejectNote("");
                        }}
                        disabled={actionLoading === m.id}
                        className="rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>
              </div>

              {(m.businessName || m.country || m.businessType) && (
                <div className="mt-2.5 ml-13 flex flex-wrap gap-x-4 gap-y-1 pl-13 text-xs text-primary/45">
                  {m.businessName && <span>{m.businessName}</span>}
                  {m.businessType && (
                    <span className="capitalize">{m.businessType}</span>
                  )}
                  {m.country && <span>{m.country}</span>}
                  <span>
                    Joined{" "}
                    {new Date(m.createdAt).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
              )}

              {m.verificationNote && m.verificationStatus === "rejected" && (
                <p className="mt-2 ml-13 text-xs text-red-600 italic">
                  {m.verificationNote}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Reject modal */}
      {rejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-sm rounded-2xl border border-border bg-white px-6 py-6 shadow-xl">
            <h2 className="text-base font-medium tracking-[-0.03em] text-primary">
              Reject {rejectModal.name}?
            </h2>
            <p className="mt-1 text-sm text-primary/50">
              Provide a reason that will be emailed to the merchant.
            </p>
            <textarea
              value={rejectNote}
              onChange={(e) => setRejectNote(e.target.value)}
              placeholder="e.g. We were unable to verify your business details."
              rows={3}
              className="mt-4 w-full rounded-xl border border-border bg-surface px-4 py-3 text-sm text-primary outline-none transition focus:border-brand/50 resize-none"
            />
            <div className="mt-4 flex gap-2">
              <button
                onClick={() => setRejectModal(null)}
                className="flex-1 rounded-full border border-border py-2.5 text-sm text-primary/60 transition hover:bg-surface"
              >
                Cancel
              </button>
              <button
                onClick={() => handleReject(rejectModal.id, rejectNote)}
                disabled={actionLoading === rejectModal.id}
                className="flex-1 rounded-full bg-red-600 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:opacity-50"
              >
                {actionLoading === rejectModal.id
                  ? "Rejecting…"
                  : "Confirm reject"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
