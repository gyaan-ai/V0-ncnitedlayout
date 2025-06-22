"use client"

import { useEffect, useState } from "react"
import { CommitCardMobile } from "@/components/recruiting/commit-card-mobile"

export default function TestMobileLiam() {
  const [athlete, setAthlete] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchLiam = async () => {
      try {
        const response = await fetch("/api/athletes/by-name?firstName=Liam&lastName=Hickey")
        if (response.ok) {
          const data = await response.json()
          setAthlete(data)
        }
      } catch (error) {
        console.error("Error fetching Liam:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLiam()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading Liam's data...</p>
        </div>
      </div>
    )
  }

  if (!athlete) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Failed to load Liam's data</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Mobile Commit Card - Real Data Test</h1>

        <div className="flex justify-center">
          <CommitCardMobile
            id={athlete.id}
            athleteName={athlete.full_name}
            firstName={athlete.first_name}
            lastName={athlete.last_name}
            commitPhotoUrl={athlete.commitment_image_url}
            collegeName={athlete.college_committed || "University of North Carolina"}
            collegeLogo={athlete.logos?.college}
            highSchool={athlete.high_school}
            highSchoolLogo={athlete.logos?.high_school}
            club={athlete.wrestling_club}
            clubLogo={athlete.logos?.club}
            ncUnitedTeam={athlete.nc_united_team}
            ncUnitedLogo={athlete.logos?.nc_united}
            graduationYear={athlete.graduation_year}
            weightClass={athlete.weight_class}
            division={athlete.college_division || "NCAA Division I"}
            instagramHandle={athlete.instagram_handle}
            achievements={athlete.achievements?.other_achievements || []}
            aiSummary={athlete.generated_bio}
          />
        </div>

        <div className="mt-8 bg-white rounded-lg p-4 max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-4">Debug Data:</h2>
          <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(athlete, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
