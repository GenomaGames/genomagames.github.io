/**
 * @type {import('next').NextConfig} nextConfig
 */
const nextConfig = () => {
  const plugins = [];

  /**
   * @type {import('next').NextConfig} baseConfig
   */
  const baseConfig = {
    env: {
      BASE_URL:
        process.env.NODE_ENV !== "production"
          ? "http://localhost:3000"
          : process.env.BASE_URL,
    },
    images: {
      unoptimized: true,
    },
    webpack: (config, context) => {
      return config;
    },
  };

  return plugins.reduce((result, plugin) => plugin(result), baseConfig);
};

module.exports = nextConfig;
