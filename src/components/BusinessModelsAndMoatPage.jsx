import React, { useState } from 'react'

export function BusinessModelsAndMoatPage() {
  const [activeModel, setActiveModel] = useState('B2B')
  const [activeMoatTab, setActiveMoatTab] = useState('dual')

  const businessModels = {
    C2C: {
      title: 'Consumer-to-Consumer (C2C / P2P)',
      tagline: 'Peer-to-Peer Transfers, Family Emergency & Impersonation Scams',
      icon: '👥',
      color: 'from-amber-500/20 via-teal-500/10 to-emerald-500/20',
      badge: 'P2P / Zelle / FedNow',
      example: 'Eleanor Vance (M1001) wiring $8,500 to a scammer impersonating her grandson.',
      threat: 'Impersonation of family or romantic partners via stolen caller ID or AI voice clones.',
      howItWorks:
        'Sender initiates P2P payment. Funds held in Sound CU escrow. The intended recipient’s authenticated banking app receives an encrypted challenge. If the recipient does not exist or cannot verify, the money is returned to the sender.',
      value: 'Saves consumers from life-ruining elder fraud and romance scams.',
      parties: {
        initiator: 'Consumer (Sender)',
        responder: 'Peer / Family Recipient',
        holdWindow: 'Immediate or 4-Hour Asynch',
      },
      stats: {
        lossPrevented: '$8,500 avg',
        adoptionRail: 'Zelle / FedNow / Instant',
      },
    },
    B2C: {
      title: 'Business-to-Consumer (B2C)',
      tagline: 'Refunds, Loan Disbursements, Payroll & Insurance Payouts',
      icon: '🏢➡️👤',
      color: 'from-indigo-500/20 via-teal-500/10 to-blue-500/20',
      badge: 'Disbursements & Refunds',
      example: 'Marcus Chen (M1002) receiving a fake employer check and asked to wire funds back.',
      threat: 'Overpayment refund scams, fake loan approval deposits, and fraudulent merchant refunds.',
      howItWorks:
        'When a business or credit union issues high-risk funds, or a consumer processes an immediate return wire, VoiceGuard validates the corporate issuing key and prompts the consumer with a cognitive questionnaire before counter-wire settlement.',
      value: 'Stops check kiting and fake employer debt traps for younger members and students.',
      parties: {
        initiator: 'Business / Credit Union',
        responder: 'Consumer / Member',
        holdWindow: '24-Hour Settlement Buffer',
      },
      stats: {
        lossPrevented: '$1,800 avg',
        adoptionRail: 'ACH / Instant Credit',
      },
    },
    C2B: {
      title: 'Consumer-to-Business (C2B)',
      tagline: 'High-Value Merchant Payments, Contractor Remodels & Real Estate Escrow',
      icon: '👤➡️🏢',
      color: 'from-teal-500/20 via-emerald-500/10 to-cyan-500/20',
      badge: 'High-Value Wires',
      example: 'Sarah Jenkins (M1003) wiring $6,500 to a licensed general contractor for home remodel.',
      threat: 'Escrow wire diversion (fake title company emails) and rogue unverified contractor accounts.',
      howItWorks:
        'Sarah initiates the $6,500 wire. Sound Sentry holds funds in escrow and routes an in-app verification to the contractor’s registered business profile. Both complete verification in <45s. Verified WA State contractor license clears instantly.',
      value: 'Enables high-value commerce without false declines while stopping title/escrow wire interception.',
      parties: {
        initiator: 'Homeowner / Member',
        responder: 'Licensed Business / Title Escrow',
        holdWindow: '4-Hour Asynchronous Window',
      },
      stats: {
        lossPrevented: '$6,500 - $50,000+',
        adoptionRail: 'Fedwire / Same-Day ACH',
      },
    },
    B2B: {
      title: 'Business-to-Business (B2B)',
      tagline: 'Commercial Wires, Accounts Payable (AP) & Business Email Compromise (BEC)',
      icon: '🏢🔄🏢',
      color: 'from-purple-500/20 via-indigo-500/10 to-teal-500/20',
      badge: '#1 US Fraud Loss ($2.9B FBI)',
      example: 'Commercial credit union member Accounts Payable clerk paying a $45,000 vendor invoice.',
      threat: 'Business Email Compromise (BEC) / CEO Fraud: Scammers spoof CEO or vendor emails requesting urgent bank routing changes.',
      howItWorks:
        'The AP clerk enters the vendor payment in Sound CU business banking. Funds enter a 4-Hour Protective Vault Escrow. A dual-executive push challenge is routed to the authorized CFO / Controller’s secure banking device. The CFO speaks the 3 random words to attest invoice validity. Funds release only with dual corporate presence.',
      value: 'Completely eliminates CEO fraud and unauthorized vendor account routing changes without slowing legitimate business.',
      parties: {
        initiator: 'AP Specialist / Corporate Clerk',
        responder: 'CFO / Authorized Executive',
        holdWindow: '4-Hour Corporate Window',
      },
      stats: {
        lossPrevented: '$45,000 - $250,000+',
        adoptionRail: 'Fedwire Commercial / RTP',
      },
    },
  }

  const moats = [
    {
      id: 'dual',
      title: '1. Dual In-App Presence vs. Single-Sided Scoring',
      marketDoes:
        'Existing tools (BioCatch, LexisNexis, ThreatMetrix) only analyze the sender’s phone. If the victim is coached by a scammer, single-sided scoring passes completely.',
      voiceGuardDoes:
        'VoiceGuard binds BOTH parties. The scammer cannot produce the recipient side in Sound Credit Union, exposing the scam immediately.',
      badge: 'Industry First',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    },
    {
      id: 'vault',
      title: '2. Pre-Settlement In-Vault Escrow vs. Post-Fraud Triage',
      marketDoes:
        'Traditional banks allow wires to settle instantly over Fedwire or FedNow, then file a fraud report after the money is already laundered through crypto (recovery rate <3%).',
      voiceGuardDoes:
        'VoiceGuard halts funds inside Sound Credit Union’s internal vault BEFORE contacting payment rails. Recovery rate is 100% because money never left.',
      badge: 'Zero Float Loss',
      badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    },
    {
      id: 'watermark',
      title: '3. DeepMark Ultrasonic Attestation vs. Fragile "AI Voice Filters"',
      marketDoes:
        'Existing vendors try to detect deepfakes using software ML models, which fail against 2026 generative AI audio models.',
      voiceGuardDoes:
        'VoiceGuard proves physical acoustic presence using inaudible 18.5kHz ultrasonic sound loops between phone speaker and microphone, defeating virtual audio drivers.',
      badge: 'Patent-Grade Moat',
      badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-300',
    },
    {
      id: 'privacy',
      title: '4. Zero-Audio Ephemeral RAM vs. Biometric Voiceprint Liability',
      marketDoes:
        'Voice biometric providers (Nuance, Pindrop) enroll and store permanent voice templates on servers, creating massive BIPA and WA RCW 19.375 legal liabilities.',
      voiceGuardDoes:
        'Zero voice recordings, zero audio files, and zero biometric templates. Audio is processed in RAM (<500ms) and wiped clean. 100% private and liability-free.',
      badge: 'Zero Legal Risk',
      badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    },
  ]

  const current = businessModels[activeModel]

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl shadow-lg shadow-slate-200/50 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Market Fit & Ecosystem Expansion
          </span>
          <span className="text-xs font-mono text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-xs">
            C2C &bull; B2C &bull; C2B &bull; B2B
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
          How VoiceGuard Scales Across Every Business Model
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
          While consumer P2P scams make headlines, over $2.9 Billion is lost annually to corporate wire fraud. Discover how VoiceGuard adapts seamlessly across consumer and commercial banking.
        </p>
      </div>

      {/* Interactive Business Model Selector Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {Object.entries(businessModels).map(([key, model]) => {
          const isSelected = activeModel === key
          return (
            <button
              key={key}
              onClick={() => setActiveModel(key)}
              className={`p-4 rounded-3xl text-left transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-white to-teal-50/70 border-2 border-teal-600 shadow-md shadow-teal-900/10 scale-[1.02]'
                  : 'glass-panel hover:bg-white text-slate-600'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{model.icon}</span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {key}
                  </span>
                </div>
                <div className="font-extrabold text-xs text-slate-900">{model.title}</div>
                <div className="text-[10px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                  {model.badge}
                </div>
              </div>

              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] font-mono">
                <span className="text-slate-400">Target Rail</span>
                <span className="font-bold text-teal-700">{model.stats.adoptionRail.split(' ')[0]}</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Active Model Deep-Dive Bento Card */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl shadow-lg shadow-slate-200/50 space-y-5 animate-float transition-all">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-500 to-emerald-700 flex items-center justify-center text-2xl text-white shadow-md">
              {current.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-teal-100 text-teal-900 border border-teal-200">
                  {activeModel} ARCHITECTURE
                </span>
                <span className="text-xs font-mono text-slate-400">{current.badge}</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight mt-0.5">
                {current.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-slate-400">Potential Saved:</span>
            <span className="font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              {current.stats.lossPrevented}
            </span>
          </div>
        </div>

        {/* 3-Column Visual Flow for Active Business Model */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-rose-700 block">
              The Real-World Threat
            </span>
            <p className="text-slate-800 font-semibold leading-snug">{current.threat}</p>
            <div className="pt-2 border-t border-rose-200/60 text-[11px] text-slate-600">
              <strong className="text-rose-900">Example:</strong> {current.example}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80 space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase text-teal-800 block">
              How VoiceGuard Intervenes
            </span>
            <p className="text-slate-800 font-medium leading-relaxed">{current.howItWorks}</p>
            <div className="pt-2 border-t border-teal-200/60 text-[11px] text-teal-900 font-semibold">
              <span>Hold Window: {current.parties.holdWindow}</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/80 space-y-2 flex flex-col justify-between">
            <div>
              <span className="text-[10px] font-mono font-bold uppercase text-indigo-800 block">
                Parties Authenticated
              </span>
              <div className="space-y-1.5 mt-2">
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Initiator:</span>
                  <span className="font-bold text-slate-800">{current.parties.initiator}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Responder:</span>
                  <span className="font-bold text-slate-800">{current.parties.responder}</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-white rounded-xl border border-indigo-200 text-[11px] text-indigo-900 font-bold">
              {current.value}
            </div>
          </div>
        </div>
      </div>

      {/* MARKET MOAT: What We Provide That The Market Does NOT */}
      <div className="glass-panel p-6 sm:p-7 rounded-3xl shadow-lg shadow-slate-200/50 space-y-4">
        <div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Competitive Differentiation
          </span>
          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight mt-1">
            Why VoiceGuard? What the Market Is Missing
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            How VoiceGuard disrupts legacy fraud software that only looks at one side of the payment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {moats.map((m) => (
            <div
              key={m.id}
              className="p-5 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-slate-900">{m.title}</h4>
                  <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${m.badgeColor}`}>
                    {m.badge}
                  </span>
                </div>

                <div className="p-3 bg-rose-50/60 rounded-xl border border-rose-100 text-xs text-slate-700 space-y-1">
                  <span className="text-rose-800 font-bold text-[10px] uppercase font-mono block">
                    What The Market Has Today:
                  </span>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{m.marketDoes}</p>
                </div>

                <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-100 text-xs text-slate-800 space-y-1">
                  <span className="text-emerald-800 font-bold text-[10px] uppercase font-mono block">
                    What VoiceGuard Uniquely Delivers:
                  </span>
                  <p className="text-[11px] text-emerald-950 font-semibold leading-relaxed">{m.voiceGuardDoes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
