"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { apiFetch } from "../../_lib/api";
import type { Payment } from "../../_lib/types";

const STATUS_COLORS: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700",
  confirmed: "bg-blue-100 text-blue-700",
  settled: "bg-green-100 text-green-700",
  expired: "bg-surface-strong text-primary/50",
  failed: "bg-red-100 text-red-700",
};

const STELLAR_NETWORK = process.env.NEXT_PUBLIC_STELLAR_NETWORK === "testnet" ? "testnet" : "public";
const STELLAR_EXPLORER = `https://stellar.expert/explorer/${STELLAR_NETWORK}/tx`;

export default function PaymentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    apiFetch<Payment>(`/payments/${id}`)
      .then(setPayment)
      .finally(() => setLoading(false));
  }, [id]);

  async function copy(text: string, key: string) {
    await navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(null), 2000);
  }

  if (loading) return <div className="h-64 animate-pulse rounded-2xl bg-surface-strong" />;

  if (!payment) {
    return (
      <div className="rounded-2xl border border-border bg-white px-6 py-12 text-center">
        <p className="text-sm text-primary/40">Payment not found.</p>
        <a href="/dashboard/payments" className="mt-3 inline-block text-xs text-primary underline underline-offset-4">
          Back to payments
        </a>
      </div>
    );
  }

  const timeline = [
    { label: "Created", time: payment.createdAt, done: true },
    { label: "USDC confirmed on Stellar", time: payment.stellarTxHash ? payment.createdAt : null, done: !!payment.stellarTxHash },
    { label: "Settled to bank", time: payment.settledAt, done: !!payment.settledAt },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <a href="/dashboard/payments" className="text-sm text-primary/50 hover:text-primary">← Payments</a>
        <span className="text-primary/20">/</span>
        <p className="font-mono text-sm text-primary/60">{payment.id}</p>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {/* Main info */}
        <div className="space-y-4 lg:col-span-2">
          <div className="rounded-2xl border border-border bg-white px-6 py-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.12em] text-primary/40">Payment</p>
                <p className="mt-1 text-3xl font-medium tracking-[-0.04em] text-primary">
                  {payment.amount} USDC
                </p>
                {payment.localAmount != null && (
                  <p className="mt-0.5 text-sm text-primary/50">
                    ≈ {payment.localAmount.toLocaleString()} {payment.localCurrency}
                  </p>
                )}
                {payment.description && (
                  <p className="mt-2 text-sm text-primary/60">{payment.description}</p>
                )}
              </div>
              <span className={`rounded-full px-3 py-1 text-xs font-medium ${STATUS_COLORS[payment.status]}`}>
                {payment.status}
              </span>
            </div>
          </div>

          {/* Blockchain details */}
          <div className="rounded-2xl border border-border bg-white px-6 py-5">
            <h2 className="mb-4 text-sm font-medium text-primary">Blockchain details</h2>
            <div className="space-y-3">
              <Field label="Stellar address" value={payment.stellarAddress} monospace onCopy={() => copy(payment.stellarAddress, "addr")} copyLabel={copied === "addr" ? "Copied!" : "Copy"} />
              <Field label="Memo" value={payment.memo} monospace onCopy={() => copy(payment.memo, "memo")} copyLabel={copied === "memo" ? "Copied!" : "Copy"} />
              {payment.stellarTxHash && (
                <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="text-xs text-primary/45">Transaction hash</p>
                    <p className="mt-0.5 truncate font-mono text-sm text-primary">{payment.stellarTxHash}</p>
                  </div>
                  <a
                    href={`${STELLAR_EXPLORER}/${payment.stellarTxHash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-3 shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-primary/60 transition hover:bg-surface-strong hover:text-primary"
                  >
                    View ↗
                  </a>
                </div>
              )}
            </div>
          </div>

          {payment.failureReason && (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
              <p className="text-xs font-medium text-red-700">Failure reason</p>
              <p className="mt-1 text-sm text-red-600">{payment.failureReason}</p>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Timeline */}
          <div className="rounded-2xl border border-border bg-white px-5 py-5">
            <h2 className="mb-4 text-sm font-medium text-primary">Timeline</h2>
            <ol className="space-y-4">
              {timeline.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${step.done ? "bg-brand" : "border border-border bg-white"}`}>
                    {step.done && (
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                        <path d="M1.5 4L3 5.5L6.5 2" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </span>
                  <div>
                    <p className={`text-sm ${step.done ? "text-primary" : "text-primary/35"}`}>{step.label}</p>
                    {step.time && (
                      <p className="mt-0.5 text-xs text-primary/40">
                        {new Date(step.time).toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                      </p>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Meta */}
          <div className="rounded-2xl border border-border bg-white px-5 py-5">
            <h2 className="mb-4 text-sm font-medium text-primary">Details</h2>
            <dl className="space-y-3">
              {payment.customerEmail && <Meta label="Customer email" value={payment.customerEmail} />}
              <Meta label="Local currency" value={payment.localCurrency} />
              <Meta label="Expires at" value={new Date(payment.expiresAt).toLocaleString("en-GB")} />
              <Meta label="Payment ID" value={payment.id} mono />
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, monospace, onCopy, copyLabel }: { label: string; value: string; monospace?: boolean; onCopy: () => void; copyLabel: string }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
      <div className="min-w-0 flex-1">
        <p className="text-xs text-primary/45">{label}</p>
        <p className={`mt-0.5 truncate text-sm text-primary ${monospace ? "font-mono" : ""}`}>{value}</p>
      </div>
      <button onClick={onCopy} className="ml-3 shrink-0 rounded-lg px-3 py-1.5 text-xs font-medium text-primary/60 transition hover:bg-surface-strong hover:text-primary">
        {copyLabel}
      </button>
    </div>
  );
}

function Meta({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div>
      <dt className="text-xs text-primary/45">{label}</dt>
      <dd className={`mt-0.5 text-sm text-primary ${mono ? "font-mono" : ""}`}>{value}</dd>
    </div>
  );
}
