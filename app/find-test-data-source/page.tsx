"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, AlertTriangle, Code, Database, Clock } from "lucide-react"

export default function FindTestDataSource() {
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState(null)

  const searchForTestData = async () => {
    setSearching(true)
    try {
      const response = await fetch("/api/find-test-data-source")
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setSearching(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-red-600">🚨 Find Test Data Source</h1>
          <p className="text-gray-600 mt-2">Locate what's overwriting Liam's AI summary with test data</p>
        </div>
        <Button onClick={searchForTestData} disabled={searching} className="bg-red-600 hover:bg-red-700">
          {searching ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Searching...
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Search Codebase
            </>
          )}
        </Button>
      </div>

      {/* Problem Summary */}
      <Card className="mb-6 border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center text-red-800">
            <AlertTriangle className="h-5 w-5 mr-2" />
            Recurring Data Override Issue
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-red-700">
            <p>• Database updates work initially</p>
            <p>• After ~1 hour, data reverts to "Test Headline" and "Test Bio"</p>
            <p>• This suggests a scheduled process is overwriting the data</p>
            <p>• Last reset: 6/18/2025, 2:09:29 PM</p>
          </div>
        </CardContent>
      </Card>

      {/* Search Results */}
      {results && (
        <div className="space-y-6">
          {/* Code Search Results */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2" />
                Code Search Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.codeSearch?.length > 0 ? (
                <div className="space-y-4">
                  {results.codeSearch.map((result, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{result.file}</h4>
                        <Badge variant="outline">{result.type}</Badge>
                      </div>
                      <div className="space-y-2">
                        {result.matches.map((match, matchIndex) => (
                          <div key={matchIndex} className="bg-gray-100 p-2 rounded text-sm">
                            <p className="text-gray-600">Line {match.line}:</p>
                            <code className="text-red-600">{match.content}</code>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No hardcoded test values found in code</p>
              )}
            </CardContent>
          </Card>

          {/* API Endpoints */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="h-5 w-5 mr-2" />
                Suspicious API Endpoints
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.apiEndpoints?.length > 0 ? (
                <div className="space-y-2">
                  {results.apiEndpoints.map((endpoint, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <span className="font-mono">{endpoint.path}</span>
                      <Badge variant={endpoint.suspicious ? "destructive" : "secondary"}>
                        {endpoint.suspicious ? "Suspicious" : "Normal"}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No suspicious API endpoints found</p>
              )}
            </CardContent>
          </Card>

          {/* Migration Scripts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Migration Scripts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {results.migrationScripts?.length > 0 ? (
                <div className="space-y-2">
                  {results.migrationScripts.map((script, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded">
                      <span className="font-mono">{script.file}</span>
                      <Badge variant={script.hasTestData ? "destructive" : "secondary"}>
                        {script.hasTestData ? "Contains Test Data" : "Clean"}
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">No migration scripts with test data found</p>
              )}
            </CardContent>
          </Card>

          {/* Recommendations */}
          <Card className="border-green-200 bg-green-50">
            <CardHeader>
              <CardTitle className="text-green-800">🎯 Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-green-700">
                {results.recommendations?.map((rec, index) => (
                  <p key={index}>• {rec}</p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
