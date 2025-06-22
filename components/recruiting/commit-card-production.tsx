"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Instagram, Share2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import "./commit-card-flip.css"

export interface CommitCardProps {
  id: number
  athleteName: string
  firstName: string
  lastName: string
  commitPhotoUrl: string
  collegeName: string
  collegeLogo?: string
  collegeColors?: {
    primary: string
    secondary: string
  }
  highSchool: string
  highSchoolLogo?: string
  club?: string
  clubLogo?: string
  graduationYear: number
  weightClass: string
  division?: string
  instagramHandle?: string
  achievements: string[]
  commitmentDate?: string
  className?: string
}

interface LogoState {
  college: { url: string | null; error: boolean; loading: boolean }
  highSchool: { url: string | null; error: boolean; loading: boolean }
  club: { url: string | null; error: boolean; loading: boolean }
}

export function CommitCard({
  id,
  athleteName,
  firstName,
  lastName,
  commitPhotoUrl,
  collegeName,
  collegeColors,
  highSchool,
  club,
  graduationYear,
  weightClass,
  division,
  instagramHandle,
  achievements,
  className,
}: CommitCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [logos, setLogos] = useState<LogoState>({
    college: { url: null, error: false, loading: true },
    highSchool: { url: null, error: false, loading: true },
    club: { url: null, error: false, loading: true },
  })

  useEffect(() => {
    const loadLogos = async () => {
      console.log(`Loading logos for ${athleteName}...`)

      // Load college logo
      try {
        const collegeResponse = await fetch(
          `/api/admin/logos/match?name=${encodeURIComponent(collegeName)}&type=college`,
        )
        const collegeData = await collegeResponse.json()

        setLogos((prev) => ({
          ...prev,
          college: {
            url: collegeData.logo?.file_url || null,
            error: !collegeData.logo,
            loading: false,
          },
        }))

        console.log(`College logo for ${collegeName}:`, collegeData.logo?.file_url || "Not found")
      } catch (error) {
        console.error(`Error loading college logo for ${collegeName}:`, error)
        setLogos((prev) => ({
          ...prev,
          college: { url: null, error: true, loading: false },
        }))
      }

      // Load high school logo
      try {
        const hsResponse = await fetch(`/api/admin/logos/match?name=${encodeURIComponent(highSchool)}&type=high_school`)
        const hsData = await hsResponse.json()

        setLogos((prev) => ({
          ...prev,
          highSchool: {
            url: hsData.logo?.file_url || null,
            error: !hsData.logo,
            loading: false,
          },
        }))

        console.log(`High school logo for ${highSchool}:`, hsData.logo?.file_url || "Not found")
      } catch (error) {
        console.error(`Error loading high school logo for ${highSchool}:`, error)
        setLogos((prev) => ({
          ...prev,
          highSchool: { url: null, error: true, loading: false },
        }))
      }

      // Load club logo
      if (club) {
        try {
          const clubResponse = await fetch(`/api/admin/logos/match?name=${encodeURIComponent(club)}&type=club`)
          const clubData = await clubResponse.json()

          setLogos((prev) => ({
            ...prev,
            club: {
              url: clubData.logo?.file_url || null,
              error: !clubData.logo,
              loading: false,
            },
          }))

          console.log(`Club logo for ${club}:`, clubData.logo?.file_url || "Not found")
        } catch (error) {
          console.error(`Error loading club logo for ${club}:`, error)
          setLogos((prev) => ({
            ...prev,
            club: { url: null, error: true, loading: false },
          }))
        }
      } else {
        setLogos((prev) => ({
          ...prev,
          club: { url: null, error: false, loading: false },
        }))
      }
    }

    loadLogos()
  }, [athleteName, collegeName, highSchool, club])

  // Handle share functionality
  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation()

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

  const handleCardClick = () => {
    setIsFlipped(!isFlipped)
  }

  // Get initials for institutions
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
  }

  // Get school-specific colors
  const getSchoolColors = (schoolName: string) => {
    const name = schoolName.toLowerCase()
    if (name.includes("north carolina") || name.includes("unc")) {
      return { bg: "bg-blue-600", border: "border-blue-200" }
    }
    if (name.includes("duke")) {
      return { bg: "bg-blue-800", border: "border-blue-300" }
    }
    if (name.includes("state") || name.includes("nc state")) {
      return { bg: "bg-red-600", border: "border-red-200" }
    }
    return { bg: "bg-blue-600", border: "border-blue-200" }
  }

  const schoolColors = collegeColors || getSchoolColors(collegeName)

  return (
    <div className={cn("w-full h-[500px]", className)}>
      <div className={cn("commit-card-container cursor-pointer", isFlipped ? "flipped" : "")} onClick={handleCardClick}>
        <div className="commit-card-inner">
          {/* Front of Card - Commit Announcement */}
          <div className="commit-card-front shadow-lg">
            <div className="relative w-full h-full">
              {/* Background Image */}
              <div className="absolute inset-0">
                {!imageError ? (
                  <img
                    src={
                      commitPhotoUrl || "/placeholder.svg?height=500&width=400&query=wrestler commitment announcement"
                    }
                    alt={`${athleteName} commitment announcement`}
                    className="w-full h-full object-cover"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#1a1b5c] to-[#bc0c03] flex items-center justify-center">
                    <div className="text-white text-center">
                      <h2 className="text-3xl font-bold mb-2">
                        {firstName} {lastName}
                      </h2>
                      <div className="text-6xl font-extrabold tracking-wider mb-2">SIGNED</div>
                      <p className="text-lg">{collegeName}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Light overlay for better text readability */}
              <div className="absolute inset-0 bg-black/10" />

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col p-4 text-white">
                {/* Top Section - NC United Logo */}
                <div className="flex justify-end">
                  <div className="w-12 h-12 bg-white/90 rounded-full p-1 shadow-md flex items-center justify-center">
                    <span className="text-[#1a1b5c] font-bold text-xs">NCU</span>
                  </div>
                </div>

                {/* Bottom Section - Social and Share */}
                <div className="mt-auto flex justify-between items-center">
                  {instagramHandle ? (
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-white/20 hover:bg-white/30 border-white/40 text-white"
                      onClick={(e) => {
                        e.stopPropagation()
                        window.open(`https://instagram.com/${instagramHandle.replace("@", "")}`, "_blank")
                      }}
                    >
                      <Instagram className="h-4 w-4 mr-2" />
                      {instagramHandle}
                    </Button>
                  ) : (
                    <div></div>
                  )}

                  <Button
                    size="icon"
                    variant="outline"
                    className="bg-white/20 hover:bg-white/30 border-white/40 text-white"
                    onClick={handleShare}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Back of Card - Details */}
          <div className="commit-card-back bg-white shadow-lg">
            <div className="p-4 h-full flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    {firstName} {lastName}
                  </h3>
                  <p className="text-sm text-gray-500">Class of {graduationYear}</p>
                </div>

                {instagramHandle && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(`https://instagram.com/${instagramHandle.replace("@", "")}`, "_blank")
                    }}
                  >
                    <Instagram className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* College Commitment */}
              <div className="bg-gray-50 rounded-lg p-4 mb-3">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-lg border-4 border-blue-200 p-2">
                    {logos.college.loading ? (
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    ) : logos.college.url && !logos.college.error ? (
                      <img
                        src={logos.college.url || "/placeholder.svg"}
                        alt={`${collegeName} logo`}
                        className="w-full h-full object-contain"
                        onError={() =>
                          setLogos((prev) => ({
                            ...prev,
                            college: { ...prev.college, error: true },
                          }))
                        }
                        onLoad={() => console.log(`✅ College logo loaded: ${logos.college.url}`)}
                      />
                    ) : (
                      <div
                        className={cn("w-full h-full rounded-full flex items-center justify-center", schoolColors.bg)}
                      >
                        <span className="text-white font-bold text-xl">{getInitials(collegeName)}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-bold text-lg text-gray-900">{collegeName}</p>
                    <div className="flex gap-3 text-sm text-gray-600 mt-1">
                      {division && <span className="font-medium">{division}</span>}
                      <span className="font-medium">Weight Class: {weightClass} lbs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Athlete Info */}
              <div className="bg-gray-50 rounded-lg p-4 mb-3">
                <h4 className="text-sm font-semibold uppercase text-gray-500 mb-3">Athlete Info</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 shadow-md border-2 border-red-200 p-1">
                      {logos.highSchool.loading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-red-600"></div>
                      ) : logos.highSchool.url && !logos.highSchool.error ? (
                        <img
                          src={logos.highSchool.url || "/placeholder.svg"}
                          alt={`${highSchool} logo`}
                          className="w-full h-full object-contain"
                          onError={() =>
                            setLogos((prev) => ({
                              ...prev,
                              highSchool: { ...prev.highSchool, error: true },
                            }))
                          }
                          onLoad={() => console.log(`✅ High school logo loaded: ${logos.highSchool.url}`)}
                        />
                      ) : (
                        <div className="w-full h-full bg-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{getInitials(highSchool)}</span>
                        </div>
                      )}
                    </div>
                    <p className="font-medium text-sm text-center leading-tight">{highSchool}</p>
                    <p className="text-xs text-gray-500 text-center">High School</p>
                  </div>

                  {club && (
                    <div className="flex flex-col items-center">
                      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-2 shadow-md border-2 border-green-200 p-1">
                        {logos.club.loading ? (
                          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                        ) : logos.club.url && !logos.club.error ? (
                          <img
                            src={logos.club.url || "/placeholder.svg"}
                            alt={`${club} logo`}
                            className="w-full h-full object-contain"
                            onError={() =>
                              setLogos((prev) => ({
                                ...prev,
                                club: { ...prev.club, error: true },
                              }))
                            }
                            onLoad={() => console.log(`✅ Club logo loaded: ${logos.club.url}`)}
                          />
                        ) : (
                          <div className="w-full h-full bg-green-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-sm">{getInitials(club)}</span>
                          </div>
                        )}
                      </div>
                      <p className="font-medium text-sm text-center leading-tight">{club}</p>
                      <p className="text-xs text-gray-500 text-center">Club</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Accomplishments */}
              <div className="bg-gray-50 rounded-lg p-4 flex-1 overflow-auto">
                <h4 className="text-sm font-semibold uppercase text-gray-500 mb-3 flex items-center gap-1">
                  <span className="text-yellow-500">🏆</span> Accomplishments{" "}
                  <span className="text-yellow-500">🏆</span>
                </h4>
                <ul className="space-y-2">
                  {achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-green-500 mt-1 font-bold">•</span>
                      <span className="text-sm leading-relaxed">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* View Full Profile Button */}
              <Link href={`/recruiting/athletes/${id}`} onClick={(e) => e.stopPropagation()} className="mt-3 block">
                <Button className="w-full bg-[#1a1b5c] hover:bg-[#1a1b5c]/90" size="sm">
                  View Full Profile <ExternalLink className="h-3 w-3 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
