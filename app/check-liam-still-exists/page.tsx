"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CheckLiamExists() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const checkDatabase = async () => {
    setLoading(true)
    try {
      // Check if Liam exists
      const response = await fetch("/api/athletes")
      const athletes = await response.json()

      console.log("All athletes:", athletes)

      const liam = athletes.find(
        (a) => a.first_name?.toLowerCase() === "liam" && a.last_name?.toLowerCase() === "hickey",
      )

      setResult({
        totalAthletes: athletes.length,
        allAthletes: athletes,
        liamExists: !!liam,
        liamData: liam,
      })
    } catch (error) {
      console.error("Error:", error)
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkDatabase()
  }, [])

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>🔍 Database Check - Is Liam Still There?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={checkDatabase} disabled={loading}>
            {loading ? "Checking..." : "Refresh Check"}
          </Button>

          {result && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-100 rounded">
                <h3 className="font-bold mb-2">Results:</h3>
                <p>
                  <strong>Total Athletes:</strong> {result.totalAthletes || 0}
                </p>
                <p>
                  <strong>Liam Exists:</strong> {result.liamExists ? "✅ YES" : "❌ NO"}
                </p>

                {result.liamData && (
                  <div className="mt-4">
                    <h4 className="font-semibold">Liam's Data:</h4>
                    <pre className="text-xs bg-white p-2 rounded mt-2 overflow-auto">
                      {JSON.stringify(result.liamData, null, 2)}
                    </pre>
                  </div>
                )}

                {result.error && (
                  <p className="text-red-600">
                    <strong>Error:</strong> {result.error}
                  </p>
                )}

                <div className="mt-4">
                  <h4 className="font-semibold">All Athletes:</h4>
                  <pre className="text-xs bg-white p-2 rounded mt-2 overflow-auto max-h-64">
                    {JSON.stringify(result.allAthletes, null, 2)}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
