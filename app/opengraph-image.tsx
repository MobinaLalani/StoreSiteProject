import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { settingsRepository } from "@/src/repositories/settings.repository";
import type { SiteSettings } from "@/src/features/admin/settings/types";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

export default async function OpenGraphImage() {
  const [settings, font] = await Promise.all([
    settingsRepository.getPublic() as Promise<unknown> as Promise<SiteSettings>,
    readFile(path.join(process.cwd(), "src", "assets", "fonts", "YekanBakh-Regular.ttf")),
  ]);

  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "72px", color: "white", background: "linear-gradient(135deg, #0f172a 0%, #1e293b 52%, #dc2626 100%)", fontFamily: "Yekan" }}>
      <div style={{ display: "flex", fontSize: 28, color: "#fecaca" }}>تجهیزات صنعتی و تخصصی</div>
      <div style={{ display: "flex", marginTop: 24, fontSize: 74, fontWeight: 700, lineHeight: 1.3 }}>{settings.store.name}</div>
      <div style={{ display: "flex", marginTop: 28, maxWidth: 900, fontSize: 30, lineHeight: 1.6, color: "#e2e8f0" }}>{settings.store.shortDescription}</div>
    </div>,
    { ...size, fonts: [{ name: "Yekan", data: font, weight: 400 }] },
  );
}
