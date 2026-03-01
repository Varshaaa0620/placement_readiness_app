'use client'

import React from 'react'
import { colors, spacing } from '../styles/designTokens'
import { ResumeTemplate, TEMPLATE_LABELS } from '../types/template'

interface TemplateSwitcherProps {
  currentTemplate: ResumeTemplate
  onTemplateChange: (template: ResumeTemplate) => void
}

export const TemplateSwitcher: React.FC<TemplateSwitcherProps> = ({
  currentTemplate,
  onTemplateChange,
}) => {
  const templates: ResumeTemplate[] = ['classic', 'modern', 'minimal']

  return (
    <div
      style={{
        display: 'flex',
        gap: spacing.xs,
        backgroundColor: colors.bg.subtle,
        padding: '4px',
        borderRadius: '4px',
        border: `1px solid ${colors.border.subtle}`,
      }}
    >
      {templates.map((template) => (
        <button
          key={template}
          onClick={() => onTemplateChange(template)}
          style={{
            padding: `${spacing.xs} ${spacing.sm}`,
            fontSize: '13px',
            fontWeight: currentTemplate === template ? 500 : 400,
            color: currentTemplate === template ? colors.text.primary : colors.text.secondary,
            backgroundColor: currentTemplate === template ? 'white' : 'transparent',
            border: currentTemplate === template ? `1px solid ${colors.border.default}` : '1px solid transparent',
            borderRadius: '3px',
            cursor: 'pointer',
            transition: 'all 150ms ease',
            textTransform: 'capitalize',
          }}
        >
          {TEMPLATE_LABELS[template]}
        </button>
      ))}
    </div>
  )
}
