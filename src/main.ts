import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// 防主题闪烁:挂载前先按 localStorage 应用 light 类
if (localStorage.getItem('logo-kit-theme') === 'light') {
  document.documentElement.classList.add('light')
}

createApp(App).mount('#app')
