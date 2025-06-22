"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugSaveWithAI() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const testSave = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/debug-save-with-ai", {
        method: "POST",
      })

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
          <CardTitle>Debug Save with AI Fields</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testSave} disabled={loading}>
            {loading ? "Testing..." : "Test Save with AI Fields"}
          </Button>

          {result && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Result:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
