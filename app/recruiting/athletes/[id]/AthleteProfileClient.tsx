"use client"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  ArrowLeft,
  GraduationCap,
  MapPin,
  Calendar,
  Trophy,
  Target,
  Users,
  ExternalLink,
  Instagram,
  Twitter,
  Share2,
} from "lucide-react"
import { sampleAthletes } from "@/lib/recruiting-data"

export default function AthleteProfileClient({ params }: { params: { id: string } }) {
  const athleteId = Number.parseInt(params.id)
  const athlete = sampleAthletes.find((a) => a.id === athleteId)

  if (!athlete) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardContent className="p-12 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Athlete Not Found</h1>
            <p className="text-gray-600 mb-6">The athlete you're looking for doesn't exist.</p>
            <Link href="/recruiting/athletes">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Athletes
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Link href="/recruiting/athletes">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Athletes
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Profile */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={athlete.image_url || "/placeholder.svg?height=300&width=250"}
                  alt={athlete.name}
                  className="w-full md:w-64 h-80 object-cover rounded-lg"
                />

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{athlete.name}</h1>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="outline">Class of {athlete.graduation_year}</Badge>
                        <Badge variant="secondary">{athlete.weight_class} lbs</Badge>
                        <Badge variant="outline">{athlete.gender}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>

                  <div className="space-y-3 text-gray-600">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5" />
                      <span className="font-medium">{athlete.high_school}</span>
                    </div>

                    {athlete.wrestling_club && (
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5" />
                        <span>{athlete.wrestling_club}</span>
                      </div>
                    )}

                    {athlete.college_committed && (
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5" />
                        <span className="font-medium text-blue-600">{athlete.college_committed}</span>
                        <Badge variant="secondary">{athlete.college_division}</Badge>
                      </div>
                    )}

                    {athlete.commitment_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        <span>Committed {new Date(athlete.commitment_date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Social Links */}
                  {athlete.social_links && (
                    <div className="flex gap-2 mt-4">
                      {athlete.social_links.instagram && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={`https://instagram.com/${athlete.social_links.instagram.replace("@", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Instagram className="h-4 w-4 mr-2" />
                            Instagram
                          </a>
                        </Button>
                      )}
                      {athlete.social_links.twitter && (
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={`https://twitter.com/${athlete.social_links.twitter.replace("@", "")}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Twitter className="h-4 w-4 mr-2" />
                            Twitter
                          </a>
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Profile Description */}
          {athlete.recruiting_profile && (
            <Card>
              <CardHeader>
                <CardTitle>Recruiting Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{athlete.recruiting_profile}</p>
              </CardContent>
            </Card>
          )}

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Achievements
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {athlete.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
                    <Target className="h-4 w-4 text-yellow-600" />
                    <span className="font-medium">{achievement}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Career Statistics */}
          {athlete.stats && (
            <Card>
              <CardHeader>
                <CardTitle>Career Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(athlete.stats).map(([key, value]) => (
                    <div key={key} className="text-center p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl font-bold text-gray-900">{value}</div>
                      <div className="text-sm text-gray-600 capitalize">{key.replace("_", " ")}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Weight Class</span>
                <span className="font-medium">{athlete.weight_class} lbs</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-gray-600">Graduation Year</span>
                <span className="font-medium">{athlete.graduation_year}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-gray-600">High School</span>
                <span className="font-medium text-right">{athlete.high_school}</span>
              </div>
              {athlete.wrestling_club && (
                <>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-600">Wrestling Club</span>
                    <span className="font-medium text-right">{athlete.wrestling_club}</span>
                  </div>
                </>
              )}
              {athlete.college_committed && (
                <>
                  <Separator />
                  <div className="flex justify-between">
                    <span className="text-gray-600">College</span>
                    <span className="font-medium text-blue-600 text-right">{athlete.college_committed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Division</span>
                    <Badge variant="secondary">{athlete.college_division}</Badge>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Related Athletes */}
          <Card>
            <CardHeader>
              <CardTitle>Similar Athletes</CardTitle>
              <CardDescription>Same weight class and graduation year</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {sampleAthletes
                  .filter(
                    (a) =>
                      a.id !== athlete.id &&
                      a.weight_class === athlete.weight_class &&
                      a.graduation_year === athlete.graduation_year,
                  )
                  .slice(0, 3)
                  .map((relatedAthlete) => (
                    <Link key={relatedAthlete.id} href={`/recruiting/athletes/${relatedAthlete.id}`}>
                      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                        <img
                          src={relatedAthlete.image_url || "/placeholder.svg?height=40&width=40"}
                          alt={relatedAthlete.name}
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 truncate">{relatedAthlete.name}</p>
                          <p className="text-sm text-gray-600 truncate">{relatedAthlete.high_school}</p>
                        </div>
                        <ExternalLink className="h-4 w-4 text-gray-400" />
                      </div>
                    </Link>
                  ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Follow Athlete
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />
                Suggest Edit
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Share2 className="h-4 w-4 mr-2" />
                Share Profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
