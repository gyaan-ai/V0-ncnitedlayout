"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DebugLogoManagerPage() {
  const [logos, setLogos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchLogos()
  }, [])

  const fetchLogos = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/logos", {
        cache: "no-store",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("🔍 Raw API response:", data)

      if (data.success && data.logos) {
        setLogos(data.logos)
        console.log("✅ Logos loaded:", data.logos.length)
        data.logos.forEach((logo, index) => {
          console.log(`Logo ${index + 1}:`, {
            name: logo.name,
            display_name: logo.display_name,
            type: logo.type,
            file_url: logo.file_url,
            file_name: logo.file_name,
          })
        })
      } else {
        console.error("❌ API returned error:", data)
        setError(data.error || "Unknown error")
      }
    } catch (err) {
      console.error("❌ Fetch error:", err)
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const testImageLoad = (url) => {
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(true)
      img.onerror = () => resolve(false)
      img.src = url
    })
  }

  const checkAllImages = async () => {
    console.log("🔍 Testing all image URLs...")
    for (const logo of logos) {
      if (logo.file_url) {
        const canLoad = await testImageLoad(logo.file_url)
        console.log(`${canLoad ? "✅" : "❌"} ${logo.display_name}: ${logo.file_url}`)
      }
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Loading logos...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="text-red-800">Error Loading Logos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">{error}</p>
            <Button onClick={fetchLogos} className="mt-4">
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-4">Debug Logo Manager</h1>
        <div className="flex gap-4 mb-4">
          <Button onClick={fetchLogos}>Refresh Data</Button>
          <Button onClick={checkAllImages} variant="outline">
            Test All Image URLs
          </Button>
        </div>
        <p className="text-gray-600">Found {logos.length} logos in database</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {logos.map((logo) => (
          <Card key={logo.id} className="border">
            <CardHeader>
              <CardTitle className="text-lg">{logo.display_name || logo.name}</CardTitle>
              <p className="text-sm text-gray-500 capitalize">{logo.type}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Image Display */}
                <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center border">
                  {logo.file_url ? (
                    <img
                      src={logo.file_url || "/placeholder.svg"}
                      alt={logo.display_name}
                      className="max-h-full max-w-full object-contain p-2"
                      onLoad={() => console.log("✅ Image loaded:", logo.display_name)}
                      onError={(e) => {
                        console.error("❌ Image failed to load:", logo.display_name, logo.file_url)
                        e.target.style.display = "none"
                        e.target.nextSibling.style.display = "block"
                      }}
                    />
                  ) : (
                    <div className="text-gray-400 text-center">
                      <p>No image URL</p>
                    </div>
                  )}
                  <div className="text-red-500 text-center hidden">
                    <p>Failed to load image</p>
                    <p className="text-xs">{logo.file_url}</p>
                  </div>
                </div>

                {/* Debug Info */}
                <div className="text-xs space-y-1">
                  <p>
                    <strong>ID:</strong> {logo.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {logo.name}
                  </p>
                  <p>
                    <strong>File:</strong> {logo.file_name}
                  </p>
                  <p>
                    <strong>URL:</strong>{" "}
                    <span className="break-all font-mono text-blue-600">{logo.file_url || "None"}</span>
                  </p>
                  <p>
                    <strong>Active:</strong> {logo.is_active ? "Yes" : "No"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {logos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No logos found in database</p>
        </div>
      )}
    </div>
  )
}
