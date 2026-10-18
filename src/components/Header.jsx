import React from 'react'
import { useVoiceGuardStore } from '../store/useVoiceGuardStore.js'

export function Header() {
  const { activeTab, setActiveTab, resetDemo } = useVoiceGuardStore()

  const tabs = [
    { id: 'demo', label: 'Live Demo' },
    { id: 'checks', label: 'The 4 Checks' },
    { id: 'business', label: 'Business Models' },
    { id: 'usecases', label: 'Personas' },
    { id: 'privacy', label: 'Privacy & Legal' },
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/95 border-b border-slate-200/80 shadow-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Clean Left Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-700 to-emerald-800 flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
              S
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-slate-900 tracking-tight">Sound Credit Union</span>
              <span className="text-xs font-mono font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200/70">
                VoiceGuard
              </span>
            </div>
          </div>

          {/* Spacious Center Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-teal-700 text-white shadow-xs font-bold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </nav>

          {/* Clean Right Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-medium border border-emerald-200/60">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="hidden sm:inline">Active</span>
            </div>

            <button
              onClick={resetDemo}
              className="text-xs font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-3 py-1 rounded-full transition-colors cursor-pointer"
              title="Reset simulation"
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* Mobile Navigation Pills */}
        <div className="flex md:hidden items-center gap-1.5 overflow-x-auto pb-2.5 -mt-1 scrollbar-none">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-teal-700 text-white font-bold'
                    : 'text-slate-600 hover:bg-slate-100 bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>
    </header>
  )
}
