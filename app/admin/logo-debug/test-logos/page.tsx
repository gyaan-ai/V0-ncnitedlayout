"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, RefreshCw } from "lucide-react"

interface LogoTest {
  name: string
  type: string
  found: boolean
  logo?: any
  error?: string
}

export default function TestLogosPage() {
  const [tests, setTests] = useState<LogoTest[]>([])
  const [loading, setLoading] = useState(false)

  const testCases = [
    { name: "University of North Carolina at Chapel Hill", type: "college" },
    { name: "UNC Chapel Hill", type: "college" },
    { name: "UNC", type: "college" },
    { name: "Cardinal Gibbons High School", type: "high_school" },
    { name: "Cardinal Gibbons", type: "high_school" },
    { name: "RAW Wrestling Club", type: "club" },
    { name: "RAW Wrestling", type: "club" },
    { name: "RAW", type: "club" },
  ]

  const runTests = async () => {
    setLoading(true)
    const results: LogoTest[] = []

    for (const testCase of testCases) {
      try {
        const response = await fetch(
          `/api/admin/logos/match?name=${encodeURIComponent(testCase.name)}&type=${testCase.type}`,
        )
        const data = await response.json()

        results.push({
          name: testCase.name,
          type: testCase.type,
          found: data.found,
          logo: data.logo,
          error: data.error,
        })
      } catch (error) {
        results.push({
          name: testCase.name,
          type: testCase.type,
          found: false,
          error: error instanceof Error ? error.message : "Unknown error",
        })
      }
    }

    setTests(results)
    setLoading(false)
  }

  const checkAllLogos = async () => {
    try {
      const response = await fetch("/api/admin/logos")
      const data = await response.json()
      console.log("All logos in database:", data.logos)
    } catch (error) {
      console.error("Error fetching all logos:", error)
    }
  }

  useEffect(() => {
    runTests()
    checkAllLogos()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-slate-800 font-oswald mb-2">Logo System Debug</h1>
            <p className="text-slate-600">Testing logo matching and retrieval</p>
          </div>

          <div className="mb-6">
            <Button onClick={runTests} disabled={loading} className="mr-4">
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Run Tests
            </Button>
            <Button onClick={checkAllLogos} variant="outline">
              Check Database
            </Button>
          </div>

          <div className="grid gap-4">
            {tests.map((test, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {test.name} ({test.type})
                    </CardTitle>
                    {test.found ? (
                      <Badge variant="default" className="bg-green-600">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Found
                      </Badge>
                    ) : (
                      <Badge variant="destructive">
                        <XCircle className="h-3 w-3 mr-1" />
                        Not Found
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {test.found && test.logo ? (
                    <div className="space-y-2">
                      <p>
                        <strong>Display Name:</strong> {test.logo.display_name}
                      </p>
                      <p>
                        <strong>File URL:</strong> {test.logo.file_url}
                      </p>
                      <p>
                        <strong>Aliases:</strong> {test.logo.aliases?.join(", ") || "None"}
                      </p>

                      {test.logo.file_url && (
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Logo Preview:</p>
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border p-2">
                            <img
                              src={test.logo.file_url || "/placeholder.svg"}
                              alt={test.logo.display_name}
                              className="w-full h-full object-contain"
                              onError={(e) => {
                                console.error(`Failed to load logo: ${test.logo.file_url}`)
                                e.currentTarget.style.display = "none"
                              }}
                              onLoad={() => console.log(`✅ Logo loaded: ${test.logo.file_url}`)}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-red-600">
                      <p>Logo not found in database</p>
                      {test.error && <p className="text-sm">Error: {test.error}</p>}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Quick Fix Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Option 1: Re-run Logo Setup</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    If no logos are found, the database might not be populated.
                  </p>
                  <Button
                    onClick={async () => {
                      try {
                        const response = await fetch("/api/admin/logos/setup", { method: "POST" })
                        const data = await response.json()
                        console.log("Setup result:", data)
                        alert("Logo setup completed. Check console for details.")
                        runTests()
                      } catch (error) {
                        console.error("Setup failed:", error)
                        alert("Setup failed. Check console for details.")
                      }
                    }}
                    variant="outline"
                  >
                    Run Logo Setup
                  </Button>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Option 2: Manual File Check</h4>
                  <p className="text-sm text-gray-600">Check if these files exist in your public directory:</p>
                  <ul className="text-xs text-gray-500 mt-1 space-y-1">
                    <li>• /public/images/logos/colleges/unc-chapel-hill.png</li>
                    <li>• /public/images/logos/high-schools/cardinal-gibbons.png</li>
                    <li>• /public/images/logos/clubs/raw-wrestling.png</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
