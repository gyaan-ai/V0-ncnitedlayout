"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SimpleUpdateTest() {
  const [hometown, setHometown] = useState("Raleigh")
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")

  const handleUpdate = async () => {
    setLoading(true)
    setResult("")

    try {
      console.log("Updating hometown to:", hometown)

      const response = await fetch("/api/admin/athletes/b1adf5a8-7887-4af1-935d-07267f186df9", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          hometown: hometown,
        }),
      })

      const data = await response.json()
      console.log("Response:", data)

      if (response.ok) {
        setResult(`✅ SUCCESS: Hometown updated to "${data.athlete?.hometown}"`)
      } else {
        setResult(`❌ ERROR: ${data.error} - ${data.details}`)
      }
    } catch (error) {
      console.error("Update error:", error)
      setResult(`❌ NETWORK ERROR: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Simple Hometown Update Test</CardTitle>
          <p className="text-gray-600">Testing the most basic database update</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Hometown for Liam Hickey:</label>
            <Input value={hometown} onChange={(e) => setHometown(e.target.value)} placeholder="Enter hometown" />
          </div>

          <Button onClick={handleUpdate} disabled={loading} className="w-full">
            {loading ? "Updating..." : "Update Hometown"}
          </Button>

          {result && (
            <div
              className={`p-4 rounded ${result.includes("SUCCESS") ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
            >
              <pre className="whitespace-pre-wrap text-sm">{result}</pre>
            </div>
          )}

          <div className="text-sm text-gray-600">
            <p>
              <strong>Athlete ID:</strong> b1adf5a8-7887-4af1-935d-07267f186df9
            </p>
            <p>
              <strong>Test URL:</strong> /test-simple-update
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
