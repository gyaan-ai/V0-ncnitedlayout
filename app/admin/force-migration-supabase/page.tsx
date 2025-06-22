"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ForceMigrationSupabasePage() {
  const [isRunning, setIsRunning] = useState(false)
  const [result, setResult] = useState<any>(null)

  const runMigration = async () => {
    setIsRunning(true)
    setResult(null)

    try {
      const response = await fetch("/api/admin/force-migration-supabase", {
        method: "POST",
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({
        error: "Migration failed",
        details: error.message,
      })
    } finally {
      setIsRunning(false)
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>🔧 Supabase Database Migration</CardTitle>
          <CardDescription>Add missing columns to the athletes table for tomorrow's data entry</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800">
              <strong>⚠️ Important</strong>
              <br />
              This will add all missing columns to your Supabase athletes table. This is required for all 47 form fields
              to save properly.
            </p>
          </div>

          <Button onClick={runMigration} disabled={isRunning} className="w-full" size="lg">
            {isRunning ? "⏳ Running Migration..." : "🚀 Run Supabase Migration Now"}
          </Button>

          {result && (
            <div
              className={`p-4 rounded-lg ${
                result.success ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
              }`}
            >
              {result.success ? (
                <div className="text-green-800">
                  <p className="font-semibold">✅ Migration completed successfully!</p>
                  <p>Your Supabase database is now ready for data entry!</p>
                </div>
              ) : (
                <div className="text-red-800">
                  <p className="font-semibold">❌ Migration failed</p>
                  <p className="text-sm mt-1">{result.details}</p>
                </div>
              )}
            </div>
          )}

          {result?.success && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-blue-800">
                <strong>🎉 Ready for Data Entry!</strong>
                <br />
                Your Supabase database is now ready for tomorrow's data entry. All fields will save and persist
                properly.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
