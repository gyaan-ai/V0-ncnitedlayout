import { sampleAthletes } from "./recruiting-data"

export function getAthleteByName(firstName: string, lastName: string) {
  return sampleAthletes.find(
    (athlete) =>
      athlete.firstName?.toLowerCase() === firstName.toLowerCase() &&
      athlete.lastName?.toLowerCase() === lastName.toLowerCase(),
  )
}

export function getAthleteById(id: number) {
  return sampleAthletes.find((athlete) => athlete.id === id)
}

// Helper to get achievements for a specific athlete
export function getAthleteAchievements(firstName: string, lastName: string): string[] {
  const athlete = getAthleteByName(firstName, lastName)
  return athlete?.achievements || []
}
