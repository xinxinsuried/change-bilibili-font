import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { copyFileSync, mkdirSync, existsSync, cpSync } from 'fs'

// 自定义插件：构建后复制静态资源
function copyExtensionFiles() {
  return {
    name: 'copy-extension-files',
    closeBundle() {
      const distDir = resolve(__dirname, 'dist')

      // 确保 dist 目录存在
      if (!existsSync(distDir)) {
        mkdirSync(distDir, { recursive: true })
      }

      // 复制 manifest.json
      copyFileSync(
        resolve(__dirname, 'manifest.json'),
        resolve(distDir, 'manifest.json')
      )

      // 复制 fonts 目录
      const fontsDistDir = resolve(distDir, 'fonts')
      if (!existsSync(fontsDistDir)) {
        mkdirSync(fontsDistDir, { recursive: true })
      }
      cpSync(resolve(__dirname, 'public/fonts'), fontsDistDir, { recursive: true })

      // 复制 content 目录
      const contentDistDir = resolve(distDir, 'content')
      if (!existsSync(contentDistDir)) {
        mkdirSync(contentDistDir, { recursive: true })
      }
      cpSync(resolve(__dirname, 'public/content'), contentDistDir, { recursive: true })

      // 复制 icons 目录
      const iconsDistDir = resolve(distDir, 'icons')
      if (!existsSync(iconsDistDir)) {
        mkdirSync(iconsDistDir, { recursive: true })
      }
      if (existsSync(resolve(__dirname, 'public/icons'))) {
        cpSync(resolve(__dirname, 'public/icons'), iconsDistDir, { recursive: true })
      }

      console.log('✅ 扩展文件复制完成！')
    },
  }
}

export default defineConfig({
  plugins: [vue(), copyExtensionFiles()],
  base: './',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
      },
      output: {
        entryFileNames: 'assets/[name].js',
        chunkFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
})
