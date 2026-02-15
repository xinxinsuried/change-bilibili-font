// Content script: 注入 Minecraft 字体到 Bilibili
;(function () {
  const STORAGE_KEY = 'bilibili-minecraft-font-enabled'

  function applyFont(enabled: boolean) {
    const FONT_FAMILY = `'Minecraft', 'FusionPixel', 'FusionPixelLatin', sans-serif`
    const styleId = 'bilibili-minecraft-font-style'

    // 移除旧样式
    const existing = document.getElementById(styleId)
    if (existing) {
      existing.remove()
    }

    if (!enabled) return

    const css = `
      /* ===== Bilibili Minecraft 字体全局覆盖 ===== */

      /* 全局字体覆盖 */
      *, *::before, *::after {
        font-family: ${FONT_FAMILY} !important;
      }

      /* 页面根元素 */
      html, body {
        font-family: ${FONT_FAMILY} !important;
      }

      /* 顶部导航栏 */
      .bili-header,
      .bili-header *,
      .bili-header__bar,
      .bili-header__channel,
      .mini-header,
      .mini-header *,
      .international-header,
      .international-header * {
        font-family: ${FONT_FAMILY} !important;
      }

      /* 视频标题与信息 */
      .video-title,
      .tit,
      h1, h2, h3, h4, h5, h6,
      .title,
      .info-text,
      .video-info *,
      #viewbox_report *,
      .video-info-detail *,
      .video-title .tit {
        font-family: ${FONT_FAMILY} !important;
      }

      /* 视频描述 */
      .desc-info,
      .basic-desc-info,
      .desc-info *,
      .basic-desc-info * {
        font-family: ${FONT_FAMILY} !important;
      }

      /* 弹幕 */
      .b-danmaku,
      .bili-danmaku-x-dm,
      .danmaku-item,
      .bilibili-player-dm,
      .bilibili-player-dm * {
        font-family: ${FONT_FAMILY} !important;
      }

      /* 评论区 */
      .reply-content,
      .reply-content *,
      .root-reply,
      .root-reply *,
      .sub-reply,
      .sub-reply *,
      .reply-item *,
      .comment *,
      .bb-comment *,
      .comment-list *,
      .reply-warp *,
      .reply-list * {
        font-family: ${FONT_FAMILY} !important;
      }

      /* 搜索框与搜索结果 */
      .nav-search-input,
      .search-input-el,
      .nav-search *,
      input, textarea, select, button,
      .search-page *,
      .activity-search * {
        font-family: ${FONT_FAMILY} !important;
      }

      /* 侧边栏与推荐列表 */
      .rec-list *,
      .recommend-list *,
      .video-page-card *,
      .card-box *,
      .bili-video-card *,
      .floor-card *,
      .video-card * {
        font-family: ${FONT_FAMILY} !important;
      }

      /* 首页 Feed 流 */
      .feed-card *,
      .bili-feed4 *,
      .recommended-container *,
      .container *,
      .video-card-reco * {
        font-family: ${FONT_FAMILY} !important;
      }

      /* 动态页面 */
      .bili-dyn-list *,
      .bili-dyn-card *,
      .dynamic-content *,
      .bili-dyn-content * {
        font-family: ${FONT_FAMILY} !important;
      }

      /* 直播页面 */
      .live-skin-main-text *,
      .chat-history-list *,
      .chat-item *,
      .dp-i-content *,
      #chat-msg-list *,
      .room-info-ctnr *,
      .live-title * {
        font-family: ${FONT_FAMILY} !important;
      }

      /* 专栏/文章页面 */
      .article-content *,
      .article-holder *,
      .article__content *,
      .opus-module-content * {
        font-family: ${FONT_FAMILY} !important;
      }

      /* 用户个人页面 */
      .h-sign,
      .h-name,
      .member-info *,
      .n-statistics *,
      .n-tab-links *,
      .space-page * {
        font-family: ${FONT_FAMILY} !important;
      }

      /* 播放器控件 */
      .bilibili-player *,
      .bpx-player *,
      .bpx-player-control *,
      .squirtle-controller *,
      .bilibili-player-video-subtitle * {
        font-family: ${FONT_FAMILY} !important;
      }

      /* 分P列表 */
      .list-box *,
      .cur-list *,
      .video-episode-card *,
      .multi-page * {
        font-family: ${FONT_FAMILY} !important;
      }

      /* Tab 栏 */
      .bili-tab *,
      .tab-navbar *,
      .channel-items * {
        font-family: ${FONT_FAMILY} !important;
      }

      /* 番剧页面 */
      .media-info *,
      .mediainfo_mediaInfo *,
      .ogv-strategy-container * {
        font-family: ${FONT_FAMILY} !important;
      }

      /* Toast 和弹窗 */
      .bili-modal *,
      .bili-dialog *,
      .bili-popup *,
      .bili-toast *,
      .van-popover * {
        font-family: ${FONT_FAMILY} !important;
      }

      /* 充电/投币等交互区域 */
      .coin-btn *,
      .like-btn *,
      .collect-btn *,
      .share-btn *,
      .toolbar * {
        font-family: ${FONT_FAMILY} !important;
      }

      /* 消息通知 */
      .message *,
      .im-root *,
      .im-list * {
        font-family: ${FONT_FAMILY} !important;
      }
    `

    const style = document.createElement('style')
    style.id = styleId
    style.textContent = css
    ;(document.head || document.documentElement).appendChild(style)
  }

  // 初始化：读取状态
  chrome.storage.sync.get([STORAGE_KEY], (result) => {
    const enabled = result[STORAGE_KEY] !== false // 默认开启
    applyFont(enabled)
  })

  // 监听来自 popup 的消息
  chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
    if (message.type === 'TOGGLE_FONT') {
      applyFont(message.enabled)
      sendResponse({ success: true })
    }
    return true
  })
})()
