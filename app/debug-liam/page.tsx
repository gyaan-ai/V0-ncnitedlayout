"use client"

import { useEffect, useState } from "react"

export default function DebugLiam() {
  const [liamData, setLiamData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchLiam() {
      try {
        const response = await fetch("/api/debug-liam")
        const data = await response.json()
        setLiamData(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchLiam()
  }, [])

  if (loading) return <div className="p-8">Loading Liam's data...</div>
  if (error) return <div className="p-8 text-red-600">Error: {error}</div>

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Liam's Record</h1>
      <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(liamData, null, 2)}</pre>
    </div>
  )
}
