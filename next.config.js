const withNextIntl = require("next-intl/plugin")();

const BASE_URL_DEFAULT = "http://localhost:3000";
const BASE_URL =
  process.env.NODE_ENV !== "production"
    ? BASE_URL_DEFAULT
    : process.env.BASE_URL ?? BASE_URL_DEFAULT;

/**
 * @type {import('next').NextConfig} nextConfig
 */
const nextConfig = () => {
  const plugins = [withNextIntl];

  /**
   * @type {import('next').NextConfig} baseConfig
   */
  const baseConfig = {
    env: {
      BASE_URL: BASE_URL,
    },
    images: {
      unoptimized: true,
    },
    reactStrictMode: true,
    output: "export",
    webpack: (config, context) => {
      return config;
    },
  };

  return plugins.reduce((result, plugin) => plugin(result), baseConfig);
};

module.exports = nextConfig;
