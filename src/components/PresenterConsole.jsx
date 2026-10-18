import React from 'react'
import { useVoiceGuardStore } from '../store/useVoiceGuardStore.js'
import { PERSONAS } from '../data/personas.js'

export function PresenterConsole() {
  const {
    currentPersonaId,
    selectPersona,
    mobileScreen,
    sessionId,
    challengeNonce,
    watermarkVerified,
  } = useVoiceGuardStore()

  const steps = [
    { id: 'TRANSFER_FORM', label: '1. Member Requests Transfer' },
    { id: 'HOLD_ALERT', label: '2. Protective Hold Engaged' },
    { id: 'CALL_ACTIVE', label: '3. In-App Dual Voice Call' },
    { id: 'REVIEW_DECISION', label: '4. Counterparty Check & Review' },
    { id: 'OUTCOME_CANCELLED', label: '5. Scam Stopped / Money Saved' },
  ]

  return (
    <div className="space-y-5">
      {/* 1. How This Works in Real Life */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-6 h-6 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center text-xs font-bold">
            💡
          </span>
          <h3 className="font-bold text-sm text-slate-900">How VoiceGuard Works in Real Life</h3>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          When a member is being manipulated (e.g. by a phone scammer claiming to be from Sound Credit Union), they are under extreme psychological urgency. VoiceGuard intercepts the payment <strong>before the money moves</strong>, placing a temporary hold and launching a synchronized dual in-app verification call.
        </p>

        {/* Live Step Progress */}
        <div className="pt-2 border-t border-slate-100 space-y-1.5">
          <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
            Live Protocol Lifecycle:
          </span>
          <div className="space-y-1">
            {steps.map((st) => {
              const isActive = mobileScreen === st.id
              const isPast =
                (mobileScreen === 'HOLD_ALERT' && st.id === 'TRANSFER_FORM') ||
                (mobileScreen === 'CALL_ACTIVE' && ['TRANSFER_FORM', 'HOLD_ALERT'].includes(st.id)) ||
                (mobileScreen === 'REVIEW_DECISION' && ['TRANSFER_FORM', 'HOLD_ALERT', 'CALL_ACTIVE'].includes(st.id)) ||
                (mobileScreen === 'OUTCOME_CANCELLED' && st.id !== 'OUTCOME_CANCELLED')

              return (
                <div
                  key={st.id}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-teal-50 text-teal-800 border border-teal-200 font-bold'
                      : isPast
                      ? 'bg-slate-50 text-slate-500'
                      : 'text-slate-400'
                  }`}
                >
                  <span>{st.label}</span>
                  {isActive && <span className="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>}
                  {isPast && <span className="text-teal-600 font-bold text-xs">✓</span>}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 2. Scenario Switcher */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-sm text-slate-900">Official Personas (M1001–M1004)</h3>
          <span className="text-[11px] text-slate-400 font-mono">Click to test scenario</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {PERSONAS.map((p) => {
            const isSelected = currentPersonaId === p.id
            return (
              <button
                key={p.id}
                onClick={() => selectPersona(p.id)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-teal-50 border-teal-500 text-teal-900 shadow-xs'
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-lg">{p.avatar}</span>
                  <span className="text-[10px] font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-slate-200 text-slate-800">
                    {p.id}
                  </span>
                </div>
                <div className="font-bold text-xs text-slate-900">{p.name}</div>
                <div className="text-[11px] text-slate-500 truncate mt-0.5">{p.scenarioType}</div>
                <div className="text-[10px] font-mono font-bold text-teal-700 mt-1">
                  ${p.transferAmount.toLocaleString()} Wire
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* 3. Under the Hood Security Inspector */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3 font-mono text-xs">
        <span className="text-[10px] uppercase font-bold text-slate-400 block">
          Under the Hood Security Guards (/src/security)
        </span>
        <div className="space-y-1.5 text-slate-600">
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Session ID:</span>
            <span className="text-slate-900 font-semibold">{sessionId}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">Challenge Nonce:</span>
            <span className="text-slate-900 font-semibold">{challengeNonce}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-100">
            <span className="text-slate-500">DeepMark Watermark:</span>
            <span className="text-emerald-700 font-semibold">
              {watermarkVerified ? 'Active & Cryptographically Bound' : 'Checking...'}
            </span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-slate-500">TTL Countdown:</span>
            <span className="text-teal-700 font-semibold">60s Hard Limit</span>
          </div>
        </div>
      </div>
    </div>
  )
}
