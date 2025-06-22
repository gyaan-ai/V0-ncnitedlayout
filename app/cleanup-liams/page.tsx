"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type LiamRecord = {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  weight_class: string
  graduation_year: number
  high_school: string
  wrestling_club: string
  college_commitment: string
  division: string
  image_url: string
  commitment_photo_url: string
  achievements: string
  is_featured: boolean
  blue_team: boolean
  gold_team: boolean
  national_team: boolean
  created_at: string
  updated_at: string
}

export default function CleanupLiams() {
  const [liams, setLiams] = useState<LiamRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLiams() {
      try {
        const response = await fetch("/api/cleanup-liams")
        const data = await response.json()
        setLiams(data.liams || [])
      } catch (error) {
        console.error("Error fetching Liams:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLiams()
  }, [])

  const deleteLiam = async (id: string) => {
    if (!confirm("Are you sure you want to delete this Liam record?")) return

    try {
      const response = await fetch(`/api/cleanup-liams/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setLiams(liams.filter((liam) => liam.id !== id))
        alert("Liam record deleted successfully!")
      } else {
        alert("Failed to delete record")
      }
    } catch (error) {
      console.error("Error deleting:", error)
      alert("Error deleting record")
    }
  }

  if (loading) return <div className="p-8">Loading Liam records...</div>

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Cleanup Liam Hickey Records</h1>
      <p className="text-gray-600 mb-8">
        Found {liams.length} Liam Hickey records. Keep the best one and delete the rest.
      </p>

      <div className="grid gap-6">
        {liams.map((liam, index) => (
          <Card key={liam.id} className="border-2">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>
                  Liam #{index + 1} - {liam.id.slice(-8)}
                </span>
                <div className="flex gap-2">
                  {liam.is_featured && <Badge variant="default">Featured</Badge>}
                  {liam.blue_team && <Badge variant="secondary">Blue Team</Badge>}
                  {liam.gold_team && <Badge variant="secondary">Gold Team</Badge>}
                  {liam.national_team && <Badge variant="secondary">National Team</Badge>}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <strong>Email:</strong> {liam.email || "None"}
                </div>
                <div>
                  <strong>Phone:</strong> {liam.phone || "None"}
                </div>
                <div>
                  <strong>Weight Class:</strong> {liam.weight_class}
                </div>
                <div>
                  <strong>Graduation:</strong> {liam.graduation_year}
                </div>
                <div>
                  <strong>High School:</strong> {liam.high_school}
                </div>
                <div>
                  <strong>Wrestling Club:</strong> {liam.wrestling_club || "None"}
                </div>
                <div>
                  <strong>College:</strong> {liam.college_commitment || "None"}
                </div>
                <div>
                  <strong>Division:</strong> {liam.division || "None"}
                </div>
              </div>

              <div className="mb-4">
                <strong>Profile Image:</strong>{" "}
                {liam.image_url ? (
                  <span className="text-green-600">✓ Has image</span>
                ) : (
                  <span className="text-red-600">✗ No image</span>
                )}
              </div>

              <div className="mb-4">
                <strong>Commitment Photo:</strong>{" "}
                {liam.commitment_photo_url ? (
                  <span className="text-green-600">✓ Has photo</span>
                ) : (
                  <span className="text-red-600">✗ No photo</span>
                )}
              </div>

              <div className="mb-4">
                <strong>Achievements:</strong>
                <div className="text-sm bg-gray-100 p-2 rounded mt-1">{liam.achievements || "None"}</div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                <div>
                  <strong>Created:</strong> {new Date(liam.created_at).toLocaleDateString()}
                </div>
                <div>
                  <strong>Updated:</strong> {new Date(liam.updated_at).toLocaleDateString()}
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="destructive" onClick={() => deleteLiam(liam.id)} className="flex-1">
                  Delete This Record
                </Button>
                <Button
                  variant="outline"
                  onClick={() => window.open(`/athlete/${liam.id}`, "_blank")}
                  className="flex-1"
                >
                  View Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {liams.length === 1 && (
        <div className="mt-8 p-4 bg-green-100 rounded">
          <h3 className="font-bold text-green-800">✅ Perfect! Only one Liam left.</h3>
          <p className="text-green-700">
            Now you can update this record with the correct data. The remaining Liam ID is: {liams[0].id}
          </p>
        </div>
      )}
    </div>
  )
}
