import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
/** GitHub Pages — статика без API. Vercel — сервер + ЮKassa. */
const staticExport = process.env.NEXT_PUBLIC_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(staticExport ? { output: "export" as const } : {}),
  trailingSlash: true,
  images: { unoptimized: true },
  ...(basePath ? { basePath, assetPrefix: `${basePath}/` } : {}),
};

export default nextConfig;
