import { memo, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HiOutlineClock } from "react-icons/hi";
import { BsPeopleFill } from "react-icons/bs";
import { FaSteam } from "react-icons/fa";
import { type ProfileStatsProps } from "./types";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: typeof HiOutlineClock;
  title: string;
  value: string | number;
  href?: string;
}

const StatCard = memo(function StatCard({
  icon: Icon,
  title,
  value,
  href,
}: StatCardProps) {
  const cardContent = useMemo(
    () => (
      <>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
          <CardTitle className="text-xs font-medium text-muted-foreground">
            {title}
          </CardTitle>
          <Icon
            className={cn(
              "h-3.5 w-3.5 text-muted-foreground transition-transform duration-300",
              href && "group-hover:text-primary",
            )}
            aria-hidden="true"
          />
        </CardHeader>
        <CardContent>
          <div
            className={cn(
              "text-lg font-semibold transition-colors duration-300",
              href && "group-hover:text-primary",
            )}
          >
            {href ? "View Profile" : value}
          </div>
        </CardContent>
      </>
    ),
    [Icon, title, value, href],
  );

  const card = (
    <Card
      className={cn(
        "group relative bg-card/50 backdrop-blur-sm transition-all duration-300",
        href &&
          "cursor-pointer hover:scale-[1.02] hover:bg-card/70 hover:shadow-md",
      )}
    >
      {cardContent}
    </Card>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        {card}
      </a>
    );
  }

  return card;
});

export const ProfileStats = memo(function ProfileStats({
  totalTimePlayedHours,
  primaryGameServer,
  profileUrl,
}: ProfileStatsProps) {
  const formattedTime = useMemo(
    () => `${totalTimePlayedHours.toLocaleString()} Hours`,
    [totalTimePlayedHours],
  );

  return (
    <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
      <StatCard
        icon={HiOutlineClock}
        title="Total Time Played"
        value={formattedTime}
      />

      <StatCard
        icon={BsPeopleFill}
        title="Primary Server"
        value={primaryGameServer}
      />

      <StatCard
        icon={FaSteam}
        title="Steam Profile"
        value="View Profile"
        href={profileUrl}
      />
    </div>
  );
});
