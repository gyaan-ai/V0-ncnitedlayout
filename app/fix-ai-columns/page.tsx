"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FixAIColumns() {
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const runFix = async () => {
    try {
      setLoading(true)
      setError(null)

      const response = await fetch("/api/admin/fix-ai-columns")
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to fix columns")
      }

      setResult(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred")
      console.error("Error fixing columns:", err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Fix AI Summary Columns</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Emergency Column Fix</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            This utility will add the missing AI summary columns to the athletes table if they don't exist.
          </p>
          <Button onClick={runFix} disabled={loading} className="bg-blue-600 hover:bg-blue-700">
            {loading ? "Running..." : "Run Fix Now"}
          </Button>
        </CardContent>
      </Card>

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
            <CardTitle>Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">Existing Columns:</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm">{JSON.stringify(result.existingColumns, null, 2)}</pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Columns Added:</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm">{JSON.stringify(result.columnsAdded, null, 2)}</pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Operation Results:</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm">{JSON.stringify(result.results, null, 2)}</pre>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Verified Columns:</h3>
                <pre className="bg-gray-100 p-3 rounded text-sm">{JSON.stringify(result.verifiedColumns, null, 2)}</pre>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
