import React from 'react'

export function ResearchCallout() {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-lg p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
      <div className="flex items-center gap-2.5">
        <span className="text-sky-400 font-bold">Research Foundation:</span>
        <span className="text-slate-300">
          Nottingham CeDEx (2023) proves risk-matched friction reduces fraud by{' '}
          <strong className="text-white">81%</strong>, compared to only{' '}
          <strong className="text-slate-400">18%</strong> for generic pop-ups.
        </span>
      </div>
      <div className="flex items-center gap-2 font-mono text-[11px] shrink-0 text-slate-400">
        <span>Target: Sound Credit Union 2026</span>
        <span>•</span>
        <span className="text-sky-400 font-medium">VoiceGuard Protocol</span>
      </div>
    </div>
  )
}
