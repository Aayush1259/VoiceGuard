import React from 'react'
import { Header } from './components/Header.jsx'
import { DualPhoneController } from './components/DualPhoneController.jsx'
import { TransactionChecksPipeline } from './components/TransactionChecksPipeline.jsx'
import { SenderPhone } from './components/SenderPhone.jsx'
import { RecipientPhone } from './components/RecipientPhone.jsx'
import { PreSettlementChecksPage } from './components/PreSettlementChecksPage.jsx'
import { BusinessModelsAndMoatPage } from './components/BusinessModelsAndMoatPage.jsx'
import { UseCasesPage } from './components/UseCasesPage.jsx'
import { PrivacyRegulationsPage } from './components/PrivacyRegulationsPage.jsx'
import { Footer } from './components/Footer.jsx'
import { useVoiceGuardStore } from './store/useVoiceGuardStore.js'

export function App() {
  const { activeTab } = useVoiceGuardStore()

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 flex flex-col font-sans antialiased">
      <Header />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-6">
        {/* TAB 1: LIVE INTERACTIVE PHONE DEMO */}
        {activeTab === 'demo' && (
          <div className="space-y-6">
            <DualPhoneController />

            {/* LIVE IN-BETWEEN CHECKS PIPELINE */}
            <TransactionChecksPipeline />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start justify-items-center">
              {/* Left: Sender Phone */}
              <div className="w-full flex flex-col items-center">
                <div className="text-center mb-2.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                    Step 1: Sender Device (Sound CU App)
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">Verifies NOW &bull; Can cancel anytime &bull; Funds safe in vault</p>
                </div>
                <SenderPhone />
              </div>

              {/* Right: Recipient Phone */}
              <div className="w-full flex flex-col items-center">
                <div className="text-center mb-2.5">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
                    Step 2: Recipient Device (Payee Side)
                  </span>
                  <p className="text-[11px] text-slate-500 mt-1">Receives push &bull; Can verify LATER (4-hour hold window)</p>
                </div>
                <RecipientPhone />
              </div>
            </div>

            {/* Sleek 3-Pillar Summary Strip (Clean & Uncrowded) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
              <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 flex items-center justify-center text-xl shrink-0">
                  🧠
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Coercion Defense</div>
                  <div className="text-[11px] text-slate-500">Breaks phone scam compliance trances</div>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200/80 flex items-center justify-center text-xl shrink-0">
                  ⚖️
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Vault Escrow Hold</div>
                  <div className="text-[11px] text-slate-500">Protects funds before irreversible wire settlement</div>
                </div>
              </div>

              <div className="glass-panel p-4 rounded-2xl flex items-center gap-3 shadow-xs">
                <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200/80 flex items-center justify-center text-xl shrink-0">
                  🎙️
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">DeepMark Attestation</div>
                  <div className="text-[11px] text-slate-500">Ultrasonic loopback defeats AI voice deepfakes</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: THE 4 PRE-SETTLEMENT CHECKS */}
        {activeTab === 'checks' && <PreSettlementChecksPage />}

        {/* TAB 3: BUSINESS MODELS & MARKET MOAT */}
        {activeTab === 'business' && <BusinessModelsAndMoatPage />}

        {/* TAB 4: USE CASES & PERSONAS */}
        {activeTab === 'usecases' && <UseCasesPage />}

        {/* TAB 5: PRIVACY, LEGAL & US REGULATIONS */}
        {activeTab === 'privacy' && <PrivacyRegulationsPage />}
      </main>

      <Footer />
    </div>
  )
}
