import React, { useEffect, useState } from 'react'
import { useVoiceGuardStore } from '../store/useVoiceGuardStore.js'
import { PERSONAS_BY_ID } from '../data/personas.js'

export function SoundMobileApp() {
  const {
    currentPersonaId,
    mobileScreen,
    initiateTransfer,
    startCall,
    submitSpeechResult,
    simulateTimeout,
    cancelTransfer,
    approveTransfer,
    resetDemo,
    challengeWords,
    challengeTimeRemaining,
  } = useVoiceGuardStore()

  const persona = PERSONAS_BY_ID[currentPersonaId] || PERSONAS_BY_ID['M1001']
  const [timer, setTimer] = useState(45)

  useEffect(() => {
    let interval = null
    if (mobileScreen === 'CALL_ACTIVE') {
      setTimer(45)
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(interval)
            simulateTimeout()
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [mobileScreen])

  return (
    <div className="w-full max-w-[380px] mx-auto phone-case">
      <div className="phone-screen min-h-[640px]">
        {/* iOS / Mobile Status Bar */}
        <div className="pt-3 px-6 pb-2 flex items-center justify-between text-[11px] font-semibold text-slate-800 bg-white border-b border-slate-100">
          <span>9:41</span>
          <div className="w-20 h-4 bg-slate-900 rounded-full mx-auto -mt-1.5 flex items-center justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-800"></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span>5G</span>
            <div className="w-5 h-2.5 border border-slate-700 rounded-sm p-0.5 flex items-center">
              <div className="w-full h-full bg-slate-800 rounded-2xs"></div>
            </div>
          </div>
        </div>

        {/* Sound Credit Union App Bar */}
        <div className="px-5 py-3 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-600 flex items-center justify-center text-white font-bold text-xs shadow-sm">
              S
            </div>
            <div>
              <span className="font-bold text-xs text-slate-900 block leading-none">Sound CU</span>
              <span className="text-[10px] text-slate-400">Mobile Banking</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-slate-100 px-2 py-1 rounded-full text-xs text-slate-700 font-medium">
            <span>{persona.avatar}</span>
            <span className="text-[11px]">{persona.name.split(' ')[0]}</span>
          </div>
        </div>

        {/* Dynamic Screen Content */}
        <div className="flex-1 p-5 flex flex-col justify-between bg-slate-50">
          {/* SCREEN 1: Send Money Form */}
          {mobileScreen === 'TRANSFER_FORM' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-slate-900">Send Wire Transfer</h2>
                <span className="text-[10px] font-mono bg-teal-50 text-teal-700 px-2 py-0.5 rounded border border-teal-200">
                  Step 1 of 2
                </span>
              </div>

              {/* From Account Card */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">From Account</span>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-semibold text-slate-800">Sound Checking (..4821)</span>
                  <span className="text-xs font-mono font-bold text-slate-900">$14,250.00</span>
                </div>
              </div>

              {/* To Recipient */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Recipient</span>
                <div className="text-xs font-semibold text-slate-800">{persona.recipient}</div>
                <span className="inline-block text-[10px] text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded font-medium">
                  First-time recipient
                </span>
              </div>

              {/* Amount */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-center">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Transfer Amount</span>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  ${persona.transferAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
                <span className="text-[10px] text-slate-400 block mt-1">{persona.rail}</span>
              </div>

              <button
                onClick={initiateTransfer}
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
              >
                Continue Transfer &rarr;
              </button>
            </div>
          )}

          {/* SCREEN 2: Protective Hold Triggered */}
          {mobileScreen === 'HOLD_ALERT' && (
            <div className="space-y-4 my-auto">
              <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 mx-auto flex items-center justify-center text-2xl">
                🛡️
              </div>
              <div className="text-center space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Protective Hold Engaged
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  Sound Sentry Protected Your Funds
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed max-w-xs mx-auto">
                  This transfer of <strong className="text-slate-900">${persona.transferAmount.toLocaleString()}</strong> to a new recipient triggered an elevated scam pattern alert.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5">
                <div className="flex items-center gap-2 text-slate-900 font-semibold">
                  <span>🔒</span>
                  <span>VoiceGuard Verification Required</span>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal">
                  To ensure you are not being impersonated or coached by a phone scammer, please complete a 20-second in-app audio challenge.
                </p>
              </div>

              <button
                onClick={startCall}
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors shadow-sm cursor-pointer"
              >
                Join VoiceGuard Verification Call &rarr;
              </button>

              <button
                onClick={cancelTransfer}
                className="w-full py-2.5 text-xs font-medium text-slate-500 hover:text-slate-800"
              >
                Cancel Transfer Now
              </button>
            </div>
          )}

          {/* SCREEN 3: Active Verification Call */}
          {mobileScreen === 'CALL_ACTIVE' && (
            <div className="space-y-4 my-auto text-center">
              <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 mx-auto flex items-center justify-center text-2xl shadow-inner">
                📞
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 block">VoiceGuard Security Agent</span>
                <span className="text-[11px] text-teal-600 font-medium">Encrypted In-App Call Active</span>
              </div>

              {/* Sound wave visualizer */}
              <div className="flex items-center justify-center gap-1.5 h-10 py-2">
                <div className="w-1.5 bg-teal-500 rounded-full wave-bar"></div>
                <div className="w-1.5 bg-teal-500 rounded-full wave-bar"></div>
                <div className="w-1.5 bg-teal-600 rounded-full wave-bar"></div>
                <div className="w-1.5 bg-teal-500 rounded-full wave-bar"></div>
                <div className="w-1.5 bg-teal-500 rounded-full wave-bar"></div>
              </div>

              {/* 3-Word Spoken Challenge */}
              <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Please Repeat These 3 Random Words
                </span>
                <div className="flex justify-center gap-2 font-mono text-sm font-black text-slate-900">
                  <span className="px-2 py-1 bg-slate-100 rounded border border-slate-200">harbor</span>
                  <span className="px-2 py-1 bg-slate-100 rounded border border-slate-200">violet</span>
                  <span className="px-2 py-1 bg-slate-100 rounded border border-slate-200">seven</span>
                </div>
                <div className="text-[10px] font-mono text-amber-700 font-semibold">
                  ⏱️ Challenge expires in {timer}s
                </div>
              </div>

              {/* Interactive Simulation Controls */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => submitSpeechResult(true)}
                  className="w-full py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>✓</span>
                  <span>Speak Correct Words (Pass)</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => submitSpeechResult(false)}
                    className="py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium text-[11px] cursor-pointer"
                  >
                    Speak Wrong Words
                  </button>
                  <button
                    onClick={simulateTimeout}
                    className="py-2 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium text-[11px] cursor-pointer"
                  >
                    Simulate Timeout
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SCREEN 4: Review Decision & Counterparty Check */}
          {mobileScreen === 'REVIEW_DECISION' && (
            <div className="space-y-4 my-auto">
              <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl text-center space-y-0.5">
                <span className="text-xs font-bold text-emerald-800 block">
                  ✓ Voice Verified & DeepMark Watermark Valid
                </span>
                <span className="text-[10px] text-emerald-700">Audio path authenticated to this device</span>
              </div>

              {/* Counterparty Reality Check */}
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Final Review</span>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Recipient:</span>
                  <span className="font-bold text-slate-900">{persona.recipient}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Amount:</span>
                  <span className="font-mono font-bold text-slate-900">
                    ${persona.transferAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-lg text-[11px] text-rose-800 leading-snug">
                  <strong>⚠️ Scammer Warning:</strong> Sound Credit Union staff will <em>never</em> call and ask you to transfer funds to a "safe vault" or escrow account.
                </div>
              </div>

              {/* Two clear choices */}
              <div className="space-y-2">
                <button
                  onClick={cancelTransfer}
                  className="w-full py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <span>🛑</span>
                  <span>I Suspect a Scam — Cancel Transfer</span>
                </button>
                <button
                  onClick={approveTransfer}
                  className="w-full py-2.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs cursor-pointer"
                >
                  Confirm & Release Funds
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 5: Scam Blocked (Emotional Peak) */}
          {mobileScreen === 'OUTCOME_CANCELLED' && (
            <div className="space-y-4 my-auto text-center">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-3xl shadow-xs">
                🛡️
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Scam Intercepted
                </span>
                <h3 className="text-lg font-black text-slate-900 mt-2">
                  Money Kept Safe!
                </h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto leading-relaxed">
                  <strong className="text-slate-900 font-bold">${persona.transferAmount.toLocaleString()}</strong> was never released. Your funds remain safely deposited in your Sound Checking account.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 text-left text-xs space-y-1">
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Action Taken:</span>
                  <span className="font-semibold text-emerald-600">Transfer Cancelled</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Incident Logged:</span>
                  <span className="font-mono text-slate-700">Sound Fraud Registry</span>
                </div>
              </div>

              <button
                onClick={resetDemo}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer"
              >
                Restart Demo Flow
              </button>
            </div>
          )}

          {/* SCREEN 6: Transfer Approved (Legitimate Look-Alike) */}
          {mobileScreen === 'OUTCOME_APPROVED' && (
            <div className="space-y-4 my-auto text-center">
              <div className="w-16 h-16 rounded-full bg-teal-100 text-teal-700 mx-auto flex items-center justify-center text-3xl shadow-xs">
                ✓
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  Transfer Released
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">
                  Payment Successfully Cleared
                </h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  ${persona.transferAmount.toLocaleString()} verified and released to the banking settlement network.
                </p>
              </div>

              <button
                onClick={resetDemo}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer"
              >
                Back to Transfer
              </button>
            </div>
          )}

          {/* SCREEN 7: Expired / Timed Out */}
          {mobileScreen === 'OUTCOME_EXPIRED' && (
            <div className="space-y-4 my-auto text-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 text-amber-700 mx-auto flex items-center justify-center text-3xl shadow-xs">
                ⏱️
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                  Verification Timed Out
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-2">
                  Payment Remains on Hold
                </h3>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  Challenge words were not repeated correctly within 45 seconds. Funds are held safely at Sound CU.
                </p>
              </div>

              <button
                onClick={resetDemo}
                className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs cursor-pointer"
              >
                Retry Verification
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
