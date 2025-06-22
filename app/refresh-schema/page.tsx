"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function RefreshSchema() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const refreshSchema = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/refresh-schema", {
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

  const testSaveAgain = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/debug-save-with-ai", {
        method: "POST",
      })

      const data = await response.json()
      setResult({ ...result, saveTest: data })
    } catch (error) {
      setResult({ ...result, saveTest: { error: error.message } })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Fix Schema Cache Issue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            Supabase needs to recognize the new AI columns. This will test and force recognition.
          </p>

          <div className="flex gap-2">
            <Button onClick={refreshSchema} disabled={loading}>
              {loading ? "Testing..." : "Test Schema Recognition"}
            </Button>

            <Button onClick={testSaveAgain} disabled={loading} variant="outline">
              {loading ? "Testing..." : "Test Save Again"}
            </Button>
          </div>

          {result && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Result:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-4 p-4 bg-blue-50 rounded">
            <h4 className="font-semibold text-blue-800">If this doesn't work:</h4>
            <ul className="text-sm text-blue-700 mt-2 space-y-1">
              <li>• Wait 5-10 minutes for Supabase cache to refresh</li>
              <li>• Try restarting your Supabase project in the dashboard</li>
              <li>• The columns exist in the database but PostgREST needs time to recognize them</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
