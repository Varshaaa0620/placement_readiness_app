'use client'

import React, { useState, useEffect } from 'react'
import { ResumeNav } from '../../components/ResumeNav'
import { TemplateSwitcher } from '../../components/TemplateSwitcher'
import { loadResumeData } from '../../utils/resumeStorage'
import { ResumeData, defaultResumeData } from '../../types/resume'
import { ResumeTemplate, getStoredTemplate } from '../../types/template'
import { colors, spacing } from '../../styles/designTokens'
import { copyResumeAsText, validateResumeForExport, ValidationWarning } from '../../utils/resumeExport'

export default function PreviewPage() {
  const [resume, setResume] = useState<ResumeData>(defaultResumeData)
  const [template, setTemplate] = useState<ResumeTemplate>('classic')
  const [warnings, setWarnings] = useState<ValidationWarning[]>([])
  const [copySuccess, setCopySuccess] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const loadedResume = loadResumeData()
    setResume(loadedResume)
    setTemplate(getStoredTemplate())
    setWarnings(validateResumeForExport(loadedResume))
    setIsMounted(true)
  }, [])

  const handlePrint = () => {
    window.print()
  }

  const handleCopyAsText = async () => {
    const success = await copyResumeAsText(resume)
    if (success) {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

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
        className="template-switcher no-print"
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

      {/* Validation Warnings */}
      {warnings.length > 0 && (
        <div
          className="validation-warnings no-print"
          style={{
            maxWidth: '850px',
            margin: '16px auto 0',
            padding: '0 20px',
          }}
        >
          {warnings.map((warning, index) => (
            <div
              key={index}
              style={{
                backgroundColor: colors.semantic.warning + '15',
                border: `1px solid ${colors.semantic.warning}`,
                borderRadius: '4px',
                padding: '12px 16px',
                marginBottom: '8px',
                fontSize: '14px',
                color: colors.semantic.warning,
              }}
            >
              {warning.message}
            </div>
          ))}
        </div>
      )}

      {/* Export Buttons */}
      <div
        className="export-buttons no-print"
        style={{
          maxWidth: '850px',
          margin: '16px auto 0',
          padding: '0 20px',
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
        }}
      >
        <button
          onClick={handlePrint}
          style={{
            padding: '10px 20px',
            backgroundColor: colors.accent,
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Print / Save as PDF
        </button>
        <button
          onClick={handleCopyAsText}
          style={{
            padding: '10px 20px',
            backgroundColor: colors.bg.subtle,
            color: colors.text.primary,
            border: `1px solid ${colors.border.default}`,
            borderRadius: '4px',
            fontSize: '14px',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          {copySuccess ? 'Copied!' : 'Copy Resume as Text'}
        </button>
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
          className="resume-print-container"
          style={{
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            minHeight: '1100px',
            ...styles.container,
          }}
        >
          {/* Header */}
          <div
            className="resume-section"
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
            <div className="resume-section" style={{ marginBottom: '28px' }}>
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
            <div className="resume-section" style={{ marginBottom: '28px' }}>
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
                <div key={exp.id} className="resume-item" style={{ marginBottom: index < resume.experience.length - 1 ? '20px' : 0 }}>
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
            <div className="resume-section" style={{ marginBottom: '28px' }}>
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
                <div key={edu.id} className="resume-item" style={{ marginBottom: index < resume.education.length - 1 ? '14px' : 0 }}>
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
            <div className="resume-section" style={{ marginBottom: '28px' }}>
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
                <div key={proj.id} className="resume-item" style={{ marginBottom: index < resume.projects.length - 1 ? '16px' : 0 }}>
                  <h3
                    style={{
                      fontFamily: 'Georgia, serif',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: '#000',
                      margin: '0 0 4px 0',
                    }}
                  >
                    {proj.name}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                    {(Array.isArray(proj.technologies) ? proj.technologies : []).map((tech) => (
                      <span
                        key={tech}
                        style={{
                          padding: '2px 8px',
                          backgroundColor: '#f0f0f0',
                          borderRadius: '4px',
                          fontSize: '10px',
                          color: '#333',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <p
                    style={{
                      fontSize: '12px',
                      color: '#444',
                      lineHeight: '1.6',
                      margin: '0 0 6px 0',
                      fontFamily: 'Georgia, serif',
                    }}
                  >
                    {proj.description}
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {proj.liveUrl && (
                      <span style={{ fontSize: '11px', color: '#666' }}>
                        Live: {proj.liveUrl}
                      </span>
                    )}
                    {proj.githubUrl && (
                      <span style={{ fontSize: '11px', color: '#666' }}>
                        GitHub: {proj.githubUrl}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Skills */}
          {(resume.skills.technical.length > 0 || resume.skills.soft.length > 0 || resume.skills.tools.length > 0) && (
            <div className="resume-section">
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
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {resume.skills.technical.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      padding: '4px 10px',
                      backgroundColor: '#000',
                      color: '#fff',
                      borderRadius: '4px',
                      fontSize: '11px',
                    }}
                  >
                    {skill}
                  </span>
                ))}
                {resume.skills.soft.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      padding: '4px 10px',
                      backgroundColor: '#f0f0f0',
                      border: '1px solid #ccc',
                      borderRadius: '4px',
                      fontSize: '11px',
                    }}
                  >
                    {skill}
                  </span>
                ))}
                {resume.skills.tools.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      padding: '4px 10px',
                      backgroundColor: '#fff',
                      border: '1px solid #000',
                      borderRadius: '4px',
                      fontSize: '11px',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
