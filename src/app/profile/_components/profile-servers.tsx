import { memo, useMemo } from "react";
import { type ProfileServersProps } from "./types";
import { GameCard } from "./game-card";

export const ProfileServers = memo(function ProfileServers({
  gameInfo,
}: ProfileServersProps) {
  const serverEntries = useMemo(
    () =>
      Object.entries(gameInfo).map(([serverName, info]) => ({
        serverName: serverName,
        gameData: info,
      })),
    [gameInfo],
  );

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {serverEntries.map((props) => (
        <GameCard key={props.serverName} {...props} />
      ))}
    </div>
  );
});
