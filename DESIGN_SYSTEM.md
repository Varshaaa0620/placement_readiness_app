# KodNest Premium Build System — Design System

## ✅ DESIGN SYSTEM CREATED

A production-ready, professional SaaS design system built with React, Next.js, and TypeScript. Everything is intentional, coherent, and confident.

---

## Philosophy

**Calm. Intentional. Coherent. Confident.**

This system is NOT flashy, loud, playful, or hackathon-style. Built for serious B2C products demanding professional presentation and focused user experience.

### Core Principles

1. **Everything is intentional** – No element exists without purpose
2. **Consistent visual language** – One designer's mind across all components
3. **Generous whitespace** – Design breathes, not crowded
4. **Professional restraint** – 4 colors max, no gradients or glassmorphism
5. **User-centered errors** – Explain what went wrong and how to fix it
6. **Confident communication** – Clear, direct, never apologetic

---

## Color System

**Maximum 4 colors for unified, professional appearance:**

| Color | Hex | CSS Variable | Usage |
| --- | --- | --- | --- |
| Background | #F7F6F3 | --color-bg | Page background (off-white) |
| Primary Text | #111111 | --color-text | Main text, headings, primary content |
| Accent (Deep Red) | #8B0000 | --color-accent | Primary buttons, focus states, links |
| Success | #4B7C59 | --color-success | Success states, positive feedback |
| Warning | #B8860B | --color-warning | Warning states, caution messaging |
| Border | #E5E4E0 | --color-border | Subtle borders, dividers |
| Subtle BG | #FAFAF8 | --color-subtle-bg | Card backgrounds, inactive states |

---

## Typography System

**Serif headings (Georgia) for confidence. Sans-serif body (Inter/System) for clarity.**

### Headings (Serif)

- **h1**: 48px, line-height 1.3, letter-spacing -0.01em
- **h2**: 36px, line-height 1.3, letter-spacing -0.01em
- **h3**: 28px, line-height 1.3
- **h4**: 20px, line-height 1.4

### Body Text (Sans-serif)

- **Default**: 16px, line-height 1.8, max-width 720px
- **Large**: 18px, line-height 1.8
- **Small**: 14px, line-height 1.4

---

## Spacing System

**Consistent scale ensures visual harmony across all layouts:**

- **8px** – Minimal spacing, tight clusters
- **16px** – Small gaps, element padding
- **24px** – Standard spacing, card padding
- **40px** – Large spacing, section separation
- **64px** – Extra large spacing, major sections

*Never use random spacing like 13px, 27px, etc.*

---

## Components

### Core UI Components

#### Button
- **Variants**: Primary (solid red), Secondary (outlined), Tertiary (subtle)
- **Sizes**: sm, md, lg
- **States**: Default, hover (opacity change), disabled, loading
- **Transitions**: 150ms ease-in-out
- **Border radius**: 4px

```tsx
<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>
```

#### Card
- **Variants**: default (white bg), subtle (off-white bg)
- **Padding**: sm (16px), md (24px), lg (40px)
- **Border**: 1px subtle border
- **Shadow**: Subtle shadow (0 1px 3px rgba(0, 0, 0, 0.08))
- **Border radius**: 4px

```tsx
<Card padding="md" variant="default">
  <h3>Card Title</h3>
  <p>Card content</p>
</Card>
```

#### Input
- **States**: Default, focus (accent border + light background), error, disabled
- **Sizes**: sm, md, lg
- **Features**: Label, error message, hint text
- **Focus**: 2px outline, 2px offset, accent color
- **Border**: 1px subtle border

```tsx
<Input
  label="Email"
  placeholder="user@example.com"
  error="Invalid email"
  hint="We'll never share your email"
/>
```

#### Badge
- **Variants**: default, success, warning, error
- **Sizes**: sm, md
- **Use case**: Status indicators, labels, tags

```tsx
<Badge variant="success" size="md">
  Shipped
</Badge>
```

### Layout Components

#### TopBar
- **Height**: 56px
- **Structure**: [Project Name] | [Progress: Step X/Y] | [Status Badge]
- **Function**: Navigation, progress indication, status visibility
- **Sticky**: Top of viewport

```tsx
<TopBar
  projectName="My Project"
  currentStep={2}
  totalSteps={5}
  status="in-progress"
/>
```

#### ContextHeader
- **Structure**: Large serif headline + single-line subtitle
- **Padding**: 40px
- **Typography**: h1 (48px) + body (16px, secondary color)
- **Purpose**: Set context for current step
- **Border**: Bottom border separating from workspace

```tsx
<ContextHeader
  title="Design the UI"
  subtitle="Create your first component design"
/>
```

#### SecondaryPanel (30% width)
- **Sections**:
  - Step explanation (short, 2-3 sentences)
  - Copyable prompt box (monospace, scrollable)
  - Action buttons (5 total):
    1. Copy Prompt (primary)
    2. Build in Lovable (secondary)
    3. It Worked (secondary)
    4. Error (secondary)
    5. Add Screenshot (tertiary)
- **Styling**: White background, clean separations
- **Scrollable**: Independent scroll for long prompts

#### MainLayout
- **Full-page layout component**
- **Structure**:
  ```
  ┌─────────────────────────────────────────┐
  │          TOP BAR                        │
  ├─────────────────────────────────────────┤
  │          CONTEXT HEADER                 │
  ├─────────────────┬───────────────────────┤
  │                 │                       │
  │   PRIMARY       │   SECONDARY PANEL     │
  │   WORKSPACE     │   (30%)               │
  │   (70%)         │                       │
  │                 │                       │
  ├─────────────────┴───────────────────────┤
  │          PROOF FOOTER                   │
  └─────────────────────────────────────────┘
  ```
- **Responsive**: Primary workspace 70%, Secondary 30% (split adjusts on smaller screens)

#### ProofFooter
- **Checklist items** (default):
  - □ UI Built
  - □ Logic Working
  - □ Test Passed
  - □ Deployed
- **Interactions**: Click to expand, add proof, mark complete
- **Minimum height**: 80px
- **Sticky**: Bottom of page
- **Background**: Subtle off-white

---

## Interactions

### Transitions
- **Fast**: 150ms, cubic-bezier(0.4, 0, 0.2, 1)
- **Standard**: 150ms, cubic-bezier(0.4, 0, 0.2, 1)
- **Slow**: 200ms, cubic-bezier(0.4, 0, 0.2, 1)
- **No bounce, no parallax, no frivolous animations**

### Focus States
- **Outline**: 2px solid accent color
- **Outline offset**: 2px
- **Background subtly changes on inputs**

### Hover Effects
- **Buttons**: Opacity 0.9
- **Links**: Opacity 0.8
- **Cards**: Subtle shadow increase (no scale)

### Button States
- **Default**: Solid color (primary), border (secondary)
- **Hover**: Opacity change
- **Active**: Same as hover
- **Disabled**: Opacity 0.6, cursor not-allowed
- **Loading**: Spinner + "Loading..." text, disabled state

---

## Borders & Shadows

### Border Radius
- **Default**: 4px (most elements)
- **Small**: 3px (tight elements)
- **Large**: 6px (badges, loose elements)

### Shadows
- **Subtle**: 0 1px 2px rgba(0, 0, 0, 0.05)
- **Card**: 0 1px 3px rgba(0, 0, 0, 0.08)
- **No heavy shadows, no drop shadows on interactive elements**

---

## File Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout with metadata
│   └── page.tsx         # Home page (design system showcase)
├── components/
│   ├── Button.tsx       # Primary button component
│   ├── Card.tsx         # Card container
│   ├── Input.tsx        # Form input field
│   ├── Badge.tsx        # Status badge
│   ├── TopBar.tsx       # Navigation bar
│   ├── ContextHeader.tsx # Page header
│   ├── SecondaryPanel.tsx # Right sidebar panel
│   ├── ProofFooter.tsx  # Bottom checklist footer
│   ├── MainLayout.tsx   # Full-page layout
│   └── index.ts         # Component exports
├── styles/
│   ├── designTokens.ts  # Design system tokens
│   └── [other styles]
└── globals.css          # Global styles, typography, scrollbar

```

---

## Design Tokens

All design decisions are centralized in `src/styles/designTokens.ts`:

```typescript
export const colors = { /* Color system */ }
export const spacing = { /* Spacing scale */ }
export const typography = { /* Font sizes & weights */ }
export const borderRadius = { /* Border radius values */ }
export const shadows = { /* Shadow definitions */ }
export const transitions = { /* Timing functions */ }
export const layout = { /* Layout dimensions */ }
export const breakpoints = { /* Responsive breakpoints */ }
```

---

## Component Usage

### Creating a Page

```tsx
'use client'

import { MainLayout } from '@/components'
import { Card } from '@/components'

export default function MyPage() {
  const [proofCheckpoints, setProofCheckpoints] = useState([
    { id: 'ui', label: 'UI Built', checked: false },
    { id: 'logic', label: 'Logic Working', checked: false },
    { id: 'test', label: 'Test Passed', checked: false },
    { id: 'deploy', label: 'Deployed', checked: false },
  ])

  return (
    <MainLayout
      projectName="My Project"
      currentStep={1}
      totalSteps={5}
      status="in-progress"
      headerTitle="Step 1: Foundation"
      headerSubtitle="Establish the design foundation"
      primaryContent={<YourContent />}
      stepExplanation="This step guides you through..."
      promptContent="Your AI prompt here..."
      proofCheckpoints={proofCheckpoints}
      onCheckpointToggle={(id, checked) => { /* handle */ }}
    />
  )
}
```

---

## Development

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
# Open http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

---

## CSS Variables

Global CSS variables available throughout the app:

```css
:root {
  --color-bg: #F7F6F3;
  --color-text: #111111;
  --color-accent: #8B0000;
  --color-success: #4B7C59;
  --color-warning: #B8860B;
  --color-border: #E5E4E0;
  --color-subtle: #D4D3CF;
  --color-subtle-bg: #FAFAF8;

  --space-2xs: 4px;
  --space-xs: 8px;
  --space-sm: 16px;
  --space-md: 24px;
  --space-lg: 40px;
  --space-xl: 64px;

  --font-serif: Georgia, serif;
  --font-sans: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;

  --transition-base: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-long: 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)

---

## Performance

- Built with **Next.js 15+** for optimal performance
- **Server components** by default
- Minimal JavaScript bundle
- Optimized for **Core Web Vitals**
- **TypeScript** for type safety

---

## Rules for Extension

When adding new components:

1. **Use design tokens** from `designTokens.ts`
2. **Never use hardcoded colors** (use CSS variables or token values)
3. **Consistent spacing** (only 8px, 16px, 24px, 40px, 64px)
4. **Transitions/animations** (150ms or 200ms, cubic-bezier(0.4, 0, 0.2, 1))
5. **Border radius** (3px, 4px, or 6px only)
6. **Typography** (Serif for headings, Sans-serif for body)
7. **Avoid shadows** except `subtle` and `card`
8. **No gradients, no glassmorphism, no neon colors**
9. **Test for accessibility** (focus states, contrast, keyboard navigation)
10. **Document new components** with usage examples

---

## Status

✅ **Design System Complete**

- ✅ Design tokens defined
- ✅ Color system established
- ✅ Typography system configured
- ✅ Spacing scale implemented
- ✅ All core components built
- ✅ Layout structure established
- ✅ Global styles applied
- ✅ Development server verified
- ✅ Production build tested

**Next**: Add product features on top of this design system.

---

## License

Proprietary — KodNest Premium

---

**Built with intention. Designed once. Used everywhere.**
