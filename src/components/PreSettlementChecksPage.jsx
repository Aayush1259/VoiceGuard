import React from 'react'

export function PreSettlementChecksPage() {
  const checks = [
    {
      num: '01',
      title: 'Sentry Behavioral Scoring',
      timing: '<15ms Pre-Auth',
      headline: 'Vault Hold Engaged Before Core Settlement',
      icon: '⚡',
      badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      stat: '47x Velocity Spike',
      statSub: 'Detected on account wire history',
      chips: [
        'Payee Novelty: Destination account under 48 hours old',
        'Coercion Pattern: High round amount ($8,500)',
        'Settlement Status: Vault escrow lock engaged',
      ],
      takeaway: 'Payment is held in Sound Credit Union vault before funds touch Fedwire or FedNow.',
    },
    {
      num: '02',
      title: 'In-App Spoken Challenge',
      timing: '60s Single-Use Nonce',
      headline: 'Fresh 3-Word Random Phonetic Verification',
      icon: '🎙️',
      badgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
      stat: '3 Random Words',
      statSub: 'harbor • violet • seven',
      chips: [
        'Disrupts Phone Call: Forces scammer line to mute',
        'System 2 Switch: Wakes conscious critical thinking',
        'Burned Nonce: Single-use token expires in 60s',
      ],
      takeaway: 'Replaces easily coached SMS codes with active speech that disrupts telephone scam trances.',
    },
    {
      num: '03',
      title: 'DeepMark Ultrasonic Watermark',
      timing: 'Physical Acoustic Loopback',
      headline: 'Defeats AI Voice Clones & Soundboards',
      icon: '🔒',
      badgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      stat: '18.5kHz Ultrasound',
      statSub: 'Physical room acoustic loop verified',
      chips: [
        'Hardware Attestation: Proves physical phone mic capture',
        'Anti-Injector: Rejects virtual soundboard audio drivers',
        'Zero Storage: Erased from RAM in under 500ms',
      ],
      takeaway: 'Mathematically proves live human vocal cords vibrated the physical microphone.',
    },
    {
      num: '04',
      title: 'Cognitive Reality Disclosure',
      timing: 'Pre-Release Interruption',
      headline: 'Unmissable Counterparty Transparency',
      icon: '🛑',
      badgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
      stat: '81% Cancel Rate',
      statSub: 'Victims cancel once the spell is broken',
      chips: [
        'True Destination: Displays out-of-state recipient LLC',
        'Anti-Safe-Vault: "Sound CU will never ask you to move funds"',
        '1-Tap Recall: Instant escrow cancellation with zero penalty',
      ],
      takeaway: 'Shatters the illusion of speaking with the bank. Member cancels and keeps their savings.',
    },
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Header Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Multi-Layer Defense Architecture
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          How VoiceGuard Stops Scams Before Money Moves
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          Traditional banks authenticate only the login. VoiceGuard introduces a 4-tier checkpoint that validates human intent, acoustic hardware reality, and counterparty truth.
        </p>
      </div>

      {/* The 4 Visual Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {checks.map((chk) => (
          <div
            key={chk.num}
            className="glass-panel p-6 sm:p-7 rounded-3xl space-y-5 hover:shadow-lg transition-all flex flex-col justify-between bg-white/80"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xl shadow-xs">
                    {chk.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase text-slate-400 block">
                      Check {chk.num}
                    </span>
                    <h3 className="font-extrabold text-base text-slate-900">{chk.title}</h3>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                  {chk.timing}
                </span>
              </div>

              {/* Stat Callout */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between">
                <div>
                  <div className="text-lg font-black text-slate-900 tracking-tight">{chk.stat}</div>
                  <div className="text-xs text-slate-500 font-medium">{chk.statSub}</div>
                </div>
                <span className={`text-[10px] font-bold font-mono px-2.5 py-1 rounded-full border ${chk.badgeColor}`}>
                  Active
                </span>
              </div>

              {/* Chips */}
              <div className="space-y-2 pt-1">
                {chk.chips.map((chip, cIdx) => (
                  <div key={cIdx} className="flex items-start gap-2.5 text-xs text-slate-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-600 mt-1.5 shrink-0"></span>
                    <span>{chip}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Takeaway */}
            <div className="pt-3 border-t border-slate-100 text-xs text-teal-900 font-medium bg-teal-50/70 p-3 rounded-2xl border border-teal-100">
              <span className="text-teal-800 font-bold block text-[10px] uppercase font-mono mb-0.5">Key Advantage:</span>
              {chk.takeaway}
            </div>
          </div>
        ))}
      </div>

      {/* Visual Asynchronous vs Synchronous Explainer */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-7 sm:p-8 rounded-3xl shadow-xl space-y-4">
        <div className="flex items-center gap-2.5 text-teal-400 font-bold text-base sm:text-lg">
          <span className="text-xl">⏳</span>
          <span>Do Both Users Have to Verify at the Exact Same Second?</span>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
          <strong>No. VoiceGuard is Asynchronous-First:</strong> The sender verifies immediately in 15 seconds. Funds enter an <strong>Asynchronous 4-Hour Protective Vault Hold</strong>. The recipient verifies when they are free. Funds remain 100% secure in Sound Credit Union until both sides verify.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2 text-xs">
          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
            <span className="font-bold text-teal-300 text-sm block">1. Sender Verifies Now</span>
            <p className="text-slate-400 leading-relaxed">Eleanor reads the 3 words and completes her side in 15 seconds.</p>
          </div>
          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
            <span className="font-bold text-amber-300 text-sm block">2. 4-Hour Vault Escrow</span>
            <p className="text-slate-400 leading-relaxed">Money stays safe in Sound CU vault; recipient has 4 hours to verify.</p>
          </div>
          <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-1">
            <span className="font-bold text-emerald-300 text-sm block">3. 1-Tap Cancellation</span>
            <p className="text-slate-400 leading-relaxed">Sender can cancel anytime with zero penalty if fraud is suspected.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
