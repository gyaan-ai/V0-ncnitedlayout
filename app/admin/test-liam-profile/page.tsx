"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getAthleteByName } from "@/lib/athlete-lookup"
import { CommitCardSigned } from "@/components/recruiting/commit-card-signed"
import Link from "next/link"
import { User, Database, FolderSyncIcon as Sync, Eye } from "lucide-react"

export default function TestLiamProfilePage() {
  const [athleteData, setAthleteData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get Liam's data from the recruiting database
    const liam = getAthleteByName("Liam", "Hickey")
    setAthleteData(liam)
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading Liam's profile data...</p>
        </div>
      </div>
    )
  }

  if (!athleteData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-2xl mx-auto">
          <CardContent className="p-8 text-center">
            <h1 className="text-2xl font-bold mb-4 text-red-600">Profile Not Found</h1>
            <p className="mb-6">Liam Hickey's profile was not found in the recruiting database.</p>
            <div className="space-y-3">
              <Link href="/admin/athletes-portal">
                <Button className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Create Profile in Athlete Portal
                </Button>
              </Link>
              <Link href="/admin">
                <Button variant="outline" className="w-full">
                  Back to Admin
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">Liam Hickey Profile Test</h1>
            <p className="text-gray-600">Verify profile data and commit card rendering</p>
          </div>
          <div className="flex gap-3">
            <Link href="/admin">
              <Button variant="outline">Back to Admin</Button>
            </Link>
            <Link href="/admin/athletes-portal">
              <Button>
                <Database className="h-4 w-4 mr-2" />
                Athlete Portal
              </Button>
            </Link>
          </div>
        </div>

        {/* Status Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <Database className="h-8 w-8 text-green-600 mx-auto mb-3" />
              <h3 className="font-semibold text-green-800">Profile Found</h3>
              <p className="text-sm text-green-600">Data loaded from recruiting database</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Sync className="h-8 w-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-blue-800">Achievements</h3>
              <p className="text-sm text-blue-600">{athleteData.achievements?.length || 0} achievements loaded</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 text-center">
              <Eye className="h-8 w-8 text-purple-600 mx-auto mb-3" />
              <h3 className="font-semibold text-purple-800">Commit Card</h3>
              <p className="text-sm text-purple-600">Ready for display</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="data" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="data">Profile Data</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="card">Commit Card</TabsTrigger>
          </TabsList>

          {/* Profile Data Tab */}
          <TabsContent value="data">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700">Basic Info</h4>
                      <div className="mt-2 space-y-1 text-sm">
                        <p>
                          <strong>Name:</strong> {athleteData.firstName} {athleteData.lastName}
                        </p>
                        <p>
                          <strong>Weight Class:</strong> {athleteData.weight_class} lbs
                        </p>
                        <p>
                          <strong>Graduation Year:</strong> {athleteData.graduation_year}
                        </p>
                        <p>
                          <strong>Gender:</strong> {athleteData.gender}
                        </p>
                        <p>
                          <strong>High School:</strong> {athleteData.high_school}
                        </p>
                        <p>
                          <strong>Wrestling Club:</strong> {athleteData.wrestling_club}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700">NC United</h4>
                      <div className="mt-2">
                        <Badge variant="default">{athleteData.ncUnitedTeam} Team</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-700">College Commitment</h4>
                      <div className="mt-2 space-y-1 text-sm">
                        <p>
                          <strong>College:</strong> {athleteData.college_committed}
                        </p>
                        <p>
                          <strong>Division:</strong> {athleteData.college_division}
                        </p>
                        <p>
                          <strong>Commitment Date:</strong> {athleteData.commitment_date}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700">Social</h4>
                      <div className="mt-2 space-y-1 text-sm">
                        <p>
                          <strong>Instagram:</strong> {athleteData.instagramHandle}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-700">Stats</h4>
                      <div className="mt-2 space-y-1 text-sm">
                        <p>
                          <strong>Career Record:</strong> {athleteData.stats?.career_wins}-
                          {athleteData.stats?.career_losses}
                        </p>
                        <p>
                          <strong>Pins:</strong> {athleteData.stats?.pins}
                        </p>
                        <p>
                          <strong>Tech Falls:</strong> {athleteData.stats?.tech_falls}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements">
            <Card>
              <CardHeader>
                <CardTitle>Achievements ({athleteData.achievements?.length || 0})</CardTitle>
              </CardHeader>
              <CardContent>
                {athleteData.achievements && athleteData.achievements.length > 0 ? (
                  <div className="grid gap-2">
                    {athleteData.achievements.map((achievement: string, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Badge variant="outline" className="text-xs">
                          #{index + 1}
                        </Badge>
                        <span className="text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No achievements found</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Commit Card Tab */}
          <TabsContent value="card">
            <Card>
              <CardHeader>
                <CardTitle>Commit Card Preview</CardTitle>
                <p className="text-sm text-gray-600">This is how Liam's commit card will appear on the website</p>
              </CardHeader>
              <CardContent>
                <div className="max-w-lg mx-auto">
                  <CommitCardSigned
                    id={athleteData.id}
                    athleteName={athleteData.name}
                    firstName={athleteData.firstName}
                    lastName={athleteData.lastName}
                    commitPhotoUrl={athleteData.image_url}
                    collegeName={athleteData.college_committed}
                    highSchool={athleteData.high_school}
                    club={athleteData.wrestling_club}
                    ncUnitedTeam={athleteData.ncUnitedTeam}
                    graduationYear={athleteData.graduation_year}
                    weightClass={athleteData.weight_class}
                    division={athleteData.college_division}
                    instagramHandle={athleteData.instagramHandle}
                    achievements={athleteData.achievements || []}
                    commitmentDate={athleteData.commitment_date}
                    location="RALEIGH, NC"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/admin/athletes-portal">
            <Button size="lg">
              <Database className="h-4 w-4 mr-2" />
              Edit in Athlete Portal
            </Button>
          </Link>
          <Link href="/recruiting/commits">
            <Button variant="outline" size="lg">
              <Eye className="h-4 w-4 mr-2" />
              View Live Commit Card
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
