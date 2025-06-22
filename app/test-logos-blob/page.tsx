"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestLogosBlobPage() {
  const [logoUrls, setLogoUrls] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string>("")
  const [blobInfo, setBlobInfo] = useState<any>(null)

  const testLogos = [
    {
      name: "UNC Chapel Hill",
      path: "logos/colleges/unc-chapel-hill.png",
      type: "college",
    },
    {
      name: "Cardinal Gibbons",
      path: "logos/high-schools/cardinal-gibbons.png",
      type: "highSchool",
    },
    {
      name: "RAW Wrestling",
      path: "logos/clubs/raw-wrestling.png",
      type: "club",
    },
  ]

  const fetchLogoUrls = async () => {
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/admin/get-logo-urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          logos: testLogos.map((logo) => ({
            type: logo.type,
            path: logo.path,
          })),
        }),
      })

      const data = await response.json()

      if (data.success) {
        setLogoUrls(data.urls)
        setBlobInfo(data)
      } else {
        setError(data.error || "Failed to fetch logo URLs")
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLogoUrls()
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Logo Test (Blob URLs)</h1>

        <div className="mb-6">
          <Button onClick={fetchLogoUrls} disabled={loading}>
            {loading ? "Loading..." : "Refresh Logo URLs"}
          </Button>
        </div>

        {error && (
          <Card className="mb-6 border-red-200">
            <CardContent className="pt-6">
              <p className="text-red-600">Error: {error}</p>
            </CardContent>
          </Card>
        )}

        <div className="grid gap-6 mb-8">
          {testLogos.map((logo) => {
            const logoUrl = logoUrls[logo.type]
            const hasLogo = !!logoUrl

            return (
              <Card key={logo.type}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    {logo.name}
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        hasLogo ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {hasLogo ? "✓ Found" : "✗ Missing"}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">Expected path: {logo.path}</p>

                  {hasLogo ? (
                    <div className="space-y-2">
                      <p className="text-sm text-green-600 break-all">Blob URL: {logoUrl}</p>
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center p-2">
                        <img
                          src={logoUrl || "/placeholder.svg"}
                          alt={logo.name}
                          className="w-full h-full object-contain"
                          onError={() => console.error(`Failed to load ${logo.name} logo`)}
                          onLoad={() => console.log(`Successfully loaded ${logo.name} logo`)}
                        />
                      </div>
                    </div>
                  ) : (
                    <p className="text-red-600">Logo not found in blob storage</p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>

        {blobInfo && (
          <Card>
            <CardHeader>
              <CardTitle>Blob Storage Debug Info</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-2">Total blobs found: {blobInfo.totalBlobs}</p>
              <details className="mt-4">
                <summary className="cursor-pointer font-medium">Available Blobs</summary>
                <div className="mt-2 space-y-1 max-h-60 overflow-y-auto">
                  {blobInfo.availableBlobs?.map((blob, index) => (
                    <div key={index} className="text-xs bg-gray-100 p-2 rounded">
                      <p>
                        <strong>Path:</strong> {blob.pathname}
                      </p>
                      <p className="break-all">
                        <strong>URL:</strong> {blob.url}
                      </p>
                    </div>
                  ))}
                </div>
              </details>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
