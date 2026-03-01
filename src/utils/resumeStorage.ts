import { ResumeData, defaultResumeData, CategorizedSkills, Project } from '../types/resume'

const STORAGE_KEY = 'resumeBuilderData'

export function saveResumeData(data: ResumeData): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
}

function migrateSkills(oldSkills: string[] | CategorizedSkills | undefined): CategorizedSkills {
  // Already migrated
  if (oldSkills && typeof oldSkills === 'object' && 'technical' in oldSkills) {
    return oldSkills as CategorizedSkills
  }
  // Old format: string array
  if (Array.isArray(oldSkills)) {
    return {
      technical: oldSkills,
      soft: [],
      tools: [],
    }
  }
  return defaultResumeData.skills
}

function migrateProject(project: any): Project {
  return {
    id: project.id || '',
    name: project.name || '',
    description: project.description || '',
    // Migrate technologies from string to array
    technologies: Array.isArray(project.technologies) 
      ? project.technologies 
      : typeof project.technologies === 'string' && project.technologies
        ? project.technologies.split(',').map((t: string) => t.trim()).filter(Boolean)
        : [],
    liveUrl: project.liveUrl || project.link || '',
    githubUrl: project.githubUrl || '',
  }
}

export function loadResumeData(): ResumeData {
  if (typeof window === 'undefined') return defaultResumeData
  
  const stored = localStorage.getItem(STORAGE_KEY)
  if (!stored) return defaultResumeData
  
  try {
    const parsed = JSON.parse(stored)
    
    // Migrate data structure
    return {
      personalInfo: parsed.personalInfo || defaultResumeData.personalInfo,
      summary: parsed.summary || '',
      education: parsed.education || [],
      experience: parsed.experience || [],
      projects: (parsed.projects || []).map(migrateProject),
      skills: migrateSkills(parsed.skills),
      links: parsed.links || defaultResumeData.links,
    }
  } catch {
    return defaultResumeData
  }
}

export function clearResumeData(): void {
  if (typeof window === 'undefined') return
  localStorage.removeItem(STORAGE_KEY)
}
