# KodNest Premium Build System

A professional, production-ready design system for premium SaaS applications. Built with React, Next.js, and TypeScript.

## Philosophy

**Calm. Intentional. Coherent. Confident.**

This design system is NOT flashy, loud, playful, or hackathon-style. It's designed for serious B2C products that demand professional presentation and focused user experience.

## Key Principles

- **No gradients, glassmorphism, neon colors, or animation noise**
- **Maximum 4 colors** across the entire system
- **Consistent spacing scale**: 8px, 16px, 24px, 40px, 64px
- **Professional typography**: Serif headings (Georgia), clean sans-serif body text
- **Generous whitespace** as a design element
- **150–200ms transitions** with ease-in-out timing

## Color System

| Name | Hex | Usage |
| --- | --- | --- |
| Background | #F7F6F3 | Page background (off-white) |
| Primary Text | #111111 | Main text, headings |
| Accent | #8B0000 | Primary buttons, focus states |
| Success | #4B7C59 | Success states, positive feedback |
| Warning | #B8860B | Warning states, caution messaging |
| Border | #E5E4E0 | Subtle borders, dividers |

## Layout Structure

Every page follows this hierarchy:

```
┌─────────────────────────────────────────┐
│          TOP BAR                        │
│  [Project] [Progress: Step X/Y] [Status]│
├─────────────────────────────────────────┤
│          CONTEXT HEADER                 │
│   Title (serif) + Single-line subtitle  │
├─────────────────┬───────────────────────┤
│                 │                       │
│   PRIMARY       │   SECONDARY PANEL     │
│   WORKSPACE     │   - Step explanation  │
│   (70% width)   │   - Copyable prompt   │
│                 │   - Buttons (5)       │
│                 │   - Clear actions     │
├─────────────────┴───────────────────────┤
│          PROOF FOOTER                   │
│   Checklist: □ UI □ Logic □ Test □ Dep  │
└─────────────────────────────────────────┘
```

## Components

### Core UI Components

- **Button**: Primary (solid red), Secondary (outlined), Tertiary (subtle)
- **Card**: Clean borders, subtle shadows, balanced padding
- **Input**: Clean borders, clear focus state, optional label + error/hint
- **Badge**: Status indicators (default, success, warning, error)

### Layout Components

- **TopBar**: Project name, progress indicator, status badge
- **ContextHeader**: Large serif headline + single-line subtext
- **SecondaryPanel**: Step explanation, copyable prompt, action buttons
- **ProofFooter**: Checklist with proof input validation
- **MainLayout**: Complete layout assembling all components

## Typography

### Headings (Georgia, Serif)
- **H1**: 48px, line-height 1.3
- **H2**: 36px, line-height 1.3
- **H3**: 28px, line-height 1.3
- **H4**: 20px, line-height 1.4

### Body Text (Inter, Sans-serif)
- **Default**: 16px, line-height 1.8
- **Large**: 18px, line-height 1.8
- **Small**: 14px, line-height 1.4

## Spacing System

Consistent scale ensures visual harmony:
- **8px** - Minimal spacing, tight clusters
- **16px** - Small gaps, element padding
- **24px** - Standard spacing, card padding
- **40px** - Large spacing, section separation
- **64px** - Extra large spacing, major sections

## Interactions

- **Transitions**: 150ms (fast) / 200ms (slow), `cubic-bezier(0.4, 0, 0.2, 1)`
- **No bounce**, no parallax, no frivolous animations
- **Focus states**: 2px outline, 2px offset, accent color
- **Hover effects**: Opacity change or subtle color shift (not scale)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Design system showcase
├── components/
│   ├── Button.tsx       # Primary UI button
│   ├── Card.tsx         # Card container
│   ├── Input.tsx        # Form input
│   ├── Badge.tsx        # Status badge
│   ├── TopBar.tsx       # Navigation bar
│   ├── ContextHeader.tsx # Page header
│   ├── SecondaryPanel.tsx # Side panel
│   ├── ProofFooter.tsx  # Footer checklist
│   ├── MainLayout.tsx   # Main page layout
│   └── index.ts         # Component exports
├── styles/
│   ├── designTokens.ts  # Design tokens
│   └── ...
└── globals.css          # Global styles
```

## Component Usage

### Button

```tsx
import { Button } from '@/components'

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>

<Button variant="secondary" size="sm">
  Secondary action
</Button>
```

### Card

```tsx
import { Card } from '@/components'

<Card padding="md" variant="default">
  <h3>Card Title</h3>
  <p>Card content goes here</p>
</Card>
```

### Input

```tsx
import { Input } from '@/components'

<Input
  label="Enter your name"
  placeholder="John Doe"
  hint="This is optional"
/>

<Input
  label="Email"
  error="Invalid email address"
/>
```

### MainLayout

```tsx
import { MainLayout } from '@/components'

<MainLayout
  projectName="My Project"
  currentStep={2}
  totalSteps={5}
  status="in-progress"
  headerTitle="Step 2: Design Foundation"
  headerSubtitle="Establish the visual direction"
  primaryContent={<YourContent />}
  stepExplanation="This step guides you through..."
  promptContent="Your AI prompt here..."
  proofCheckpoints={[...]}
  onCheckpointToggle={handleToggle}
/>
```

## Design System Rules

1. **Everything is intentional** – No element exists without purpose
2. **Maximum visual restraint** – Use 4 colors, not more
3. **Generous whitespace** – Let the design breathe
4. **Consistent patterns** – Spacing, typography, interactions
5. **Professional tone** – Confident, clear, never apologies
6. **User-centered errors** – Explain what went wrong and how to fix it

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

## Performance

- Built with Next.js 15+
- Optimized for Core Web Vitals
- Minimal JavaScript bundle
- Server components by default

## License

Proprietary – KodNest Premium

---

**Status**: ✅ Design system created and ready for product implementation.
