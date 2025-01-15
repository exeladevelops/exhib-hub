import { memo } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiSearch, FiFilter } from "react-icons/fi";
import { cn } from "@/lib/utils";
import type { BanStatus } from "./hooks/useBanData";

interface BanSearchProps {
  search: string;
  filter: BanStatus;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterChange: (value: string) => void;
  isLoading: boolean;
}

export const BanSearch = memo(function BanSearch({
  search,
  filter,
  onSearchChange,
  onFilterChange,
  isLoading,
}: BanSearchProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row">
      <div className="relative flex-1">
        <FiSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search bans..."
          value={search}
          onChange={onSearchChange}
          className={cn("pl-9", isLoading && "opacity-70")}
        />
      </div>
      <Select
        value={filter}
        onValueChange={onFilterChange}
        disabled={isLoading}
      >
        <SelectTrigger
          className={cn("w-full sm:w-[200px]", isLoading && "opacity-70")}
        >
          <FiFilter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Bans</SelectItem>
          <SelectItem value="banned">Active</SelectItem>
          <SelectItem value="unbanned">Unbanned</SelectItem>
          <SelectItem value="expired">Expired</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
});
