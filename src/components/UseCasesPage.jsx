import React from 'react'
import { PERSONAS } from '../data/personas.js'

export function UseCasesPage() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto py-2">
      {/* Page Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Member Personas (M1001–M1004)
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          How VoiceGuard Protects Every Member Journey
        </h2>
        <p className="text-sm text-slate-600 max-w-2xl leading-relaxed">
          From high-pressure phone impersonation to fake employment checks, legitimate home remodels, and account takeovers.
        </p>
      </div>

      {/* 4 Personas Bento Cards - Clean, Spacious, Uncrowded */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {PERSONAS.map((p) => (
          <div
            key={p.id}
            className="glass-panel p-6 sm:p-7 rounded-3xl space-y-5 hover:shadow-lg transition-all flex flex-col justify-between bg-white/80"
          >
            <div className="space-y-4">
              {/* Persona Top Info */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl shadow-xs">
                    {p.avatar}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-base text-slate-900">{p.name}</span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                        {p.id}
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">{p.role} &bull; Member since {p.memberSince}</span>
                  </div>
                </div>

                <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                  ${p.transferAmount.toLocaleString()} Wire
                </span>
              </div>

              {/* Threat Description */}
              <div className="space-y-1">
                <span className="text-[11px] uppercase font-bold text-rose-700 font-mono tracking-wide">
                  Threat Scenario
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {p.description}
                </p>
              </div>

              {/* Defense Outcome */}
              <div className="p-3.5 bg-teal-50/70 border border-teal-200/80 rounded-2xl space-y-1">
                <span className="text-[11px] uppercase font-bold text-teal-800 font-mono tracking-wide">
                  VoiceGuard Intervention
                </span>
                <p className="text-xs sm:text-sm text-teal-950 font-medium leading-relaxed">
                  {p.expectedOutcome}
                </p>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="flex justify-between items-center text-xs font-mono text-slate-400 pt-3 border-t border-slate-100">
              <span>Rail: {p.rail}</span>
              <span>90-Day Baseline: ${p.baselineAvg}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Authorized Scams vs Account Takeover Comparison */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-sm space-y-5 bg-white/80">
        <div>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Regulatory & Technical Comparison
          </span>
          <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 mt-2 tracking-tight">
            Authorized Push Payment (APP) vs. Account Takeover (ATO)
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Why traditional banking security is blind to authorized fraud.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm border-collapse">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-mono text-xs bg-slate-50/80">
                <th className="py-3 px-4 rounded-l-xl">Security Dimension</th>
                <th className="py-3 px-4">Authorized Push Scam (M1001, M1002)</th>
                <th className="py-3 px-4 rounded-r-xl">Account Takeover (M1004)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">Who executes the transfer?</td>
                <td className="py-3.5 px-4 text-rose-700 font-semibold">Legitimate member (coached by scammer)</td>
                <td className="py-3.5 px-4">Attacker using stolen credentials</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">Standard bank app security?</td>
                <td className="py-3.5 px-4 text-rose-700 font-semibold">❌ Completely Bypassed (FaceID passes)</td>
                <td className="py-3.5 px-4 text-amber-700">⚠️ Flagged only if IP/device changes</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">Regulation E Reimbursement?</td>
                <td className="py-3.5 px-4 text-rose-700 font-bold">❌ $0 REFUND (Member loses life savings)</td>
                <td className="py-3.5 px-4 text-emerald-700 font-semibold">✓ Mandatory bank reimbursement</td>
              </tr>
              <tr className="hover:bg-slate-50/60">
                <td className="py-3.5 px-4 font-semibold text-slate-900">VoiceGuard Defense</td>
                <td className="py-3.5 px-4 text-teal-900 font-bold bg-teal-50/80 rounded-xl">
                  Pre-settlement hold + 3-word vocal break forces reality awareness
                </td>
                <td className="py-3.5 px-4 text-indigo-900 font-bold bg-indigo-50/80 rounded-xl">
                  Attacker blocked; alert rerouted to member's trusted hardware phone
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
