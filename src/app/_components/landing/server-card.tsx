import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardTitle, CardHeader } from "@/components/ui/card";
import { BsPeopleFill } from "react-icons/bs";
import type { Server } from "./types";

interface ServerCardProps {
  server: Server;
  className?: string;
  priority?: boolean;
}

export const ServerCard = memo(function ServerCard({
  server,
  className = "",
  priority = false,
}: ServerCardProps) {
  return (
    <Link
      href={`steam://connect/${server.ip}`}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      <Card className="group overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-lg">
        <CardHeader className="relative h-[300px] p-0">
          <div className="absolute inset-0 bg-muted/50">
            <Image
              src={`/maps/${server.map}.png`}
              alt={`Map: ${server.map}`}
              fill
              className="object-cover blur-[1px] brightness-50 transition-transform duration-300 group-hover:scale-[1.02]"
              priority={priority}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              quality={75}
              loading={priority ? "eager" : "lazy"}
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute bottom-0 w-full space-y-3 p-6">
            <CardTitle className="line-clamp-1 text-2xl font-bold text-white drop-shadow-md">
              {server.hostname}
            </CardTitle>
            <div className="flex items-center gap-2 text-white/90">
              <BsPeopleFill className="h-5 w-5" aria-hidden="true" />
              <span className="font-medium">
                {server.players}/{server.maxPlayers} Players
              </span>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
});
