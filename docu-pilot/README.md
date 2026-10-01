# DocuPilot — Frontend

The production Next.js application for DocuPilot, an AI-powered document intelligence workspace. Auth pages are fully built; the document management and dashboard features are scaffolded and ready for implementation.

---

## Tech Stack

| | |
|---|---|
| **Framework** | Next.js 16.3.6 (App Router) |
| **Language** | TypeScript 5 |
| **UI** | React 19 |
| **Styling** | Custom CSS design system (`theme.css` + `components.css`) + Tailwind CSS v4 |
| **Fonts** | Geist Sans + Geist Mono (via `next/font/google`) |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root `/` immediately redirects to `/login`.

### Other commands

```bash
npm run build   # Production build
npm run start   # Start production server
npm run lint    # ESLint
```

---

## Project Structure

```
src/
├── app/                        # Next.js App Router pages
│   ├── layout.tsx              # Root layout — Geist fonts, global CSS
│   ├── page.tsx                # / → redirect to /login
│   ├── globals.css             # Tailwind base import + Next.js reset
│   ├── login/
│   │   └── page.tsx            # Login form (client component)
│   ├── register/
│   │   └── page.tsx            # Register form with live password rules
│   └── customDocs/
│       └── page.tsx            # Component library demo page
│
├── components/
│   ├── auth/
│   │   └── AuthSidePanel.tsx   # Shared auth page side panel (adapts to /login vs /register)
│   ├── layout/
│   │   ├── Header/
│   │   └── Footer/
│   └── common/                 # Full UI component library (14 components)
│       ├── Alert/
│       ├── Avatar/
│       ├── Badge/
│       ├── Button/
│       ├── Card/
│       ├── Divider/
│       ├── Dropzone/
│       ├── Icon/
│       ├── Input/
│       ├── Logo/
│       ├── Modal/
│       ├── ProgressBar/
│       ├── SearchBox/
│       └── Tabs/
│
├── styles/
│   ├── theme.css               # All design tokens (CSS custom properties)
│   └── components.css          # Component styles inside @layer components
│
├── features/                   # Feature modules (scaffolded, not yet implemented)
│   ├── auth/
│   ├── dashboard/
│   └── profile/
│
├── context/                    # React context providers (scaffolded)
├── hooks/                      # Custom hooks (scaffolded)
├── services/                   # API client / service layer (scaffolded)
├── store/                      # State management (scaffolded)
├── types/                      # Shared TypeScript types (scaffolded)
└── utils/                      # Utility functions (scaffolded)
```

---

## Pages & Routes

| Route | File | Status | Description |
|---|---|---|---|
| `/` | `app/page.tsx` | Done | Redirects to `/login` |
| `/login` | `app/login/page.tsx` | Done | Login form — email + password, client-side validation |
| `/register` | `app/register/page.tsx` | Done | Register form — name, email, password with live strength rules |
| `/customDocs` | `app/customDocs/page.tsx` | Done | Component library demo |
| `/dashboard` | — | Planned | Stats overview and recent documents |
| `/documents` | — | Planned | Document list with search and filtering |
| `/documents/upload` | — | Planned | Drag-and-drop file upload |
| `/documents/[id]` | — | Planned | AI analysis + Ask AI chat interface |
| `/profile` | — | Planned | User profile settings |
| `/profile/security` | — | Planned | Password and session management |

> The DEMO project at `../DEMO/` is the design reference for all planned pages — see its `src/App.tsx` for full working implementations of every screen.

---

## Auth Pages

Both auth pages use a shared two-column layout: `AuthSidePanel` on the left (decorative, adapts its copy based on the current route) and a form card on the right.

**Login (`/login`):**
- Email + password fields with client-side validation.
- Links to `/register` (create account) and `/forgot-password`.
- `handleSubmit` is currently a stub — API integration is pending.

**Register (`/register`):**
- Full name, work email, password, confirm password fields.
- Live `PasswordRules` component checks 4 criteria in real time: 8+ characters, upper/lowercase mix, number, special character.
- `handleSubmit` is currently a stub — API integration is pending.

---

## Design System

All design tokens and component styles live in `src/styles/` and are imported globally via `app/layout.tsx`.

### `theme.css` — Design tokens

| Category | Tokens |
|---|---|
| Brand / Primary | `--primary`, `--primary-hover`, `--primary-soft` |
| Background & Surface | `--bg`, `--surface`, `--surface-subtle` |
| Text | `--text`, `--text-secondary`, `--text-light` |
| Border | `--border`, `--border-strong` |
| Semantic | `--success`, `--warning`, `--danger`, `--info` (each with a `-soft` variant) |
| Layout | `--sidebar-bg`, `--sidebar-width`, `--topbar-height` |
| Border Radius | `--radius-sm` (6px), `--radius` (10px), `--radius-lg` (14px) |
| Shadows | `--shadow`, `--shadow-card`, `--shadow-btn-primary`, `--shadow-modal` |
| Typography | `--font-sans`, `--font-size-*`, `--font-weight-*`, `--leading-*` |
| Spacing | `--space-1` → `--space-16` |
| Z-index | `--z-topbar` (20), `--z-sidebar` (30), `--z-modal` (100) |

### `components.css` — Component styles

30 component groups inside `@layer components`. All tokens from `theme.css` are available via `var(--token-name)`.

---

## Component Library

All components live in `src/components/common/` and import styles from `components.css`.

### Button
```tsx
import Button from "@/components/common/Button/Button";

// variants: primary | secondary | ghost | danger
// props: type, full, disabled, icon

<Button variant="primary" full>Sign in</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost" icon="arrow">View all</Button>
<Button variant="danger" disabled>Delete</Button>
```

### Input
```tsx
import Input from "@/components/common/Input/Input";

// props: label, placeholder, type, value, onChange, error, required, readOnly

<Input label="Email address" type="email" placeholder="you@company.com" required />
<Input label="Password" type="password" error="Incorrect password." />
<Input label="Username" value={value} onChange={setValue} readOnly />
```

### Icon
```tsx
import Icon from "@/components/common/Icon/Icon";

// 30 icons: logo | grid | file | upload | user | shield | bell | search | plus |
//           arrow | more | spark | check | clock | alert | trash | download |
//           eye | menu | close | logout | copy | refresh | lock | chevron | ...

<Icon name="spark" size={20} />
<Icon name="shield" size={16} />
```

### Badge
```tsx
import Badge from "@/components/common/Badge/Badge";

<Badge variant="success" icon="check">Analyzed</Badge>
<Badge variant="danger" icon="alert">Failed</Badge>
<Badge variant="info" icon="clock">Processing</Badge>
```

### Alert
```tsx
import Alert from "@/components/common/Alert/Alert";

<Alert variant="error" title="Unable to sign in">Enter a valid email address.</Alert>
<Alert variant="success">Document uploaded successfully.</Alert>
```

### Avatar
```tsx
import Avatar from "@/components/common/Avatar/Avatar";

<Avatar initials="PA" size="md" />
<Avatar initials="PA" src="/photo.jpg" size="lg" />
```

### Card variants
```tsx
import { Card, StatCard, SectionCard } from "@/components/common/Card/Card";

<StatCard label="Total Documents" value="24" icon="file" tone="primary" />
<SectionCard title="Recent Documents" actions={<Button size="sm">View all</Button>}>
  {/* content */}
</SectionCard>
```

### Modal
```tsx
import Modal from "@/components/common/Modal/Modal";

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Delete document?"
  icon="trash"
  iconVariant="danger"
  actions={
    <>
      <Button variant="secondary" onClick={() => setOpen(false)}>Cancel</Button>
      <Button variant="danger" onClick={handleDelete}>Delete</Button>
    </>
  }
/>
```

### ProgressBar
```tsx
import ProgressBar from "@/components/common/ProgressBar/ProgressBar";

<ProgressBar value={72} showLabel label="Upload progress" />
<ProgressBar value={100} variant="success" />
```

### Tabs
```tsx
import Tabs from "@/components/common/Tabs/Tabs";

<Tabs
  variant="underline"
  items={[
    { key: "analysis", label: "AI analysis", icon: "spark", content: <Analysis /> },
    { key: "ask",      label: "Ask AI",       icon: "search" },
  ]}
/>
```

### Other components

| Component | Key props |
|---|---|
| `Logo` | `compact` |
| `SearchBox` | `value`, `onChange`, `onClear` |
| `Divider` | optional label text |
| `Dropzone` | `accept`, `maxSizeMB`, `onFile`, drag-and-drop + file preview |

---

## What's Next

The following are not yet implemented and are the logical next steps:

- **API integration** — wire login and register forms to `POST /api/auth/login` and `POST /api/auth/register`
- **Auth state** — implement context/store for the authenticated user and JWT token
- **Route protection** — redirect unauthenticated users away from protected pages
- **Feature pages** — Dashboard, Documents, Upload, Document details, Profile (reference `../DEMO/src/App.tsx`)
- **API service layer** — build out `src/services/` for document and profile API calls
