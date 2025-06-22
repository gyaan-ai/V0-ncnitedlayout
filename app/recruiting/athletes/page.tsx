"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AthleteProfileCard } from "@/components/athlete-profile-card"
import { Users, Search, Filter } from "lucide-react"

export default function RecruitingAthletesPage() {
  const [athletes, setAthletes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterTeam, setFilterTeam] = useState("all")
  const [filterWeight, setFilterWeight] = useState("all")
  const [filterYear, setFilterYear] = useState("all")
  const [filterCommitted, setFilterCommitted] = useState("all")

  useEffect(() => {
    loadAthletes()
  }, [])

  const loadAthletes = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/athletes")

      if (!response.ok) {
        throw new Error("Failed to fetch athletes")
      }

      const data = await response.json()
      // Only show public profiles
      setAthletes(Array.isArray(data) ? data.filter((athlete) => athlete.is_public !== false) : [])
    } catch (error) {
      console.error("Error loading athletes:", error)
      setAthletes([])
    } finally {
      setLoading(false)
    }
  }

  // Filter athletes based on search and filters
  const filteredAthletes = athletes.filter((athlete) => {
    const matchesSearch =
      athlete.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.high_school?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.wrestling_club?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.college_committed?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesTeam = filterTeam === "all" || athlete.nc_united_team === filterTeam
    const matchesWeight = filterWeight === "all" || athlete.weight_class === filterWeight
    const matchesYear = filterYear === "all" || athlete.graduation_year?.toString() === filterYear
    const matchesCommitted =
      filterCommitted === "all" ||
      (filterCommitted === "committed" && athlete.is_committed) ||
      (filterCommitted === "uncommitted" && !athlete.is_committed)

    return matchesSearch && matchesTeam && matchesWeight && matchesYear && matchesCommitted
  })

  // Get unique values for filters
  const teams = [...new Set(athletes.map((a) => a.nc_united_team).filter(Boolean))]
  const weights = [...new Set(athletes.map((a) => a.weight_class).filter(Boolean))].sort(
    (a, b) => Number(a) - Number(b),
  )
  const years = [...new Set(athletes.map((a) => a.graduation_year).filter(Boolean))].sort()

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg">Loading athlete profiles...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">NC United Athletes</h1>
        <p className="text-gray-600">Discover our talented wrestlers and their achievements</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{athletes.length}</div>
            <div className="text-sm text-gray-600">Total Athletes</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{athletes.filter((a) => a.is_committed).length}</div>
            <div className="text-sm text-gray-600">Committed</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {athletes.filter((a) => a.youtube_highlight_url).length}
            </div>
            <div className="text-sm text-gray-600">With Highlights</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{athletes.filter((a) => a.is_featured).length}</div>
            <div className="text-sm text-gray-600">Featured</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filter Athletes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search athletes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={filterTeam} onValueChange={setFilterTeam}>
              <SelectTrigger>
                <SelectValue placeholder="All Teams" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Teams</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team} value={team}>
                    NC United {team}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterWeight} onValueChange={setFilterWeight}>
              <SelectTrigger>
                <SelectValue placeholder="All Weights" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Weights</SelectItem>
                {weights.map((weight) => (
                  <SelectItem key={weight} value={weight}>
                    {weight} lbs
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterYear} onValueChange={setFilterYear}>
              <SelectTrigger>
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    Class of {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterCommitted} onValueChange={setFilterCommitted}>
              <SelectTrigger>
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Athletes</SelectItem>
                <SelectItem value="committed">Committed</SelectItem>
                <SelectItem value="uncommitted">Uncommitted</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="mb-4 flex items-center justify-between">
        <p className="text-gray-600">
          Showing {filteredAthletes.length} of {athletes.length} athletes
        </p>
        {(searchTerm ||
          filterTeam !== "all" ||
          filterWeight !== "all" ||
          filterYear !== "all" ||
          filterCommitted !== "all") && (
          <div className="flex gap-2">
            {searchTerm && <Badge variant="secondary">Search: {searchTerm}</Badge>}
            {filterTeam !== "all" && <Badge variant="secondary">Team: {filterTeam}</Badge>}
            {filterWeight !== "all" && <Badge variant="secondary">Weight: {filterWeight}lbs</Badge>}
            {filterYear !== "all" && <Badge variant="secondary">Year: {filterYear}</Badge>}
            {filterCommitted !== "all" && <Badge variant="secondary">Status: {filterCommitted}</Badge>}
          </div>
        )}
      </div>

      {/* Athletes Grid */}
      {filteredAthletes.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Athletes Found</h3>
            <p className="text-gray-500">
              {searchTerm ||
              filterTeam !== "all" ||
              filterWeight !== "all" ||
              filterYear !== "all" ||
              filterCommitted !== "all"
                ? "Try adjusting your search criteria or filters."
                : "No athlete profiles are currently available."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredAthletes.map((athlete) => (
            <AthleteProfileCard key={athlete.id} athlete={athlete} variant="compact" />
          ))}
        </div>
      )}
    </div>
  )
}
