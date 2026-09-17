const isGithubActions = process.env.GITHUB_ACTIONS === "true"

let basePath = ""
if (isGithubActions) {
  const repo = process.env.GITHUB_REPOSITORY?.replace(/.*\//, "") ?? ""
  // A repo named <user>.github.io (or <org>.github.io) is a user/org page and
  // is served from the domain root, not a subpath — only project repos need a basePath.
  if (repo && !repo.endsWith(".github.io")) {
    basePath = `/${repo}`
  }
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
