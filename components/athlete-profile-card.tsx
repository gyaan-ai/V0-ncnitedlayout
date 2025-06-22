"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  GraduationCap,
  Trophy,
  MapPin,
  Calendar,
  Weight,
  School,
  Play,
  X,
  Instagram,
  Twitter,
  Mail,
  Phone,
} from "lucide-react"
import { getYouTubeEmbedUrl, getYouTubeThumbnail } from "@/lib/youtube-utils"

interface AthleteProfileCardProps {
  athlete: {
    id: string
    first_name: string
    last_name: string
    profile_image_url?: string
    commitment_image_url?: string
    high_school: string
    wrestling_club?: string
    nc_united_team: string
    weight_class: string
    graduation_year: number
    grade?: string
    hometown?: string
    college_committed?: string
    college_division?: string
    is_committed: boolean
    is_featured: boolean
    achievements?: string[]
    wrestling_record?: {
      wins?: number
      losses?: number
      pins?: number
      tech_falls?: number
    }
    youtube_highlight_url?: string
    instagram_handle?: string
    twitter_handle?: string
    email?: string
    phone?: string
    recruiting_summary?: string
    gpa?: number
    sat_score?: number
    act_score?: number
    intended_major?: string
  }
  variant?: "compact" | "full" | "recruiting"
}

export function AthleteProfileCard({ athlete, variant = "compact" }: AthleteProfileCardProps) {
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  const embedUrl = getYouTubeEmbedUrl(athlete.youtube_highlight_url || "")
  const thumbnailUrl = getYouTubeThumbnail(athlete.youtube_highlight_url || "")

  const calculateRecord = () => {
    const wins = athlete.wrestling_record?.wins || 0
    const losses = athlete.wrestling_record?.losses || 0
    return wins + losses > 0 ? `${wins}-${losses}` : null
  }

  if (variant === "compact") {
    return (
      <>
        <Card
          className="hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => setIsDetailOpen(true)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-4">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={athlete.profile_image_url || "/placeholder.svg?height=80&width=80"}
                  alt={`${athlete.first_name} ${athlete.last_name}`}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                {athlete.youtube_highlight_url && (
                  <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                    <Play className="h-6 w-6 text-white" />
                  </div>
                )}
              </div>

              {/* Basic Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-bold text-lg truncate">
                    {athlete.first_name} {athlete.last_name}
                  </h3>
                  {athlete.is_committed && <Badge className="bg-green-100 text-green-800 text-xs">Committed</Badge>}
                  {athlete.is_featured && <Badge className="bg-yellow-100 text-yellow-800 text-xs">Featured</Badge>}
                </div>

                <div className="space-y-1 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <School className="h-3 w-3" />
                    <span className="truncate">{athlete.high_school}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Weight className="h-3 w-3" />
                      <span>{athlete.weight_class}lbs</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="h-3 w-3" />
                      <span>'{athlete.graduation_year.toString().slice(-2)}</span>
                    </div>
                    {calculateRecord() && (
                      <div className="flex items-center gap-1">
                        <Trophy className="h-3 w-3" />
                        <span>{calculateRecord()}</span>
                      </div>
                    )}
                  </div>
                  {athlete.college_committed && (
                    <div className="text-green-700 font-medium text-xs">→ {athlete.college_committed}</div>
                  )}
                </div>
              </div>

              {/* Team Badge */}
              <Badge
                variant="outline"
                className={`${
                  athlete.nc_united_team === "Blue"
                    ? "border-blue-500 text-blue-700"
                    : athlete.nc_united_team === "Gold"
                      ? "border-yellow-500 text-yellow-700"
                      : "border-gray-500 text-gray-700"
                }`}
              >
                NC United {athlete.nc_united_team}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Detailed View Dialog */}
        <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center justify-between">
                <span>
                  {athlete.first_name} {athlete.last_name} - Profile
                </span>
                <Button variant="ghost" size="sm" onClick={() => setIsDetailOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </DialogTitle>
            </DialogHeader>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="highlights">Highlights</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="contact">Contact</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Profile Image */}
                  <div className="space-y-4">
                    <img
                      src={athlete.profile_image_url || "/placeholder.svg?height=300&width=300"}
                      alt={`${athlete.first_name} ${athlete.last_name}`}
                      className="w-full rounded-lg shadow-md"
                    />
                    {athlete.is_committed && athlete.commitment_image_url && (
                      <img
                        src={athlete.commitment_image_url || "/placeholder.svg"}
                        alt="Commitment photo"
                        className="w-full rounded-lg shadow-md"
                      />
                    )}
                  </div>

                  {/* Details */}
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {athlete.is_committed && <Badge className="bg-green-100 text-green-800">Committed</Badge>}
                      {athlete.is_featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                      <Badge
                        variant="outline"
                        className={`${
                          athlete.nc_united_team === "Blue"
                            ? "border-blue-500 text-blue-700"
                            : athlete.nc_united_team === "Gold"
                              ? "border-yellow-500 text-yellow-700"
                              : "border-gray-500 text-gray-700"
                        }`}
                      >
                        NC United {athlete.nc_united_team}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <School className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">High School</span>
                        </div>
                        <p>{athlete.high_school}</p>
                      </div>

                      {athlete.wrestling_club && (
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Trophy className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Wrestling Club</span>
                          </div>
                          <p>{athlete.wrestling_club}</p>
                        </div>
                      )}

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Weight className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">Weight Class</span>
                        </div>
                        <p>{athlete.weight_class} lbs</p>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <GraduationCap className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">Graduation</span>
                        </div>
                        <p>Class of {athlete.graduation_year}</p>
                      </div>

                      {athlete.grade && (
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Calendar className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Current Grade</span>
                          </div>
                          <p>{athlete.grade}</p>
                        </div>
                      )}

                      {athlete.hometown && (
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">Hometown</span>
                          </div>
                          <p>{athlete.hometown}</p>
                        </div>
                      )}
                    </div>

                    {/* Wrestling Record */}
                    {athlete.wrestling_record && (
                      <div>
                        <h4 className="font-medium mb-2">Wrestling Record</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>Wins: {athlete.wrestling_record.wins || 0}</div>
                          <div>Losses: {athlete.wrestling_record.losses || 0}</div>
                          <div>Pins: {athlete.wrestling_record.pins || 0}</div>
                          <div>Tech Falls: {athlete.wrestling_record.tech_falls || 0}</div>
                        </div>
                      </div>
                    )}

                    {/* Academic Info */}
                    {(athlete.gpa || athlete.sat_score || athlete.act_score) && (
                      <div>
                        <h4 className="font-medium mb-2">Academic Information</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {athlete.gpa && <div>GPA: {athlete.gpa}</div>}
                          {athlete.sat_score && <div>SAT: {athlete.sat_score}</div>}
                          {athlete.act_score && <div>ACT: {athlete.act_score}</div>}
                          {athlete.intended_major && <div>Intended Major: {athlete.intended_major}</div>}
                        </div>
                      </div>
                    )}

                    {/* College Commitment */}
                    {athlete.is_committed && athlete.college_committed && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-medium text-green-800 mb-2">College Commitment</h4>
                        <p className="text-green-700 font-medium">{athlete.college_committed}</p>
                        {athlete.college_division && (
                          <p className="text-green-600 text-sm">{athlete.college_division}</p>
                        )}
                      </div>
                    )}

                    {/* Recruiting Summary */}
                    {athlete.recruiting_summary && (
                      <div>
                        <h4 className="font-medium mb-2">About</h4>
                        <p className="text-sm text-gray-600">{athlete.recruiting_summary}</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="highlights" className="space-y-6">
                {athlete.youtube_highlight_url ? (
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Wrestling Highlights</h3>
                    {showVideo ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <iframe
                          src={embedUrl || ""}
                          title="Wrestling Highlights"
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                    ) : (
                      <div
                        className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                        onClick={() => setShowVideo(true)}
                      >
                        <img
                          src={thumbnailUrl || "/placeholder.svg?height=360&width=640"}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/40 transition-colors">
                          <div className="bg-red-600 rounded-full p-4 group-hover:scale-110 transition-transform">
                            <Play className="h-8 w-8 text-white fill-white" />
                          </div>
                        </div>
                        <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded text-sm">
                          Click to play highlights
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Play className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p>No highlight video available</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                {athlete.achievements && athlete.achievements.length > 0 ? (
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Wrestling Achievements</h3>
                    <div className="space-y-2">
                      {athlete.achievements.map((achievement, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-yellow-600" />
                          <span>{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Trophy className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p>No achievements listed</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="contact" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Contact Information</h3>

                    {athlete.email && (
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a href={`mailto:${athlete.email}`} className="text-blue-600 hover:underline">
                          {athlete.email}
                        </a>
                      </div>
                    )}

                    {athlete.phone && (
                      <div className="flex items-center gap-3">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <a href={`tel:${athlete.phone}`} className="text-blue-600 hover:underline">
                          {athlete.phone}
                        </a>
                      </div>
                    )}
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Social Media</h3>

                    {athlete.instagram_handle && (
                      <div className="flex items-center gap-3">
                        <Instagram className="h-4 w-4 text-pink-600" />
                        <a
                          href={`https://instagram.com/${athlete.instagram_handle.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {athlete.instagram_handle}
                        </a>
                      </div>
                    )}

                    {athlete.twitter_handle && (
                      <div className="flex items-center gap-3">
                        <Twitter className="h-4 w-4 text-blue-500" />
                        <a
                          href={`https://twitter.com/${athlete.twitter_handle.replace("@", "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          {athlete.twitter_handle}
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </>
    )
  }

  // For full and recruiting variants, return similar enhanced cards
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        {/* Full implementation would go here */}
        <p>Full variant implementation</p>
      </CardContent>
    </Card>
  )
}
