import type { Payment } from "../_lib/types";
import { CopyButton } from "./CopyButton";
import { Countdown } from "./Countdown";
import { QRCode } from "./QRCode";
import { DemoCompleteButton } from "./DemoCompleteButton";

export function PaymentPending({ payment }: { payment: Payment }) {
  const shortAddress = `${payment.stellarAddress.slice(0, 6)}...${payment.stellarAddress.slice(-6)}`;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-xs uppercase tracking-[0.18em] text-primary/40">Complete your payment</p>
        <p className="mt-2 text-4xl font-medium tracking-[-0.04em] text-primary">
          {payment.amount} {payment.currency}
        </p>
        {payment.localAmount != null && (
          <p className="mt-1 text-sm text-primary/55">
            ≈ {payment.localAmount.toLocaleString()} {payment.localCurrency}
          </p>
        )}
        {payment.description && (
          <p className="mt-2 text-sm text-primary/55">{payment.description}</p>
        )}
      </div>

      <div className="flex justify-center">
        <QRCode stellarAddress={payment.stellarAddress} memo={payment.memo} amount={payment.amount} />
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-primary/45">Send USDC to</p>
            <p className="mt-0.5 truncate font-mono text-sm text-primary">{shortAddress}</p>
          </div>
          <CopyButton text={payment.stellarAddress} />
        </div>

        <div className="flex items-center justify-between rounded-xl border border-border bg-surface px-4 py-3">
          <div className="min-w-0 flex-1">
            <p className="text-xs text-primary/45">Memo (required)</p>
            <p className="mt-0.5 truncate font-mono text-sm text-primary">{payment.memo}</p>
          </div>
          <CopyButton text={payment.memo} />
        </div>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
        <p className="text-xs text-amber-800">
          <span className="font-medium">Important:</span> Include the memo exactly as shown — without it
          your payment cannot be matched.
        </p>
      </div>

      <div className="flex items-center justify-center gap-2 text-sm">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" className="shrink-0 text-primary/40">
          <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2" />
          <path d="M7 4v3.5l2 2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        <span className="text-primary/55">
          Expires in <span className="font-medium"><Countdown expiresAt={payment.expiresAt} /></span>
        </span>
      </div>

      {payment.devMode && <DemoCompleteButton paymentId={payment.id} />}
    </div>
  );
}
