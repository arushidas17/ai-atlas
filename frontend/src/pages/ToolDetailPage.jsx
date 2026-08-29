import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getTool } from '../api'
import ToolLogo from '../components/ToolLogo'

export default function ToolDetailPage() {
  const { slug } = useParams()
  const [tool, setTool] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getTool(slug).then(setTool).finally(() => setLoading(false))
  }, [slug])

  if (loading) return (
    <div className="min-h-screen bg-bg text-ink flex items-center justify-center font-mono text-sm text-ink-dim">
      Loading…
    </div>
  )
  if (!tool) return (
    <div className="min-h-screen bg-bg text-ink flex items-center justify-center font-mono text-sm text-ink-dim">
      Tool not found.
    </div>
  )

  return (
    <div className="min-h-screen bg-bg text-ink">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/" className="font-mono text-xs text-ink-faint hover:text-accent transition">
          ← back to AI Atlas
        </Link>

        <div className="flex items-center gap-5 mt-6 mb-6">
          <div className="w-16 h-16 rounded-2xl atlas-ring active bg-surface-2 flex items-center justify-center overflow-hidden">
            <ToolLogo name={tool.name} websiteUrl={tool.website_url} />
          </div>
          <div>
            <h1 className="font-display text-3xl font-semibold tracking-tight">{tool.name}</h1>
            <p className="text-ink-dim text-sm mt-1">
              {tool.company_name} · {tool.categories.map(c => c.name).join(', ')}
            </p>
          </div>
        </div>

        <p className="text-ink-dim leading-relaxed mb-6 max-w-2xl">{tool.long_description || tool.description}</p>

        <div className="flex flex-wrap gap-3 mb-8">
          <span className="font-mono text-xs border border-border rounded-full px-3 py-1.5 text-amber">
            ★ {Number(tool.rating_avg).toFixed(1)} ({tool.rating_count})
          </span>
          <span className="font-mono text-xs border border-border rounded-full px-3 py-1.5 text-ink-dim capitalize">
            {tool.pricing_type}
          </span>
          <span className="font-mono text-xs border border-border rounded-full px-3 py-1.5 text-ink-dim">
            {tool.view_count} views
          </span>
        </div>

        {tool.website_url && (
          
            <a href={tool.website_url}
            target="_blank"
            rel="noreferrer"
            className="inline-block bg-accent hover:bg-accent-dim transition px-6 py-3 rounded-xl font-medium text-sm mb-12"
          >
            Visit website ↗
          </a>
        )}

        {tool.pricing_plans?.length > 0 && (
          <div className="mb-12">
            <h2 className="font-display text-lg font-semibold mb-4">Pricing</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tool.pricing_plans.map((p, i) => (
                <div key={i} className="border border-border rounded-2xl p-5 bg-surface">
                  <div className="flex justify-between items-baseline mb-3">
                    <h3 className="font-display font-semibold">{p.plan_name}</h3>
                    <span className="font-mono text-lg font-semibold text-accent">
                      {Number(p.price) === 0 ? 'Free' : `$${p.price}/${p.billing_period}`}
                    </span>
                  </div>
                  <ul className="text-sm text-ink-dim space-y-1.5">
                    {p.features.map((f, j) => (
                      <li key={j} className="flex gap-2">
                        <span className="text-accent">·</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {tool.reviews?.length > 0 && (
          <div className="mb-12">
            <h2 className="font-display text-lg font-semibold mb-4">Reviews</h2>
            <div className="space-y-3">
              {tool.reviews.map((r, i) => (
                <div key={i} className="border border-border rounded-2xl p-5 bg-surface">
                  <div className="flex justify-between mb-1.5">
                    <span className="font-medium text-sm">{r.title}</span>
                    <span className="text-amber text-xs font-mono">{'★'.repeat(r.rating)}</span>
                  </div>
                  <p className="text-sm text-ink-dim mb-2 leading-relaxed">{r.body}</p>
                  <span className="font-mono text-xs text-ink-faint">— {r.user_name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tool.alternatives?.length > 0 && (
          <div>
            <h2 className="font-display text-lg font-semibold mb-4">Similar tools</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {tool.alternatives.map((alt) => (
                <Link
                  key={alt.id}
                  to={`/tools/${alt.slug}`}
                  className="border border-border rounded-xl p-4 hover:border-border-hover transition text-center bg-surface"
                >
                  <div className="font-display font-medium text-sm">{alt.name}</div>
                  <div className="font-mono text-xs text-amber mt-1">★ {Number(alt.rating_avg).toFixed(1)}</div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}