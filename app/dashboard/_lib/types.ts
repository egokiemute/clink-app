export type PaymentStatus = "pending" | "confirmed" | "settled" | "expired" | "failed";
export type MerchantVerificationStatus = "pending" | "approved" | "rejected";

export interface Payment {
  id: string;
  stellarAddress: string;
  memo: string;
  amount: number;
  currency: "USDC";
  localCurrency: string;
  description?: string;
  customerEmail?: string;
  localAmount?: number;
  status: PaymentStatus;
  stellarTxHash?: string;
  callbackUrl: string;
  metadata?: Record<string, unknown>;
  expiresAt: string;
  createdAt: string;
  settledAt?: string;
  failedAt?: string;
  failureReason?: string;
}

export interface Developer {
  id: string;
  name: string;
  email: string;
  company?: string;
  secretKey?: string;
  createdAt: string;
  businessName?: string;
  businessType?: string;
  country?: string;
  verificationStatus?: MerchantVerificationStatus;
  verificationNote?: string;
  stellarPublicKey?: string;
}
