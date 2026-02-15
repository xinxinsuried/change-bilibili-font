<template>
  <div class="w-80 bg-base-100 p-5" data-theme="minecraft">
    <!-- 头部 -->
    <div class="flex items-center gap-3 mb-4">
      <div class="text-3xl">⛏️</div>
      <div>
        <h1 class="text-lg font-bold text-primary">Bilibili MC 字体</h1>
        <p class="text-xs text-base-content/60">将 B站字体替换为 Minecraft 风格</p>
      </div>
    </div>

    <!-- 分割线 -->
    <div class="divider my-1"></div>

    <!-- 开关卡片 -->
    <div class="card bg-base-200 shadow-sm">
      <div class="card-body p-4">
        <div class="flex items-center justify-between">
          <div>
            <h2 class="card-title text-sm">字体替换</h2>
            <p class="text-xs text-base-content/50 mt-1">
              {{ enabled ? '✅ 已启用像素字体' : '❌ 已关闭像素字体' }}
            </p>
          </div>
          <input
            type="checkbox"
            class="toggle toggle-primary toggle-md"
            :checked="enabled"
            @change="toggleFont"
          />
        </div>
      </div>
    </div>

    <!-- 字体预览 -->
    <div class="card bg-base-200 shadow-sm mt-3">
      <div class="card-body p-4">
        <h2 class="card-title text-sm mb-2">字体预览</h2>
        <div class="mockup-browser bg-base-300 border border-base-300">
          <div class="mockup-browser-toolbar">
            <div class="input text-xs">bilibili.com</div>
          </div>
          <div class="bg-base-100 px-4 py-3">
            <p class="text-sm">哔哩哔哩 (゜-゜)つロ 干杯~</p>
            <p class="text-xs text-base-content/60 mt-1">ABCDEFG abcdefg 1234567890</p>
            <p class="text-xs text-base-content/60 mt-1">你说的对，但是Minecraft是...</p>
          </div>
        </div>
      </div>
    </div>

    <!-- 状态栏 -->
    <div class="mt-3 flex items-center justify-between text-xs text-base-content/40">
      <span>v{{ version }}</span>
      <a
        href="https://github.com"
        target="_blank"
        class="link link-hover link-primary"
      >
        GitHub
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const STORAGE_KEY = 'bilibili-minecraft-font-enabled'
const enabled = ref(true)
const version = ref('1.0.0')

onMounted(async () => {
  // 读取版本号
  const manifest = chrome.runtime.getManifest()
  version.value = manifest.version

  // 读取开关状态
  const result = await chrome.storage.sync.get([STORAGE_KEY])
  enabled.value = result[STORAGE_KEY] !== false
})

async function toggleFont() {
  enabled.value = !enabled.value
  await chrome.storage.sync.set({ [STORAGE_KEY]: enabled.value })

  // 通知当前活动的 bilibili 标签页
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
  for (const tab of tabs) {
    if (tab.id && tab.url?.includes('bilibili.com')) {
      chrome.tabs.sendMessage(tab.id, {
        type: 'TOGGLE_FONT',
        enabled: enabled.value,
      })
    }
  }
}
</script>
