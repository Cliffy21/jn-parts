import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background: "linear-gradient(135deg, #09090b 0%, #111827 45%, #1f2937 100%)",
          color: "white",
          fontFamily: "Inter, Arial, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: "-140px",
            top: "-140px",
            width: "460px",
            height: "460px",
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(220,38,38,0.32) 0%, rgba(249,115,22,0.1) 58%, rgba(0,0,0,0) 100%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "16px", zIndex: 2 }}>
          <div
            style={{
              display: "inline-flex",
              padding: "8px 14px",
              borderRadius: "9999px",
              fontSize: "24px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#d4d4d8",
            }}
          >
            JN Parts Blog
          </div>
          <div style={{ fontSize: "68px", fontWeight: 800, lineHeight: 1.08, maxWidth: "940px" }}>
            Car Tips, Guides & Upgrade Advice
          </div>
          <div style={{ fontSize: "32px", color: "#d4d4d8", maxWidth: "900px", lineHeight: 1.28 }}>
            Practical insights for wraps, detailing, cameras, and accessories in Kenya.
          </div>
        </div>

        <div style={{ fontSize: "28px", color: "#a1a1aa", zIndex: 2 }}>jncaraccessories.com/blog</div>
      </div>
    ),
    size,
  );
}
