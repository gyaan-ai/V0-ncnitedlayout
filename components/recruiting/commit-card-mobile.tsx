"use client"

import type React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Instagram, Share2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import "./commit-card-flip.css"

export interface CommitCardMobileProps {
  id: string | number
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
  ncUnitedTeam?: string
  ncUnitedLogo?: string
  graduationYear: number
  weightClass: string
  division?: string
  instagramHandle?: string
  achievements: string[]
  aiSummary?: string
  commitmentDate?: string
  className?: string
}

export function CommitCardMobile({
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
  ncUnitedLogo,
  graduationYear,
  weightClass,
  division,
  instagramHandle,
  achievements,
  aiSummary,
  className,
}: CommitCardMobileProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [logoErrors, setLogoErrors] = useState({
    college: false,
    highSchool: false,
    club: false,
    ncUnited: false,
  })

  // Add logo loading state and effect
  const [logos, setLogos] = useState({
    college: collegeLogo || "",
    highSchool: highSchoolLogo || "",
    club: clubLogo || "",
    ncUnited: ncUnitedLogo || "",
  })

  // Load logos from API
  useEffect(() => {
    const loadLogos = async () => {
      try {
        // Load college logo
        if (collegeName && !collegeLogo) {
          const response = await fetch(`/api/admin/logos/match?name=${encodeURIComponent(collegeName)}&type=college`)
          const data = await response.json()
          if (data.success && data.logo?.file_url) {
            setLogos((prev) => ({ ...prev, college: data.logo.file_url }))
          }
        }

        // Load high school logo
        if (highSchool && !highSchoolLogo) {
          const response = await fetch(`/api/admin/logos/match?name=${encodeURIComponent(highSchool)}&type=high_school`)
          const data = await response.json()
          if (data.success && data.logo?.file_url) {
            setLogos((prev) => ({ ...prev, highSchool: data.logo.file_url }))
          }
        }

        // Load club logo
        if (club && !clubLogo) {
          const response = await fetch(`/api/admin/logos/match?name=${encodeURIComponent(club)}&type=club`)
          const data = await response.json()
          if (data.success && data.logo?.file_url) {
            setLogos((prev) => ({ ...prev, club: data.logo.file_url }))
          }
        }

        // Load NC United logo
        if (ncUnitedTeam && !ncUnitedLogo) {
          const response = await fetch(
            `/api/admin/logos/match?name=${encodeURIComponent(`nc-united-${ncUnitedTeam.toLowerCase()}`)}&type=team`,
          )
          const data = await response.json()
          if (data.success && data.logo?.file_url) {
            setLogos((prev) => ({ ...prev, ncUnited: data.logo.file_url }))
          }
        }
      } catch (error) {
        console.error("Error loading logos:", error)
      }
    }

    loadLogos()
  }, [collegeName, highSchool, club, ncUnitedTeam, collegeLogo, highSchoolLogo, clubLogo, ncUnitedLogo])

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

  const handleLogoError = (type: "college" | "highSchool" | "club" | "ncUnited") => {
    setLogoErrors((prev) => ({ ...prev, [type]: true }))
  }

  const handleLogoLoad = (type: "college" | "highSchool" | "club" | "ncUnited") => {
    console.log(`${type} logo loaded successfully`)
  }

  // Render logo with fallback to initials
  const renderLogo = (type: "college" | "highSchool" | "club" | "ncUnited", size: "small" | "large" = "small") => {
    const logoUrl =
      type === "college"
        ? logos.college
        : type === "highSchool"
          ? logos.highSchool
          : type === "club"
            ? logos.club
            : logos.ncUnited

    const isError = logoErrors[type]
    const sizeClasses = size === "large" ? "w-16 h-16" : "w-12 h-12"
    const textSize = size === "large" ? "text-sm" : "text-xs"

    const institutionName =
      type === "college"
        ? collegeName
        : type === "highSchool"
          ? highSchool
          : type === "club"
            ? club || ""
            : `NC United ${ncUnitedTeam || ""}`

    const colorClass =
      type === "college"
        ? "bg-blue-600"
        : type === "highSchool"
          ? "bg-red-500"
          : type === "club"
            ? "bg-green-600"
            : ncUnitedTeam === "Blue"
              ? "bg-blue-600"
              : "bg-yellow-500"

    if (type === "ncUnited") {
      if (!logoUrl || isError) {
        return (
          <div className={`${sizeClasses} ${colorClass} rounded-full flex items-center justify-center`}>
            <span className={`text-white font-bold ${textSize}`}>{getInitials(institutionName)}</span>
          </div>
        )
      }
      // For NC United, show logo directly without white circle background
      return (
        <img
          src={logoUrl || "/placeholder.svg"}
          alt={`${institutionName} logo`}
          className={`${sizeClasses} object-contain drop-shadow-lg`}
          onError={() => handleLogoError(type)}
          onLoad={() => handleLogoLoad(type)}
        />
      )
    }

    if (!logoUrl || isError) {
      return (
        <div className={`${sizeClasses} ${colorClass} rounded-full flex items-center justify-center`}>
          <span className={`text-white font-bold ${textSize}`}>{getInitials(institutionName)}</span>
        </div>
      )
    }

    return (
      <div className={`${sizeClasses} bg-white rounded-full flex items-center justify-center shadow-md p-1.5`}>
        <img
          src={logoUrl || "/placeholder.svg"}
          alt={`${institutionName} logo`}
          className="w-full h-full object-contain"
          onError={() => handleLogoError(type)}
          onLoad={() => handleLogoLoad(type)}
        />
      </div>
    )
  }

  return (
    <div className={cn("w-72 h-[480px] mx-auto", className)}>
      <div
        className={cn("commit-card-container cursor-pointer w-full h-full", isFlipped ? "flipped" : "")}
        onClick={handleCardClick}
      >
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
                      <div className="text-5xl font-extrabold tracking-wider mb-2">SIGNED</div>
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
                  <div className="w-14 h-14 drop-shadow-lg">{renderLogo("ncUnited")}</div>
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
            <div className="p-3 h-full flex flex-col">
              {/* Header */}
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {firstName} {lastName}
                  </h3>
                  <p className="text-xs text-gray-500">Class of {graduationYear}</p>
                </div>

                {instagramHandle && (
                  <Button
                    size="icon"
                    variant="ghost"
                    className="w-7 h-7"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(`https://instagram.com/${instagramHandle.replace("@", "")}`, "_blank")
                    }}
                  >
                    <Instagram className="h-3 w-3" />
                  </Button>
                )}
              </div>

              {/* College Commitment */}
              <div className="bg-gray-50 rounded-lg p-2.5 mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex-shrink-0">{renderLogo("college", "large")}</div>
                  <div>
                    <p className="font-bold text-sm text-gray-900">{collegeName}</p>
                    <div className="flex gap-2 text-xs text-gray-600">
                      {division && <span className="font-medium">{division}</span>}
                      <span className="font-medium">Weight: {weightClass} lbs</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Basic Info */}
              {/* Institution Info */}
              <div className="space-y-2 mb-4">
                {/* High School */}
                <div className="bg-gray-50 rounded-lg p-2">
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0">{renderLogo("highSchool")}</div>
                    <div>
                      <p className="font-medium text-sm text-gray-900">{highSchool}</p>
                      <p className="text-xs text-gray-500">High School</p>
                    </div>
                  </div>
                </div>

                {/* Wrestling Club */}
                {club && (
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0">{renderLogo("club")}</div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{club}</p>
                        <p className="text-xs text-gray-500">Wrestling Club</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* NC United Team */}
                {ncUnitedTeam && (
                  <div className="bg-gray-50 rounded-lg p-2">
                    <div className="flex items-center gap-2">
                      <div className="flex-shrink-0">{renderLogo("ncUnited")}</div>
                      <div>
                        <p className="font-medium text-sm text-gray-900">NC United {ncUnitedTeam}</p>
                        <p className="text-xs text-gray-500">Team</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Athlete Info */}
              {/* AI Summary - Mobile Version */}
              <div className="bg-gray-50 rounded-lg p-2.5 mb-4 flex-1 overflow-auto">
                <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2 text-center">
                  <span className="text-yellow-500">🏆</span> Highlights <span className="text-yellow-500">🏆</span>
                </h4>
                {aiSummary ? (
                  <div className="space-y-2">
                    <p className="text-sm leading-relaxed text-gray-700 text-center">
                      {aiSummary
                        .split(/[.!?]+/)
                        .slice(0, 2)
                        .join(". ") + "."}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {achievements.slice(0, 3).map((achievement, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5 font-bold text-xs">•</span>
                        <span className="text-xs leading-relaxed">{achievement}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* View Full Profile Button - Takes up remaining space */}
              <div className="flex items-center justify-center">
                <Link
                  href={`/recruiting/athletes/${firstName.toLowerCase()}-${lastName.toLowerCase()}`}
                  onClick={(e) => e.stopPropagation()}
                  className="w-full"
                >
                  <Button className="w-full bg-[#1a1b5c] hover:bg-[#1a1b5c]/90 text-white h-14 text-lg font-semibold">
                    View Full Profile <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
