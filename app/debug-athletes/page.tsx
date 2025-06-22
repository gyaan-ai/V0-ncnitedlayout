"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugAthletesPage() {
  const [rawData, setRawData] = useState<any>(null)
  const [apiData, setApiData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchData() {
      try {
        // Check raw database data
        const rawResponse = await fetch("/api/debug-raw-athletes")
        const rawResult = await rawResponse.json()
        setRawData(rawResult)

        // Check API data
        const apiResponse = await fetch("/api/admin/athletes")
        const apiResult = await apiResponse.json()
        setApiData(apiResult)
      } catch (err) {
        console.error("Error fetching data:", err)
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) return <div className="p-8">Loading...</div>
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Debug Athletes Data</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Raw Database Data</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-96">
              {JSON.stringify(rawData, null, 2)}
            </pre>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Response</CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="text-xs bg-gray-100 p-4 rounded overflow-auto max-h-96">
              {JSON.stringify(apiData, null, 2)}
            </pre>
          </CardContent>
        </Card>
      </div>

      {Array.isArray(apiData) && apiData.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Athletes Found ({apiData.length})</h2>
          <div className="space-y-4">
            {apiData.map((athlete: any, index: number) => (
              <Card key={index}>
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
                      <strong>School:</strong> {athlete.high_school}
                    </div>
                    <div>
                      <strong>College:</strong> {athlete.college_committed || "None"}
                    </div>
                    <div>
                      <strong>Team:</strong> {athlete.nc_united_team}
                    </div>
                    <div>
                      <strong>Active:</strong> {athlete.is_active ? "Yes" : "No"}
                    </div>
                    <div>
                      <strong>Featured:</strong> {athlete.is_featured ? "Yes" : "No"}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
