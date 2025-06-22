"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Instagram, RotateCcw, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface CommitCardFrontProps {
  id: number
  athleteName: string
  firstName: string
  lastName: string
  commitPhotoUrl?: string
  collegeName: string
  collegeLogo?: string
  highSchool: string
  highSchoolLogo?: string
  club?: string
  clubLogo?: string
  ncUnitedTeam?: "Blue" | "Gold" | null // Add NC United team
  graduationYear: number
  weightClass: string
  division?: string
  instagramHandle?: string
  achievements: string[]
  commitmentDate?: string
  className?: string
}

export function CommitCardFront({
  id,
  athleteName,
  firstName,
  lastName,
  commitPhotoUrl,
  collegeName,
  collegeLogo,
  highSchool,
  highSchoolLogo,
  club,
  clubLogo,
  ncUnitedTeam,
  graduationYear,
  weightClass,
  division = "NCAA Division I",
  instagramHandle,
  achievements,
  className,
}: CommitCardFrontProps) {
  const [logoUrls, setLogoUrls] = useState<Record<string, string>>({})
  const [logoErrors, setLogoErrors] = useState({
    college: false,
    highSchool: false,
    club: false,
    ncUnited: false,
  })
  const [showBack, setShowBack] = useState(false)

  // Fetch logo URLs from blob storage
  useEffect(() => {
    const fetchLogoUrls = async () => {
      try {
        // Simple public path approach first
        const logoMap = {
          college: `/images/logos/colleges/${collegeName.toLowerCase().replace(/\s+/g, "-")}.png`,
          highSchool: `/images/logos/high-schools/${highSchool.toLowerCase().replace(/\s+/g, "-")}.png`,
          club: club ? `/images/logos/clubs/${club.toLowerCase().replace(/\s+/g, "-")}.png` : null,
          ncUnited: ncUnitedTeam ? `/images/logos/teams/nc-united-${ncUnitedTeam.toLowerCase()}.png` : null,
        }

        setLogoUrls(logoMap)
      } catch (error) {
        console.error("Error setting logo URLs:", error)
      }
    }

    fetchLogoUrls()
  }, [collegeName, highSchool, club, ncUnitedTeam])

  // Get initials for institutions
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
  }

  // Get logo URL (blob or fallback)
  const getLogoUrl = (type: "college" | "highSchool" | "club" | "ncUnited") => {
    return logoUrls[type] || null
  }

  const handleLogoError = (type: "college" | "highSchool" | "club" | "ncUnited") => {
    setLogoErrors((prev) => ({ ...prev, [type]: true }))
  }

  const handleFlip = () => {
    setShowBack(!showBack)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${athleteName} commits to ${collegeName}`,
          text: `${athleteName} from ${highSchool} has committed to wrestle at ${collegeName}!`,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      const url = window.location.href
      navigator.clipboard.writeText(
        `${athleteName} from ${highSchool} has committed to wrestle at ${collegeName}! ${url}`,
      )
      alert("Link copied to clipboard!")
    }
  }

  if (showBack) {
    // Back of card - Accomplishments
    return (
      <div className={cn("w-full max-w-2xl mx-auto", className)}>
        <div className="bg-gray-50 rounded-2xl p-8 shadow-lg min-h-[600px]">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <h1 className="text-4xl font-bold text-gray-900">
                {firstName} {lastName}
              </h1>
              {instagramHandle && (
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-pink-500 hover:text-pink-600 hover:bg-pink-50"
                  onClick={() => window.open(`https://instagram.com/${instagramHandle.replace("@", "")}`, "_blank")}
                >
                  <Instagram className="h-6 w-6" />
                </Button>
              )}
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xl text-gray-600">Class of {graduationYear}</span>
              <Button
                size="icon"
                variant="outline"
                className="bg-blue-500 hover:bg-blue-600 text-white border-blue-500 rounded-full w-12 h-12"
                onClick={handleFlip}
              >
                <RotateCcw className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Accomplishments Section */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-center text-gray-900 mb-8 tracking-wide flex items-center justify-center gap-3">
              <span className="text-2xl">🏆</span>
              ACCOMPLISHMENTS
              <span className="text-2xl">🏆</span>
            </h2>

            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-green-500 rounded-full flex-shrink-0"></div>
                  <span className="text-lg text-gray-700">{achievement}</span>
                </div>
              ))}
            </div>

            {/* View Full Profile Button */}
            <div className="mt-8 text-center">
              <Link href={`/recruiting/athletes/${id}`}>
                <Button className="bg-[#1a1b5c] hover:bg-[#1a1b5c]/90 text-white px-8 py-3 text-lg rounded-xl">
                  View Full Profile <ExternalLink className="h-5 w-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Front of card - Main info
  return (
    <div className={cn("w-full max-w-2xl mx-auto", className)}>
      <div className="bg-gray-50 rounded-2xl p-8 shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-4xl font-bold text-gray-900">
              {firstName} {lastName}
            </h1>
            {instagramHandle && (
              <Button
                size="icon"
                variant="ghost"
                className="text-pink-500 hover:text-pink-600 hover:bg-pink-50"
                onClick={() => window.open(`https://instagram.com/${instagramHandle.replace("@", "")}`, "_blank")}
              >
                <Instagram className="h-6 w-6" />
              </Button>
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xl text-gray-600">Class of {graduationYear}</span>
            <Button
              size="icon"
              variant="outline"
              className="bg-blue-500 hover:bg-blue-600 text-white border-blue-500 rounded-full w-12 h-12"
              onClick={handleFlip}
            >
              <RotateCcw className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* College Commitment Section */}
        <div className="bg-white rounded-2xl p-8 mb-6 shadow-sm">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8 tracking-wide">COLLEGE COMMITMENT</h2>

          <div className="flex items-center gap-8">
            {/* College Logo */}
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0 shadow-md p-3">
              {!logoErrors.college && getLogoUrl("college") ? (
                <img
                  src={getLogoUrl("college") || "/placeholder.svg"}
                  alt={`${collegeName} logo`}
                  className="w-full h-full object-contain"
                  onError={() => handleLogoError("college")}
                />
              ) : (
                <div className="w-full h-full bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">{getInitials(collegeName)}</span>
                </div>
              )}
            </div>

            {/* College Info */}
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-900 mb-2">
                {collegeName.replace("University of North Carolina at Chapel Hill", "UNC Chapel Hill")}
              </h3>
              <p className="text-xl text-gray-600 mb-2">{division}</p>
              <p className="text-xl text-gray-700">
                <span className="font-semibold">Weight Class:</span> {weightClass} lbs
              </p>
            </div>
          </div>
        </div>

        {/* Athlete Info Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8 tracking-wide">ATHLETE INFO</h2>

          <div className={cn("grid gap-8", ncUnitedTeam ? "grid-cols-3" : "grid-cols-2")}>
            {/* High School */}
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md p-2">
                {!logoErrors.highSchool && getLogoUrl("highSchool") ? (
                  <img
                    src={getLogoUrl("highSchool") || "/placeholder.svg"}
                    alt={`${highSchool} logo`}
                    className="w-full h-full object-contain"
                    onError={() => handleLogoError("highSchool")}
                  />
                ) : (
                  <div className="w-full h-full bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{getInitials(highSchool)}</span>
                  </div>
                )}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-1">{highSchool.replace("High School", "").trim()}</h4>
              <p className="text-lg text-gray-600">High School</p>
            </div>

            {/* Club */}
            {club && (
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md p-2">
                  {!logoErrors.club && getLogoUrl("club") ? (
                    <img
                      src={getLogoUrl("club") || "/placeholder.svg"}
                      alt={`${club} logo`}
                      className="w-full h-full object-contain"
                      onError={() => handleLogoError("club")}
                    />
                  ) : (
                    <div className="w-full h-full bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{getInitials(club)}</span>
                    </div>
                  )}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">{club}</h4>
                <p className="text-lg text-gray-600">Club</p>
              </div>
            )}

            {/* NC United Team */}
            {ncUnitedTeam && (
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md p-2">
                  {!logoErrors.ncUnited && getLogoUrl("ncUnited") ? (
                    <img
                      src={getLogoUrl("ncUnited") || "/placeholder.svg"}
                      alt={`NC United ${ncUnitedTeam} logo`}
                      className="w-full h-full object-contain"
                      onError={() => handleLogoError("ncUnited")}
                    />
                  ) : (
                    <div
                      className={cn(
                        "w-full h-full rounded-full flex items-center justify-center",
                        ncUnitedTeam === "Blue" ? "bg-blue-600" : "bg-yellow-500",
                      )}
                    >
                      <span className="text-white font-bold text-lg">NC</span>
                    </div>
                  )}
                </div>
                <h4 className="text-xl font-bold text-gray-900 mb-1">NC United {ncUnitedTeam}</h4>
                <p className="text-lg text-gray-600">Team</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
