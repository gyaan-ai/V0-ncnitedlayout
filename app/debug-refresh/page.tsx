"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function DebugRefreshPage() {
  const [athlete, setAthlete] = useState(null)
  const [loading, setLoading] = useState(false)
  const [hometown, setHometown] = useState("")

  const loadAthlete = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/athletes/b1adf5a8-7887-4af1-935d-07267f186df9")
      const data = await response.json()
      console.log("=== LOADED ATHLETE ===", data)
      setAthlete(data)
      setHometown(data.hometown || "")
    } catch (error) {
      console.error("Load error:", error)
    }
    setLoading(false)
  }

  const saveHometown = async () => {
    try {
      console.log("=== SAVING HOMETOWN ===", hometown)

      const response = await fetch("/api/admin/athletes/b1adf5a8-7887-4af1-935d-07267f186df9", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hometown }),
      })

      const result = await response.json()
      console.log("=== SAVE RESULT ===", result)

      if (response.ok) {
        // Immediately reload to see if it saved
        await loadAthlete()
      }
    } catch (error) {
      console.error("Save error:", error)
    }
  }

  useEffect(() => {
    loadAthlete()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Debug Hometown Update</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button onClick={loadAthlete} disabled={loading}>
              {loading ? "Loading..." : "Reload Data"}
            </Button>
          </div>

          {athlete && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 rounded">
                <h3 className="font-bold">Current Database Data:</h3>
                <p>
                  <strong>Name:</strong> {athlete.first_name} {athlete.last_name}
                </p>
                <p>
                  <strong>Hometown:</strong> "{athlete.hometown || "NULL/EMPTY"}"
                </p>
                <p>
                  <strong>Updated At:</strong> {athlete.updated_at}
                </p>
              </div>

              <div>
                <Label htmlFor="hometown">Edit Hometown:</Label>
                <Input
                  id="hometown"
                  value={hometown}
                  onChange={(e) => setHometown(e.target.value)}
                  placeholder="Enter hometown"
                />
              </div>

              <Button onClick={saveHometown}>Save Hometown</Button>

              <div className="p-4 bg-blue-50 rounded">
                <h3 className="font-bold">Raw Database Response:</h3>
                <pre className="text-xs overflow-auto">{JSON.stringify(athlete, null, 2)}</pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
