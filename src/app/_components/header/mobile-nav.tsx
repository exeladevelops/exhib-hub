"use client";

import * as React from "react";
import Link from "next/link";
import type { LinkProps } from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Sheet,
  SheetTitle,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

// Memoized menu icon component
const MenuIcon = React.memo(() => (
  <svg
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
  >
    <path
      d="M3 5H11"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M3 12H16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
    <path
      d="M3 19H21"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    ></path>
  </svg>
));
MenuIcon.displayName = "MenuIcon";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTitle />
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
          aria-label="Toggle Menu"
        >
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full bg-background/95 pr-0 backdrop-blur-md transition-transform duration-300"
      >
        <MobileLink
          href="/"
          className="group flex items-center"
          onOpenChange={setOpen}
        >
          <Image
            src="/logo.png"
            alt="Logo"
            width={96}
            height={75}
            className="h-6 w-6 transition-transform group-hover:scale-105"
          />
          <span className="pl-2 font-bold transition-colors group-hover:text-primary">
            EXHIBITION
          </span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="flex flex-col space-y-4">
            {[
              { href: "https://www.exhibitionrp.com/", label: "Forums" },
              { href: "/staff", label: "Our Team" },
              { href: "/bans", label: "Bans" },
              { href: "/store", label: "Store" },
            ].map(({ href, label }) => (
              <MobileLink
                key={href}
                href={href}
                onOpenChange={setOpen}
                className="text-base font-medium"
              >
                {label}
              </MobileLink>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

interface MobileLinkProps extends LinkProps {
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
  ...props
}: MobileLinkProps) {
  const router = useRouter();

  const handleClick = React.useCallback(() => {
    router.push(typeof href === "object" ? (href.pathname ?? "/") : href);
    onOpenChange?.(false);
  }, [href, router, onOpenChange]);

  return (
    <Link
      href={href}
      onClick={handleClick}
      className={cn(
        "transition-colors hover:text-primary focus-visible:text-primary",
        className,
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
