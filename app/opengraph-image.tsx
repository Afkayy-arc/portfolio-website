import { ImageResponse } from "next/og";
import { personalInfo } from "@/constants/data";

export const alt = `${personalInfo.name} — ${personalInfo.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Light (Vercel) treatment — social cards render on the platform's own background, so one version suffices.
export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "#ffffff",
          color: "#171717",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ width: 28, height: 28, borderRadius: 7, background: "#171717" }} />
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 600, letterSpacing: -3, lineHeight: 1.05 }}>{personalInfo.name}</div>
          <div style={{ fontSize: 32, color: "#666666" }}>{`${personalInfo.title} · Next.js, Node, Flutter, n8n`}</div>
        </div>
        <div style={{ fontSize: 22, color: "#888888" }}>{personalInfo.location}</div>
      </div>
    ),
    size
  );
}
