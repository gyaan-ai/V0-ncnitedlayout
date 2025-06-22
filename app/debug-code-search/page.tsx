"use client"

import { useState } from "react"

export default function DebugCodeSearch() {
  const [searchResults, setSearchResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const searchForTestValues = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/debug-code-search")
      const data = await response.json()
      setSearchResults(data)
    } catch (error) {
      setSearchResults({ error: "Failed to search code" })
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">🔍 Code Search for "Test" Values</h1>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h2 className="font-bold text-blue-800 mb-2">Searching for Hardcoded Test Values</h2>
        <p className="text-blue-700">
          Looking for any "Test Headline", "Test Bio", or similar hardcoded values in the codebase.
        </p>
      </div>

      <button
        onClick={searchForTestValues}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Searching..." : "🔍 Search Code for Test Values"}
      </button>

      {searchResults && (
        <div className="mt-6 bg-white border rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Search Results:</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
            {JSON.stringify(searchResults, null, 2)}
          </pre>
        </div>
      )}
    </div>
  )
}
