"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function DebugAthleteSave() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testSave = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/debug-athlete-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: "ce1bf191-623d-46dd-a0ca-5929e85871f1",
          first_name: "Test Update",
          generated_bio: "This is a test bio",
          generated_headline: "Test headline",
        }),
      })

      const data = await response.json()
      setResult(data)
      console.log("Debug result:", data)
    } catch (error) {
      console.error("Debug error:", error)
      setResult({ error: "Request failed", details: error })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Athlete Save</h1>
      <Button onClick={testSave} disabled={loading}>
        {loading ? "Testing..." : "Test Save"}
      </Button>

      {result && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Result:</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
