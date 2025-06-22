"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestDatabaseConnection() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testConnection = async () => {
    setLoading(true)
    setResults(null)

    try {
      console.log("🧪 Testing database connection...")

      const response = await fetch("/api/test-db-connection")
      const data = await response.json()

      console.log("📊 Test results:", data)
      setResults(data)
    } catch (error) {
      console.error("❌ Test failed:", error)
      setResults({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Database Connection Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={testConnection} disabled={loading}>
            {loading ? "Testing..." : "Test Database Connection"}
          </Button>

          {results && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Results:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(results, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
