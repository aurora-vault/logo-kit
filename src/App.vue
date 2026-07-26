<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useLogoStore } from './composables/useLogoStore'
import { setLiveFavicon, resetLiveFavicon } from './composables/useLiveFavicon'
import { buildLogoPack } from './lib/zip'
import { downloadBlob } from './lib/download'
import { buildManifest } from './lib/manifest'
import { SLOTS, MANIFEST_FILE, CATEGORIES } from './specs/assets'
import LeftSidebar from './components/LeftSidebar.vue'
import PreviewStage from './components/PreviewStage.vue'

const { state } = useLogoStore()
const exporting = ref(false)

const totalCount = SLOTS.length
const doneCount = computed(() => SLOTS.filter((s) => state.files[s.id]).length)
const previewModes = ['light', 'dark', 'both'] as const
const modeLabel = (m: 'light' | 'dark' | 'both') => (m === 'light' ? '浅' : m === 'dark' ? '深' : '全')
/** 浅 / 深 / 全 预设底色 */
function setMode(m: 'light' | 'dark' | 'both') {
  state.ui.previewMode = m
}
/** 自由背景色:选色即用此色(theme + bg 同步),并切到「色」模式 */
function setCustom(v: string) {
  state.ui.themeColor = v
  state.ui.backgroundColor = v
  state.ui.previewMode = 'custom'
}

/** 界面明暗主题:切换 html.light + 持久化(仅工具外壳风格,与预览浅/深/全/色无关) */
const THEME_KEY = 'logo-kit-theme'
function applyTheme(t: 'dark' | 'light'): void {
  document.documentElement.classList.toggle('light', t === 'light')
  localStorage.setItem(THEME_KEY, t)
}
function toggleTheme(): void {
  state.ui.uiTheme = state.ui.uiTheme === 'dark' ? 'light' : 'dark'
}
watch(() => state.ui.uiTheme, applyTheme)
onMounted(() => {
  const saved = localStorage.getItem(THEME_KEY) as 'dark' | 'light' | null
  if (saved && saved !== state.ui.uiTheme) state.ui.uiTheme = saved
})

// 真实标签预览:开 → 用第一个已上传的 favicon(svg > 32 > 16 > ico)直设到本页 tab
let liveTimer: number | undefined
const favOrder = ['favicon-svg', 'favicon-32', 'favicon-16', 'favicon-ico']
const liveUrl = computed(() => {
  for (const id of favOrder) {
    const f = state.files[id]
    if (f) return f.url
  }
  return ''
})

function pushLive(): void {
  if (state.ui.liveFavicon && liveUrl.value) setLiveFavicon(liveUrl.value)
  else resetLiveFavicon()
}

watch(
  () => [state.ui.liveFavicon, liveUrl.value] as const,
  () => {
    if (liveTimer) clearTimeout(liveTimer)
    liveTimer = window.setTimeout(pushLive, 150)
  },
)

onUnmounted(() => {
  if (liveTimer) clearTimeout(liveTimer)
  resetLiveFavicon()
})

async function exportAll(): Promise<void> {
  exporting.value = true
  try {
    // 无损:已上传文件的原始 blob 原样打包,按标准文件名
    const files: { name: string; blob: Blob }[] = []
    for (const s of SLOTS) {
      const f = state.files[s.id]
      if (f) files.push({ name: s.fileName, blob: f.blob })
    }
    files.push({
      name: MANIFEST_FILE,
      blob: new Blob(
        [
          buildManifest({
            name: state.ui.brandName,
            shortName: state.ui.brandShort,
            themeColor: state.ui.themeColor,
            backgroundColor: state.ui.backgroundColor,
          }),
        ],
        { type: 'application/manifest+json' },
      ),
    })
    files.push({ name: 'README.md', blob: new Blob([packReadme()], { type: 'text/markdown' }) })
    const zip = await buildLogoPack(files)
    downloadBlob(zip, 'logo-pack.zip')
  } finally {
    exporting.value = false
  }
}

function packReadme(): string {
  const list = CATEGORIES.map((c) => {
    const slots = SLOTS.filter((s) => s.category === c.id)
    return `### ${c.label}\n${slots
      .map((s) => `- \`${s.fileName}\` — ${s.width > 0 ? s.width + '×' + s.height : s.format.toUpperCase()}${s.variant ? ' (' + (s.variant === 'dark' ? '深色版' : '浅色版') + ')' : ''}`)
      .join('\n')}`
  }).join('\n\n')
  return `# logo-pack

由 logo-kit 生成。**无损** —— 工具不缩放、不派生,zip 内每个文件都是你上传的原始成品,按标准名部署即可。

## 覆盖的使用场景(9 类)

浏览器标签/书签 · 搜索引擎结果 · iOS 主屏 · 安卓/PWA 桌面 · PWA 启动闪屏 · 社交头像 · 导航栏 · 页脚/邮件 · 社交分享卡。

## 深浅 logo 说明

自带背景的方形图标(favicon/iOS/PWA/头像/og)深浅通用,一版即可;**透明单色横版 logo(导航栏/页脚)建议分别上传浅色版与深色版**,否则在反色背景上不可见。

## 部署到 shabox-blog-web

把文件放到 \`shabox-blog-web/public/\`。\`index.html\` 引用已就绪:

\`\`\`html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
<link rel="manifest" href="/site.webmanifest" />
<meta property="og:image" content="/og-image.png" />
\`\`\`

若上传了 \`favicon-dark.svg\`,把 favicon link 换成 media 查询,跟随系统深浅自动切换:

\`\`\`html
<link rel="icon" type="image/svg+xml" href="/favicon.svg" media="(prefers-color-scheme: light)" />
<link rel="icon" type="image/svg+xml" href="/favicon-dark.svg" media="(prefers-color-scheme: dark)" />
\`\`\`

导航栏 logo:浅色背景用 \`/logo-nav.svg\`,深色背景用 \`/logo-nav-dark.svg\`(或 png)。

## 文件清单(未上传的不会进 zip)

${list}

- \`${MANIFEST_FILE}\` — 由名称/短名/theme/bg 字段自动生成

## 注意

- 服务器对 \`.webmanifest\` 需返回 \`application/manifest+json\`。
- 浏览器会回退到其它已声明尺寸;建议至少补齐 favicon.svg + favicon-32 + apple-touch-icon + android-512 + maskable + og-image。
`
}
</script>

<template>
  <div class="flex h-screen flex-col overflow-hidden bg-app text-ink">
    <header class="border-b border-line bg-app/80 backdrop-blur">
      <div class="flex flex-wrap items-center gap-x-3 gap-y-2 px-4 py-2.5">
        <!-- 左:标题 -->
        <div class="flex items-center gap-3">
          <h1 class="text-lg font-semibold">🔬 logo-kit</h1>
          <span class="hidden text-xs text-ink-dim sm:inline">无损 · 上传成品 · 全场景宫格预览</span>
        </div>

        <!-- 中:站点名称(预览显示 + 写入 manifest)-->
        <div class="flex flex-1 justify-center">
          <div class="flex items-center gap-2 text-xs text-ink-muted">
            <span class="text-[11px] text-ink-dim">站点名称</span>
            <label class="flex items-center gap-1">
              全称
              <input v-model="state.ui.brandName" class="w-24 rounded border border-line-strong bg-surface-2 px-2 py-0.5 text-xs text-ink" />
            </label>
            <label class="flex items-center gap-1">
              简称
              <input v-model="state.ui.brandShort" class="w-20 rounded border border-line-strong bg-surface-2 px-2 py-0.5 text-xs text-ink" />
            </label>
          </div>
        </div>

        <!-- 右:操作 -->
        <div class="flex flex-wrap items-center gap-3 text-xs text-ink-muted">
          <span class="rounded bg-surface-2 px-2 py-1 text-[11px]">{{ doneCount }}/{{ totalCount }} 文件</span>

          <!-- 预览模式总开关:浅 / 深 / 全 / 色(自由背景色) -->
          <div class="flex items-center gap-1">
            <span class="text-[11px] text-ink-dim">预览</span>
            <div class="flex overflow-hidden rounded-md border border-line-strong">
              <button
                v-for="m in previewModes"
                :key="m"
                :title="m === 'both' ? '浅色与深色并排显示' : m === 'light' ? '只看浅色背景' : '只看深色背景'"
                :class="[
                  'px-2 py-1 text-[11px]',
                  state.ui.previewMode === m ? 'bg-surface-3 text-ink' : 'text-ink-muted hover:text-ink',
                ]"
                @click="setMode(m)"
              >
                {{ modeLabel(m) }}
              </button>
              <label
                class="flex items-center px-1.5"
                :class="state.ui.previewMode === 'custom' ? 'bg-surface-3' : 'hover:bg-surface-2'"
                title="自由背景色:选色即用此色(= theme + bg),所有卡片统一此底色"
              >
                <input
                  type="color"
                  :value="state.ui.backgroundColor"
                  class="h-4 w-5 cursor-pointer"
                  @input="setCustom(($event.target as HTMLInputElement).value)"
                />
              </label>
            </div>
          </div>

          <label class="flex items-center gap-1.5" title="把当前 favicon 显示到本页浏览器标签上,看最真实的渲染效果">
            <input type="checkbox" v-model="state.ui.liveFavicon" />
            真实标签预览
          </label>
          <button
            class="grid h-7 w-7 place-items-center rounded-md border border-line-strong text-ink-muted hover:bg-surface-2 hover:text-ink"
            :title="state.ui.uiTheme === 'dark' ? '切换白天模式' : '切换黑夜模式'"
            @click="toggleTheme"
          >{{ state.ui.uiTheme === 'dark' ? '☀' : '☾' }}</button>
          <button
            class="rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-blue-500 disabled:opacity-50"
            :disabled="exporting || doneCount === 0"
            @click="exportAll"
          >
            {{ exporting ? '打包中…' : '⬇ 导出全套 zip(无损)' }}
          </button>
        </div>
      </div>
    </header>

    <div id="workspace" class="relative flex min-h-0 flex-1">
      <LeftSidebar v-show="!state.ui.sidebarCollapsed" />
      <PreviewStage />

      <!-- 侧栏收/展开按钮:贴在侧栏与右栏交界处 -->
      <button
        class="absolute top-1/2 z-20 grid h-14 w-5 place-items-center rounded-md border border-line-strong bg-surface text-[11px] text-ink-muted shadow hover:bg-surface-2 hover:text-ink"
        :style="{
          left: state.ui.sidebarCollapsed ? '0px' : '18rem',
          transform: `translate(${state.ui.sidebarCollapsed ? '0' : '-50%'}, -50%)`,
        }"
        :title="state.ui.sidebarCollapsed ? '展开文件列表' : '收起文件列表'"
        @click="state.ui.sidebarCollapsed = !state.ui.sidebarCollapsed"
      >
        {{ state.ui.sidebarCollapsed ? '▶' : '◀' }}
      </button>
    </div>
  </div>
</template>
