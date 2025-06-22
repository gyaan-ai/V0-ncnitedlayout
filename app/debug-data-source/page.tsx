"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, AlertTriangle, Database, Clock } from "lucide-react"
import { toast } from "sonner"

export default function DebugDataSource() {
  const [loading, setLoading] = useState(true)
  const [searchResults, setSearchResults] = useState(null)

  useEffect(() => {
    searchForTestData()
  }, [])

  const searchForTestData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/debug-data-source")

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to search`)
      }

      const data = await response.json()
      console.log("🔍 Search Results:", data)
      setSearchResults(data)
    } catch (error) {
      console.error("Error searching:", error)
      toast.error(`Failed to search: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg">Searching for data sources...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Debug Data Source</h1>
          <p className="text-gray-600 mt-2">Find what's overwriting Liam's AI summary every hour</p>
        </div>
        <Button onClick={searchForTestData} variant="outline">
          <Search className="h-4 w-4 mr-2" />
          Search Again
        </Button>
      </div>

      {/* Alert */}
      <Card className="mb-6 border-orange-200 bg-orange-50">
        <CardHeader>
          <CardTitle className="flex items-center text-orange-800">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Recurring Data Override Detected
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-orange-700">
            <p className="mb-2">
              <strong>Issue:</strong> AI summary data gets reset to "Test Headline" and "Test Bio" every hour
            </p>
            <p className="mb-2">
              <strong>Pattern:</strong> Database updates work initially, then get overwritten
            </p>
            <p>
              <strong>Likely Cause:</strong> Scheduled job, migration, or API call running periodically
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {searchResults && (
        <>
          {/* Code Search Results */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Code Search Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Files containing "Test Headline":</h3>
                  {searchResults.codeSearch?.testHeadline?.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {searchResults.codeSearch.testHeadline.map((file, index) => (
                        <li key={index} className="text-sm font-mono bg-gray-100 p-2 rounded">
                          {file}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No files found</p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Files containing "Test Bio":</h3>
                  {searchResults.codeSearch?.testBio?.length > 0 ? (
                    <ul className="list-disc list-inside space-y-1">
                      {searchResults.codeSearch.testBio.map((file, index) => (
                        <li key={index} className="text-sm font-mono bg-gray-100 p-2 rounded">
                          {file}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No files found</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Database Search Results */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Database Search Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">Records with "Test Headline":</h3>
                  {searchResults.databaseSearch?.testHeadlineRecords?.length > 0 ? (
                    <div className="space-y-2">
                      {searchResults.databaseSearch.testHeadlineRecords.map((record, index) => (
                        <div key={index} className="p-3 bg-red-50 border border-red-200 rounded">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">
                              {record.first_name} {record.last_name}
                            </span>
                            <Badge variant="outline">{record.id.substring(0, 8)}...</Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Email: {record.email}</p>
                            <p>Updated: {new Date(record.updated_at).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No records found</p>
                  )}
                </div>

                <div>
                  <h3 className="font-semibold mb-2">Records with "Test Bio":</h3>
                  {searchResults.databaseSearch?.testBioRecords?.length > 0 ? (
                    <div className="space-y-2">
                      {searchResults.databaseSearch.testBioRecords.map((record, index) => (
                        <div key={index} className="p-3 bg-red-50 border border-red-200 rounded">
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">
                              {record.first_name} {record.last_name}
                            </span>
                            <Badge variant="outline">{record.id.substring(0, 8)}...</Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Email: {record.email}</p>
                            <p>Updated: {new Date(record.updated_at).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500">No records found</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Potential Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Potential Recurring Sources
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
                  <h4 className="font-semibold text-yellow-800">Check These Locations:</h4>
                  <ul className="list-disc list-inside mt-2 text-sm text-yellow-700 space-y-1">
                    <li>API routes that might be called by external services</li>
                    <li>Migration scripts in /scripts/ folder</li>
                    <li>Seed data or default values in database schema</li>
                    <li>Cron jobs or scheduled tasks</li>
                    <li>External webhooks or integrations</li>
                    <li>Development/testing code that might be running in production</li>
                  </ul>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded">
                  <h4 className="font-semibold text-blue-800">Next Steps:</h4>
                  <ol className="list-decimal list-inside mt-2 text-sm text-blue-700 space-y-1">
                    <li>Check server logs for recurring API calls</li>
                    <li>Look for any scheduled jobs or cron tasks</li>
                    <li>Search for hardcoded "Test Headline" and "Test Bio" values</li>
                    <li>Check if any migration scripts are running repeatedly</li>
                    <li>Monitor database changes over time</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
