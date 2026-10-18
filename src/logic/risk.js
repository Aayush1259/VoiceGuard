import { SIGNALS_BY_ID } from '../data/signals.js'

/** Score thresholds. Score >= threshold enters that tier. */
export const THRESHOLDS = { AMBER: 30, RED: 60 }
export const MAX_SCORE = 100

export const TIERS = {
  GREEN: {
    id: 'GREEN',
    label: 'GREEN',
    headline: 'Low risk: proceed',
    color: 'success',
    glow: 'glow-green',
    intervention: 'No extra steps',
    detail: 'The transfer continues under existing fraud checks. Normal behavior is never punished.',
    steps: ['Existing fraud checks', 'Money moves'],
  },
  AMBER: {
    id: 'AMBER',
    label: 'AMBER',
    headline: 'Elevated: verify both sides',
    color: 'warning',
    glow: 'glow-amber',
    intervention: 'VoiceGuard dual verification',
    detail: 'The payment stays pending. Sender and recipient each get an in-app call, repeat 3 fresh words, then review and approve.',
    steps: ['Hold payment', 'Call sender + recipient', '3-word challenge', 'Both review + approve'],
  },
  RED: {
    id: 'RED',
    label: 'RED',
    headline: 'High risk: hold + human review',
    color: 'error',
    glow: 'glow-red',
    intervention: 'Bank-assisted review',
    detail: 'The payment is held. The member gets an in-app message and a callback on their trusted number. No self-override.',
    steps: ['Hold payment', 'In-app message', 'Callback on trusted number', 'Staff decides'],
  },
}

/** Sum the weights of active signals (capped at MAX_SCORE). */
export function scoreSignals(activeIds) {
  const total = activeIds.reduce((sum, id) => sum + (SIGNALS_BY_ID[id]?.weight ?? 0), 0)
  return Math.min(total, MAX_SCORE)
}

/** Map a score to a tier. */
export function tierForScore(score) {
  if (score >= THRESHOLDS.RED) return TIERS.RED
  if (score >= THRESHOLDS.AMBER) return TIERS.AMBER
  return TIERS.GREEN
}

/** Full assessment used by the UI: score, tier, and the fired signals with reasons. */
export function assess(activeIds) {
  const score = scoreSignals(activeIds)
  const tier = tierForScore(score)
  const fired = activeIds.map((id) => SIGNALS_BY_ID[id]).filter(Boolean)
  return { score, tier, fired }
}
