import type { Payment } from "../_lib/types";

const STELLAR_NETWORK = process.env.NEXT_PUBLIC_STELLAR_NETWORK === "testnet" ? "testnet" : "public";
const STELLAR_EXPLORER = `https://stellar.expert/explorer/${STELLAR_NETWORK}/tx`;

export function PaymentSettled({ payment }: { payment: Payment }) {
  return (
    <div className="space-y-6 text-center bg-white!">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <svg
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7 15l6 6 10-10"
            stroke="#252f2c"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div>
        <h2 className="text-2xl font-medium tracking-[-0.04em] text-primary">
          Payment complete
        </h2>
        <p className="mt-1 text-sm text-primary/55">
          {payment.amount} {payment.currency} received
          {payment.localAmount != null && (
            <>
              {" "}
              &rarr;{" "}
              <span className="font-medium text-primary">
                {payment.localAmount.toLocaleString()} {payment.localCurrency}
              </span>
            </>
          )}
        </p>
      </div>

      {payment.stellarTxHash && (
        <a
          href={`${STELLAR_EXPLORER}/${payment.stellarTxHash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs text-primary/50 underline underline-offset-4 hover:text-primary"
        >
          View on Stellar
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M1 9L9 1M9 1H4M9 1v5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </a>
      )}

      {payment.successUrl && (
        <div className="pt-2">
          <a
            href={payment.successUrl}
            className="inline-flex min-h-11 items-center justify-center rounded-xl bg-brand px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
          >
            Return to merchant
          </a>
          <p className="mt-3 text-xs text-primary/40">
            Redirecting automatically&hellip;
          </p>
        </div>
      )}
    </div>
  );
}
