import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { MobileNavProps } from "../types";

export function MobileNav({ items, children }: MobileNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="flex flex-col space-y-4">
          {children}
          <div className="flex flex-col space-y-3">
            {items?.map((item, index) => (
              <Link
                key={index}
                href={item.disabled ? "#" : item.href}
                className={cn(
                  "text-muted-foreground",
                  pathname === item.href && "text-foreground",
                  item.disabled && "cursor-not-allowed opacity-60"
                )}
                onClick={() => setOpen(false)}
              >
                <div className="flex items-center gap-x-2">
                  {item.icon && <item.icon className="h-4 w-4" />}
                  {item.title}
                  {item.label && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      {item.label}
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
} 