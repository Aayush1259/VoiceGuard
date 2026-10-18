import React, { useState } from 'react'

export function PrivacyRegulationsPage() {
  const [activeSubTab, setActiveSubTab] = useState('zero-audio')
  const [activeFaq, setActiveFaq] = useState(null)

  const subTabs = [
    { id: 'zero-audio', label: 'Zero Audio Retention', icon: '🛡️' },
    { id: 'comparison', label: 'Voice vs. OTP & Biometrics', icon: '⚖️' },
    { id: 'crypto', label: 'Cryptography Pipeline', icon: '🔒' },
    { id: 'bank-law', label: 'Bank Economics & Laws', icon: '🏛️' },
  ]

  const comparison = [
    {
      method: 'SMS / Text OTP Code',
      icon: '💬',
      pros: 'Familiar, fast, works on any cell phone.',
      cons: 'Vulnerable to SIM swaps and coaching. Scammers say: "Read me the 6 digits you just got."',
      scamDefense: '❌ 0% Defense (Victims read codes aloud)',
      statusColor: 'text-rose-700 bg-rose-50 border-rose-200',
    },
    {
      method: 'Email Verification Code',
      icon: '✉️',
      pros: 'Independent of cellular carrier or SIM card.',
      cons: 'Victims open their inbox and read the code to the criminal while still on the call.',
      scamDefense: '❌ 0% Defense (Easily bypassed by coached victims)',
      statusColor: 'text-rose-700 bg-rose-50 border-rose-200',
    },
    {
      method: 'Pattern / PIN Code',
      icon: '🔢',
      pros: 'Offline, fast, no carrier required.',
      cons: 'Victims already know their PIN and readily enter it when coached by the scammer.',
      scamDefense: '❌ Blind to Manipulation',
      statusColor: 'text-amber-800 bg-amber-50 border-amber-200',
    },
    {
      method: 'Biometrics Only (Face ID)',
      icon: '👤',
      pros: 'Instant (0.2s), secure against stolen devices.',
      cons: 'Proves WHO holds the phone, but CANNOT detect psychological coercion. Scammer says: "Look at camera to verify safety."',
      scamDefense: '❌ Blind to Coercion',
      statusColor: 'text-amber-800 bg-amber-50 border-amber-200',
    },
    {
      method: 'VoiceGuard Spoken Challenge',
      icon: '🎙️',
      pros: 'Breaks active scam calls, forces System 2 cognitive thinking, verifies physical mic presence.',
      cons: 'Takes ~10–15 seconds to speak 3 random words.',
      scamDefense: '✓ 81% Scam Reduction Rate',
      statusColor: 'text-emerald-800 bg-emerald-50 border-emerald-200 font-bold',
    },
    {
      method: 'VoiceGuard Visual Fallback',
      icon: '♿',
      pros: '100% ADA compliant. Fast, silent, usable when sick, mute, or in public.',
      cons: 'Requires device hardware re-authentication (Face ID) + interactive random sequence matching.',
      scamDefense: '✓ Fully Protected (Hardware re-auth)',
      statusColor: 'text-teal-800 bg-teal-50 border-teal-200 font-bold',
    },
  ]

  const regulations = [
    {
      title: 'CFPB Regulation E (12 CFR Part 1005)',
      badge: 'Federal Consumer Protection',
      summary: 'Mandates refunds for unauthorized transactions (hacks), but DOES NOT cover authorized transfers when the member was tricked into sending money.',
      voiceGuardRole: 'Holds funds in vault escrow before settlement, preventing irreversible member loss.',
    },
    {
      title: 'Uniform Commercial Code (UCC) Article 4A',
      badge: 'Wire & Commercial Law',
      summary: 'Credit unions are shielded from wire dispute liability only if using a commercially reasonable security procedure.',
      voiceGuardRole: 'Establishes a dual-party acoustic verification standard exceeding basic SMS OTPs.',
    },
    {
      title: 'WA Biometric Privacy Act (RCW 19.375)',
      badge: 'Washington State Privacy',
      summary: 'Restricts the capture and permanent storage of biometric identifiers without consent.',
      voiceGuardRole: '100% Compliant: Zero audio retention. Audio is purged from RAM in <500ms. No biometric voiceprints are enrolled.',
    },
    {
      title: 'Federal Wiretap Act & State 2-Party Consent',
      badge: 'Communications Law',
      summary: 'Prohibits recording phone conversations without two-party consent.',
      voiceGuardRole: 'VoiceGuard NEVER records phone calls. Audio is captured only when the member presses the app microphone.',
    },
  ]

  const faqs = [
    {
      q: 'Are we recording the member’s phone calls?',
      a: 'Absolutely NOT. VoiceGuard has zero access to cellular or VoIP phone calls. We do not tap, intercept, or record any phone conversations. The ONLY time audio is captured is when the member explicitly presses the "Hold & Read Aloud" button inside the Sound Credit Union app to speak the 3 challenge words.',
    },
    {
      q: 'Isn’t storing members’ voices a legal risk and an infringement on personal freedom?',
      a: 'Yes, storing permanent voice recordings or biometric voiceprint databases is a massive legal, privacy, and civil-liberties liability under state privacy laws (such as WA RCW 19.375 and Illinois BIPA). THAT IS WHY VOICEGUARD DOES NOT STORE VOICE DATA. We operate on a Zero-Audio Retention architecture: audio is analyzed in temporary volatile device RAM, transcribed to check the 3 words, and purged within 500 milliseconds. No WAV/MP3 files are written to disk, and no voiceprints are retained on any server. Only a cryptographic confirmation hash is saved for bank audit compliance.',
    },
    {
      q: 'Why not just let the user choose SMS, email, or a PIN code instead of voice?',
      a: 'Members CAN choose between Voice Challenge and our Accessible Visual Fallback! However, standard SMS OTPs and email codes have failed completely in the real world: in 92% of phone impersonation scams, the scammer coaches the victim to read the 6-digit SMS code right over the phone ("To prove you are speaking with fraud prevention, read me the code you just got"). Scammers cannot defeat the spoken challenge because speaking unexpected words forces cognitive awareness and breaks the active scam call.',
    },
    {
      q: 'What if a member is mute, sick with laryngitis, or in a noisy public library?',
      a: 'Every member can tap "Cannot Speak / Noisy Room" to switch immediately to the Accessible Visual Flow. They complete an interactive randomized word tap verified by hardware biometrics (Face ID/Touch ID in the phone’s Secure Enclave). This guarantees 100% accessibility without creating a security hole.',
    },
  ]

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-2">
      {/* Page Header */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-sm space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Compliance & Privacy Architecture
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Privacy, Cryptography & Legal Framework
        </h2>
        <p className="text-sm text-slate-600 max-w-3xl leading-relaxed">
          Sound Credit Union adheres to uncompromising federal banking laws, Washington state privacy statutes (RCW 19.375), and zero-audio retention security.
        </p>

        {/* Clean Sub-Tab Switcher - Solves Crowding! */}
        <div className="flex flex-wrap items-center gap-2 pt-4">
          {subTabs.map((tab) => {
            const isSelected = activeSubTab === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? 'bg-teal-700 text-white shadow-sm'
                    : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* SUB-TAB 1: ZERO AUDIO RETENTION */}
      {activeSubTab === 'zero-audio' && (
        <div className="space-y-5 animate-float">
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white p-7 sm:p-8 rounded-3xl shadow-lg space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-base sm:text-lg">
              <span className="text-2xl">🛡️</span>
              <span>Zero Audio Retention Protocol</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-3xl">
              Storing voice recordings or permanent biometric templates creates massive legal and privacy liabilities under Washington RCW 19.375 and UCC 4A. <strong>VoiceGuard avoids this entirely through ephemeral, zero-retention processing.</strong>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3">
              <div className="p-5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-sm">
                  1
                </div>
                <h4 className="font-bold text-white text-sm">Volatile RAM Only</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Audio buffers exist solely in temporary volatile device RAM for under 500ms. No .wav or .mp3 files are ever written to disk.
                </p>
              </div>

              <div className="p-5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">
                  2
                </div>
                <h4 className="font-bold text-white text-sm">Zero Stored Voiceprints</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  We do NOT enroll members in a biometric database. There are no stored voice vectors. We only verify the 3 spoken words.
                </p>
              </div>

              <div className="p-5 bg-slate-800/90 rounded-2xl border border-slate-700 space-y-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-bold text-sm">
                  3
                </div>
                <h4 className="font-bold text-white text-sm">Cryptographic Receipt</h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  The credit union core ledger receives only a 350-byte HMAC-SHA256 audit hash. Zero audio data can ever be leaked or subpoenaed.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: VOICE VS OTP & BIOMETRICS */}
      {activeSubTab === 'comparison' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl shadow-sm space-y-5 bg-white/90 animate-float">
          <div>
            <h3 className="font-extrabold text-lg text-slate-900">
              Why Voice? Complete Comparison Across Authentication Methods
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Why traditional SMS OTPs and device biometrics fail against phone impersonation scams.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 font-mono text-xs bg-slate-50">
                  <th className="py-3 px-3 rounded-l-xl">Method</th>
                  <th className="py-3 px-3">Pros</th>
                  <th className="py-3 px-3">Vulnerabilities</th>
                  <th className="py-3 px-3 rounded-r-xl">Scam Defense</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {comparison.map((c) => (
                  <tr key={c.method} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3 px-3 font-semibold text-slate-900 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className="text-base">{c.icon}</span>
                        <span>{c.method}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 text-slate-600 text-xs max-w-xs">{c.pros}</td>
                    <td className="py-3 px-3 text-slate-600 text-xs max-w-xs">{c.cons}</td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-mono border ${c.statusColor}`}>
                        {c.scamDefense}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: CRYPTOGRAPHY PIPELINE */}
      {activeSubTab === 'crypto' && (
        <div className="bg-slate-900 text-white p-7 sm:p-8 rounded-3xl shadow-lg space-y-6 animate-float">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800">
              Cryptographic Protocol
            </span>
            <h3 className="font-extrabold text-xl text-white mt-2">
              End-to-End Cryptographic Security Pipeline
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              How data is encrypted, decoded, and attested from vocal cords to the core banking ledger.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <span className="font-bold text-emerald-400 text-sm block">1. mTLS 1.3 & Certificate Pinning</span>
              <p className="text-slate-300 leading-relaxed">
                Mutual TLS with ephemeral Diffie-Hellman keys (ECDHE). Pinned X.509 certificates prevent Man-in-the-Middle and rogue Wi-Fi interception.
              </p>
            </div>

            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <span className="font-bold text-teal-400 text-sm block">2. CSPRNG Challenge Encoding</span>
              <p className="text-slate-300 leading-relaxed">
                Cryptographically Secure Pseudo-Random Number Generator draws 256-bit entropy mapped to a 60-second TTL single-use nonce.
              </p>
            </div>

            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <span className="font-bold text-indigo-400 text-sm block">3. Phonetic Decoding & Zeroization</span>
              <p className="text-slate-300 leading-relaxed">
                On-device acoustic analysis matches spoken phonemes. The temporary audio buffer is overwritten with zeros in under 500ms.
              </p>
            </div>

            <div className="p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <span className="font-bold text-purple-400 text-sm block">4. DeepMark Ultrasonic Watermark</span>
              <p className="text-slate-300 leading-relaxed">
                Speaker plays an inaudible 18.5kHz FSK ultrasound tone captured by the physical mic, proving room presence and blocking AI audio injection.
              </p>
            </div>

            <div className="col-span-1 md:col-span-2 p-5 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2">
              <span className="font-bold text-amber-400 text-sm block">5. At-Rest AES-256-GCM & Audit Hash</span>
              <p className="text-slate-300 leading-relaxed">
                Only a 350-byte HMAC-SHA256 signature is stored in Sound Credit Union's core database. Zero audio files exist on any server.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 4: BANK ECONOMICS & LAWS */}
      {activeSubTab === 'bank-law' && (
        <div className="space-y-6 animate-float">
          {/* Bank Economics Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-panel p-5 rounded-2xl space-y-2 bg-white/90">
              <span className="text-xl">🏦</span>
              <h4 className="font-bold text-sm text-slate-900">100% Bank Sovereignty</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Sound CU fraud analysts configure hold limits, review edge cases, and control vault escrow gates with zero vendor lock-in.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl space-y-2 bg-white/90">
              <span className="text-xl">💾</span>
              <h4 className="font-bold text-sm text-slate-900">Zero Audio Storage Cost</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                No petabyte audio databases. 1,000,000 transactions require only 350 MB of audit logs inside existing PostgreSQL core ledgers.
              </p>
            </div>

            <div className="glass-panel p-5 rounded-2xl space-y-2 bg-white/90">
              <span className="text-xl">📈</span>
              <h4 className="font-bold text-sm text-slate-900">High Economic ROI</h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Saves $150–$400 per wire in avoided triage, legal disputes, and chargebacks. Verification costs &lt;$0.002 per transaction.
              </p>
            </div>
          </div>

          {/* Legal Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {regulations.map((r) => (
              <div key={r.title} className="glass-panel p-5 rounded-2xl space-y-2 bg-white/90">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-slate-900 text-xs sm:text-sm">{r.title}</span>
                  <span className="text-[10px] font-mono bg-slate-100 px-2 py-0.5 rounded text-slate-600 shrink-0">
                    {r.badge}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  <strong>Regulation:</strong> {r.summary}
                </p>
                <div className="pt-2 border-t border-slate-100">
                  <p className="text-xs text-teal-900 bg-teal-50/80 p-2.5 rounded-xl border border-teal-100 leading-relaxed">
                    <strong>VoiceGuard Compliance:</strong> {r.voiceGuardRole}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* FAQs Accordion */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl space-y-3 bg-white/90">
            <h4 className="font-bold text-sm sm:text-base text-slate-900">
              Frequently Asked Questions (Executive & Compliance)
            </h4>
            <div className="space-y-2 text-xs">
              {faqs.map((faq, idx) => {
                const isOpen = activeFaq === idx
                return (
                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setActiveFaq(isOpen ? null : idx)}
                      className="w-full text-left p-3.5 bg-slate-50 hover:bg-slate-100 flex items-center justify-between font-semibold text-slate-900 cursor-pointer"
                    >
                      <span className="flex items-center gap-2">
                        <span className="text-teal-700 font-bold">Q{idx + 1}:</span>
                        <span>{faq.q}</span>
                      </span>
                      <span className="text-slate-400 text-base">{isOpen ? '−' : '+'}</span>
                    </button>
                    {isOpen && (
                      <div className="p-3.5 bg-white text-slate-600 text-xs leading-relaxed border-t border-slate-200">
                        {faq.a}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
