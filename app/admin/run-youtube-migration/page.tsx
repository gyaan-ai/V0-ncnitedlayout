"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Play, Database, CheckCircle, AlertCircle } from "lucide-react"
import { toast } from "sonner"

export default function RunYouTubeMigration() {
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState(null)

  const runMigration = async () => {
    try {
      setIsRunning(true)
      setResult(null)

      const response = await fetch("/api/admin/run-youtube-migration", {
        method: "POST",
      })

      const data = await response.json()
      setResult(data)

      if (data.success) {
        toast.success("YouTube column migration completed successfully!")
      } else {
        toast.error(`Migration failed: ${data.error}`)
      }
    } catch (error) {
      console.error("Migration error:", error)
      toast.error("Failed to run migration")
      setResult({
        success: false,
        error: "Network error",
        details: error.message,
      })
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-6 w-6 text-red-600" />
              YouTube Highlight URL Migration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                This migration will add the <code>youtube_highlight_url</code> column to the athletes table.
              </p>

              <Button onClick={runMigration} disabled={isRunning} className="bg-red-600 hover:bg-red-700" size="lg">
                {isRunning ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Running Migration...
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4 mr-2" />
                    Run YouTube Migration
                  </>
                )}
              </Button>
            </div>

            {result && (
              <Card
                className={`border-2 ${result.success ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    {result.success ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className={`font-semibold ${result.success ? "text-green-800" : "text-red-800"}`}>
                      {result.success ? "Migration Successful" : "Migration Failed"}
                    </span>
                  </div>

                  {result.success && (
                    <div className="space-y-2">
                      <p className="text-green-700">{result.message}</p>
                      {result.columnExists && (
                        <Badge className="bg-green-100 text-green-800">Column Added Successfully</Badge>
                      )}
                    </div>
                  )}

                  {!result.success && (
                    <div className="space-y-2">
                      <p className="text-red-700 font-medium">{result.error}</p>
                      {result.details && <p className="text-red-600 text-sm">{result.details}</p>}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            <div className="text-sm text-gray-500 space-y-2">
              <p>
                <strong>What this migration does:</strong>
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>
                  Adds <code>youtube_highlight_url TEXT</code> column to athletes table
                </li>
                <li>Updates timestamp for existing records</li>
                <li>Verifies the column was added successfully</li>
                <li>Safe to run multiple times (uses IF NOT EXISTS)</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
