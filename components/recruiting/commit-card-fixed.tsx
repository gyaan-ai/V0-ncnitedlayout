"use client"

import type React from "react"
import { useState } from "react"
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

export function CommitCardFixed({
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
  graduationYear,
  weightClass,
  division,
  instagramHandle,
  achievements,
  className,
}: CommitCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [logoErrors, setLogoErrors] = useState({
    college: false,
    highSchool: false,
    club: false,
  })

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

  // Enhanced logo path function with fallbacks
  const getLogoPath = (type: "college" | "highSchool" | "club") => {
    // First try provided logos
    switch (type) {
      case "college":
        if (collegeLogo) return collegeLogo
        break
      case "highSchool":
        if (highSchoolLogo) return highSchoolLogo
        break
      case "club":
        if (clubLogo) return clubLogo
        break
    }

    // For Liam Hickey specifically, try the expected paths
    if (id === 1) {
      switch (type) {
        case "college":
          return "/images/logos/colleges/unc-chapel-hill.png"
        case "highSchool":
          return "/images/logos/high-schools/cardinal-gibbons.png"
        case "club":
          return "/images/logos/clubs/raw-wrestling.png"
      }
    }

    return null
  }

  const handleLogoError = (type: "college" | "highSchool" | "club") => {
    console.log(`${type} logo failed to load for ${athleteName}`)
    setLogoErrors((prev) => ({ ...prev, [type]: true }))
  }

  const handleLogoLoad = (type: "college" | "highSchool" | "club") => {
    console.log(`${type} logo loaded successfully for ${athleteName}`)
  }

  // Render logo with fallback to initials
  const renderLogo = (type: "college" | "highSchool" | "club", size: "small" | "large" = "small") => {
    const logoPath = getLogoPath(type)
    const isError = logoErrors[type]
    const sizeClasses = size === "large" ? "w-20 h-20" : "w-16 h-16"
    const textSize = size === "large" ? "text-xl" : "text-sm"

    const institutionName = type === "college" ? collegeName : type === "highSchool" ? highSchool : club || ""
    const colorClass = type === "college" ? "bg-blue-600" : type === "highSchool" ? "bg-red-500" : "bg-green-600"

    if (!logoPath || isError) {
      return (
        <div className={`${sizeClasses} ${colorClass} rounded-full flex items-center justify-center`}>
          <span className={`text-white font-bold ${textSize}`}>{getInitials(institutionName)}</span>
        </div>
      )
    }

    return (
      <div className={`${sizeClasses} bg-white rounded-full flex items-center justify-center shadow-md border p-2`}>
        <img
          src={logoPath || "/placeholder.svg"}
          alt={`${institutionName} logo`}
          className="w-full h-full object-contain"
          onError={() => handleLogoError(type)}
          onLoad={() => handleLogoLoad(type)}
        />
      </div>
    )
  }

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
                  <div className="flex-shrink-0 border-4 border-blue-200">{renderLogo("college", "large")}</div>
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
                    <div className="mb-2 border-2 border-red-200">{renderLogo("highSchool")}</div>
                    <p className="font-medium text-sm text-center leading-tight">{highSchool}</p>
                    <p className="text-xs text-gray-500 text-center">High School</p>
                  </div>

                  {club && (
                    <div className="flex flex-col items-center">
                      <div className="mb-2 border-2 border-green-200">{renderLogo("club")}</div>
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
