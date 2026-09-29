# DocuPilot

AI-powered document intelligence workspace. Upload documents, extract key information, and ask questions grounded in your content — built with Next.js 16 and a custom design system.

---

## Tech Stack

- **Framework** — Next.js 16.3 (App Router, Turbopack)
- **Language** — TypeScript 5
- **Styling** — Custom CSS design system (`theme.css` + `components.css`)
- **Font** — Inter (Google Fonts, weights 400–700)

---

## Project Structure

```
docu-pilot/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout — imports theme + component CSS
│   │   ├── page.tsx                # Home page → renders CustomComponents demo
│   │   ├── globals.css             # Next.js base reset
│   │   └── customDocs.tsx/
│   │       └── page.tsx            # Component library demo page
│   ├── styles/
│   │   ├── theme.css               # All design tokens (colors, fonts, radii, shadows, spacing)
│   │   └── components.css          # Reusable component styles inside @layer components
│   └── components/
│       ├── CustomComponents.tsx    # Full component library demo (all variants + sizes)
│       └── common/
│           ├── Alert/Alert.tsx
│           ├── Avatar/Avatar.tsx
│           ├── Badge/Badge.tsx
│           ├── Button/Button.tsx
│           ├── Card/Card.tsx
│           ├── Divider/Divider.tsx
│           ├── Dropzone/Dropzone.tsx
│           ├── Icon/Icon.tsx
│           ├── Input/Input.tsx
│           ├── Logo/Logo.tsx
│           ├── Modal/Modal.tsx
│           ├── ProgressBar/ProgressBar.tsx
│           ├── SearchBox/SearchBox.tsx
│           └── Tabs/Tabs.tsx
```

---

## Pages & Routes

| Route | File | Description |
|---|---|---|
| `/` | `src/app/page.tsx` | Home — renders the full component library demo |
| `/customDocs.tsx` | `src/app/customDocs.tsx/page.tsx` | Alternate component library demo route |

---

## Design System

Design tokens and component styles are extracted from the DocuPilot DEMO project.

### `src/styles/theme.css`

Single source of truth for all design tokens — imported globally via `layout.tsx`.

| Category | Tokens |
|---|---|
| Brand / Primary | `--primary`, `--primary-hover`, `--primary-soft` |
| Background & Surface | `--bg`, `--surface`, `--surface-subtle` |
| Text | `--text`, `--text-secondary`, `--text-light` |
| Border | `--border`, `--border-strong` |
| Semantic | `--success`, `--warning`, `--danger`, `--info` (+ `-soft` variants) |
| Layout | `--sidebar-bg`, `--sidebar-width`, `--topbar-height` |
| Border Radius | `--radius-sm` (6px), `--radius` (10px), `--radius-lg` (14px) |
| Shadows | `--shadow`, `--shadow-card`, `--shadow-btn-primary`, `--shadow-modal` |
| Typography | `--font-sans`, `--font-size-*`, `--font-weight-*`, `--leading-*` |
| Spacing | `--space-1` → `--space-16` |
| Z-index | `--z-topbar` (20), `--z-sidebar` (30), `--z-modal` (100) |

### `src/styles/components.css`

30 component groups inside `@layer components`, with full variant and size coverage.

---

## Component Library

All components live in `src/components/common/` and use CSS classes from `components.css`.

### Button
```tsx
import Button from "@/components/common/Button/Button";

// Variants: primary | secondary | ghost | danger | primary-fg
// Sizes:    sm | md | lg
// Props:    icon, iconPosition, full, disabled

<Button variant="primary" size="md" icon="plus">New Document</Button>
<Button variant="secondary" size="sm" full>Cancel</Button>
<Button variant="danger" disabled>Delete</Button>
```

### Badge
```tsx
import Badge from "@/components/common/Badge/Badge";

// Variants: primary | success | info | warning | danger | neutral

<Badge variant="success" icon="check">Analyzed</Badge>
<Badge variant="danger" icon="alert">Failed</Badge>
```

### Alert
```tsx
import Alert from "@/components/common/Alert/Alert";

// Variants: error | success | warning | info

<Alert variant="error" title="Unable to sign in">Enter a valid email.</Alert>
<Alert variant="success">Document uploaded successfully.</Alert>
```

### Avatar
```tsx
import Avatar from "@/components/common/Avatar/Avatar";

// Variants: dark | primary
// Sizes:    sm | md | lg

<Avatar initials="PA" size="md" variant="dark" />
<Avatar initials="JD" src="/photo.jpg" size="lg" />
```

### Input
```tsx
import Input from "@/components/common/Input/Input";

// Sizes: sm | md | lg
// Props: label, placeholder, type, icon, error, hint, readOnly, disabled, required

<Input label="Email" type="email" icon="user" required />
<Input label="Password" type="password" icon="lock" error="Incorrect password." />
```

### Card variants
```tsx
import { Card, StatCard, SectionCard, PrivacyCard, InsightCard } from "@/components/common/Card/Card";

// StatCard tones: neutral | primary | success | info | danger | warning
<StatCard label="Total Documents" value="248" icon="file" tone="primary" />

// SectionCard with heading + actions slot
<SectionCard title="Recent Docs" actions={<Button size="sm">New</Button>}>
  {/* table rows */}
</SectionCard>
```

### Modal
```tsx
import Modal from "@/components/common/Modal/Modal";

// Sizes:         sm | md | lg
// Icon variants: primary | danger | success

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Delete Document"
  icon="trash"
  iconVariant="danger"
  actions={<><Button variant="secondary">Cancel</Button><Button variant="danger">Delete</Button></>}
/>
```

### ProgressBar
```tsx
import ProgressBar from "@/components/common/ProgressBar/ProgressBar";

// Variants: primary | success | danger
// Sizes:    md (5px) | lg (6px)

<ProgressBar value={72} showLabel label="Upload progress" />
<ProgressBar value={100} variant="success" size="lg" />
```

### Tabs
```tsx
import Tabs from "@/components/common/Tabs/Tabs";

// Variants: underline | pill
// Supports: icon, count badge, content slot, controlled + uncontrolled

<Tabs variant="underline" items={[
  { key: "docs", label: "Documents", icon: "file", count: 12, content: <DocList /> },
  { key: "ai",   label: "Analysis",  icon: "spark" },
]} />
```

### Other components

| Component | Key props |
|---|---|
| `Icon` | `name` (30 icons), `size` |
| `Logo` | `size` (sm/md/lg), `compact`, `light` |
| `SearchBox` | `value`, `onChange`, `onClear`, `width` |
| `Divider` | optional label text |
| `Dropzone` | `accept`, `maxSizeMB`, `onFile`, drag-and-drop + file preview |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the component library demo.

### Other commands

```bash
npm run build    # Production build (Turbopack)
npm run lint     # ESLint
```

---

## Importing the CSS

Both style files are imported in `src/app/layout.tsx` and are available globally:

```tsx
import "../styles/theme.css";
import "../styles/components.css";
```

All CSS custom properties from `theme.css` are available anywhere in the app via `var(--token-name)`.
