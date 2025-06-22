"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Instagram, Share2, ExternalLink, ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export interface CommitCardMobileProps {
  id: string | number
  athleteName: string
  firstName: string
  lastName: string
  commitPhotoUrl: string
  collegeName: string
  collegeLogo?: string
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

export function CommitCardMobileOptimized({
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
  const [isExpanded, setIsExpanded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [logoErrors, setLogoErrors] = useState({
    college: false,
    highSchool: false,
    club: false,
    ncUnited: false,
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
  const renderLogo = (type: "college" | "highSchool" | "club" | "ncUnited", size: "small" | "medium" = "small") => {
    const logoUrl =
      type === "college"
        ? collegeLogo
        : type === "highSchool"
          ? highSchoolLogo
          : type === "club"
            ? clubLogo
            : ncUnitedLogo

    const isError = logoErrors[type]
    const sizeClasses = size === "medium" ? "w-12 h-12" : "w-8 h-8"
    const textSize = size === "medium" ? "text-xs" : "text-[10px]"

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
      <div className={`${sizeClasses} bg-white rounded-full flex items-center justify-center shadow-md p-1`}>
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
      const sentences = aiSummary.split(/[.!?]+/).filter((s) => s.trim().length > 0)
      const content = sentences.slice(0, 3).join(". ") + (sentences.length > 0 ? "." : "")
      return content
    }

    // Fallback to basic achievements list
    return achievements.slice(0, 3).join(" • ")
  }

  return (
    <div className={cn("w-full max-w-sm mx-auto", className)}>
      {/* Mobile-Optimized Single Card */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Hero Image Section */}
        <div className="relative h-48 sm:h-56">
          {!imageError ? (
            <img
              src={commitPhotoUrl || "/placeholder.svg?height=300&width=400&query=wrestler commitment announcement"}
              alt={`${athleteName} commitment announcement`}
              className="w-full h-full object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#1a1b5c] to-[#bc0c03] flex items-center justify-center">
              <div className="text-white text-center">
                <h2 className="text-xl font-bold mb-1">
                  {firstName} {lastName}
                </h2>
                <div className="text-3xl font-extrabold tracking-wider mb-1">SIGNED</div>
                <p className="text-sm">{collegeName}</p>
              </div>
            </div>
          )}

          {/* Overlay Content */}
          <div className="absolute inset-0 bg-black/20" />

          {/* Top Right - NC United Logo */}
          <div className="absolute top-3 right-3">
            <div className="w-10 h-10 drop-shadow-lg">{renderLogo("ncUnited", "medium")}</div>
          </div>

          {/* Bottom - Social Actions */}
          <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
            {instagramHandle ? (
              <Button
                size="sm"
                variant="outline"
                className="bg-white/20 hover:bg-white/30 border-white/40 text-white text-xs h-8"
                onClick={(e) => {
                  e.stopPropagation()
                  window.open(`https://instagram.com/${instagramHandle.replace("@", "")}`, "_blank")
                }}
              >
                <Instagram className="h-3 w-3 mr-1" />
                {instagramHandle}
              </Button>
            ) : (
              <div></div>
            )}

            <Button
              size="icon"
              variant="outline"
              className="bg-white/20 hover:bg-white/30 border-white/40 text-white w-8 h-8"
              onClick={handleShare}
            >
              <Share2 className="h-3 w-3" />
            </Button>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4">
          {/* Header */}
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                {firstName} {lastName}
              </h3>
              <p className="text-sm text-gray-500">Class of {graduationYear}</p>
            </div>
          </div>

          {/* College Commitment - Always Visible */}
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">{renderLogo("college", "medium")}</div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-sm text-gray-900 truncate">{collegeName}</p>
                <div className="flex gap-2 text-xs text-gray-600">
                  {division && <span className="font-medium">{division}</span>}
                  <span className="font-medium">Weight: {weightClass} lbs</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Profile Summary - Always Visible */}
          <div className="bg-blue-50 rounded-lg p-3 mb-3">
            <h4 className="text-sm font-semibold text-blue-800 mb-2">Profile Summary</h4>
            <p className="text-sm text-gray-700 leading-relaxed">{getProfileContent()}</p>
          </div>

          {/* Expandable Details */}
          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full flex items-center justify-between"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <span className="text-sm font-medium">{isExpanded ? "Hide Details" : "Show More Details"}</span>
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>

            {isExpanded && (
              <div className="space-y-3 animate-in slide-in-from-top-2 duration-200">
                {/* Athlete Info */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2">Athlete Info</h4>
                  <div className={cn("grid gap-3", ncUnitedTeam ? "grid-cols-3" : "grid-cols-2")}>
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

                {/* Full Achievements */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <h4 className="text-xs font-semibold uppercase text-gray-500 mb-2 flex items-center justify-center gap-1">
                    <span className="text-yellow-500">🏆</span>
                    Key Achievements
                    <span className="text-yellow-500">🏆</span>
                  </h4>
                  <ul className="space-y-1">
                    {achievements.slice(0, 5).map((achievement, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="text-green-500 mt-0.5 font-bold text-xs">•</span>
                        <span className="text-xs leading-relaxed">{achievement}</span>
                      </li>
                    ))}
                    {achievements.length > 5 && (
                      <li className="text-xs text-gray-500 italic text-center mt-2">
                        + {achievements.length - 5} more achievements
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* View Full Profile Button - Always Visible and Prominent */}
          <Link href={`/recruiting/athletes/${id}`} className="mt-4 block">
            <Button className="w-full bg-[#1a1b5c] hover:bg-[#1a1b5c]/90 text-white h-12 text-base font-semibold">
              View Full Profile <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
