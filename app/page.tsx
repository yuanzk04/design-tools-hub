"use client"

import { useMemo, useState } from 'react'

export default function DesignToolsHub() {
  const [search, setSearch] = useState('')

  const tools = [
    { name: 'Midjourney', category: 'AI 设计', desc: 'AI 绘画与视觉生成工具', url: 'https://midjourney.com' },
    { name: 'Runway', category: 'AI 设计', desc: 'AI 视频与动效创作平台', url: 'https://runwayml.com' },
    { name: 'Coolors', category: '配色工具', desc: '快速生成高级配色方案', url: 'https://coolors.co' },
    { name: 'Color Hunt', category: '配色工具', desc: '热门设计配色灵感库', url: 'https://colorhunt.co' },
    { name: 'Google Fonts', category: '字体资源', desc: '免费开源字体资源', url: 'https://fonts.google.com' },
    { name: 'Fontshare', category: '字体资源', desc: '高质量免费商用字体', url: 'https://fontshare.com' },
    { name: 'Mobbin', category: 'UI 灵感', desc: '移动端 UI 灵感库', url: 'https://mobbin.com' },
    { name: 'Dribbble', category: 'UI 灵感', desc: '设计作品展示社区', url: 'https://dribbble.com' },
    { name: 'Unsplash', category: '无版权图片', desc: '免费高清摄影图库', url: 'https://unsplash.com' },
    { name: 'Pexels', category: '无版权图片', desc: '免费图片与视频素材', url: 'https://pexels.com' },
    { name: 'Notion', category: '效率工具', desc: '文档与工作流协作工具', url: 'https://notion.so' },
    { name: 'Raycast', category: '效率工具', desc: 'Mac 效率启动器', url: 'https://raycast.com' },
  ]

  const filteredTools = useMemo(() => {
    const keyword = search.toLowerCase()
    return tools.filter((tool) =>
      tool.name.toLowerCase().includes(keyword) ||
      tool.category.toLowerCase().includes(keyword) ||
      tool.desc.toLowerCase().includes(keyword)
    )
  }, [search])

  const groupedTools = filteredTools.reduce((acc, tool) => {
    if (!acc[tool.category]) acc[tool.category] = []
    acc[tool.category].push(tool)
    return acc
  }, {} as Record<string, typeof tools>)

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 px-6 py-10">
      <section className="max-w-6xl mx-auto mb-14">
        <div className="inline-flex items-center rounded-full border border-zinc-800 px-4 py-1 text-sm text-zinc-400 mb-6">
          Design Tools Hub
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-6">
          设计师的<span className="text-zinc-400">数字工具箱</span>
        </h1>
        <p className="max-w-2xl text-zinc-400 text-lg leading-8">
          收录 AI 设计、配色、字体、灵感、素材与效率工具。帮你从互联网工具垃圾山里，快速找到真正顺手的那一把。
        </p>
        <div className="mt-8 flex gap-4 flex-wrap">
          <button className="bg-white text-black px-6 py-3 rounded-2xl font-medium hover:scale-105 transition-transform">开始探索</button>
          <button className="border border-zinc-700 px-6 py-3 rounded-2xl text-zinc-300 hover:bg-zinc-900 transition-colors">今日推荐</button>
        </div>
      </section>

      <section className="max-w-6xl mx-auto mb-12">
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-4">
          <input
            type="text"
            placeholder="搜索设计工具、字体、灵感网站..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent outline-none text-lg placeholder:text-zinc-500"
          />
        </div>
      </section>

      <section className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(groupedTools).map(([categoryName, categoryTools]) => (
          <div key={categoryName} className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 hover:border-zinc-600 transition-colors">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-2xl font-bold">{categoryName}</h2>
              <span className="text-sm text-zinc-500">{categoryTools.length} Tools</span>
            </div>
            <div className="space-y-3">
              {categoryTools.map((tool) => (
                <a key={tool.name} href={tool.url} target="_blank" rel="noreferrer"
                  className="block bg-zinc-950 border border-zinc-800 rounded-2xl px-4 py-4 hover:bg-zinc-900 hover:border-zinc-700 transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="font-medium mb-1">{tool.name}</div>
                      <div className="text-sm text-zinc-500 leading-6">{tool.desc}</div>
                    </div>
                    <span className="text-zinc-500 shrink-0">↗</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>

      {filteredTools.length === 0 && (
        <section className="max-w-3xl mx-auto mt-16 text-center">
          <div className="text-2xl font-bold mb-4">没有找到相关工具</div>
          <p className="text-zinc-500 leading-8">试试搜索：AI、字体、配色、UI、图片...</p>
        </section>
      )}

      <section className="max-w-6xl mx-auto mt-16">
        <div className="bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-[32px] p-8 md:p-12 overflow-hidden relative">
          <div className="absolute right-0 top-0 w-72 h-72 bg-white/5 blur-3xl rounded-full" />
          <div className="relative z-10 max-w-2xl">
            <div className="text-sm text-zinc-500 mb-3">TODAY'S PICK</div>
            <h2 className="text-4xl font-black mb-4 leading-tight">用更少时间，找到更好的设计工具。</h2>
            <p className="text-zinc-400 leading-8 mb-8">后续你可以加入：用户收藏、热门排行、AI 推荐、设计专题、每日灵感、SEO 页面等功能。</p>
            <button className="bg-white text-black px-6 py-3 rounded-2xl font-medium hover:scale-105 transition-transform">查看路线图</button>
          </div>
        </div>
      </section>

      <footer className="max-w-6xl mx-auto mt-16 border-t border-zinc-900 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-zinc-600 text-sm">
            Built for designers, creators & midnight deadline survivors.
          </div>
          <div className="text-zinc-500 text-sm">
            <span className="text-zinc-400 font-medium">zky</span>
          </div>
        </div>
        <div className="mt-6 text-center text-zinc-700 text-xs border-t border-zinc-900/50 pt-6">
          <span>© 2026 Design Tools Hub · 由 </span>
          <span className="text-zinc-500">zky</span>
          <span> 整理推荐</span>
        </div>
      </footer>
    </div>
  )
}