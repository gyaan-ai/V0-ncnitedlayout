"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugAthleteLookup() {
  const [athleteId, setAthleteId] = useState("ce1bf191-623d-46dd-a0ca-5929e85871f1")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const lookupAthlete = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/debug-athlete-lookup?id=${athleteId}`)
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Debug Athlete Lookup</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input
              value={athleteId}
              onChange={(e) => setAthleteId(e.target.value)}
              placeholder="Enter athlete ID"
              className="flex-1"
            />
            <Button onClick={lookupAthlete} disabled={loading}>
              {loading ? "Looking up..." : "Lookup"}
            </Button>
          </div>

          {result && (
            <div className="mt-4">
              <h3 className="font-bold mb-2">Result:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
