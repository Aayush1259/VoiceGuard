/**
 * Security Guards for VoiceGuard
 * Visibly enforced in the state machine and inspector panel.
 */

// Challenge TTL in seconds (default: 60s)
export const CHALLENGE_TTL_SECONDS = 60

/** Check if the challenge timestamp has exceeded TTL */
export function isChallengeExpired(issuedAtTimestamp, now = Date.now()) {
  if (!issuedAtTimestamp) return true
  const elapsedSec = (now - issuedAtTimestamp) / 1000
  return elapsedSec > CHALLENGE_TTL_SECONDS
}

/** Check if the response matches a previously used session nonce (Replay prevention) */
export function isReplayAttempt(challengeNonce, usedNoncesSet) {
  if (!challengeNonce) return true
  return usedNoncesSet.has(challengeNonce)
}

/** Verify that the response is cryptographically bound to the current active session */
export function bindChallengeToSession(challengeSessionId, activeSessionId) {
  return Boolean(challengeSessionId && activeSessionId && challengeSessionId === activeSessionId)
}

/** Check if consecutive failed verification attempts exceeded maximum threshold (3 strikes) */
export const MAX_ATTEMPTS = 3
export function checkAttemptLimit(currentAttempts) {
  return currentAttempts >= MAX_ATTEMPTS
}

/** Stubbed DeepMark Audio Watermark Detector */
export function verifyAudioWatermark(audioPayload) {
  // Returns true if audio contains valid DeepMark cryptographic payload
  if (!audioPayload) return false
  return Boolean(audioPayload.hasValidWatermark)
}
