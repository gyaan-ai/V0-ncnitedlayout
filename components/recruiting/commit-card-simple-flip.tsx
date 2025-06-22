"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Instagram, Share2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import "./commit-card-flip.css"

export interface CommitCardSimpleProps {
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
  className?: string
}

export function CommitCardSimpleFlip({
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
  className,
}: CommitCardSimpleProps) {
  const [isFlipped, setIsFlipped] = useState(false)
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
    <div className={cn("w-72 h-96 mx-auto", className)}>
      <div
        className={cn("commit-card-container cursor-pointer w-full h-full", isFlipped ? "flipped" : "")}
        onClick={handleCardClick}
      >
        <div className="commit-card-inner">
          {/* Front of Card - Commit Photo (Full Image) */}
          <div className="commit-card-front shadow-lg rounded-xl overflow-hidden">
            <div className="relative w-full h-full">
              {/* Full Commit Photo */}
              {!imageError ? (
                <img
                  src={commitPhotoUrl || "/placeholder.svg?height=400&width=300&query=wrestler commitment announcement"}
                  alt={`${athleteName} commitment announcement`}
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#1a1b5c] to-[#bc0c03] flex items-center justify-center">
                  <div className="text-white text-center p-4">
                    <h2 className="text-2xl font-bold mb-2">
                      {firstName} {lastName}
                    </h2>
                    <div className="text-4xl font-extrabold tracking-wider mb-2">SIGNED</div>
                    <p className="text-lg">{collegeName}</p>
                  </div>
                </div>
              )}

              {/* Minimal Overlay - Just Share Button */}
              <div className="absolute top-3 right-3">
                <Button
                  size="icon"
                  variant="outline"
                  className="bg-white/20 hover:bg-white/30 border-white/40 text-white backdrop-blur-sm"
                  onClick={handleShare}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>

              {/* Tap to Flip Indicator */}
              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2">
                <div className="bg-black/50 text-white px-3 py-1 rounded-full text-xs backdrop-blur-sm">
                  Tap to flip
                </div>
              </div>
            </div>
          </div>

          {/* Back of Card - Simple Info + Full Profile */}
          <div className="commit-card-back bg-white shadow-lg rounded-xl">
            <div className="p-6 h-full flex flex-col justify-center items-center text-center">
              {/* Athlete Name */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {firstName} {lastName}
              </h3>
              <p className="text-sm text-gray-500 mb-6">Class of {graduationYear}</p>

              {/* College with Logo */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6 w-full">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className="flex-shrink-0">{renderLogo("college", "large")}</div>
                </div>
                <p className="font-bold text-lg text-gray-900 text-center">{collegeName}</p>
                <div className="flex justify-center gap-4 text-sm text-gray-600 mt-2">
                  {division && <span className="font-medium">{division}</span>}
                  <span className="font-medium">Weight: {weightClass} lbs</span>
                </div>
              </div>

              {/* School Info */}
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{highSchool}</span>
                  {club && (
                    <>
                      {" • "}
                      <span className="font-medium">{club}</span>
                    </>
                  )}
                  {ncUnitedTeam && (
                    <>
                      {" • "}
                      <span className="font-medium">NC United {ncUnitedTeam}</span>
                    </>
                  )}
                </p>
              </div>

              {/* Instagram */}
              {instagramHandle && (
                <Button
                  size="sm"
                  variant="outline"
                  className="mb-4"
                  onClick={(e) => {
                    e.stopPropagation()
                    window.open(`https://instagram.com/${instagramHandle.replace("@", "")}`, "_blank")
                  }}
                >
                  <Instagram className="h-4 w-4 mr-2" />
                  {instagramHandle}
                </Button>
              )}

              {/* View Full Profile Button */}
              <Link href={`/recruiting/athletes/${id}`} onClick={(e) => e.stopPropagation()} className="w-full">
                <Button className="w-full bg-[#1a1b5c] hover:bg-[#1a1b5c]/90 text-white h-12 text-lg font-semibold">
                  View Full Profile <ExternalLink className="h-5 w-5 ml-2" />
                </Button>
              </Link>

              {/* Tap to Flip Back */}
              <p className="text-xs text-gray-400 mt-4">Tap anywhere to flip back</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
