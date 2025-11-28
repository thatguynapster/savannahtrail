import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				hostname: "savannahtrail.s3.us-east-2.amazonaws.com",
				pathname: "**"
			},
			{
				hostname: "example.com",
				pathname: "**"
			}
		]
	}
};

export default nextConfig;
