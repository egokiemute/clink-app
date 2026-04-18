import type { Metadata } from "next";
import type { Payment } from "../_lib/types";
import { PaymentClient } from "./PaymentClient";

const API_URL = process.env.API_URL ?? "https://api.tryclink.com";

interface Props {
  params: Promise<{ id: string }>;
}

async function fetchPayment(id: string): Promise<Payment | null> {
  try {
    const res = await fetch(`${API_URL}/pay/${id}`, { cache: "no-store" });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error(`API ${res.status}`);
    return res.json() as Promise<Payment>;
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const payment = await fetchPayment(id);
  if (!payment) return { title: "Payment not found" };
  return {
    title: `Pay ${payment.amount} ${payment.currency}`,
    description: payment.description ?? "Complete your Clink payment.",
    robots: { index: false, follow: false },
  };
}

export default async function PaymentPage({ params }: Props) {
  const { id } = await params;
  const payment = await fetchPayment(id);

  return (
    <main className="flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <a
            href="https://tryclink.com"
            className="text-sm font-medium tracking-[-0.03em] text-primary/60 transition hover:text-primary"
          >
            Clink
          </a>
        </div>

        <div className="rounded-2xl border border-border bg-white px-6 py-8 shadow-sm sm:px-8">
          {payment ? <PaymentClient initialPayment={payment} /> : <NotFound />}
        </div>

        <p className="mt-6 text-center text-xs text-primary/35">
          Secured by{" "}
          <a
            href="https://tryclink.com"
            className="underline underline-offset-4 hover:text-primary/60"
          >
            Clink
          </a>{" "}
          &middot; USDC on Stellar
        </p>
      </div>
    </main>
  );
}

function NotFound() {
  return (
    <div className="space-y-3 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-surface-strong">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <circle
            cx="12"
            cy="12"
            r="9"
            stroke="#252f2c"
            strokeWidth="1.5"
            strokeOpacity="0.4"
          />
          <path
            d="M12 8v4M12 16h.01"
            stroke="#252f2c"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeOpacity="0.4"
          />
        </svg>
      </div>
      <h1 className="text-xl font-medium tracking-[-0.03em] text-primary">
        Payment not found
      </h1>
      <p className="text-sm text-primary/50">
        This payment link is invalid or has been removed.
      </p>
    </div>
  );
}
