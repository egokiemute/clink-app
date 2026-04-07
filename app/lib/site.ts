export const siteConfig = {
  name: "Clink",
  shortName: "Clink",
  description:
    "Accept stablecoin payments and settle locally with Clink. Build global payments on Stellar with a faster checkout experience.",
  locale: "en_US",
  keywords: [
    "Clink",
    "stablecoin payments",
    "USDC",
    "Stellar",
    "crypto checkout",
    "payment infrastructure",
    "cross-border payments",
    "global payments",
  ],
};

export function getSiteUrl() {
  const envUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined) ??
    "http://localhost:3000";

  return envUrl.endsWith("/") ? envUrl.slice(0, -1) : envUrl;
}

