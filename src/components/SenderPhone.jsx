import React from 'react'
import { useVoiceGuardStore, CHALLENGE_WORDS, VISUAL_WORD_OPTIONS } from '../store/useVoiceGuardStore.js'
import { PERSONAS_BY_ID } from '../data/personas.js'

export function SenderPhone() {
  const {
    currentPersonaId,
    scenarioStep,
    triggerTransfer,
    verifySenderNow,
    verifyRecipientLater,
    senderCancelScam,
    bothApproveTransfer,
    resetDemo,
    isAccessibilityMode,
    enableAccessibilityMode,
    tapVisualWord,
    selectedVisualWords,
    answerJobQuestion,
    triggerTrustedDeviceAlert,
    lockCompromisedAccount,
  } = useVoiceGuardStore()

  const persona = PERSONAS_BY_ID[currentPersonaId] || PERSONAS_BY_ID['M1001']

  return (
    <div className={`w-full max-w-[340px] phone-case ${scenarioStep === 'SENDER_VERIFYING' ? 'animate-ringing' : ''}`}>
      <div className="phone-screen">
        {/* Status Bar */}
        <div className="pt-2.5 px-5 pb-1.5 flex items-center justify-between text-[11px] font-semibold text-slate-800 bg-white border-b border-slate-100">
          <span>9:41</span>
          <div className="w-16 h-3.5 bg-slate-900 rounded-full mx-auto -mt-1 flex items-center justify-center">
            <span className="w-2 h-2 rounded-full bg-slate-800"></span>
          </div>
          <div className="flex items-center gap-1 text-[10px]">
            <span>5G</span>
            <span>100%</span>
          </div>
        </div>

        {/* Sender App Bar */}
        <div className="px-4 py-2.5 bg-white border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-teal-700 flex items-center justify-center text-white font-bold text-xs">
              S
            </div>
            <div>
              <span className="font-bold text-xs text-slate-900 block leading-tight">Sound CU</span>
              <span className="text-[9px] text-slate-400">Sender (Eleanor Vance)</span>
            </div>
          </div>
          <div className="flex items-center gap-1 bg-slate-100 px-2 py-0.5 rounded-full text-[11px] text-slate-700 font-medium">
            <span>{persona.avatar}</span>
            <span>{persona.name.split(' ')[0]}</span>
          </div>
        </div>

        {/* Dynamic Screen Content */}
        <div className="flex-1 p-4 flex flex-col justify-between bg-slate-50 relative overflow-hidden">
          {/* 1. TRANSFER FORM */}
          {scenarioStep === 'TRANSFER_FORM' && (
            <div className="space-y-3.5 my-auto">
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                  {persona.rail}
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1">Review & Send</h3>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">From Account</span>
                <div className="flex justify-between font-medium text-slate-800">
                  <span>Sound Checking (..4821)</span>
                  <span className="font-mono font-bold">$14,250.00</span>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-0.5">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Recipient</span>
                <div className="font-semibold text-slate-900 truncate">{persona.recipient}</div>
                <span className="text-[10px] text-amber-700 font-medium">First-time recipient</span>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Transfer Amount</span>
                <div className="text-2xl font-black font-mono text-slate-900 mt-0.5">
                  ${persona.transferAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </div>
              </div>

              <button
                onClick={triggerTransfer}
                className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs transition-colors shadow-sm cursor-pointer"
              >
                Send Wire &rarr;
              </button>
            </div>
          )}

          {/* 2. SENDER VERIFYING RIGHT NOW */}
          {scenarioStep === 'SENDER_VERIFYING' && (
            <div className="space-y-3.5 my-auto text-center">
              {!isAccessibilityMode ? (
                <>
                  <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 mx-auto flex items-center justify-center text-xl shadow-inner">
                    🎙️
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider font-bold text-teal-700 block">
                      Sender Verification
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 mt-0.5">Verify Your Side Right Now</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Confirming your active human presence with a fresh challenge.
                    </p>
                  </div>

                  {/* Wave visualizer */}
                  <div className="flex items-center justify-center gap-1 h-7">
                    <div className="w-1 bg-teal-500 rounded-full wave-bar"></div>
                    <div className="w-1 bg-teal-600 rounded-full wave-bar"></div>
                    <div className="w-1.5 bg-teal-700 rounded-full wave-bar"></div>
                    <div className="w-1 bg-teal-600 rounded-full wave-bar"></div>
                    <div className="w-1 bg-teal-500 rounded-full wave-bar"></div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 space-y-1">
                    <span className="text-[9px] uppercase font-bold text-slate-400 block">
                      Please Repeat These 3 Random Words:
                    </span>
                    <div className="flex justify-center gap-1.5 font-mono text-xs font-black text-slate-900">
                      {CHALLENGE_WORDS.sender.map((w) => (
                        <span key={w} className="px-2 py-0.5 bg-slate-100 rounded border border-slate-200">
                          {w}
                        </span>
                      ))}
                    </div>
                    <span className="text-[9px] font-mono text-teal-700 block">
                      ✓ DeepMark Mic Watermarking Active
                    </span>
                  </div>

                  <div className="space-y-2 pt-1">
                    <button
                      onClick={verifySenderNow}
                      className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>✓</span>
                      <span>Speak 3 Words & Complete Sender Check</span>
                    </button>
                    <button
                      onClick={enableAccessibilityMode}
                      className="w-full py-1 text-[11px] text-teal-700 hover:text-teal-900 font-medium underline flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>♿</span>
                      <span>Cannot speak or ill? Verify visually</span>
                    </button>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 mx-auto flex items-center justify-center text-lg">
                    ♿
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Accessible Visual Verification</span>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      Tap the 3 challenge words in order:
                    </p>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-left space-y-1.5">
                    <div className="grid grid-cols-3 gap-1.5 pt-1">
                      {VISUAL_WORD_OPTIONS.map((w) => {
                        const isSelected = selectedVisualWords.includes(w)
                        return (
                          <button
                            key={w}
                            onClick={() => tapVisualWord(w)}
                            className={`py-2 px-1 rounded-lg text-xs font-mono font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-teal-700 text-white shadow-xs'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                            }`}
                          >
                            {w}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 3. SENDER DONE -> WAITING ASYNCHRONOUSLY FOR RECIPIENT */}
          {scenarioStep === 'SENDER_DONE_WAITING_RECEIVER' && (
            <div className="space-y-3.5 my-auto text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center text-2xl shadow-inner">
                ✓
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Sender Check Complete
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1.5">Funds Held Safely in Vault</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  Your identity and voice are verified. <strong className="text-slate-900">${persona.transferAmount.toLocaleString()}</strong> is locked and cannot move until the recipient completes their verification.
                </p>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 text-left text-xs space-y-1">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Sender Status:</span>
                  <span className="text-emerald-700 font-bold">Authenticated ✓</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Recipient Status:</span>
                  <span className="text-amber-700 font-mono font-semibold">Pending Response (4-Hr Window)</span>
                </div>
                <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                  Recipient has been notified via In-App Push & SMS. They can finish whenever free.
                </p>
              </div>

              {/* Crucial: Sender can cancel at ANY time while waiting! */}
              <div className="pt-1 space-y-2">
                <button
                  onClick={senderCancelScam}
                  className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                >
                  <span>🛑</span>
                  <span>I Suspect a Scam — Cancel Transfer Now</span>
                </button>
                <button
                  onClick={verifyRecipientLater}
                  className="w-full py-2 rounded-xl bg-indigo-50 border border-indigo-200 hover:bg-indigo-100 text-indigo-800 font-semibold text-[11px] cursor-pointer"
                >
                  Simulate Recipient Free Now &rarr; Verify Recipient
                </button>
              </div>
            </div>
          )}

          {/* 4. REVIEW DECISION (BOTH SIDES COMPLETED) */}
          {scenarioStep === 'REVIEW_DECISION' && (
            <div className="space-y-3 my-auto">
              <div className="bg-emerald-50 border border-emerald-200 p-2 rounded-xl text-center">
                <span className="text-[11px] font-bold text-emerald-800 block">
                  ✓ Both Sides Verified via In-App Challenge
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs space-y-1.5">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Final Reality Check</span>
                <div className="flex justify-between">
                  <span className="text-slate-500">Payee:</span>
                  <span className="font-bold text-slate-900 truncate max-w-[140px]">{persona.recipient}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount:</span>
                  <span className="font-mono font-bold text-slate-900">${persona.transferAmount.toLocaleString()}</span>
                </div>

                {currentPersonaId === 'M1001' ? (
                  <div className="p-2 bg-rose-50 border border-rose-200 rounded-lg text-[10px] text-rose-800 leading-snug">
                    <strong>⚠️ Fraud Warning:</strong> Sound Credit Union staff will <em>never</em> ask you to move funds to a "safe vault".
                  </div>
                ) : (
                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-[10px] text-emerald-800 leading-snug">
                    <strong>✓ Verified Contractor:</strong> Pacific NW Builders LLC holds active WA License #PACIFNB812. No fraud complaints on file.
                  </div>
                )}
              </div>

              <div className="space-y-2">
                {currentPersonaId === 'M1001' ? (
                  <button
                    onClick={senderCancelScam}
                    className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <span>🛑</span>
                    <span>Cancel Transfer (Stop Scam)</span>
                  </button>
                ) : (
                  <button
                    onClick={bothApproveTransfer}
                    className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-sm cursor-pointer"
                  >
                    Approve & Release Funds
                  </button>
                )}
              </div>
            </div>
          )}

          {/* OUTCOME CANCELLED */}
          {scenarioStep === 'OUTCOME_CANCELLED' && (
            <div className="space-y-3.5 my-auto text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-3xl shadow-xs">
                🛡️
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Scam Intercepted
                </span>
                <h4 className="text-base font-black text-slate-900 mt-1.5">Funds Kept Safe!</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  <strong className="text-slate-900">${persona.transferAmount.toLocaleString()}</strong> was never released. Money is safe in Sound Checking.
                </p>
              </div>

              <button
                onClick={resetDemo}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer"
              >
                Restart Demo
              </button>
            </div>
          )}

          {/* OUTCOME APPROVED */}
          {scenarioStep === 'OUTCOME_APPROVED' && (
            <div className="space-y-3.5 my-auto text-center">
              <div className="w-14 h-14 rounded-full bg-teal-100 text-teal-700 mx-auto flex items-center justify-center text-3xl shadow-xs">
                ✓
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  Verified & Cleared
                </span>
                <h4 className="text-base font-bold text-slate-900 mt-1.5">Transfer Authorized</h4>
                <p className="text-xs text-slate-600 mt-1">
                  Legitimate transfer of ${persona.transferAmount.toLocaleString()} released smoothly.
                </p>
              </div>

              <button
                onClick={resetDemo}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer"
              >
                Restart Demo
              </button>
            </div>
          )}

          {/* M1002 & M1004 flows */}
          {scenarioStep === 'QUESTIONNAIRE' && (
            <div className="space-y-3.5 my-auto">
              <div className="text-center">
                <span className="text-[10px] uppercase font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200">
                  Sound Sentry Question
                </span>
                <h3 className="text-sm font-bold text-slate-900 mt-1">Transfer Purpose Check</h3>
              </div>
              <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2 text-xs">
                <span className="font-semibold text-slate-800 block">
                  Marcus, why are you sending this $1,800 today?
                </span>
                <div className="space-y-1.5">
                  <button
                    onClick={() => answerJobQuestion('supplies')}
                    className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 text-slate-700 transition-colors cursor-pointer"
                  >
                    💼 Remote employer sent me a check and asked me to buy home office equipment
                  </button>
                  <button
                    onClick={() => answerJobQuestion('personal')}
                    className="w-full text-left p-2.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 transition-colors cursor-pointer"
                  >
                    🤝 Personal payment to a friend
                  </button>
                </div>
              </div>
            </div>
          )}

          {scenarioStep === 'SCAM_WARNING' && (
            <div className="space-y-3.5 my-auto text-center">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center text-2xl shadow-inner">
                🛑
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                  Critical Fake Check Alert
                </span>
                <h4 className="text-sm font-black text-slate-900 mt-1">Do Not Send Money for Supplies!</h4>
                <p className="text-[11px] text-rose-800 bg-rose-50 p-2.5 rounded-xl border border-rose-200 leading-relaxed text-left mt-1">
                  <strong>How this scam works:</strong> The check you deposited is counterfeit and will bounce in 48 hours. If you send this $1,800, you will owe the bank the full balance!
                </p>
              </div>
              <div className="space-y-2 pt-1">
                <button
                  onClick={senderCancelScam}
                  className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-sm cursor-pointer"
                >
                  Cancel Transfer & Report Scam
                </button>
              </div>
            </div>
          )}

          {scenarioStep === 'ATO_FREEZE' && (
            <div className="space-y-3.5 my-auto text-center">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center text-2xl shadow-inner">
                🛑
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                  Red Tier Sentry Lockdown
                </span>
                <h4 className="text-sm font-black text-slate-900 mt-1">Takeover Pattern Detected</h4>
                <p className="text-[11px] text-slate-600 leading-relaxed max-w-xs mx-auto mt-1">
                  Transfer blocked from this unrecognized device. An emergency verification call is ringing David's registered primary phone.
                </p>
              </div>
              <button
                onClick={triggerTrustedDeviceAlert}
                className="w-full py-2.5 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs cursor-pointer mt-2"
              >
                Switch to David's Trusted Phone &rarr;
              </button>
            </div>
          )}

          {scenarioStep === 'TRUSTED_DEVICE_ALERT' && (
            <div className="space-y-3.5 my-auto text-center">
              <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-700 mx-auto flex items-center justify-center text-2xl shadow-inner animate-bounce">
                📱
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                  David's Primary Phone (At Home)
                </span>
                <h4 className="text-sm font-bold text-slate-900 mt-1">Did you attempt this transfer?</h4>
                <p className="text-[11px] text-slate-600 mt-1">
                  A wire of <strong className="text-slate-900">$9,200.00</strong> was attempted from an unrecognized IP following a password reset.
                </p>
              </div>
              <div className="space-y-2 pt-2">
                <button
                  onClick={lockCompromisedAccount}
                  className="w-full py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs cursor-pointer shadow-sm flex items-center justify-center gap-1.5"
                >
                  <span>🚨</span>
                  <span>NOT ME! Freeze My Account</span>
                </button>
              </div>
            </div>
          )}

          {scenarioStep === 'OUTCOME_LOCKED' && (
            <div className="space-y-3.5 my-auto text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center text-3xl shadow-xs">
                🛡️
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  Account Secured
                </span>
                <h4 className="text-base font-black text-slate-900 mt-1.5">Takeover Defeated!</h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Attacker expelled. Credentials invalidated. <strong className="text-slate-900">$9,200.00</strong> was retained safely in David's account.
                </p>
              </div>
              <button
                onClick={resetDemo}
                className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer"
              >
                Restart Demo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
