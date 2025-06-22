"use client"

import { useState, useEffect } from "react"

export default function TestLogoDebug() {
  const [logoData, setLogoData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLogoData() {
      try {
        const response = await fetch("/api/debug-logos")
        const data = await response.json()
        setLogoData(data)
      } catch (error) {
        console.error("Error fetching logo data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchLogoData()
  }, [])

  if (loading) {
    return <div className="p-8">Loading logo debug data...</div>
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Logo Debug Information</h1>

      <div className="grid gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Search Results for Liam's Organizations</h2>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-green-600">RAW Wrestling Club:</h3>
              <pre className="text-sm bg-gray-100 p-2 rounded">{JSON.stringify(logoData?.searches?.raw, null, 2)}</pre>
            </div>

            <div>
              <h3 className="font-medium text-blue-600">UNC College:</h3>
              <pre className="text-sm bg-gray-100 p-2 rounded">{JSON.stringify(logoData?.searches?.unc, null, 2)}</pre>
            </div>

            <div>
              <h3 className="font-medium text-red-600">NC United Team:</h3>
              <pre className="text-sm bg-gray-100 p-2 rounded">
                {JSON.stringify(logoData?.searches?.ncUnited, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">All Logos in Database</h2>
          <div className="overflow-auto max-h-96">
            <pre className="text-xs">{JSON.stringify(logoData?.allLogos, null, 2)}</pre>
          </div>
        </div>
      </div>
    </div>
  )
}
