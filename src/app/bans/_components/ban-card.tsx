import { memo, useEffect, useRef, useState } from "react";
import {
  Card,
  CardTitle,
  CardDescription,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import { FiClock, FiCopy, FiInfo } from "react-icons/fi";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useProfilePrefetch } from "@/hooks/use-profile-prefetch";
import { api } from "@/trpc/react";
import { useSearchParams } from "next/navigation";

interface BanCardProps {
  ban: {
    SteamID: string;
    steamid64: string;
    name: string;
    reason: string;
    admin: string;
    adminSteamID64?: string;
    timeLeft: string;
    length: string;
    server: string;
    userAvatar: string;
    adminAvatar: string;
    status: "banned" | "unbanned" | "expired";
    date: string;
    unbanReason: string | null;
    Time: number;
    Length: number;
  };
  timeKey?: number;
}

export const BanCard = memo(function BanCard({ ban, timeKey }: BanCardProps) {
  const prefetchProfile = useProfilePrefetch();
  const searchParams = useSearchParams();
  const utils = api.useUtils();
  const wasExpiredRef = useRef(false);
  const [localStatus, setLocalStatus] = useState<"banned" | "unbanned" | "expired">(ban.status);

  // Check for ban expiration and refresh data
  useEffect(() => {
    if (ban.status === "banned" && ban.Length !== 0) {
      const now = Math.floor(Date.now() / 1000);
      const endTime = ban.Time + ban.Length;
      const timeLeft = endTime - now;

      // If the ban just expired
      if (timeLeft <= 0 && !wasExpiredRef.current) {
        console.log("[BanCard] Ban just expired, refreshing data...", ban.SteamID);
        wasExpiredRef.current = true;
        setLocalStatus("expired");

        // Refresh the bans data
        void utils.exhib.getBans.invalidate({
          filter: searchParams.get("filter") as "banned" | "unbanned" | "expired" | undefined,
          page: searchParams.get("page") ? parseInt(searchParams.get("page")!) : undefined,
          search: searchParams.get("search") ?? undefined,
        });
      }
    }
  }, [ban, timeKey, utils, searchParams]);

  // Reset local status when ban prop changes
  useEffect(() => {
    setLocalStatus(ban.status);
    wasExpiredRef.current = ban.status === "expired";
  }, [ban.status]);

  const handleCopySteamID = () => {
    void navigator.clipboard.writeText(ban.SteamID);
  };

  const statusStyles = {
    banned: "border-destructive/20 hover:border-destructive/40",
    unbanned: "border-green-500/20 hover:border-green-500/40",
    expired: "border-yellow-500/20 hover:border-yellow-500/40",
  };

  const statusTextStyles = {
    banned: "text-destructive",
    unbanned: "text-green-500",
    expired: "text-yellow-500",
  };

  const reasonBarStyles = {
    banned: "bg-destructive/30",
    unbanned: "bg-green-500/30",
    expired: "bg-yellow-500/30",
  };

  const getStatusText = (status: "banned" | "unbanned" | "expired") => {
    switch (status) {
      case "banned":
        return "Banned";
      case "unbanned":
        return "Unbanned";
      case "expired":
        return "Expired";
    }
  };

  const StatusText = () => {
    if (ban.status === "unbanned" && ban.unbanReason) {
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="group/tooltip inline-flex cursor-default items-center gap-1 font-medium">
                <span className={statusTextStyles[ban.status]}>
                  {getStatusText(ban.status)}
                </span>
                <FiInfo
                  className={cn(
                    "h-3 w-3 transition-opacity",
                    statusTextStyles[ban.status],
                    "opacity-50 group-hover/tooltip:opacity-100",
                  )}
                />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>Unban Reason: {ban.unbanReason}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );
    }

    return (
      <span className={cn("font-medium", statusTextStyles[ban.status])}>
        {getStatusText(ban.status)}
      </span>
    );
  };

  const getTimeDisplay = () => {
    if (localStatus === "banned") {
      if (ban.Length === 0) {
        return {
          value: "Permanent",
          label: "Ban Length",
        };
      }

      const now = Math.floor(Date.now() / 1000);
      const banStart = ban.Time;
      const banLength = ban.Length;
      const endTime = banStart + banLength;
      const timeLeft = endTime - now;

      console.log("[BanCard] Calculating time for ban:", {
        banId: ban.SteamID,
        timeLeft,
        now,
        banStart,
        banLength,
        endTime,
        timeKey,
        isPermanent: banLength === 0,
      });

      if (timeLeft <= 0) {
        return {
          value: "Expired",
          label: "Status",
        };
      }

      const seconds = timeLeft;
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);
      const years = Math.floor(days / 365);

      // Build time string with consistent format
      const parts: string[] = [];

      if (years > 0) {
        parts.push(`${years} ${years === 1 ? 'year' : 'years'}`);
        const remainingDays = days % 365;
        if (remainingDays > 0) {
          parts.push(`${remainingDays} ${remainingDays === 1 ? 'day' : 'days'}`);
        }
      } else if (days > 0) {
        parts.push(`${days} ${days === 1 ? 'day' : 'days'}`);
        const remainingHours = hours % 24;
        if (remainingHours > 0) {
          parts.push(`${remainingHours} ${remainingHours === 1 ? 'hour' : 'hours'}`);
        }
      } else if (hours > 0) {
        parts.push(`${hours} ${hours === 1 ? 'hour' : 'hours'}`);
        const remainingMinutes = minutes % 60;
        if (remainingMinutes > 0) {
          parts.push(`${remainingMinutes} ${remainingMinutes === 1 ? 'minute' : 'minutes'}`);
        }
      } else {
        parts.push(`${seconds} ${seconds === 1 ? 'second' : 'seconds'}`);
      }

      return {
        value: `${parts.join(" ")} left`,
        label: "Time Remaining",
      };
    }

    return {
      value: new Date(ban.date).toLocaleDateString(),
      label: localStatus === "expired" ? "Expired" : "Unbanned",
    };
  };

  const timeDisplay = getTimeDisplay();

  return (
    <Card
      className={cn(
        "group relative w-full min-w-[340px] overflow-hidden border bg-card/50 backdrop-blur-sm transition-all duration-200 hover:shadow-lg",
        statusStyles[localStatus],
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Link
              href={`/profile/${ban.steamid64}`}
              className="transition-opacity hover:opacity-80"
              onMouseEnter={() => prefetchProfile(ban.steamid64)}
            >
              <Avatar className="h-12 w-12 rounded-md ring-2 ring-border ring-offset-2 ring-offset-background transition-all duration-200 group-hover:ring-primary/20">
                <AvatarImage
                  src={ban.userAvatar}
                  alt={ban.name ?? ban.steamid64}
                  className="rounded-md object-cover"
                />
                <AvatarFallback className="rounded-md">
                  {ban.name?.[0] ?? ban.steamid64[0]}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="min-w-0 space-y-1.5">
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/profile/${ban.steamid64}`}
                        className="transition-colors hover:text-primary"
                        onMouseEnter={() => prefetchProfile(ban.steamid64)}
                      >
                        <CardTitle className="max-w-[220px] truncate text-base font-medium">
                          {ban.name ?? ban.steamid64}
                        </CardTitle>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{ban.name ?? ban.steamid64}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 rounded-md opacity-0 transition-opacity hover:bg-muted group-hover:opacity-100"
                  onClick={handleCopySteamID}
                  title="Copy Steam ID"
                >
                  <FiCopy className="h-4 w-4" />
                  <span className="sr-only">Copy Steam ID</span>
                </Button>
              </div>
              <CardDescription className="flex items-center gap-2 text-xs">
                <StatusText />
                <span className="text-muted-foreground/50">•</span>
                <span className="text-muted-foreground">{ban.server}</span>
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pb-4">
        <div className="grid gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-md bg-muted p-2 transition-colors group-hover:bg-muted/70">
              <FiClock size={16} className="text-muted-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{timeDisplay.value}</span>
              <span className="text-xs text-muted-foreground">
                {timeDisplay.label}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {ban.adminSteamID64 ? (
              <Link
                href={`/profile/${ban.adminSteamID64}`}
                className="transition-opacity hover:opacity-80"
                onMouseEnter={() => ban.adminSteamID64 && prefetchProfile(ban.adminSteamID64)}
              >
                <Avatar className="h-8 w-8 rounded-md ring-1 ring-border ring-offset-1 ring-offset-background transition-all duration-200 group-hover:ring-primary/20">
                  <AvatarImage
                    src={ban.adminAvatar}
                    alt={ban.admin}
                    className="rounded-md object-cover"
                  />
                  <AvatarFallback className="rounded-md">
                    {ban.admin[0]}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <Avatar className="h-8 w-8 rounded-md ring-1 ring-border ring-offset-1 ring-offset-background">
                <AvatarImage
                  src={ban.adminAvatar}
                  alt={ban.admin}
                  className="rounded-md object-cover"
                />
                <AvatarFallback className="rounded-md">
                  {ban.admin[0]}
                </AvatarFallback>
              </Avatar>
            )}
            <div className="flex min-w-0 flex-col">
              {ban.adminSteamID64 ? (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={`/profile/${ban.adminSteamID64}`}
                        className="transition-colors hover:text-primary"
                        onMouseEnter={() => ban.adminSteamID64 && prefetchProfile(ban.adminSteamID64)}
                      >
                        <span className="max-w-[200px] truncate text-sm font-medium">
                          {ban.admin}
                        </span>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{ban.admin}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="max-w-[200px] truncate text-sm font-medium">
                        {ban.admin}
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{ban.admin}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
              <span className="text-xs text-muted-foreground">Banned By</span>
            </div>
          </div>
        </div>
        <div className="relative rounded-md bg-muted p-3 transition-colors group-hover:bg-muted/70">
          <div
            className={cn(
              "absolute inset-y-0 left-0 w-1 rounded-l-md",
              reasonBarStyles[ban.status],
            )}
          />
          <p className="pl-3 text-sm text-muted-foreground">{ban.reason}</p>
        </div>
      </CardContent>
    </Card>
  );
}, (prevProps, nextProps) => {
  if (prevProps.timeKey !== nextProps.timeKey && prevProps.ban.status === "banned") {
    return false;
  }
  return prevProps.ban === nextProps.ban;
});
