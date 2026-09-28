"use client";

import { useState } from "react";

import Icon from "./common/Icon/Icon";
import Button from "./common/Button/Button";
import Badge from "./common/Badge/Badge";
import Alert from "./common/Alert/Alert";
import Avatar from "./common/Avatar/Avatar";
import Divider from "./common/Divider/Divider";
import Logo from "./common/Logo/Logo";
import Input from "./common/Input/Input";
import SearchBox from "./common/SearchBox/SearchBox";
import ProgressBar from "./common/ProgressBar/ProgressBar";
import Tabs from "./common/Tabs/Tabs";
import Modal from "./common/Modal/Modal";
import Dropzone from "./common/Dropzone/Dropzone";
import {
  Card,
  StatCard,
  SectionCard,
  PrivacyCard,
  InsightCard,
} from "./common/Card/Card";

/* ─── Demo section wrapper ─── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 56 }}>
      <div style={{
        display: "flex", alignItems: "center", gap: 12,
        marginBottom: 24, paddingBottom: 12,
        borderBottom: "1px solid var(--border)",
      }}>
        <span className="eyebrow">{title}</span>
      </div>
      {children}
    </section>
  );
}

/* ─── Demo row wrapper ─── */
function Row({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 20 }}>
      {label && (
        <p style={{
          fontSize: "var(--font-size-xs)", color: "var(--text-light)",
          marginBottom: 10, fontWeight: 600,
        }}>
          {label}
        </p>
      )}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
        {children}
      </div>
    </div>
  );
}

/* ─── Demo grid wrapper ─── */
function Grid({ cols = 2, children }: { cols?: number; children: React.ReactNode }) {
  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      gap: 16,
    }}>
      {children}
    </div>
  );
}

/* ─── Size label chip ─── */
function SizeChip({ label }: { label: string }) {
  return (
    <span style={{
      display: "inline-block",
      marginTop: 6,
      padding: "2px 7px",
      background: "var(--surface-subtle)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-sm)",
      fontSize: "var(--font-size-2xs)",
      fontWeight: 700,
      color: "var(--text-light)",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
    }}>
      {label}
    </span>
  );
}

/* ─── Item with size label below ─── */
function Sized({ size, children }: { size: string; children: React.ReactNode }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        {children}
      </div>
      <SizeChip label={size} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN DEMO COMPONENT
   ════════════════════════════════════════════════════════════ */
export default function CustomComponents() {
  /* modal state */
  const [modalOpen, setModalOpen]           = useState(false);
  const [dangerModalOpen, setDangerModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  /* input states */
  const [email, setEmail]       = useState("paul@northstar.co");
  const [password, setPassword] = useState("");
  const [search, setSearch]     = useState("");

  /* tab state for controlled demo */
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div style={{
      fontFamily: "var(--font-sans)",
      background: "var(--bg)",
      minHeight: "100vh",
      padding: "48px 42px 80px",
    }}>
      {/* ── Page header ── */}
      <div style={{ maxWidth: 1100, margin: "0 auto 56px" }}>
        <span className="eyebrow" style={{ display: "block", marginBottom: 12 }}>
          DocuPilot Design System
        </span>
        <h1 className="display" style={{ margin: 0 }}>Component Library</h1>
        <p style={{ marginTop: 14, maxWidth: 560, fontSize: "var(--font-size-section)" }}>
          Every reusable component with all variants, sizes, and states — extracted from
          the DocuPilot design system.
        </p>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ══════════════════════════════════════════════
            1. LOGO
        ══════════════════════════════════════════════ */}
        <Section title="Logo">
          <Row label="Sizes">
            <Sized size="sm"><Logo size="sm" /></Sized>
            <Sized size="md"><Logo size="md" /></Sized>
            <Sized size="lg"><Logo size="lg" /></Sized>
          </Row>
          <Row label="Compact (icon only)">
            <Sized size="sm"><Logo compact size="sm" /></Sized>
            <Sized size="md"><Logo compact size="md" /></Sized>
            <Sized size="lg"><Logo compact size="lg" /></Sized>
          </Row>
          <Row label="Light (on dark)">
            <div style={{ background: "var(--auth-story-bg)", padding: "16px 20px", borderRadius: "var(--radius)" }}>
              <Logo light />
            </div>
            <div style={{ background: "var(--sidebar-bg)", padding: "16px 20px", borderRadius: "var(--radius)" }}>
              <Logo light compact />
            </div>
          </Row>
        </Section>

        {/* ══════════════════════════════════════════════
            2. ICON
        ══════════════════════════════════════════════ */}
        <Section title="Icon">
          <Row label="All icons (size 20)">
            {(["logo","grid","file","upload","user","shield","bell","search","plus","arrow",
               "more","spark","check","clock","alert","trash","download","eye","menu","close",
               "logout","copy","refresh","lock","chevron","star","info","send","edit","filter"] as const).map((name) => (
              <div key={name} style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
                padding: "10px 12px", background: "var(--surface)",
                border: "1px solid var(--border)", borderRadius: "var(--radius-sm)",
                minWidth: 64, color: "var(--text-secondary)",
              }}>
                <Icon name={name} size={20} />
                <span style={{ fontSize: "var(--font-size-2xs)", color: "var(--text-light)" }}>{name}</span>
              </div>
            ))}
          </Row>
          <Row label="Sizes">
            <Sized size="14px"><Icon name="file" size={14} /></Sized>
            <Sized size="18px"><Icon name="file" size={18} /></Sized>
            <Sized size="24px"><Icon name="file" size={24} /></Sized>
            <Sized size="32px"><Icon name="file" size={32} /></Sized>
            <Sized size="40px"><Icon name="file" size={40} /></Sized>
          </Row>
        </Section>

        {/* ══════════════════════════════════════════════
            3. BUTTON
        ══════════════════════════════════════════════ */}
        <Section title="Button">
          <Row label="Variants">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
            <div style={{ background: "var(--primary)", padding: "8px 12px", borderRadius: "var(--radius-sm)" }}>
              <Button variant="primary-fg">Primary Foreground</Button>
            </div>
          </Row>
          <Row label="Sizes">
            <Sized size="sm"><Button size="sm">Small</Button></Sized>
            <Sized size="md"><Button size="md">Medium</Button></Sized>
            <Sized size="lg"><Button size="lg">Large</Button></Sized>
          </Row>
          <Row label="With icon — left">
            <Button icon="plus" variant="primary">New Document</Button>
            <Button icon="upload" variant="secondary">Upload</Button>
            <Button icon="download" variant="ghost">Export</Button>
            <Button icon="trash" variant="danger">Delete</Button>
          </Row>
          <Row label="With icon — right">
            <Button icon="arrow" iconPosition="right" variant="primary">Get Started</Button>
            <Button icon="chevron" iconPosition="right" variant="secondary">View All</Button>
          </Row>
          <Row label="Disabled">
            <Button variant="primary" disabled>Primary</Button>
            <Button variant="secondary" disabled>Secondary</Button>
            <Button variant="ghost" disabled>Ghost</Button>
            <Button variant="danger" disabled>Danger</Button>
          </Row>
          <Row label="Full width">
            <div style={{ width: 320 }}>
              <Button variant="primary" full>Sign In</Button>
            </div>
          </Row>
          <Row label="Icon-only button">
            <Sized size="36px"><button className="icon-btn" aria-label="Search"><Icon name="search" size={17} /></button></Sized>
            <Sized size="36px"><button className="icon-btn" aria-label="Bell"><Icon name="bell" size={17} /></button></Sized>
            <Sized size="36px"><button className="icon-btn" aria-label="More"><Icon name="more" size={17} /></button></Sized>
            <Sized size="36px"><button className="icon-btn" aria-label="Edit"><Icon name="edit" size={17} /></button></Sized>
            <Sized size="36px"><button className="icon-btn" aria-label="Trash"><Icon name="trash" size={17} /></button></Sized>
          </Row>
        </Section>

        {/* ══════════════════════════════════════════════
            4. BADGE
        ══════════════════════════════════════════════ */}
        <Section title="Badge">
          <Row label="Variants">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="info">Info</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="danger">Danger</Badge>
            <Badge variant="neutral">Neutral</Badge>
          </Row>
          <Row label="With icon">
            <Badge variant="success" icon="check">Analyzed</Badge>
            <Badge variant="info" icon="clock">Processing</Badge>
            <Badge variant="danger" icon="alert">Failed</Badge>
            <Badge variant="warning" icon="alert">Review</Badge>
            <Badge variant="primary" icon="spark">AI Ready</Badge>
          </Row>
          <Row label="Status aliases (from DEMO)">
            <span className="badge status-analyzed"><Icon name="check" size={11} />Analyzed</span>
            <span className="badge status-processing"><Icon name="clock" size={11} />Processing</span>
            <span className="badge status-failed"><Icon name="alert" size={11} />Failed</span>
          </Row>
        </Section>

        {/* ══════════════════════════════════════════════
            5. ALERT
        ══════════════════════════════════════════════ */}
        <Section title="Alert">
          <Grid cols={2}>
            <Alert variant="error" title="Unable to sign in">
              Enter a valid work email address.
            </Alert>
            <Alert variant="success" title="Password updated">
              Your password has been changed successfully.
            </Alert>
            <Alert variant="warning" title="Storage almost full">
              You have used 90% of your document storage.
            </Alert>
            <Alert variant="info" title="Processing in progress">
              Your document is being analyzed. This may take a minute.
            </Alert>
          </Grid>
          <Row label="Without title">
            <Alert variant="error">Something went wrong. Please try again.</Alert>
            <Alert variant="success">Document uploaded successfully.</Alert>
          </Row>
          <Row label="Custom icon">
            <Alert variant="info" icon="lock">
              Protected with enterprise-grade encryption.
            </Alert>
          </Row>
        </Section>

        {/* ══════════════════════════════════════════════
            6. AVATAR
        ══════════════════════════════════════════════ */}
        <Section title="Avatar">
          <Row label="Sizes">
            <Sized size="sm"><Avatar initials="PA" size="sm" /></Sized>
            <Sized size="md"><Avatar initials="PA" size="md" /></Sized>
            <Sized size="lg"><Avatar initials="PA" size="lg" /></Sized>
          </Row>
          <Row label="Variants">
            <Avatar initials="PA" variant="dark" />
            <Avatar initials="NB" variant="primary" />
          </Row>
          <Row label="Different initials">
            <Avatar initials="JD" variant="dark" />
            <Avatar initials="AB" variant="dark" />
            <Avatar initials="XY" variant="primary" />
            <Avatar initials="KL" variant="dark" />
            <Avatar initials="MN" variant="primary" />
          </Row>
          <Row label="With image">
            <Avatar initials="PA" src="https://i.pravatar.cc/150?img=1" alt="Paul Anderson" size="md" />
            <Avatar initials="JD" src="https://i.pravatar.cc/150?img=3" alt="Jane Doe" size="lg" />
          </Row>
        </Section>

        {/* ══════════════════════════════════════════════
            7. DIVIDER
        ══════════════════════════════════════════════ */}
        <Section title="Divider">
          <div style={{ maxWidth: 420, display: "flex", flexDirection: "column", gap: 16 }}>
            <Divider />
            <Divider>Or</Divider>
            <Divider>New to DocuPilot?</Divider>
            <Divider>Continue with</Divider>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════
            8. INPUT
        ══════════════════════════════════════════════ */}
        <Section title="Input">
          <Grid cols={2}>
            <Input
              label="Email address"
              placeholder="you@company.com"
              type="email"
              icon="user"
              value={email}
              onChange={setEmail}
              required
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              type="password"
              icon="lock"
              value={password}
              onChange={setPassword}
            />
            <Input
              label="Read-only field"
              value="paul@northstar.co"
              readOnly
              icon="user"
            />
            <Input
              label="Error state"
              placeholder="you@company.com"
              type="email"
              error="Enter a valid work email address."
              icon="alert"
            />
            <Input
              label="With hint"
              placeholder="Choose a username"
              hint="Letters, numbers and underscores only."
              icon="edit"
            />
            <Input
              label="Disabled"
              value="Disabled input"
              disabled
            />
          </Grid>
          <Row label="Sizes">
            <div style={{ flex: 1, minWidth: 200 }}>
              <Input label="Small" placeholder="Small input" size="sm" />
              <SizeChip label="sm" />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <Input label="Medium (default)" placeholder="Medium input" size="md" />
              <SizeChip label="md" />
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              <Input label="Large" placeholder="Large input" size="lg" />
              <SizeChip label="lg" />
            </div>
          </Row>
        </Section>

        {/* ══════════════════════════════════════════════
            9. SEARCH BOX
        ══════════════════════════════════════════════ */}
        <Section title="Search Box">
          <Row label="Default">
            <SearchBox
              placeholder="Search documents…"
              value={search}
              onChange={setSearch}
              onClear={() => setSearch("")}
              width={290}
            />
          </Row>
          <Row label="Widths">
            <Sized size="200px"><SearchBox placeholder="Narrow" width={200} /></Sized>
            <Sized size="290px"><SearchBox placeholder="Default (290px)" width={290} /></Sized>
            <Sized size="380px"><SearchBox placeholder="Wide" width={380} /></Sized>
          </Row>
        </Section>

        {/* ══════════════════════════════════════════════
            10. PROGRESS BAR
        ══════════════════════════════════════════════ */}
        <Section title="Progress Bar">
          <div style={{ maxWidth: 480, display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
              <ProgressBar value={72} label="Upload progress" showLabel />
              <SizeChip label="sm (5px)" />
            </div>
            <div>
              <ProgressBar value={100} variant="success" label="Analysis complete" showLabel />
              <SizeChip label="sm (5px) · success" />
            </div>
            <div>
              <ProgressBar value={23} variant="danger" label="Storage used" showLabel />
              <SizeChip label="sm (5px) · danger" />
            </div>
            <div>
              <ProgressBar value={55} size="lg" label="Processing" showLabel />
              <SizeChip label="lg (6px)" />
            </div>
          </div>
          <Row label="Without label">
            <div style={{ flex: 1 }}><ProgressBar value={40} /></div>
            <div style={{ flex: 1 }}><ProgressBar value={75} variant="success" /></div>
            <div style={{ flex: 1 }}><ProgressBar value={15} variant="danger" /></div>
          </Row>
          <Row label="Values">
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}>
              {[10, 25, 50, 75, 90, 100].map((v) => (
                <ProgressBar key={v} value={v} showLabel label={`${v}%`} />
              ))}
            </div>
          </Row>
        </Section>

        {/* ══════════════════════════════════════════════
            11. TABS
        ══════════════════════════════════════════════ */}
        <Section title="Tabs">
          <div style={{ marginBottom: 32 }}>
            <p style={{ marginBottom: 12, fontSize: "var(--font-size-xs)", color: "var(--text-light)", fontWeight: 600 }}>
              Underline variant
            </p>
            <Tabs
              variant="underline"
              activeTab={activeTab}
              onChange={setActiveTab}
              items={[
                {
                  key: "overview",
                  label: "Overview",
                  icon: "grid",
                  content: (
                    <div className="card" style={{ padding: 20 }}>
                      <p>Overview tab content — documents summary, recent activity, stats.</p>
                    </div>
                  ),
                },
                {
                  key: "documents",
                  label: "Documents",
                  icon: "file",
                  count: 12,
                  content: (
                    <div className="card" style={{ padding: 20 }}>
                      <p>Documents tab content — file list with upload, filter, search.</p>
                    </div>
                  ),
                },
                {
                  key: "analysis",
                  label: "Analysis",
                  icon: "spark",
                  content: (
                    <div className="card" style={{ padding: 20 }}>
                      <p>Analysis tab content — AI insights and extracted data.</p>
                    </div>
                  ),
                },
                {
                  key: "settings",
                  label: "Settings",
                  icon: "user",
                  content: (
                    <div className="card" style={{ padding: 20 }}>
                      <p>Settings tab content — profile, security, notifications.</p>
                    </div>
                  ),
                },
              ]}
            />
          </div>

          <div>
            <p style={{ marginBottom: 12, fontSize: "var(--font-size-xs)", color: "var(--text-light)", fontWeight: 600 }}>
              Pill variant
            </p>
            <Tabs
              variant="pill"
              defaultTab="all"
              items={[
                { key: "all",        label: "All",        count: 24 },
                { key: "analyzed",   label: "Analyzed",   count: 18 },
                { key: "processing", label: "Processing", count: 3 },
                { key: "failed",     label: "Failed",     count: 2 },
              ]}
            />
          </div>
        </Section>

        {/* ══════════════════════════════════════════════
            12. CARD
        ══════════════════════════════════════════════ */}
        <Section title="Card">
          <Row label="Stat cards — all icon tones">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(180px, 1fr))", gap: 16, width: "100%" }}>
              <StatCard label="Total Documents"  value="248"   icon="file"     tone="neutral" />
              <StatCard label="AI Analyzed"      value="186"   icon="spark"    tone="primary" />
              <StatCard label="Processed Today"  value="12"    icon="check"    tone="success" />
              <StatCard label="Processing"       value="4"     icon="clock"    tone="info"    />
              <StatCard label="Failed"           value="3"     icon="alert"    tone="danger"  />
              <StatCard label="Storage Used"     value="2.4 GB" icon="upload"  tone="warning" />
            </div>
          </Row>

          <Row label="Section card">
            <div style={{ width: "100%" }}>
              <SectionCard
                title="Recent Documents"
                description="Your last uploaded and analyzed files."
                actions={<Button variant="ghost" size="sm" icon="plus">New</Button>}
              >
                <div style={{ padding: "0 22px 20px" }}>
                  {["Resume.pdf", "Project-Requirements.pdf", "Annual-Report.pdf"].map((name, i) => (
                    <div key={name} style={{
                      display: "flex", alignItems: "center", gap: 12,
                      padding: "12px 0",
                      borderBottom: i < 2 ? "1px solid var(--border)" : "none",
                    }}>
                      <div className="file-icon"><Icon name="file" size={16} /></div>
                      <span style={{ flex: 1, fontSize: "var(--font-size-small)", fontWeight: 600 }}>{name}</span>
                      <Badge variant={i === 1 ? "info" : "success"} icon={i === 1 ? "clock" : "check"}>
                        {i === 1 ? "Processing" : "Analyzed"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </SectionCard>
            </div>
          </Row>

          <Row label="Base card with padding">
            <Card padding>
              <div className="section-title" style={{ marginBottom: 8 }}>Settings Card</div>
              <p>Standard padded card used for settings, info panels, and analysis sections.</p>
            </Card>
            <Card padding onClick={() => alert("Card clicked")}>
              <div className="section-title" style={{ marginBottom: 8 }}>Clickable Card</div>
              <p>Cards can be made interactive by passing an onClick handler.</p>
            </Card>
          </Row>

          <Row label="Privacy card (dark)">
            <div style={{ maxWidth: 300 }}>
              <PrivacyCard
                icon="shield"
                title="Your data is private"
                description="Documents are processed securely and never shared."
                items={[
                  "End-to-end encryption",
                  "No third-party sharing",
                  "GDPR compliant",
                  "Auto-delete after 30 days",
                ]}
                footer="All processing happens on isolated, secure infrastructure."
              />
            </div>
          </Row>

          <Row label="Insight cards">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12, width: "100%" }}>
              <InsightCard
                kicker="Key Finding"
                title="Contract term is 24 months"
                description="The employment agreement specifies a fixed term of 24 months starting from the effective date."
              />
              <InsightCard
                kicker="Risk Flag"
                title="Non-compete clause present"
                description="Section 4.2 contains a 12-month non-compete agreement covering direct competitors."
                highlight
              />
              <InsightCard
                kicker="Recommendation"
                title="Review termination clause"
                description="The termination clause lacks specificity around notice periods. Legal review is suggested."
              />
            </div>
          </Row>
        </Section>

        {/* ══════════════════════════════════════════════
            13. MODAL
        ══════════════════════════════════════════════ */}
        <Section title="Modal">
          <Row label="Trigger buttons">
            <Sized size="md · primary"><Button variant="primary" icon="spark" onClick={() => setModalOpen(true)}>Default modal</Button></Sized>
            <Sized size="md · danger"><Button variant="danger" icon="trash" onClick={() => setDangerModalOpen(true)}>Danger modal</Button></Sized>
            <Sized size="md · success"><Button variant="secondary" icon="check" onClick={() => setSuccessModalOpen(true)}>Success modal</Button></Sized>
          </Row>

          {/* Default modal */}
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Analyze Document"
            description="DocuPilot will extract key information, identify clauses, and generate insights from your document."
            icon="spark"
            iconVariant="primary"
            actions={
              <>
                <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                <Button variant="primary" icon="spark" onClick={() => setModalOpen(false)}>
                  Start Analysis
                </Button>
              </>
            }
          />

          {/* Danger modal */}
          <Modal
            open={dangerModalOpen}
            onClose={() => setDangerModalOpen(false)}
            title="Delete Document"
            description="This will permanently delete Resume.pdf and all its analysis data. This action cannot be undone."
            icon="trash"
            iconVariant="danger"
            actions={
              <>
                <Button variant="secondary" onClick={() => setDangerModalOpen(false)}>Cancel</Button>
                <Button variant="danger" icon="trash" onClick={() => setDangerModalOpen(false)}>
                  Delete permanently
                </Button>
              </>
            }
          />

          {/* Success modal */}
          <Modal
            open={successModalOpen}
            onClose={() => setSuccessModalOpen(false)}
            title="Analysis Complete"
            description="Your document has been successfully analyzed. View insights and ask questions about your content."
            icon="check"
            iconVariant="success"
            actions={
              <>
                <Button variant="secondary" onClick={() => setSuccessModalOpen(false)}>Close</Button>
                <Button variant="primary" icon="eye" onClick={() => setSuccessModalOpen(false)}>
                  View Results
                </Button>
              </>
            }
          />
        </Section>

        {/* ══════════════════════════════════════════════
            14. DROPZONE
        ══════════════════════════════════════════════ */}
        <Section title="Dropzone">
          <Grid cols={2}>
            <div>
              <p style={{ fontSize: "var(--font-size-xs)", color: "var(--text-light)", fontWeight: 600, marginBottom: 10 }}>
                Default (PDF, DOC, DOCX)
              </p>
              <Dropzone
                onFile={(f) => console.log("File selected:", f.name)}
              />
            </div>
            <div>
              <p style={{ fontSize: "var(--font-size-xs)", color: "var(--text-light)", fontWeight: 600, marginBottom: 10 }}>
                Images only, 10 MB max
              </p>
              <Dropzone
                accept=".png,.jpg,.jpeg,.webp"
                maxSizeMB={10}
                label="Drop an image or browse"
                sublabel="PNG, JPG, WEBP supported"
                onFile={(f) => console.log("Image selected:", f.name)}
              />
            </div>
          </Grid>
        </Section>

        {/* ══════════════════════════════════════════════
            15. TYPOGRAPHY
        ══════════════════════════════════════════════ */}
        <Section title="Typography">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div><span className="eyebrow">Eyebrow / Section kicker</span></div>
            <div className="display">Display — Document Intelligence</div>
            <div className="title">Title — Welcome back</div>
            <div className="page-title">Page Title — Your Documents</div>
            <div className="section-title">Section Title — Recent Activity</div>
            <p style={{ fontSize: "var(--font-size-base)" }}>
              Body — Upload, understand, and ask questions about your documents — with answers
              grounded in your actual content.
            </p>
            <p style={{ fontSize: "var(--font-size-small)" }}>
              Small — Your documents are processed securely using enterprise-grade encryption.
            </p>
            <p style={{ fontSize: "var(--font-size-xs)" }}>
              XS — Last updated 2 minutes ago · 1.8 MB · PDF
            </p>
            <button type="button" className="text-link">Text link — Forgot password?</button>
          </div>
        </Section>

        {/* ══════════════════════════════════════════════
            16. COLOUR PALETTE
        ══════════════════════════════════════════════ */}
        <Section title="Colour Palette">
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {[
              {
                group: "Brand",
                swatches: [
                  { label: "--primary",       bg: "var(--primary)",      fg: "#fff" },
                  { label: "--primary-hover",  bg: "var(--primary-hover)", fg: "#fff" },
                  { label: "--primary-soft",   bg: "var(--primary-soft)", fg: "var(--primary)" },
                ],
              },
              {
                group: "Surface",
                swatches: [
                  { label: "--bg",             bg: "var(--bg)",           fg: "var(--text)" },
                  { label: "--surface",        bg: "var(--surface)",      fg: "var(--text)" },
                  { label: "--surface-subtle", bg: "var(--surface-subtle)", fg: "var(--text)" },
                ],
              },
              {
                group: "Text",
                swatches: [
                  { label: "--text",           bg: "var(--text)",         fg: "#fff" },
                  { label: "--text-secondary", bg: "var(--text-secondary)", fg: "#fff" },
                  { label: "--text-light",     bg: "var(--text-light)",   fg: "#fff" },
                ],
              },
              {
                group: "Semantic",
                swatches: [
                  { label: "--success",      bg: "var(--success)",      fg: "#fff" },
                  { label: "--success-soft", bg: "var(--success-soft)", fg: "var(--success)" },
                  { label: "--warning",      bg: "var(--warning)",      fg: "#fff" },
                  { label: "--warning-soft", bg: "var(--warning-soft)", fg: "var(--warning)" },
                  { label: "--danger",       bg: "var(--danger)",       fg: "#fff" },
                  { label: "--danger-soft",  bg: "var(--danger-soft)",  fg: "var(--danger)" },
                  { label: "--info",         bg: "var(--info)",         fg: "#fff" },
                  { label: "--info-soft",    bg: "var(--info-soft)",    fg: "var(--info)" },
                ],
              },
              {
                group: "Layout",
                swatches: [
                  { label: "--sidebar-bg",   bg: "var(--sidebar-bg)",  fg: "#fff" },
                  { label: "--border",       bg: "var(--border)",       fg: "var(--text)" },
                  { label: "--border-strong", bg: "var(--border-strong)", fg: "var(--text)" },
                ],
              },
            ].map(({ group, swatches }) => (
              <div key={group}>
                <p style={{ fontSize: "var(--font-size-xs)", fontWeight: 600, color: "var(--text-light)", marginBottom: 8 }}>
                  {group}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {swatches.map(({ label, bg, fg }) => (
                    <div key={label} style={{
                      background: bg, color: fg,
                      borderRadius: "var(--radius-sm)",
                      padding: "12px 14px",
                      fontSize: "var(--font-size-xs)",
                      fontWeight: 600,
                      border: "1px solid rgba(0,0,0,0.06)",
                      minWidth: 140,
                    }}>
                      {label}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

      </div>
    </div>
  );
}
