import Link from "next/link";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { MainNav } from "./main-nav";
import { MobileNav } from "./mobile-nav";
import { buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { FaSteam, FaDiscord } from "react-icons/fa";

type SocialLink = {
  href: string;
  icon: React.ElementType;
  label: string;
};

const SocialButton = ({ href, icon: Icon, label }: SocialLink) => (
  <Link href={href} target="_blank" rel="noreferrer">
    <div
      className={cn(
        buttonVariants({
          variant: "ghost",
        }),
        "h-8 w-8 px-0",
      )}
    >
      <Icon className="h-4 w-4" />
      <span className="sr-only">{label}</span>
    </div>
  </Link>
);

const socialLinks: SocialLink[] = [
  {
    href: "https://discord.gg/Wvg4bC95Sc",
    icon: FaDiscord,
    label: "Discord",
  },
  {
    href: "https://steamcommunity.com/groups/Exhibitionrpp",
    icon: FaSteam,
    label: "Steam",
  },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-border/40 bg-background/95 px-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:px-6">
      <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
        <MainNav />
        <MobileNav />
        <div className="ml-auto flex items-center space-x-4">
          <nav className="flex items-center">
            {socialLinks.map((link) => (
              <SocialButton key={link.label} {...link} />
            ))}
            <Separator
              orientation="vertical"
              className="mx-2 mr-4 h-6 md:hidden"
            />
            <div className="md:hidden">
              <Image
                src="/logo.png"
                alt="Logo"
                width={128}
                height={129}
                className="h-5 w-auto"
              />
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
