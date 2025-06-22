"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DebugLogoManagerAPI() {
  const [apiData, setApiData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testAPI = async () => {
    setLoading(true)
    setError(null)
    try {
      console.log("🔄 Testing /api/admin/logos endpoint...")
      const response = await fetch("/api/admin/logos")
      console.log("📡 Response status:", response.status)
      console.log("📡 Response headers:", Object.fromEntries(response.headers.entries()))

      const data = await response.json()
      console.log("📊 Response data:", data)

      setApiData({
        status: response.status,
        success: data.success,
        logoCount: data.logos?.length || 0,
        logos: data.logos || [],
        error: data.error || null,
      })
    } catch (err) {
      console.error("❌ API test failed:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    testAPI()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Debug Logo Manager API</h1>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={testAPI} disabled={loading} className="mb-4">
                {loading ? "Testing..." : "Test API Again"}
              </Button>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
                  <h3 className="font-semibold text-red-800">Error:</h3>
                  <p className="text-red-700">{error}</p>
                </div>
              )}

              {apiData && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <strong>Status:</strong> {apiData.status}
                    </div>
                    <div>
                      <strong>Success:</strong> {apiData.success ? "✅" : "❌"}
                    </div>
                    <div>
                      <strong>Logo Count:</strong> {apiData.logoCount}
                    </div>
                    <div>
                      <strong>Has Error:</strong> {apiData.error ? "❌" : "✅"}
                    </div>
                  </div>

                  {apiData.error && (
                    <div className="bg-red-50 border border-red-200 rounded p-4">
                      <h3 className="font-semibold text-red-800">API Error:</h3>
                      <p className="text-red-700">{apiData.error}</p>
                    </div>
                  )}

                  {apiData.logos && apiData.logos.length > 0 && (
                    <div>
                      <h3 className="font-semibold mb-2">Logos Found:</h3>
                      <div className="space-y-2">
                        {apiData.logos.map((logo: any, index: number) => (
                          <Card key={index} className="p-4">
                            <div className="flex items-center gap-4">
                              <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                                <img
                                  src={logo.file_url || "/placeholder.svg"}
                                  alt={logo.display_name}
                                  className="max-w-full max-h-full object-contain"
                                  onError={(e) => {
                                    console.error(`Failed to load: ${logo.file_url}`)
                                    ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=40&width=40"
                                  }}
                                  onLoad={() => {
                                    console.log(`Loaded successfully: ${logo.file_url}`)
                                  }}
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold">{logo.display_name}</h4>
                                <p className="text-sm text-gray-600">Type: {logo.type}</p>
                                <p className="text-xs text-gray-500 break-all">{logo.file_url}</p>
                                <p className="text-xs text-gray-500">
                                  Aliases: {Array.isArray(logo.aliases) ? logo.aliases.join(", ") : "None"}
                                </p>
                              </div>
                              <div className="text-right">
                                <div
                                  className={`px-2 py-1 rounded text-xs ${logo.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                                >
                                  {logo.is_active ? "Active" : "Inactive"}
                                </div>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
