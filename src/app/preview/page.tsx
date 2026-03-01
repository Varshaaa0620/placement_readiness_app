'use client'

import React, { useState, useEffect } from 'react'
import { ResumeNav } from '../../components/ResumeNav'
import { TemplatePicker } from '../../components/TemplatePicker'
import { ColorThemePicker } from '../../components/ColorThemePicker'
import { loadResumeData } from '../../utils/resumeStorage'
import { ResumeData, defaultResumeData } from '../../types/resume'
import { colors } from '../../styles/designTokens'
import { copyResumeAsText, validateResumeForExport, ValidationWarning } from '../../utils/resumeExport'
import {
  ResumeLayout,
  ColorTheme,
  getStoredLayout,
  setStoredLayout,
  getStoredColorTheme,
  setStoredColorTheme,
  generateColorVariations,
  defaultLayout,
  defaultColorTheme,
} from '../../types/resumeTheme'

export default function PreviewPage() {
  const [resume, setResume] = useState<ResumeData>(defaultResumeData)
  const [layout, setLayout] = useState<ResumeLayout>(defaultLayout)
  const [colorTheme, setColorTheme] = useState<ColorTheme>(defaultColorTheme)
  const [warnings, setWarnings] = useState<ValidationWarning[]>([])
  const [copySuccess, setCopySuccess] = useState(false)
  const [pdfToast, setPdfToast] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const loadedResume = loadResumeData()
    setResume(loadedResume)
    setLayout(getStoredLayout())
    setColorTheme(getStoredColorTheme())
    setWarnings(validateResumeForExport(loadedResume))
    setIsMounted(true)
  }, [])

  const handleLayoutChange = (newLayout: ResumeLayout) => {
    setLayout(newLayout)
    setStoredLayout(newLayout)
  }

  const handleColorChange = (newTheme: ColorTheme) => {
    setColorTheme(newTheme)
    setStoredColorTheme(newTheme)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleDownloadPDF = () => {
    setPdfToast(true)
    setTimeout(() => setPdfToast(false), 3000)
    // Trigger print dialog for PDF export
    setTimeout(() => window.print(), 100)
  }

  const handleCopyAsText = async () => {
    const success = await copyResumeAsText(resume)
    if (success) {
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    }
  }

  if (!isMounted) return null

  const colorVars = generateColorVariations(colorTheme)

  // Wrapper style for scrollable resume
  const resumeWrapperStyle: React.CSSProperties = {
    maxWidth: '100%',
    overflow: 'auto',
    display: 'flex',
    justifyContent: 'center',
  }

  // Classic Layout
  const renderClassic = () => (
    <div style={resumeWrapperStyle}>
    <div
      className="resume-print-container"
      style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        minHeight: '1100px',
        padding: '40px',
        fontFamily: 'Georgia, "Times New Roman", serif',
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div className="resume-section" style={{ textAlign: 'center', marginBottom: '30px', borderBottom: `2px solid ${colorVars.primary}`, paddingBottom: '20px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 400, letterSpacing: '2px', textTransform: 'uppercase', margin: '0 0 12px 0', color: '#000' }}>
          {resume.personalInfo.name || 'Your Name'}
        </h1>
        <p style={{ fontSize: '13px', color: '#333', margin: '0 0 4px 0' }}>
          {resume.personalInfo.location} | {resume.personalInfo.email} | {resume.personalInfo.phone}
        </p>
        <p style={{ fontSize: '12px', color: '#555', margin: 0 }}>
          {resume.links.linkedin} | {resume.links.github}
        </p>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="resume-section" style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', paddingBottom: '6px', marginBottom: '12px', borderBottom: `1px solid ${colorVars.primary}`, color: colorVars.primary }}>
            Professional Summary
          </h2>
          <p style={{ fontSize: '13px', color: '#333', lineHeight: '1.7', margin: 0 }}>{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div className="resume-section" style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', paddingBottom: '6px', marginBottom: '16px', borderBottom: `1px solid ${colorVars.primary}`, color: colorVars.primary }}>
            Professional Experience
          </h2>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="resume-item" style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '2px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#000', margin: 0 }}>{exp.role}</h3>
                <span style={{ fontSize: '12px', color: '#555', fontStyle: 'italic' }}>{exp.startDate} - {exp.endDate}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#333', margin: '0 0 6px 0', fontStyle: 'italic' }}>{exp.company}</p>
              <p style={{ fontSize: '12px', color: '#444', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div className="resume-section" style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', paddingBottom: '6px', marginBottom: '16px', borderBottom: `1px solid ${colorVars.primary}`, color: colorVars.primary }}>
            Education
          </h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="resume-item" style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#000', margin: 0 }}>{edu.school}</h3>
                <span style={{ fontSize: '12px', color: '#555', fontStyle: 'italic' }}>{edu.startDate} - {edu.endDate}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#333', margin: 0 }}>{edu.degree}{edu.degree && edu.field ? ', ' : ''}{edu.field}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div className="resume-section" style={{ marginBottom: '28px' }}>
          <h2 style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', paddingBottom: '6px', marginBottom: '16px', borderBottom: `1px solid ${colorVars.primary}`, color: colorVars.primary }}>
            Projects
          </h2>
          {resume.projects.map((proj) => (
            <div key={proj.id} className="resume-item" style={{ marginBottom: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#000', margin: '0 0 4px 0' }}>{proj.name}</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                {(Array.isArray(proj.technologies) ? proj.technologies : []).map((tech) => (
                  <span key={tech} style={{ padding: '2px 8px', backgroundColor: '#f0f0f0', borderRadius: '4px', fontSize: '10px', color: '#333' }}>{tech}</span>
                ))}
              </div>
              <p style={{ fontSize: '12px', color: '#444', lineHeight: '1.6', margin: '0 0 6px 0' }}>{proj.description}</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                {proj.liveUrl && <span style={{ fontSize: '11px', color: '#666' }}>Live: {proj.liveUrl}</span>}
                {proj.githubUrl && <span style={{ fontSize: '11px', color: '#666' }}>GitHub: {proj.githubUrl}</span>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(resume.skills.technical.length > 0 || resume.skills.soft.length > 0 || resume.skills.tools.length > 0) && (
        <div className="resume-section">
          <h2 style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', paddingBottom: '6px', marginBottom: '12px', borderBottom: `1px solid ${colorVars.primary}`, color: colorVars.primary }}>
            Skills
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {resume.skills.technical.map((skill) => (
              <span key={skill} style={{ padding: '4px 10px', backgroundColor: colorVars.primary, color: '#fff', borderRadius: '4px', fontSize: '11px' }}>{skill}</span>
            ))}
            {resume.skills.soft.map((skill) => (
              <span key={skill} style={{ padding: '4px 10px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '11px' }}>{skill}</span>
            ))}
            {resume.skills.tools.map((skill) => (
              <span key={skill} style={{ padding: '4px 10px', backgroundColor: '#fff', border: `1px solid ${colorVars.primary}`, borderRadius: '4px', fontSize: '11px' }}>{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  )

  // Modern Layout
  const renderModern = () => (
    <div style={resumeWrapperStyle}>
    <div
      className="resume-print-container"
      style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        minHeight: '1100px',
        display: 'flex',
        fontFamily: '"Segoe UI", Roboto, sans-serif',
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      {/* Sidebar */}
      <div style={{ width: '35%', minWidth: '180px', backgroundColor: colorVars.sidebarBg, padding: '30px 20px', color: '#333' }}>
        {/* Name */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: 700, margin: '0 0 8px 0', color: colorVars.primaryDark, lineHeight: '1.2' }}>
            {resume.personalInfo.name || 'Your Name'}
          </h1>
          <p style={{ fontSize: '12px', color: '#555', margin: 0 }}>{resume.personalInfo.location}</p>
        </div>

        {/* Contact */}
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', color: colorVars.primary }}>Contact</h2>
          <p style={{ fontSize: '11px', margin: '0 0 4px 0', wordBreak: 'break-word' }}>{resume.personalInfo.email}</p>
          <p style={{ fontSize: '11px', margin: '0 0 4px 0' }}>{resume.personalInfo.phone}</p>
          {resume.links.linkedin && <p style={{ fontSize: '11px', margin: '0 0 4px 0' }}>LinkedIn: {resume.links.linkedin}</p>}
          {resume.links.github && <p style={{ fontSize: '11px', margin: 0 }}>GitHub: {resume.links.github}</p>}
        </div>

        {/* Skills */}
        {(resume.skills.technical.length > 0 || resume.skills.soft.length > 0 || resume.skills.tools.length > 0) && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', color: colorVars.primary }}>Skills</h2>
            {resume.skills.technical.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '10px', fontWeight: 600, margin: '0 0 6px 0', color: '#444' }}>Technical</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {resume.skills.technical.map((skill) => (
                    <span key={skill} style={{ padding: '2px 6px', backgroundColor: colorVars.primary, color: '#fff', borderRadius: '3px', fontSize: '10px' }}>{skill}</span>
                  ))}
                </div>
              </div>
            )}
            {resume.skills.soft.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '10px', fontWeight: 600, margin: '0 0 6px 0', color: '#444' }}>Soft Skills</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {resume.skills.soft.map((skill) => (
                    <span key={skill} style={{ padding: '2px 6px', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: '3px', fontSize: '10px' }}>{skill}</span>
                  ))}
                </div>
              </div>
            )}
            {resume.skills.tools.length > 0 && (
              <div>
                <p style={{ fontSize: '10px', fontWeight: 600, margin: '0 0 6px 0', color: '#444' }}>Tools</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                  {resume.skills.tools.map((skill) => (
                    <span key={skill} style={{ padding: '2px 6px', backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: '3px', fontSize: '10px' }}>{skill}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div>
            <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', color: colorVars.primary }}>Education</h2>
            {resume.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px' }}>
                <p style={{ fontSize: '11px', fontWeight: 600, margin: '0 0 2px 0' }}>{edu.school}</p>
                <p style={{ fontSize: '10px', margin: '0 0 2px 0' }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
                <p style={{ fontSize: '10px', color: '#666', margin: 0 }}>{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px', minWidth: 0 }}>
        {/* Summary */}
        {resume.summary && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', color: colorVars.primary, borderBottom: `2px solid ${colorVars.primary}`, paddingBottom: '6px' }}>
              Profile
            </h2>
            <p style={{ fontSize: '12px', color: '#444', lineHeight: '1.6', margin: 0 }}>{resume.summary}</p>
          </div>
        )}

        {/* Experience */}
        {resume.experience.length > 0 && (
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', color: colorVars.primary, borderBottom: `2px solid ${colorVars.primary}`, paddingBottom: '6px' }}>
              Experience
            </h2>
            {resume.experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#000', margin: 0 }}>{exp.role}</h3>
                  <span style={{ fontSize: '11px', color: '#666' }}>{exp.startDate} - {exp.endDate}</span>
                </div>
                <p style={{ fontSize: '12px', fontWeight: 600, color: colorVars.primary, margin: '0 0 6px 0' }}>{exp.company}</p>
                <p style={{ fontSize: '11px', color: '#444', lineHeight: '1.6', margin: 0 }}>{exp.description}</p>
              </div>
            ))}
          </div>
        )}

        {/* Projects */}
        {resume.projects.length > 0 && (
          <div>
            <h2 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', color: colorVars.primary, borderBottom: `2px solid ${colorVars.primary}`, paddingBottom: '6px' }}>
              Projects
            </h2>
            {resume.projects.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '16px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 700, color: '#000', margin: '0 0 6px 0' }}>{proj.name}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginBottom: '6px' }}>
                  {(Array.isArray(proj.technologies) ? proj.technologies : []).map((tech) => (
                    <span key={tech} style={{ padding: '2px 6px', backgroundColor: colorVars.primaryMuted, borderRadius: '3px', fontSize: '10px', color: colorVars.primaryDark }}>{tech}</span>
                  ))}
                </div>
                <p style={{ fontSize: '11px', color: '#444', lineHeight: '1.6', margin: '0 0 4px 0' }}>{proj.description}</p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  {proj.liveUrl && <span style={{ fontSize: '10px', color: colorVars.primary }}>Live: {proj.liveUrl}</span>}
                  {proj.githubUrl && <span style={{ fontSize: '10px', color: colorVars.primary }}>GitHub: {proj.githubUrl}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
    </div>
  )

  // Minimal Layout
  const renderMinimal = () => (
    <div style={resumeWrapperStyle}>
    <div
      className="resume-print-container"
      style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        minHeight: '1100px',
        padding: '50px 40px',
        fontFamily: '"Helvetica Neue", Arial, sans-serif',
        width: '100%',
        maxWidth: '700px',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div className="resume-section" style={{ marginBottom: '50px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 300, letterSpacing: '4px', textTransform: 'uppercase', margin: '0 0 20px 0', color: '#000' }}>
          {resume.personalInfo.name || 'Your Name'}
        </h1>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', fontSize: '12px', color: '#666' }}>
          {resume.personalInfo.location && <span>{resume.personalInfo.location}</span>}
          {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
          {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
          {resume.links.linkedin && <span>{resume.links.linkedin}</span>}
          {resume.links.github && <span>{resume.links.github}</span>}
        </div>
      </div>

      {/* Summary */}
      {resume.summary && (
        <div className="resume-section" style={{ marginBottom: '40px' }}>
          <p style={{ fontSize: '14px', color: '#333', lineHeight: '1.8', margin: 0, fontWeight: 300 }}>{resume.summary}</p>
        </div>
      )}

      {/* Experience */}
      {resume.experience.length > 0 && (
        <div className="resume-section" style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '24px', color: '#999' }}>Experience</h2>
          {resume.experience.map((exp) => (
            <div key={exp.id} className="resume-item" style={{ marginBottom: '28px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '6px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 500, color: '#000', margin: 0 }}>{exp.role}</h3>
                <span style={{ fontSize: '11px', color: '#999', letterSpacing: '1px' }}>{exp.startDate} — {exp.endDate}</span>
              </div>
              <p style={{ fontSize: '12px', color: colorVars.primary, margin: '0 0 10px 0', fontWeight: 500 }}>{exp.company}</p>
              <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.7', margin: 0, fontWeight: 300 }}>{exp.description}</p>
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      {resume.education.length > 0 && (
        <div className="resume-section" style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '24px', color: '#999' }}>Education</h2>
          {resume.education.map((edu) => (
            <div key={edu.id} className="resume-item" style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 500, color: '#000', margin: 0 }}>{edu.school}</h3>
                <span style={{ fontSize: '11px', color: '#999', letterSpacing: '1px' }}>{edu.startDate} — {edu.endDate}</span>
              </div>
              <p style={{ fontSize: '13px', color: '#555', margin: '6px 0 0 0', fontWeight: 300 }}>{edu.degree}{edu.field ? `, ${edu.field}` : ''}</p>
            </div>
          ))}
        </div>
      )}

      {/* Projects */}
      {resume.projects.length > 0 && (
        <div className="resume-section" style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '24px', color: '#999' }}>Projects</h2>
          {resume.projects.map((proj) => (
            <div key={proj.id} className="resume-item" style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 500, color: '#000', margin: '0 0 8px 0' }}>{proj.name}</h3>
              <p style={{ fontSize: '13px', color: '#555', lineHeight: '1.7', margin: '0 0 10px 0', fontWeight: 300 }}>{proj.description}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(Array.isArray(proj.technologies) ? proj.technologies : []).map((tech) => (
                  <span key={tech} style={{ fontSize: '11px', color: colorVars.primary, fontWeight: 500 }}>{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Skills */}
      {(resume.skills.technical.length > 0 || resume.skills.soft.length > 0 || resume.skills.tools.length > 0) && (
        <div className="resume-section">
          <h2 style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '3px', marginBottom: '24px', color: '#999' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
            {[...resume.skills.technical, ...resume.skills.soft, ...resume.skills.tools].map((skill) => (
              <span key={skill} style={{ fontSize: '13px', color: '#333', fontWeight: 300 }}>{skill}</span>
            ))}
          </div>
        </div>
      )}
    </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <ResumeNav />

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
          display: 'flex',
          gap: '24px',
          alignItems: 'flex-start',
        }}
      >
        {/* Left Panel - Controls */}
        <div className="no-print" style={{ width: '280px', flexShrink: 0 }}>
          {/* Template Picker */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <TemplatePicker
              currentLayout={layout}
              onLayoutChange={handleLayoutChange}
              accentColor={colorVars.primary}
            />
          </div>

          {/* Color Theme Picker */}
          <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '16px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <ColorThemePicker
              currentTheme={colorTheme}
              onThemeChange={handleColorChange}
            />
          </div>

          {/* Validation Warnings */}
          {warnings.length > 0 && (
            <div style={{ marginBottom: '16px' }}>
              {warnings.map((warning, index) => (
                <div
                  key={index}
                  style={{
                    backgroundColor: '#fff3cd',
                    border: '1px solid #ffc107',
                    borderRadius: '4px',
                    padding: '12px 16px',
                    marginBottom: '8px',
                    fontSize: '13px',
                    color: '#856404',
                  }}
                >
                  {warning.message}
                </div>
              ))}
            </div>
          )}

          {/* Export Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <button
              onClick={handleDownloadPDF}
              style={{
                padding: '12px 20px',
                backgroundColor: colorVars.primary,
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Download PDF
            </button>
            <button
              onClick={handleCopyAsText}
              style={{
                padding: '12px 20px',
                backgroundColor: '#f8f9fa',
                color: '#333',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              {copySuccess ? 'Copied!' : 'Copy as Text'}
            </button>
          </div>
        </div>

        {/* Right Panel - Resume Preview */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {layout === 'classic' && renderClassic()}
          {layout === 'modern' && renderModern()}
          {layout === 'minimal' && renderMinimal()}
        </div>
      </div>

      {/* PDF Toast Notification */}
      {pdfToast && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            backgroundColor: '#28a745',
            color: 'white',
            padding: '16px 24px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            fontSize: '14px',
            fontWeight: 500,
            zIndex: 1000,
            animation: 'slideIn 0.3s ease-out',
          }}
        >
          PDF export ready! Check your downloads.
        </div>
      )}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        /* Ensure resume fits within container */
        .resume-print-container {
          transform-origin: top center;
        }
        
        @media (max-width: 1100px) {
          .resume-print-container {
            transform: scale(0.85);
          }
        }
        
        @media (max-width: 900px) {
          .resume-print-container {
            transform: scale(0.75);
          }
        }
      `}</style>
    </div>
  )
}
