"use client";

import { useVirtualizer } from "@tanstack/react-virtual";
import { useRef, type CSSProperties, useCallback, useEffect, useMemo } from "react";
import type { Ban, BanFilter } from "../types";
import { BanCardMemo } from "./ban-card-memo";
import { useSearchParams } from "next/navigation";
import { BanService } from "../services/ban-service";

interface VirtualizedBanListProps {
  bans: Ban[];
  initialFilter?: BanFilter;
}

const PREFETCH_THRESHOLD = 5;

export function VirtualizedBanList({ bans, initialFilter }: VirtualizedBanListProps) {
  const parentRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  
  const currentFilter = useMemo(() => {
    const filterParam = searchParams.get("filter");
    return filterParam ? { active: filterParam === "banned" } as BanFilter : initialFilter;
  }, [searchParams, initialFilter]);

  const currentPage = searchParams.get("page");
  const currentSearch = searchParams.get("search");

  const prefetchBans = BanService.usePrefetchBans();

  // Dynamic size estimation based on content
  const estimateSize = useCallback((index: number) => {
    const ban = bans[index];
    if (!ban) return 280;
    const hasUnbanReason = ban.UnbanReason !== null;
    const hasLongReason = ban.Reason.length > 100;
    return hasUnbanReason || hasLongReason ? 320 : 280;
  }, [bans]);

  const virtualizer = useVirtualizer({
    count: bans.length,
    getScrollElement: () => parentRef.current,
    estimateSize,
    overscan: 5,
    scrollPaddingStart: 8,
    scrollPaddingEnd: 8,
    scrollMargin: 8,
    paddingStart: 8,
    paddingEnd: 8,
  });

  // Prefetch next page when near the end
  useEffect(() => {
    const virtualItems = virtualizer.getVirtualItems();
    const lastItem = virtualItems.at(-1);
    if (!lastItem) return;

    const remainingItems = bans.length - lastItem.index;
    if (remainingItems <= PREFETCH_THRESHOLD && currentPage) {
      const nextPage = parseInt(currentPage) + 1;
      prefetchBans({
        filter: currentFilter,
        page: nextPage,
        search: currentSearch ?? undefined,
      });
    }
  }, [virtualizer, bans.length, currentFilter, currentPage, currentSearch, prefetchBans]);

  const containerStyle = useMemo(() => ({
    height: `${virtualizer.getTotalSize()}px`,
    width: "100%",
    position: "relative",
    willChange: "transform",
  } as const), [virtualizer]);

  const getItemStyle = useCallback((size: number, start: number): CSSProperties => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: `${size}px`,
    transform: `translateY(${start}px)`,
    willChange: "transform",
  }), []);

  return (
    <div
      ref={parentRef}
      className="h-[calc(100vh-200px)] w-full overflow-auto"
    >
      <div style={containerStyle}>
        {virtualizer.getVirtualItems().map((virtualItem) => {
          const ban = bans[virtualItem.index];
          if (!ban) return null;

          return (
            <div
              key={virtualItem.key}
              data-index={virtualItem.index}
              style={getItemStyle(virtualItem.size, virtualItem.start)}
            >
              <BanCardMemo ban={ban} />
            </div>
          );
        })}
      </div>
    </div>
  );
} 