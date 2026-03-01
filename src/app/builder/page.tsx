'use client'

import React, { useState, useEffect } from 'react'
import { ResumeNav } from '../../components/ResumeNav'
import { TemplateSwitcher } from '../../components/TemplateSwitcher'
import { colors, spacing } from '../../styles/designTokens'
import { ResumeData, defaultResumeData, sampleResumeData, Education, Experience, Project } from '../../types/resume'
import { ResumeTemplate, getStoredTemplate, setStoredTemplate } from '../../types/template'
import { saveResumeData, loadResumeData, clearResumeData } from '../../utils/resumeStorage'
import { calculateATSScore, ATSScore } from '../../utils/atsScoring'
import { getBulletInputGuidance } from '../../utils/bulletGuidance'
import { getTopImprovements, ImprovementItem } from '../../utils/improvementPanel'

export default function BuilderPage() {
  const [resume, setResume] = useState<ResumeData>(defaultResumeData)
  const [atsScore, setAtsScore] = useState<ATSScore | null>(null)
  const [improvements, setImprovements] = useState<ImprovementItem[]>([])
  const [template, setTemplate] = useState<ResumeTemplate>('classic')
  const [isMounted, setIsMounted] = useState(false)

  // Load from localStorage on mount
  useEffect(() => {
    const savedData = loadResumeData()
    const savedTemplate = getStoredTemplate()
    setResume(savedData)
    setTemplate(savedTemplate)
    const score = calculateATSScore(savedData)
    setAtsScore(score)
    setImprovements(getTopImprovements(savedData, score))
    setIsMounted(true)
  }, [])

  // Auto-save to localStorage whenever resume changes
  useEffect(() => {
    if (isMounted) {
      saveResumeData(resume)
      const score = calculateATSScore(resume)
      setAtsScore(score)
      setImprovements(getTopImprovements(resume, score))
    }
  }, [resume, isMounted])

  const handleTemplateChange = (newTemplate: ResumeTemplate) => {
    setTemplate(newTemplate)
    setStoredTemplate(newTemplate)
  }

  const updatePersonalInfo = (field: keyof ResumeData['personalInfo'], value: string) => {
    setResume((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [field]: value },
    }))
  }

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      school: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
    }
    setResume((prev) => ({ ...prev, education: [...prev.education, newEducation] }))
  }

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    setResume((prev) => ({
      ...prev,
      education: prev.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }))
  }

  const removeEducation = (id: string) => {
    setResume((prev) => ({ ...prev, education: prev.education.filter((edu) => edu.id !== id) }))
  }

  const addExperience = () => {
    const newExperience: Experience = {
      id: Date.now().toString(),
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    }
    setResume((prev) => ({ ...prev, experience: [...prev.experience, newExperience] }))
  }

  const updateExperience = (id: string, field: keyof Experience, value: string) => {
    setResume((prev) => ({
      ...prev,
      experience: prev.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }))
  }

  const removeExperience = (id: string) => {
    setResume((prev) => ({ ...prev, experience: prev.experience.filter((exp) => exp.id !== id) }))
  }

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
    }
    setResume((prev) => ({ ...prev, projects: [...prev.projects, newProject] }))
  }

  const updateProject = (id: string, field: keyof Project, value: string) => {
    setResume((prev) => ({
      ...prev,
      projects: prev.projects.map((proj) => (proj.id === id ? { ...proj, [field]: value } : proj)),
    }))
  }

  const removeProject = (id: string) => {
    setResume((prev) => ({ ...prev, projects: prev.projects.filter((proj) => proj.id !== id) }))
  }

  const handleSkillsChange = (value: string) => {
    const skills = value.split(',').map((s) => s.trim()).filter(Boolean)
    setResume((prev) => ({ ...prev, skills }))
  }

  const loadSampleData = () => {
    setResume(sampleResumeData)
  }

  const clearData = () => {
    if (confirm('Clear all resume data? This cannot be undone.')) {
      clearResumeData()
      setResume(defaultResumeData)
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: spacing.sm,
    fontSize: '15px',
    border: `1px solid ${colors.border.default}`,
    borderRadius: '4px',
    fontFamily: 'inherit',
    marginBottom: spacing.sm,
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '14px',
    fontWeight: 500,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  }

  const sectionStyle: React.CSSProperties = {
    backgroundColor: 'white',
    border: `1px solid ${colors.border.default}`,
    borderRadius: '4px',
    padding: spacing.md,
    marginBottom: spacing.md,
  }

  const sectionTitleStyle: React.CSSProperties = {
    fontFamily: 'Georgia, serif',
    fontSize: '18px',
    fontWeight: 600,
    color: colors.text.primary,
    marginBottom: spacing.md,
    marginTop: 0,
  }

  const buttonStyle: React.CSSProperties = {
    padding: `${spacing.xs} ${spacing.sm}`,
    backgroundColor: colors.accent,
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  }

  const secondaryButtonStyle: React.CSSProperties = {
    padding: `${spacing.xs} ${spacing.sm}`,
    backgroundColor: colors.bg.subtle,
    color: colors.text.primary,
    border: `1px solid ${colors.border.subtle}`,
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: 500,
    cursor: 'pointer',
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: colors.background }}>
      <ResumeNav />
      
      <div style={{ display: 'flex', height: 'calc(100vh - 57px)' }}>
        {/* Left Column - Form */}
        <div
          style={{
            width: '50%',
            overflow: 'auto',
            padding: spacing.md,
            borderRight: `1px solid ${colors.border.default}`,
          }}
        >
          {/* Action Buttons */}
          <div style={{ marginBottom: spacing.md, display: 'flex', gap: spacing.sm }}>
            <button onClick={loadSampleData} style={secondaryButtonStyle}>
              Load Sample Data
            </button>
            <button onClick={clearData} style={secondaryButtonStyle}>
              Clear All
            </button>
          </div>

          {/* Personal Info */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Personal Information</h2>
            <div style={{ display: 'grid', gap: spacing.sm }}>
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  value={resume.personalInfo.name}
                  onChange={(e) => updatePersonalInfo('name', e.target.value)}
                  placeholder="John Doe"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input
                  type="email"
                  value={resume.personalInfo.email}
                  onChange={(e) => updatePersonalInfo('email', e.target.value)}
                  placeholder="john@email.com"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input
                  type="tel"
                  value={resume.personalInfo.phone}
                  onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>Location</label>
                <input
                  type="text"
                  value={resume.personalInfo.location}
                  onChange={(e) => updatePersonalInfo('location', e.target.value)}
                  placeholder="San Francisco, CA"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Summary */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Professional Summary</h2>
            <textarea
              value={resume.summary}
              onChange={(e) => setResume((prev) => ({ ...prev, summary: e.target.value }))}
              placeholder="Brief overview of your professional background..."
              style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
            />
          </div>

          {/* Education */}
          <div style={sectionStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
              <h2 style={{ ...sectionTitleStyle, marginBottom: 0 }}>Education</h2>
              <button onClick={addEducation} style={buttonStyle}>+ Add</button>
            </div>
            {resume.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: spacing.md, padding: spacing.sm, backgroundColor: colors.bg.subtle, borderRadius: '4px' }}>
                <input
                  type="text"
                  placeholder="School/University"
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                  style={{ ...inputStyle, marginBottom: spacing.xs }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.xs }}>
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                    style={{ ...inputStyle, marginBottom: spacing.xs }}
                  />
                  <input
                    type="text"
                    placeholder="Field of Study"
                    value={edu.field}
                    onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                    style={{ ...inputStyle, marginBottom: spacing.xs }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.xs }}>
                  <input
                    type="text"
                    placeholder="Start Year"
                    value={edu.startDate}
                    onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                    style={{ ...inputStyle, marginBottom: 0 }}
                  />
                  <input
                    type="text"
                    placeholder="End Year"
                    value={edu.endDate}
                    onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                    style={{ ...inputStyle, marginBottom: 0 }}
                  />
                </div>
                <button onClick={() => removeEducation(edu.id)} style={{ ...secondaryButtonStyle, marginTop: spacing.xs, fontSize: '12px' }}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Experience */}
          <div style={sectionStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
              <h2 style={{ ...sectionTitleStyle, marginBottom: 0 }}>Experience</h2>
              <button onClick={addExperience} style={buttonStyle}>+ Add</button>
            </div>
            {resume.experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: spacing.md, padding: spacing.sm, backgroundColor: colors.bg.subtle, borderRadius: '4px' }}>
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  style={{ ...inputStyle, marginBottom: spacing.xs }}
                />
                <input
                  type="text"
                  placeholder="Role/Position"
                  value={exp.role}
                  onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                  style={{ ...inputStyle, marginBottom: spacing.xs }}
                />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: spacing.xs }}>
                  <input
                    type="text"
                    placeholder="Start Date"
                    value={exp.startDate}
                    onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                    style={{ ...inputStyle, marginBottom: spacing.xs }}
                  />
                  <input
                    type="text"
                    placeholder="End Date"
                    value={exp.endDate}
                    onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                    style={{ ...inputStyle, marginBottom: spacing.xs }}
                  />
                </div>
                <textarea
                  placeholder="Description of your responsibilities and achievements..."
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  style={{ ...inputStyle, minHeight: '80px', marginBottom: spacing.xs }}
                />
                {/* Bullet Guidance for Experience */}
                {exp.description && getBulletInputGuidance(exp.description).length > 0 && (
                  <div style={{ marginBottom: spacing.xs }}>
                    {getBulletInputGuidance(exp.description).map((guidance, idx) => (
                      <div
                        key={idx}
                        style={{
                          fontSize: '12px',
                          color: colors.semantic.warning,
                          fontStyle: 'italic',
                          padding: '2px 0',
                        }}
                      >
                        {guidance}
                      </div>
                    ))}
                  </div>
                )}
                <button onClick={() => removeExperience(exp.id)} style={{ ...secondaryButtonStyle, marginTop: 0, fontSize: '12px' }}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Projects */}
          <div style={sectionStyle}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.md }}>
              <h2 style={{ ...sectionTitleStyle, marginBottom: 0 }}>Projects</h2>
              <button onClick={addProject} style={buttonStyle}>+ Add</button>
            </div>
            {resume.projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: spacing.md, padding: spacing.sm, backgroundColor: colors.bg.subtle, borderRadius: '4px' }}>
                <input
                  type="text"
                  placeholder="Project Name"
                  value={proj.name}
                  onChange={(e) => updateProject(proj.id, 'name', e.target.value)}
                  style={{ ...inputStyle, marginBottom: spacing.xs }}
                />
                <textarea
                  placeholder="Project description..."
                  value={proj.description}
                  onChange={(e) => updateProject(proj.id, 'description', e.target.value)}
                  style={{ ...inputStyle, minHeight: '60px', marginBottom: spacing.xs }}
                />
                {/* Bullet Guidance for Projects */}
                {proj.description && getBulletInputGuidance(proj.description).length > 0 && (
                  <div style={{ marginBottom: spacing.xs }}>
                    {getBulletInputGuidance(proj.description).map((guidance, idx) => (
                      <div
                        key={idx}
                        style={{
                          fontSize: '12px',
                          color: colors.semantic.warning,
                          fontStyle: 'italic',
                          padding: '2px 0',
                        }}
                      >
                        {guidance}
                      </div>
                    ))}
                  </div>
                )}
                <input
                  type="text"
                  placeholder="Technologies used (comma separated)"
                  value={proj.technologies}
                  onChange={(e) => updateProject(proj.id, 'technologies', e.target.value)}
                  style={{ ...inputStyle, marginBottom: spacing.xs }}
                />
                <input
                  type="text"
                  placeholder="Project Link (optional)"
                  value={proj.link || ''}
                  onChange={(e) => updateProject(proj.id, 'link', e.target.value)}
                  style={{ ...inputStyle, marginBottom: 0 }}
                />
                <button onClick={() => removeProject(proj.id)} style={{ ...secondaryButtonStyle, marginTop: spacing.xs, fontSize: '12px' }}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* Skills */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Skills</h2>
            <input
              type="text"
              value={resume.skills.join(', ')}
              onChange={(e) => handleSkillsChange(e.target.value)}
              placeholder="React, TypeScript, Node.js, Python..."
              style={inputStyle}
            />
            <p style={{ fontSize: '13px', color: colors.text.tertiary, margin: 0 }}>
              Separate skills with commas
            </p>
          </div>

          {/* Links */}
          <div style={sectionStyle}>
            <h2 style={sectionTitleStyle}>Links</h2>
            <div style={{ display: 'grid', gap: spacing.sm }}>
              <div>
                <label style={labelStyle}>GitHub</label>
                <input
                  type="text"
                  value={resume.links.github}
                  onChange={(e) => setResume((prev) => ({ ...prev, links: { ...prev.links, github: e.target.value } }))}
                  placeholder="github.com/username"
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>LinkedIn</label>
                <input
                  type="text"
                  value={resume.links.linkedin}
                  onChange={(e) => setResume((prev) => ({ ...prev, links: { ...prev.links, linkedin: e.target.value } }))}
                  placeholder="linkedin.com/in/username"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Live Preview */}
        <div
          style={{
            width: '50%',
            overflow: 'auto',
            padding: spacing.md,
            backgroundColor: colors.bg.subtle,
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              border: `1px solid ${colors.border.default}`,
              borderRadius: '4px',
              padding: spacing.lg,
              minHeight: '100%',
            }}
          >
            <h3
              style={{
                fontSize: '12px',
                fontWeight: 600,
                color: colors.text.tertiary,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: spacing.md,
              }}
            >
              Live Preview
            </h3>

            {/* Template Switcher */}
            <div style={{ marginBottom: spacing.md }}>
              <TemplateSwitcher
                currentTemplate={template}
                onTemplateChange={handleTemplateChange}
              />
            </div>

            {/* ATS Score Meter */}
            {atsScore && (
              <div
                style={{
                  backgroundColor: 'white',
                  border: `1px solid ${colors.border.default}`,
                  borderRadius: '4px',
                  padding: spacing.md,
                  marginBottom: spacing.md,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: spacing.sm,
                  }}
                >
                  <span
                    style={{
                      fontSize: '13px',
                      fontWeight: 600,
                      color: colors.text.primary,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    ATS Readiness Score
                  </span>
                  <span
                    style={{
                      fontSize: '24px',
                      fontWeight: 600,
                      color: atsScore.score >= 80 ? colors.semantic.success : atsScore.score >= 50 ? colors.semantic.warning : colors.accent,
                    }}
                  >
                    {atsScore.score}
                  </span>
                </div>
                <div
                  style={{
                    height: '8px',
                    backgroundColor: colors.border.subtle,
                    borderRadius: '4px',
                    overflow: 'hidden',
                    marginBottom: atsScore.suggestions.length > 0 ? spacing.sm : 0,
                  }}
                >
                  <div
                    style={{
                      width: `${atsScore.score}%`,
                      height: '100%',
                      backgroundColor: atsScore.score >= 80 ? colors.semantic.success : atsScore.score >= 50 ? colors.semantic.warning : colors.accent,
                      transition: 'width 300ms ease',
                    }}
                  />
                </div>
                {atsScore.suggestions.length > 0 && (
                  <div style={{ marginTop: spacing.sm }}>
                    {atsScore.suggestions.map((suggestion, index) => (
                      <div
                        key={index}
                        style={{
                          fontSize: '13px',
                          color: colors.text.secondary,
                          padding: `${spacing.xs} 0`,
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: spacing.xs,
                        }}
                      >
                        <span style={{ color: colors.accent }}>•</span>
                        <span>{suggestion}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Top 3 Improvements */}
            {improvements.length > 0 && (
              <div
                style={{
                  backgroundColor: 'white',
                  border: `1px solid ${colors.border.default}`,
                  borderRadius: '4px',
                  padding: spacing.md,
                  marginBottom: spacing.md,
                }}
              >
                <h4
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: colors.text.primary,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    marginBottom: spacing.sm,
                    marginTop: 0,
                  }}
                >
                  Top 3 Improvements
                </h4>
                <div>
                  {improvements.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        fontSize: '13px',
                        color: colors.text.secondary,
                        padding: `${spacing.xs} 0`,
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: spacing.xs,
                      }}
                    >
                      <span
                        style={{
                          color:
                            item.priority === 'high'
                              ? colors.semantic.error
                              : item.priority === 'medium'
                              ? colors.semantic.warning
                              : colors.text.tertiary,
                        }}
                      >
                        {item.priority === 'high' ? '!' : item.priority === 'medium' ? '•' : '◦'}
                      </span>
                      <span>{item.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resume Preview Shell */}
            <div
              style={{
                border: `1px solid ${colors.border.subtle}`,
                borderRadius: '4px',
                padding: spacing.lg,
                backgroundColor: 'white',
              }}
            >
              {/* Header */}
              <div style={{ textAlign: 'center', marginBottom: spacing.md, paddingBottom: spacing.md, borderBottom: `1px solid ${colors.border.subtle}` }}>
                <h1
                  style={{
                    fontFamily: 'Georgia, serif',
                    fontSize: '28px',
                    fontWeight: 600,
                    color: colors.text.primary,
                    marginBottom: spacing.xs,
                  }}
                >
                  {resume.personalInfo.name || 'Your Name'}
                </h1>
                <p style={{ fontSize: '14px', color: colors.text.secondary, margin: 0 }}>
                  {resume.personalInfo.location}
                  {resume.personalInfo.location && resume.personalInfo.email && ' | '}
                  {resume.personalInfo.email}
                  {resume.personalInfo.email && resume.personalInfo.phone && ' | '}
                  {resume.personalInfo.phone}
                </p>
                <p style={{ fontSize: '13px', color: colors.text.tertiary, marginTop: spacing.xs }}>
                  {resume.links.github && `GitHub: ${resume.links.github}`}
                  {resume.links.github && resume.links.linkedin && ' | '}
                  {resume.links.linkedin && `LinkedIn: ${resume.links.linkedin}`}
                </p>
              </div>

              {/* Summary */}
              {resume.summary && (
                <div style={{ marginBottom: spacing.md }}>
                  <h2
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: colors.text.primary,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: `1px solid ${colors.border.subtle}`,
                      paddingBottom: spacing.xs,
                      marginBottom: spacing.sm,
                    }}
                  >
                    Summary
                  </h2>
                  <p style={{ fontSize: '14px', color: colors.text.secondary, lineHeight: '1.6', margin: 0 }}>
                    {resume.summary}
                  </p>
                </div>
              )}

              {/* Experience */}
              {resume.experience.length > 0 && (
                <div style={{ marginBottom: spacing.md }}>
                  <h2
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: colors.text.primary,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: `1px solid ${colors.border.subtle}`,
                      paddingBottom: spacing.xs,
                      marginBottom: spacing.sm,
                    }}
                  >
                    Experience
                  </h2>
                  {resume.experience.map((exp) => (
                    <div key={exp.id} style={{ marginBottom: spacing.sm }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: 600, color: colors.text.primary, margin: 0 }}>
                          {exp.role || 'Role'}
                        </h3>
                        <span style={{ fontSize: '13px', color: colors.text.tertiary }}>
                          {exp.startDate} - {exp.endDate}
                        </span>
                      </div>
                      <p style={{ fontSize: '14px', color: colors.text.secondary, margin: 0 }}>
                        {exp.company}
                      </p>
                      <p style={{ fontSize: '13px', color: colors.text.secondary, lineHeight: '1.5', marginTop: spacing.xs }}>
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Education */}
              {resume.education.length > 0 && (
                <div style={{ marginBottom: spacing.md }}>
                  <h2
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: colors.text.primary,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: `1px solid ${colors.border.subtle}`,
                      paddingBottom: spacing.xs,
                      marginBottom: spacing.sm,
                    }}
                  >
                    Education
                  </h2>
                  {resume.education.map((edu) => (
                    <div key={edu.id} style={{ marginBottom: spacing.sm }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: 600, color: colors.text.primary, margin: 0 }}>
                          {edu.school || 'School'}
                        </h3>
                        <span style={{ fontSize: '13px', color: colors.text.tertiary }}>
                          {edu.startDate} - {edu.endDate}
                        </span>
                      </div>
                      <p style={{ fontSize: '14px', color: colors.text.secondary, margin: 0 }}>
                        {edu.degree}{edu.degree && edu.field && ', '}{edu.field}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Projects */}
              {resume.projects.length > 0 && (
                <div style={{ marginBottom: spacing.md }}>
                  <h2
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: colors.text.primary,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: `1px solid ${colors.border.subtle}`,
                      paddingBottom: spacing.xs,
                      marginBottom: spacing.sm,
                    }}
                  >
                    Projects
                  </h2>
                  {resume.projects.map((proj) => (
                    <div key={proj.id} style={{ marginBottom: spacing.sm }}>
                      <h3 style={{ fontSize: '15px', fontWeight: 600, color: colors.text.primary, margin: 0 }}>
                        {proj.name || 'Project Name'}
                      </h3>
                      <p style={{ fontSize: '13px', color: colors.text.tertiary, margin: 0 }}>
                        {proj.technologies}
                      </p>
                      <p style={{ fontSize: '13px', color: colors.text.secondary, lineHeight: '1.5', marginTop: spacing.xs }}>
                        {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Skills */}
              {resume.skills.length > 0 && (
                <div>
                  <h2
                    style={{
                      fontSize: '14px',
                      fontWeight: 600,
                      color: colors.text.primary,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                      borderBottom: `1px solid ${colors.border.subtle}`,
                      paddingBottom: spacing.xs,
                      marginBottom: spacing.sm,
                    }}
                  >
                    Skills
                  </h2>
                  <p style={{ fontSize: '14px', color: colors.text.secondary, margin: 0 }}>
                    {resume.skills.join(' • ')}
                  </p>
                </div>
              )}

              {/* Empty State */}
              {!resume.personalInfo.name &&
                !resume.summary &&
                resume.experience.length === 0 &&
                resume.education.length === 0 &&
                resume.projects.length === 0 &&
                resume.skills.length === 0 && (
                  <div style={{ textAlign: 'center', padding: spacing.xl, color: colors.text.tertiary }}>
                    <p>Start filling out the form to see your resume preview</p>
                  </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
