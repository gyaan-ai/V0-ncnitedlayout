"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function DebugLogoMatchingPage() {
  const [searchName, setSearchName] = useState("Presbyterian")
  const [searchType, setSearchType] = useState("college")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const testLogoMatch = async () => {
    setLoading(true)
    try {
      const response = await fetch(`/api/admin/logos/match?name=${encodeURIComponent(searchName)}&type=${searchType}`)
      const data = await response.json()
      setResult(data)
      console.log("Logo match result:", data)
    } catch (error) {
      console.error("Error:", error)
      setResult({ error: "Request failed" })
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Debug Logo Matching</h1>

        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">Test Logo Search</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search Name</label>
              <Input value={searchName} onChange={(e) => setSearchName(e.target.value)} placeholder="Enter logo name" />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value)}
                className="w-full p-2 border rounded"
              >
                <option value="">Any</option>
                <option value="college">College</option>
                <option value="university">University</option>
                <option value="high_school">High School</option>
                <option value="club">Club</option>
                <option value="team">Team</option>
              </select>
            </div>

            <div className="flex items-end">
              <Button onClick={testLogoMatch} disabled={loading} className="w-full">
                {loading ? "Searching..." : "Search Logo"}
              </Button>
            </div>
          </div>

          {result && (
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-2">Result:</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Quick Tests</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[
              { name: "Presbyterian", type: "college" },
              { name: "Presbyterian College", type: "college" },
              { name: "UNC", type: "university" },
              { name: "RAW", type: "club" },
              { name: "NC United Blue", type: "team" },
            ].map((test, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchName(test.name)
                  setSearchType(test.type)
                }}
              >
                {test.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
