import React from 'react'
import { useVoiceGuardStore } from '../store/useVoiceGuardStore.js'
import { PERSONAS_BY_ID } from '../data/personas.js'

export function TransactionChecksPipeline() {
  const { checks, currentPersonaId } = useVoiceGuardStore()
  const persona = PERSONAS_BY_ID[currentPersonaId] || PERSONAS_BY_ID['M1001']

  const steps = [
    {
      num: '01',
      name: 'Sentry Score',
      tag: 'Pre-Auth Gate',
      status: checks.check1_risk,
      active: checks.check1_risk === 'FLAGGED',
      badge: checks.check1_risk === 'FLAGGED' ? 'Vault Hold Engaged' : 'Baseline Scored',
      color: checks.check1_risk === 'FLAGGED' ? 'border-amber-400 bg-amber-500/10 text-amber-900' : 'border-slate-200 text-slate-500',
      icon: checks.check1_risk === 'FLAGGED' ? '🔒' : '⚡',
    },
    {
      num: '02',
      name: 'Spoken Challenge',
      tag: 'Sender Verified NOW',
      status: checks.check2_senderVoice,
      active: checks.check2_senderVoice === 'PASSED',
      badge: checks.check2_senderVoice === 'PASSED' ? 'Words Verified ✓' : 'Awaiting Audio',
      color: checks.check2_senderVoice === 'PASSED' ? 'border-teal-500 bg-teal-500/10 text-teal-900' : 'border-slate-200 text-slate-500',
      icon: checks.check2_senderVoice === 'PASSED' ? '✓' : '🎙️',
    },
    {
      num: '03',
      name: 'DeepMark Watermark',
      tag: 'Hardware Attestation',
      status: checks.check3_watermark,
      active: checks.check3_watermark === 'PASSED',
      badge: checks.check3_watermark === 'PASSED' ? 'Ultrasonic Pass ✓' : 'Awaiting Ingestion',
      color: checks.check3_watermark === 'PASSED' ? 'border-indigo-500 bg-indigo-500/10 text-indigo-900' : 'border-slate-200 text-slate-500',
      icon: checks.check3_watermark === 'PASSED' ? '✓' : '🛡️',
    },
    {
      num: '04',
      name: 'Payee Verification',
      tag: 'Asynch (Up to 4h)',
      status: checks.check4_recipient,
      active: checks.check4_recipient === 'PASSED' || checks.check4_recipient === 'WAITING_ASYNC',
      badge:
        checks.check4_recipient === 'PASSED'
          ? 'Payee Verified ✓'
          : checks.check4_recipient === 'WAITING_ASYNC'
          ? 'Pending (4-Hr Window)'
          : 'Pending Sender',
      color:
        checks.check4_recipient === 'PASSED'
          ? 'border-emerald-500 bg-emerald-500/10 text-emerald-900'
          : checks.check4_recipient === 'WAITING_ASYNC'
          ? 'border-amber-400 bg-amber-500/10 text-amber-900'
          : 'border-slate-200 text-slate-500',
      icon: checks.check4_recipient === 'PASSED' ? '✓' : checks.check4_recipient === 'WAITING_ASYNC' ? '⏳' : '👤',
    },
    {
      num: '05',
      name: 'Pre-Release Reality',
      tag: 'Final Settlement Decision',
      status: checks.check5_disclosure,
      active: checks.check5_disclosure !== 'IDLE',
      badge:
        checks.check5_disclosure === 'SCAM_STOPPED'
          ? '🛑 Scam Cancelled'
          : checks.check5_disclosure === 'RELEASED'
          ? '✓ Funds Released'
          : 'Pending Final Gate',
      color:
        checks.check5_disclosure === 'SCAM_STOPPED'
          ? 'border-rose-500 bg-rose-500/15 text-rose-900'
          : checks.check5_disclosure === 'RELEASED'
          ? 'border-emerald-500 bg-emerald-500/15 text-emerald-900'
          : 'border-slate-200 text-slate-500',
      icon: checks.check5_disclosure === 'SCAM_STOPPED' ? '🛑' : checks.check5_disclosure === 'RELEASED' ? '✓' : '⚖️',
    },
  ]

  return (
    <div className="glass-panel rounded-3xl p-4 sm:p-5 shadow-lg shadow-slate-200/50 space-y-3 transition-all">
      {/* Track Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-slate-200/60">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse"></div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-800">
            Real-Time Pre-Settlement Defense Gate Pipeline
          </span>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="text-slate-400">Target Transfer:</span>
          <span className="font-bold text-slate-900 bg-white px-2.5 py-0.5 rounded-full border border-slate-200 shadow-xs">
            ${persona.transferAmount.toLocaleString()} Wire
          </span>
        </div>
      </div>

      {/* Connected 5-Step Visual Stepper */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
        {steps.map((st, i) => (
          <div
            key={st.num}
            className={`p-3 rounded-2xl border transition-all relative overflow-hidden flex flex-col justify-between ${st.color} ${
              st.active ? 'shadow-sm scale-[1.01]' : 'bg-white/60'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-white/80 border border-slate-200/60">
                  {st.num}
                </span>
                <span className="text-sm font-bold">{st.icon}</span>
              </div>

              <div className="font-bold text-xs text-slate-900 leading-snug">{st.name}</div>
              <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">{st.tag}</div>
            </div>

            <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[10px] font-mono font-semibold">
              <span className="truncate">{st.badge}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

