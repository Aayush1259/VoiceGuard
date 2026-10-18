import React from 'react'
import { useVoiceGuardStore } from '../store/useVoiceGuardStore.js'

export function Footer() {
  const { setActiveTab } = useVoiceGuardStore()

  const navLinks = [
    { id: 'demo', label: 'Live Demo' },
    { id: 'checks', label: 'The 4 Checks' },
    { id: 'business', label: 'C2C • B2C • B2B' },
    { id: 'usecases', label: 'Member Personas' },
    { id: 'privacy', label: 'Privacy & Legal' },
  ]

  return (
    <footer className="bg-slate-900 text-slate-400 rounded-t-[32px] mt-16 border-t border-slate-800 shadow-xl">
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Main Sleek Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800/80">
          {/* Brand & Purpose */}
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-700 flex items-center justify-center text-white font-black text-sm shadow-sm shrink-0">
              S
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="font-extrabold text-white text-sm tracking-tight">Sound Credit Union</span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-mono font-bold text-teal-400 bg-teal-950/70 px-2 py-0.5 rounded-full border border-teal-800">
                  VoiceGuard™
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Verify both sides before money moves &bull; Real-time vault hold & impersonation defense
              </p>
            </div>
          </div>

          {/* Clean Horizontal Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-1 sm:gap-2 text-xs font-medium">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-800/80 transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Bottom Metadata & Compliance Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span>&copy; 2026 Sound Credit Union</span>
            <span>&bull;</span>
            <span>Federally Insured by NCUA</span>
            <span>&bull;</span>
            <span>Zero Audio Retention (WA RCW 19.375 Compliant)</span>
          </div>

          <div className="flex items-center gap-2 font-mono text-[11px] text-emerald-400 bg-slate-950/60 px-3 py-1 rounded-full border border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Pre-Auth Sentry Active &bull; Latency &lt;15ms</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
