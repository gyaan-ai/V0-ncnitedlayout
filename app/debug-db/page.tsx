"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugDbPage() {
  const [status, setStatus] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkDatabase() {
      try {
        // Test basic database connection
        const response = await fetch("/api/debug-db")
        const data = await response.json()
        setStatus(data)
      } catch (err) {
        setStatus({ error: err instanceof Error ? err.message : "Unknown error" })
      } finally {
        setLoading(false)
      }
    }

    checkDatabase()
  }, [])

  if (loading) return <div className="p-8">Checking database...</div>

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Database Debug</h1>

      <Card>
        <CardHeader>
          <CardTitle>Database Status</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(status, null, 2)}</pre>
        </CardContent>
      </Card>
    </div>
  )
}
