"use client"

import { useState } from "react"

export default function TestSimpleMatching() {
  const [results, setResults] = useState<any[]>([])

  const testCases = [
    { name: "Corinth Holders", type: "high_school" },
    { name: "Presbyterian", type: "college" },
    { name: "Presbyterian College", type: "college" },
    { name: "UNC", type: "university" },
    { name: "RAW", type: "club" },
    { name: "NC United Blue", type: "team" },
  ]

  const runTests = async () => {
    const testResults = []

    for (const test of testCases) {
      try {
        const response = await fetch(`/api/admin/logos/match?name=${encodeURIComponent(test.name)}&type=${test.type}`)
        const data = await response.json()
        testResults.push({
          ...test,
          success: data.success,
          result: data.success ? data.logo.name : data.error,
          logoUrl: data.success ? data.logo.file_url : null,
        })
      } catch (error) {
        testResults.push({
          ...test,
          success: false,
          result: "API Error",
          logoUrl: null,
        })
      }
    }

    setResults(testResults)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Simple Logo Matching Test</h1>

        <button onClick={runTests} className="bg-blue-600 text-white px-6 py-2 rounded mb-8">
          Run All Tests
        </button>

        <div className="space-y-4">
          {results.map((result, index) => (
            <div key={index} className="bg-white p-4 rounded shadow">
              <div className="flex items-center justify-between">
                <div>
                  <strong>Search:</strong> "{result.name}" (type: {result.type})
                </div>
                <div className={result.success ? "text-green-600" : "text-red-600"}>
                  {result.success ? "✅ SUCCESS" : "❌ FAILED"}
                </div>
              </div>
              <div className="mt-2">
                <strong>Result:</strong> {result.result}
              </div>
              {result.logoUrl && (
                <div className="mt-2">
                  <img src={result.logoUrl || "/placeholder.svg"} alt="Logo" className="w-12 h-12 object-contain" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
