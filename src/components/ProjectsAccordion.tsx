'use client'

import React, { useState } from 'react'
import { Project } from '../types/resume'
import { colors, spacing } from '../styles/designTokens'

interface ProjectsAccordionProps {
  projects: Project[]
  onChange: (projects: Project[]) => void
}

export function ProjectsAccordion({ projects, onChange }: ProjectsAccordionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [techInputs, setTechInputs] = useState<Record<string, string>>({})

  const generateId = () => Math.random().toString(36).substr(2, 9)

  const addProject = () => {
    const newProject: Project = {
      id: generateId(),
      name: '',
      description: '',
      technologies: [],
    }
    onChange([...projects, newProject])
    setExpandedId(newProject.id)
  }

  const updateProject = (id: string, updates: Partial<Project>) => {
    onChange(
      projects.map((p) => (p.id === id ? { ...p, ...updates } : p))
    )
  }

  const deleteProject = (id: string) => {
    onChange(projects.filter((p) => p.id !== id))
    if (expandedId === id) setExpandedId(null)
  }

  const addTechnology = (projectId: string, tech: string) => {
    const trimmed = tech.trim()
    if (!trimmed) return
    
    const project = projects.find((p) => p.id === projectId)
    if (!project || project.technologies.includes(trimmed)) return

    updateProject(projectId, {
      technologies: [...project.technologies, trimmed],
    })
    setTechInputs((prev) => ({ ...prev, [projectId]: '' }))
  }

  const removeTechnology = (projectId: string, techToRemove: string) => {
    const project = projects.find((p) => p.id === projectId)
    if (!project) return

    updateProject(projectId, {
      technologies: project.technologies.filter((t) => t !== techToRemove),
    })
  }

  const handleTechKeyDown = (projectId: string, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTechnology(projectId, techInputs[projectId] || '')
    }
  }

  return (
    <div>
      {/* Add Project Button */}
      <button
        onClick={addProject}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: colors.bg.subtle,
          border: `2px dashed ${colors.border.default}`,
          borderRadius: '8px',
          color: colors.text.primary,
          fontSize: '14px',
          fontWeight: 500,
          cursor: 'pointer',
          marginBottom: spacing.md,
        }}
      >
        + Add Project
      </button>

      {/* Project List */}
      {projects.map((project) => {
        const isExpanded = expandedId === project.id
        const charCount = project.description.length
        const maxChars = 200

        return (
          <div
            key={project.id}
            style={{
              marginBottom: spacing.md,
              border: `1px solid ${colors.border.default}`,
              borderRadius: '8px',
              overflow: 'hidden',
            }}
          >
            {/* Header / Toggle */}
            <div
              onClick={() => setExpandedId(isExpanded ? null : project.id)}
              style={{
                padding: spacing.md,
                backgroundColor: colors.bg.subtle,
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h4
                style={{
                  fontFamily: 'Georgia, serif',
                  fontSize: '16px',
                  fontWeight: 600,
                  color: colors.text.primary,
                  margin: 0,
                }}
              >
                {project.name || 'Untitled Project'}
              </h4>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span
                  style={{
                    fontSize: '12px',
                    color: colors.text.secondary,
                  }}
                >
                  {isExpanded ? '▼' : '▶'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteProject(project.id)
                  }}
                  style={{
                    padding: '4px 8px',
                    backgroundColor: colors.semantic.error,
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>

            {/* Expanded Content */}
            {isExpanded && (
              <div style={{ padding: spacing.md }}>
                {/* Project Title */}
                <div style={{ marginBottom: spacing.sm }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: colors.text.secondary,
                      marginBottom: '6px',
                    }}
                  >
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) =>
                      updateProject(project.id, { name: e.target.value })
                    }
                    placeholder="e.g., E-Commerce Platform"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${colors.border.default}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Description */}
                <div style={{ marginBottom: spacing.sm }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: colors.text.secondary,
                      marginBottom: '6px',
                    }}
                  >
                    Description
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) =>
                      updateProject(project.id, {
                        description: e.target.value.slice(0, maxChars),
                      })
                    }
                    placeholder="Brief description of the project..."
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: `1px solid ${colors.border.default}`,
                      borderRadius: '6px',
                      fontSize: '14px',
                      resize: 'vertical',
                      outline: 'none',
                      fontFamily: 'inherit',
                    }}
                  />
                  <div
                    style={{
                      textAlign: 'right',
                      fontSize: '12px',
                      color:
                        charCount >= maxChars
                          ? colors.semantic.error
                          : colors.text.secondary,
                      marginTop: '4px',
                    }}
                  >
                    {charCount}/{maxChars}
                  </div>
                </div>

                {/* Tech Stack */}
                <div style={{ marginBottom: spacing.sm }}>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '13px',
                      fontWeight: 500,
                      color: colors.text.secondary,
                      marginBottom: '6px',
                    }}
                  >
                    Tech Stack
                  </label>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '6px',
                      marginBottom: '8px',
                    }}
                  >
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          padding: '4px 10px',
                          backgroundColor: colors.accent,
                          color: 'white',
                          borderRadius: '12px',
                          fontSize: '12px',
                        }}
                      >
                        {tech}
                        <button
                          onClick={() => removeTechnology(project.id, tech)}
                          style={{
                            width: '14px',
                            height: '14px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: 'rgba(255,255,255,0.2)',
                            border: 'none',
                            borderRadius: '50%',
                            color: 'white',
                            fontSize: '10px',
                            cursor: 'pointer',
                            padding: 0,
                          }}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={techInputs[project.id] || ''}
                    onChange={(e) =>
                      setTechInputs((prev) => ({
                        ...prev,
                        [project.id]: e.target.value,
                      }))
                    }
                    onKeyDown={(e) => handleTechKeyDown(project.id, e)}
                    placeholder="Type technology and press Enter..."
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      border: `1px solid ${colors.border.default}`,
                      borderRadius: '6px',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* URLs */}
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: spacing.sm,
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: colors.text.secondary,
                        marginBottom: '6px',
                      }}
                    >
                      Live URL (optional)
                    </label>
                    <input
                      type="text"
                      value={project.liveUrl || ''}
                      onChange={(e) =>
                        updateProject(project.id, { liveUrl: e.target.value })
                      }
                      placeholder="https://..."
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: `1px solid ${colors.border.default}`,
                        borderRadius: '6px',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: 'block',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: colors.text.secondary,
                        marginBottom: '6px',
                      }}
                    >
                      GitHub URL (optional)
                    </label>
                    <input
                      type="text"
                      value={project.githubUrl || ''}
                      onChange={(e) =>
                        updateProject(project.id, { githubUrl: e.target.value })
                      }
                      placeholder="https://github.com/..."
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: `1px solid ${colors.border.default}`,
                        borderRadius: '6px',
                        fontSize: '14px',
                        outline: 'none',
                      }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
