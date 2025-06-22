"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForceSchemaReload() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const forceReload = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/force-schema-reload", {
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

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>Force PostgREST Schema Reload</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-600">
            This will force Supabase's PostgREST to reload its schema cache and recognize the new AI columns.
          </p>

          <Button onClick={forceReload} disabled={loading}>
            {loading ? "Forcing Reload..." : "Force Schema Reload"}
          </Button>

          {result && (
            <div className="mt-4">
              <h3 className="font-semibold mb-2">Result:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto max-h-96">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}

          <div className="mt-4 p-4 bg-yellow-50 rounded">
            <h4 className="font-semibold text-yellow-800">Alternative Solution:</h4>
            <p className="text-sm text-yellow-700 mt-2">
              If this doesn't work, you may need to restart your Supabase project:
            </p>
            <ol className="text-sm text-yellow-700 mt-2 ml-4 list-decimal">
              <li>Go to your Supabase dashboard</li>
              <li>Click on your project</li>
              <li>Go to Settings → General</li>
              <li>Click "Restart project"</li>
              <li>Wait for it to restart (2-3 minutes)</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
