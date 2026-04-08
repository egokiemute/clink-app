"use client";

import { useEffect, useRef, useState } from "react";
import type { Payment } from "../_lib/types";
import { PaymentPending } from "../_components/PaymentPending";
import { PaymentConfirmed } from "../_components/PaymentConfirmed";
import { PaymentSettled } from "../_components/PaymentSettled";
import { PaymentExpired } from "../_components/PaymentExpired";
import { PaymentFailed } from "../_components/PaymentFailed";

const TERMINAL = new Set(["settled", "expired", "failed"]);
const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://api.tryclink.com";

export function PaymentClient({ initialPayment }: { initialPayment: Payment }) {
  const [payment, setPayment] = useState<Payment>(initialPayment);
  const esRef = useRef<EventSource | null>(null);

  useEffect(() => {
    if (TERMINAL.has(payment.status)) return;

    const es = new EventSource(`${API_URL}/pay/${payment.id}/stream`);
    esRef.current = es;

    es.onmessage = (event) => {
      try {
        const updated: Payment = JSON.parse(event.data as string);
        setPayment(updated);
        if (TERMINAL.has(updated.status)) es.close();
      } catch {
        // ignore malformed frames
      }
    };

    es.onerror = () => es.close();

    return () => es.close();
  }, []);

  // Auto-redirect 3 s after settlement
  useEffect(() => {
    if (payment.status !== "settled" || !payment.successUrl) return;
    const t = setTimeout(() => { window.location.href = payment.successUrl!; }, 3000);
    return () => clearTimeout(t);
  }, [payment.status, payment.successUrl]);

  return (
    <>
      {payment.status === "pending"   && <PaymentPending   payment={payment} />}
      {payment.status === "confirmed" && <PaymentConfirmed payment={payment} />}
      {payment.status === "settled"   && <PaymentSettled   payment={payment} />}
      {payment.status === "expired"   && <PaymentExpired   payment={payment} />}
      {payment.status === "failed"    && <PaymentFailed    payment={payment} />}
    </>
  );
}
