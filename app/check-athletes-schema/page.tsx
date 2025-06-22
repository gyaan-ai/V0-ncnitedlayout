"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CheckAthletesSchemaPage() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const checkSchema = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/athletes/check-schema")
      const data = await response.json()
      setResult(data)
      console.log("Schema check result:", data)
    } catch (error) {
      console.error("Error checking schema:", error)
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Athletes Table Schema Check</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={checkSchema} disabled={loading}>
            {loading ? "Checking..." : "Check Athletes Table Schema"}
          </Button>

          {result && (
            <div className="mt-4">
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
