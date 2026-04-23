import { ImageResponse } from "next/og";
import { blogPosts } from "@/app/components/blogData";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type Props = {
  params: {
    slug: string;
  };
};

function truncate(text: string, maxLength: number) {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength - 1)}…`;
}

export default function Image({ params }: Props) {
  const post = blogPosts.find((item) => item.slug === params.slug);
  const title = post ? truncate(post.title, 92) : "JN Parts Blog";
  const description = post
    ? truncate(post.metaDescription, 128)
    : "Car tips, upgrade guides, and expert advice from JN Parts.";

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
            width: "420px",
            height: "420px",
            borderRadius: "9999px",
            background: "radial-gradient(circle, rgba(220,38,38,0.32) 0%, rgba(249,115,22,0.1) 58%, rgba(0,0,0,0) 100%)",
          }}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignSelf: "flex-start",
              padding: "8px 14px",
              borderRadius: "9999px",
              fontSize: "23px",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#d4d4d8",
            }}
          >
            JN Parts Blog
          </div>
          <div style={{ fontSize: "60px", fontWeight: 800, lineHeight: 1.08, maxWidth: "980px" }}>{title}</div>
          <div style={{ fontSize: "30px", color: "#d4d4d8", maxWidth: "940px", lineHeight: 1.3 }}>{description}</div>
        </div>

        <div style={{ fontSize: "28px", color: "#a1a1aa" }}>jncaraccessories.com/blog</div>
      </div>
    ),
    size,
  );
}
