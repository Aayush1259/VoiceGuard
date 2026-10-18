# VoiceGuard: Product Requirements Document (PRD)

**Organization:** Sound Credit Union  
**Product:** VoiceGuard™ Enterprise Pre-Authorization & Impersonation Defense Protocol  
**Version:** 2.1  
**Status:** Approved for Core Integration  
**Date:** October 2026  

---

## 1. Executive Summary

Authorized Push Payment (APP) fraud and Business Email Compromise (BEC) represent the fastest-growing financial crime category in the United States, inflicting over **$10.3 Billion** in annual consumer and commercial losses (FBI IC3). 

Traditional banking defenses authenticate the **login** (via Passwords, SMS OTPs, and Face ID). However, in an authorized scam, **the legitimate member logs in willingly because a criminal is coaching them over an active phone call**. Under **CFPB Regulation E (12 CFR Part 1005)**, financial institutions are not mandated to reimburse members for authorized transfers, leaving victims—predominantly older members—to suffer catastrophic losses.

**VoiceGuard** is an enterprise-grade pre-settlement intervention engine designed natively for Sound Credit Union. Instead of monitoring post-settlement float or relying on single-sided behavioral analytics, VoiceGuard introduces a **Pre-Settlement In-Vault Escrow Hold** combined with a **3-Word Spoken Verification Challenge** and **DeepMark Ultrasonic Acoustic Attestation**. VoiceGuard physically disrupts the psychological compliance trance, mathematically verifies live human presence, and protects member funds before money leaves the credit union vault.

---

## 2. Problem Statement & Market Reality

### 2.1 Criminals Hack the Human, Not the App
- In 92% of telephone impersonation scams, scammers instruct victims: *"Do not hang up. Open your banking app. When it asks for Face ID or a text code, approve it to secure your funds."*
- **Face ID & Biometrics Fail:** Face ID only proves *who* is looking at the camera; it cannot detect psychological panic, coercion, or deception.
- **SMS OTPs Fail:** Scammers easily coach victims into reading 6-digit codes aloud over the phone ("Read me the safety code to cancel the wire").
- **Payment Rails are Irreversible:** Once a wire leaves via Fedwire, RTP, or FedNow, recovery rates drop below 3% within 20 minutes as funds are dispersed across crypto off-ramps.

### 2.2 The Regulation E Reimbursement Vacuum
- Under Regulation E, unauthorized account takeovers (stolen debit cards, hacker logins) must be reimbursed by the bank.
- However, when a member is deceived into authorizing the transfer themselves, it is legally classified as an **Authorized Push Payment (APP)**. Banks bear zero legal liability, and members lose their life savings.
- VoiceGuard resolves this gap by preventing the loss before settlement occurs.

---

## 3. Supported Business Models & Coverage

VoiceGuard extends beyond consumer P2P to safeguard all institutional fund flows:

| Business Model | Primary Threat Vector | VoiceGuard Mechanism | Protected Rail |
| :--- | :--- | :--- | :--- |
| **C2C (Consumer-to-Consumer)** | Elder impersonation (grandson in jail), romance fraud, safe-account spoofing. | In-app 3-word spoken challenge + 4-hour asynchronous vault hold. | Zelle, FedNow, Instant P2P |
| **B2C (Business-to-Consumer)** | Fake remote job check overpayment, fraudulent refund reversal demands. | 24-hour clearing buffer + in-app cognitive questionnaire. | ACH Credit, Instant Disbursement |
| **C2B (Consumer-to-Business)** | Real estate escrow wire diversion, unverified contractor account routing. | Verified corporate business profile matching + dual verification in <45s. | Fedwire, Same-Day ACH |
| **B2B (Business-to-Business)** | Business Email Compromise (BEC) / CEO Fraud ($2.9B annual loss). | Dual-executive presence hold: AP clerk initiates; CFO speaks random words to release. | Fedwire Commercial, RTP |

---

## 4. Anchor Personas & Scenarios

VoiceGuard is calibrated against 4 core real-world member scenarios:

### 4.1 Persona M1001: Eleanor Vance (Elder Impersonation Wire Scam)
- **Profile:** 74-year-old retired educator, Sound Credit Union member for 18 years.
- **Threat Scenario:** Criminal spoofing Sound CU fraud department claims Eleanor's account is compromised and demands an immediate $8,500 wire to a "protective federal vault account."
- **VoiceGuard Action:** 
  1. Detects 47x velocity spike and new out-of-state recipient LLC.
  2. Holds $8,500 in Sound CU vault escrow.
  3. Displays 3 random words (`harbor • violet • seven`) and requires verbal readout.
  4. Forces Eleanor to speak aloud, muting the scammer's call and waking conscious cognitive evaluation.
  5. Displays Reality Disclosure: *"Sound Credit Union will NEVER ask you to wire funds to stay safe."*
  6. Eleanor cancels the transaction; $8,500 remains safe in her checking account.

### 4.2 Persona M1002: Marcus Chen (Counterfeit Employment Check)
- **Profile:** 19-year-old UW student, member since 2024.
- **Threat Scenario:** Counterfeit $2,500 remote-work stipend deposited; scammer demands immediate $1,800 equipment refund wire before check bounces.
- **VoiceGuard Action:** Enforces a 24-hour risk-weighted clearing buffer and prompts Marcus with a question hook identifying common job refund scams.

### 4.3 Persona M1003: Sarah Jenkins (Legitimate Remodel Escrow)
- **Profile:** 42-year-old software architect, member since 2017.
- **Scenario:** Legitimate $6,500 contractor payment to a verified WA State general contractor.
- **VoiceGuard Action:** Smooth, friction-matched verification. Both parties complete in-app verification in <40 seconds; funds release without false declines.

### 4.4 Persona M1004: Jordan Taylor (Account Takeover / Intruder)
- **Profile:** 29-year-old nurse, member since 2019.
- **Threat Scenario:** Credential stuffing attack at 2:14 AM from an unrecognized IP attempting a $9,200 crypto purchase.
- **VoiceGuard Action:** Attacker lacks access to Jordan's enrolled mobile hardware. The wire is rejected, and an emergency security push alert is sent to Jordan's genuine smartphone.

---

## 5. Core Functional Requirements

### 5.1 Pre-Settlement Vault Escrow
- **Requirement:** Payment orders flagging high-risk indicators MUST be held inside the Sound Credit Union core ledger vault.
- **Constraint:** Zero outbound messages may be dispatched to external payment networks (Fedwire, RTP, FedNow) until verification is sealed.

### 5.2 Dynamic In-App Spoken Challenge
- **Requirement:** System must generate 3 phonetically distinct random words using a CSPRNG.
- **TTL:** Challenge token must expire within 60 seconds (single-use nonce).
- **Acoustic Matching:** Spoken speech must be analyzed on the device or via temporary memory, verifying word pronunciation without recording conversations.

### 5.3 DeepMark Ultrasonic Acoustic Watermark
- **Requirement:** To prevent AI voice clones, text-to-speech soundboards, or virtual audio routing cables, the app must emit an inaudible 18.5kHz–20kHz ultrasonic tone via device speaker during speech capture.
- **Attestation:** The microphone must capture the physical room acoustic loopback, proving real-world microphone proximity.

### 5.4 Asynchronous 4-Hour Escrow Window
- **Requirement:** The system MUST NOT require simultaneous phone calls or split-second co-presence.
- **Sender Flow:** Sender verifies in ~15 seconds. Funds enter vault hold.
- **Recipient Flow:** Recipient banking app receives a push alert and has up to 4 hours to verify identity.
- **Cancellation:** Sender maintains a 1-tap cancellation option at all times during the hold.

### 5.5 Accessible Visual Fallback Mode (ADA Title III / WCAG 2.1 AA)
- **Requirement:** Members unable to speak (laryngitis, muteness, noisy environments) must have equal access.
- **Fallback Mechanism:** Interactive randomized word tap sequence authenticated by hardware biometric re-verification (Face ID / Touch ID via Secure Enclave).

---

## 6. Regulatory & Compliance Requirements

1. **CFPB Regulation E (12 CFR Part 1005):** Mitigates consumer harm in the authorized push payment regulatory gap.
2. **Uniform Commercial Code (UCC) Article 4A:** Establishes a "commercially reasonable security procedure" shielding the credit union from wire dispute liability.
3. **Washington Biometric Privacy Act (RCW 19.375):** Zero permanent biometric voiceprints enrolled or stored. Zero audio files saved.
4. **Federal Wiretap Act (18 U.S.C. § 2511) & WA RCW 9.73.030:** No phone call interception or tapping. Audio capture occurs only on active, explicit member button press.

---

## 7. Key Performance Indicators (KPIs)

- **Scam Intervention Rate:** ≥80% cancellation rate on coerced unauthorized push wires.
- **False Decline Reduction:** <1.5% friction rate on established member baselines.
- **Verification Latency:** <15ms Sentry scoring; <500ms acoustic verification round-trip.
- **Storage Cost:** ~$0.00 (350 bytes per audit receipt; zero audio persistence).
- **Fraud Operations Savings:** $150–$400 saved per avoided wire dispute and SAR investigation.
