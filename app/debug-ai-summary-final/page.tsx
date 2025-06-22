"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugAISummaryFinal() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)

  const runDiagnostic = async () => {
    setLoading(true)
    try {
      // Check if columns exist
      const columnsResponse = await fetch("/api/debug-ai-columns")
      const columnsData = await columnsResponse.json()

      // Check Liam's current data
      const liamResponse = await fetch("/api/athletes/by-name?name=Liam Hickey")
      const liamData = await liamResponse.json()

      // Test save
      const testSaveResponse = await fetch("/api/athletes/simple-update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: liamData.id,
          generated_headline: "TEST HEADLINE - " + new Date().toISOString(),
          generated_bio: "TEST BIO - " + new Date().toISOString(),
        }),
      })
      const testSaveData = await testSaveResponse.json()

      setResults({
        columns: columnsData,
        liam: liamData,
        testSave: testSaveData,
      })
    } catch (error) {
      setResults({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>🔍 AI Summary Persistence Diagnostic</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={runDiagnostic} disabled={loading}>
            {loading ? "Running Diagnostic..." : "Run Full Diagnostic"}
          </Button>

          {results && (
            <div className="space-y-4">
              <div>
                <h3 className="font-bold">Database Columns:</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(results.columns, null, 2)}
                </pre>
              </div>

              <div>
                <h3 className="font-bold">Liam's Current Data:</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(
                    {
                      id: results.liam?.id,
                      name: `${results.liam?.first_name} ${results.liam?.last_name}`,
                      generated_headline: results.liam?.generated_headline,
                      generated_bio: results.liam?.generated_bio?.substring(0, 100) + "...",
                    },
                    null,
                    2,
                  )}
                </pre>
              </div>

              <div>
                <h3 className="font-bold">Test Save Result:</h3>
                <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                  {JSON.stringify(results.testSave, null, 2)}
                </pre>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
