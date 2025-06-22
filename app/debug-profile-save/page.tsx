"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, XCircle, RefreshCw } from "lucide-react"

export default function DebugProfileSave() {
  const [testData, setTestData] = useState({
    id: "",
    first_name: "Liam",
    last_name: "Hickey",
    email: "liam@example.com",
  })
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [availableAthletes, setAvailableAthletes] = useState([])
  const [loadingAthletes, setLoadingAthletes] = useState(false)
  const [athletesError, setAthletesError] = useState(null)

  const fetchAthletes = async () => {
    setLoadingAthletes(true)
    setAthletesError(null)
    try {
      console.log("🔍 Fetching athletes...")
      const response = await fetch("/api/athletes")
      const data = await response.json()

      console.log("📊 Athletes response:", data)

      if (data.success) {
        setAvailableAthletes(data.athletes || [])
        // Auto-select first athlete if available
        if (data.athletes && data.athletes.length > 0) {
          const firstAthlete = data.athletes[0]
          setTestData({
            id: firstAthlete.id,
            first_name: firstAthlete.first_name || "Test",
            last_name: firstAthlete.last_name || "User",
            email: firstAthlete.email || "test@example.com",
          })
        }
      } else {
        setAthletesError(data.error || "Failed to fetch athletes")
      }
    } catch (error) {
      console.error("❌ Failed to fetch athletes:", error)
      setAthletesError("Network error fetching athletes")
    } finally {
      setLoadingAthletes(false)
    }
  }

  useEffect(() => {
    fetchAthletes()
  }, [])

  const runTest = async () => {
    if (!testData.id) {
      setResult({
        success: false,
        error: "No athlete selected",
        details: "Please select an athlete from the dropdown first",
      })
      return
    }

    setLoading(true)
    try {
      console.log("🧪 Testing profile save with data:", testData)

      const response = await fetch("/api/debug-profile-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testData),
      })

      const data = await response.json()
      console.log("📊 Test result:", data)
      setResult(data)
    } catch (error) {
      console.error("❌ Test failed:", error)
      setResult({
        success: false,
        error: "Network error",
        details: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  const createTestAthlete = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/athletes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: "Test",
          last_name: "Athlete",
          email: "test@example.com",
        }),
      })

      const data = await response.json()
      if (data.success) {
        await fetchAthletes() // Refresh the list
      }
    } catch (error) {
      console.error("Failed to create test athlete:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Profile Save Debug</h1>
          <p className="text-gray-600 mt-2">Testing why profile updates aren't working</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Test Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Test Profile Save
              <Button variant="outline" size="sm" onClick={fetchAthletes} disabled={loadingAthletes}>
                <RefreshCw className={`h-4 w-4 ${loadingAthletes ? "animate-spin" : ""}`} />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Select Athlete</Label>
              {loadingAthletes ? (
                <div className="p-2 text-center text-gray-500">Loading athletes...</div>
              ) : athletesError ? (
                <div className="p-2 text-center text-red-500">
                  Error: {athletesError}
                  <Button variant="outline" size="sm" onClick={createTestAthlete} className="ml-2">
                    Create Test Athlete
                  </Button>
                </div>
              ) : availableAthletes.length === 0 ? (
                <div className="p-2 text-center text-gray-500">
                  No athletes found
                  <Button variant="outline" size="sm" onClick={createTestAthlete} className="ml-2">
                    Create Test Athlete
                  </Button>
                </div>
              ) : (
                <select
                  className="w-full p-2 border border-gray-300 rounded"
                  value={testData.id}
                  onChange={(e) => {
                    const selectedAthlete = availableAthletes.find((a) => a.id === e.target.value)
                    if (selectedAthlete) {
                      setTestData({
                        id: selectedAthlete.id,
                        first_name: selectedAthlete.first_name || "Test",
                        last_name: selectedAthlete.last_name || "User",
                        email: selectedAthlete.email || "test@example.com",
                      })
                    }
                  }}
                >
                  <option value="">Select an athlete...</option>
                  {availableAthletes.map((athlete) => (
                    <option key={athlete.id} value={athlete.id}>
                      {athlete.first_name} {athlete.last_name} ({athlete.id.slice(0, 8)}...)
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div>
              <Label>Athlete ID (UUID)</Label>
              <Input
                value={testData.id}
                onChange={(e) => setTestData({ ...testData, id: e.target.value })}
                placeholder="Enter athlete UUID manually if needed"
                className="font-mono text-xs"
              />
            </div>

            <div>
              <Label>First Name</Label>
              <Input
                value={testData.first_name}
                onChange={(e) => setTestData({ ...testData, first_name: e.target.value })}
                placeholder="First name"
              />
            </div>
            <div>
              <Label>Last Name</Label>
              <Input
                value={testData.last_name}
                onChange={(e) => setTestData({ ...testData, last_name: e.target.value })}
                placeholder="Last name"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                value={testData.email}
                onChange={(e) => setTestData({ ...testData, email: e.target.value })}
                placeholder="Email"
              />
            </div>
            <Button onClick={runTest} disabled={loading || !testData.id} className="w-full">
              {loading ? "Testing..." : "Run Save Test"}
            </Button>
          </CardContent>
        </Card>

        {/* Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {result?.success ? (
                <CheckCircle className="h-5 w-5 text-green-600" />
              ) : result ? (
                <XCircle className="h-5 w-5 text-red-600" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
              )}
              Test Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!result ? (
              <p className="text-gray-500">Run a test to see results</p>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant={result.success ? "default" : "destructive"}>
                    {result.success ? "SUCCESS" : "FAILED"}
                  </Badge>
                </div>

                {result.error && (
                  <div className="bg-red-50 border border-red-200 rounded p-3">
                    <p className="font-semibold text-red-800">Error: {result.error}</p>
                    {result.details && <p className="text-red-600 text-sm mt-1">{result.details}</p>}
                    {result.hint && <p className="text-red-600 text-sm mt-1">Hint: {result.hint}</p>}
                    {result.code && <p className="text-red-600 text-sm mt-1">Code: {result.code}</p>}
                  </div>
                )}

                {result.results && (
                  <div className="space-y-2">
                    <h3 className="font-semibold">Test Results:</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Database Connected:</span>
                        <Badge variant={result.results.database_connected ? "default" : "destructive"}>
                          {result.results.database_connected ? "Yes" : "No"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Athlete Found:</span>
                        <Badge variant={result.results.athlete_found ? "default" : "destructive"}>
                          {result.results.athlete_found ? "Yes" : "No"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span>Update Successful:</span>
                        <Badge variant={result.results.update_successful ? "default" : "destructive"}>
                          {result.results.update_successful ? "Yes" : "No"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}

                {result.results?.updated_data && (
                  <div className="bg-green-50 border border-green-200 rounded p-3">
                    <p className="font-semibold text-green-800">Updated Data:</p>
                    <pre className="text-xs text-green-700 mt-1 overflow-auto">
                      {JSON.stringify(result.results.updated_data, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Debug Info */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Debug Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold">Available Athletes:</h4>
              <p className="text-gray-600">{availableAthletes.length} found</p>
            </div>
            <div>
              <h4 className="font-semibold">Selected ID:</h4>
              <p className="text-gray-600 font-mono text-xs">{testData.id || "None"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
