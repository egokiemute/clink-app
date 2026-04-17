export type PaymentStatus =
  | "pending"
  | "confirmed"
  | "settled"
  | "expired"
  | "failed";

export interface Payment {
  id: string;
  stellarAddress: string;
  memo: string;
  amount: number;
  currency: string;
  localCurrency: string;
  description?: string;
  status: PaymentStatus;
  expiresAt: string;
  createdAt: string;
  localAmount?: number;
  settledAt?: string;
  failedAt?: string;
  failureReason?: string;
  successUrl?: string;
  cancelUrl?: string;
  stellarTxHash?: string;
  devMode?: boolean;
}
