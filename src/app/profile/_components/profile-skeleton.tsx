import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ProfileSkeleton() {
  return (
    <div className="flex w-full flex-col gap-6">
      {/* Profile Header Card */}
      <Card className="w-full bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="flex gap-3">
              <div className="h-14 w-1 rounded-full bg-muted-foreground/10" /> {/* Server color bar */}
              <Skeleton className="h-14 w-14 rounded-lg" /> {/* Avatar */}
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" /> {/* Group icon */}
                <Skeleton className="h-6 w-48" /> {/* Username */}
                <Skeleton className="h-4 w-24 text-muted-foreground/25" /> {/* Steam ID */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Time Played Card */}
        <Card className="group relative bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              <Skeleton className="h-3 w-24" />
            </CardTitle>
            <Skeleton className="h-3.5 w-3.5" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-32 text-lg font-semibold" />
          </CardContent>
        </Card>

        {/* Primary Server Card */}
        <Card className="group relative bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              <Skeleton className="h-3 w-24" />
            </CardTitle>
            <Skeleton className="h-3.5 w-3.5" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-32 text-lg font-semibold" />
          </CardContent>
        </Card>

        {/* Steam Profile Card */}
        <Card className="group relative bg-card/50 backdrop-blur-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-xs font-medium text-muted-foreground">
              <Skeleton className="h-3 w-24" />
            </CardTitle>
            <Skeleton className="h-3.5 w-3.5" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-32 text-lg font-semibold" />
          </CardContent>
        </Card>
      </div>

      {/* Servers Section */}
      <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* DarkRP Server Card */}
        <Card className="w-full bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <CardTitle className="text-xl font-bold">
                  <Skeleton className="h-6 w-32" />
                </CardTitle>
                <div className="flex items-center gap-2 text-sm">
                  <Skeleton className="h-4 w-24 text-foreground/80" />
                  <span className="text-muted-foreground/50">•</span>
                  <Skeleton className="h-4 w-20 font-semibold" />
                </div>
              </div>
              <div className="grid gap-4">
                {/* Playtime */}
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-md bg-muted/50 p-2" />
                  <div className="flex flex-col">
                    <Skeleton className="h-4 w-32 text-sm font-medium" />
                    <Skeleton className="h-3 w-24 text-xs text-muted-foreground" />
                  </div>
                </div>
                {/* Wallet */}
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-md bg-muted/50 p-2" />
                  <div className="flex flex-col">
                    <Skeleton className="h-4 w-32 text-sm font-medium" />
                    <Skeleton className="h-3 w-24 text-xs text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MBRP Server Card */}
        <Card className="w-full bg-card/50 backdrop-blur-sm">
          <CardContent className="p-6">
            <div className="flex flex-col gap-6">
              <div className="space-y-2">
                <CardTitle className="text-xl font-bold">
                  <Skeleton className="h-6 w-32" />
                </CardTitle>
                <div className="flex items-center gap-2 text-sm">
                  <Skeleton className="h-4 w-24 text-foreground/80" />
                  <span className="text-muted-foreground/50">•</span>
                  <Skeleton className="h-4 w-20 font-semibold" />
                </div>
              </div>
              <div className="grid gap-4">
                {/* Playtime */}
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-md bg-muted/50 p-2" />
                  <div className="flex flex-col">
                    <Skeleton className="h-4 w-32 text-sm font-medium" />
                    <Skeleton className="h-3 w-24 text-xs text-muted-foreground" />
                  </div>
                </div>
                {/* Wallet */}
                <div className="flex items-center gap-3">
                  <Skeleton className="h-8 w-8 rounded-md bg-muted/50 p-2" />
                  <div className="flex flex-col">
                    <Skeleton className="h-4 w-32 text-sm font-medium" />
                    <Skeleton className="h-3 w-24 text-xs text-muted-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
