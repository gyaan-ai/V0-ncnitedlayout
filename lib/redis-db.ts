import { Redis } from "@upstash/redis"

// Initialize Redis connection using environment variables
let redis: Redis | null = null

try {
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    redis = Redis.fromEnv()
  }
} catch (error) {
  console.warn("Redis connection not available:", error)
}

// Sample data for preview mode
const PREVIEW_DATA = {
  wrestlers: [
    {
      id: "preview-1",
      first_name: "Luke",
      last_name: "Richards",
      weight: 106,
      grade: "Sophomore",
      school: "Providence High",
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-2",
      first_name: "Jekai",
      last_name: "Sedgwick",
      weight: 113,
      grade: "Junior",
      school: "Cary Academy",
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-3",
      first_name: "Mac",
      last_name: "Johnson",
      weight: 120,
      grade: "Senior",
      school: "Riverside High",
      created_at: new Date().toISOString(),
    },
  ],
  tournaments: [
    {
      id: "preview-nhsca",
      name: "NHSCA 2025",
      location: "Virginia Beach, VA",
      start_date: "2025-03-28",
      end_date: "2025-03-30",
      description:
        "National High School Coaches Association Wrestling Championships. NC United achieved a historic 7-1 dual meet record and became the first all-North Carolina team to reach Round of 16.",
      image_url: "/images/aiden-white-nhsca.png",
      wrestler_count: 15,
      total_matches: 120,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-ucd",
      name: "Ultimate Club Duals 2024",
      location: "Nittany Valley Sports Centre, PA",
      start_date: "2024-09-20",
      end_date: "2024-09-22",
      description:
        "Elite club wrestling tournament featuring top teams from across the country. NC United finished 2nd place in the Gold Pool with a 5-2 dual meet record.",
      image_url: "/images/ultimate-club-duals-logo.png",
      wrestler_count: 14,
      total_matches: 98,
      created_at: new Date().toISOString(),
    },
  ],
  matches: [
    // Luke's matches
    {
      id: "preview-m1",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-1",
      opponent_name: "John Smith",
      opponent_team: "Team Gotcha Illinois",
      result: "W-TF 18-1",
      match_type: "tech_fall",
      points: 5,
      match_number: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m2",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-1",
      opponent_name: "Mike Jones",
      opponent_team: "Apache Blue",
      result: "W-TF 16-0",
      match_type: "tech_fall",
      points: 5,
      match_number: 2,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m3",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-1",
      opponent_name: "Sam Wilson",
      opponent_team: "Knights Wrestling",
      result: "W-MD 9-1",
      match_type: "major_decision",
      points: 4,
      match_number: 3,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m4",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-1",
      opponent_name: "Alex Brown",
      opponent_team: "Alien Spaceship",
      result: "W-DEC 9-4",
      match_type: "decision",
      points: 3,
      match_number: 4,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m5",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-1",
      opponent_name: "Chris Lee",
      opponent_team: "Ragin Raisins",
      result: "W-PIN 3-0",
      match_type: "pin",
      points: 6,
      match_number: 5,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m6",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-1",
      opponent_name: "David Park",
      opponent_team: "Superior Elite",
      result: "L-DEC 0-4",
      match_type: "loss",
      points: 0,
      match_number: 6,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m7",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-1",
      opponent_name: "Ryan White",
      opponent_team: "CKWA",
      result: "W-TF 17-2",
      match_type: "tech_fall",
      points: 5,
      match_number: 7,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m8",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-1",
      opponent_name: "James Black",
      opponent_team: "Team Shutt",
      result: "L-DEC 0-7",
      match_type: "loss",
      points: 0,
      match_number: 8,
      created_at: new Date().toISOString(),
    },

    // Jekai's matches - 6-2 record
    {
      id: "preview-m9",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-2",
      opponent_name: "Tyler Green",
      opponent_team: "Team Gotcha Illinois",
      result: "W-PIN 2:30",
      match_type: "pin",
      points: 6,
      match_number: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m10",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-2",
      opponent_name: "Kevin Adams",
      opponent_team: "Apache Blue",
      result: "W-TF 15-0",
      match_type: "tech_fall",
      points: 5,
      match_number: 2,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m11",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-2",
      opponent_name: "Eric Davis",
      opponent_team: "Knights Wrestling",
      result: "W-MD 12-4",
      match_type: "major_decision",
      points: 4,
      match_number: 3,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m12",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-2",
      opponent_name: "Brian Wilson",
      opponent_team: "Alien Spaceship",
      result: "L-DEC 3-5",
      match_type: "loss",
      points: 0,
      match_number: 4,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m13",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-2",
      opponent_name: "Mark Johnson",
      opponent_team: "Ragin Raisins",
      result: "W-DEC 6-2",
      match_type: "decision",
      points: 3,
      match_number: 5,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m14",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-2",
      opponent_name: "Paul Thomas",
      opponent_team: "Superior Elite",
      result: "W-PIN 1:45",
      match_type: "pin",
      points: 6,
      match_number: 6,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m15",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-2",
      opponent_name: "Jason Miller",
      opponent_team: "CKWA",
      result: "W-DEC 8-6",
      match_type: "decision",
      points: 3,
      match_number: 7,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m16",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-2",
      opponent_name: "Scott Baker",
      opponent_team: "Team Shutt",
      result: "L-PIN 0:45",
      match_type: "loss",
      points: 0,
      match_number: 8,
      created_at: new Date().toISOString(),
    },

    // Mac's matches - 8-0 record (undefeated)
    {
      id: "preview-m17",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-3",
      opponent_name: "Daniel Clark",
      opponent_team: "Team Gotcha Illinois",
      result: "W-PIN 1:20",
      match_type: "pin",
      points: 6,
      match_number: 1,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m18",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-3",
      opponent_name: "Andrew Lewis",
      opponent_team: "Apache Blue",
      result: "W-TF 16-1",
      match_type: "tech_fall",
      points: 5,
      match_number: 2,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m19",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-3",
      opponent_name: "Robert Hall",
      opponent_team: "Knights Wrestling",
      result: "W-MD 14-5",
      match_type: "major_decision",
      points: 4,
      match_number: 3,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m20",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-3",
      opponent_name: "Joseph King",
      opponent_team: "Alien Spaceship",
      result: "W-DEC 7-3",
      match_type: "decision",
      points: 3,
      match_number: 4,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m21",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-3",
      opponent_name: "Thomas Wright",
      opponent_team: "Ragin Raisins",
      result: "W-PIN 3:15",
      match_type: "pin",
      points: 6,
      match_number: 5,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m22",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-3",
      opponent_name: "Charles Lopez",
      opponent_team: "Superior Elite",
      result: "W-TF 18-3",
      match_type: "tech_fall",
      points: 5,
      match_number: 6,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m23",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-3",
      opponent_name: "George Young",
      opponent_team: "CKWA",
      result: "W-MD 10-2",
      match_type: "major_decision",
      points: 4,
      match_number: 7,
      created_at: new Date().toISOString(),
    },
    {
      id: "preview-m24",
      tournament_id: "preview-nhsca",
      wrestler_id: "preview-3",
      opponent_name: "Edward Scott",
      opponent_team: "Team Shutt",
      result: "W-DEC 5-3",
      match_type: "decision",
      points: 3,
      match_number: 8,
      created_at: new Date().toISOString(),
    },
  ],
}

// Helper function to check if we're in preview mode
function isPreviewMode(): boolean {
  return !redis || typeof process === "undefined" || !process.env.KV_REST_API_URL
}

// Wrestler types
export type Wrestler = {
  id: string
  first_name: string
  last_name: string
  weight: number
  grade?: string
  school?: string
  image_url?: string
  created_at: string
}

export type WrestlerInput = Omit<Wrestler, "id" | "created_at">

// Tournament types
export type Tournament = {
  id: string
  name: string
  location?: string
  start_date?: string
  end_date?: string
  description?: string
  image_url?: string
  wrestler_count?: number
  total_matches?: number
  created_at: string
}

export type TournamentInput = Omit<Tournament, "id" | "created_at">

// Match types
export type Match = {
  id: string
  tournament_id: string
  wrestler_id: string
  opponent_name: string
  opponent_team?: string
  result: string
  match_type?: string
  points: number
  match_number?: number
  created_at: string
}

export type MatchInput = Omit<Match, "id" | "created_at">

// Extended types for joined data
export type WrestlerWithMatches = Wrestler & {
  matches?: Match[]
  total_matches?: number
  total_wins?: number
  total_losses?: number
  win_percentage?: number
  record?: string
}

// Helper function to generate IDs
function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

// Wrestler functions
export async function getWrestlers(): Promise<Wrestler[]> {
  try {
    // Return preview data if in preview mode
    if (isPreviewMode()) {
      return PREVIEW_DATA.wrestlers
    }

    const wrestlerIds = (await redis!.smembers("wrestlers:all")) as string[]
    if (!wrestlerIds.length) return []

    const wrestlers = await Promise.all(
      wrestlerIds.map(async (id) => {
        const wrestler = await redis!.hgetall(`wrestler:${id}`)
        return {
          id,
          ...wrestler,
          weight: Number(wrestler.weight),
        } as Wrestler
      }),
    )

    return wrestlers.sort((a, b) => a.weight - b.weight)
  } catch (error) {
    console.error("Error fetching wrestlers:", error instanceof Error ? error.message : String(error))
    return PREVIEW_DATA.wrestlers
  }
}

export async function getWrestlerById(id: string): Promise<Wrestler | null> {
  try {
    // Return preview data if in preview mode
    if (isPreviewMode()) {
      return PREVIEW_DATA.wrestlers.find((w) => w.id === id) || null
    }

    const wrestler = await redis!.hgetall(`wrestler:${id}`)
    if (!wrestler || Object.keys(wrestler).length === 0) return null

    return {
      id,
      ...wrestler,
      weight: Number(wrestler.weight),
    } as Wrestler
  } catch (error) {
    console.error("Error fetching wrestler:", error instanceof Error ? error.message : String(error))
    return PREVIEW_DATA.wrestlers.find((w) => w.id === id) || null
  }
}

export async function getWrestlersByTournament(tournamentId: string): Promise<WrestlerWithMatches[]> {
  try {
    // Return preview data if in preview mode
    if (isPreviewMode()) {
      const wrestlers = PREVIEW_DATA.wrestlers
      return wrestlers.map((wrestler) => {
        const matches = PREVIEW_DATA.matches.filter((m) => m.wrestler_id === wrestler.id)
        const total_matches = matches.length
        const total_wins = matches.filter((m) => !m.match_type?.includes("loss")).length
        const total_losses = matches.filter((m) => m.match_type?.includes("loss")).length

        return {
          ...wrestler,
          matches,
          total_matches,
          total_wins,
          total_losses,
          record: `${total_wins}-${total_losses}`,
        } as WrestlerWithMatches
      })
    }

    const wrestlerIds = (await redis!.smembers(`tournament:${tournamentId}:wrestlers`)) as string[]
    if (!wrestlerIds.length) return []

    const wrestlers = await Promise.all(
      wrestlerIds.map(async (wrestlerId) => {
        const wrestler = await getWrestlerById(wrestlerId)
        if (!wrestler) return null

        const matches = await getMatchesByWrestlerAndTournament(wrestlerId, tournamentId)
        const total_matches = matches.length

        // Count wins based on match_type
        const total_wins = matches.filter((m) => !m.match_type?.toLowerCase().includes("loss")).length
        const total_losses = matches.filter((m) => m.match_type?.toLowerCase().includes("loss")).length

        return {
          ...wrestler,
          matches,
          total_matches,
          total_wins,
          total_losses,
          record: `${total_wins}-${total_losses}`,
        } as WrestlerWithMatches
      }),
    )

    return wrestlers.filter(Boolean) as WrestlerWithMatches[]
  } catch (error) {
    console.error("Error fetching tournament wrestlers:", error instanceof Error ? error.message : String(error))

    // Return preview data as fallback
    const wrestlers = PREVIEW_DATA.wrestlers
    return wrestlers.map((wrestler) => {
      const matches = PREVIEW_DATA.matches.filter((m) => m.wrestler_id === wrestler.id)
      const total_matches = matches.length
      const total_wins = matches.filter((m) => !m.match_type?.includes("loss")).length
      const total_losses = matches.filter((m) => m.match_type?.includes("loss")).length

      return {
        ...wrestler,
        matches,
        total_matches,
        total_wins,
        total_losses,
        record: `${total_wins}-${total_losses}`,
      } as WrestlerWithMatches
    })
  }
}

export async function createWrestler(wrestler: WrestlerInput): Promise<Wrestler> {
  try {
    if (isPreviewMode()) {
      throw new Error("Cannot create wrestler in preview mode")
    }

    const id = generateId()
    const newWrestler: Wrestler = {
      id,
      ...wrestler,
      created_at: new Date().toISOString(),
    }

    await redis!.hset(`wrestler:${id}`, newWrestler)
    await redis!.sadd("wrestlers:all", id)

    return newWrestler
  } catch (error) {
    console.error("Error creating wrestler:", error instanceof Error ? error.message : String(error))
    throw error
  }
}

// Tournament functions
export async function getTournaments(): Promise<Tournament[]> {
  try {
    // Return preview data if in preview mode
    if (isPreviewMode()) {
      return PREVIEW_DATA.tournaments
    }

    const tournamentIds = (await redis!.smembers("tournaments:all")) as string[]
    if (!tournamentIds.length) return []

    const tournaments = await Promise.all(
      tournamentIds.map(async (id) => {
        const tournament = await redis!.hgetall(`tournament:${id}`)
        return {
          id,
          ...tournament,
          wrestler_count: Number(tournament.wrestler_count || 0),
          total_matches: Number(tournament.total_matches || 0),
        } as Tournament
      }),
    )

    return tournaments.sort((a, b) => new Date(b.start_date || "").getTime() - new Date(a.start_date || "").getTime())
  } catch (error) {
    console.error("Error fetching tournaments:", error instanceof Error ? error.message : String(error))
    return PREVIEW_DATA.tournaments
  }
}

export async function getTournamentById(id: string): Promise<Tournament | null> {
  try {
    // Return preview data if in preview mode
    if (isPreviewMode()) {
      return PREVIEW_DATA.tournaments.find((t) => t.id === id) || PREVIEW_DATA.tournaments[0]
    }

    const tournament = await redis!.hgetall(`tournament:${id}`)
    if (!tournament || Object.keys(tournament).length === 0) return null

    return {
      id,
      ...tournament,
      wrestler_count: Number(tournament.wrestler_count || 0),
      total_matches: Number(tournament.total_matches || 0),
    } as Tournament
  } catch (error) {
    console.error("Error fetching tournament:", error instanceof Error ? error.message : String(error))
    return PREVIEW_DATA.tournaments[0]
  }
}

export async function getTournamentByName(name: string): Promise<Tournament | null> {
  try {
    // Return preview data if in preview mode
    if (isPreviewMode()) {
      return PREVIEW_DATA.tournaments.find((t) => t.name.toLowerCase().includes(name.toLowerCase())) || null
    }

    const tournaments = await getTournaments()
    return tournaments.find((t) => t.name.toLowerCase().includes(name.toLowerCase())) || null
  } catch (error) {
    console.error("Error fetching tournament by name:", error instanceof Error ? error.message : String(error))
    return PREVIEW_DATA.tournaments[0]
  }
}

export async function createTournament(tournament: TournamentInput): Promise<Tournament> {
  try {
    if (isPreviewMode()) {
      throw new Error("Cannot create tournament in preview mode")
    }

    const id = generateId()
    const newTournament: Tournament = {
      id,
      ...tournament,
      created_at: new Date().toISOString(),
    }

    await redis!.hset(`tournament:${id}`, {
      ...newTournament,
      wrestler_count: (newTournament.wrestler_count || 0).toString(),
      total_matches: (newTournament.total_matches || 0).toString(),
    })
    await redis!.sadd("tournaments:all", id)

    return newTournament
  } catch (error) {
    console.error("Error creating tournament:", error instanceof Error ? error.message : String(error))
    throw error
  }
}

// Match functions
export async function getMatchesByTournament(tournamentId: string): Promise<Match[]> {
  try {
    // Return preview data if in preview mode
    if (isPreviewMode()) {
      return PREVIEW_DATA.matches.filter((m) => m.tournament_id === tournamentId || tournamentId === "preview-nhsca")
    }

    const matchIds = (await redis!.smembers(`tournament:${tournamentId}:matches`)) as string[]
    if (!matchIds.length) return []

    const matches = await Promise.all(
      matchIds.map(async (id) => {
        try {
          const match = await redis!.hgetall(`match:${id}`)
          if (!match || Object.keys(match).length === 0) return null

          return {
            id,
            ...match,
            points: Number(match.points || 0),
            match_number: Number(match.match_number || 0),
          } as Match
        } catch (matchError) {
          console.error(
            `Error fetching match ${id}:`,
            matchError instanceof Error ? matchError.message : String(matchError),
          )
          return null
        }
      }),
    )

    return matches.filter(Boolean).sort((a, b) => (a!.match_number || 0) - (b!.match_number || 0)) as Match[]
  } catch (error) {
    console.error("Error fetching tournament matches:", error instanceof Error ? error.message : String(error))
    // Return preview data as fallback
    return PREVIEW_DATA.matches.filter((m) => m.tournament_id === tournamentId || tournamentId === "preview-nhsca")
  }
}

export async function getMatchesByWrestlerAndTournament(wrestlerId: string, tournamentId: string): Promise<Match[]> {
  try {
    // Return preview data if in preview mode
    if (isPreviewMode()) {
      return PREVIEW_DATA.matches.filter(
        (m) => m.wrestler_id === wrestlerId && (m.tournament_id === tournamentId || tournamentId === "preview-nhsca"),
      )
    }

    const allMatches = await getMatchesByTournament(tournamentId)
    return allMatches.filter((match) => match.wrestler_id === wrestlerId)
  } catch (error) {
    console.error("Error fetching wrestler matches:", error instanceof Error ? error.message : String(error))
    // Return preview data as fallback
    return PREVIEW_DATA.matches.filter(
      (m) => m.wrestler_id === wrestlerId && (m.tournament_id === tournamentId || tournamentId === "preview-nhsca"),
    )
  }
}

export async function createMatch(match: MatchInput): Promise<Match> {
  try {
    if (isPreviewMode()) {
      throw new Error("Cannot create match in preview mode")
    }

    const id = generateId()
    const newMatch: Match = {
      id,
      ...match,
      created_at: new Date().toISOString(),
    }

    // Store match data with proper type conversion
    const matchData = {
      ...newMatch,
      points: newMatch.points.toString(),
      match_number: (newMatch.match_number || 0).toString(),
    }

    await redis!.hset(`match:${id}`, matchData)
    await redis!.sadd(`tournament:${match.tournament_id}:matches`, id)
    await redis!.sadd(`tournament:${match.tournament_id}:wrestlers`, match.wrestler_id)

    return newMatch
  } catch (error) {
    console.error("Error creating match:", error instanceof Error ? error.message : String(error))
    throw error
  }
}

// Setup and migration functions
export async function setupDatabase(): Promise<{ success: boolean; message: string }> {
  try {
    if (isPreviewMode()) {
      return {
        success: true,
        message: "Preview mode active - using sample data",
      }
    }

    // Redis doesn't need table creation, but we can initialize some basic data
    console.log("Redis database is ready - no table creation needed")

    return {
      success: true,
      message: "Redis database is ready for wrestling data!",
    }
  } catch (error) {
    console.error("Error setting up database:", error instanceof Error ? error.message : String(error))
    return {
      success: false,
      message: `Setup failed: ${error instanceof Error ? error.message : String(error)}`,
    }
  }
}

export async function clearAllData(): Promise<void> {
  try {
    if (isPreviewMode()) {
      console.log("Preview mode - no data to clear")
      return
    }

    // Get all keys and delete them
    const wrestlerIds = (await redis!.smembers("wrestlers:all")) as string[]
    const tournamentIds = (await redis!.smembers("tournaments:all")) as string[]

    // Delete all wrestler data
    for (const id of wrestlerIds) {
      await redis!.del(`wrestler:${id}`)
    }
    await redis!.del("wrestlers:all")

    // Delete all tournament data
    for (const id of tournamentIds) {
      await redis!.del(`tournament:${id}`)
      const matchIds = (await redis!.smembers(`tournament:${id}:matches`)) as string[]
      for (const matchId of matchIds) {
        await redis!.del(`match:${matchId}`)
      }
      await redis!.del(`tournament:${id}:matches`)
      await redis!.del(`tournament:${id}:wrestlers`)
    }
    await redis!.del("tournaments:all")

    console.log("All wrestling data cleared from Redis")
  } catch (error) {
    console.error("Error clearing data:", error instanceof Error ? error.message : String(error))
    throw error
  }
}

// Check if database has data
export async function hasData(): Promise<boolean> {
  try {
    if (isPreviewMode()) {
      return true // Always return true in preview mode
    }

    const wrestlerCount = await redis!.scard("wrestlers:all")
    const tournamentCount = await redis!.scard("tournaments:all")
    return wrestlerCount > 0 || tournamentCount > 0
  } catch (error) {
    console.error("Error checking data:", error instanceof Error ? error.message : String(error))
    return true // Default to true to avoid setup prompts in case of error
  }
}
