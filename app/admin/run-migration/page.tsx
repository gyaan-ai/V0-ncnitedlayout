"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function RunMigrationPage() {
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const runMigration = async () => {
    setIsRunning(true)
    setError(null)
    setResult(null)

    try {
      console.log("🚀 Starting migration...")

      const response = await fetch("/api/admin/run-migration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
        console.log("✅ Migration completed:", data)
      } else {
        setError(data.error || "Migration failed")
        console.error("❌ Migration failed:", data)
      }
    } catch (err) {
      setError(err.message)
      console.error("❌ Migration error:", err)
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>🔧 Database Migration</CardTitle>
          <CardDescription>Add missing columns to the athletes table for tomorrow's data entry</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-semibold text-yellow-800 mb-2">⚠️ Important</h3>
            <p className="text-yellow-700 text-sm">
              This will add all missing columns to your athletes table. This is required for all 47 form fields to save
              properly.
            </p>
          </div>

          <Button onClick={runMigration} disabled={isRunning} className="w-full" size="lg">
            {isRunning ? "🔄 Running Migration..." : "🚀 Run Migration Now"}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>
                <strong>Error:</strong> {error}
              </AlertDescription>
            </Alert>
          )}

          {result && (
            <Alert>
              <AlertDescription>
                <div className="space-y-2">
                  <div>
                    <strong>✅ Migration completed successfully!</strong>
                  </div>
                  <div>Added {result.columnsAdded} new columns</div>
                  <div>Total columns now: {result.totalColumns}</div>
                  <div className="text-sm text-gray-600 mt-2">You can now save all 47 form fields without errors!</div>
                </div>
              </AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <h4 className="font-semibold text-green-800 mb-2">🎉 Ready for Data Entry!</h4>
              <p className="text-green-700 text-sm">
                Your database is now ready for tomorrow's data entry. All fields will save and persist properly.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
