/**
 * Sound Credit Union Member Personas (M1001–M1004) and Legitimate Look-Alike.
 * Models authorized push scams, check fraud, legitimate remodels, and account takeovers.
 */
export const PERSONAS = [
  {
    id: 'M1001',
    name: 'Eleanor Vance',
    role: 'Anchor Persona: Older Member',
    memberSince: '2008 (18 yrs)',
    scenarioType: 'Impersonation Scam (Manipulated)',
    description: 'Scammer posing as Sound CU Fraud Dept demanding urgent transfer of $8,500 to a "Safe Vault".',
    transferAmount: 8500,
    recipient: 'Safe Holding Escrow LLC',
    rail: 'Wire Transfer',
    baselineAvg: 180,
    signals: ['firstTimeRecipient', 'amountAboveNormal', 'roundUrgentAmount'],
    expectedOutcome: 'Amber / Red -> VoiceGuard Dual Verification catches discrepancy -> Scam Blocked',
    avatar: '👵'
  },
  {
    id: 'M1002',
    name: 'Marcus Chen',
    role: 'Anchor Persona: College Student',
    memberSince: '2024 (2 yrs)',
    scenarioType: 'Fake Employment Scam (Deceived)',
    description: 'Offered remote job, instructed to transfer $1,800 to "equipment vendor" via instant rail.',
    transferAmount: 1800,
    recipient: 'FastTech Logistics',
    rail: 'Instant Rail (FedNow)',
    baselineAvg: 65,
    signals: ['firstTimeRecipient', 'amountAboveNormal', 'rapidRepeat'],
    expectedOutcome: 'Amber -> VoiceGuard challenge alerts member before balance wiped',
    avatar: '🎓'
  },
  {
    id: 'M1003',
    name: 'Sarah Jenkins',
    role: 'Legitimate Look-Alike Member',
    memberSince: '2015 (11 yrs)',
    scenarioType: 'Legitimate Home Renovation (False Positive Test)',
    description: 'First-time $6,500 payment to licensed general contractor for kitchen remodeling materials.',
    transferAmount: 6500,
    recipient: 'Pacific NW Builders LLC',
    rail: 'Wire Transfer',
    baselineAvg: 450,
    signals: ['firstTimeRecipient', 'amountAboveNormal'],
    expectedOutcome: 'Amber -> Both sides verify with 3-word challenge -> Seamlessly Approved (<60s)',
    avatar: '🔨'
  },
  {
    id: 'M1004',
    name: 'David Miller',
    role: 'Anchor Persona: Account Takeover',
    memberSince: '2012 (14 yrs)',
    scenarioType: 'Account Takeover / ATO (Compromised)',
    description: 'Attacker reset password at 2:40 AM, altered phone number, and attempted to drain $9,200.',
    transferAmount: 9200,
    recipient: 'CryptoBridge Global',
    rail: 'External ACH / Wire',
    baselineAvg: 320,
    signals: ['passwordReset', 'contactDetailsChanged', 'newlyEnrolledRecipient', 'amountAboveNormal', 'unusualHour'],
    expectedOutcome: 'Red Tier -> Immediate Protective Freeze -> Routed to Bank Assisted Review',
    avatar: '⚠️'
  }
]

export const PERSONAS_BY_ID = Object.fromEntries(PERSONAS.map(p => [p.id, p]))
