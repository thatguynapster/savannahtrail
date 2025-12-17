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
			},
			{
				hostname: "images.unsplash.com",
				pathname: "**"
			}
		]
	},
	// Security headers to mitigate react2shell and other vulnerabilities
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: [
					{
						key: "Content-Security-Policy",
						value: [
							"default-src 'self'",
							"script-src 'self' 'unsafe-inline' 'unsafe-eval' https://vercel.live",
							"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
							"font-src 'self' https://fonts.gstatic.com",
							"img-src 'self' data: blob: https://savannahtrail.s3.us-east-2.amazonaws.com https://images.unsplash.com https://example.com",
							"connect-src 'self' http://localhost:8081 https://vercel.live",
							"frame-src 'self' https://www.google.com",
							"object-src 'none'",
							"base-uri 'self'",
							"form-action 'self'",
							"frame-ancestors 'none'",
							"upgrade-insecure-requests"
						].join("; ")
					},
					{
						key: "X-Frame-Options",
						value: "DENY"
					},
					{
						key: "X-Content-Type-Options",
						value: "nosniff"
					},
					{
						key: "Referrer-Policy",
						value: "strict-origin-when-cross-origin"
					},
					{
						key: "X-XSS-Protection",
						value: "1; mode=block"
					}
				]
			}
		];
	}
};

export default nextConfig;
