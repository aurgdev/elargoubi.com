import { siteConfig } from "@/config/site";
import { type MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: siteConfig.url,
    display: "standalone",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
