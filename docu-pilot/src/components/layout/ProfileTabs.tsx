"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/src/components/common/Icon/Icon";

export default function ProfileTabs() {
  const pathname = usePathname();

  return (
    <div className="profile-tabs" role="tablist" aria-label="Account settings">
      <Link
        href="/profile"
        role="tab"
        aria-selected={pathname === "/profile"}
        className={pathname === "/profile" ? "active" : ""}
      >
        <Icon name="user" size={17} />
        Profile
      </Link>
      <Link
        href="/profile/security"
        role="tab"
        aria-selected={pathname === "/profile/security"}
        className={pathname === "/profile/security" ? "active" : ""}
      >
        <Icon name="shield" size={17} />
        Security
      </Link>
    </div>
  );
}
