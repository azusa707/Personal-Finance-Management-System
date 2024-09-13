/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config, { isServer }) {
        if (!isServer) {
          // Exclude server-side modules from client-side bundles
          config.resolve.fallback = {
            dns: false,
            fs: false,
            net: false, 
            tls: false,// Add any other server-side modules if needed
          };
        }
        return config;
      },
};

export default nextConfig;