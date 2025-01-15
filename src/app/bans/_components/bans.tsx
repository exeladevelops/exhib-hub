"use client";

import {
  memo,
  useState,
  useCallback,
  useEffect,
  Suspense,
  useTransition,
  useMemo,
} from "react";
import { api } from "@/trpc/react";
import { Error } from "@/components/shared/feedback/error";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { BanList } from "./ban-list";
import { BanSearch } from "./ban-search";
import { BanCardSkeleton } from "./ban-card-skeleton";
import { useSearchParams, type BanStatus } from "./hooks/useBanData";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 21;
const STALE_TIME = 30 * 1000; // 30 seconds
const PREFETCH_COUNT = 3; // Number of pages to prefetch

function BansContent() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<BanStatus>("all");
  const [page, setPage] = useState(1);
  const [isPending, startTransition] = useTransition();
  const debouncedSearch = useDebounce(search, 200);
  const utils = api.useContext();

  // Memoize query params
  const queryParams = useSearchParams(debouncedSearch, filter, page);

  const { data, error, isLoading } = api.exhib.getBans.useQuery(queryParams, {
    staleTime: STALE_TIME,
    refetchOnWindowFocus: false,
  });

  const pageCount = data?.pageCount ?? 1;

  // Prefetch adjacent pages
  useEffect(() => {
    if (pageCount > 1) {
      const pagesToPrefetch = [];
      
      // Prefetch next pages
      for (let i = 1; i <= PREFETCH_COUNT; i++) {
        if (page + i <= pageCount) {
          pagesToPrefetch.push(page + i);
        }
      }
      
      // Prefetch previous pages
      for (let i = 1; i <= PREFETCH_COUNT; i++) {
        if (page - i > 0) {
          pagesToPrefetch.push(page - i);
        }
      }

      // Deduplicate and prefetch
      [...new Set(pagesToPrefetch)].forEach(pageNum => {
        const prefetchParams = { ...queryParams, page: pageNum };
        void utils.exhib.getBans.prefetch(prefetchParams);
      });
    }
  }, [page, pageCount, queryParams, utils.exhib.getBans]);

  // Memoize handlers with proper dependencies
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setSearch(newValue);
      startTransition(() => {
        setPage(1);
      });
    },
    [],
  );

  const handleFilterChange = useCallback((value: string) => {
    setFilter(value as BanStatus);
    startTransition(() => {
      setPage(1);
    });
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setSearch("");
      startTransition(() => {
        setPage(1);
      });
    }
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    startTransition(() => {
      setPage(newPage);
    });
  }, []);

  // Setup keyboard listener
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Memoize pagination visibility and items
  const paginationItems = useMemo(() => {
    if (pageCount <= 1) return [];
    
    const items: number[] = [];
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    const maxVisiblePages = isMobile ? 3 : 7; // Show fewer pages on mobile
    const halfVisible = Math.floor(maxVisiblePages / 2);

    // Always show first page
    items.push(1);

    let startPage = Math.max(2, page - halfVisible);
    let endPage = Math.min(pageCount - 1, page + halfVisible);

    // Mobile: Show current page and immediate neighbors only
    if (isMobile) {
      startPage = Math.max(2, page - 1);
      endPage = Math.min(pageCount - 1, page + 1);
    }
    // Desktop: Show more pages
    else {
      // Adjust if we're near the start
      if (page <= halfVisible + 1) {
        endPage = Math.min(maxVisiblePages - 1, pageCount - 1);
      }
      // Adjust if we're near the end
      else if (page >= pageCount - halfVisible) {
        startPage = Math.max(2, pageCount - maxVisiblePages + 1);
      }
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      items.push(-1); // -1 represents ellipsis
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      items.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < pageCount - 1) {
      items.push(-1); // -1 represents ellipsis
    }

    // Always show last page if there is more than one page
    if (pageCount > 1) {
      items.push(pageCount);
    }

    return items;
  }, [page, pageCount]);

  if (error) {
    return <Error message={error.message} variant="fullscreen" />;
  }

  return (
    <div className="w-full space-y-8">
      <BanSearch
        search={search}
        filter={filter}
        onSearchChange={handleSearchChange}
        onFilterChange={handleFilterChange}
        isLoading={isLoading || isPending}
      />

      <div className="relative min-h-[800px] w-full">
        {isLoading && !data ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
              <BanCardSkeleton key={i} />
            ))}
          </div>
        ) : data?.bans && data.bans.length > 0 ? (
          <Suspense fallback={<BanCardSkeleton />}>
            <BanList bans={data.bans} />
          </Suspense>
        ) : (
          <Card className="flex h-[400px] items-center justify-center">
            <p className="text-lg text-muted-foreground">No bans found</p>
          </Card>
        )}
      </div>

      {pageCount > 1 && !isLoading && (
        <Pagination className="justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => handlePageChange(page - 1)}
                className={cn(page === 1 && "pointer-events-none opacity-50")}
              />
            </PaginationItem>
            {paginationItems.map((pageNum, idx) => 
              pageNum === -1 ? (
                <PaginationItem key={`ellipsis-${idx}`}>
                  <span className="flex h-9 w-9 items-center justify-center">...</span>
                </PaginationItem>
              ) : (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(pageNum)}
                    isActive={page === pageNum}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              )
            )}
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={() => handlePageChange(page + 1)}
                className={cn(
                  page === pageCount && "pointer-events-none opacity-50",
                )}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

// Memoize the entire component
const Bans = memo(function Bans() {
  return (
    <Suspense
      fallback={
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
            <BanCardSkeleton key={i} />
          ))}
        </div>
      }
    >
      <BansContent />
    </Suspense>
  );
});

export default Bans;
