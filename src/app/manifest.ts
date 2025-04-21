import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: process.env.NEXT_PUBLIC_SITE_NAME,
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION,
    icons: [
      {
        src: "/icon.png",
        sizes: "72x72",
        type: "image/png",
      },
    ],
    theme_color: "#603cba",
    background_color: "#090a0b",
  };
}
