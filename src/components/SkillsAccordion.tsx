'use client'

import React, { useState } from 'react'
import { CategorizedSkills } from '../types/resume'
import { colors, spacing } from '../styles/designTokens'

interface SkillsAccordionProps {
  skills: CategorizedSkills
  onChange: (skills: CategorizedSkills) => void
}

type SkillCategory = 'technical' | 'soft' | 'tools'

const categoryLabels: Record<SkillCategory, string> = {
  technical: 'Technical Skills',
  soft: 'Soft Skills',
  tools: 'Tools & Technologies',
}

const suggestedSkills: Record<SkillCategory, string[]> = {
  technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'],
  soft: ['Team Leadership', 'Problem Solving'],
  tools: ['Git', 'Docker', 'AWS'],
}

export function SkillsAccordion({ skills, onChange }: SkillsAccordionProps) {
  const [inputs, setInputs] = useState<Record<SkillCategory, string>>({
    technical: '',
    soft: '',
    tools: '',
  })
  const [loading, setLoading] = useState<Record<SkillCategory, boolean>>({
    technical: false,
    soft: false,
    tools: false,
  })

  const addSkill = (category: SkillCategory, skill: string) => {
    const trimmed = skill.trim()
    if (!trimmed || skills[category].includes(trimmed)) return
    
    onChange({
      ...skills,
      [category]: [...skills[category], trimmed],
    })
    setInputs((prev) => ({ ...prev, [category]: '' }))
  }

  const removeSkill = (category: SkillCategory, skillToRemove: string) => {
    onChange({
      ...skills,
      [category]: skills[category].filter((s) => s !== skillToRemove),
    })
  }

  const handleKeyDown = (category: SkillCategory, e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addSkill(category, inputs[category])
    }
  }

  const suggestSkills = async (category: SkillCategory) => {
    setLoading((prev) => ({ ...prev, [category]: true }))
    
    // Simulate 1 second loading
    await new Promise((resolve) => setTimeout(resolve, 1000))
    
    const newSkills = suggestedSkills[category].filter(
      (s) => !skills[category].includes(s)
    )
    
    onChange({
      ...skills,
      [category]: [...skills[category], ...newSkills],
    })
    
    setLoading((prev) => ({ ...prev, [category]: false }))
  }

  const renderCategory = (category: SkillCategory) => {
    const skillList = skills[category]
    const inputValue = inputs[category]
    const isLoading = loading[category]
    const label = categoryLabels[category]

    return (
      <div
        key={category}
        style={{
          marginBottom: spacing.lg,
          padding: spacing.md,
          backgroundColor: colors.bg.subtle,
          borderRadius: '8px',
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
          <h4
            style={{
              fontFamily: 'Georgia, serif',
              fontSize: '16px',
              fontWeight: 600,
              color: colors.text.primary,
              margin: 0,
            }}
          >
            {label} ({skillList.length})
          </h4>
          <button
            onClick={() => suggestSkills(category)}
            disabled={isLoading}
            style={{
              padding: '6px 12px',
              backgroundColor: isLoading ? colors.border.default : colors.accent,
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '13px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {isLoading ? (
              <>
                <span
                  style={{
                    width: '12px',
                    height: '12px',
                    border: '2px solid rgba(255,255,255,0.3)',
                    borderTopColor: 'white',
                    borderRadius: '50%',
                    animation: 'spin 1s linear infinite',
                  }}
                />
                Loading...
              </>
            ) : (
              '✨ Suggest Skills'
            )}
          </button>
        </div>

        {/* Skill Chips */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: spacing.sm,
            minHeight: skillList.length > 0 ? 'auto' : '32px',
          }}
        >
          {skillList.map((skill) => (
            <span
              key={skill}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '6px 12px',
                backgroundColor: colors.accent,
                color: 'white',
                borderRadius: '16px',
                fontSize: '13px',
                fontWeight: 500,
              }}
            >
              {skill}
              <button
                onClick={() => removeSkill(category, skill)}
                style={{
                  width: '16px',
                  height: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  border: 'none',
                  borderRadius: '50%',
                  color: 'white',
                  fontSize: '11px',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                ×
              </button>
            </span>
          ))}
        </div>

        {/* Tag Input */}
        <input
          type="text"
          value={inputValue}
          onChange={(e) =>
            setInputs((prev) => ({ ...prev, [category]: e.target.value }))
          }
          onKeyDown={(e) => handleKeyDown(category, e)}
          placeholder={`Type a skill and press Enter...`}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: `1px solid ${colors.border.default}`,
            borderRadius: '6px',
            fontSize: '14px',
            fontFamily: 'inherit',
            outline: 'none',
          }}
        />
        <small
          style={{
            display: 'block',
            marginTop: '4px',
            color: colors.text.secondary,
            fontSize: '12px',
          }}
        >
          Press Enter to add
        </small>
      </div>
    )
  }

  return (
    <div>
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      {renderCategory('technical')}
      {renderCategory('soft')}
      {renderCategory('tools')}
    </div>
  )
}
