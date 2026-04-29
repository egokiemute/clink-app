"use client";

import { QRCodeSVG } from "qrcode.react";

interface QRCodeProps {
  stellarAddress: string;
  memo: string;
  amount: number;
}

const USDC_ISSUER = "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5";

export function QRCode({ stellarAddress, memo, amount }: QRCodeProps) {
  const uri = `stellar:${stellarAddress}?memo=${encodeURIComponent(memo)}&amount=${amount}&asset_code=USDC&asset_issuer=${USDC_ISSUER}`;
  return (
    <div className="inline-flex rounded-2xl border border-border bg-white p-4">
      <QRCodeSVG value={uri} size={160} fgColor="#252f2c" bgColor="#ffffff" level="M" />
    </div>
  );
}
