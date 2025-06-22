"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Instagram, Share2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import "./commit-card-flip.css"

export interface CommitCardProps {
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

export function CommitCardSigned({
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
}: CommitCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [logoErrors, setLogoErrors] = useState({
    college: false,
    highSchool: false,
    club: false,
    ncUnited: false,
  })

  console.log("Weight class from props:", weightClass)
  console.log("AI Summary:", aiSummary)

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
    console.log(`${type} logo failed to load`)
    setLogoErrors((prev) => ({ ...prev, [type]: true }))
  }

  const handleLogoLoad = (type: "college" | "highSchool" | "club" | "ncUnited") => {
    console.log(`${type} logo loaded successfully`)
  }

  // Render logo with fallback to initials
  const renderLogo = (type: "college" | "highSchool" | "club" | "ncUnited", size: "small" | "large" = "small") => {
    const logoUrl =
      type === "college"
        ? collegeLogo
        : type === "highSchool"
          ? highSchoolLogo
          : type === "club"
            ? clubLogo
            : ncUnitedLogo

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

    console.log(`Rendering ${type} logo:`, { logoUrl, isError, institutionName })

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

  // Get profile content from AI-generated bio
  const getProfileContent = () => {
    if (aiSummary) {
      // Get more content from AI-generated bio
      const sentences = aiSummary.split(/[.!?]+/).filter((s) => s.trim().length > 0)
      const content = sentences.slice(0, 4).join(". ") + (sentences.length > 0 ? "." : "")

      return (
        <div className="space-y-2">
          <p className="text-sm leading-relaxed text-gray-700">{content}</p>
          <div className="text-center">
            <p className="text-xs text-gray-500 italic">Click "View Full Profile" for complete achievements</p>
          </div>
        </div>
      )
    }

    // Fallback to basic achievements list
    return (
      <ul className="space-y-1.5">
        {achievements.slice(0, 6).map((achievement, index) => (
          <li key={index} className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5 font-bold text-xs">•</span>
            <span className="text-sm leading-relaxed">{achievement}</span>
          </li>
        ))}
        {achievements.length > 6 && (
          <li className="text-xs text-gray-500 italic text-center mt-2">
            + {achievements.length - 6} more achievements
          </li>
        )}
      </ul>
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
              <div className="bg-gray-50 rounded-lg p-2.5 mb-2">
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

              {/* Athlete Info */}
              <div className="bg-gray-50 rounded-lg p-2.5 mb-2">
                <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">Athlete Info</h4>
                <div className={cn("grid gap-2", ncUnitedTeam ? "grid-cols-3" : "grid-cols-2")}>
                  <div className="flex flex-col items-center">
                    <div className="mb-1">{renderLogo("highSchool")}</div>
                    <p className="font-medium text-xs text-center leading-tight">{highSchool}</p>
                    <p className="text-[10px] text-gray-500 text-center">High School</p>
                  </div>

                  {club && (
                    <div className="flex flex-col items-center">
                      <div className="mb-1">{renderLogo("club")}</div>
                      <p className="font-medium text-xs text-center leading-tight">{club}</p>
                      <p className="text-[10px] text-gray-500 text-center">Club</p>
                    </div>
                  )}

                  {ncUnitedTeam && (
                    <div className="flex flex-col items-center">
                      <div className="mb-1">{renderLogo("ncUnited")}</div>
                      <p className="font-medium text-xs text-center leading-tight">NC United {ncUnitedTeam}</p>
                      <p className="text-[10px] text-gray-500 text-center">Team</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Profile Summary - Now takes up more space */}
              <div className="bg-gray-50 rounded-lg p-3 flex-1 overflow-auto">
                <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2 flex items-center justify-center gap-1">
                  <span className="text-yellow-500">🏆</span>
                  Profile Summary
                  <span className="text-yellow-500">🏆</span>
                </h4>
                {getProfileContent()}
              </div>

              {/* View Full Profile Button */}
              <Link href={`/recruiting/athletes/${id}`} onClick={(e) => e.stopPropagation()} className="mt-2 block">
                <Button className="w-full bg-[#1a1b5c] hover:bg-[#1a1b5c]/90 text-xs h-8">
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
