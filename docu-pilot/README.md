# DocuPilot — Frontend

Next.js application for DocuPilot, an AI-powered document intelligence workspace. The full authentication flow is implemented end-to-end (register, login, email verification, forgot/reset password). Document upload and management are client-side only pending the backend document API; AI analysis is scaffolded.

---

## Tech Stack

| | |
|---|---|
| **Framework** | Next.js 16.3.6 (App Router) |
| **Language** | TypeScript 5 |
| **UI** | React 19 |
| **Styling** | Custom CSS design system (`theme.css` + `components.css` + `pages.css`) + Tailwind CSS v4 |
| **Font** | Inter (via `next/font/google`) |
| **HTTP** | Native `fetch` — no HTTP client library |
| **State** | React Context + `sessionStorage` (auth) + `localStorage` (documents) |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The root `/` immediately redirects to `/login`.

### Environment

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

This is the only required variable. It points to the backend API. Defaults to `http://localhost:8000` in development if unset.

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
├── app/                            # Next.js App Router
│   ├── layout.tsx                  # Root layout — Inter font, global CSS, AppProviders
│   ├── page.tsx                    # / → redirect to /login
│   ├── globals.css                 # Tailwind import + design system imports
│   ├── not-found.tsx               # Custom 404
│   ├── error/page.tsx              # Generic error page
│   ├── login/page.tsx
│   ├── register/page.tsx
│   ├── forgot-password/page.tsx
│   ├── reset-password/page.tsx     # Reads ?token= from URL
│   ├── verify-email/page.tsx       # Reads ?token= from URL, auto-verifies on mount
│   ├── dashboard/page.tsx
│   ├── documents/
│   │   ├── page.tsx                # Document list with search and status filters
│   │   ├── upload/page.tsx         # Drag-and-drop file upload
│   │   └── [id]/page.tsx           # Document detail — AI analysis + Ask AI
│   ├── profile/
│   │   ├── page.tsx                # Edit username/email
│   │   └── security/page.tsx       # Change password + active sessions
│   ├── customDocs/page.tsx         # Internal component library showcase
│   └── providers/
│       ├── AppProviders.tsx        # Composes AuthProvider + DocumentsProvider
│       ├── AuthProvider.tsx        # Auth context, session hydration, useAuth hook
│       └── DocumentsProvider.tsx   # Document context, localStorage, useDocuments hook
│
├── components/
│   ├── auth/
│   │   ├── AuthLayout.tsx          # Two-column auth page shell
│   │   ├── AuthSidePanel.tsx       # Left decorative panel (adapts copy per route)
│   │   ├── AuthHeader.tsx
│   │   ├── AuthPageFallback.tsx    # Loading state for auth pages
│   │   ├── GuestGuard.tsx          # Redirects authenticated users to /dashboard
│   │   └── PasswordRules.tsx       # Live password strength checklist
│   ├── common/                     # 14-component design system library
│   │   ├── Alert/
│   │   ├── Avatar/
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Divider/
│   │   ├── Dropzone/
│   │   ├── Icon/
│   │   ├── Input/
│   │   ├── Logo/
│   │   ├── Modal/
│   │   ├── ProgressBar/
│   │   ├── SearchBox/
│   │   └── Tabs/
│   ├── documents/
│   │   ├── DocumentStatusBadge.tsx
│   │   └── DocumentTable.tsx
│   ├── feedback/
│   │   ├── EmptyState.tsx
│   │   ├── ErrorState.tsx
│   │   └── FormStatus.tsx
│   └── layout/
│       ├── AppShell.tsx            # Authenticated page shell — redirects to /login if not authed
│       ├── PageHeader.tsx
│       └── ProfileTabs.tsx
│
├── features/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   ├── ForgotPasswordForm.tsx
│   │   ├── ResetPasswordForm.tsx
│   │   └── VerifyEmailPanel.tsx
│   ├── documents/
│   │   ├── DocumentUploadForm.tsx
│   │   ├── DocumentDetails.tsx
│   │   ├── DocumentAskPanel.tsx
│   │   └── DocumentQueuedPanel.tsx
│   └── profile/
│       ├── ProfileForm.tsx
│       └── ChangePasswordForm.tsx
│
├── lib/
│   ├── api/
│   │   ├── client.ts              # fetch wrapper — Bearer token, error parsing, auto-logout on 401
│   │   ├── auth.api.ts            # Auth endpoint definitions
│   │   ├── profile.api.ts         # Profile endpoint definitions
│   │   └── document.api.ts        # Stub — document backend not yet implemented
│   ├── auth/
│   │   └── token-store.ts         # sessionStorage read/write/clear helpers
│   ├── storage/
│   │   └── document-store.ts      # localStorage document persistence helpers
│   ├── utils/
│   │   └── user.ts
│   └── env.ts                     # NEXT_PUBLIC_API_URL validation + dev fallback
│
├── services/
│   ├── auth.service.ts            # Delegates to auth.api.ts
│   ├── profile.service.ts         # Delegates to profile.api.ts
│   └── document.service.ts        # Client-side document logic (localStorage only)
│
├── styles/
│   ├── theme.css                  # All CSS custom property design tokens
│   ├── components.css             # Component styles (@layer components)
│   └── pages.css                  # Page-level layout styles
│
├── types/
│   ├── auth.ts
│   ├── document.ts
│   ├── api.ts                     # ApiError class, response types
│   └── env.d.ts
│
└── validators/
    ├── auth.validators.ts
    └── document.validators.ts
```

---

## Pages & Routes

| Route | Auth required | Status | Description |
|---|---|---|---|
| `/` | — | Done | Redirects to `/login` |
| `/login` | Guest only | Done | Email + password, redirects to `/dashboard` on success |
| `/register` | Guest only | Done | Username, email, password with live strength rules |
| `/forgot-password` | Guest only | Done | Sends reset email via backend |
| `/reset-password` | Guest only | Done | Reads `?token=` from URL, sets new password |
| `/verify-email` | — | Done | Reads `?token=` from URL, auto-verifies on mount |
| `/dashboard` | Required | Done | Stats overview + recent documents table |
| `/documents` | Required | Done | Document list with search + status tab filters |
| `/documents/upload` | Required | Done | Drag-and-drop upload (client-side only) |
| `/documents/[id]` | Required | Done | Document detail — AI Analysis + Ask AI tabs |
| `/profile` | Required | Done | Edit username and email |
| `/profile/security` | Required | Done | Change password + active sessions |
| `/customDocs` | — | Internal | Component library showcase — not a user-facing route |

Guest-only pages use `GuestGuard` — authenticated users are redirected to `/dashboard`. Authenticated pages use `AppShell` — unauthenticated users are redirected to `/login`.

---

## Auth Flows

All six auth endpoints are wired to the backend. The call chain is:

```
Feature form → service → lib/api → apiRequest (fetch) → backend
```

| Flow | Backend endpoint |
|---|---|
| Register | `POST /api/auth/register` |
| Login | `POST /api/auth/login` |
| Verify email | `POST /api/auth/verify-email` |
| Resend verification | `POST /api/auth/resend-verification` |
| Forgot password | `POST /api/auth/forgot-password` |
| Reset password | `POST /api/auth/reset-password` |

On login, the `accessToken` and `user` are written to `sessionStorage` under `"docupilot.session"`. The session is tab-scoped — closing the browser tab signs the user out. On any `401` response (outside of the login call itself), the session is cleared and the user is redirected to `/login?reason=expired`.

On mount, `AuthProvider` reads the stored session, sets user state immediately (fast render), then fires `GET /api/profile` to hydrate fresh profile data.

---

## State Management

No Redux, Zustand, or other state library. All state is React Context backed by Web Storage.

**`AuthContext`** (`app/providers/AuthProvider.tsx`)
- `user` — the authenticated user (`null` when logged out)
- `isAuthenticated` — `Boolean(user)`
- `ready` — `false` until initial session hydration completes (prevents auth-redirect flicker)
- `setSession(accessToken, user)` — called after login/register
- `refreshProfile()` — re-fetches profile from the backend
- `logout()` — clears session, sets user to `null`

**`DocumentsContext`** (`app/providers/DocumentsProvider.tsx`)
- `documents` — array of `WorkspaceDocument` records (from `localStorage`)
- `addDocument(file)` — validates, creates a document record, persists to `localStorage`
- `removeDocument(id)` — removes from `localStorage`
- `getDocument(id)` / `getFile(id)` — lookup helpers
- Document metadata is persisted to `localStorage` keyed by `userId`. Actual `File` objects are held in memory only — they are lost on page reload.

---

## Document Management

Document storage is **client-side only**. There is no backend document API yet.

- Files are validated on upload: PDF/DOCX/TXT only, ≤ 10 MB, safe filename
- Documents are stored in `localStorage` with status `"Queued"` after upload
- Status remains `"Queued"` indefinitely — AI analysis requires a backend document API
- The `DocumentDetails` page renders a queued-state panel when status is `Queued`, and an analysis layout with an "AI analysis not yet available" notice when status is `Analyzed`

---

## Design System

All design tokens and component styles live in `src/styles/` and are imported globally via `globals.css`.

### `theme.css` — Design tokens

CSS custom properties covering:

| Category | Examples |
|---|---|
| Brand | `--primary`, `--primary-hover`, `--primary-soft` |
| Background & Surface | `--bg`, `--surface`, `--surface-subtle` |
| Text | `--text`, `--text-secondary`, `--text-light` |
| Border | `--border`, `--border-strong` |
| Semantic | `--success`, `--warning`, `--danger`, `--info` (each with a `-soft` variant) |
| Layout | `--sidebar-width`, `--topbar-height` |
| Border Radius | `--radius-sm` (6px), `--radius` (10px), `--radius-lg` (14px) |
| Shadows | `--shadow`, `--shadow-card`, `--shadow-btn-primary`, `--shadow-modal` |
| Typography | `--font-sans`, `--font-size-*`, `--font-weight-*` |
| Spacing | `--space-1` → `--space-16` |
| Z-index | `--z-topbar` (20), `--z-sidebar` (30), `--z-modal` (100) |

---

## Component Library

All 14 components live in `src/components/common/`.

### Button
```tsx
// variants: primary | secondary | ghost | danger
<Button variant="primary" full>Sign in</Button>
<Button variant="secondary">Cancel</Button>
<Button variant="ghost" icon="arrow">View all</Button>
<Button variant="danger" disabled>Delete</Button>
```

### Input
```tsx
// props: label, placeholder, type, value, onChange, error, required, readOnly
<Input label="Email address" type="email" placeholder="you@company.com" required />
<Input label="Password" type="password" error="Incorrect password." />
```

### Icon
```tsx
// 30+ icons: logo | grid | file | upload | user | shield | bell | search | plus |
//            arrow | more | spark | check | clock | alert | trash | download |
//            eye | menu | close | logout | copy | refresh | lock | chevron | ...
<Icon name="spark" size={20} />
```

### Badge
```tsx
<Badge variant="success" icon="check">Analyzed</Badge>
<Badge variant="danger" icon="alert">Failed</Badge>
<Badge variant="info" icon="clock">Processing</Badge>
```

### Alert
```tsx
<Alert variant="error" title="Unable to sign in">Enter a valid email address.</Alert>
<Alert variant="success">Document uploaded successfully.</Alert>
```

### Card variants
```tsx
import { Card, StatCard, SectionCard } from "@/components/common/Card/Card";

<StatCard label="Total Documents" value="24" icon="file" tone="primary" />
<SectionCard title="Recent Documents" actions={<Button>View all</Button>}>
  {/* content */}
</SectionCard>
```

### Modal
```tsx
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

### Other components

| Component | Key props |
|---|---|
| `Avatar` | `initials`, `src`, `size` |
| `Logo` | `compact` |
| `SearchBox` | `value`, `onChange`, `onClear` |
| `Divider` | optional label text |
| `Dropzone` | `accept`, `maxSizeMB`, `onFile`, drag-and-drop + file preview |
| `ProgressBar` | `value`, `variant`, `showLabel` |
| `Tabs` | `variant`, `items: [{ key, label, icon, content }]` |

---

## What's Next

| Area | Status |
|---|---|
| Full auth flow (register / verify / login / forgot + reset password) | Done |
| Profile — view and update username/email | Done |
| Profile — change password | Done |
| Document upload + client-side storage | Done |
| Dashboard + document list UI | Done |
| Backend document storage API | Pending |
| AI document processing (OCR + OpenAI) | Pending |
| Real-time document status updates | Pending |
| JWT refresh token / logout endpoint | Pending |
