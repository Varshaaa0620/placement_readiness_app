'use client'

import React, { useState, useEffect } from 'react'
import { ResumeNav } from '../../components/ResumeNav'
import { TemplateSwitcher } from '../../components/TemplateSwitcher'
import { loadResumeData } from '../../utils/resumeStorage'
import { ResumeData, defaultResumeData } from '../../types/resume'
import { ResumeTemplate, getStoredTemplate } from '../../types/template'
import { colors, spacing } from '../../styles/designTokens'

export default function PreviewPage() {
  const [resume, setResume] = useState<ResumeData>(defaultResumeData)
  const [template, setTemplate] = useState<ResumeTemplate>('classic')
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setResume(loadResumeData())
    setTemplate(getStoredTemplate())
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  // Template-specific styles
  const getTemplateStyles = (template: ResumeTemplate) => {
    switch (template) {
      case 'modern':
        return {
          container: { padding: '50px', borderLeft: '4px solid #000' },
          header: { textAlign: 'left' as const, borderBottom: '2px solid #000', paddingBottom: '20px' },
          name: { fontSize: '36px', fontWeight: 700, letterSpacing: '0', textTransform: 'none' as const },
          sectionTitle: { borderBottom: '2px solid #000', color: '#000' },
        }
      case 'minimal':
        return {
          container: { padding: '60px', border: 'none' },
          header: { textAlign: 'center' as const, borderBottom: 'none', paddingBottom: '30px' },
          name: { fontSize: '28px', fontWeight: 400, letterSpacing: '4px', textTransform: 'uppercase' as const },
          sectionTitle: { borderBottom: 'none', borderTop: '1px solid #ccc', paddingTop: '10px', color: '#555' },
        }
      default: // classic
        return {
          container: { padding: '60px', border: 'none' },
          header: { textAlign: 'center' as const, borderBottom: '1px solid #000', paddingBottom: '20px' },
          name: { fontSize: '32px', fontWeight: 400, letterSpacing: '2px', textTransform: 'uppercase' as const },
          sectionTitle: { borderBottom: '1px solid #ccc', color: '#000' },
        }
    }
  }

  const styles = getTemplateStyles(template)

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <ResumeNav />

      {/* Template Switcher */}
      <div
        style={{
          maxWidth: '850px',
          margin: '0 auto',
          padding: '20px 20px 0',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <TemplateSwitcher
          currentTemplate={template}
          onTemplateChange={setTemplate}
        />
      </div>

      <div
        style={{
          maxWidth: '850px',
          margin: '0 auto',
          padding: '20px 20px 40px',
        }}
      >
        {/* Resume Paper */}
        <div
          style={{
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            minHeight: '1100px',
            ...styles.container,
          }}
        >
          {/* Header */}
          <div
            style={{
              marginBottom: '30px',
              ...styles.header,
            }}
          >
            <h1
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                color: '#000',
                margin: '0 0 12px 0',
                ...styles.name,
              }}
            >
              {resume.personalInfo.name || 'Your Name'}
            </h1>
            <p
              style={{
                fontSize: '13px',
                color: '#333',
                margin: '0 0 4px 0',
                fontFamily: 'Georgia, serif',
              }}
            >
              {resume.personalInfo.location} | {resume.personalInfo.email} | {resume.personalInfo.phone}
            </p>
            <p
              style={{
                fontSize: '12px',
                color: '#555',
                margin: 0,
                fontFamily: 'Georgia, serif',
              }}
            >
              {resume.links.linkedin} | {resume.links.github}
            </p>
          </div>

          {/* Summary */}
          {resume.summary && (
            <div style={{ marginBottom: '28px' }}>
              <h2
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  paddingBottom: '6px',
                  marginBottom: '12px',
                  ...styles.sectionTitle,
                }}
              >
                Professional Summary
              </h2>
              <p
                style={{
                  fontSize: '13px',
                  color: '#333',
                  lineHeight: '1.7',
                  margin: 0,
                  fontFamily: 'Georgia, serif',
                }}
              >
                {resume.summary}
              </p>
            </div>
          )}

          {/* Experience */}
          {resume.experience.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h2
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  paddingBottom: '6px',
                  marginBottom: '16px',
                  ...styles.sectionTitle,
                }}
              >
                Professional Experience
              </h2>
              {resume.experience.map((exp, index) => (
                <div key={exp.id} style={{ marginBottom: index < resume.experience.length - 1 ? '20px' : 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                      marginBottom: '2px',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#000',
                        margin: 0,
                      }}
                    >
                      {exp.role}
                    </h3>
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#555',
                        fontFamily: 'Georgia, serif',
                        fontStyle: 'italic',
                      }}
                    >
                      {exp.startDate} – {exp.endDate}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#333',
                      margin: '0 0 6px 0',
                      fontFamily: 'Georgia, serif',
                      fontStyle: 'italic',
                    }}
                  >
                    {exp.company}
                  </p>
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#444',
                      lineHeight: '1.6',
                      margin: 0,
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {resume.education.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h2
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  paddingBottom: '6px',
                  marginBottom: '16px',
                  ...styles.sectionTitle,
                }}
              >
                Education
              </h2>
              {resume.education.map((edu, index) => (
                <div key={edu.id} style={{ marginBottom: index < resume.education.length - 1 ? '14px' : 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'baseline',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'Georgia, serif',
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#000',
                        margin: 0,
                      }}
                    >
                      {edu.school}
                    </h3>
                    <span
                      style={{
                        fontSize: '12px',
                        color: '#555',
                        fontFamily: 'Georgia, serif',
                        fontStyle: 'italic',
                      }}
                    >
                      {edu.startDate} – {edu.endDate}
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: '13px',
                      color: '#333',
                      margin: '2px 0 0 0',
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    {edu.degree}{edu.degree && edu.field && ', '}{edu.field}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {resume.projects.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h2
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  paddingBottom: '6px',
                  marginBottom: '16px',
                  ...styles.sectionTitle,
                }}
              >
                Projects
              </h2>
              {resume.projects.map((proj, index) => (
                <div key={proj.id} style={{ marginBottom: index < resume.projects.length - 1 ? '16px' : 0 }}>
                  <h3
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#000',
                      margin: '0 0 2px 0',
                    }}
                  >
                    {proj.name}
                  </h3>
                  <p
                    style={{
                      fontSize: '11px',
                      color: '#666',
                      margin: '0 0 4px 0',
                      fontFamily: 'Georgia, serif',
                      fontStyle: 'italic',
                    }}
                  >
                    {proj.technologies}
                  </p>
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#444',
                      lineHeight: '1.6',
                      margin: 0,
                      fontFamily: 'Georgia, serif',
                    }}
                  >
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
                  fontFamily: 'Georgia, serif',
                  fontSize: '12px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  paddingBottom: '6px',
                  marginBottom: '12px',
                  ...styles.sectionTitle,
                }}
              >
                Skills
              </h2>
              <p
                style={{
                  fontSize: '13px',
                  color: '#333',
                  lineHeight: '1.6',
                  margin: 0,
                  fontFamily: 'Georgia, serif',
                }}
              >
                {resume.skills.join(' • ')}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
