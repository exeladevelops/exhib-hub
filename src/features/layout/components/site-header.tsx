import Link from "next/link";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import type { SiteHeaderProps } from "../types";

export function SiteHeader({ mainNav, mobileNav }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MainNav items={mainNav}>
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">ExhibHub</span>
          </Link>
        </MainNav>
        <MobileNav items={mobileNav}>
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold">ExhibHub</span>
          </Link>
        </MobileNav>
      </div>
    </header>
  );
} 