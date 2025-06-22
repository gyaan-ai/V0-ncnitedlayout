"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DebugSupabase() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const checkSupabase = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/debug-supabase-connection")
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
        <h1 className="text-3xl font-bold">Debug Supabase Database</h1>
        <Button onClick={checkSupabase} disabled={loading}>
          {loading ? "Checking..." : "Check Supabase"}
        </Button>
      </div>

      {result && (
        <div className="space-y-6">
          {/* Connection Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Connection Status</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                <strong>Connection Test:</strong>
                <span className={result.connection_test === "SUCCESS" ? "text-green-600" : "text-red-600"}>
                  {result.connection_test === "SUCCESS" ? " ✓ SUCCESS" : " ✗ FAILED"}
                </span>
              </p>
              <p>
                <strong>Available Tables:</strong> {result.tables?.join(", ") || "None found"}
              </p>
              {result.errors && result.errors.length > 0 && (
                <div className="mt-4">
                  <strong className="text-red-600">Errors:</strong>
                  <ul className="list-disc list-inside text-red-600">
                    {result.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Athletes Data */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Athletes Table Data</CardTitle>
            </CardHeader>
            <CardContent>
              {result.athletes_data && result.athletes_data.length > 0 ? (
                <div>
                  <p>
                    <strong>Found {result.athletes_data.length} athletes</strong>
                  </p>
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto mt-2">
                    {JSON.stringify(result.athletes_data, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-red-600">No athletes data found</p>
              )}
            </CardContent>
          </Card>

          {/* Profiles Data */}
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">Profiles Table Data</CardTitle>
            </CardHeader>
            <CardContent>
              {result.profiles_data && result.profiles_data.length > 0 ? (
                <div>
                  <p>
                    <strong>Found {result.profiles_data.length} profiles</strong>
                  </p>
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto mt-2">
                    {JSON.stringify(result.profiles_data, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-red-600">No profiles data found</p>
              )}
            </CardContent>
          </Card>

          {/* Liam Search Results */}
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">Liam Search Results</CardTitle>
            </CardHeader>
            <CardContent>
              {result.liam_search ? (
                <div className="space-y-4">
                  <div>
                    <strong>Athletes table:</strong>
                    {result.liam_search.athletes && result.liam_search.athletes.length > 0 ? (
                      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto mt-2">
                        {JSON.stringify(result.liam_search.athletes, null, 2)}
                      </pre>
                    ) : (
                      <p className="text-red-600">No Liam found in athletes table</p>
                    )}
                  </div>
                  <div>
                    <strong>Profiles table:</strong>
                    {result.liam_search.profiles && result.liam_search.profiles.length > 0 ? (
                      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto mt-2">
                        {JSON.stringify(result.liam_search.profiles, null, 2)}
                      </pre>
                    ) : (
                      <p className="text-red-600">No Liam found in profiles table</p>
                    )}
                  </div>
                </div>
              ) : (
                <p className="text-red-600">No search results</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
