"use client";

import { Suspense, memo } from "react";
import { StaffContent } from "./components/staff-content";
import { useStaffData } from "./hooks/useStaffData";
import type { StaffMember, StaffApiResponse } from "./types";
import { StaffSkeleton } from "./staff-skeleton";
import { useStaffQuery } from "@/hooks/useExhibQueries";
import { Error } from "@/components/shared/feedback/error";

const isValidStaffResponse = (data: unknown): data is StaffApiResponse => {
  if (!data || typeof data !== "object") return false;
  
  const response = data as Partial<StaffApiResponse>;
  return !!(
    Array.isArray(response.staff) &&
    Array.isArray(response.summaries) &&
    response.staff?.every(member =>
      member &&
      typeof member === "object" &&
      "SteamID" in member &&
      "Name" in member &&
      "Rank" in member &&
      "Server" in member &&
      "SteamID64" in member
    )
  );
};

const StaffWrapper = memo(function StaffWrapper() {
  const { data: staffData, isLoading, error } = useStaffQuery();
  const staff = staffData && isValidStaffResponse(staffData) 
    ? staffData.staff.map((member): StaffMember => ({
        ...member,
        avatarfull: staffData.summaries.find(s => s.steamid === member.SteamID64)?.avatarfull ?? "",
        Playtime: 0,
        LastSeen: "",
        SRank: null,
        Time: 0,
        LastTime: 0,
        Sits: 0,
        LastConnect: 0,
        LastDisconnect: 0,
      }))
    : [];
  
  const { groupedStaff } = useStaffData(staff);
  
  if (isLoading) {
    return <StaffSkeleton />;
  }

  if (error) {
    return <Error message="Unable to load staff list" description={error.message} variant="fullscreen" />;
  }

  if (!staffData) {
    return <Error message="Unable to load staff list" variant="fullscreen" />;
  }

  return <StaffContent staff={groupedStaff} />;
});
StaffWrapper.displayName = "StaffWrapper";

function Staff() {
  return (
    <Suspense fallback={<StaffSkeleton />}>
      <StaffWrapper />
    </Suspense>
  );
}

export default Staff;
