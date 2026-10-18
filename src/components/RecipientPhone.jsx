import React from 'react'
import { useVoiceGuardStore, CHALLENGE_WORDS } from '../store/useVoiceGuardStore.js'
import { PERSONAS_BY_ID } from '../data/personas.js'
import { SoundwaveCanvas } from './SoundwaveCanvas.jsx'

export function RecipientPhone() {
  const {
    currentPersonaId,
    scenarioStep,
    verifyRecipientLater,
    bothApproveTransfer,
  } = useVoiceGuardStore()

  const persona = PERSONAS_BY_ID[currentPersonaId] || PERSONAS_BY_ID['M1001']

  return (
    <div className={`w-full max-w-[340px] phone-case ${scenarioStep === 'SENDER_DONE_WAITING_RECEIVER' ? 'animate-ringing' : ''}`}>
      <div className="phone-screen">
        {/* Status Bar with Interactive Dynamic Island */}
        <div className="pt-2 px-3.5 pb-1.5 flex items-center justify-between text-[11px] font-semibold text-slate-800 bg-white border-b border-slate-100 select-none">
          <span className="font-mono text-xs font-bold text-slate-900">9:41</span>
          
          {/* Dynamic Island */}
          <div className={`transition-all duration-300 mx-auto -mt-0.5 flex items-center justify-between overflow-hidden shadow-xs ${
            scenarioStep === 'SENDER_DONE_WAITING_RECEIVER'
              ? 'w-48 h-5.5 bg-slate-950 text-white rounded-full px-2.5 text-[9px] border border-indigo-500/50'
              : scenarioStep === 'REVIEW_DECISION'
              ? 'w-44 h-5.5 bg-indigo-950 text-indigo-300 rounded-full px-2.5 text-[9px] border border-indigo-500/50'
              : scenarioStep === 'OUTCOME_APPROVED'
              ? 'w-44 h-5.5 bg-emerald-950 text-emerald-300 rounded-full px-2.5 text-[9px] border border-emerald-500/50'
              : 'w-20 h-4 bg-slate-950 rounded-full'
          }`}>
            {scenarioStep === 'SENDER_DONE_WAITING_RECEIVER' ? (
              <>
                <span className="flex items-center gap-1 font-mono font-bold text-indigo-300 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></span>
                  Incoming Wire
                </span>
                <span className="text-[9px] font-mono text-slate-400">4h Hold</span>
              </>
            ) : scenarioStep === 'REVIEW_DECISION' ? (
              <>
                <span className="font-bold text-indigo-300">Dual Attestation</span>
                <span className="text-[9px] text-indigo-400">Review</span>
              </>
            ) : scenarioStep === 'OUTCOME_APPROVED' ? (
              <>
                <span className="font-bold text-emerald-300">✓ Settled</span>
                <span className="text-[9px] text-emerald-400">RTP</span>
              </>
            ) : (
              <span className="w-2.5 h-2.5 rounded-full bg-slate-800 mx-auto"></span>
            )}
          </div>

          <div className="flex items-center gap-1.5 text-[10px] text-slate-700 font-mono">
            <span className="text-[9px] font-bold text-indigo-800">5G</span>
            <span>98%</span>
          </div>
        </div>

        {/* Recipient App Bar */}
        <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-xs">
              R
            </div>
            <div>
              <span className="font-bold text-xs text-slate-900 block leading-tight">Payee Device</span>
              <span className="text-[9px] text-slate-400">Recipient App</span>
            </div>
          </div>
          <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600">
            {persona.recipient.split(' ')[0]}
          </span>
        </div>

        {/* Screen Dynamic Body */}
        <div className="flex-1 p-4 flex flex-col justify-between bg-slate-50 relative overflow-hidden">
          {/* 1. IDLE (Before Transfer is Triggered) */}
          {scenarioStep === 'TRANSFER_FORM' && (
            <div className="space-y-4 my-auto text-center py-8">
              <div className="w-16 h-16 rounded-3xl bg-slate-200 mx-auto flex items-center justify-center text-3xl shadow-inner">
                🏦
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-slate-800">Recipient App Standby</h4>
                <p className="text-xs text-slate-500 max-w-[200px] mx-auto">
                  Standing by. Waiting for sender to initiate transfer.
                </p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 text-left text-xs space-y-1">
                <div className="flex justify-between text-slate-400 text-[10px]">
                  <span>Account:</span>
                  <span className="text-slate-700 font-mono">Checking (..9012)</span>
                </div>
                <div className="flex justify-between text-slate-400 text-[10px]">
                  <span>VoiceGuard SDK:</span>
                  <span className="text-emerald-600 font-semibold font-mono">Active & Listening</span>
                </div>
              </div>
            </div>
          )}

          {/* 2. SENDER IS VERIFYING RIGHT NOW */}
          {scenarioStep === 'SENDER_VERIFYING' && (
            <div className="space-y-3.5 my-auto text-center">
              <div className="w-12 h-12 rounded-full bg-slate-200 mx-auto flex items-center justify-center text-xl animate-pulse">
                ⏳
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                  Step 1 in Progress
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">Sender is Verifying Identity</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {persona.name} is speaking her 3-word challenge right now on her device.
                </p>
              </div>
            </div>
          )}

          {/* 3. SENDER FINISHED -> RECIPIENT CAN VERIFY LATER ANYTIME */}
          {scenarioStep === 'SENDER_DONE_WAITING_RECEIVER' && (
            <div className="space-y-3.5 my-auto text-center">
              <div className="w-14 h-14 rounded-full bg-indigo-100 text-indigo-700 mx-auto flex items-center justify-center text-2xl shadow-inner animate-pulse">
                📲
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                  Pending Your Action (4-Hr Window)
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1.5">Incoming Transfer Held</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  {persona.name} verified her side. A wire of <strong className="text-slate-900">${persona.transferAmount.toLocaleString()}</strong> is waiting for your response.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 text-left text-xs space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Sender Status:</span>
                  <span className="text-emerald-700 font-bold">Verified ✓</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Hold Duration:</span>
                  <span className="font-mono font-bold text-indigo-700">Valid for 4 hours</span>
                </div>
                <p className="text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                  Recipient can finish verification whenever free.
                </p>
              </div>

              {/* Live Soundwave Visualizer */}
              <div className="bg-slate-900/90 rounded-2xl p-1.5 border border-slate-800 shadow-inner">
                <div className="flex items-center justify-between px-2 text-[9px] font-mono text-indigo-400">
                  <span>PAYEE ACOUSTIC CHANNEL</span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
                    Ready
                  </span>
                </div>
                <SoundwaveCanvas isActive={true} height={26} />
              </div>

              <button
                onClick={verifyRecipientLater}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>🎙️</span>
                <span>I'm Free Now &rarr; Speak 3 Words to Accept</span>
              </button>
            </div>
          )}

          {/* 4. REVIEW DECISION (BOTH SIDES COMPLETED) */}
          {scenarioStep === 'REVIEW_DECISION' && (
            <div className="space-y-3 my-auto">
              <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-center">
                <span className="text-[11px] font-bold text-emerald-800 block">
                  ✓ Recipient Voice Authenticated
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Incoming Transfer Status</span>
                <div className="flex justify-between">
                  <span className="text-slate-500">From Sender:</span>
                  <span className="font-bold text-slate-900">{persona.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount:</span>
                  <span className="font-mono font-bold text-slate-900">${persona.transferAmount.toLocaleString()}</span>
                </div>
                <div className="p-2 bg-slate-100 rounded-lg text-[10px] text-slate-600 leading-snug">
                  ⏳ <strong>Awaiting Sender Final Release:</strong> {persona.name} is reviewing counterparty details on her device.
                </div>
              </div>

              <button
                onClick={bothApproveTransfer}
                className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs cursor-pointer shadow-xs"
              >
                Recipient Acknowledges
              </button>
            </div>
          )}

          {/* 5. OUTCOME CANCELLED */}
          {scenarioStep === 'OUTCOME_CANCELLED' && (
            <div className="space-y-3.5 my-auto text-center">
              <div className="w-14 h-14 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center text-3xl shadow-xs">
                🛑
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                  Transfer Terminated
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-1.5">Cancelled by Sender</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  The sender suspected a scam and cancelled the transfer. No funds were released.
                </p>
              </div>
            </div>
          )}

          {/* 6. OUTCOME APPROVED */}
          {scenarioStep === 'OUTCOME_APPROVED' && (
            <div className="space-y-3.5 my-auto text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-3xl shadow-xs">
                💰
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Funds Received
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-1.5">+${persona.transferAmount.toLocaleString()}</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Payment cleared through banking settlement network.
                </p>
              </div>
            </div>
          )}

          {/* M1002 & M1004 Idle states */}
          {(scenarioStep === 'QUESTIONNAIRE' || scenarioStep === 'SCAM_WARNING' || scenarioStep === 'ATO_FREEZE' || scenarioStep === 'TRUSTED_DEVICE_ALERT') && (
            <div className="space-y-3.5 my-auto text-center py-8">
              <div className="w-12 h-12 rounded-full bg-slate-200 mx-auto flex items-center justify-center text-xl">
                🔒
              </div>
              <h4 className="text-xs font-bold text-slate-700">Security Gate Active</h4>
              <p className="text-[11px] text-slate-500">
                Evaluating risk and security policy on primary member device.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
