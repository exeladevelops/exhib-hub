import { type Metadata } from "next";
import Staff from "./_components/staff";

export const metadata: Metadata = {
  title: "Staff - Exhibition",
  description: "View all of our lovely staff members.",
};

export default function StaffPage() {
  return <Staff />;
}
