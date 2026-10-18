import React, { useState } from 'react'

export function Iso20022ZkSnarkPage() {
  const [activeSection, setActiveSection] = useState('iso') // 'iso' | 'zk'
  const [isoStep, setIsoStep] = useState(1) // 1 to 4
  const [isZkComputing, setIsZkComputing] = useState(false)
  const [zkVerified, setZkVerified] = useState(false)

  const isoSteps = [
    {
      num: 1,
      title: 'pacs.008 Initiation',
      badge: 'pacs.008.001.10',
      color: 'border-slate-300 text-slate-800',
      desc: 'Customer credit transfer order enters Sound Credit Union core gateway from mobile banking.',
    },
    {
      num: 2,
      title: 'VoiceGuard In-Vault Escrow',
      badge: 'ACTC / ESCROW_HOLD',
      color: 'border-amber-400 bg-amber-50 text-amber-900',
      desc: 'Sentry intercepts outbound message. Funds locked in vault; outbound Fedwire dispatch blocked.',
    },
    {
      num: 3,
      title: 'Scam Intercept: camt.056',
      badge: 'camt.056.001.09 (FRAD)',
      color: 'border-rose-400 bg-rose-50 text-rose-900',
      desc: 'Member cancels coerced wire. Automated recall message restores $8,500 to member balance sheet.',
    },
    {
      num: 4,
      title: 'Legitimate Release: pacs.002',
      badge: 'pacs.002.001.12 (ACCP)',
      color: 'border-emerald-400 bg-emerald-50 text-emerald-900',
      desc: 'Dual acoustic presence sealed. Payment released to Fedwire/FedNow with cryptographic receipt.',
    },
  ]

  const isoXmlPayloads = {
    1: `<!-- Step 1: Inbound pacs.008 (Payment Initiated) -->
<FIToFICstmrCdtTrf>
  <GrpHdr>
    <MsgId>SNDCU-2026-TX8921</MsgId>
    <CreDtTm>2026-10-18T07:14:02Z</CreDtTm>
    <NbOfTxs>1</NbOfTxs>
    <SttlmInf><SttlmMtd>CLRG</SttlmMtd></SttlmInf>
  </GrpHdr>
  <CdtTrfTxInf>
    <PmtId><EndToEndId>E2E-ELEANOR-8500</EndToEndId></PmtId>
    <IntrBkSttlmAmt Ccy="USD">8500.00</IntrBkSttlmAmt>
    <Dbtr><Nm>Eleanor Vance</Nm></Dbtr>
    <Cdtr><Nm>Federal Reserve Vault LLC</Nm></Cdtr>
  </CdtTrfTxInf>
</FIToFICstmrCdtTrf>`,
    2: `<!-- Step 2: VoiceGuard Sentry Injects Escrow Hold -->
<FIToFIPmtStsRpt>
  <GrpHdr><MsgId>VG-SENTRY-LOCK-01</MsgId></GrpHdr>
  <TxInfAndSts>
    <StsId>TX-8921-HOLD</StsId>
    <TxSts>ACTC</TxSts> <!-- Accepted Technical Validation -->
    <StsRsnInf>
      <Rsn><Prtry>VOICEGUARD_ESCROW_HOLD</Prtry></Rsn>
      <AddtlInf>47x Velocity Spike | Outbound Wire Suspended in Vault</AddtlInf>
    </StsRsnInf>
    <EscrowHoldExpires>2026-10-18T11:14:02Z</EscrowHoldExpires> <!-- 4-Hour Asynch Hold -->
  </TxInfAndSts>
</FIToFIPmtStsRpt>`,
    3: `<!-- Step 3: Scam Cancelled -> camt.056 Automated Recall -->
<FIToFIPmtCxlReq>
  <GrpHdr><MsgId>CAMT-056-CANCEL-001</MsgId></GrpHdr>
  <Undrlyg>
    <TxInf>
      <CxlId>CXL-8921-ELEANOR</CxlId>
      <OrgnlEndToEndId>E2E-ELEANOR-8500</OrgnlEndToEndId>
      <CxlRsnInf>
        <Rsn><Cd>FRAD</Cd></Rsn> <!-- Reason: Fraudulent Origin / APP Scam -->
        <AddtlInf>Member Cancelled Post Reality Disclosure. Funds Remain in Sound CU Vault.</AddtlInf>
      </CxlRsnInf>
    </TxInf>
  </Undrlyg>
</FIToFIPmtCxlReq>`,
    4: `<!-- Step 4: Verified Transfer -> pacs.002 Settlement Release -->
<FIToFIPmtStsRpt>
  <GrpHdr><MsgId>PACS-002-CLEAR-8921</MsgId></GrpHdr>
  <TxInfAndSts>
    <TxSts>ACCP</TxSts> <!-- Accepted Customer Profile Settlement -->
    <AttestationReceipt>
      <HmacSha256>e7f12a849b2c8e310023d8fa5b921...</HmacSha256>
      <DeepMarkToF_cm>13.8</DeepMarkToF_cm>
      <DualPresence>TRUE</DualPresence>
    </AttestationReceipt>
  </TxInfAndSts>
</FIToFIPmtStsRpt>`,
  }

  const handleRunZkProof = () => {
    setIsZkComputing(true)
    setZkVerified(false)
    setTimeout(() => {
      setIsZkComputing(false)
      setZkVerified(true)
    }, 1200)
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Page Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-700 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Core Protocol & Cryptography Architecture
          </span>
          <span className="text-xs font-mono text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200 shadow-xs">
            ISO 20022 &bull; ZK-SNARKs (Groth16)
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Institutional Settlement Rails & Zero-Knowledge Cryptography
        </h2>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          How VoiceGuard intercepts modern instant payment rails (FedNow, RTP, Fedwire) via standard ISO 20022 financial messages, and mathematically guarantees zero voiceprint exposure via client-side zk-SNARK proofs.
        </p>

        {/* Section Switcher */}
        <div className="flex flex-wrap items-center gap-2 pt-3">
          <button
            onClick={() => setActiveSection('iso')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSection === 'iso'
                ? 'bg-indigo-700 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <span>🏛️</span>
            <span>ISO 20022 Banking Rails (pacs.008 & camt.056)</span>
          </button>

          <button
            onClick={() => setActiveSection('zk')}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeSection === 'zk'
                ? 'bg-teal-700 text-white shadow-sm'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            <span>🔐</span>
            <span>ZK-SNARK Zero-Knowledge Mathematics</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: ISO 20022 BANKING RAIL FLOW */}
      {activeSection === 'iso' && (
        <div className="space-y-6 animate-float">
          {/* Stepper Card */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl shadow-sm space-y-4 bg-white/90">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Interactive ISO 20022 Financial Message Lifecycle
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click through the steps below to see how VoiceGuard halts wire messages at the core banking interface.
                </p>
              </div>
              <span className="text-xs font-mono text-indigo-700 font-bold bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200 shrink-0">
                Active Step {isoStep} of 4
              </span>
            </div>

            {/* Stepper Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
              {isoSteps.map((s) => {
                const isSelected = isoStep === s.num
                return (
                  <button
                    key={s.num}
                    onClick={() => setIsoStep(s.num)}
                    className={`p-3 rounded-2xl text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50/80 shadow-xs scale-[1.02]'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold mb-1">
                        <span className={isSelected ? 'text-indigo-800' : 'text-slate-400'}>
                          Step 0{s.num}
                        </span>
                        <span className="px-1.5 py-0.2 bg-white rounded border border-slate-200 text-slate-600">
                          {s.badge.split(' ')[0]}
                        </span>
                      </div>
                      <div className="font-bold text-xs text-slate-900 leading-snug">{s.title}</div>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-2 line-clamp-2 leading-relaxed">
                      {s.desc}
                    </p>
                  </button>
                )
              })}
            </div>

            {/* Interactive XML Message Payload Viewer */}
            <div className="bg-slate-950 text-slate-200 p-4 sm:p-5 rounded-2xl font-mono text-xs overflow-x-auto space-y-2 border border-slate-800 shadow-inner">
              <div className="flex items-center justify-between text-[11px] text-slate-400 pb-2 border-b border-slate-800">
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span>ISO 20022 XML Message Inspector</span>
                </span>
                <span className="text-teal-400 font-bold">{isoSteps[isoStep - 1].badge}</span>
              </div>
              <pre className="text-[11px] text-emerald-300 leading-relaxed overflow-x-auto py-1">
                {isoXmlPayloads[isoStep]}
              </pre>
            </div>
          </div>

          {/* Core Banking Rail Guarantees */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-panel p-5 rounded-2xl space-y-2 bg-white/90">
              <span className="text-xl">⚡</span>
              <h4 className="font-bold text-sm text-slate-900">FedNow & RTP Instant Escrow</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Rather than blind settlement in 3 seconds, high-risk wires are flagged with <code>ACTC</code> technical escrow locks before settlement rails debit the credit union account.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl space-y-2 bg-white/90">
              <span className="text-xl">🛑</span>
              <h4 className="font-bold text-sm text-slate-900">Automated camt.056 Recall</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                When Eleanor Vance cancels her coerced transfer, VoiceGuard auto-generates a <code>camt.056</code> message, halting settlement before Fedwire cutoff with 100% fund recovery.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl space-y-2 bg-white/90">
              <span className="text-xl">📜</span>
              <h4 className="font-bold text-sm text-slate-900">UCC 4A Audit Signature</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Releases include an immutable HMAC signature in the <code>pacs.002</code> payload, satisfying UCC Article 4A commercially reasonable security requirements.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 2: ZK-SNARK MATHEMATICS */}
      {activeSection === 'zk' && (
        <div className="space-y-6 animate-float">
          {/* ZK Mathematical Principle Card */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl shadow-sm space-y-5 bg-white/90">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                Zero-Knowledge Proof (Groth16 / BN254)
              </span>
              <h3 className="font-extrabold text-lg sm:text-xl text-slate-900 mt-2">
                How zk-SNARKs Prove Speech Without Sending Any Voice Data
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Under <strong>Washington State RCW 19.375</strong> and <strong>BIPA</strong>, transmitting or storing biometric voiceprints creates multi-million dollar class-action liabilities. VoiceGuard solves this mathematically:
              </p>
            </div>

            {/* Formula Block */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl space-y-3 font-mono text-xs border border-slate-800">
              <div className="text-slate-400 text-[11px] pb-1 border-b border-slate-800 flex justify-between">
                <span>MATHEMATICAL CIRCUIT VERIFICATION</span>
                <span className="text-teal-400">Curve: BN254 / Pairing-Friendly</span>
              </div>
              <div className="space-y-1.5 text-xs text-slate-200">
                <p>
                  <strong className="text-teal-400">Public Statement x:</strong>{' '}
                  <code>x = SHA256(SessionNonce || ChallengeWords || Timestamp)</code>
                </p>
                <p>
                  <strong className="text-amber-400">Private Witness w:</strong>{' '}
                  <code>w = &#123; PhonemeAudioVector, UltrasonicChirpFSK, DeviceEnclaveSecret &#125;</code>
                </p>
                <p>
                  <strong className="text-indigo-400">Proof Generation:</strong>{' '}
                  <code>&pi; = (A &isin; &Gopf;1, B &isin; &Gopf;2, C &isin; &Gopf;1) &approx; 128 Bytes</code>
                </p>
                <p>
                  <strong className="text-emerald-400">Pairing Equation:</strong>{' '}
                  <code>e(A, B) = e(&alpha;, &beta;) &sdot; e(x&gamma;, &delta;) &sdot; e(C, &epsilon;)</code>
                </p>
              </div>
            </div>

            {/* Interactive Client-Side ZK Proof Simulator */}
            <div className="p-5 bg-teal-50/70 border border-teal-200 rounded-2xl space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="font-bold text-sm text-teal-950">
                    Live On-Device ZK-SNARK Simulator
                  </h4>
                  <p className="text-xs text-teal-800">
                    Test the client-side cryptographic proof generation and instant ledger verification.
                  </p>
                </div>

                <button
                  onClick={handleRunZkProof}
                  disabled={isZkComputing}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer shrink-0 ${
                    isZkComputing
                      ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                      : 'bg-teal-700 hover:bg-teal-800 text-white'
                  }`}
                >
                  {isZkComputing ? '⚡ Computing Circom Circuit...' : '⚡ Generate & Verify Proof'}
                </button>
              </div>

              {zkVerified && (
                <div className="bg-white p-3.5 rounded-xl border border-teal-300 text-xs space-y-2 animate-push-slide">
                  <div className="flex items-center justify-between text-emerald-800 font-bold">
                    <span>✓ ZK-SNARK Proof Verified in 1.4ms!</span>
                    <span className="font-mono text-[10px] bg-emerald-100 px-2 py-0.5 rounded">
                      Payload: 128 Bytes
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-sans">
                    <strong>Zero Voice Data Exposed:</strong> The Sound Credit Union ledger verified mathematical proof of speech match and ultrasonic room loopback. No microphone recording or voiceprint was transmitted across the network.
                  </p>
                  <div className="bg-slate-900 text-emerald-400 font-mono text-[10px] p-2 rounded overflow-x-auto">
                    Proof: 0x4f89b2...e301 | PublicInputs: ["0x7b52...0554"] | Pairing: TRUE
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 3 Pillars of ZK Privacy */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-panel p-5 rounded-2xl space-y-2 bg-white/90">
              <span className="text-xl">🔏</span>
              <h4 className="font-bold text-sm text-slate-900">Zero Biometric Storage</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Zero audio vectors are enrolled or retained. Sound CU maintains mathematical immunity under Illinois BIPA and Washington RCW 19.375.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl space-y-2 bg-white/90">
              <span className="text-xl">📱</span>
              <h4 className="font-bold text-sm text-slate-900">On-Device Edge Prover</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Proof computation executes directly on the smartphone (Apple Neural Engine / WebAssembly) in &lt;1.2 seconds without GPU cloud costs.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl space-y-2 bg-white/90">
              <span className="text-xl">🏛️</span>
              <h4 className="font-bold text-sm text-slate-900">Instant Ledger Verification</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sound Credit Union's ledger verifies the 128-byte proof in under 2 milliseconds, enabling instant wire clearance with zero float drag.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
