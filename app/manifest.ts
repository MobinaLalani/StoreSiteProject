import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "اتصال گستر", short_name: "اتصال گستر", description: "فروشگاه تخصصی تجهیزات صنعتی", start_url: "/", display: "standalone", background_color: "#f8fafc", theme_color: "#ef4444", lang: "fa", dir: "rtl" };
}
