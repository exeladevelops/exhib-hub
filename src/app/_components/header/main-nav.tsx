"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

export function MainNav() {
  const pathname = usePathname();

  const baseLinkStyles = "transition-colors hover:text-foreground/80 relative";
  const externalLinkStyles = cn(baseLinkStyles, "text-foreground/60");

  const navLinks = [
    { href: "https://www.exhibitionrp.com/", label: "Forums", external: true },
    { href: "/staff", label: "Our Team" },
    { href: "/bans", label: "Bans" },
    { href: "/store", label: "Store" },
  ];

  return (
    <div className="mr-4 hidden md:flex">
      <Link
        href="/"
        prefetch={true}
        className="group mr-6 flex items-center space-x-2"
      >
        <Image
          src="/logo.png"
          alt="Logo"
          width={96}
          height={75}
          className="h-8 w-8 transition-transform hover:rotate-3 hover:scale-105"
        />
        <span className="hidden font-bold transition-colors group-hover:text-primary lg:inline-block">
          EXHIBITION
        </span>
      </Link>
      <nav className="flex items-center gap-6 rounded-lg bg-background/60 bg-opacity-50 p-2 text-sm backdrop-blur-sm">
        {navLinks.map(({ href, label, external }) => (
          <Link
            key={href}
            href={href}
            prefetch={!external}
            className={cn(
              external ? externalLinkStyles : baseLinkStyles,
              !external && pathname?.startsWith(href)
                ? "text-foreground after:absolute after:bottom-[-8px] after:left-0 after:h-[2px] after:w-full after:bg-foreground after:content-['']"
                : "text-foreground/60",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
