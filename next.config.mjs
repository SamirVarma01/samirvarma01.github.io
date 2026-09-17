const isGithubActions = process.env.GITHUB_ACTIONS === "true"

let basePath = ""
if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY?.replace(/.*\//, "") ?? ""
  basePath = `/${repo}`
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
}

export default nextConfig
