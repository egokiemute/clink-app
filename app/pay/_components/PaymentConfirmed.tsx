import type { Payment } from "../_lib/types";

export function PaymentConfirmed({ payment: _ }: { payment: Payment }) {
  return (
    <div className="space-y-6 text-center bg-white!">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
        <svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M6 14l6 6 10-10"
            stroke="#252f2c"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div>
        <h2 className="text-2xl font-medium tracking-[-0.04em] text-primary">
          Payment received
        </h2>
        <p className="mt-2 text-sm text-primary/55">
          USDC confirmed on Stellar.
          <br />
          Settling your payment now&hellip;
        </p>
      </div>

      <div className="flex justify-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-2 w-2 rounded-full bg-primary/30"
            style={{
              animation: `dot-pulse 1.4s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes dot-pulse {
          0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
          40%            { opacity: 1;   transform: scale(1);   }
        }
      `}</style>
    </div>
  );
}
