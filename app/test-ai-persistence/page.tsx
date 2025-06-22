"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function TestAIPersistence() {
  const [athleteId, setAthleteId] = useState("")
  const [headline, setHeadline] = useState("")
  const [bio, setBio] = useState("")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [athletes, setAthletes] = useState<any[]>([])
  const [loadingAthletes, setLoadingAthletes] = useState(false)
  const [selectedAthlete, setSelectedAthlete] = useState<any>(null)

  // Load athletes on mount
  useEffect(() => {
    const fetchAthletes = async () => {
      try {
        setLoadingAthletes(true)
        const response = await fetch("/api/athletes")
        const data = await response.json()

        if (Array.isArray(data)) {
          setAthletes(data)
        } else if (data.athletes && Array.isArray(data.athletes)) {
          setAthletes(data.athletes)
        } else {
          setAthletes([])
        }
      } catch (err) {
        console.error("Error loading athletes:", err)
      } finally {
        setLoadingAthletes(false)
      }
    }

    fetchAthletes()
  }, [])

  const handleSelectAthlete = (athlete: any) => {
    setSelectedAthlete(athlete)
    setAthleteId(athlete.id)
    setHeadline(athlete.generated_headline || "")
    setBio(athlete.generated_bio || "")
  }

  const saveAISummary = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/admin/update-athlete-with-ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: athleteId,
          generated_headline: headline,
          generated_bio: bio,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to update AI summary")
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred")
      console.error("Error saving AI summary:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Test AI Summary Persistence</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>Select Athlete</CardTitle>
          </CardHeader>
          <CardContent>
            {loadingAthletes ? (
              <p>Loading athletes...</p>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {athletes.map((athlete) => (
                  <div
                    key={athlete.id}
                    className={`p-3 rounded cursor-pointer ${
                      selectedAthlete?.id === athlete.id ? "bg-blue-100 border border-blue-300" : "hover:bg-gray-100"
                    }`}
                    onClick={() => handleSelectAthlete(athlete)}
                  >
                    <p className="font-medium">
                      {athlete.first_name} {athlete.last_name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {athlete.high_school} • {athlete.weight_class}lbs
                    </p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>AI Summary Fields</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="headline">Generated Headline</Label>
                <Input
                  id="headline"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="Enter headline"
                />
              </div>

              <div>
                <Label htmlFor="bio">Generated Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Enter bio"
                  rows={6}
                />
              </div>

              <Button
                onClick={saveAISummary}
                disabled={loading || !athleteId}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Saving..." : "Save AI Summary"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {error && (
        <Card className="mb-6 border-red-300 bg-red-50">
          <CardContent className="pt-6">
            <p className="text-red-600 font-semibold">Error: {error}</p>
          </CardContent>
        </Card>
      )}

      {result && (
        <Card>
          <CardHeader>
            <CardTitle>Save Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Status:</h3>
                <p className={result.success ? "text-green-600" : "text-red-600"}>
                  {result.success ? "✅ Success" : "❌ Failed"}
                </p>
                <p>{result.message}</p>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Response Data:</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm">{JSON.stringify(result.data, null, 2)}</pre>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
