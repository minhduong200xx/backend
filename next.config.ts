import type { NextConfig } from "next";
import withAntdLess from "next-plugin-antd-less"; // Ensure the correct import

const nextConfig: NextConfig = {
  reactStrictMode: true,
};



export default withAntdLess({
  ...nextConfig,
  lessOptions: {
    modifyVars: {
      "@primary-color": "#1DA57A",
    },
    javascriptEnabled: true,
  },
 
});
