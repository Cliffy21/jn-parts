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
            right: "-120px",
            top: "-120px",
            width: "440px",
            height: "440px",
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(239,68,68,0.3) 0%, rgba(249,115,22,0.08) 60%, rgba(0,0,0,0) 100%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: "-160px",
            bottom: "-180px",
            width: "520px",
            height: "520px",
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(249,115,22,0.18) 0%, rgba(0,0,0,0) 70%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
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
            Nairobi, Kenya
          </div>
          <div style={{ fontSize: "72px", fontWeight: 800, lineHeight: 1.05, maxWidth: "900px" }}>
            JN Parts & Accessories
          </div>
          <div style={{ fontSize: "34px", color: "#d4d4d8", maxWidth: "920px", lineHeight: 1.25 }}>
            Premium Car Wraps, PPF, Detailing & Auto Upgrades
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontSize: "28px", color: "#a1a1aa" }}>jncaraccessories.com</div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              padding: "12px 18px",
              borderRadius: "14px",
              background: "linear-gradient(90deg, #dc2626, #f97316)",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            Get a Free Quote
          </div>
        </div>
      </div>
    ),
    size,
  );
}
