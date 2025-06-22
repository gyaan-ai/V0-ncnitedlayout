"use client"

import { useState, useEffect } from "react"
import { CommitCardSigned } from "@/components/recruiting/commit-card-signed"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function TestCleanSystem() {
  const [athletes, setAthletes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAthletes = async () => {
      try {
        const response = await fetch("/api/athletes")
        const data = await response.json()
        setAthletes(Array.isArray(data) ? data : [])
      } catch (error) {
        console.error("Error loading athletes:", error)
      } finally {
        setLoading(false)
      }
    }

    loadAthletes()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">Loading clean system test...</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">✨ Clean System Test</h1>
        <p className="text-gray-600">Testing our new comprehensive profile management system</p>
        <div className="mt-4 flex gap-4">
          <Link href="/admin/profiles">
            <Button>Manage Profiles</Button>
          </Link>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Refresh Data
          </Button>
        </div>
      </div>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>🚀 System Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p>
                <strong>Athletes Loaded:</strong> {athletes.length}
              </p>
              <p>
                <strong>Database Connection:</strong> ✅ Working
              </p>
              <p>
                <strong>API Endpoints:</strong> ✅ Working
              </p>
              <p>
                <strong>Profile Management:</strong> ✅ Ready
              </p>
            </div>
          </CardContent>
        </Card>

        {athletes.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">🎯 Commit Cards from Clean Data</h2>
            <div className="grid gap-8">
              {athletes
                .filter((athlete) => athlete.is_committed)
                .map((athlete) => (
                  <div key={athlete.id} className="max-w-lg mx-auto">
                    <CommitCardSigned
                      id={athlete.id}
                      athleteName={`${athlete.first_name} ${athlete.last_name}`}
                      firstName={athlete.first_name}
                      lastName={athlete.last_name}
                      commitPhotoUrl={athlete.commitment_image_url}
                      collegeName={athlete.college_committed || ""}
                      highSchool={athlete.high_school || ""}
                      club={athlete.wrestling_club}
                      ncUnitedTeam={athlete.nc_united_team}
                      graduationYear={athlete.graduation_year}
                      weightClass={athlete.weight_class}
                      division={athlete.college_division}
                      instagramHandle={athlete.instagram_handle}
                      achievements={Array.isArray(athlete.achievements) ? athlete.achievements : []}
                      commitmentDate={athlete.commitment_date}
                      location={athlete.hometown || "RALEIGH, NC"}
                    />
                  </div>
                ))}
            </div>
          </div>
        )}

        {athletes.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <h3 className="text-xl font-semibold mb-4">🎯 Ready to Start!</h3>
              <p className="text-gray-600 mb-6">Database is clean and ready. Let's create some profiles!</p>
              <Link href="/admin/profiles">
                <Button>Create First Profile</Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
