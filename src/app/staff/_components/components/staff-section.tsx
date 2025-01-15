"use client";

import { memo } from "react";
import { StaffCard } from "./staff-card";
import type { StaffSectionProps } from "../types";

export const StaffSection = memo(function StaffSection({
  title,
  staff,
}: StaffSectionProps) {
  return (
    <section className="flex flex-col gap-4 sm:gap-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <div className="h-[1px] flex-1 bg-muted-foreground/10" />
      </div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 md:grid-cols-3">
        {staff.map(member => (
          <StaffCard
            key={member.SteamID64}
            staff={member}
          />
        ))}
      </div>
    </section>
  );
});
