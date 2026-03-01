/**
 * Resume Builder Project - Step Gating System
 * Manages progress through 8 build steps with artifact tracking
 */

export type RBStep = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8

export interface RBStepStatus {
  step: RBStep
  completed: boolean
  artifactUploaded: boolean
  timestamp?: number
}

export interface RBProjectState {
  steps: Record<string, RBStepStatus>
  lovableLink: string
  githubLink: string
  deployLink: string
  currentStep: RBStep
}

const STORAGE_KEY = 'rb_project_state'

const defaultSteps: Record<string, RBStepStatus> = {
  '1': { step: 1, completed: false, artifactUploaded: false },
  '2': { step: 2, completed: false, artifactUploaded: false },
  '3': { step: 3, completed: false, artifactUploaded: false },
  '4': { step: 4, completed: false, artifactUploaded: false },
  '5': { step: 5, completed: false, artifactUploaded: false },
  '6': { step: 6, completed: false, artifactUploaded: false },
  '7': { step: 7, completed: false, artifactUploaded: false },
  '8': { step: 8, completed: false, artifactUploaded: false },
}

function isClient(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

export function getRBProjectState(): RBProjectState {
  if (!isClient()) {
    return {
      steps: defaultSteps,
      lovableLink: '',
      githubLink: '',
      deployLink: '',
      currentStep: 1,
    }
  }

  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) {
    return {
      steps: defaultSteps,
      lovableLink: '',
      githubLink: '',
      deployLink: '',
      currentStep: 1,
    }
  }

  try {
    return JSON.parse(stored) as RBProjectState
  } catch (e) {
    console.error('Error parsing RB project state:', e)
    return {
      steps: defaultSteps,
      lovableLink: '',
      githubLink: '',
      deployLink: '',
      currentStep: 1,
    }
  }
}

export function saveRBProjectState(state: RBProjectState): void {
  if (!isClient()) return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
}

export function canAccessStep(step: RBStep): boolean {
  const state = getRBProjectState()
  
  // Step 1 is always accessible
  if (step === 1) return true
  
  // For other steps, check if previous step has artifact uploaded
  const prevStep = (step - 1) as RBStep
  const prevStepStatus = state.steps[String(prevStep)]
  return prevStepStatus?.artifactUploaded === true
}

export function markStepArtifactUploaded(step: RBStep): void {
  const state = getRBProjectState()
  state.steps[String(step)] = {
    ...state.steps[String(step)],
    artifactUploaded: true,
    completed: true,
    timestamp: Date.now(),
  }
  
  // Update current step if needed
  if (state.currentStep === step && step < 8) {
    state.currentStep = (step + 1) as RBStep
  }
  
  saveRBProjectState(state)
}

export function isStepCompleted(step: RBStep): boolean {
  const state = getRBProjectState()
  return state.steps[String(step)]?.completed === true
}

export function isArtifactUploaded(step: RBStep): boolean {
  const state = getRBProjectState()
  return state.steps[String(step)]?.artifactUploaded === true
}

export function getCurrentStep(): RBStep {
  const state = getRBProjectState()
  return state.currentStep
}

export function getCompletedStepsCount(): number {
  const state = getRBProjectState()
  return Object.values(state.steps).filter((s) => s.completed).length
}

export function areAllStepsCompleted(): boolean {
  return getCompletedStepsCount() === 8
}

export function setProjectLinks(
  lovableLink: string,
  githubLink: string,
  deployLink: string
): void {
  const state = getRBProjectState()
  state.lovableLink = lovableLink
  state.githubLink = githubLink
  state.deployLink = deployLink
  saveRBProjectState(state)
}

export function getProjectLinks(): {
  lovableLink: string
  githubLink: string
  deployLink: string
} {
  const state = getRBProjectState()
  return {
    lovableLink: state.lovableLink,
    githubLink: state.githubLink,
    deployLink: state.deployLink,
  }
}

export function resetRBProject(): void {
  if (!isClient()) return
  
  const resetState: RBProjectState = {
    steps: defaultSteps,
    lovableLink: '',
    githubLink: '',
    deployLink: '',
    currentStep: 1,
  }
  
  saveRBProjectState(resetState)
}

export const STEP_LABELS: Record<RBStep, string> = {
  1: 'Problem Definition',
  2: 'Market Research',
  3: 'Architecture',
  4: 'High-Level Design',
  5: 'Low-Level Design',
  6: 'Build',
  7: 'Test',
  8: 'Ship',
}

export const STEP_ROUTES: Record<RBStep, string> = {
  1: '/rb/01-problem',
  2: '/rb/02-market',
  3: '/rb/03-architecture',
  4: '/rb/04-hld',
  5: '/rb/05-lld',
  6: '/rb/06-build',
  7: '/rb/07-test',
  8: '/rb/08-ship',
}
