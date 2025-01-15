import type { StaffMember } from "../types";
import { Groups, rankConfigs } from "@/constants/ranks";
import { superAdmins } from "@/constants/superAdmins";

type StaffCategory = keyof typeof Groups;

// Create rank order based on Groups structure
const createRankOrder = () => {
  const order = new Map<string, number>();
  let rankIndex = 0;

  // Use Groups to determine rank order
  Object.values(Groups).forEach(group => {
    group.ranks.forEach(rankConfig => {
      // Find the rank key by matching the config
      const rankKey = Object.entries(rankConfigs).find(
        ([_, config]) => config === rankConfig
      )?.[0];
      if (rankKey) {
        order.set(rankKey.toLowerCase(), rankIndex++);
      }
    });
  });

  return order;
};

// Pre-compute all mappings at module level
const STAFF_MAPPINGS = {
  // Map ranks to their categories using Groups constant
  categories: new Map(
    Object.entries(Groups).flatMap(([category, group]) =>
      group.ranks.map(rankConfig => {
        const rankKey = Object.entries(rankConfigs).find(
          ([_, config]) => config === rankConfig
        )?.[0];
        return [rankKey?.toLowerCase(), category as StaffCategory] as const;
      }).filter((entry): entry is [string, StaffCategory] => Boolean(entry[0]))
    )
  ),

  // Create rank order based on Groups structure
  order: createRankOrder(),

  // Map super admin IDs to their display order
  superAdmins: new Map(Object.keys(superAdmins).map((id, index) => [id, index])),
} as const;

export function useStaffData(staff: StaffMember[]) {
  // Initialize categories based on Groups constant
  const groupedStaff = Object.keys(Groups).reduce<Record<StaffCategory, StaffMember[]>>(
    (acc, category) => ({ ...acc, [category]: [] }),
    {} as Record<StaffCategory, StaffMember[]>
  );

  // Process and group staff members in a single pass
  staff.forEach(member => {
    const processedMember = {
      ...member,
      avatarfull: member.avatarfull ?? "",
      Sits: member.Sits ?? 0,
      LastConnect: member.LastConnect ?? 0,
      LastDisconnect: member.LastDisconnect ?? 0,
      SRank: member.SRank ?? null,
      Playtime: member.Playtime ?? 0,
      LastSeen: member.LastSeen ?? "",
    };

    const category = STAFF_MAPPINGS.categories.get(member.Rank.toLowerCase());
    if (category) {
      groupedStaff[category].push(processedMember);
    }
  });

  // Sort categories based on rank order from Groups
  for (const [category, members] of Object.entries(groupedStaff)) {
    members.sort((a, b) => {
      // Special handling for Leadership category
      if (category === "Leadership") {
        const isASuperAdmin = STAFF_MAPPINGS.superAdmins.has(a.SteamID64);
        const isBSuperAdmin = STAFF_MAPPINGS.superAdmins.has(b.SteamID64);

        if (isASuperAdmin && isBSuperAdmin) {
          return (
            (STAFF_MAPPINGS.superAdmins.get(a.SteamID64) ?? 0) -
            (STAFF_MAPPINGS.superAdmins.get(b.SteamID64) ?? 0)
          );
        }
        if (isASuperAdmin) return -1;
        if (isBSuperAdmin) return 1;
      }

      // Use pre-computed rank order from Groups
      return (
        (STAFF_MAPPINGS.order.get(a.Rank.toLowerCase()) ?? Infinity) -
        (STAFF_MAPPINGS.order.get(b.Rank.toLowerCase()) ?? Infinity)
      );
    });
  }

  return { groupedStaff };
}
