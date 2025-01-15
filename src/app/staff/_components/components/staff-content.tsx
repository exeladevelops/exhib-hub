"use client";

import { memo } from "react";
import { StaffSection } from "./staff-section";
import type { StaffContentProps, StaffGroup, GroupedStaff } from "../types";

function isValidStaffGroup(value: unknown): value is StaffGroup {
  return Array.isArray(value) && value.every(member => 
    typeof member === "object" && 
    member !== null && 
    "Name" in member && 
    "Rank" in member && 
    "avatarfull" in member
  );
}

function isValidGroupedStaff(value: unknown): value is GroupedStaff {
  return (
    typeof value === "object" &&
    value !== null &&
    Object.values(value).every(group => isValidStaffGroup(group))
  );
}

export const StaffContent = memo(function StaffContent({ staff }: StaffContentProps) {
  if (!isValidGroupedStaff(staff)) {
    console.log("Invalid staff data:", staff);
    return null;
  }

  return (
    <main className="mx-auto flex max-w-6xl flex-col items-center px-4 py-8 sm:px-6 sm:py-16">
      <div className="flex w-full flex-col gap-8 sm:gap-10">
        {Object.entries(staff).map(([category, members]) => (
          members.length > 0 && (
            <StaffSection
              key={category}
              title={category}
              staff={members}
            />
          )
        ))}
      </div>
    </main>
  );
});
