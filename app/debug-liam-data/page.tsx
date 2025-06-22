"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DebugLiamData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)

  const checkData = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/debug-liam-data")
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkData()
  }, [])

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Debug Liam's Data</h1>
        <Button onClick={checkData} disabled={loading}>
          {loading ? "Loading..." : "Refresh Data"}
        </Button>
      </div>

      {data && (
        <div className="space-y-6">
          {/* Tables Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-orange-600">Database Tables Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p>
                  <strong>Profiles table exists:</strong>
                  <span className={data.tables_exist?.has_profiles ? "text-green-600" : "text-red-600"}>
                    {data.tables_exist?.has_profiles ? " ✓ Yes" : " ✗ No"}
                  </span>
                </p>
                <p>
                  <strong>Athletes table exists:</strong>
                  <span className={data.tables_exist?.has_athletes ? "text-green-600" : "text-red-600"}>
                    {data.tables_exist?.has_athletes ? " ✓ Yes" : " ✗ No"}
                  </span>
                </p>
                <p>
                  <strong>All tables:</strong> {data.tables_exist?.all_tables?.join(", ")}
                </p>
              </div>
              {data.errors && data.errors.length > 0 && (
                <div className="mt-4">
                  <strong className="text-red-600">Errors:</strong>
                  <ul className="list-disc list-inside text-red-600">
                    {data.errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Profiles Table Data */}
          <Card>
            <CardHeader>
              <CardTitle className="text-green-600">Profiles Table Data</CardTitle>
            </CardHeader>
            <CardContent>
              {data.profiles ? (
                <div className="space-y-2">
                  <p>
                    <strong>Weight Class:</strong> {data.profiles.weight_class}
                  </p>
                  <p>
                    <strong>High School:</strong> {data.profiles.high_school}
                  </p>
                  <p>
                    <strong>College:</strong> {data.profiles.college_committed}
                  </p>
                  <p>
                    <strong>Updated:</strong> {data.profiles.updated_at}
                  </p>
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                    {JSON.stringify(data.profiles, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-red-600">No data found in profiles table</p>
              )}
            </CardContent>
          </Card>

          {/* Athletes Table Data */}
          <Card>
            <CardHeader>
              <CardTitle className="text-blue-600">Athletes Table Data</CardTitle>
            </CardHeader>
            <CardContent>
              {data.athletes ? (
                <div className="space-y-2">
                  <p>
                    <strong>Weight Class:</strong> {data.athletes.weight_class}
                  </p>
                  <p>
                    <strong>High School:</strong> {data.athletes.high_school}
                  </p>
                  <p>
                    <strong>College:</strong> {data.athletes.college_committed}
                  </p>
                  <p>
                    <strong>Updated:</strong> {data.athletes.updated_at}
                  </p>
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                    {JSON.stringify(data.athletes, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-red-600">No data found in athletes table</p>
              )}
            </CardContent>
          </Card>

          {/* API Response */}
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-600">Current API Response</CardTitle>
            </CardHeader>
            <CardContent>
              {data.api_response ? (
                <div className="space-y-2">
                  <p>
                    <strong>Weight Class:</strong> {data.api_response.weight_class}
                  </p>
                  <p>
                    <strong>Source:</strong> {data.api_response.source}
                  </p>
                  <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
                    {JSON.stringify(data.api_response, null, 2)}
                  </pre>
                </div>
              ) : (
                <p className="text-red-600">No API response</p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
