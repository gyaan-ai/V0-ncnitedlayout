"use client"

import { useState, useEffect } from "react"
import { DatabaseCommitCard } from "@/components/recruiting/database-commit-card"

export default function TestLiamCard() {
  const [debugInfo, setDebugInfo] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function debugFetch() {
      try {
        const response = await fetch("/api/athletes/by-name?firstName=Liam&lastName=Hickey")
        const data = await response.json()
        setDebugInfo({
          status: response.status,
          data: data,
          error: response.ok ? null : data.error,
        })
      } catch (error) {
        setDebugInfo({
          status: "fetch_error",
          error: error.message,
          data: null,
        })
      } finally {
        setLoading(false)
      }
    }

    debugFetch()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Test Liam's Database Card</h1>
          <p className="text-gray-600">Testing the integration between athlete profile data and commit cards</p>
        </div>

        {/* Debug Information */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
          {loading ? (
            <p>Loading debug info...</p>
          ) : (
            <div className="space-y-4">
              <div>
                <strong>API Status:</strong> {debugInfo.status}
              </div>
              {debugInfo.error && (
                <div className="text-red-600">
                  <strong>Error:</strong> {debugInfo.error}
                </div>
              )}
              {debugInfo.data && (
                <div>
                  <strong>Data Found:</strong>
                  <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto">
                    {JSON.stringify(debugInfo.data, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>

        {/* The Actual Card */}
        <div className="flex justify-center">
          <DatabaseCommitCard firstName="Liam" lastName="Hickey" className="max-w-md" />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            This card pulls data directly from the athletes database and matches logos automatically
          </p>
        </div>
      </div>
    </div>
  )
}
