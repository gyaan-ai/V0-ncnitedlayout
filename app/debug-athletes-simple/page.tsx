"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugAthletesSimple() {
  const [athletes, setAthletes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [rawResponse, setRawResponse] = useState(null)

  useEffect(() => {
    async function fetchAthletes() {
      try {
        console.log("Starting fetch...")
        const response = await fetch("/api/admin/athletes")
        console.log("Response status:", response.status)
        console.log("Response headers:", response.headers)

        const data = await response.json()
        console.log("Response data:", data)
        setRawResponse(data)

        if (response.ok) {
          setAthletes(Array.isArray(data) ? data : [])
        } else {
          setError(data.error || `HTTP ${response.status}`)
        }
      } catch (err) {
        console.error("Fetch error:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchAthletes()
  }, [])

  if (loading) return <div className="p-8">Loading...</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Debug Athletes - Simple View</h1>

      {error && (
        <Card className="mb-6 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Raw API Response</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-64">
            {JSON.stringify(rawResponse, null, 2)}
          </pre>
        </CardContent>
      </Card>

      <div className="mb-4">
        <p>Found {athletes.length} athletes</p>
      </div>

      <div className="space-y-4">
        {athletes.map((athlete, index) => (
          <Card key={athlete.id || index}>
            <CardHeader>
              <CardTitle>
                {athlete.first_name} {athlete.last_name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>ID:</strong> {athlete.id}
                </div>
                <div>
                  <strong>Weight:</strong> {athlete.weight_class}
                </div>
                <div>
                  <strong>Grad Year:</strong> {athlete.graduation_year}
                </div>
                <div>
                  <strong>High School:</strong> {athlete.high_school}
                </div>
                <div>
                  <strong>College:</strong> {athlete.college_committed || "Not committed"}
                </div>
                <div>
                  <strong>Team:</strong> {athlete.nc_united_team}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {athletes.length === 0 && !error && (
        <Card>
          <CardContent className="p-8 text-center">
            <p>No athletes found in database</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
