"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function CheckDatabaseConnection() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const checkConnection = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/check-database-connection")
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error:", error)
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Check Database Connection</h1>
        <Button onClick={checkConnection} disabled={loading}>
          {loading ? "Checking..." : "Check Database"}
        </Button>
      </div>

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Database Connection Info</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Database Type:</strong> {result.database_type}
                </p>
                <p>
                  <strong>Database Host:</strong> {result.database_host}
                </p>
                <p>
                  <strong>Connection String (masked):</strong> {result.connection_masked}
                </p>
                <p>
                  <strong>Current Time from DB:</strong> {result.current_time}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Liam's Data in Current Database</CardTitle>
            </CardHeader>
            <CardContent>
              {result.liam_data ? (
                <div className="space-y-2">
                  <p>
                    <strong>Weight Class:</strong> {result.liam_data.weight_class}
                  </p>
                  <p>
                    <strong>High School:</strong> {result.liam_data.high_school}
                  </p>
                  <p>
                    <strong>Updated:</strong> {result.liam_data.updated_at}
                  </p>
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                    {JSON.stringify(result.liam_data, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-red-600">No Liam data found</p>
              )}
            </CardContent>
          </Card>

          {result.error && (
            <Card>
              <CardHeader>
                <CardTitle className="text-red-600">Error</CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-red-50 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(result.error, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
