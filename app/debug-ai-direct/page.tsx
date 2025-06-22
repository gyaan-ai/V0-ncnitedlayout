"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function DebugAIDirect() {
  // Liam's known ID from the diagnostic
  const LIAM_ID = "ce1bf191-623d-46dd-a0ca-5929e85871f1"

  const [headline, setHeadline] = useState("Test Headline " + new Date().toLocaleTimeString())
  const [bio, setBio] = useState("Test Bio " + new Date().toLocaleTimeString())
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const saveDirectly = async () => {
    setLoading(true)
    try {
      // Direct PUT to Liam's endpoint
      const response = await fetch(`/api/athletes/${LIAM_ID}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          generated_headline: headline,
          generated_bio: bio,
        }),
      })

      const data = await response.json()

      // Verify the save by getting the latest data
      const verifyResponse = await fetch(`/api/athletes/${LIAM_ID}`)
      const verifyData = await verifyResponse.json()

      setResults({
        saveResult: data,
        verification: {
          id: verifyData.id,
          name: `${verifyData.first_name} ${verifyData.last_name}`,
          generated_headline: verifyData.generated_headline,
          generated_bio: verifyData.generated_bio?.substring(0, 100) + "...",
        },
      })
    } catch (error) {
      setResults({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>🔧 Direct AI Summary Fix</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Generated Headline</Label>
            <Input value={headline} onChange={(e) => setHeadline(e.target.value)} />
          </div>

          <div>
            <Label>Generated Bio</Label>
            <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={4} />
          </div>

          <Button onClick={saveDirectly} disabled={loading}>
            {loading ? "Saving..." : "Save Directly to Liam's Profile"}
          </Button>

          {results && (
            <div className="space-y-4 mt-4">
              <div>
                <h3 className="font-bold">Save Result:</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(results.saveResult, null, 2)}
                </pre>
              </div>

              <div>
                <h3 className="font-bold">Verification:</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(results.verification, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
