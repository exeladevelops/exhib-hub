import { FaCrown, FaCode } from "react-icons/fa6";

export const superAdmins = {
  "76561198122638261": {
    displayRank: "Owner",
    color: "#00ff62",
    icon: FaCrown,
  },
  "76561198103239748": {
    displayRank: "Co-Owner",
    color: "#ff0000",
    icon: FaCrown,
  },
  "76561198100770262": {
    displayRank: "Lead Developer",
    color: "#00c7ff",
    icon: FaCode,
  },
  "76561198139510546": {
    displayRank: "Developer",
    color: "#71368a",
    icon: FaCode,
  },
  "76561198438335528": {
    displayRank: "Developer",
    color: "#71368a",
    icon: FaCode,
  },
} as const;
