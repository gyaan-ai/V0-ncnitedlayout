"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, TestTube, AlertTriangle, CheckCircle } from "lucide-react"

export default function DebugAIPersistence() {
  const [debugInfo, setDebugInfo] = useState(null)
  const [testResult, setTestResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const runDebug = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/debug-ai-persistence")
      const data = await response.json()
      setDebugInfo(data.debug_info)
    } catch (error) {
      console.error("Debug failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const runTest = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/debug-ai-persistence", { method: "POST" })
      const data = await response.json()
      setTestResult(data.test_result)
    } catch (error) {
      console.error("Test failed:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">AI Summary Persistence Debug</h1>
          <p className="text-gray-600 mt-2">Investigating why AI summaries disappear after an hour</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={runDebug} disabled={loading}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Check Status
          </Button>
          <Button onClick={runTest} disabled={loading} variant="outline">
            <TestTube className="h-4 w-4 mr-2" />
            Run Test
          </Button>
        </div>
      </div>

      {debugInfo && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              Current Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Athlete Data</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Name:</strong> {debugInfo.athlete_data.name}
                  </p>
                  <p>
                    <strong>Has Headline:</strong>{" "}
                    <Badge variant={debugInfo.athlete_data.has_headline ? "default" : "destructive"}>
                      {debugInfo.athlete_data.has_headline ? "Yes" : "No"}
                    </Badge>
                  </p>
                  <p>
                    <strong>Has Bio:</strong>{" "}
                    <Badge variant={debugInfo.athlete_data.has_bio ? "default" : "destructive"}>
                      {debugInfo.athlete_data.has_bio ? "Yes" : "No"}
                    </Badge>
                  </p>
                  <p>
                    <strong>Headline Length:</strong> {debugInfo.athlete_data.headline_length} chars
                  </p>
                  <p>
                    <strong>Bio Length:</strong> {debugInfo.athlete_data.bio_length} chars
                  </p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Timestamps</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Bio Age:</strong>{" "}
                    <Badge variant={debugInfo.timestamps.bio_age_hours > 2 ? "destructive" : "default"}>
                      {debugInfo.timestamps.bio_age_hours || "N/A"} hours
                    </Badge>
                  </p>
                  <p>
                    <strong>Headline Age:</strong>{" "}
                    <Badge variant={debugInfo.timestamps.headline_age_hours > 2 ? "destructive" : "default"}>
                      {debugInfo.timestamps.headline_age_hours || "N/A"} hours
                    </Badge>
                  </p>
                  <p>
                    <strong>Last Updated:</strong> {debugInfo.athlete_data.last_updated}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-2">Database Columns</h3>
              <div className="flex gap-2">
                {debugInfo.database_columns.map((col) => (
                  <Badge key={col.column_name} variant="outline">
                    {col.column_name} ({col.data_type})
                  </Badge>
                ))}
              </div>
            </div>

            {debugInfo.raw_ai_data.generated_headline && (
              <div>
                <h3 className="font-semibold mb-2">Current AI Content</h3>
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <p>
                    <strong>Headline:</strong> {debugInfo.raw_ai_data.generated_headline}
                  </p>
                  <p>
                    <strong>Bio Preview:</strong> {debugInfo.raw_ai_data.generated_bio}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {testResult && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              Persistence Test Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <Badge variant={testResult.write_successful ? "default" : "destructive"}>
                    Write: {testResult.write_successful ? "Success" : "Failed"}
                  </Badge>
                </div>
                <div className="text-center">
                  <Badge variant={testResult.read_successful ? "default" : "destructive"}>
                    Read: {testResult.read_successful ? "Success" : "Failed"}
                  </Badge>
                </div>
                <div className="text-center">
                  <Badge variant={testResult.data_matches ? "default" : "destructive"}>
                    Match: {testResult.data_matches ? "Yes" : "No"}
                  </Badge>
                </div>
              </div>

              <div className="bg-gray-50 p-3 rounded text-sm">
                <p>
                  <strong>Test Headline:</strong> {testResult.read_data?.generated_headline}
                </p>
                <p>
                  <strong>Test Bio:</strong> {testResult.read_data?.generated_bio}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
