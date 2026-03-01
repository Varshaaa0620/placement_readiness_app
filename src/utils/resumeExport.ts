import { ResumeData } from '../types/resume'

export function generatePlainTextResume(resume: ResumeData): string {
  const lines: string[] = []

  // Name
  if (resume.personalInfo.name) {
    lines.push(resume.personalInfo.name)
    lines.push('')
  }

  // Contact
  const contactParts: string[] = []
  if (resume.personalInfo.location) contactParts.push(resume.personalInfo.location)
  if (resume.personalInfo.email) contactParts.push(resume.personalInfo.email)
  if (resume.personalInfo.phone) contactParts.push(resume.personalInfo.phone)
  if (contactParts.length > 0) {
    lines.push(contactParts.join(' | '))
    lines.push('')
  }

  // Links
  const links: string[] = []
  if (resume.links.linkedin) links.push(`LinkedIn: ${resume.links.linkedin}`)
  if (resume.links.github) links.push(`GitHub: ${resume.links.github}`)
  if (links.length > 0) {
    lines.push(links.join(' | '))
    lines.push('')
  }

  // Summary
  if (resume.summary) {
    lines.push('SUMMARY')
    lines.push('-'.repeat(50))
    lines.push(resume.summary)
    lines.push('')
  }

  // Experience
  if (resume.experience.length > 0) {
    lines.push('EXPERIENCE')
    lines.push('-'.repeat(50))
    resume.experience.forEach((exp) => {
      lines.push(`${exp.role} | ${exp.company}`)
      lines.push(`${exp.startDate} - ${exp.endDate}`)
      if (exp.description) {
        lines.push(exp.description)
      }
      lines.push('')
    })
  }

  // Education
  if (resume.education.length > 0) {
    lines.push('EDUCATION')
    lines.push('-'.repeat(50))
    resume.education.forEach((edu) => {
      lines.push(`${edu.school}`)
      lines.push(`${edu.degree}${edu.degree && edu.field ? ', ' : ''}${edu.field}`)
      lines.push(`${edu.startDate} - ${edu.endDate}`)
      lines.push('')
    })
  }

  // Projects
  if (resume.projects.length > 0) {
    lines.push('PROJECTS')
    lines.push('-'.repeat(50))
    resume.projects.forEach((proj) => {
      lines.push(`${proj.name}`)
      if (proj.technologies.length > 0) {
        lines.push(`Technologies: ${proj.technologies.join(', ')}`)
      }
      if (proj.description) {
        lines.push(proj.description)
      }
      if (proj.liveUrl) {
        lines.push(`Live: ${proj.liveUrl}`)
      }
      if (proj.githubUrl) {
        lines.push(`GitHub: ${proj.githubUrl}`)
      }
      lines.push('')
    })
  }

  // Skills
  const allSkills = [
    ...resume.skills.technical,
    ...resume.skills.soft,
    ...resume.skills.tools,
  ]
  if (allSkills.length > 0) {
    lines.push('SKILLS')
    lines.push('-'.repeat(50))
    if (resume.skills.technical.length > 0) {
      lines.push(`Technical: ${resume.skills.technical.join(', ')}`)
    }
    if (resume.skills.soft.length > 0) {
      lines.push(`Soft Skills: ${resume.skills.soft.join(', ')}`)
    }
    if (resume.skills.tools.length > 0) {
      lines.push(`Tools: ${resume.skills.tools.join(', ')}`)
    }
    lines.push('')
  }

  return lines.join('\n')
}

export async function copyResumeAsText(resume: ResumeData): Promise<boolean> {
  const text = generatePlainTextResume(resume)
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    return false
  }
}

export interface ValidationWarning {
  type: 'incomplete'
  message: string
}

export function validateResumeForExport(resume: ResumeData): ValidationWarning[] {
  const warnings: ValidationWarning[] = []

  // Check for name
  if (!resume.personalInfo.name.trim()) {
    warnings.push({
      type: 'incomplete',
      message: 'Your resume may look incomplete: Name is missing.',
    })
  }

  // Check for at least one project or experience
  if (resume.experience.length === 0 && resume.projects.length === 0) {
    warnings.push({
      type: 'incomplete',
      message: 'Your resume may look incomplete: Add at least one project or experience.',
    })
  }

  return warnings
}
