"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/src/components/common/Logo/Logo";
import Icon, { type IconName } from "@/src/components/common/Icon/Icon";
import Avatar from "@/src/components/common/Avatar/Avatar";
import Modal from "@/src/components/common/Modal/Modal";
import Button from "@/src/components/common/Button/Button";
import { useAuth } from "@/src/app/providers/AuthProvider";
import { displayName, userInitials } from "@/src/lib/utils/user";

const navItems: { label: string; icon: IconName; path: string }[] = [
  { label: "Dashboard", icon: "grid", path: "/dashboard" },
  { label: "Documents", icon: "file", path: "/documents" },
  { label: "Upload", icon: "upload", path: "/documents/upload" },
  { label: "Profile", icon: "user", path: "/profile" },
];

function isActive(path: string, itemPath: string): boolean {
  if (itemPath === "/documents") {
    return path === "/documents" || (path.startsWith("/documents/") && path !== "/documents/upload");
  }
  if (itemPath === "/profile") {
    return path.startsWith("/profile");
  }
  return path === itemPath;
}

export default function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { ready, isAuthenticated, user, logout } = useAuth();
  const [mobile, setMobile] = useState(false);
  const [signOutOpen, setSignOutOpen] = useState(false);

  useEffect(() => {
    if (!ready) return;
    if (!isAuthenticated) {
      router.replace("/login");
    }
  }, [ready, isAuthenticated, router]);

  if (!ready || !isAuthenticated) {
    return (
      <div className="app-loading" role="status" aria-live="polite" aria-label="Loading workspace">
        <span className="app-loading-spinner" aria-hidden="true" />
      </div>
    );
  }

  const initials = userInitials(user?.username);
  const name = displayName(user);

  return (
    <div className="app-shell">
      <aside className={`sidebar${mobile ? " sidebar-open" : ""}`}>
        <div className="sidebar-head">
          <Logo light />
          <button
            className="icon-btn mobile-close"
            onClick={() => setMobile(false)}
            aria-label="Close menu"
            type="button"
          >
            <Icon name="close" />
          </button>
        </div>
        <nav className="nav-list" aria-label="Main">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`nav-item${isActive(pathname, item.path) ? " nav-item-active" : ""}`}
              onClick={() => setMobile(false)}
            >
              <Icon name={item.icon} size={19} />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="sidebar-foot">
          <button className="user-block" type="button" onClick={() => router.push("/profile")}>
            <Avatar initials={initials} />
            <span>
              <strong>{name}</strong>
              <small>{user?.email}</small>
            </span>
            <Icon name="more" size={18} />
          </button>
          <button className="logout-button" type="button" onClick={() => setSignOutOpen(true)}>
            <Icon name="logout" size={18} />
            Sign out
          </button>
        </div>
      </aside>
      {mobile && (
        <button className="scrim" aria-label="Close navigation" onClick={() => setMobile(false)} />
      )}
      <div className="main-column">
        <header className="topbar">
          <button
            className="icon-btn menu-button"
            onClick={() => setMobile(true)}
            aria-label="Open menu"
            type="button"
          >
            <Icon name="menu" />
          </button>
          <div className="top-logo">
            <Logo compact />
          </div>
          <div className="top-actions">
            <button className="icon-btn notification" type="button" aria-label="Notifications">
              <Icon name="bell" />
              <span className="notification-dot" aria-hidden="true" />
            </button>
            <button
              type="button"
              className="avatar avatar-primary"
              onClick={() => router.push("/profile")}
              aria-label="Open profile"
            >
              {initials}
            </button>
          </div>
        </header>
        <main className="content">{children}</main>
      </div>
      <Modal
        open={signOutOpen}
        onClose={() => setSignOutOpen(false)}
        title="Sign out?"
        description="You will need to sign in again to access your documents."
        icon="logout"
        actions={
          <>
            <Button variant="secondary" onClick={() => setSignOutOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                logout();
                router.replace("/login");
              }}
            >
              Sign out
            </Button>
          </>
        }
      />
    </div>
  );
}
