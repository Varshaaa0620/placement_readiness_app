'use client'

import React from 'react'
import { ResumeNav } from '../../components/ResumeNav'
import { sampleResumeData } from '../../types/resume'

export default function PreviewPage() {
  const resume = sampleResumeData

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <ResumeNav />

      <div
        style={{
          maxWidth: '850px',
          margin: '0 auto',
          padding: '40px 20px',
        }}
      >
        {/* Resume Paper */}
        <div
          style={{
            backgroundColor: 'white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            padding: '60px',
            minHeight: '1100px',
          }}
        >
          {/* Header */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: '30px',
              paddingBottom: '20px',
              borderBottom: '1px solid #000',
            }}
          >
            <h1
              style={{
                fontFamily: 'Georgia, "Times New Roman", serif',
                fontSize: '32px',
                fontWeight: 400,
                color: '#000',
                margin: '0 0 12px 0',
                letterSpacing: '2px',
                textTransform: 'uppercase',
              }}
            >
              {resume.personalInfo.name}
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
                  color: '#000',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '6px',
                  marginBottom: '12px',
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
                  color: '#000',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '6px',
                  marginBottom: '16px',
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
                  color: '#000',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '6px',
                  marginBottom: '16px',
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
                  color: '#000',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '6px',
                  marginBottom: '16px',
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
                  color: '#000',
                  textTransform: 'uppercase',
                  letterSpacing: '2px',
                  borderBottom: '1px solid #ccc',
                  paddingBottom: '6px',
                  marginBottom: '12px',
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
