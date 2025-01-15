import axios from "axios";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";

const HomeSchema = z.object({
  totalOnlinePlayers: z.number(),
  maxOnlinePlayers: z.number(),
  totalPlayers: z.number(),
  totalTimePlayed: z.string(),
  steamGroupUserCount: z.number(),
  servers: z.array(
    z.object({
      ip: z.string(),
      hostname: z.string(),
      map: z.string(),
      players: z.number(),
      maxPlayers: z.number(),
    }),
  ),
});

const StaffSchema = z.object({
  staff: z.array(
    z.object({
      SteamID: z.string(),
      Name: z.string(),
      Rank: z.string(),
      SRank: z.string().nullable(),
      Time: z.number(),
      LastTime: z.number(),
      Server: z.string(),
      Sits: z.number(),
      LastConnect: z.number(),
      LastDisconnect: z.number(),
      SteamID64: z.string(),
    }),
  ),
  summaries: z.array(
    z.object({
      steamid: z.string(),
      avatarfull: z.string(),
    }),
  ),
});

const ProfileSchema = z.object({
  playerSummary: z.object({
    steamid: z.string(),
    communityvisibilitystate: z.number().optional(),
    profilestate: z.number().optional(),
    personaname: z.string(),
    profileurl: z.string(),
    avatar: z.string(),
    avatarmedium: z.string(),
    avatarfull: z.string(),
    avatarhash: z.string(),
    personastate: z.number().optional(),
    primaryclanid: z.string().optional(),
    timecreated: z.number().optional(),
    personastateflags: z.number().optional(),
    steamid32: z.string(),
    loccountrycode: z.string().optional(),
    locstatecode: z.string().optional(),
    loccityid: z.number().optional(),
    commentpermission: z.number().optional(),
  }),
  primaryGameServer: z.string(),
  gameInfo: z.record(
    z.object({
      Name: z.string(),
      Rank: z.string(),
      LastTime: z.number(),
      Time: z.number(),
      TimeJoined: z.number(),
      rpname: z.string(),
      wallet: z.number(),
    }),
  ),
  userInfo: z
    .object({
      steamid: z.string().optional(),
      steamid32: z.string().optional(),
      name: z.string().optional(),
      title: z.string().nullable().optional(),
      description: z.string().nullable().optional(),
      canEditProfile: z.boolean().optional(),
    })
    .optional(),
});

const BansSchema = z.object({
  bans: z.array(
    z.object({
      id: z.number(),
      SteamID: z.string(),
      Name: z.string().nullable(),
      ASteamID: z.string(),
      AName: z.string(),
      Time: z.number(),
      Length: z.number(),
      Reason: z.string(),
      UnbanReason: z.string().nullable(),
      Server: z.string(),
      SteamID64: z.string(),
      ASteamID64: z.string().optional(),
      date: z.string(),
      userProfile: z
        .object({
          avatar: z.string().optional(),
          avatarmedium: z.string().optional(),
          avatarfull: z.string().optional(),
          name: z.string().optional(),
          profileUrl: z.string().optional(),
        })
        .optional()
        .default({}),
      adminProfile: z
        .discriminatedUnion("console", [
          z.object({
            console: z.literal(true),
            avatar: z.string(),
          }),
          z.object({
            console: z.literal(false).optional(),
            avatar: z.string(),
            avatarmedium: z.string().optional(),
            avatarfull: z.string().optional(),
            name: z.string().optional(),
            profileUrl: z.string().optional(),
          }),
        ])
        .optional()
        .default({ console: true, avatar: "" }),
      isUnbanned: z.boolean(),
      isBanActive: z.boolean(),
      prettyTimeLeft: z.string().optional(),
    }),
  ),
  pageCount: z.number().nullable(),
  page: z.coerce.number().nullable(),
  search: z.string().nullable(),
  filter: z.enum(["banned", "unbanned", "expired"]).optional(),
});

const API_BASE_URL = "https://exhib-anywhere.exela.workers.dev/api";
const BANS_PER_PAGE = 21;

// Add ban-specific cache settings
const BAN_CACHE_CONFIG = {
  // Active bans cache for shorter duration due to frequent updates
  activeBansCacheDuration: 60 * 1000, // 1 minute for active bans
  activeBansStaleDuration: 60 * 2000, // 2 minutes stale time for active bans
  // Other bans can cache longer
  cacheDuration: 60 * 15000, // 15 minutes for other bans
  staleDuration: 60 * 60000, // 1 hour stale time for other bans
} as const;

const AXIOS_CONFIG = {
  timeout: 8000, // Increased timeout for larger responses
  validateStatus: (status: number) => status === 200,
  headers: {
    'Accept-Encoding': 'gzip, deflate',
    'Cache-Control': 'no-transform',
  },
} as const;

// Cache configuration
const CACHE_CONFIGS = {
  home: {
    cacheDuration: 30 * 1000, // 30 seconds
    staleDuration: 5 * 60 * 1000, // 5 minutes
  },
  staff: {
    cacheDuration: 15 * 60 * 1000, // 15 minutes
    staleDuration: 30 * 60 * 1000, // 30 minutes
  },
  profile: {
    cacheDuration: 5 * 60 * 1000, // 5 minutes
    staleDuration: 30 * 60 * 1000, // 30 minutes
  },
} as const;

// Enhanced error handling
class ExhibAPIError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number,
    public readonly endpoint: string,
  ) {
    super(message);
    this.name = 'ExhibAPIError';
  }
}

async function fetchAndValidate<T>(url: string, schema: z.ZodType<T>, endpoint: string): Promise<T> {
  try {
    const response = await axios.get(url, AXIOS_CONFIG);
    const parsed = schema.safeParse(response.data);
    
    if (!parsed.success) {
      throw new ExhibAPIError(
        `Validation failed for ${endpoint}: ${parsed.error.message}`,
        400,
        endpoint
      );
    }
    
    return parsed.data;
  } catch (error) {
    if (error instanceof ExhibAPIError) throw error;
    
    if (axios.isAxiosError(error)) {
      throw new ExhibAPIError(
        `Failed to fetch ${endpoint}: ${error.message}`,
        error.response?.status ?? 500,
        endpoint
      );
    }
    
    throw new ExhibAPIError(
      `Unexpected error for ${endpoint}: ${error instanceof Error ? error.message : 'Unknown error'}`,
      500,
      endpoint
    );
  }
}

// Enhanced cache implementation with stale-while-revalidate
const cache = new Map<string, { data: unknown; timestamp: number }>();

async function fetchWithCache<T>(
  url: string,
  schema: z.ZodType<T>,
  endpoint: string,
  options: {
    cacheDuration: number;
    staleDuration: number;
  }
): Promise<T> {
  const cached = cache.get(url);
  const now = Date.now();

  // Return fresh cache
  if (cached && (now - cached.timestamp) < options.cacheDuration) {
    return cached.data as T;
  }

  // Stale-while-revalidate: return stale data and refresh in background
  if (cached && (now - cached.timestamp) < options.staleDuration) {
    void fetchAndValidate(url, schema, endpoint).then(newData => {
      cache.set(url, { data: newData, timestamp: now });
    });
    return cached.data as T;
  }

  // No cache or expired: fetch new data
  const data = await fetchAndValidate(url, schema, endpoint);
  cache.set(url, { data, timestamp: now });
  return data;
}

export const exhibRouter = createTRPCRouter({
  home: publicProcedure.query(async () => {
    return fetchWithCache(
      `${API_BASE_URL}/home`,
      HomeSchema,
      'home',
      CACHE_CONFIGS.home
    );
  }),

  staff: publicProcedure.query(async () => {
    return fetchWithCache(
      `${API_BASE_URL}/staff`,
      StaffSchema,
      'staff',
      CACHE_CONFIGS.staff
    );
  }),

  profile: publicProcedure
    .input(z.object({ steamid64: z.string() }))
    .query(async ({ input }) => {
      return fetchWithCache(
        `${API_BASE_URL}/profile?steamid64=${input.steamid64}`,
        ProfileSchema,
        'profile',
        CACHE_CONFIGS.profile
      );
    }),

  getBans: publicProcedure
    .input(
      z.object({
        search: z.string().nullish(),
        filter: z.enum(["banned", "unbanned", "expired"]).optional(),
        page: z.coerce.number().optional(),
      }),
    )
    .query(async ({ input }) => {
      const params = new URLSearchParams();
      if (input.search) params.append("search", input.search);
      if (input.filter) params.append("filter", input.filter);
      if (input.page) params.append("page", input.page.toString());
      params.append("per_page", BANS_PER_PAGE.toString());

      const url = `${API_BASE_URL}/bans${params.toString() ? `?${params.toString()}` : ""}`;
      
      return fetchWithCache(url, BansSchema, 'bans', {
        cacheDuration: BAN_CACHE_CONFIG.cacheDuration,
        staleDuration: BAN_CACHE_CONFIG.staleDuration,
      });
    }),
});
