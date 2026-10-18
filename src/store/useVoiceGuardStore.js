import { create } from 'zustand'
import { PERSONAS_BY_ID } from '../data/personas.js'

export const CHALLENGE_WORDS = {
  sender: ['harbor', 'violet', 'seven'],
  recipient: ['harbor', 'violet', 'seven'],
}

export const VISUAL_WORD_OPTIONS = ['harbor', 'golden', 'violet', 'river', 'seven', 'castle']

export const useVoiceGuardStore = create((set, get) => ({
  activeTab: 'demo',
  setActiveTab: (tab) => set({ activeTab: tab }),

  currentPersonaId: 'M1001',

  // Scenario Step:
  // 'TRANSFER_FORM' | 'SENDER_VERIFYING' | 'SENDER_DONE_WAITING_RECEIVER' | 'RECEIVER_VERIFYING' | 'REVIEW_DECISION' | 'OUTCOME_CANCELLED' | 'OUTCOME_APPROVED'
  scenarioStep: 'TRANSFER_FORM',

  // Decoupled participant verification states
  senderVerified: false,
  recipientVerified: false,
  watermarkVerified: false,

  // Live in-between inspection pipeline checks
  checks: {
    check1_risk: 'IDLE',        // 'IDLE' | 'FLAGGED' (Hold engaged)
    check2_senderVoice: 'IDLE',  // 'IDLE' | 'PASSED'
    check3_watermark: 'IDLE',    // 'IDLE' | 'PASSED'
    check4_recipient: 'IDLE',    // 'IDLE' | 'WAITING_ASYNC' | 'PASSED'
    check5_disclosure: 'IDLE',   // 'IDLE' | 'SCAM_STOPPED' | 'RELEASED'
  },

  isAccessibilityMode: false,
  selectedVisualWords: [],

  // Select Persona
  selectPersona: (personaId) => {
    const persona = PERSONAS_BY_ID[personaId]
    if (!persona) return

    set({
      currentPersonaId: personaId,
      scenarioStep: 'TRANSFER_FORM',
      senderVerified: false,
      recipientVerified: false,
      watermarkVerified: false,
      isAccessibilityMode: false,
      selectedVisualWords: [],
      checks: {
        check1_risk: 'IDLE',
        check2_senderVoice: 'IDLE',
        check3_watermark: 'IDLE',
        check4_recipient: 'IDLE',
        check5_disclosure: 'IDLE',
      },
    })
  },

  // =========================================================================
  // STEP 1: SENDER CLICKS SEND TRANSFER -> CHECK 1 FIRES (SENTRY HOLD ENGAGED)
  // =========================================================================
  triggerTransfer: () => {
    const { currentPersonaId } = get()
    if (currentPersonaId === 'M1002') {
      set({
        scenarioStep: 'QUESTIONNAIRE',
        checks: {
          check1_risk: 'FLAGGED',
          check2_senderVoice: 'IDLE',
          check3_watermark: 'IDLE',
          check4_recipient: 'IDLE',
          check5_disclosure: 'IDLE',
        },
      })
    } else if (currentPersonaId === 'M1004') {
      set({
        scenarioStep: 'ATO_FREEZE',
        checks: {
          check1_risk: 'FLAGGED',
          check2_senderVoice: 'IDLE',
          check3_watermark: 'IDLE',
          check4_recipient: 'IDLE',
          check5_disclosure: 'IDLE',
        },
      })
    } else {
      // Sentry places protective hold, prompts sender to verify HER side first
      set({
        scenarioStep: 'SENDER_VERIFYING',
        checks: {
          check1_risk: 'FLAGGED',
          check2_senderVoice: 'IDLE',
          check3_watermark: 'IDLE',
          check4_recipient: 'WAITING_ASYNC',
          check5_disclosure: 'IDLE',
        },
      })
    }
  },

  // =========================================================================
  // STEP 2: SENDER VERIFIES RIGHT NOW (Speaks words: harbor violet seven)
  // =========================================================================
  verifySenderNow: () => {
    set({
      senderVerified: true,
      watermarkVerified: true,
      scenarioStep: 'SENDER_DONE_WAITING_RECEIVER',
      checks: {
        check1_risk: 'FLAGGED',
        check2_senderVoice: 'PASSED',
        check3_watermark: 'PASSED',
        check4_recipient: 'WAITING_ASYNC',
        check5_disclosure: 'IDLE',
      },
    })
  },

  // =========================================================================
  // STEP 3: RECIPIENT VERIFIES LATER ANYTIME (When free from work / meeting)
  // =========================================================================
  verifyRecipientLater: () => {
    set({
      recipientVerified: true,
      scenarioStep: 'REVIEW_DECISION',
      checks: {
        check1_risk: 'FLAGGED',
        check2_senderVoice: 'PASSED',
        check3_watermark: 'PASSED',
        check4_recipient: 'PASSED',
        check5_disclosure: 'IDLE',
      },
    })
  },

  // =========================================================================
  // STEP 4A: SENDER CANCELS SCAM (Can be done anytime, even while waiting!)
  // =========================================================================
  senderCancelScam: () => {
    set({
      scenarioStep: 'OUTCOME_CANCELLED',
      checks: {
        check1_risk: 'FLAGGED',
        check2_senderVoice: 'PASSED',
        check3_watermark: 'PASSED',
        check4_recipient: 'CANCELLED',
        check5_disclosure: 'SCAM_STOPPED',
      },
    })
  },

  // =========================================================================
  // STEP 4B: LEGITIMATE APPROVAL
  // =========================================================================
  bothApproveTransfer: () => {
    set({
      scenarioStep: 'OUTCOME_APPROVED',
      checks: {
        check1_risk: 'FLAGGED',
        check2_senderVoice: 'PASSED',
        check3_watermark: 'PASSED',
        check4_recipient: 'PASSED',
        check5_disclosure: 'RELEASED',
      },
    })
  },

  // Accessibility Visual Tap
  enableAccessibilityMode: () => {
    set({ isAccessibilityMode: true, selectedVisualWords: [] })
  },

  tapVisualWord: (word) => {
    const { selectedVisualWords, verifySenderNow } = get()
    if (selectedVisualWords.includes(word)) return
    const next = [...selectedVisualWords, word]
    set({ selectedVisualWords: next })
    if (next.length === 3) {
      setTimeout(() => verifySenderNow(), 400)
    }
  },

  // M1002 Actions
  answerJobQuestion: (answer) => {
    if (answer === 'supplies') {
      set({ scenarioStep: 'SCAM_WARNING' })
    } else {
      set({ scenarioStep: 'OUTCOME_APPROVED' })
    }
  },

  // M1004 Actions
  triggerTrustedDeviceAlert: () => {
    set({ scenarioStep: 'TRUSTED_DEVICE_ALERT' })
  },

  lockCompromisedAccount: () => {
    set({ scenarioStep: 'OUTCOME_LOCKED' })
  },

  // Reset
  resetDemo: () => {
    const { currentPersonaId, selectPersona } = get()
    selectPersona(currentPersonaId)
  },
}))
