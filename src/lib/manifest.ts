export interface ManifestOpts {
  name: string
  shortName: string
  themeColor: string
  backgroundColor: string
  startUrl?: string
  description?: string
}

/**
 * 生成 site.webmanifest。
 * icons 数组顺序固定:192 any / 512 any / 512 maskable(purpose 分离,不合并)。
 */
export function buildManifest(opts: ManifestOpts): string {
  const manifest = {
    name: opts.name,
    short_name: opts.shortName,
    description: opts.description ?? `${opts.name} 网站`,
    start_url: opts.startUrl ?? '/',
    scope: opts.startUrl ?? '/',
    display: 'standalone',
    orientation: 'any',
    background_color: opts.backgroundColor,
    theme_color: opts.themeColor,
    icons: [
      {
        src: '/android-chrome-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/android-chrome-512-maskable.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
  return JSON.stringify(manifest, null, 2)
}
