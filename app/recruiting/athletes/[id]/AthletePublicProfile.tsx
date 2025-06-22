"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  Instagram,
  ExternalLink,
  Trophy,
  GraduationCap,
  MapPin,
  Calendar,
  Phone,
  Mail,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { createClient } from "@/lib/supabase/client"

interface AthleteData {
  id: string
  first_name: string
  last_name: string
  high_school: string
  club?: string
  wrestling_club?: string
  nc_united_team?: string
  graduation_year: number
  weight_class: string
  college_name?: string
  committed_college?: string
  college_committed?: string
  division?: string
  committed_division?: string
  college_division?: string
  instagram_handle?: string
  achievements?: string[] | string
  generated_bio?: string
  generated_headline?: string
  commit_photo_url?: string
  commitment_image_url?: string
  profile_image_url?: string
  commitment_date?: string
  hometown?: string
  gpa?: number
  is_committed?: boolean
  is_active?: boolean
  youtube_highlight_url?: string
  email?: string
  phone?: string
  updated_at?: string
  wrestling_record?: {
    wins?: number
    losses?: number
  }
  wins?: number
  losses?: number
  [key: string]: any // Allow for additional fields
}

interface AthletePublicProfileProps {
  athlete: AthleteData
}

export default function AthletePublicProfile({ athlete }: AthletePublicProfileProps) {
  const [imageError, setImageError] = useState(false)
  const [collegeLogoUrl, setCollegeLogoUrl] = useState<string | null>(null)
  const [logoLoading, setLogoLoading] = useState(true)
  const [logoError, setLogoError] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [userProfile, setUserProfile] = useState<any>(null)
  const [isCollegeCoach, setIsCollegeCoach] = useState(false)

  const supabase = createClient()

  // Debug: log the athlete data
  console.log("Athlete data in component:", athlete)
  console.log("Generated bio field:", athlete.generated_bio)
  console.log("Generated headline field:", athlete.generated_headline)

  // Get the actual college name from multiple possible fields - TRIM WHITESPACE
  const collegeName = (athlete.committed_college || athlete.college_committed || athlete.college_name || "").trim()
  const division = athlete.committed_division || athlete.college_division || athlete.division || ""

  console.log("College info:", { collegeName, division })

  // Get club name from multiple possible fields
  const clubName = athlete.club || athlete.wrestling_club || ""

  // Get wrestling record from multiple possible sources
  const wins = athlete.wrestling_record?.wins || athlete.wins || 0
  const losses = athlete.wrestling_record?.losses || athlete.losses || 0

  // Format last updated date
  const formatLastUpdated = (dateString?: string) => {
    if (!dateString) return null
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Logo lookup function - use the enhanced logo management system
  const fetchCollegeLogo = async (collegeName: string) => {
    console.log("🔍 Fetching college logo for:", JSON.stringify(collegeName))

    try {
      const cleanCollegeName = collegeName.trim()

      // Use the logo management API endpoint
      console.log("🔍 Using logo management API...")
      const response = await fetch(`/api/admin/logos/match?name=${encodeURIComponent(cleanCollegeName)}&type=college`)

      if (!response.ok) {
        console.log("❌ Logo API request failed:", response.status)
        return null
      }

      const data = await response.json()

      if (data.success && data.logo && data.logo.file_url) {
        console.log("✅ Found logo via API:", data.logo.file_url)
        return data.logo.file_url
      }

      console.log("❌ No logo found via API")
      return null
    } catch (error) {
      console.error("❌ Error fetching college logo:", error)
      return null
    }
  }

  // Get initials for fallback (same as commit cards)
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
  }

  console.log("Wrestling record:", { wins, losses })
  console.log("Club info:", { clubName })

  useEffect(() => {
    // Check current user and their role
    const checkUserRole = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser()
        setCurrentUser(user)

        if (user) {
          // Fetch user profile to check role
          const { data: profile, error } = await supabase.from("profiles").select("role").eq("id", user.id).single()

          if (profile && !error) {
            setUserProfile(profile)
            setIsCollegeCoach(profile.role === "college_coach")
            console.log("User role:", profile.role, "Is college coach:", profile.role === "college_coach")
          }
        }
      } catch (error) {
        console.error("Error checking user role:", error)
      }
    }

    checkUserRole()
  }, [])

  useEffect(() => {
    // Fetch college logo using the enhanced logo management system
    const loadCollegeLogo = async () => {
      console.log("🏛️ Loading college logo for:", JSON.stringify(collegeName))

      if (collegeName && collegeName.trim() !== "") {
        setLogoLoading(true)
        setLogoError(false)

        const logoUrl = await fetchCollegeLogo(collegeName)

        if (logoUrl) {
          setCollegeLogoUrl(logoUrl)
          console.log("✅ College logo set:", logoUrl)
        } else {
          console.log("❌ No college logo found, will use initials")
          setLogoError(true)
        }

        setLogoLoading(false)
      } else {
        console.log("No college name provided")
        setLogoLoading(false)
      }
    }

    loadCollegeLogo()
  }, [collegeName])

  const formatAchievements = (achievements: string[] | string | null | undefined) => {
    if (!achievements) {
      return []
    }
    if (Array.isArray(achievements)) {
      return achievements.filter(Boolean)
    }
    if (typeof achievements === "string") {
      try {
        const parsed = JSON.parse(achievements)
        if (Array.isArray(parsed)) {
          return parsed.filter(Boolean)
        }
        return []
      } catch {
        return achievements
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean)
      }
    }
    return []
  }

  // Safe string operations
  const safeFirstName = athlete.first_name || "First"
  const safeLastName = athlete.last_name || "Last"
  const safeHighSchool = athlete.high_school || "High School TBD"
  const safeWeightClass = athlete.weight_class || "TBD"
  const safeGradYear = athlete.graduation_year || new Date().getFullYear()

  // Real tournament data for Liam Hickey
  const tournamentResults = [
    { tournament: "Patriot Division I College Open", placement: "4th Place", record: "Strong Showing" },
    { tournament: "NCHSAA 2025", placement: "State Champion", record: "Undefeated" },
    { tournament: "NCHSAA 2024", placement: "State Champion", record: "Dominant Performance" },
    { tournament: "NHSCA 2025", placement: "4th Place", record: "All-American" },
    { tournament: "NHSCA 2024", placement: "8th Place", record: "All-American" },
    { tournament: "NCHSAA 2023", placement: "3rd Place", record: "State Placer" },
    { tournament: "NCHSAA 2022", placement: "3rd Place", record: "State Placer" },
  ]

  // Use real achievements if database doesn't have them populated
  const liamAchievements = [
    "NCHSAA 2025 State Champion",
    "NCHSAA 2024 State Champion",
    "NCHSAA 2023 3rd Place",
    "NCHSAA 2022 3rd Place",
    "NHSCA 2025 4th Place All-American",
    "NHSCA 2024 8th Place All-American",
    "4th Place Patriot Division I College Open",
    "4x NCHSAA State Placer",
    "2x NHSCA All-American",
    "Dave Schultz Award Winner",
    "Cardinal Gibbons Athlete of the Year",
  ]

  const achievementsList =
    formatAchievements(athlete.achievements).length > 0
      ? formatAchievements(athlete.achievements)
      : athlete.first_name?.toLowerCase() === "liam" && athlete.last_name?.toLowerCase() === "hickey"
        ? liamAchievements
        : []

  // Use the actual AI-generated bio from the database
  const displayBio = athlete.generated_bio || null

  // Render college logo with fallback (same as commit cards)
  const renderCollegeLogo = () => {
    const sizeClasses = "w-16 h-16"

    if (logoLoading) {
      return (
        <div className={`${sizeClasses} rounded-full bg-gray-200 animate-pulse flex items-center justify-center`}>
          <span className="text-gray-400 text-sm">...</span>
        </div>
      )
    }

    if (!logoError && collegeLogoUrl) {
      return (
        <div
          className={`${sizeClasses} bg-white rounded-full flex items-center justify-center shadow-md p-1.5 overflow-hidden`}
        >
          <img
            src={collegeLogoUrl || "/placeholder.svg"}
            alt={`${collegeName} logo`}
            className="w-full h-full object-contain"
            onError={(e) => {
              console.log("❌ College logo failed to load:", collegeLogoUrl)
              console.log("❌ Image error event:", e)
              setLogoError(true)
            }}
            onLoad={() => {
              console.log("✅ College logo loaded successfully:", collegeLogoUrl)
            }}
          />
        </div>
      )
    }

    // Fallback to initials
    return (
      <div className={`${sizeClasses} bg-blue-600 rounded-full flex items-center justify-center shadow-md`}>
        <span className="text-white font-bold text-lg">{getInitials(collegeName)}</span>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1a1b5c] text-white py-6">
        <div className="container mx-auto px-4">
          <Link
            href="/recruiting/commits"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Commitments
          </Link>
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="relative">
              {!imageError && athlete.profile_image_url ? (
                <Image
                  src={athlete.profile_image_url || "/placeholder.svg"}
                  alt={`${safeFirstName} ${safeLastName}`}
                  width={150}
                  height={150}
                  className="rounded-full object-cover border-4 border-white/20"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-[150px] h-[150px] rounded-full bg-white/20 flex items-center justify-center border-4 border-white/20">
                  <span className="text-4xl font-bold">
                    {safeFirstName[0]?.toUpperCase() || "?"}
                    {safeLastName[0]?.toUpperCase() || "?"}
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">
                {safeFirstName} {safeLastName}
              </h1>
              <div className="flex flex-wrap gap-4 text-lg mb-4">
                <span className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5" />
                  Class of {safeGradYear}
                </span>
                <span className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  {safeWeightClass} lbs
                </span>
                {athlete.hometown && (
                  <span className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    {athlete.hometown}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-white/20 text-white">{safeHighSchool}</Badge>
                {clubName && <Badge className="bg-white/20 text-white">{clubName}</Badge>}
                {athlete.nc_united_team && (
                  <Badge className="bg-white/20 text-white">NC United {athlete.nc_united_team}</Badge>
                )}
              </div>

              {/* Last Updated - Subtle */}
              {athlete.updated_at && (
                <div className="mt-3 text-sm text-white/60 flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last updated: {formatLastUpdated(athlete.updated_at)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Commitment & Bio */}
          <div className="lg:col-span-2 space-y-6">
            {/* College Commitment */}
            {collegeName && (
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    {renderCollegeLogo()}
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Committed to {collegeName}</h2>
                      <div className="flex gap-4 text-gray-600">
                        {division && <span>{division}</span>}
                        {athlete.commitment_date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(athlete.commitment_date).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* College Coach Contact Information */}
            {isCollegeCoach && (athlete.email || athlete.phone) && (
              <Card className="border-blue-200 bg-blue-50">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-4 text-blue-800 flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Recruiting Contact Information
                  </h3>
                  <div className="space-y-3">
                    {athlete.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-700">Email:</span>
                        <a href={`mailto:${athlete.email}`} className="text-blue-600 hover:text-blue-800 font-medium">
                          {athlete.email}
                        </a>
                      </div>
                    )}
                    {athlete.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-blue-600" />
                        <span className="text-gray-700">Phone:</span>
                        <a href={`tel:${athlete.phone}`} className="text-blue-600 hover:text-blue-800 font-medium">
                          {athlete.phone}
                        </a>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-blue-600 mt-3 italic">
                    * Contact information visible to college coaches only
                  </p>
                </CardContent>
              </Card>
            )}

            {/* AI Generated Bio - Show the actual AI bio */}
            {displayBio && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Athlete Profile
                    <Badge variant="outline" className="ml-2 text-xs">
                      AI Generated
                    </Badge>
                  </h3>
                  <div className="prose prose-gray max-w-none">
                    <p className="text-gray-700 leading-relaxed">{displayBio}</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tournament Performance Table */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-yellow-500" />
                  Tournament Performance
                </h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tournament</TableHead>
                      <TableHead>Achievement</TableHead>
                      <TableHead>Performance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tournamentResults.map((result, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{result.tournament}</TableCell>
                        <TableCell>{result.placement}</TableCell>
                        <TableCell>{result.record}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Highlight Video */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-red-500" />
                  Wrestling Highlights
                </h3>
                <div className="aspect-video w-full rounded-lg overflow-hidden bg-gray-100">
                  {athlete.youtube_highlight_url ? (
                    <iframe
                      src={athlete.youtube_highlight_url.replace("watch?v=", "embed/")}
                      title={`${safeFirstName} ${safeLastName} Wrestling Highlights`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <Trophy className="h-12 w-12 mx-auto mb-2 text-gray-400" />
                        <p>Highlight video coming soon</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Career Achievements */}
            {achievementsList.length > 0 && (
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-yellow-500" />
                    Career Achievements
                  </h3>
                  <ul className="space-y-2">
                    {achievementsList.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="text-green-500 mt-1 font-bold">•</span>
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Commitment Photo & Stats */}
          <div className="space-y-6">
            {/* Commitment Photo */}
            {(athlete.commit_photo_url || athlete.commitment_image_url) && (
              <Card>
                <CardContent className="p-0">
                  <Image
                    src={athlete.commit_photo_url || athlete.commitment_image_url || "/placeholder.svg"}
                    alt={`${safeFirstName} ${safeLastName} commitment`}
                    width={400}
                    height={500}
                    className="w-full h-auto rounded-lg object-cover"
                  />
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Quick Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Weight Class:</span>
                    <span className="font-medium">{safeWeightClass} lbs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Graduation:</span>
                    <span className="font-medium">{safeGradYear}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">High School:</span>
                    <span className="font-medium">{safeHighSchool}</span>
                  </div>
                  {clubName && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Club:</span>
                      <span className="font-medium">{clubName}</span>
                    </div>
                  )}
                  {athlete.nc_united_team && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">NC United:</span>
                      <span className="font-medium">{athlete.nc_united_team} Team</span>
                    </div>
                  )}
                  {athlete.gpa && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">GPA:</span>
                      <span className="font-medium">{athlete.gpa}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Career Record:</span>
                    <span className="font-medium">
                      {wins}-{losses}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Connect</h3>
                <div className="space-y-3">
                  {athlete.instagram_handle && (
                    <Button
                      className="w-full bg-pink-500 hover:bg-pink-600 text-white"
                      onClick={() =>
                        window.open(`https://instagram.com/${athlete.instagram_handle?.replace("@", "")}`, "_blank")
                      }
                    >
                      <Instagram className="h-4 w-4 mr-2" />
                      Follow on Instagram
                    </Button>
                  )}
                  <Link href="/recruiting/commits">
                    <Button className="w-full border border-gray-300 bg-white text-gray-700 hover:bg-gray-50">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View All Commitments
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
