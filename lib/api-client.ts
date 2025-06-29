// Clean API client for frontend usage
import type { Athlete, Logo } from "./database"

export class ApiClient {
  // Athletes
  static async getCommittedAthletes(): Promise<Athlete[]> {
    const response = await fetch("/api/athletes/committed")
    if (!response.ok) throw new Error("Failed to fetch committed athletes")
    return response.json()
  }

  static async getAthleteById(id: string): Promise<Athlete | null> {
    const response = await fetch(`/api/athletes/${id}`)
    if (!response.ok) return null
    return response.json()
  }

  static async updateAthlete(id: string, updates: Partial<Athlete>): Promise<Athlete> {
    const response = await fetch(`/api/athletes/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })

    if (!response.ok) throw new Error("Failed to update athlete")
    return response.json()
  }

  // Logos
  static async getLogoByInstitution(institutionName: string): Promise<Logo | null> {
    const response = await fetch(`/api/logos/match?institution=${encodeURIComponent(institutionName)}`)
    if (!response.ok) return null
    return response.json()
  }
}
