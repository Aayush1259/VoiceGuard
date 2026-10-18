import React from 'react'
import { useVoiceGuardStore } from '../store/useVoiceGuardStore.js'
import { THRESHOLDS, MAX_SCORE } from '../logic/risk.js'
import { PERSONAS_BY_ID } from '../data/personas.js'

export function RiskDashboard() {
  const { assessment, currentPersonaId } = useVoiceGuardStore()
  const { score, tier, fired } = assessment
  const persona = PERSONAS_BY_ID[currentPersonaId] || PERSONAS_BY_ID['M1001']

  const tierStyles = {
    GREEN: {
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
      bar: 'bg-emerald-500',
      title: 'Low Risk — Normal Settlement',
      summary: 'Transaction matches normal member behavior. No hold or verification required.',
      actionText: 'Payment releases immediately through standard ACH / Wire network.',
      icon: '✓',
    },
    AMBER: {
      badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      bar: 'bg-amber-500',
      title: 'Elevated Risk — Dual Verification Required',
      summary: 'Manipulation or high-risk scam pattern detected. Payment held prior to release.',
      actionText: 'Protective Hold engaged. VoiceGuard dual-party in-app challenge required.',
      icon: '⚠️',
    },
    RED: {
      badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      bar: 'bg-rose-500',
      title: 'High Risk — Account Compromise / Hold Engaged',
      summary: 'Account takeover or severe coercion signature detected. Self-service override disabled.',
      actionText: 'Funds frozen at credit union. Member routed to fraud specialist callback.',
      icon: '🛑',
    },
  }[tier.id]

  return (
    <div className="space-y-5">
      {/* 1. Transaction in Question Card */}
      <div className="fintech-card p-5">
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
              Live Member Transaction
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs text-sky-400 font-mono font-medium">{persona.id}</span>
          </div>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
            {persona.scenarioType}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <span className="text-xs text-slate-400 block mb-1">Member Name</span>
            <div className="text-base font-semibold text-white flex items-center gap-2">
              <span>{persona.avatar}</span>
              <span>{persona.name}</span>
            </div>
            <span className="text-xs text-slate-500">{persona.memberSince}</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block mb-1">Transfer Amount & Rail</span>
            <div className="text-xl font-bold font-mono text-white">
              ${persona.transferAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
            <span className="text-xs text-slate-400">{persona.rail}</span>
          </div>

          <div>
            <span className="text-xs text-slate-400 block mb-1">Recipient Destination</span>
            <div className="text-sm font-semibold text-slate-200 truncate">
              {persona.recipient}
            </div>
            <span className="text-xs text-amber-400 font-medium">New / Unrecognized Payee</span>
          </div>
        </div>

        {/* Member Context Summary */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-300 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800 flex items-start gap-2">
          <span className="text-sky-400 font-bold shrink-0">Context:</span>
          <span>{persona.description}</span>
        </div>
      </div>

      {/* 2. Sentry Risk Evaluation Banner */}
      <div className="fintech-card p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border ${tierStyles.badge}`}>
                {tierStyles.icon} {tier.id} TIER
              </span>
              <span className="text-xs font-mono text-slate-400">Score: {score} / {MAX_SCORE}</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1.5">{tierStyles.title}</h2>
            <p className="text-xs text-slate-400 mt-0.5">{tierStyles.summary}</p>
          </div>

          {/* Clean Linear Progress Gauge */}
          <div className="sm:text-right shrink-0">
            <span className="text-xs font-mono text-slate-400 block mb-1">Risk Threshold</span>
            <div className="w-44 bg-slate-800 rounded-full h-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${tierStyles.bar}`}
                style={{ width: `${Math.min(100, (score / MAX_SCORE) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
              <span>0 (Green)</span>
              <span>≥{THRESHOLDS.AMBER} Amber</span>
              <span>≥{THRESHOLDS.RED} Red</span>
            </div>
          </div>
        </div>

        {/* 3. Why Was This Flagged? (Explainable Rules) */}
        <div className="mt-4 pt-4 border-t border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-2.5">
            <span>Triggered Risk Indicators ({fired.length})</span>
            <span className="text-slate-500 font-normal">Explainable rules evaluated at pre-auth</span>
          </div>

          {fired.length === 0 ? (
            <div className="p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/20 text-xs text-emerald-300">
              ✓ No suspicious indicators triggered. Transaction matches historical baseline.
            </div>
          ) : (
            <div className="space-y-2">
              {fired.map((signal) => (
                <div
                  key={signal.id}
                  className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 text-xs"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-amber-400 font-bold">•</span>
                    <div>
                      <span className="font-semibold text-white">{signal.label}:</span>{' '}
                      <span className="text-slate-300">{signal.reason}</span>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded font-mono font-bold bg-slate-800 text-sky-400 shrink-0 text-[11px]">
                    +{signal.weight} pts
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. Active Intervention Action */}
        <div className="mt-4 pt-4 border-t border-slate-800 bg-slate-900/60 p-3 rounded-lg border border-slate-800/80">
          <div className="flex items-start gap-2.5">
            <span className="text-base text-sky-400 mt-0.5">🔒</span>
            <div>
              <span className="text-xs font-bold text-white uppercase tracking-wider block">
                Sound Credit Union Intervention Protocol
              </span>
              <p className="text-xs text-slate-300 mt-0.5">{tierStyles.actionText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
