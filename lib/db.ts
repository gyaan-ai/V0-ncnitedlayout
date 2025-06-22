import { neon } from "@neondatabase/serverless"

// Use Supabase Postgres connection
const sql = neon(process.env.SUPABASE_POSTGRES_URL!)

// Wrestler types
export type Wrestler = {
  id: number
  first_name: string
  last_name: string
  weight: number
  grade?: string
  school?: string
  image_url?: string
  created_at: Date
}

export type WrestlerInput = Omit<Wrestler, "id" | "created_at">

// Tournament types
export type Tournament = {
  id: number
  name: string
  location?: string
  start_date?: Date
  end_date?: Date
  description?: string
  image_url?: string
  created_at: Date
}

export type TournamentInput = Omit<Tournament, "id" | "created_at">

// Match types
export type Match = {
  id: number
  tournament_id: number
  wrestler_id: number
  opponent_name: string
  opponent_team?: string
  result: string
  match_type?: string
  points: number
  match_number?: number
  created_at: Date
}

export type MatchInput = Omit<Match, "id" | "created_at">

// Extended types for joined data
export type WrestlerWithMatches = Wrestler & {
  matches?: (Match & { tournament_name?: string })[]
  total_matches?: number
  total_wins?: number
  total_losses?: number
  win_percentage?: number
}

export type TournamentWithStats = Tournament & {
  wrestler_count?: number
  total_matches?: number
  team_record?: string
}

// Wrestler functions
export async function getWrestlers() {
  const rows = await sql`SELECT * FROM wrestlers ORDER BY weight, last_name`
  return rows as Wrestler[]
}

export async function getWrestlerById(id: number) {
  const rows = await sql`SELECT * FROM wrestlers WHERE id = ${id}`
  return rows[0] as Wrestler | undefined
}

export async function getWrestlerByName(firstName: string, lastName: string) {
  const rows = await sql`
    SELECT * FROM wrestlers 
    WHERE LOWER(first_name) = LOWER(${firstName}) 
    AND LOWER(last_name) = LOWER(${lastName})
  `
  return rows[0] as Wrestler | undefined
}

export async function getWrestlersByTournament(tournamentId: number) {
  const rows = await sql`
    SELECT DISTINCT w.*, 
           COUNT(m.id) as total_matches,
           SUM(CASE WHEN m.points > 0 THEN 1 ELSE 0 END) as total_wins,
           SUM(CASE WHEN m.points < 0 THEN 1 ELSE 0 END) as total_losses,
           SUM(m.points) as total_points
    FROM wrestlers w
    JOIN matches m ON w.id = m.wrestler_id
    WHERE m.tournament_id = ${tournamentId}
    GROUP BY w.id, w.first_name, w.last_name, w.weight, w.grade, w.school, w.image_url, w.created_at
    ORDER BY w.weight
  `
  return rows as (Wrestler & {
    total_matches: number
    total_wins: number
    total_losses: number
    total_points: number
  })[]
}

export async function createWrestler(wrestler: WrestlerInput) {
  const rows = await sql`
    INSERT INTO wrestlers (first_name, last_name, weight, grade, school, image_url)
    VALUES (${wrestler.first_name}, ${wrestler.last_name}, ${wrestler.weight}, ${wrestler.grade}, ${wrestler.school}, ${wrestler.image_url})
    RETURNING *
  `
  return rows[0] as Wrestler
}

// Tournament functions
export async function getTournaments() {
  const rows = await sql`
    SELECT t.*, 
           COUNT(DISTINCT m.wrestler_id) as wrestler_count,
           COUNT(m.id) as total_matches
    FROM tournaments t
    LEFT JOIN matches m ON t.id = m.tournament_id
    GROUP BY t.id, t.name, t.location, t.start_date, t.end_date, t.description, t.image_url, t.created_at
    ORDER BY t.start_date DESC
  `
  return rows as TournamentWithStats[]
}

export async function getTournamentById(id: number) {
  const rows = await sql`SELECT * FROM tournaments WHERE id = ${id}`
  return rows[0] as Tournament | undefined
}

export async function getTournamentByName(name: string) {
  const rows = await sql`
    SELECT * FROM tournaments 
    WHERE LOWER(name) LIKE LOWER(${`%${name}%`})
  `
  return rows[0] as Tournament | undefined
}

export async function createTournament(tournament: TournamentInput) {
  const rows = await sql`
    INSERT INTO tournaments (name, location, start_date, end_date, description, image_url)
    VALUES (${tournament.name}, ${tournament.location}, ${tournament.start_date}, ${tournament.end_date}, ${tournament.description}, ${tournament.image_url})
    RETURNING *
  `
  return rows[0] as Tournament
}

// Match functions
export async function getMatchesByTournament(tournamentId: number) {
  const rows = await sql`
    SELECT m.*, w.first_name, w.last_name, w.weight, w.image_url
    FROM matches m
    JOIN wrestlers w ON m.wrestler_id = w.id
    WHERE m.tournament_id = ${tournamentId}
    ORDER BY w.weight, m.match_number
  `
  return rows
}

export async function getMatchesByWrestler(wrestlerId: number) {
  const rows = await sql`
    SELECT m.*, t.name as tournament_name, t.start_date
    FROM matches m
    JOIN tournaments t ON m.tournament_id = t.id
    WHERE m.wrestler_id = ${wrestlerId}
    ORDER BY t.start_date DESC, m.match_number
  `
  return rows
}

export async function getWrestlerRecord(wrestlerId: number, tournamentId?: number) {
  let query = `
    SELECT 
      COUNT(*) as total_matches,
      SUM(CASE WHEN points > 0 THEN 1 ELSE 0 END) as wins,
      SUM(CASE WHEN points < 0 THEN 1 ELSE 0 END) as losses,
      SUM(points) as total_points
    FROM matches 
    WHERE wrestler_id = ${wrestlerId}
  `

  if (tournamentId) {
    query += ` AND tournament_id = ${tournamentId}`
  }

  const rows = await sql(query)
  const result = rows[0]

  return {
    record: `${result.wins}-${result.losses}`,
    total_matches: Number.parseInt(result.total_matches),
    wins: Number.parseInt(result.wins),
    losses: Number.parseInt(result.losses),
    total_points: Number.parseInt(result.total_points),
  }
}

export async function createMatch(match: MatchInput) {
  const rows = await sql`
    INSERT INTO matches (tournament_id, wrestler_id, opponent_name, opponent_team, result, match_type, points, match_number)
    VALUES (${match.tournament_id}, ${match.wrestler_id}, ${match.opponent_name}, ${match.opponent_team}, ${match.result}, ${match.match_type}, ${match.points}, ${match.match_number})
    RETURNING *
  `
  return rows[0] as Match
}

// Analytics functions
export async function getTournamentStats(tournamentId: number) {
  const rows = await sql`
    SELECT 
      COUNT(DISTINCT wrestler_id) as total_wrestlers,
      COUNT(*) as total_matches,
      SUM(CASE WHEN points > 0 THEN 1 ELSE 0 END) as total_wins,
      SUM(CASE WHEN points < 0 THEN 1 ELSE 0 END) as total_losses,
      ROUND(
        (SUM(CASE WHEN points > 0 THEN 1 ELSE 0 END)::float / 
         NULLIF(COUNT(*), 0)) * 100, 1
      ) as win_percentage
    FROM matches 
    WHERE tournament_id = ${tournamentId}
  `

  return rows[0]
}

export async function getTopPerformers(tournamentId: number, limit = 5) {
  const rows = await sql`
    SELECT 
      w.first_name, w.last_name, w.weight, w.image_url,
      COUNT(m.id) as total_matches,
      SUM(CASE WHEN m.points > 0 THEN 1 ELSE 0 END) as wins,
      SUM(CASE WHEN m.points < 0 THEN 1 ELSE 0 END) as losses,
      SUM(m.points) as total_points,
      ROUND(
        (SUM(CASE WHEN m.points > 0 THEN 1 ELSE 0 END)::float / 
         NULLIF(COUNT(m.id), 0)) * 100, 1
      ) as win_percentage
    FROM wrestlers w
    JOIN matches m ON w.id = m.wrestler_id
    WHERE m.tournament_id = ${tournamentId}
    GROUP BY w.id, w.first_name, w.last_name, w.weight, w.image_url
    ORDER BY win_percentage DESC, total_points DESC
    LIMIT ${limit}
  `

  return rows
}
