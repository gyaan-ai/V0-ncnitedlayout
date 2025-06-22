"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Instagram, Twitter } from "lucide-react"
import Image from "next/image"

export interface CommitCardProps {
  id: string
  athleteName: string
  collegeName: string
  highSchool?: string
  clubTeam?: string
  graduationYear: number
  weightClass: string
  achievements: string[]
  socialMedia?: {
    instagram?: string
    twitter?: string
  }
  commitDate: string
  imageUrl?: string
}

// Simple logo mapping - no API calls needed
const getLogoUrl = (institutionName: string, type: "college" | "high_school" | "club"): string => {
  const name = institutionName?.toLowerCase() || ""

  // College logos
  if (type === "college") {
    if (name.includes("north carolina") || name.includes("unc")) {
      return "/placeholder.svg?height=60&width=60"
    }
  }

  // High school logos
  if (type === "high_school") {
    if (name.includes("cardinal gibbons")) {
      return "/placeholder.svg?height=40&width=40"
    }
  }

  // Club logos
  if (type === "club") {
    if (name.includes("raw")) {
      return "/placeholder.svg?height=40&width=40"
    }
  }

  // Default placeholder
  return `/placeholder.svg?height=40&width=40&query=${institutionName}+logo`
}

export function CommitCard({
  athleteName,
  collegeName,
  highSchool,
  clubTeam,
  graduationYear,
  weightClass,
  achievements,
  socialMedia,
  commitDate,
  imageUrl,
}: CommitCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="relative w-full max-w-sm mx-auto h-96 perspective-1000">
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of card */}
        <Card className="absolute inset-0 w-full h-full backface-hidden bg-gradient-to-br from-blue-600 to-blue-800 text-white">
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-2">{athleteName}</h2>
              <div className="text-lg mb-4">commits to</div>
              <h3 className="text-xl font-semibold mb-4">{collegeName}</h3>

              {imageUrl && (
                <div className="relative w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden">
                  <Image
                    src={imageUrl || "/placeholder.svg"}
                    alt={`${athleteName} commitment`}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>

            <div className="text-center">
              <Badge variant="secondary" className="mb-2">
                Class of {graduationYear}
              </Badge>
              <div className="text-sm opacity-90">
                {weightClass} • {new Date(commitDate).toLocaleDateString()}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Back of card */}
        <Card className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-white">
          <CardContent className="p-6 h-full">
            <div className="h-full flex flex-col">
              {/* Header with college logo */}
              <div className="flex items-center gap-3 mb-4 pb-4 border-b">
                <Image
                  src={getLogoUrl(collegeName, "college") || "/placeholder.svg"}
                  alt={`${collegeName} logo`}
                  width={60}
                  height={60}
                  className="rounded-lg"
                />
                <div>
                  <h3 className="font-bold text-lg text-blue-600">{athleteName}</h3>
                  <p className="text-sm text-gray-600">{collegeName}</p>
                </div>
              </div>

              {/* Achievements */}
              <div className="flex-1 mb-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Trophy className="w-4 h-4" />
                  Key Achievements
                </h4>
                <ul className="text-sm space-y-1">
                  {achievements.slice(0, 3).map((achievement, index) => (
                    <li key={index} className="text-gray-700">
                      • {achievement}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom section with school/club info */}
              <div className="space-y-3">
                {highSchool && (
                  <div className="flex items-center gap-2">
                    <Image
                      src={getLogoUrl(highSchool, "high_school") || "/placeholder.svg"}
                      alt={`${highSchool} logo`}
                      width={32}
                      height={32}
                      className="rounded"
                    />
                    <div>
                      <div className="text-xs text-gray-500">High School</div>
                      <div className="text-sm font-medium">{highSchool}</div>
                    </div>
                  </div>
                )}

                {clubTeam && (
                  <div className="flex items-center gap-2">
                    <Image
                      src={getLogoUrl(clubTeam, "club") || "/placeholder.svg"}
                      alt={`${clubTeam} logo`}
                      width={32}
                      height={32}
                      className="rounded"
                    />
                    <div>
                      <div className="text-xs text-gray-500">Club Team</div>
                      <div className="text-sm font-medium">{clubTeam}</div>
                    </div>
                  </div>
                )}

                {/* Social media */}
                {socialMedia && (
                  <div className="flex gap-2 pt-2">
                    {socialMedia.instagram && (
                      <a
                        href={socialMedia.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-pink-100 rounded-full hover:bg-pink-200 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Instagram className="w-4 h-4 text-pink-600" />
                      </a>
                    )}
                    {socialMedia.twitter && (
                      <a
                        href={socialMedia.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-100 rounded-full hover:bg-blue-200 transition-colors"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Twitter className="w-4 h-4 text-blue-600" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
