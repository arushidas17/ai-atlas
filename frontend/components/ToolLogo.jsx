import { useState } from 'react'

export default function ToolLogo({ name, websiteUrl }) {
  const [failed, setFailed] = useState(false)

  let domain = null
  try {
    if (websiteUrl) domain = new URL(websiteUrl).hostname.replace('www.', '')
  } catch {
    domain = null
  }

  if (!domain || failed) {
    return <span className="font-display font-semibold text-accent">{name[0]}</span>
  }

  return (
    <img
      src={`https://logo.clearbit.com/${domain}`}
      alt={`${name} logo`}
      onError={() => setFailed(true)}
      className="w-full h-full object-contain rounded-xl p-1.5"
    />
  )
}