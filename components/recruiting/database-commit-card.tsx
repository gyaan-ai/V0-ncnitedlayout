"use client"

import { useState, useEffect } from "react"
import { CommitCardSigned } from "./commit-card-signed"

interface DatabaseCommitCardProps {
  firstName: string
  lastName: string
  className?: string
}

export function DatabaseCommitCard({ firstName, lastName, className }: DatabaseCommitCardProps) {
  const [athlete, setAthlete] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadAthlete() {
      try {
        console.log("🔍 Fetching athlete:", firstName, lastName)
        const response = await fetch(
          `/api/athletes/by-name?firstName=${encodeURIComponent(firstName)}&lastName=${encodeURIComponent(lastName)}`,
        )

        console.log("📡 API Response status:", response.status)

        if (!response.ok) {
          throw new Error(`Failed to fetch athlete: ${response.status}`)
        }

        const data = await response.json()
        console.log("✅ Athlete data loaded:", data)
        setAthlete(data)
      } catch (err) {
        console.error("❌ Error loading athlete:", err)
        setError(err instanceof Error ? err.message : "Failed to load athlete")
      } finally {
        setLoading(false)
      }
    }

    loadAthlete()
  }, [firstName, lastName])

  if (loading) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-lg flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">
            Loading {firstName} {lastName}...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-[500px] bg-red-50 rounded-lg flex items-center justify-center">
        <div className="text-center text-red-600">
          <p className="font-semibold">Error loading athlete</p>
          <p className="text-sm">{error}</p>
          <p className="text-xs mt-2">
            Searching for: {firstName} {lastName}
          </p>
        </div>
      </div>
    )
  }

  if (!athlete) {
    return (
      <div className="w-full h-[500px] bg-yellow-50 rounded-lg flex items-center justify-center">
        <div className="text-center text-yellow-600">
          <p className="font-semibold">Athlete not found</p>
          <p className="text-sm">
            {firstName} {lastName}
          </p>
        </div>
      </div>
    )
  }

  // Convert database athlete to card props format
  const cardProps = {
    id: athlete.id,
    athleteName: athlete.full_name || `${athlete.first_name} ${athlete.last_name}`,
    firstName: athlete.first_name,
    lastName: athlete.last_name,
    commitPhotoUrl: athlete.commitment_image_url || athlete.profile_image_url,
    collegeName: athlete.college_committed,
    collegeLogo: athlete.logos?.college,
    collegeColors: {
      primary: "#4B9CD3", // UNC Blue
      secondary: "#FFFFFF",
    },
    highSchool: athlete.high_school,
    highSchoolLogo: athlete.logos?.high_school,
    club: athlete.wrestling_club,
    clubLogo: athlete.logos?.club,
    ncUnitedTeam: athlete.nc_united_team,
    ncUnitedLogo: athlete.logos?.nc_united,
    graduationYear: athlete.graduation_year,
    weightClass: athlete.weight_class || "Unknown",
    division: athlete.college_division,
    instagramHandle: athlete.instagram_handle,
    achievements: [
      "2024 Ultimate Club Duals Participant",
      "NC United Wrestling Club Member",
      "Cardinal Gibbons High School Wrestling",
      "RAW Wrestling Club Athlete",
      "Class of 2025 College Commit",
    ],
    aiSummary: athlete.generated_bio,
    commitmentDate: athlete.commitment_date,
    className,
  }

  return <CommitCardSigned {...cardProps} />
}
