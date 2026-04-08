"use client";

import { QRCodeSVG } from "qrcode.react";

interface QRCodeProps {
  stellarAddress: string;
  memo: string;
  amount: number;
}

export function QRCode({ stellarAddress, memo, amount }: QRCodeProps) {
  const uri = `stellar:${stellarAddress}?memo=${encodeURIComponent(memo)}&amount=${amount}&asset_code=USDC`;
  return (
    <div className="inline-flex rounded-2xl border border-border bg-white p-4">
      <QRCodeSVG value={uri} size={160} fgColor="#252f2c" bgColor="#ffffff" level="M" />
    </div>
  );
}
