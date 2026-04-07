import { ImageResponse } from "next/og";
import { siteConfig } from "./lib/site";

export const alt = "Clink stablecoin payments on Stellar";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          overflow: "hidden",
          background: "#ffffff",
          color: "#252F2C",
          padding: "56px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-140px",
            left: "50%",
            width: "480px",
            height: "480px",
            borderRadius: "9999px",
            transform: "translateX(-50%)",
            background:
              "linear-gradient(180deg, rgba(122, 215, 255, 0.55) 0%, rgba(255, 193, 21, 0.55) 100%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-20px",
            top: "50%",
            width: "340px",
            height: "340px",
            borderRadius: "9999px",
            transform: "translateY(-50%)",
            background:
              "linear-gradient(180deg, rgba(50, 195, 164, 0.5) 0%, rgba(161, 255, 124, 0.5) 100%)",
            filter: "blur(60px)",
          }}
        />
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            borderRadius: "36px",
            border: "1px solid rgba(37, 47, 44, 0.12)",
            background: "rgba(255, 255, 255, 0.82)",
            padding: "48px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: 28,
            }}
          >
            <div style={{ fontWeight: 700 }}>{siteConfig.name}</div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "9999px",
                background: "#D3EEC9",
                padding: "12px 20px",
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              Stablecoin checkout
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "18px",
              maxWidth: "760px",
            }}
          >
            <div
              style={{
                display: "flex",
                fontSize: 76,
                lineHeight: 1,
                letterSpacing: "-0.05em",
              }}
            >
              Accept USDC on Stellar in minutes.
            </div>
            <div
              style={{
                display: "flex",
                fontSize: 28,
                lineHeight: 1.35,
                color: "rgba(37, 47, 44, 0.78)",
              }}
            >
              Build global payments with faster checkout, simpler settlement,
              and a cleaner stablecoin payment flow.
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: "16px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "188px",
                borderRadius: "9999px",
                background: "#252F2C",
                padding: "16px 28px",
                color: "#ffffff",
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              Book a demo
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minWidth: "188px",
                borderRadius: "9999px",
                background: "#D3EEC9",
                padding: "16px 28px",
                color: "#252F2C",
                fontSize: 22,
                fontWeight: 600,
              }}
            >
              View docs
            </div>
          </div>
        </div>
      </div>
    ),
    size
  );
}
