import { ResumeData } from '../types/resume'

export interface ATSScore {
  score: number
  breakdown: {
    summary: number
    projects: number
    experience: number
    skills: number
    links: number
    measurableImpact: number
    education: number
  }
  suggestions: string[]
}

export function calculateATSScore(resume: ResumeData): ATSScore {
  const breakdown = {
    summary: 0,
    projects: 0,
    experience: 0,
    skills: 0,
    links: 0,
    measurableImpact: 0,
    education: 0,
  }

  // +15 if summary length is 40-120 words
  const summaryWordCount = resume.summary.trim().split(/\s+/).filter(w => w.length > 0).length
  if (summaryWordCount >= 40 && summaryWordCount <= 120) {
    breakdown.summary = 15
  }

  // +10 if at least 2 projects
  if (resume.projects.length >= 2) {
    breakdown.projects = 10
  }

  // +10 if at least 1 experience entry
  if (resume.experience.length >= 1) {
    breakdown.experience = 10
  }

  // +10 if skills list has >= 8 items total across all categories
  const totalSkills = resume.skills.technical.length + resume.skills.soft.length + resume.skills.tools.length
  if (totalSkills >= 8) {
    breakdown.skills = 10
  }

  // +10 if GitHub or LinkedIn link exists
  if (resume.links.github.trim() || resume.links.linkedin.trim()) {
    breakdown.links = 10
  }

  // +15 if any experience/project bullet contains a number (%, X, k, etc.)
  const hasMeasurableImpact = checkForMeasurableImpact(resume)
  if (hasMeasurableImpact) {
    breakdown.measurableImpact = 15
  }

  // +10 if education section has complete fields
  const hasCompleteEducation = resume.education.some(
    edu => edu.school.trim() && edu.degree.trim() && edu.field.trim()
  )
  if (hasCompleteEducation) {
    breakdown.education = 10
  }

  // Calculate total and cap at 100
  const total = Object.values(breakdown).reduce((sum, val) => sum + val, 0)
  const score = Math.min(total, 100)

  // Generate suggestions (max 3)
  const suggestions = generateSuggestions(resume, breakdown)

  return {
    score,
    breakdown,
    suggestions,
  }
}

function checkForMeasurableImpact(resume: ResumeData): boolean {
  // Check experience descriptions for numbers
  const experienceHasNumbers = resume.experience.some(exp => {
    const text = exp.description.toLowerCase()
    // Look for patterns like: %, numbers, k (thousands), m (millions), x (times)
    return /\d+%?|\d+k|\d+m|\d+x|\d+\s*(percent|times|x)|\$\d+/.test(text)
  })

  // Check project descriptions for numbers
  const projectsHaveNumbers = resume.projects.some(proj => {
    const text = proj.description.toLowerCase()
    return /\d+%?|\d+k|\d+m|\d+x|\d+\s*(percent|times|x)|\$\d+/.test(text)
  })

  return experienceHasNumbers || projectsHaveNumbers
}

function generateSuggestions(resume: ResumeData, breakdown: ATSScore['breakdown']): string[] {
  const suggestions: string[] = []

  // Check summary
  const summaryWordCount = resume.summary.trim().split(/\s+/).filter(w => w.length > 0).length
  if (summaryWordCount < 40 || summaryWordCount > 120) {
    suggestions.push('Write a stronger summary (40–120 words).')
  }

  // Check projects
  if (resume.projects.length < 2) {
    suggestions.push('Add at least 2 projects.')
  }

  // Check measurable impact
  if (!breakdown.measurableImpact) {
    suggestions.push('Add measurable impact (numbers) in bullets.')
  }

  // Check skills
  const totalSkillsCount = resume.skills.technical.length + resume.skills.soft.length + resume.skills.tools.length
  if (totalSkillsCount < 8) {
    suggestions.push('Add more skills (target 8+).')
  }

  // Check links
  if (!resume.links.github.trim() && !resume.links.linkedin.trim()) {
    suggestions.push('Add GitHub or LinkedIn link.')
  }

  // Check experience
  if (resume.experience.length === 0) {
    suggestions.push('Add at least 1 work experience entry.')
  }

  // Return max 3 suggestions, prioritizing the most important ones
  return suggestions.slice(0, 3)
}
