import React from 'react'
import { useVoiceGuardStore } from '../store/useVoiceGuardStore.js'
import { PERSONAS } from '../data/personas.js'

export function DualPhoneController() {
  const {
    currentPersonaId,
    selectPersona,
    triggerTransfer,
    answerBothCalls,
    resetDemo,
    autoPlayDemo,
    isAutoPlaying,
    simulateRecipientBusy,
    enableAccessibilityMode,
    isAccessibilityMode,
    isAsyncHold,
    isReverseChallenge,
    toggleReverseChallenge,
    isExternalSpeakerAttack,
    toggleExternalSpeakerAttack,
  } = useVoiceGuardStore()

  const personaMeta = {
    M1001: {
      type: 'Impersonation Scam',
      amount: '$8,500 Wire',
      threatPill: 'Threat: Coercive Safe Vault Script',
      defensePill: 'Defense: 3-Word Break + Escrow Hold',
      outcomePill: 'Outcome: Eleanor Cancels ($8,500 Saved)',
      glow: 'from-amber-500/10 via-rose-500/5 to-teal-500/10',
      activeBorder: 'border-amber-400 ring-2 ring-amber-400/20',
      avatarBg: 'bg-amber-100 text-amber-800',
    },
    M1002: {
      type: 'Fake Check Scam',
      amount: '$1,800 Instant',
      threatPill: 'Threat: Counterfeit Remote Job Check',
      defensePill: 'Defense: Question Hook + 24h Buffer',
      outcomePill: 'Outcome: Intercepted Before Bounce',
      glow: 'from-indigo-500/10 via-purple-500/5 to-teal-500/10',
      activeBorder: 'border-indigo-400 ring-2 ring-indigo-400/20',
      avatarBg: 'bg-indigo-100 text-indigo-800',
    },
    M1003: {
      type: 'Legitimate Remodel',
      amount: '$6,500 Wire',
      threatPill: 'Threat: First-Time High Value Payee',
      defensePill: 'Defense: Fast Dual Check (40s)',
      outcomePill: 'Outcome: Funds Cleared Smoothly',
      glow: 'from-teal-500/10 via-emerald-500/5 to-cyan-500/10',
      activeBorder: 'border-teal-500 ring-2 ring-teal-500/20',
      avatarBg: 'bg-teal-100 text-teal-800',
    },
    M1004: {
      type: 'Account Takeover',
      amount: '$9,200 Crypto',
      threatPill: 'Threat: 2 AM Stolen Password + New IP',
      defensePill: 'Defense: Trusted Hardware Lock',
      outcomePill: 'Outcome: Intruder Blocked & Alert Sent',
      glow: 'from-rose-500/10 via-red-500/5 to-amber-500/10',
      activeBorder: 'border-rose-400 ring-2 ring-rose-400/20',
      avatarBg: 'bg-rose-100 text-rose-800',
    },
  }[currentPersonaId]

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-5 shadow-lg shadow-slate-200/50 space-y-4 transition-all">
      {/* Top Row: Mission Control Header & Interactive Action Buttons */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-200/60">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <h2 className="text-sm font-bold text-slate-900 tracking-tight">
              Interactive Fraud Defense Simulator
            </h2>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Select an official member persona to watch the dual-phone intervention in real time.
          </p>
        </div>

        {/* Action Controls Dock */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* 1-Click Auto Demo */}
          <button
            onClick={autoPlayDemo}
            disabled={isAutoPlaying}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 shadow-md cursor-pointer ${
              isAutoPlaying
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                : 'bg-gradient-to-r from-teal-600 via-teal-700 to-emerald-700 hover:from-teal-700 hover:to-emerald-800 text-white shadow-teal-900/20 hover:scale-[1.02]'
            }`}
          >
            <span className="text-xs">▶</span>
            <span>{isAutoPlaying ? 'Simulating Story...' : 'Auto-Play Story'}</span>
          </button>

          {/* Test Recipient Busy */}
          <button
            onClick={() => {
              triggerTransfer()
              setTimeout(() => simulateRecipientBusy(), 600)
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              isAsyncHold
                ? 'bg-amber-500 text-white shadow-sm font-bold scale-[1.02]'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
            }`}
          >
            <span>⏳</span>
            <span>Recipient Busy (4-Hr Hold)</span>
          </button>

          {/* Test Accessibility Mode */}
          <button
            onClick={() => {
              triggerTransfer()
              setTimeout(() => {
                answerBothCalls()
                enableAccessibilityMode()
              }, 600)
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              isAccessibilityMode
                ? 'bg-indigo-600 text-white shadow-sm font-bold scale-[1.02]'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
            }`}
          >
            <span>♿</span>
            <span>Ill / Mute Mode</span>
          </button>

          {/* Cognitive Hook Toggle */}
          <button
            onClick={toggleReverseChallenge}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              isReverseChallenge
                ? 'bg-amber-500 text-white shadow-xs font-bold'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
            }`}
            title="Toggle Reverse Word Cognitive Sanity Challenge"
          >
            <span>🧠</span>
            <span>Reverse Hook: {isReverseChallenge ? 'ON' : 'OFF'}</span>
          </button>

          {/* Time-of-Flight Acoustic Distance Toggle */}
          <button
            onClick={toggleExternalSpeakerAttack}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
              isExternalSpeakerAttack
                ? 'bg-rose-600 text-white shadow-xs font-bold animate-pulse'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-700'
            }`}
            title="Toggle Ultrasonic Speaker-to-Mic Distance Check"
          >
            <span>📡</span>
            <span>ToF: {isExternalSpeakerAttack ? '210cm (Attack Flagged)' : '13.8cm (Normal)'}</span>
          </button>

          <button
            onClick={resetDemo}
            className="px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200/80 text-xs font-medium text-slate-600 cursor-pointer transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Modern Floating Persona Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5">
        {PERSONAS.map((p) => {
          const isSelected = currentPersonaId === p.id
          const meta = personaMeta[p.id]

          return (
            <button
              key={p.id}
              onClick={() => selectPersona(p.id)}
              className={`p-3 rounded-2xl text-left transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-white border-2 border-teal-600 shadow-md shadow-teal-900/10 scale-[1.02]'
                  : 'bg-white/70 hover:bg-white border border-slate-200/80 hover:border-slate-300'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-12 h-12 bg-teal-500/10 rounded-bl-3xl pointer-events-none" />
              )}

              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-lg shadow-xs">
                  {p.avatar}
                </div>
                <span
                  className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                    isSelected
                      ? 'bg-teal-700 text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {p.id}
                </span>
              </div>

              <div className="font-bold text-xs text-slate-900 truncate">{p.name}</div>
              <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                {p.scenarioType.split('(')[0]}
              </div>

              <div className="mt-2 pt-1.5 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400">Transfer</span>
                <span className="font-bold text-teal-700">
                  ${p.transferAmount.toLocaleString()}
                </span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Visual Live Story Capsule (Replaces Wall of Text) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-3.5 sm:p-4 rounded-2xl shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            {currentPersonaId} ACTIVE SCENARIO
          </span>
          <span className="font-bold text-sm text-white">
            {personaMeta.type} &bull; {personaMeta.amount}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 border border-rose-500/30 font-medium">
            {personaMeta.threatPill}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-teal-500/20 text-teal-300 border border-teal-500/30 font-medium">
            {personaMeta.defensePill}
          </span>
          <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-bold">
            {personaMeta.outcomePill}
          </span>
        </div>
      </div>
    </div>
  )
}

