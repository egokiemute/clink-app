import type { Payment } from "../_lib/types";

export function PaymentFailed({ payment }: { payment: Payment }) {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="14" cy="14" r="11" stroke="#ef4444" strokeWidth="1.8" />
          <path d="M10 10l8 8M18 10l-8 8" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </div>

      <div>
        <h2 className="text-2xl font-medium tracking-[-0.04em] text-primary">Payment failed</h2>
        <p className="mt-2 text-sm text-primary/55">
          {payment.failureReason ??
            "Something went wrong processing your payment. Please contact the merchant."}
        </p>
      </div>

      {payment.cancelUrl && (
        <a
          href={payment.cancelUrl}
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-border bg-surface px-6 py-3 text-sm font-medium text-primary transition hover:bg-surface-strong"
        >
          Go back
        </a>
      )}
    </div>
  );
}
