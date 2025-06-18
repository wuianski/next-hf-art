import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    DIRECTUS_GRAPHQL: process.env.DIRECTUS_GRAPHQL,
    DIRECTUS_IMAGE_DOMAIN_DO: process.env.DIRECTUS_IMAGE_DOMAIN_DO,
  },
  images: {
    minimumCacheTTL: 60,
    /* add remotePatterns to fix issue of Un-configured Host*/
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dataprojects.hongfoundation.org.tw",
        port: "",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
