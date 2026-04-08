import type { Payment } from "../_lib/types";

export function PaymentExpired({ payment }: { payment: Payment }) {
  return (
    <div className="space-y-6 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-surface-strong">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true">
          <circle cx="14" cy="14" r="11" stroke="#252f2c" strokeWidth="1.8" strokeOpacity="0.4" />
          <path d="M14 8v6.5l3.5 3.5" stroke="#252f2c" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.4" />
        </svg>
      </div>

      <div>
        <h2 className="text-2xl font-medium tracking-[-0.04em] text-primary">Payment expired</h2>
        <p className="mt-2 text-sm text-primary/55">
          This payment link has expired. Please request a new one from the merchant.
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
