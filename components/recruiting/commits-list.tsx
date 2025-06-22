"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, GraduationCap, MapPin, Weight, Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"

interface CommitData {
  id: string
  first_name: string
  last_name: string
  high_school: string
  college_committed: string
  weight_class: string
  graduation_year: number
  profile_image_url?: string
  commitment_image_url?: string
  college_division?: string
  hometown?: string
  commitment_date?: string
  is_featured?: boolean
}

export default function CommitsList() {
  const [commits, setCommits] = useState<CommitData[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDivision, setFilterDivision] = useState("all")
  const [filterYear, setFilterYear] = useState("all")

  useEffect(() => {
    loadCommits()
  }, [])

  const loadCommits = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/athletes/committed")

      if (!response.ok) {
        throw new Error("Failed to fetch commits")
      }

      const data = await response.json()
      setCommits(Array.isArray(data) ? data : data.athletes || [])
    } catch (error) {
      console.error("Error loading commits:", error)
      setCommits([])
    } finally {
      setLoading(false)
    }
  }

  // Filter commits based on search and filters
  const filteredCommits = commits.filter((commit) => {
    const matchesSearch =
      commit.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commit.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commit.high_school?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commit.college_committed?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      commit.hometown?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDivision = filterDivision === "all" || commit.college_division === filterDivision

    const matchesYear = filterYear === "all" || commit.graduation_year?.toString() === filterYear

    return matchesSearch && matchesDivision && matchesYear
  })

  // Get unique values for filters
  const divisions = [...new Set(commits.map((c) => c.college_division).filter(Boolean))]
  const years = [...new Set(commits.map((c) => c.graduation_year).filter(Boolean))].sort((a, b) => a - b)

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg">Loading commits...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">NC United Commits</h1>
        <p className="text-gray-600">Celebrating our athletes' college commitments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-600" />
              <div className="ml-3">
                <p className="text-2xl font-bold">{commits.length}</p>
                <p className="text-sm text-gray-600">Total Commits</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Badge className="h-8 w-8 bg-yellow-100 text-yellow-800 flex items-center justify-center">D1</Badge>
              <div className="ml-3">
                <p className="text-2xl font-bold">
                  {commits.filter((c) => c.college_division === "NCAA Division I").length}
                </p>
                <p className="text-sm text-gray-600">Division I</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Badge className="h-8 w-8 bg-green-100 text-green-800 flex items-center justify-center">D2</Badge>
              <div className="ml-3">
                <p className="text-2xl font-bold">
                  {commits.filter((c) => c.college_division === "NCAA Division II").length}
                </p>
                <p className="text-sm text-gray-600">Division II</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <Badge className="h-8 w-8 bg-purple-100 text-purple-800 flex items-center justify-center">D3</Badge>
              <div className="ml-3">
                <p className="text-2xl font-bold">
                  {commits.filter((c) => c.college_division === "NCAA Division III").length}
                </p>
                <p className="text-sm text-gray-600">Division III</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by name, school, or college..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={filterDivision} onValueChange={setFilterDivision}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="All Divisions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Divisions</SelectItem>
                {divisions.map((division) => (
                  <SelectItem key={division} value={division}>
                    {division}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={filterYear} onValueChange={setFilterYear}>
              <SelectTrigger className="w-full md:w-32">
                <SelectValue placeholder="All Years" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Years</SelectItem>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Commits Grid */}
      {filteredCommits.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <GraduationCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Commits Found</h3>
            <p className="text-gray-500">
              {searchTerm || filterDivision !== "all" || filterYear !== "all"
                ? "No commits match your current filters."
                : "No commits available at this time."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCommits.map((commit) => (
            <Card key={commit.id} className="hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-0">
                {/* Header with athlete image */}
                <div className="relative h-48 bg-gradient-to-br from-blue-600 to-blue-800 rounded-t-lg overflow-hidden">
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                  <div className="relative z-10 p-6 text-white">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">
                          {commit.first_name} {commit.last_name}
                        </h3>
                        <p className="text-blue-100 text-sm mb-2">{commit.high_school}</p>
                        {commit.is_featured && (
                          <Badge className="bg-yellow-500 text-yellow-900 text-xs">Featured</Badge>
                        )}
                      </div>
                      <div className="ml-4">
                        <img
                          src={commit.profile_image_url || "/placeholder.svg?height=80&width=80&query=athlete+headshot"}
                          alt={`${commit.first_name} ${commit.last_name}`}
                          className="w-16 h-16 rounded-full border-2 border-white object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* College Commitment */}
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <GraduationCap className="h-5 w-5 text-green-600 mr-2" />
                      <span className="font-semibold text-green-700">Committed to</span>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">{commit.college_committed}</h4>
                    {commit.college_division && (
                      <Badge variant="outline" className="mt-1">
                        {commit.college_division}
                      </Badge>
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Weight className="h-4 w-4 mr-2" />
                      <span>{commit.weight_class}lbs</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>Class of {commit.graduation_year}</span>
                    </div>
                    {commit.hometown && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2" />
                        <span>{commit.hometown}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="mt-4 pt-4 border-t">
                    <Link href={`/recruiting/athletes/${commit.id}`}>
                      <Button variant="outline" className="w-full">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Profile
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
