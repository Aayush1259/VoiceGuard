import React from 'react'
import { useVoiceGuardStore } from '../store/useVoiceGuardStore.js'
import { SIGNALS, SIGNAL_GROUPS } from '../data/signals.js'
import { PERSONAS } from '../data/personas.js'

export function RiskDial() {
  const {
    activeSignalIds,
    toggleSignal,
    clearAllSignals,
    selectPersona,
    currentPersonaId,
  } = useVoiceGuardStore()

  return (
    <div className="fintech-card p-5 space-y-5">
      {/* 1. Header & Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-800">
        <div>
          <h3 className="font-semibold text-sm text-white">Live Threat Simulation Dial</h3>
          <p className="text-xs text-slate-400">Select prebuilt member scenarios or toggle signals manually</p>
        </div>
        <button
          onClick={clearAllSignals}
          className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-colors"
        >
          Reset All
        </button>
      </div>

      {/* 2. Official Anchor Scenarios */}
      <div>
        <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block mb-2">
          Anchor Scenarios (Click to Load)
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PERSONAS.map((p) => {
            const isSelected = currentPersonaId === p.id
            return (
              <button
                key={p.id}
                onClick={() => selectPersona(p.id)}
                className={`p-2.5 rounded-lg border text-left transition-all flex items-start gap-2.5 ${
                  isSelected
                    ? 'bg-sky-500/10 border-sky-500/50 text-white'
                    : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-300'
                }`}
              >
                <span className="text-xl mt-0.5">{p.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-xs text-white truncate">{p.name}</span>
                    <span className="text-[10px] font-mono font-bold text-sky-400">{p.id}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{p.scenarioType}</p>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 3. Signal Toggles Grouped Simply */}
      <div className="pt-2 border-t border-slate-800 space-y-4">
        {SIGNAL_GROUPS.map((group) => {
          const groupSignals = SIGNALS.filter((s) => s.group === group)

          return (
            <div key={group}>
              <span className="text-xs font-semibold text-slate-400 block mb-2">
                {group} Indicators
              </span>
              <div className="space-y-1.5">
                {groupSignals.map((signal) => {
                  const isActive = activeSignalIds.includes(signal.id)

                  return (
                    <button
                      key={signal.id}
                      onClick={() => toggleSignal(signal.id)}
                      className={`w-full flex items-center justify-between p-2 rounded-lg border text-xs transition-colors ${
                        isActive
                          ? 'bg-sky-500/15 border-sky-500/40 text-white font-medium'
                          : 'bg-slate-950/40 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-3.5 h-3.5 rounded flex items-center justify-center text-[10px] ${
                            isActive ? 'bg-sky-500 text-slate-950 font-bold' : 'border border-slate-600'
                          }`}
                        >
                          {isActive ? '✓' : ''}
                        </span>
                        <span>{signal.label}</span>
                      </div>
                      <span className="font-mono text-[10px] text-slate-400">
                        +{signal.weight} pts
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
