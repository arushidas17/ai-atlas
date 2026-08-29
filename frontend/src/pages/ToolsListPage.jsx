import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTools, getCategories } from '../api'

export default function ToolsListPage() {
  const [tools, setTools] = useState([])
  const [categories, setCategories] = useState([])
  const [activeCategory, setActiveCategory] = useState(null)
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCategories().then(setCategories)
  }, [])

  useEffect(() => {
    setLoading(true)
    getTools({ category: activeCategory, search: search || undefined })
      .then(setTools)
      .finally(() => setLoading(false))
  }, [activeCategory, search])

  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full atlas-ring active bg-surface-2 flex items-center justify-center">
            <div className="w-2 h-2 rounded-full bg-accent" />
          </div>
          <span className="font-display font-semibold tracking-tight text-lg">AI Tools</span>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-14">
        <p className="font-mono text-xs uppercase tracking-widest text-accent mb-3">AI Tools · {tools.length || '—'} tools</p>
        <h1 className="font-display text-4xl sm:text-5xl font-semibold tracking-tight mb-3">
          Find your next AI tool.
        </h1>
        <p className="text-ink-dim text-base mb-10 max-w-xl">
          A curated map of the AI tools worth knowing — ranked, reviewed, and compared in one place.
        </p>

        <div className="relative mb-6">
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-faint" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z" />
          </svg>
          <input
            className="w-full bg-surface border border-border rounded-xl pl-11 pr-4 py-3.5 text-sm outline-none focus:border-accent transition placeholder:text-ink-faint"
            placeholder="Search by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex gap-2 mb-10 flex-wrap">
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
              !activeCategory
                ? 'bg-accent border-accent text-white'
                : 'border-border text-ink-dim hover:border-border-hover hover:text-ink'
            }`}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.slug)}
              className={`px-4 py-2 rounded-full border text-sm font-medium transition ${
                activeCategory === c.slug
                  ? 'bg-accent border-accent text-white'
                  : 'border-border text-ink-dim hover:border-border-hover hover:text-ink'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-44 rounded-2xl skeleton border border-border" />
            ))}
          </div>
        ) : tools.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-border rounded-2xl">
            <p className="font-display text-lg mb-1">Nothing here yet.</p>
            <p className="text-ink-dim text-sm">Try a different search term, or clear your filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tools.map((t) => (
              <Link
                key={t.id}
                to={`/tools/${t.slug}`}
                className="group bg-surface border border-border rounded-2xl p-5 hover:border-border-hover hover:-translate-y-0.5 transition flex flex-col"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl atlas-ring bg-surface-2 flex items-center justify-center font-display font-semibold text-accent group-hover:atlas-ring">
                    {t.name[0]}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-ink-faint border border-border rounded-full px-2 py-1">
                    {t.pricing_type}
                  </span>
                </div>
                <h3 className="font-display font-semibold text-base mb-1">{t.name}</h3>
                <p className="text-sm text-ink-dim line-clamp-2 flex-1 mb-4">{t.tagline}</p>
                <div className="flex items-center justify-between text-xs pt-3 border-t border-border">
                  <span className="text-ink-faint">{t.company_name}</span>
                  <span className="text-amber font-mono">★ {Number(t.rating_avg).toFixed(1)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}