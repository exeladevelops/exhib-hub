import { Server, type RankType } from "./types";
import { FaShield } from "react-icons/fa6";

export interface RankConfig {
  displayName: string;
  colors: Record<Server, string>;
}

export const rankConfigs: Record<RankType, RankConfig> = {
  // Staff ranks
  superadmin: {
    displayName: "Super Admin",
    colors: {
      [Server.DRP]: "#dc2626",
      [Server.MBRP]: "#dc2626",
    },
  },
  developer: {
    displayName: "Developer",
    colors: {
      [Server.DRP]: "#71368a",
      [Server.MBRP]: "#71368a",
    },
  },
  manager: {
    displayName: "Manager",
    colors: {
      [Server.DRP]: "#2cc2ff",
      [Server.MBRP]: "#ff007d",
    },
  },
  headadmin: {
    displayName: "Head Admin",
    colors: {
      [Server.DRP]: "#005694",
      [Server.MBRP]: "#361d61",
    },
  },
  senioradmin: {
    displayName: "Senior Admin",
    colors: {
      [Server.DRP]: "#006ebb",
      [Server.MBRP]: "#5a3698",
    },
  },
  admin: {
    displayName: "Admin",
    colors: {
      [Server.DRP]: "#0081dd",
      [Server.MBRP]: "#644eb8",
    },
  },
  seniormod: {
    displayName: "Senior Mod",
    colors: {
      [Server.DRP]: "#26a6ff",
      [Server.MBRP]: "#8b7cdb",
    },
  },
  moderator: {
    displayName: "Moderator",
    colors: {
      [Server.DRP]: "#51b8ff",
      [Server.MBRP]: "#aeaaf6",
    },
  },
  trialmod: {
    displayName: "Trial Mod",
    colors: {
      [Server.DRP]: "#83ceff",
      [Server.MBRP]: "#c5c4fe",
    },
  },
  // Donator ranks
  legend: {
    displayName: "Legend",
    colors: {
      [Server.DRP]: "#a12612",
      [Server.MBRP]: "#c70c0c",
    },
  },
  exhibitionist: {
    displayName: "Exhibitionist",
    colors: {
      [Server.DRP]: "#ff0000",
      [Server.MBRP]: "#bd1717",
    },
  },
  vipplus: {
    displayName: "VIP+",
    colors: {
      [Server.DRP]: "#dc143c",
      [Server.MBRP]: "#800000",
    },
  },
  vip: {
    displayName: "VIP",
    colors: {
      [Server.DRP]: "#962222",
      [Server.MBRP]: "#8b0000",
    },
  },
};

export const Groups = {
  Leadership: {
    ranks: [rankConfigs.superadmin, rankConfigs.developer],
    icon: FaShield,
  },
  Management: {
    ranks: [rankConfigs.manager],
    icon: FaShield,
  },
  Moderation: {
    ranks: [
      rankConfigs.senioradmin,
      rankConfigs.headadmin,
      rankConfigs.admin,
      rankConfigs.seniormod,
      rankConfigs.moderator,
      rankConfigs.trialmod,
    ],
    icon: FaShield,
  },
  Donator: {
    ranks: [
      rankConfigs.legend,
      rankConfigs.exhibitionist,
      rankConfigs.vipplus,
      rankConfigs.vip,
    ],
    icon: null,
  },
} as const;
