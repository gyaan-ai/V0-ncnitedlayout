"use client"

import { useState } from "react"

export default function DebugDataSources() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const checkAllSources = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/debug-data-sources")
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">🔍 Debug Data Sources</h1>

      <button
        onClick={checkAllSources}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 mb-6"
      >
        {loading ? "Checking..." : "Check All Data Sources"}
      </button>

      {results && (
        <div className="space-y-6">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="font-bold text-blue-800 mb-2">🎯 Direct Supabase Query</h3>
            <p>
              <strong>Headline:</strong> {results.supabase_direct?.generated_headline || "NULL"}
            </p>
            <p>
              <strong>Bio:</strong> {results.supabase_direct?.generated_bio?.substring(0, 100) || "NULL"}...
            </p>
            <p>
              <strong>Updated:</strong> {results.supabase_direct?.updated_at}
            </p>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <h3 className="font-bold text-green-800 mb-2">🔧 Client Query</h3>
            <p>
              <strong>Headline:</strong> {results.client_query?.generated_headline || "NULL"}
            </p>
            <p>
              <strong>Bio:</strong> {results.client_query?.generated_bio?.substring(0, 100) || "NULL"}...
            </p>
            <p>
              <strong>Updated:</strong> {results.client_query?.updated_at}
            </p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h3 className="font-bold text-yellow-800 mb-2">📊 Raw SQL Query</h3>
            <p>
              <strong>Headline:</strong> {results.raw_sql?.generated_headline || "NULL"}
            </p>
            <p>
              <strong>Bio:</strong> {results.raw_sql?.generated_bio?.substring(0, 100) || "NULL"}...
            </p>
            <p>
              <strong>Updated:</strong> {results.raw_sql?.updated_at}
            </p>
          </div>

          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="font-bold text-red-800 mb-2">⚠️ Discrepancies Found</h3>
            <pre className="bg-white p-2 rounded text-xs overflow-auto">
              {JSON.stringify(results.discrepancies, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}
