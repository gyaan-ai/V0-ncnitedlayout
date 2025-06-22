"use client"

import { useState, useEffect } from "react"
import { CommitCardSigned } from "@/components/recruiting/commit-card-signed"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, Trophy, Users, Star } from "lucide-react"
import Link from "next/link"

type Athlete = {
  id: string
  first_name: string
  last_name: string
  weight_class: string
  graduation_year: number
  high_school: string
  wrestling_club?: string
  college_committed?: string
  college_division?: string
  commitment_image_url?: string
  profile_image_url?: string
  nc_united_team?: string
  is_featured: boolean
  is_committed: boolean
  achievements?: {
    other_achievements?: string[]
  }
}

export function FeaturedCommits() {
  const [athletes, setAthletes] = useState<Athlete[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadFeaturedAthletes() {
      try {
        const response = await fetch("/api/admin/athletes")
        if (response.ok) {
          const data = await response.json()
          // Filter for featured and committed athletes only
          const featuredCommits = data.filter(
            (athlete: Athlete) => athlete.is_featured && athlete.is_committed && athlete.college_committed,
          )
          setAthletes(featuredCommits)
        }
      } catch (error) {
        console.error("Error loading featured athletes:", error)
      } finally {
        setLoading(false)
      }
    }

    loadFeaturedAthletes()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading featured commitments...</p>
        </div>
      </div>
    )
  }

  if (athletes.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card>
          <CardContent className="p-12 text-center">
            <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">No Featured Commitments Yet</h3>
            <p className="text-gray-600 mb-4">
              Featured athlete commitments will appear here once they're added to the system.
            </p>
            <Link href="/admin/athlete-management">
              <Button>Manage Athletes</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Group by graduation year
  const athletesByYear = athletes.reduce(
    (acc, athlete) => {
      const year = athlete.graduation_year
      if (!acc[year]) acc[year] = []
      acc[year].push(athlete)
      return acc
    },
    {} as Record<number, Athlete[]>,
  )

  const sortedYears = Object.keys(athletesByYear)
    .map(Number)
    .sort((a, b) => a - b)

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Featured Commitments</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Celebrating our NC United wrestlers who have committed to compete at the collegiate level
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardContent className="p-6 text-center">
            <GraduationCap className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-3xl font-bold">{athletes.length}</p>
            <p className="text-sm text-gray-600">Total Commitments</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-3xl font-bold">
              {athletes.filter((a) => a.college_division === "NCAA Division I").length}
            </p>
            <p className="text-sm text-gray-600">Division I</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-3xl font-bold">{sortedYears.length}</p>
            <p className="text-sm text-gray-600">Graduation Years</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Star className="h-8 w-8 text-red-600 mx-auto mb-2" />
            <p className="text-3xl font-bold">{new Set(athletes.map((a) => a.college_committed)).size}</p>
            <p className="text-sm text-gray-600">Different Colleges</p>
          </CardContent>
        </Card>
      </div>

      {/* Commitments by Year */}
      {sortedYears.map((year) => (
        <div key={year} className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Class of {year}</h2>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {athletesByYear[year].length} Commitment{athletesByYear[year].length !== 1 ? "s" : ""}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {athletesByYear[year].map((athlete) => (
              <CommitCardSigned
                key={athlete.id}
                id={Number.parseInt(athlete.id.slice(-8), 16)}
                athleteName={`${athlete.first_name} ${athlete.last_name}`}
                firstName={athlete.first_name}
                lastName={athlete.last_name}
                commitPhotoUrl={athlete.commitment_image_url || athlete.profile_image_url}
                collegeName={athlete.college_committed || ""}
                highSchool={athlete.high_school}
                club={athlete.wrestling_club}
                ncUnitedTeam={athlete.nc_united_team as "Blue" | "Gold" | null}
                graduationYear={athlete.graduation_year}
                weightClass={athlete.weight_class}
                division={athlete.college_division}
                achievements={athlete.achievements?.other_achievements || []}
                className="h-full"
              />
            ))}
          </div>
        </div>
      ))}

      {/* Call to Action */}
      <div className="text-center mt-16">
        <Card className="bg-gradient-to-r from-blue-50 to-red-50 border-2 border-blue-200">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold mb-4">Join NC United Wrestling</h3>
            <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
              Ready to take your wrestling to the next level? Join our program and follow in the footsteps of these
              committed athletes.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/about">
                <Button size="lg">Learn More</Button>
              </Link>
              <Link href="/our-team">
                <Button variant="outline" size="lg">
                  Meet Our Coaches
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
