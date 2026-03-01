export interface PersonalInfo {
  name: string
  email: string
  phone: string
  location: string
}

export interface Education {
  id: string
  school: string
  degree: string
  field: string
  startDate: string
  endDate: string
}

export interface Experience {
  id: string
  company: string
  role: string
  startDate: string
  endDate: string
  description: string
}

export interface Project {
  id: string
  name: string
  description: string
  technologies: string[]
  liveUrl?: string
  githubUrl?: string
}

export interface Links {
  github: string
  linkedin: string
}

export interface CategorizedSkills {
  technical: string[]
  soft: string[]
  tools: string[]
}

export interface ResumeData {
  personalInfo: PersonalInfo
  summary: string
  education: Education[]
  experience: Experience[]
  projects: Project[]
  skills: CategorizedSkills
  links: Links
}

export const defaultResumeData: ResumeData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    location: '',
  },
  summary: '',
  education: [],
  experience: [],
  projects: [],
  skills: {
    technical: [],
    soft: [],
    tools: [],
  },
  links: {
    github: '',
    linkedin: '',
  },
}

export const sampleResumeData: ResumeData = {
  personalInfo: {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
  },
  summary: 'Software engineer with 5+ years of experience building scalable web applications. Passionate about clean code, user experience, and mentoring junior developers.',
  education: [
    {
      id: '1',
      school: 'Stanford University',
      degree: 'Bachelor of Science',
      field: 'Computer Science',
      startDate: '2015',
      endDate: '2019',
    },
  ],
  experience: [
    {
      id: '1',
      company: 'TechCorp Inc.',
      role: 'Senior Software Engineer',
      startDate: '2021',
      endDate: 'Present',
      description: 'Led development of microservices architecture serving 1M+ users. Mentored team of 5 engineers.',
    },
    {
      id: '2',
      company: 'StartupXYZ',
      role: 'Software Engineer',
      startDate: '2019',
      endDate: '2021',
      description: 'Built full-stack features using React and Node.js. Improved app performance by 40%.',
    },
  ],
  projects: [
    {
      id: '1',
      name: 'Open Source Dashboard',
      description: 'Real-time analytics dashboard for monitoring system metrics.',
      technologies: ['React', 'TypeScript', 'D3.js'],
      githubUrl: 'github.com/alex/dashboard',
    },
  ],
  skills: {
    technical: ['TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL', 'GraphQL'],
    soft: ['Team Leadership', 'Problem Solving', 'Communication'],
    tools: ['Git', 'Docker', 'AWS'],
  },
  links: {
    github: 'github.com/alexjohnson',
    linkedin: 'linkedin.com/in/alexjohnson',
  },
}
