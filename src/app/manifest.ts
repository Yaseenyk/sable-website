import type { MetadataRoute } from "next";
import { PRODUCT, SITE_DESCRIPTION } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${PRODUCT}: personal money app`,
    short_name: PRODUCT,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "browser",
    background_color: "#070b16",
    theme_color: "#070b16",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
