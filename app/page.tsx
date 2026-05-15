"use client"

import { useMemo, useState, useEffect, useCallback } from 'react'
import Head from 'next/head'

const tools = [
  // AI 设计
  { name: 'Midjourney', category: 'AI 设计', desc: 'AI 绘画与视觉生成工具', url: 'https://midjourney.com', tip: '目前最强的 AI 图像生成工具，出图质感极高，适合做概念图和品牌视觉。' },
  { name: 'Runway', category: 'AI 设计', desc: 'AI 视频与动效创作平台', url: 'https://runwayml.com', tip: '视频生成与特效处理的首选，Gen-2 模型让动态创意变得轻而易举。' },
  { name: 'Stable Diffusion', category: 'AI 设计', desc: '开源 AI 图像生成工具', url: 'https://stability.ai', tip: '开源免费可本地部署，自由度极高，适合深度玩家和开发者。' },
  { name: 'Adobe Firefly', category: 'AI 设计', desc: 'Adobe 官方 AI 创意工具', url: 'https://firefly.adobe.com', tip: '与 Adobe 生态无缝集成，商用安全有保障，PS 用户必备。' },
  { name: 'Kling AI', category: 'AI 设计', desc: '国产 AI 视频生成工具', url: 'https://klingai.com', tip: '快手出品的国产视频生成工具，质量媲美国际产品，速度快价格低。' },
  { name: 'Ideogram', category: 'AI 设计', desc: 'AI 文字图形生成工具', url: 'https://ideogram.ai', tip: '目前 AI 生成图像中文字效果最好的工具，做海报设计必试。' },

  // UI 设计
  { name: 'Figma', category: 'UI 设计', desc: '专业 UI 设计协作工具', url: 'https://figma.com', tip: '设计行业标准工具，团队协作、组件系统、原型交互一站搞定。' },
  { name: 'Sketch', category: 'UI 设计', desc: 'Mac 端经典 UI 设计工具', url: 'https://sketch.com', tip: 'Mac 独占的经典设计工具，插件生态丰富，老牌设计师的首选。' },
  { name: 'Framer', category: 'UI 设计', desc: '可发布的交互设计工具', url: 'https://framer.com', tip: '设计完直接发布为真实网站，做作品集和落地页效率极高。' },
  { name: 'Canva', category: 'UI 设计', desc: '在线平面设计工具', url: 'https://canva.com', tip: '非设计师的神器，模板丰富，做社交媒体图文、PPT 超快。' },
  { name: 'Motiff', category: 'UI 设计', desc: '国产 AI 驱动 UI 设计工具', url: 'https://motiff.com', tip: '字节跳动旗下产品，AI 功能强大，国内团队协作速度更快。' },
  { name: 'MasterGo', category: 'UI 设计', desc: '国产协作设计工具', url: 'https://mastergo.com', tip: '国内最成熟的 Figma 替代品，服务器在国内，访问稳定流畅。' },

  // 3D 设计
  { name: 'Spline', category: '3D 设计', desc: '网页端 3D 设计工具', url: 'https://spline.design', tip: '无需安装，浏览器里做 3D，还能直接嵌入网页，做 3D 首页交互超酷。' },
  { name: 'Blender', category: '3D 设计', desc: '免费开源 3D 创作套件', url: 'https://blender.org', tip: '完全免费的专业级 3D 工具，功能媲美 C4D，学习曲线陡但值得。' },
  { name: 'Cinema 4D', category: '3D 设计', desc: '专业 3D 动画建模软件', url: 'https://maxon.net', tip: '运动图形设计的行业标准，与 AE 配合无缝，做品牌动画首选。' },

  // 配色工具
  { name: 'Coolors', category: '配色工具', desc: '快速生成高级配色方案', url: 'https://coolors.co', tip: '按空格键一秒生成一套配色，还能锁定喜欢的颜色继续随机。' },
  { name: 'Color Hunt', category: '配色工具', desc: '热门设计配色灵感库', url: 'https://colorhunt.co', tip: '社区驱动的配色灵感库，每天都有新配色，能按热度和时间筛选。' },
  { name: 'Khroma', category: '配色工具', desc: 'AI 个性化配色生成工具', url: 'https://khroma.co', tip: '先训练 AI 学习你的审美偏好，再生成专属配色，越用越懂你。' },
  { name: 'Huemint', category: '配色工具', desc: 'AI 品牌配色生成工具', url: 'https://huemint.com', tip: '专门为品牌设计的配色工具，能直接预览配色在界面上的效果。' },
  { name: 'Realtime Colors', category: '配色工具', desc: '实时预览网页配色效果', url: 'https://realtimecolors.com', tip: '边调色边看效果，解决了"配色单独好看但放到页面上不对"的问题。' },

  // 字体资源
  { name: 'Google Fonts', category: '字体资源', desc: '免费开源字体资源库', url: 'https://fonts.google.com', tip: '免费商用字体首选，直接 CDN 引入，加载快无版权风险。' },
  { name: 'Fontshare', category: '字体资源', desc: '高质量免费商用字体', url: 'https://fontshare.com', tip: '质感媲美付费字体，完全免费商用，设计师私藏字体站。' },
  { name: 'Font Ninja', category: '字体资源', desc: '识别网页字体的浏览器插件', url: 'https://fonts.ninja', tip: '看到好看的字体直接识别，还能一键试用，找字体必装插件。' },
  { name: 'Dafont', category: '字体资源', desc: '海量免费字体下载站', url: 'https://dafont.com', tip: '字体数量庞大，风格覆盖极广，注意下载前确认商用授权。' },
  { name: '字魂', category: '字体资源', desc: '中文字体设计平台', url: 'https://izihun.com', tip: '国内做中文字体最好的平台之一，品质高，有免费商用字体可用。' },

  // UI 灵感
  { name: 'Mobbin', category: 'UI 灵感', desc: '移动端 UI 灵感截图库', url: 'https://mobbin.com', tip: '收录了几千款 App 的界面截图，按功能页面分类，找参考超方便。' },
  { name: 'Dribbble', category: 'UI 灵感', desc: '设计作品展示社区', url: 'https://dribbble.com', tip: '全球顶级设计师的作品展示平台，找视觉风格灵感的首选。' },
  { name: 'Behance', category: 'UI 灵感', desc: 'Adobe 旗下创意作品社区', url: 'https://behance.net', tip: '适合看完整项目展示和品牌案例，比 Dribbble 更注重完整叙事。' },
  { name: 'Land-book', category: 'UI 灵感', desc: '优质落地页灵感库', url: 'https://land-book.com', tip: '专门收录落地页设计，做官网和营销页之前一定要来翻一翻。' },
  { name: 'Awwwards', category: 'UI 灵感', desc: '顶级网页设计奖项网站', url: 'https://awwwards.com', tip: '代表了网页设计的最高水准，看这里能感受到交互设计的天花板。' },
  { name: 'UI Jar', category: 'UI 灵感', desc: 'UI 组件与交互灵感库', url: 'https://uijar.com', tip: '按 UI 组件类型分类，找特定组件设计灵感时比 Dribbble 更高效。' },

  // 无版权图片
  { name: 'Unsplash', category: '无版权图片', desc: '免费高清摄影图库', url: 'https://unsplash.com', tip: '设计师用图首选，质量高完全免费，商用无需署名。' },
  { name: 'Pexels', category: '无版权图片', desc: '免费图片与视频素材', url: 'https://pexels.com', tip: '图片和视频都有，视频素材质量尤其好，做 Reel 和广告片必备。' },
  { name: 'Pixabay', category: '无版权图片', desc: '免费图片插画矢量素材', url: 'https://pixabay.com', tip: '素材类型最全面，插画和矢量图也有，适合找各种风格素材。' },
  { name: 'Storyset', category: '无版权图片', desc: '免费可编辑插画素材', url: 'https://storyset.com', tip: '插画风格统一可在线改颜色，做 PPT 和官网插图效率极高。' },
  { name: 'unDraw', category: '无版权图片', desc: '免费开源 SVG 插画库', url: 'https://undraw.co', tip: '可以直接改主题色的 SVG 插画，开发者和设计师都在用。' },

  // 图标资源
  { name: 'Iconify', category: '图标资源', desc: '超大开源图标集合', url: 'https://iconify.design', tip: '汇聚了 100+ 套图标库，统一 API 调用，前端开发必备。' },
  { name: 'Feather Icons', category: '图标资源', desc: '简洁开源线性图标', url: 'https://feathericons.com', tip: '极简风格的线性图标，风格高度统一，用在产品界面毫无违和感。' },
  { name: 'Flaticon', category: '图标资源', desc: '海量免费图标下载', url: 'https://flaticon.com', tip: '图标数量最多的平台之一，多种格式下载，注意免费版需要署名。' },
  { name: 'Phosphor Icons', category: '图标资源', desc: '灵活多风格图标库', url: 'https://phosphoricons.com', tip: '同一图标有六种粗细风格，适配不同界面密度，设计系统必备。' },

  // 效率工具
  { name: 'Notion', category: '效率工具', desc: '文档与工作流协作工具', url: 'https://notion.so', tip: '设计师用来管理项目、整理灵感、写设计文档的全能工具。' },
  { name: 'Raycast', category: '效率工具', desc: 'Mac 效率启动器', url: 'https://raycast.com', tip: 'Mac 上最强启动器，颜色拾取、窗口管理、剪贴板历史一键调用。' },
  { name: 'Linear', category: '效率工具', desc: '高效项目管理工具', url: 'https://linear.app', tip: '界面设计极其克制优雅，用过的设计团队都回不去 Jira 了。' },
  { name: 'Loom', category: '效率工具', desc: '快速录制分享视频工具', url: 'https://loom.com', tip: '录屏加摄像头一键分享，远程给客户讲设计方案神器，省掉无数会议。' },

  // 在线工具
  { name: '图片转 PDF', category: '在线工具', desc: '多图合并 PDF，本地处理不上传', url: '/image-to-pdf.html', tip: '支持 JPG、PNG、WebP 等格式，多张图片一键合并成 PDF，完全本地处理，隐私安全。' },
]

function getFavicon(url: string): string | null {
  if (!url.startsWith("http")) return null
  try { return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=32` } catch { return null }
}

function getDailyPicks() {
  const today = new Date()
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()
  const picks: typeof tools = []
  const used = new Set<number>()
  let s = seed
  while (picks.length < 3) {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    const idx = Math.abs(s) % tools.length
    if (!used.has(idx)) {
      used.add(idx)
      picks.push(tools[idx])
    }
  }
  return picks
}

const categories = ['全部', ...Array.from(new Set(tools.map(t => t.category)))]

export default function DesignToolsHub() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('全部')
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('favorites') || '[]')
    }
    return []
  })
  const [showFavOnly, setShowFavOnly] = useState(false)
  const [dailyIndex, setDailyIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const dailyPicks = useMemo(() => getDailyPicks(), [])

  useEffect(() => {
    if (!isAutoPlaying) return
    const timer = setInterval(() => {
      setDailyIndex(i => (i + 1) % dailyPicks.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isAutoPlaying, dailyPicks.length])

  const prevDaily = useCallback(() => {
    setIsAutoPlaying(false)
    setDailyIndex(i => (i - 1 + dailyPicks.length) % dailyPicks.length)
  }, [dailyPicks.length])

  const nextDaily = useCallback(() => {
    setIsAutoPlaying(false)
    setDailyIndex(i => (i + 1) % dailyPicks.length)
  }, [dailyPicks.length])

  const toggleFavorite = (name: string) => {
    const next = favorites.includes(name)
      ? favorites.filter(f => f !== name)
      : [...favorites, name]
    setFavorites(next)
    localStorage.setItem('favorites', JSON.stringify(next))
  }

  const filteredTools = useMemo(() => {
    const keyword = search.toLowerCase()
    return tools.filter(tool => {
      const matchSearch =
        tool.name.toLowerCase().includes(keyword) ||
        tool.category.toLowerCase().includes(keyword) ||
        tool.desc.toLowerCase().includes(keyword)
      const matchCategory = activeCategory === '全部' || tool.category === activeCategory
      const matchFav = !showFavOnly || favorites.includes(tool.name)
      return matchSearch && matchCategory && matchFav
    })
  }, [search, activeCategory, showFavOnly, favorites])

  const groupedTools = filteredTools.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = []
    acc[tool.category].push(tool)
    return acc
  }, {} as Record<string, typeof tools>)

  const currentPick = dailyPicks[dailyIndex]
  const today = new Date()
  const dateStr = `${today.getMonth() + 1}月${today.getDate()}日`

  return (
    <>
      <Head>
        {/* 基础 SEO */}
        <title>Design Tools Hub | 设计师的数字工具箱 - AI设计、配色、字体、UI灵感资源导航</title>
        <meta name="description" content="收录 60+ 款精选设计工具，涵盖 AI 设计、UI 设计、3D 设计、配色工具、字体资源、UI 灵感、无版权图片、图标资源和效率工具。帮设计师快速找到真正好用的工具。" />
        <meta name="keywords" content="设计工具,AI设计,UI设计,配色工具,字体资源,UI灵感,无版权图片,图标资源,效率工具,Figma,Midjourney,设计师导航" />
        <meta name="author" content="zky" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* 搜索引擎控制 */}
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />

        {/* Open Graph（社交媒体分享） */}
        <meta property="og:title" content="Design Tools Hub | 设计师的数字工具箱" />
        <meta property="og:description" content="精选 60+ 款设计工具，每日推荐 AI 设计、配色、字体、灵感网站，帮设计师提高工作效率。" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://design-tools-hub.netlify.app" />
        <meta property="og:image" content="https://design-tools-hub.netlify.app/og-image.png" />
        <meta property="og:site_name" content="Design Tools Hub" />
        <meta property="og:locale" content="zh_CN" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Design Tools Hub | 设计师的数字工具箱" />
        <meta name="twitter:description" content="精选 60+ 款设计工具，每日推荐 AI 设计、配色、字体、灵感网站。" />

        {/* Canonical URL */}
        <link rel="canonical" href="https://design-tools-hub.netlify.app" />

        {/* 其他 SEO 优化 */}
        <meta name="theme-color" content="#18181B" />
        <html lang="zh-CN" />
      </Head>

      <div className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-10">
        {/* Hero */}
        <section className="max-w-6xl mx-auto mb-14">
          <div className="inline-flex items-center rounded-full border border-zinc-800 px-4 py-1 text-sm text-zinc-400 mb-6">
            Design Tools Hub · 持续更新中
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6">
            设计师的
            <span className="text-zinc-400">数字工具箱</span>
          </h1>
          <p className="max-w-2xl text-zinc-400 text-lg leading-8">
            精选 AI 设计、配色、字体、灵感、素材与效率工具。
            帮你从互联网工具垃圾山里，快速找到真正顺手的那一把。
          </p>
          <div className="mt-8 flex gap-4 flex-wrap items-center">
            <div className="text-sm text-zinc-500">
              共收录 <span className="text-zinc-300 font-bold">{tools.length}</span> 个工具
            </div>
            {favorites.length > 0 && (
              <button
                onClick={() => setShowFavOnly(!showFavOnly)}
                className={`text-sm px-4 py-2 rounded-full border transition-all ${
                  showFavOnly
                    ? 'bg-amber-500 text-black border-amber-500'
                    : 'border-zinc-700 text-zinc-400 hover:border-zinc-500'
                }`}
              >
                ★ 我的收藏 ({favorites.length})
              </button>
            )}
          </div>
        </section>

        {/* 每日推荐轮播 */}
        <section className="max-w-6xl mx-auto mb-12">
          <div className="bg-zinc-900 border border-zinc-800 rounded-[32px] p-8 md:p-10 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-white/3 blur-3xl rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span className="text-sm text-zinc-400 font-medium">{dateStr} 每日推荐</span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevDaily}
                    className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-all"
                  >←</button>
                  <div className="flex gap-1.5">
                    {dailyPicks.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => { setIsAutoPlaying(false); setDailyIndex(i) }}
                        className={`h-1.5 rounded-full transition-all ${
                          i === dailyIndex ? 'w-6 bg-white' : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={nextDaily}
                    className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-500 transition-all"
                  >→</button>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {currentPick.url.startsWith('http') && (
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${new URL(currentPick.url).hostname}&sz=64`}
                        alt=""
                        className="w-10 h-10 rounded-xl"
                        onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                      />
                    )}
                    <div>
                      <div className="text-xs text-zinc-500 mb-0.5">{currentPick.category}</div>
                      <h2 className="text-3xl md:text-4xl font-black leading-tight">{currentPick.name}</h2>
                    </div>
                  </div>
                  <p className="text-zinc-400 text-base leading-7 max-w-xl mt-4">{currentPick.tip}</p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <button
                    onClick={() => toggleFavorite(currentPick.name)}
                    className={`px-5 py-3 rounded-2xl border text-sm font-medium transition-all ${
                      favorites.includes(currentPick.name)
                        ? 'bg-amber-500 text-black border-amber-500'
                        : 'border-zinc-700 text-zinc-300 hover:border-zinc-500'
                    }`}
                  >
                    {favorites.includes(currentPick.name) ? '★ 已收藏' : '★ 收藏'}
                  </button>
                  <a
                    href={currentPick.url}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-white text-black px-5 py-3 rounded-2xl text-sm font-medium hover:bg-zinc-100 transition-colors"
                  >
                    立即前往 ↗
                  </a>
                </div>
              </div>

              {isAutoPlaying && (
                <div className="mt-8 h-0.5 bg-zinc-800 rounded-full overflow-hidden">
                  <div
                    key={dailyIndex}
                    className="h-full bg-zinc-400 rounded-full"
                    style={{ animation: 'progress 4s linear forwards' }}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        <style>{`@keyframes progress { from { width: 0% } to { width: 100% } }`}</style>

        {/* Search */}
        <section className="max-w-6xl mx-auto mb-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4 flex items-center gap-3">
            <span className="text-zinc-500 text-xl">🔍</span>
            <input
              type="text"
              placeholder="搜索工具名称、分类、描述..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-transparent outline-none text-lg placeholder:text-zinc-500"
            />
            {search && (
              <button onClick={() => setSearch('')} className="text-zinc-500 hover:text-zinc-300 text-sm">清除</button>
            )}
          </div>
        </section>

        {/* Category Filter */}
        <section className="max-w-6xl mx-auto mb-10">
          <div className="flex gap-2 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-white text-black'
                    : 'border border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200'
                }`}
              >{cat}</button>
            ))}
          </div>
        </section>

        {/* Tools Grid */}
        <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(groupedTools).map(([categoryName, categoryTools]) => (
            <div key={categoryName} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-600 transition-colors">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-bold">{categoryName}</h2>
                <span className="text-sm text-zinc-500">{categoryTools.length} 个工具</span>
              </div>
              <div className="space-y-3">
                {categoryTools.map(tool => (
                  <div key={tool.name} className="group bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-4 hover:bg-zinc-900 hover:border-zinc-700 transition-all">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        {tool.url.startsWith('http') ? (
                          <img
                            src={`https://www.google.com/s2/favicons?domain=${new URL(tool.url).hostname}&sz=32`}
                            alt=""
                            className="w-5 h-5 mt-0.5 rounded shrink-0"
                            onError={e => { (e.target as HTMLImageElement).style.display = 'none' }}
                          />
                        ) : (
                          <span className="w-5 h-5 mt-0.5 shrink-0 flex items-center justify-center text-sm">🛠</span>
                        )}
                        <div className="min-w-0">
                          <a href={tool.url} target="_blank" rel="noreferrer"
                            className="font-medium hover:text-white flex items-center gap-1 group-hover:underline">
                            {tool.name}
                            <span className="text-zinc-500 text-xs">↗</span>
                          </a>
                          <div className="text-sm text-zinc-500 leading-6 mt-0.5">{tool.desc}</div>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleFavorite(tool.name)}
                        className={`shrink-0 text-lg transition-all hover:scale-110 ${
                          favorites.includes(tool.name) ? 'text-amber-400' : 'text-zinc-700 hover:text-zinc-400'
                        }`}
                        title={favorites.includes(tool.name) ? '取消收藏' : '收藏'}
                      >★</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {filteredTools.length === 0 && (
          <section className="max-w-3xl mx-auto mt-16 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <div className="text-2xl font-bold mb-4">没有找到相关工具</div>
            <p className="text-zinc-500 leading-8">试试搜索：AI、字体、配色、UI、图片...</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('全部'); setShowFavOnly(false) }}
              className="mt-6 border border-zinc-700 px-6 py-3 rounded-2xl text-zinc-300 hover:bg-zinc-900 transition-colors"
            >清除筛选</button>
          </section>
        )}

        {/* Footer */}
        <footer className="max-w-6xl mx-auto mt-16 border-t border-zinc-900 pt-8 flex items-center justify-between flex-wrap gap-4 text-zinc-600 text-sm">
          <span>Built for designers, creators & midnight deadline survivors.</span>
          <span>{tools.length} tools · 持续更新 · 由 zky 整理推荐</span>
        </footer>
      </div>
    </>
  )
}