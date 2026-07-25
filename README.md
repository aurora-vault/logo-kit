# logo-kit

> logo 标准套件工作台 · 无损预览与打包

上传你自己设计好的每个 logo 成品,在**所有真实使用场景**里实时预览(浏览器标签 / 搜索结果 / iOS 主屏 / 安卓桌面 / PWA 启动屏 / 社交头像 / 导航栏 / 页脚邮件 / 分享卡),满意后一键导出**标准命名**的整套文件,直接扔进网站 `public/`。

**核心原则:不缩放、不派生 = 无损。** 工具不替你生成尺寸(光栅降采样是有损的);你传什么,部署就是什么。

## 谁该用

适合需要一套规范 logo 的个人站点 / 博客(首个用户:shabox)。回答"logo 到底要设计几个版本":自带背景的方形图标(favicon / iOS / PWA / 头像 / og)**一版通吃**;**透明单色横版 logo(导航栏 / 页脚)建议分浅色版 + 深色版**,否则反色背景上不可见。

## 功能

- **左栏**:按使用场景分类的标准文件清单(12 槽),逐个上传成品,显示进度;可整体收起 + 每类折叠。
- **右栏**:9 个场景宫格全展示,选中左侧文件 → 关联场景自动高亮并显示该文件;支持 **浅 / 深 / 全** 三档全局模式。
- **theme / bg**:theme 影响移动地址栏底色,bg 影响 PWA 启动屏背景(这是 PWA manifest 字段的天性,其它场景与它们无关)。
- **真实标签预览**:把当前 favicon 直设到本页 tab,看最真实的渲染(纯前端,刷新即恢复)。
- **导出**:已上传文件的原始 blob 原样打包,按标准名命名,附 `site.webmanifest` + 本 README。

## 导出清单(未上传的不进 zip)

| 文件 | 尺寸 | 用途 |
|---|---|---|
| favicon.svg | 矢量 | 浏览器标签页首选 |
| favicon-16x16.png / -32x32.png | 16 / 32 | 标签 / 书签 / 搜索结果 |
| favicon.ico | 16/32/48 | 老浏览器 / 桌面快捷方式 |
| apple-touch-icon.png | 180 | iOS 主屏 |
| android-chrome-192.png / -512.png | 192 / 512 | PWA 桌面 |
| android-chrome-512-maskable.png | 512 | PWA maskable(中心 80% 安全区) |
| avatar-512.png | 512 | 社交头像 |
| logo-nav.svg / .png | 横版 | 导航栏(浅色版) |
| logo-nav-dark.svg / .png | 横版 | 导航栏(深色版) |
| og-image.png | 1200×630 | 社交分享卡 |
| site.webmanifest | — | PWA 清单(自动生成) |

## 本地运行

```bash
npm install
npm run dev      # http://localhost:5174
npm run build    # 产物在 dist/
```

## 部署

容器化静态托管(nginx)。`docker compose up -d --build`,Nginx Proxy Manager 反代 `kit.shabox.fun → logo-kit:80`。完整规范见 DevOS `.core/ai-context/05_部署规范.md`。

## 技术栈

Vue 3 + Vite + TypeScript + Tailwind v4 + JSZip

## 目录结构

```
src/
├── specs/assets.ts       分类 + 文件槽 + 预览 tile 中心定义(改尺寸只动这里)
├── lib/                  loadImage / manifest / zip / download / color / types
├── composables/          useLogoStore(状态) / useLiveFavicon(真实 tab)
├── components/           LeftSidebar / PreviewStage / previews/*(9 场景)
└── App.vue               两栏外壳 + 无损导出
```

## License

MIT
