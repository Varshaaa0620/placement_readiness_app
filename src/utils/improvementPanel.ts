import { ResumeData } from '../types/resume'
import { ATSScore } from './atsScoring'

export interface ImprovementItem {
  priority: 'high' | 'medium' | 'low'
  message: string
}

export function getTopImprovements(resume: ResumeData, atsScore: ATSScore): ImprovementItem[] {
  const improvements: ImprovementItem[] = []

  // Check projects
  if (resume.projects.length < 2) {
    improvements.push({
      priority: 'high',
      message: 'Add at least 2 projects to showcase your work.',
    })
  }

  // Check measurable impact
  if (!atsScore.breakdown.measurableImpact) {
    improvements.push({
      priority: 'high',
      message: 'Add measurable impact (numbers) to your experience and projects.',
    })
  }

  // Check summary
  const summaryWordCount = resume.summary.trim().split(/\s+/).filter(w => w.length > 0).length
  if (summaryWordCount < 40) {
    improvements.push({
      priority: 'medium',
      message: 'Expand your summary to 40-120 words for better impact.',
    })
  }

  // Check skills
  const totalSkills = resume.skills.technical.length + resume.skills.soft.length + resume.skills.tools.length
  if (totalSkills < 8) {
    improvements.push({
      priority: 'medium',
      message: 'Add more skills (target 8+) to improve ATS matching.',
    })
  }

  // Check experience
  if (resume.experience.length === 0) {
    improvements.push({
      priority: 'high',
      message: 'Add work experience or internship/project work.',
    })
  }

  // Check links
  if (!resume.links.github.trim() && !resume.links.linkedin.trim()) {
    improvements.push({
      priority: 'low',
      message: 'Add GitHub or LinkedIn link to strengthen your profile.',
    })
  }

  // Check education completeness
  if (!atsScore.breakdown.education) {
    improvements.push({
      priority: 'medium',
      message: 'Complete all education fields (school, degree, field).',
    })
  }

  // Sort by priority and return top 3
  const priorityOrder = { high: 0, medium: 1, low: 2 }
  return improvements
    .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
    .slice(0, 3)
}
