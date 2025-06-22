"use client"

import { useState, useEffect } from "react"

export default function DebugAthletesListPage() {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/debug-athletes-list")
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`)
        }
        const result = await response.json()
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Debug: Athletes List</h1>
        <p>Loading...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Debug: Athletes List</h1>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <strong>Error:</strong> {error}
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Debug: Athletes List</h1>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Summary</h2>
        <p>Total Athletes: {data.count}</p>
        <p>Committed Athletes: {data.committed.length}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">All Athletes</h2>
        <div className="bg-gray-100 p-4 rounded">
          <pre className="text-sm overflow-auto">{JSON.stringify(data.athletes, null, 2)}</pre>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Committed Athletes Only</h2>
        <div className="bg-green-100 p-4 rounded">
          <pre className="text-sm overflow-auto">{JSON.stringify(data.committed, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}
