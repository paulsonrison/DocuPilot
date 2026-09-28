import { useEffect, useMemo, useState, type ReactNode } from "react";

type IconName =
  | "logo"
  | "grid"
  | "file"
  | "upload"
  | "user"
  | "shield"
  | "bell"
  | "search"
  | "plus"
  | "arrow"
  | "more"
  | "spark"
  | "check"
  | "clock"
  | "alert"
  | "trash"
  | "download"
  | "eye"
  | "menu"
  | "close"
  | "logout"
  | "copy"
  | "refresh"
  | "lock"
  | "chevron";

const paths: Record<IconName, ReactNode> = {
  logo: <><path d="M8 3.5h8l4 4v13H8z" /><path d="M16 3.5v4h4M11.5 12h5M11.5 16h3.5" /></>,
  grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
  file: <><path d="M6 2.5h8l4 4v15H6z" /><path d="M14 2.5v4h4M9 11h6M9 15h6M9 19h4" /></>,
  upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M4 15v5h16v-5" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0116 0" /></>,
  shield: <><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5z" /><path d="M9 12l2 2 4-5" /></>,
  bell: <><path d="M18 9a6 6 0 00-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="M20 20l-4-4" /></>,
  plus: <path d="M12 5v14M5 12h14" />,
  arrow: <><path d="M5 12h14M14 7l5 5-5 5" /></>,
  more: <><circle cx="5" cy="12" r="1" /><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /></>,
  spark: <><path d="M12 2l1.4 5.1L18 9l-4.6 1.9L12 16l-1.4-5.1L6 9l4.6-1.9z" /><path d="M19 15l.7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7z" /></>,
  check: <path d="M5 12l4 4L19 6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  alert: <><path d="M12 3L2.5 20h19z" /><path d="M12 9v5M12 17.5v.1" /></>,
  trash: <><path d="M4 7h16M9 7V4h6v3M7 7l1 14h8l1-14M10 11v6M14 11v6" /></>,
  download: <><path d="M12 3v12M7 10l5 5 5-5" /><path d="M4 19v2h16v-2" /></>,
  eye: <><path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z" /><circle cx="12" cy="12" r="2.5" /></>,
  menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
  close: <path d="M5 5l14 14M19 5L5 19" />,
  logout: <><path d="M10 4H4v16h6M14 8l4 4-4 4M8 12h10" /></>,
  copy: <><rect x="8" y="8" width="11" height="12" rx="2" /><path d="M16 8V4H5a2 2 0 00-2 2v10h5" /></>,
  refresh: <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M6.1 8a7 7 0 0111.7-2l2.2 2M17.9 16a7 7 0 01-11.7 2L4 16" /></>,
  lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 018 0v3" /></>,
  chevron: <path d="M9 6l6 6-6 6" />,
};

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  return <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
}

function Button({ children, variant = "primary", icon, onClick, disabled, type = "button", className = "" }: {
  children: ReactNode; variant?: "primary" | "secondary" | "ghost" | "danger"; icon?: IconName; onClick?: () => void; disabled?: boolean; type?: "button" | "submit"; className?: string;
}) {
  return <button className={`btn btn-${variant} ${className}`} onClick={onClick} disabled={disabled} type={type}>{icon && <Icon name={icon} size={17} />}<span>{children}</span></button>;
}

function Input({ label, placeholder, type = "text", error, readOnly, icon, value, onChange }: {
  label: string; placeholder?: string; type?: string; error?: string; readOnly?: boolean; icon?: IconName; value?: string; onChange?: (value: string) => void;
}) {
  return <label className="field"><span className="label">{label}</span><span className={`input-wrap ${error ? "input-error" : ""}`}>{icon && <Icon name={icon} size={18} />}<input type={type} value={value} placeholder={placeholder} readOnly={readOnly} onChange={(e) => onChange?.(e.target.value)} aria-invalid={!!error} /></span>{error && <span className="field-error"><Icon name="alert" size={14} />{error}</span>}</label>;
}

function Logo({ compact = false }: { compact?: boolean }) {
  return <div className="brand"><span className="brand-mark"><Icon name="logo" size={23} /></span>{!compact && <span>DocuPilot</span>}</div>;
}

function navigate(path: string) {
  window.history.pushState({}, "", path);
  window.dispatchEvent(new PopStateEvent("popstate"));
}

const docs = [
  { id: "resume", name: "Resume.pdf", type: "PDF", uploaded: "Today, 9:42 AM", status: "Analyzed", size: "1.8 MB" },
  { id: "requirements", name: "Project-Requirements.pdf", type: "PDF", uploaded: "Yesterday", status: "Processing", size: "3.2 MB" },
  { id: "contract", name: "Employment-Contract.pdf", type: "PDF", uploaded: "May 18, 2025", status: "Failed", size: "2.4 MB" },
  { id: "report", name: "Annual-Report.pdf", type: "PDF", uploaded: "May 12, 2025", status: "Analyzed", size: "5.7 MB" },
  { id: "research", name: "Research-Paper.pdf", type: "PDF", uploaded: "May 8, 2025", status: "Analyzed", size: "4.1 MB" },
];

function Status({ value }: { value: string }) {
  const icon = value === "Analyzed" ? "check" : value === "Processing" ? "clock" : "alert";
  return <span className={`status status-${value.toLowerCase()}`}><Icon name={icon} size={13} />{value}</span>;
}

function AuthLayout({ children, note = "Secure document intelligence, built for focused work." }: { children: ReactNode; note?: string }) {
  return <main className="auth-layout">
    <section className="auth-story">
      <Logo />
      <div className="auth-copy"><span className="eyebrow">Secure AI document workspace</span><div className="display">{note}</div><p>Upload, understand, and ask questions about your documents—with answers grounded in your content.</p></div>
      <div className="document-visual">
        <div className="visual-file"><Icon name="file" size={28} /><span /><span /><span className="short" /></div>
        <div className="visual-connector"><span /><Icon name="spark" size={20} /></div>
        <div className="visual-answer"><span className="mini-label">AI analysis</span><strong>Key information found</strong><span className="answer-line" /><span className="answer-line short" /></div>
      </div>
      <div className="trust-note"><Icon name="shield" size={17} />Your documents are private and securely processed.</div>
    </section>
    <section className="auth-panel">{children}</section>
  </main>;
}

function AuthHeader({ title, text }: { title: string; text: string }) {
  return <div className="auth-header"><div className="mobile-logo"><Logo /></div><div className="title">{title}</div><p>{text}</p></div>;
}

function Login() {
  const [email, setEmail] = useState("paul@northstar.co");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return setError("Enter a valid work email address.");
    if (!password) return setError("Enter your password to continue.");
    setLoading(true);
    setTimeout(() => navigate("/dashboard"), 700);
  };
  return <AuthLayout><form className="auth-card" onSubmit={submit}>
    <AuthHeader title="Welcome back" text="Sign in to continue to your secure workspace." />
    {error && <div className="inline-alert error"><Icon name="alert" size={18} /><span><strong>Unable to sign in</strong>{error}</span></div>}
    <Input label="Email address" placeholder="you@company.com" type="email" value={email} onChange={setEmail} />
    <div><Input label="Password" placeholder="Enter your password" type="password" value={password} onChange={setPassword} /><button type="button" className="text-link forgot" onClick={() => navigate("/forgot-password")}>Forgot password?</button></div>
    <Button type="submit" disabled={loading} className="full">{loading ? "Signing in…" : "Sign in"}</Button>
    <div className="divider"><span>New to DocuPilot?</span></div>
    <Button variant="secondary" className="full" onClick={() => navigate("/register")}>Create account</Button>
    <div className="auth-security"><Icon name="lock" size={15} />Protected with enterprise-grade security</div>
  </form></AuthLayout>;
}

function PasswordRules({ password }: { password: string }) {
  const rules = [["At least 8 characters", password.length >= 8], ["Upper and lowercase letters", /[A-Z]/.test(password) && /[a-z]/.test(password)], ["At least one number", /\d/.test(password)], ["At least one special character", /[^A-Za-z0-9]/.test(password)]] as const;
  return <div className="rules">{rules.map(([label, met]) => <span className={met ? "met" : ""} key={label}><span className="rule-icon"><Icon name="check" size={12} /></span>{label}</span>)}</div>;
}

function Register() {
  const [password, setPassword] = useState("");
  return <AuthLayout note="Put every document to work, securely."><form className="auth-card" onSubmit={(e) => { e.preventDefault(); navigate("/dashboard"); }}>
    <AuthHeader title="Create your account" text="Start analyzing your documents in minutes." />
    <Input label="Full name" placeholder="Paul Anderson" />
    <Input label="Work email" placeholder="paul@company.com" type="email" />
    <Input label="Password" placeholder="Create a strong password" type="password" value={password} onChange={setPassword} />
    <PasswordRules password={password} />
    <Input label="Confirm password" placeholder="Repeat your password" type="password" />
    <Button type="submit" className="full">Create account</Button>
    <p className="switch-auth">Already have an account? <button type="button" className="text-link" onClick={() => navigate("/")}>Sign in</button></p>
  </form></AuthLayout>;
}

function ForgotPassword({ reset = false }: { reset?: boolean }) {
  const [sent, setSent] = useState(false);
  const [password, setPassword] = useState("");
  if (sent) return <AuthLayout><div className="auth-card success-card"><span className="success-icon"><Icon name="check" size={26} /></span><AuthHeader title={reset ? "Password updated" : "Check your email"} text={reset ? "Your password has been updated successfully." : "We sent a secure reset link to paul@northstar.co. It expires in 30 minutes."} /><Button className="full" onClick={() => navigate("/")}>Return to sign in</Button></div></AuthLayout>;
  return <AuthLayout><form className="auth-card" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
    <AuthHeader title={reset ? "Set a new password" : "Forgot your password?"} text={reset ? "Choose a strong password you haven't used before." : "Enter your email and we'll send you a secure password reset link."} />
    {reset ? <><Input label="New password" type="password" placeholder="Enter a new password" value={password} onChange={setPassword} /><div className="strength"><span><i /><i /><i className={password.length > 7 ? "active" : ""} /><i /></span><small>{password.length > 7 ? "Strong" : "Password strength"}</small></div><PasswordRules password={password} /><Input label="Confirm new password" type="password" placeholder="Repeat your new password" /></> : <Input label="Email address" placeholder="you@company.com" type="email" />}
    <Button type="submit" className="full">{reset ? "Reset password" : "Send reset link"}</Button>
    <Button variant="ghost" className="full" onClick={() => navigate("/")}>Back to sign in</Button>
  </form></AuthLayout>;
}

const navItems = [
  { label: "Dashboard", icon: "grid" as IconName, path: "/dashboard" },
  { label: "Documents", icon: "file" as IconName, path: "/documents" },
  { label: "Upload", icon: "upload" as IconName, path: "/documents/upload" },
  { label: "Profile", icon: "user" as IconName, path: "/profile" },
];

function Shell({ children, path }: { children: ReactNode; path: string }) {
  const [mobile, setMobile] = useState(false);
  const [logout, setLogout] = useState(false);
  return <div className="app-shell">
    <aside className={`sidebar ${mobile ? "open" : ""}`}>
      <div className="sidebar-head"><Logo /><button className="icon-button mobile-close" onClick={() => setMobile(false)} aria-label="Close menu"><Icon name="close" /></button></div>
      <nav className="nav-list">{navItems.map((item) => <button key={item.path} className={`nav-item ${path === item.path || (item.path === "/documents" && path.startsWith("/documents/") && path !== "/documents/upload") ? "active" : ""}`} onClick={() => { navigate(item.path); setMobile(false); }}><Icon name={item.icon} size={19} />{item.label}</button>)}</nav>
      <div className="sidebar-foot">
        <button className="user-block" onClick={() => navigate("/profile")}><span className="avatar">PA</span><span><strong>Paul Anderson</strong><small>paul@northstar.co</small></span><Icon name="more" size={18} /></button>
        <button className="logout-button" onClick={() => setLogout(true)}><Icon name="logout" size={18} />Sign out</button>
      </div>
    </aside>
    {mobile && <button className="scrim" aria-label="Close navigation" onClick={() => setMobile(false)} />}
    <div className="main-column">
      <header className="topbar"><button className="icon-button menu-button" onClick={() => setMobile(true)} aria-label="Open menu"><Icon name="menu" /></button><div className="top-logo"><Logo /></div><div className="top-actions"><button className="icon-button notification" aria-label="Notifications"><Icon name="bell" /><i /></button><button className="avatar compact" onClick={() => navigate("/profile")}>PA</button></div></header>
      <main className="content">{children}</main>
    </div>
    {logout && <Modal title="Sign out?" text="You will need to sign in again to access your documents." cancel={() => setLogout(false)} action={() => navigate("/")} actionLabel="Sign out" />}
  </div>;
}

function PageHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return <div className="page-header"><div><div className="page-title">{title}</div>{description && <p>{description}</p>}</div>{action}</div>;
}

function Dashboard() {
  const summary = [
    ["Total documents", "24", "file", "neutral"],
    ["Processing", "2", "clock", "info"],
    ["Analyzed", "21", "check", "success"],
    ["Failed", "1", "alert", "danger"],
  ] as const;
  return <><PageHeader title="Good morning, Paul" description="Manage and analyze your documents with AI." action={<Button icon="upload" onClick={() => navigate("/documents/upload")}>Upload document</Button>} />
    <div className="summary-grid">{summary.map(([label, value, icon, tone]) => <div className="stat-card" key={label}><span className={`stat-icon ${tone}`}><Icon name={icon} size={20} /></span><span><small>{label}</small><strong>{value}</strong></span></div>)}</div>
    <section className="section-card">
      <div className="section-heading"><div><div className="section-title">Recent documents</div><p>Your latest uploads and analysis status.</p></div><Button variant="ghost" onClick={() => navigate("/documents")}>View all <Icon name="arrow" size={16} /></Button></div>
      <DocumentTable items={docs.slice(0, 4)} />
    </section>
    <section className="workflow">
      <div className="section-heading"><div><div className="section-title">How DocuPilot works</div><p>A simple, secure workflow from upload to answers.</p></div></div>
      <div className="steps">{[
        ["01", "Upload securely", "Files are checked for type, size, and integrity before processing.", "upload"],
        ["02", "AI analyzes", "DocuPilot extracts key information and creates a structured analysis.", "spark"],
        ["03", "Ask with confidence", "Get clear answers grounded in the content of your document.", "search"],
      ].map(([n, title, text, icon]) => <div className="step" key={n}><span className="step-icon"><Icon name={icon as IconName} /></span><span className="step-number">{n}</span><strong>{title}</strong><p>{text}</p></div>)}</div>
    </section>
  </>;
}

function DocumentTable({ items }: { items: typeof docs }) {
  return <div className="table-wrap"><div className="doc-table table-head"><span>Document</span><span>Type</span><span>Uploaded</span><span>Status</span><span /></div>{items.map((doc) => <div className="doc-table table-row" key={doc.id} onClick={() => navigate(`/documents/${doc.id}`)}>
    <span className="doc-name"><span className="file-icon"><Icon name="file" size={20} /></span><span><strong>{doc.name}</strong><small>{doc.size}</small></span></span><span className="muted-cell">{doc.type}</span><span className="muted-cell">{doc.uploaded}</span><span><Status value={doc.status} /></span><button className="icon-button" aria-label={`Actions for ${doc.name}`} onClick={(e) => e.stopPropagation()}><Icon name="more" size={19} /></button>
  </div>)}</div>;
}

function Documents() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const filtered = docs.filter((d) => (filter === "All" || d.status === filter) && d.name.toLowerCase().includes(query.toLowerCase()));
  return <><PageHeader title="Documents" description="Search, review, and manage your uploaded documents." action={<Button icon="upload" onClick={() => navigate("/documents/upload")}>Upload document</Button>} />
    <section className="section-card">
      <div className="document-tools"><label className="search-box"><Icon name="search" size={18} /><input aria-label="Search documents" placeholder="Search documents..." value={query} onChange={(e) => setQuery(e.target.value)} /></label><div className="filter-tabs">{["All", "Processing", "Analyzed", "Failed"].map((f) => <button className={filter === f ? "active" : ""} onClick={() => setFilter(f)} key={f}>{f}{f !== "All" && <span>{docs.filter((d) => d.status === f).length}</span>}</button>)}</div></div>
      {filtered.length ? <DocumentTable items={filtered} /> : <EmptyState />}
      <div className="table-footer">Showing {filtered.length} of {docs.length} documents</div>
    </section>
  </>;
}

function EmptyState() {
  return <div className="empty"><span><Icon name="file" size={28} /></span><div className="section-title">No documents found</div><p>Try a different search, or upload a new document to analyze it with AI.</p><Button icon="upload" onClick={() => navigate("/documents/upload")}>Upload document</Button></div>;
}

function UploadDocument() {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [drag, setDrag] = useState(false);
  const startUpload = () => {
    setProgress(12);
    const timer = window.setInterval(() => setProgress((p) => { if (p >= 100) { clearInterval(timer); return 100; } return Math.min(100, p + 16); }), 260);
  };
  const selectDemo = () => setFile(new File(["document"], "Project-Requirements.pdf", { type: "application/pdf" }));
  return <><PageHeader title="Upload a document" description="Securely validate, process, and analyze your file with AI." />
    <div className="upload-layout">
      <section className="section-card upload-main">
        <div className="section-heading"><div><div className="section-title">Choose a file</div><p>Your file is validated before any processing begins.</p></div><span className="secure-label"><Icon name="shield" size={15} />Private & secure</span></div>
        {!file ? <div className={`dropzone ${drag ? "dragging" : ""}`} onDragOver={(e) => { e.preventDefault(); setDrag(true); }} onDragLeave={() => setDrag(false)} onDrop={(e) => { e.preventDefault(); setDrag(false); setFile(e.dataTransfer.files[0]); }}>
          <span className="upload-icon"><Icon name="upload" size={27} /></span><div className="drop-title">Drag and drop your document here</div><p>or choose a file from your computer</p><Button variant="secondary" onClick={selectDemo}>Browse files</Button><div className="file-limits"><span>PDF, DOCX, TXT</span><i /><span>Maximum 10 MB</span></div>
        </div> : <><div className="selected-file"><span className="large-file-icon"><Icon name="file" size={26} /></span><span className="selected-meta"><strong>{file.name}</strong><small>{file.type === "application/pdf" ? "PDF" : "Document"} · {(file.size / 1024 / 1024).toFixed(1)} MB</small></span>{progress === 0 && <button className="icon-button danger-icon" aria-label="Remove file" onClick={() => setFile(null)}><Icon name="trash" size={18} /></button>}{progress > 0 && progress < 100 && <strong className="percent">{progress}%</strong>}{progress === 100 && <span className="complete-check"><Icon name="check" size={17} /></span>}</div>
          {progress > 0 && <div className="progress"><span style={{ width: `${progress}%` }} /></div>}
          <div className="validation"><div className="section-title">Validation checks</div><div className="validation-grid">{["Supported file type", "Within size limit", "Safe filename", "File integrity verified"].map((x) => <span key={x}><i><Icon name="check" size={13} /></i>{x}</span>)}</div></div>
          {progress === 100 && <div className="inline-alert success"><Icon name="check" size={18} /><span><strong>Document uploaded successfully</strong>Your analysis has started. This usually takes less than a minute.</span></div>}
        </>}
        <div className="upload-actions"><Button variant="ghost" onClick={() => navigate("/documents")}>Cancel</Button><Button icon="spark" disabled={!file || (progress > 0 && progress < 100)} onClick={progress === 100 ? () => navigate("/documents/requirements") : startUpload}>{progress === 100 ? "View processing" : "Upload & Analyze"}</Button></div>
      </section>
      <aside className="privacy-card"><span className="privacy-icon"><Icon name="shield" size={22} /></span><div className="section-title">Your documents stay yours</div><p>Files are encrypted in transit and access is limited to your account.</p><div><span><Icon name="check" size={15} />Secure validation</span><span><Icon name="check" size={15} />Private processing</span><span><Icon name="check" size={15} />Controlled AI access</span></div><small>AI-generated information should be verified before important decisions.</small></aside>
    </div>
  </>;
}

function Processing() {
  const steps = [["Upload validated", "complete"], ["Text extracted", "complete"], ["Document processed", "complete"], ["Generating AI analysis", "active"], ["Creating searchable knowledge", ""], ["Ready", ""]] as const;
  return <div className="processing-card"><span className="processing-icon"><Icon name="spark" size={25} /></span><div className="page-title">Analyzing your document</div><p>DocuPilot is securely reading Project-Requirements.pdf and preparing its analysis.</p><div className="processing-progress"><span style={{ width: "62%" }} /></div><div className="processing-steps">{steps.map(([label, state]) => <div className={state} key={label}><span>{state === "complete" ? <Icon name="check" size={14} /> : state === "active" ? <i /> : ""}</span><strong>{label}</strong>{state === "active" && <small>In progress</small>}</div>)}</div><div className="processing-note"><Icon name="clock" size={16} />This usually takes less than a minute. You can safely leave this page.</div></div>;
}

function DocumentDetails({ id }: { id: string }) {
  const doc = docs.find((d) => d.id === id) || docs[0];
  const [tab, setTab] = useState<"analysis" | "ask">("analysis");
  const [deleting, setDeleting] = useState(false);
  if (doc.status === "Processing") return <><PageHeader title={doc.name} description="Uploaded yesterday" action={<Status value="Processing" />} /><Processing /></>;
  if (doc.status === "Failed") return <><PageHeader title={doc.name} description="Uploaded May 18, 2025" /><ErrorState title="Analysis failed" text="We couldn't process this document. The file may be damaged or password protected." /></>;
  return <><div className="detail-header"><button className="back-link" onClick={() => navigate("/documents")}><span>Documents</span><Icon name="chevron" size={14} /><strong>{doc.name}</strong></button><div className="page-header"><div><div className="doc-title-row"><span className="detail-file"><Icon name="file" size={24} /></span><div><div className="page-title">{doc.name}</div><span className="detail-sub">{doc.size} · Uploaded today at 9:42 AM</span></div><Status value="Analyzed" /></div></div><div className="header-actions"><Button variant="secondary" icon="download">Download</Button><Button variant="ghost" icon="trash" onClick={() => setDeleting(true)}>Delete</Button><Button icon="spark" onClick={() => setTab("ask")}>Ask AI</Button></div></div></div>
    <div className="detail-tabs"><button className={tab === "analysis" ? "active" : ""} onClick={() => setTab("analysis")}>AI analysis</button><button className={tab === "ask" ? "active" : ""} onClick={() => setTab("ask")}>Ask AI</button></div>
    {tab === "analysis" ? <Analysis /> : <AskAI />}
    {deleting && <Modal title="Delete document?" text="This will permanently remove the document and its AI-generated data. This action cannot be undone." cancel={() => setDeleting(false)} action={() => navigate("/documents")} actionLabel="Delete document" danger />}
  </>;
}

function Analysis() {
  return <div className="analysis-layout">
    <aside className="info-card"><div className="section-title">Document information</div>{[["File type", "PDF document"], ["File size", "1.8 MB"], ["Pages", "6"], ["Processing time", "18 seconds"], ["Uploaded", "May 21, 2025"], ["Status", "Analyzed"]].map(([k, v]) => <div className="info-row" key={k}><span>{k}</span><strong>{v}</strong></div>)}<div className="ownership"><Icon name="lock" size={15} />Only you can access this document</div></aside>
    <div className="analysis-content">
      <div className="analysis-banner"><span><Icon name="spark" size={21} /></span><div><strong>AI-generated analysis</strong><p>This analysis is grounded in Resume.pdf. Verify important information against the original document.</p></div></div>
      <section className="analysis-section"><span className="section-kicker">Summary</span><div className="section-title">Professional profile overview</div><p>Paul Anderson is a senior product designer with over eight years of experience creating enterprise software and AI-assisted workflows. His background spans design systems, user research, and cross-functional product strategy, with measurable impact across B2B SaaS products.</p></section>
      <section className="analysis-section"><div className="section-heading"><div><span className="section-kicker">Document type</span><div className="section-title">Resume / Curriculum Vitae</div></div><span className="confidence">96% confidence</span></div></section>
      <section className="analysis-section"><span className="section-kicker">Key information</span><div className="key-grid">{[["Name", "Paul Anderson"], ["Current role", "Senior Product Designer"], ["Experience", "8+ years"], ["Location", "Austin, Texas"], ["Education", "BFA, Interaction Design"], ["Core skills", "Product strategy, UX, Design systems"]].map(([k, v]) => <div key={k}><span>{k}</span><strong>{v}</strong></div>)}</div></section>
      <section><div className="section-heading"><div><span className="section-kicker">Key insights</span><div className="section-title">What stands out</div></div></div><div className="insight-grid">{[["Strong leadership", "Led design initiatives across three enterprise product teams and mentored four designers."], ["Systems expertise", "Created a shared design system that improved delivery speed by 32%."], ["Measurable outcomes", "Consistently connects design decisions to adoption and retention metrics."]].map(([title, text], i) => <div className="insight-card" key={title}><span>0{i + 1}</span><strong>{title}</strong><p>{text}</p></div>)}</div></section>
      <section className="analysis-section recommendation"><span className="section-kicker">Recommendations</span><div className="section-title">Suggested improvements</div><ul><li>Add portfolio links for the two most recent enterprise projects.</li><li>Quantify the impact of earlier roles to maintain a consistent results focus.</li><li>Move technical tools into a compact skills section for faster scanning.</li></ul></section>
    </div>
  </div>;
}

function AskAI() {
  const [question, setQuestion] = useState("");
  const [asked, setAsked] = useState(true);
  const ask = () => { if (question.trim()) setAsked(true); };
  return <div className="ask-layout"><div className="ask-intro"><span><Icon name="spark" size={23} /></span><div><div className="page-title">Ask questions about this document</div><p>Get answers grounded in the contents of Resume.pdf.</p></div></div>
    <div className="suggestions">{["Summarize this document", "What are the key skills?", "What experience stands out?", "Find all important dates"].map((x) => <button key={x} onClick={() => setQuestion(x)}>{x}<Icon name="arrow" size={15} /></button>)}</div>
    {asked && <div className="conversation"><div className="message-user"><span className="avatar compact">PA</span><div><small>You</small><p>What are the strongest skills and experience highlighted in this resume?</p></div></div><div className="message-ai"><span className="ai-avatar"><Icon name="spark" size={18} /></span><div className="answer"><small>DocuPilot AI</small><p>The resume highlights a strong combination of <strong>product design leadership, design systems expertise, and enterprise SaaS experience</strong>. Paul has more than eight years of experience and has led initiatives across three product teams.</p><p>Notable strengths include:</p><ul><li>Building and scaling design systems across complex products</li><li>Connecting design work to measurable business outcomes</li><li>Leading cross-functional collaboration with product and engineering</li><li>Mentoring designers and improving team practice</li></ul><div className="sources"><strong><Icon name="file" size={15} />Sources</strong><button>Page 2 — Experience <Icon name="chevron" size={14} /></button><button>Page 4 — Skills <Icon name="chevron" size={14} /></button><button>Page 6 — Education <Icon name="chevron" size={14} /></button></div><div className="answer-actions"><Button variant="ghost" icon="copy">Copy</Button><Button variant="ghost" icon="refresh">Regenerate</Button><span>Generated from your document</span></div></div></div></div>}
    <div className="ask-composer"><label><textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Ask something about this document..." rows={2} /><span>Answers use only this document's content.</span></label><Button icon="arrow" disabled={!question.trim()} onClick={ask}>Ask AI</Button></div>
    <div className="ai-disclaimer"><Icon name="shield" size={15} />AI-generated answers may contain errors. Verify important information against the original document.</div>
  </div>;
}

function Profile({ security = false }: { security?: boolean }) {
  return <><PageHeader title={security ? "Security" : "Profile"} description={security ? "Manage your password, sessions, and account security." : "Manage your personal information and account details."} />
    <div className="profile-tabs"><button className={!security ? "active" : ""} onClick={() => navigate("/profile")}><Icon name="user" size={17} />Profile</button><button className={security ? "active" : ""} onClick={() => navigate("/profile/security")}><Icon name="shield" size={17} />Security</button></div>
    {security ? <Security /> : <div className="settings-stack">
      <section className="settings-card"><div className="settings-head"><div><div className="section-title">Personal information</div><p>Update your name and contact details.</p></div><span className="avatar profile-avatar">PA</span></div><div className="form-grid"><Input label="Full name" value="Paul Anderson" /><Input label="Email address" value="paul@northstar.co" readOnly /></div><div className="form-note"><Icon name="lock" size={14} />Contact support to change the email linked to your account.</div><div className="settings-actions"><Button>Save changes</Button></div></section>
      <section className="settings-card"><div className="section-title">Account overview</div><div className="account-grid"><div><span>Account created</span><strong>January 14, 2025</strong></div><div><span>Documents</span><strong>24 documents</strong></div><div><span>Last sign in</span><strong>Today at 9:36 AM</strong></div></div></section>
    </div>}
  </>;
}

function Security() {
  return <div className="settings-stack"><section className="settings-card"><div className="section-title">Change password</div><p className="settings-description">Use a unique password you don't use elsewhere.</p><div className="form-stack"><Input label="Current password" type="password" placeholder="Enter current password" /><Input label="New password" type="password" placeholder="Enter new password" /><PasswordRules password="" /><Input label="Confirm new password" type="password" placeholder="Repeat new password" /></div><div className="settings-actions"><Button>Update password</Button></div></section>
    <section className="settings-card"><div className="section-heading"><div><div className="section-title">Active sessions</div><p>Devices currently signed in to your account.</p></div></div><div className="session-row"><span className="device-icon"><Icon name="grid" size={20} /></span><div><strong>Chrome on macOS</strong><small>Austin, United States · Active now</small></div><Status value="Analyzed" /></div><div className="settings-actions"><Button variant="secondary">Sign out of other sessions</Button></div></section>
    <section className="settings-card"><div className="section-title">Account security</div><div className="security-list"><div><span className="security-ok"><Icon name="check" size={15} /></span><span><strong>Strong password</strong><small>Your password meets all security requirements.</small></span></div><div><span className="security-ok"><Icon name="check" size={15} /></span><span><strong>Email verified</strong><small>Your account email has been verified.</small></span></div><div><span className="security-info"><Icon name="shield" size={15} /></span><span><strong>Your data is protected</strong><small>Documents are encrypted and available only to your account.</small></span></div></div></section></div>;
}

function Modal({ title, text, cancel, action, actionLabel, danger = false }: { title: string; text: string; cancel: () => void; action: () => void; actionLabel: string; danger?: boolean }) {
  return <div className="modal-backdrop" role="presentation" onMouseDown={cancel}><div className="modal" role="dialog" aria-modal="true" onMouseDown={(e) => e.stopPropagation()}><span className={`modal-icon ${danger ? "danger" : ""}`}><Icon name={danger ? "trash" : "logout"} size={22} /></span><div className="section-title">{title}</div><p>{text}</p><div className="modal-actions"><Button variant="secondary" onClick={cancel}>Cancel</Button><Button variant={danger ? "danger" : "primary"} onClick={action}>{actionLabel}</Button></div></div></div>;
}

function ErrorState({ title = "Something went wrong", text = "We couldn't load this page. Please try again.", notFound = false }: { title?: string; text?: string; notFound?: boolean }) {
  return <div className="error-state"><span>{notFound ? "404" : <Icon name="alert" size={27} />}</span><div className="page-title">{title}</div><p>{text}</p><Button icon={notFound ? "grid" : "refresh"} onClick={() => navigate(notFound ? "/dashboard" : window.location.pathname)}>{notFound ? "Back to dashboard" : "Try again"}</Button></div>;
}

export default function App() {
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const handler = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handler);
    return () => window.removeEventListener("popstate", handler);
  }, []);
  const page = useMemo(() => {
    if (path === "/") return <Login />;
    if (path === "/register") return <Register />;
    if (path === "/forgot-password") return <ForgotPassword />;
    if (path === "/reset-password") return <ForgotPassword reset />;
    if (path === "/dashboard") return <Shell path={path}><Dashboard /></Shell>;
    if (path === "/documents") return <Shell path={path}><Documents /></Shell>;
    if (path === "/documents/upload") return <Shell path={path}><UploadDocument /></Shell>;
    if (path.startsWith("/documents/")) return <Shell path={path}><DocumentDetails id={path.split("/")[2]} /></Shell>;
    if (path === "/profile") return <Shell path={path}><Profile /></Shell>;
    if (path === "/profile/security") return <Shell path={path}><Profile security /></Shell>;
    if (path === "/error") return <Shell path={path}><ErrorState /></Shell>;
    return <Shell path={path}><ErrorState notFound title="Page not found" text="The page you're looking for doesn't exist or may have moved." /></Shell>;
  }, [path]);
  return page;
}
