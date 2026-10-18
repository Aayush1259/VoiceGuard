/**
 * Risk signal catalog.
 *
 *   'kit'    = maps to a field the Sound CU dataset provides
 *              (amount, timing, new-recipient indicators, profile changes,
 *              password resets, history comparisons, contact-center events).
 *   'future' = needs device / behavioral data the kit says NOT to assume.
 *              Shown in the demo for the vision, clearly labeled.
 *
 * weight: points added to the risk score when the signal fires.
 * reason: plain-English reason code shown to members and staff.
 */
export const SIGNAL_GROUPS = ['Transactional', 'Behavioral', 'Contextual']

export const SIGNALS = [
  // Transactional
  { id: 'firstTimeRecipient', group: 'Transactional', label: 'First-time recipient', weight: 15, source: 'kit',
    reason: 'You have never sent money to this person before.' },
  { id: 'amountAboveNormal', group: 'Transactional', label: 'Amount far above normal', weight: 20, source: 'kit',
    reason: 'This amount is much higher than your usual transfers.' },
  { id: 'roundUrgentAmount', group: 'Transactional', label: 'Round "urgent" amount', weight: 8, source: 'kit',
    reason: 'Round amounts like $5,000 are common in pressure scams.' },
  { id: 'rapidRepeat', group: 'Transactional', label: 'Rapid repeat transfers', weight: 15, source: 'kit',
    reason: 'Several transfers in a short time.' },

  // Behavioral
  { id: 'unusualHour', group: 'Behavioral', label: 'Unusual hour', weight: 8, source: 'kit',
    reason: 'This is outside the hours you normally bank.' },
  { id: 'contactDetailsChanged', group: 'Behavioral', label: 'Contact details recently changed', weight: 20, source: 'kit',
    reason: 'Your phone or email was changed recently.' },
  { id: 'pastedDetails', group: 'Behavioral', label: 'Pasted payment details', weight: 10, source: 'future',
    reason: 'Payment details were pasted, as if someone sent them to you.' },
  { id: 'hesitationRush', group: 'Behavioral', label: 'Hesitation, then rushing', weight: 8, source: 'future',
    reason: 'A long pause, then a rush to finish.' },

  // Contextual
  { id: 'newlyEnrolledRecipient', group: 'Contextual', label: 'Recipient added today', weight: 12, source: 'kit',
    reason: 'This recipient was added in the last 24 hours.' },
  { id: 'passwordReset', group: 'Contextual', label: 'Recent password reset', weight: 20, source: 'kit',
    reason: 'Your password was reset recently.' },
  { id: 'reportedSuspiciousCall', group: 'Contextual', label: 'Reported a suspicious call', weight: 25, source: 'kit',
    reason: 'You told us about a suspicious call recently.' },
  { id: 'newDevice', group: 'Contextual', label: 'New device or location', weight: 15, source: 'future',
    reason: 'This transfer comes from a new device or place.' },
]

export const SIGNALS_BY_ID = Object.fromEntries(SIGNALS.map((s) => [s.id, s]))

/** One-click presets for the presenter. */
export const PRESETS = [
  { id: 'normal', label: 'Normal day', signals: [] },
  { id: 'scam', label: 'Scam pattern', signals: ['firstTimeRecipient', 'amountAboveNormal', 'roundUrgentAmount'] },
  { id: 'takeover', label: 'Takeover pattern', signals: ['passwordReset', 'contactDetailsChanged', 'newlyEnrolledRecipient', 'amountAboveNormal'] },
]
