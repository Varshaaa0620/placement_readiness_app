/**
 * Test Checklist Manager
 * Handles state persistence for the built-in test checklist system
 */

export const TEST_ITEMS = [
  {
    id: 'prefs-persist',
    label: 'Preferences persist after refresh',
    tooltip: 'Set preferences, refresh page, confirm they load',
  },
  {
    id: 'match-score',
    label: 'Match score calculates correctly',
    tooltip: 'View dashboard with preferences, verify scores appear and are 0-100',
  },
  {
    id: 'show-only-matches',
    label: '"Show only matches" toggle works',
    tooltip: 'Toggle on/off on dashboard, confirm jobs filter correctly',
  },
  {
    id: 'save-persist',
    label: 'Save job persists after refresh',
    tooltip: 'Save a job, refresh page, confirm it appears in /saved',
  },
  {
    id: 'apply-opens',
    label: 'Apply opens in new tab',
    tooltip: 'Click Apply button on any job, confirm it opens external link',
  },
  {
    id: 'status-persist',
    label: 'Status update persists after refresh',
    tooltip: 'Change job status, refresh page, confirm status remains',
  },
  {
    id: 'status-filter',
    label: 'Status filter works correctly',
    tooltip: 'Filter by status, confirm only jobs with that status show',
  },
  {
    id: 'digest-top-10',
    label: 'Digest generates top 10 by score',
    tooltip: 'Generate digest with preferences, verify 10 jobs appear sorted by match',
  },
  {
    id: 'digest-persist',
    label: 'Digest persists for the day',
    tooltip: 'Generate digest, close tab, reopen, confirm same digest loads',
  },
  {
    id: 'no-errors',
    label: 'No console errors on main pages',
    tooltip: 'Open DevTools console, browse pages, confirm no red errors',
  },
] as const

export type TestItemId = (typeof TEST_ITEMS)[number]['id']

export interface TestChecklistState {
  [key: string]: boolean
}

/**
 * Check if we're on the client side
 */
function isClient(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined'
}

/**
 * Get all test checklist states
 */
export function getTestChecklistState(): TestChecklistState {
  if (!isClient()) return {}

  const stored = localStorage.getItem('jobTrackerTestStatus')
  if (!stored) {
    // Initialize all as unchecked
    const initial = {} as TestChecklistState
    TEST_ITEMS.forEach((item) => {
      initial[item.id] = false
    })
    return initial
  }

  try {
    return JSON.parse(stored) as TestChecklistState
  } catch (e) {
    console.error('Error parsing test checklist state:', e)
    return {}
  }
}

/**
 * Set test item checked status
 */
export function setTestItemStatus(itemId: string, checked: boolean): void {
  if (!isClient()) return

  const state = getTestChecklistState()
  state[itemId] = checked
  localStorage.setItem('jobTrackerTestStatus', JSON.stringify(state))
}

/**
 * Toggle test item status
 */
export function toggleTestItem(itemId: string): void {
  const state = getTestChecklistState()
  const current = state[itemId] ?? false
  setTestItemStatus(itemId, !current)
}

/**
 * Get number of tests passed
 */
export function getTestsPassed(): number {
  const state = getTestChecklistState()
  return TEST_ITEMS.filter((item) => state[item.id]).length
}

/**
 * Check if all tests are passed
 */
export function areAllTestsPassed(): boolean {
  return getTestsPassed() === TEST_ITEMS.length
}

/**
 * Reset all test statuses
 */
export function resetTestChecklist(): void {
  if (!isClient()) return

  localStorage.removeItem('jobTrackerTestStatus')
}
