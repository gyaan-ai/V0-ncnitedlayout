"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { CommitCardSigned } from "@/components/recruiting/commit-card-signed"
import { Users, GraduationCap, Search, Filter } from "lucide-react"
import { toast } from "sonner"

export default function CommitsPage() {
  const [athletes, setAthletes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    loadCommittedAthletes()
  }, [])

  const loadCommittedAthletes = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/athletes")

      if (!response.ok) {
        throw new Error("Failed to fetch athletes")
      }

      const data = await response.json()
      // Filter only committed athletes with commitment photos
      const committedAthletes = data.filter(
        (athlete) => athlete.is_committed && athlete.college_committed && athlete.commitment_image_url,
      )
      setAthletes(committedAthletes)
    } catch (error) {
      console.error("Error loading committed athletes:", error)
      toast.error("Failed to load committed athletes")
      setAthletes([])
    } finally {
      setLoading(false)
    }
  }

  // Filter athletes based on search
  const filteredAthletes = athletes.filter((athlete) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      athlete.first_name?.toLowerCase().includes(searchLower) ||
      athlete.last_name?.toLowerCase().includes(searchLower) ||
      athlete.college_committed?.toLowerCase().includes(searchLower) ||
      athlete.high_school?.toLowerCase().includes(searchLower)
    )
  })

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg">Loading committed athletes...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">College Commitments</h1>
        <p className="text-gray-600">Celebrating our athletes' college commitments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{athletes.length}</p>
                <p className="text-sm text-gray-600">Total Commitments</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{new Set(athletes.map((a) => a.college_committed)).size}</p>
                <p className="text-sm text-gray-600">Different Colleges</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Filter className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">
                  {athletes.filter((a) => a.college_division === "NCAA Division I").length}
                </p>
                <p className="text-sm text-gray-600">Division I</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <Card className="mb-8">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <Search className="h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by athlete name, college, or high school..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
          </div>
        </CardContent>
      </Card>

      {/* Commitment Cards Grid */}
      {filteredAthletes.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              {searchTerm ? "No commitments match your search" : "No commitments found"}
            </h3>
            <p className="text-gray-500">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Committed athletes with photos will appear here automatically."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAthletes.map((athlete) => (
            <CommitCardSigned
              key={athlete.id}
              id={athlete.id}
              athleteName={`${athlete.first_name} ${athlete.last_name}`}
              firstName={athlete.first_name}
              lastName={athlete.last_name}
              commitPhotoUrl={athlete.commitment_image_url}
              collegeName={athlete.college_committed}
              highSchool={athlete.high_school}
              club={athlete.wrestling_club}
              ncUnitedTeam={athlete.nc_united_team}
              graduationYear={athlete.graduation_year}
              weightClass={athlete.weight_class}
              division={athlete.college_division}
              instagramHandle={athlete.instagram_handle}
              achievements={Array.isArray(athlete.achievements) ? athlete.achievements : []}
              commitmentDate={athlete.commitment_date}
              className="mx-auto"
            />
          ))}
        </div>
      )}

      {/* Summary */}
      {filteredAthletes.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Commitment Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {athletes.filter((a) => a.graduation_year === 2025).length}
                </p>
                <p className="text-sm text-gray-600">Class of 2025</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">
                  {athletes.filter((a) => a.graduation_year === 2026).length}
                </p>
                <p className="text-sm text-gray-600">Class of 2026</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">
                  {athletes.filter((a) => a.graduation_year === 2027).length}
                </p>
                <p className="text-sm text-gray-600">Class of 2027</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {athletes.filter((a) => a.graduation_year >= 2028).length}
                </p>
                <p className="text-sm text-gray-600">Class of 2028+</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
