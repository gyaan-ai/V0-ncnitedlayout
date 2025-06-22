"use client"

import { useState } from "react"

export default function DebugOpenAIActivity() {
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const checkOpenAIActivity = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/debug-openai-activity")
      const data = await response.json()
      setResults(data)
    } catch (error) {
      setResults({ error: "Failed to check OpenAI activity" })
    }
    setLoading(false)
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">🤖 Debug OpenAI Activity</h1>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
        <h2 className="font-bold text-yellow-800 mb-2">Investigating Data Resets</h2>
        <p className="text-yellow-700">
          Checking if OpenAI integration is automatically generating "Test Headline" and "Test Bio" content.
        </p>
      </div>

      <button
        onClick={checkOpenAIActivity}
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Checking..." : "Check OpenAI Activity"}
      </button>

      {results && (
        <div className="mt-6 bg-white border rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4">Results:</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">{JSON.stringify(results, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
