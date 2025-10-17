"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";

interface SidebarNavItemProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isActive?: boolean;
}

export function SidebarNavItem({
  href,
  icon: Icon,
  label,
  isActive = false,
}: SidebarNavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
        isActive
          ? "bg-dark-secondary"
          : "hover:bg-dark-secondary/50"
      }`}
    >
      <Icon size={24} className="text-white" />
      <p className="text-white text-sm font-medium leading-normal">{label}</p>
    </Link>
  );
}