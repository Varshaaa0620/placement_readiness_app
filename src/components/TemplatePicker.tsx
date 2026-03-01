'use client'

import React from 'react'
import { ResumeLayout } from '../types/resumeTheme'
import { colors } from '../styles/designTokens'

interface TemplatePickerProps {
  currentLayout: ResumeLayout
  onLayoutChange: (layout: ResumeLayout) => void
  accentColor: string
}

const templates: { id: ResumeLayout; name: string; description: string }[] = [
  { id: 'classic', name: 'Classic', description: 'Traditional single-column with serif fonts' },
  { id: 'modern', name: 'Modern', description: 'Two-column with colored sidebar' },
  { id: 'minimal', name: 'Minimal', description: 'Clean single-column, generous whitespace' },
]

function TemplateThumbnail({ layout, isActive, accentColor }: { layout: ResumeLayout; isActive: boolean; accentColor: string }) {
  const baseStyle: React.CSSProperties = {
    width: '120px',
    height: '160px',
    borderRadius: '6px',
    border: `2px solid ${isActive ? accentColor : '#ddd'}`,
    backgroundColor: 'white',
    overflow: 'hidden',
    position: 'relative',
  }

  const checkmarkStyle: React.CSSProperties = {
    position: 'absolute',
    top: '4px',
    right: '4px',
    width: '18px',
    height: '18px',
    borderRadius: '50%',
    backgroundColor: accentColor,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    opacity: isActive ? 1 : 0,
  }

  if (layout === 'classic') {
    return (
      <div style={baseStyle}>
        <div style={checkmarkStyle}>✓</div>
        <div style={{ padding: '8px' }}>
          <div style={{ height: '6px', backgroundColor: '#333', marginBottom: '4px' }} />
          <div style={{ height: '2px', backgroundColor: '#ccc', marginBottom: '8px' }} />
          <div style={{ height: '3px', backgroundColor: '#999', width: '60%', marginBottom: '4px' }} />
          <div style={{ height: '2px', backgroundColor: '#ddd', marginBottom: '4px' }} />
          <div style={{ height: '2px', backgroundColor: '#ddd', marginBottom: '4px' }} />
          <div style={{ height: '2px', backgroundColor: '#ddd', width: '80%' }} />
          <div style={{ height: '2px', backgroundColor: accentColor, marginTop: '8px', marginBottom: '4px' }} />
          <div style={{ height: '2px', backgroundColor: '#ddd', marginBottom: '4px' }} />
          <div style={{ height: '2px', backgroundColor: '#ddd', marginBottom: '4px' }} />
        </div>
      </div>
    )
  }

  if (layout === 'modern') {
    return (
      <div style={baseStyle}>
        <div style={checkmarkStyle}>✓</div>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ width: '35%', backgroundColor: accentColor, padding: '6px' }}>
            <div style={{ height: '4px', backgroundColor: 'rgba(255,255,255,0.3)', marginBottom: '4px' }} />
            <div style={{ height: '2px', backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: '2px' }} />
            <div style={{ height: '2px', backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: '2px' }} />
          </div>
          <div style={{ flex: 1, padding: '6px' }}>
            <div style={{ height: '3px', backgroundColor: '#333', marginBottom: '4px' }} />
            <div style={{ height: '2px', backgroundColor: '#ddd', marginBottom: '2px' }} />
            <div style={{ height: '2px', backgroundColor: '#ddd', marginBottom: '2px' }} />
            <div style={{ height: '2px', backgroundColor: '#ddd', width: '70%' }} />
          </div>
        </div>
      </div>
    )
  }

  // Minimal
  return (
    <div style={baseStyle}>
      <div style={checkmarkStyle}>✓</div>
      <div style={{ padding: '12px' }}>
        <div style={{ height: '4px', backgroundColor: '#333', marginBottom: '12px' }} />
        <div style={{ height: '2px', backgroundColor: '#eee', marginBottom: '3px' }} />
        <div style={{ height: '2px', backgroundColor: '#eee', marginBottom: '3px' }} />
        <div style={{ height: '2px', backgroundColor: '#eee', marginBottom: '12px' }} />
        <div style={{ height: '2px', backgroundColor: '#eee', marginBottom: '3px' }} />
        <div style={{ height: '2px', backgroundColor: '#eee', marginBottom: '3px' }} />
      </div>
    </div>
  )
}

export function TemplatePicker({ currentLayout, onLayoutChange, accentColor }: TemplatePickerProps) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <h3
        style={{
          fontSize: '14px',
          fontWeight: 600,
          color: colors.text.primary,
          marginBottom: '12px',
        }}
      >
        Layout Template
      </h3>
      <div style={{ display: 'flex', gap: '16px' }}>
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onLayoutChange(template.id)}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            <TemplateThumbnail
              layout={template.id}
              isActive={currentLayout === template.id}
              accentColor={accentColor}
            />
            <div
              style={{
                marginTop: '8px',
                fontSize: '13px',
                fontWeight: currentLayout === template.id ? 600 : 400,
                color: currentLayout === template.id ? accentColor : colors.text.primary,
              }}
            >
              {template.name}
            </div>
            <div
              style={{
                fontSize: '11px',
                color: colors.text.secondary,
                maxWidth: '120px',
              }}
            >
              {template.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}
