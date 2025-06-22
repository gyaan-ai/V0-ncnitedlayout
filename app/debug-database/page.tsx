"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DebugDatabase() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const checkDatabase = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/debug-database")
      const data = await response.json()
      setResults(data)
    } catch (error) {
      setResults({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Database Debug - Find Out What We're Working With</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={checkDatabase} disabled={loading}>
            {loading ? "Checking..." : "Check Database"}
          </Button>

          {results && (
            <div className="mt-6">
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(results, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
