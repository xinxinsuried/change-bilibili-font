# ⛏️ Bilibili Minecraft 字体

> 将 Bilibili 网站的全部字体替换为 Minecraft 像素风格字体的浏览器扩展

![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-green?logo=googlechrome)
![Vue 3](https://img.shields.io/badge/Vue-3-42b883?logo=vuedotjs)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?logo=tailwindcss)
![DaisyUI](https://img.shields.io/badge/DaisyUI-5A0EF8?logo=daisyui)

## ✨ 功能

- ⛏️ 将 B站 (bilibili.com) 全站字体替换为 Minecraft 像素风格
- 🀄 中文字符使用 [缝合像素字体 (Fusion Pixel Font)](https://github.com/TakWolf/fusion-pixel-font)
- 🔤 英文/拉丁字符使用 [Minecraft Font](https://github.com/IdreesInc/Minecraft-Font)
- 🎛️ 弹窗面板一键开关，实时生效
- 🎨 Minecraft 风格暗色主题 UI
- 📦 推送到 GitHub 自动打包 & 自动递增版本号

## 📸 覆盖范围

- 顶部导航栏
- 视频标题 & 描述
- 弹幕
- 评论区
- 搜索框 & 搜索结果
- 推荐列表 & Feed 流
- 动态页面
- 直播页面 & 聊天
- 专栏/文章
- 用户个人页
- 播放器控件 & 字幕
- 番剧页面
- 弹窗/对话框
- 消息通知

## 🚀 安装

### 方式一：从 Release 下载

1. 前往 [Releases](../../releases) 页面下载最新的 `.zip` 文件
2. 解压到一个文件夹
3. 打开 Chrome，访问 `chrome://extensions/`
4. 开启右上角「开发者模式」
5. 点击「加载已解压的扩展程序」
6. 选择解压后的文件夹

### 方式二：从源码构建

```bash
# 克隆项目
git clone https://github.com/your-username/change-bilibili-font.git
cd change-bilibili-font

# 安装依赖
npm install

# 生成图标
node scripts/generate-icons.js

# 构建
npm run build

# 打包为 zip
npm run zip
```

构建产物在 `dist/` 目录，可直接加载为 Chrome 扩展。

## 🛠️ 开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev
```

## 📁 项目结构

```
change-bilibili-font/
├── .github/workflows/     # GitHub Actions 自动打包
│   └── build.yml
├── public/
│   ├── content/           # 内容脚本
│   │   └── content.js     # 字体注入逻辑
│   ├── fonts/             # 字体文件
│   │   ├── Minecraft.otf
│   │   ├── Minecraft-Bold.otf
│   │   ├── FusionPixel-zh_hans.woff2
│   │   └── FusionPixel-latin.woff2
│   └── icons/             # 扩展图标
├── src/
│   └── popup/             # 弹窗页面 (Vue 3 + TailwindCSS + DaisyUI)
│       ├── App.vue
│       ├── main.ts
│       └── style.css
├── manifest.json          # Chrome 扩展清单 (MV3)
├── vite.config.ts         # Vite 构建配置
├── tailwind.config.cjs    # TailwindCSS 配置
└── package.json
```

## 🔄 CI/CD

每次推送到 `main`/`master` 分支时，GitHub Actions 会自动：

1. 递增版本号（patch 版本 +1）
2. 生成图标
3. 构建扩展
4. 打包为 ZIP
5. 创建 GitHub Release
6. 提交版本号更新

## 📜 字体许可证

- **Minecraft Font** - [SIL Open Font License 1.1](https://github.com/IdreesInc/Minecraft-Font/blob/master/LICENSE)
- **缝合像素字体 (Fusion Pixel Font)** - [SIL Open Font License 1.1](https://github.com/TakWolf/fusion-pixel-font/blob/master/LICENSE-OFL)

## 📄 License

MIT
