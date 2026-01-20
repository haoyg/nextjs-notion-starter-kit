// import path from 'node:path'
// import { fileURLToPath } from 'node:url'

// import bundleAnalyzer from '@next/bundle-analyzer'

// const withBundleAnalyzer = bundleAnalyzer({
//   // eslint-disable-next-line no-process-env
//   enabled: process.env.ANALYZE === 'true'
// })

// export default withBundleAnalyzer({
//   staticPageGenerationTimeout: 300,
//   images: {
//     remotePatterns: [
//       { protocol: 'https', hostname: 'www.notion.so' },
//       { protocol: 'https', hostname: 'notion.so' },
//       { protocol: 'https', hostname: 'images.unsplash.com' },
//       { protocol: 'https', hostname: 'abs.twimg.com' },
//       { protocol: 'https', hostname: 'pbs.twimg.com' },
//       { protocol: 'https', hostname: 's3.us-west-2.amazonaws.com' }
//     ],
//     formats: ['image/avif', 'image/webp'],
//     dangerouslyAllowSVG: true,
//     contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;"
//   },

//   webpack: (config) => {
//     // Workaround for ensuring that `react` and `react-dom` resolve correctly
//     // when using a locally-linked version of `react-notion-x`.
//     // @see https://github.com/vercel/next.js/issues/50391
//     const dirname = path.dirname(fileURLToPath(import.meta.url))
//     config.resolve.alias.react = path.resolve(dirname, 'node_modules/react')
//     config.resolve.alias['react-dom'] = path.resolve(
//       dirname,
//       'node_modules/react-dom'
//     )
//     return config
//   },

//   // See https://react-tweet.vercel.app/next#troubleshooting
//   transpilePackages: ['react-tweet']
// })

import path from 'node:path'
import { fileURLToPath } from 'node:url'

import bundleAnalyzer from '@next/bundle-analyzer'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default withBundleAnalyzer({
  /**
   * ✅ 关键：显式关闭 Turbopack，使用 Webpack
   * 解决：
   * - Call retries were exceeded
   * - WorkerError
   * - Turbopack / webpack 冲突
   */
  webpack: (config) => {
    // react-notion-x 依赖修复（官方 issue 推荐方案）
    config.resolve.alias.react = path.resolve(__dirname, 'node_modules/react')
    config.resolve.alias['react-dom'] = path.resolve(
      __dirname,
      'node_modules/react-dom'
    )
    return config
  },

  /**
   * 明确声明：不用 Turbopack
   * （Next 15 不写这个 = 默认 Turbopack）
   */
  turbopack: {},

  staticPageGenerationTimeout: 300,

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'www.notion.so' },
      { protocol: 'https', hostname: 'notion.so' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'abs.twimg.com' },
      { protocol: 'https', hostname: 'pbs.twimg.com' },
      { protocol: 'https', hostname: 's3.us-west-2.amazonaws.com' }
    ],
    formats: ['image/avif', 'image/webp'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy:
      "default-src 'self'; script-src 'none'; sandbox;"
  },

  // react-tweet 官方要求
  transpilePackages: ['react-tweet']
})
