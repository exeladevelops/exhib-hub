import type { LucideIcon } from "lucide-react";

export interface NavItem {
  title: string;
  href: string;
  icon?: LucideIcon;
  disabled?: boolean;
  external?: boolean;
  label?: string;
}

export interface MainNavProps {
  items: NavItem[];
  children?: React.ReactNode;
}

export interface MobileNavProps {
  items: NavItem[];
  children?: React.ReactNode;
}

export interface SiteHeaderProps {
  mainNav: NavItem[];
  mobileNav: NavItem[];
} 