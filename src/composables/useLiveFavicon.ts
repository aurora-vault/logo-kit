/**
 * 把某个 URL(通常是已上传 favicon 文件的 objectURL)设为工具页自身浏览器 tab 的 favicon,
 * 让用户在真实标签栏直接看效果。无需 canvas —— 直接用原始文件,无损。
 */

/** 设置 favicon href(移除现有 icon link 后新建) */
export function setLiveFavicon(href: string): void {
  document
    .querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="shortcut icon"]')
    .forEach((l) => l.remove())
  const link = document.createElement('link')
  link.rel = 'icon'
  link.href = href
  document.head.appendChild(link)
}

/** 还原默认(空)favicon */
export function resetLiveFavicon(): void {
  document
    .querySelectorAll<HTMLLinkElement>('link[rel="icon"], link[rel="shortcut icon"]')
    .forEach((l) => l.remove())
  const link = document.createElement('link')
  link.rel = 'icon'
  link.href = 'data:,'
  document.head.appendChild(link)
}
