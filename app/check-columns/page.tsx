"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CheckColumns() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const checkColumns = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/check-columns")
      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkColumns()
  }, [])

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Check Database Columns</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">Let's see what columns actually exist in the athletes table.</p>

          <Button onClick={checkColumns} disabled={loading}>
            {loading ? "Checking..." : "Refresh Column Check"}
          </Button>

          {result && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Database Columns:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-4 p-4 bg-yellow-50 rounded">
            <h4 className="font-semibold text-yellow-800">Next Steps:</h4>
            <ol className="text-sm text-yellow-700 mt-2 space-y-1">
              <li>1. Run the SQL script to force-add the columns</li>
              <li>2. Check this page again to verify they were added</li>
              <li>3. Try saving the athlete profile again</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
