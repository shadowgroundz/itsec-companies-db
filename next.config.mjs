/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@react-pdf/renderer"],
  },
  reactStrictMode: true,
  transpilePackages: [
    // antd & deps
    "@ant-design",
    "@rc-component",
    "antd",
    "rc-cascader",
    "rc-checkbox",
    "rc-collapse",
    "rc-dialog",
    "rc-drawer",
    "rc-dropdown",
    "rc-field-form",
    "rc-image",
    "rc-input",
    "rc-input-number",
    "rc-mentions",
    "rc-menu",
    "rc-motion",
    "rc-notification",
    "rc-pagination",
    "rc-picker",
    "rc-progress",
    "rc-rate",
    "rc-resize-observer",
    "rc-segmented",
    "rc-select",
    "rc-slider",
    "rc-steps",
    "rc-switch",
    "rc-table",
    "rc-tabs",
    "rc-textarea",
    "rc-tooltip",
    "rc-tree",
    "rc-tree-select",
    "rc-upload",
    "rc-util",
  ],
  serverRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  },
  publicRuntimeConfig: {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
      },
    ],
  },
};

export default nextConfig;
