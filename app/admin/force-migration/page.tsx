"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForceMigrationPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState(null)

  const runMigration = async () => {
    setIsRunning(true)
    try {
      const response = await fetch("/api/admin/force-migration", {
        method: "POST",
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: "Failed to run migration", details: error.message })
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>🚀 Force Database Migration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>This will add all missing columns to your athletes table.</p>

          <Button onClick={runMigration} disabled={isRunning} className="w-full">
            {isRunning ? "Running Migration..." : "Run Migration Now"}
          </Button>

          {result && (
            <div className="mt-4 p-4 bg-gray-100 rounded">
              <pre>{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
