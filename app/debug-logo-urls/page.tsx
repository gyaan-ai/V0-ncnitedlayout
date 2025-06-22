"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Logo {
  id: number
  name: string
  display_name: string
  type: string
  file_url: string
  file_name: string
  aliases: string[]
}

export default function DebugLogoUrls() {
  const [logos, setLogos] = useState<Logo[]>([])
  const [loading, setLoading] = useState(false)

  const loadLogos = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/logos")
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          setLogos(data.logos)
        }
      }
    } catch (error) {
      console.error("Error loading logos:", error)
    } finally {
      setLoading(false)
    }
  }

  const fixLogoUrl = async (logoId: number, currentUrl: string) => {
    try {
      // If it's already a blob URL, don't change it
      if (currentUrl.includes("blob.vercel-storage.com")) {
        console.log(`Logo ${logoId} already has correct blob URL`)
        return
      }

      console.log(`Attempting to fix logo ${logoId} with URL: ${currentUrl}`)

      // For now, let's just log what needs to be fixed
      // You'll need to re-upload these logos to get proper blob URLs
    } catch (error) {
      console.error(`Error fixing logo ${logoId}:`, error)
    }
  }

  useEffect(() => {
    loadLogos()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Debug Logo URLs</h1>
          <p className="text-gray-600">Check which logos have incorrect URLs</p>
        </div>

        <Button onClick={loadLogos} disabled={loading} className="mb-6">
          {loading ? "Loading..." : "Refresh Logos"}
        </Button>

        <div className="space-y-4">
          {logos.map((logo) => {
            const isStaticPath = !logo.file_url.includes("blob.vercel-storage.com") && !logo.file_url.includes("http")
            const isBlobUrl = logo.file_url.includes("blob.vercel-storage.com")

            return (
              <Card
                key={logo.id}
                className={isStaticPath ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{logo.display_name}</CardTitle>
                    <div className="flex gap-2">
                      <Badge
                        variant={
                          logo.type === "college" ? "default" : logo.type === "high_school" ? "secondary" : "outline"
                        }
                      >
                        {logo.type}
                      </Badge>
                      {isStaticPath && <Badge variant="destructive">BROKEN URL</Badge>}
                      {isBlobUrl && (
                        <Badge variant="default" className="bg-green-600">
                          CORRECT URL
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <strong>Current URL:</strong>
                      <div className="font-mono text-sm bg-gray-100 p-2 rounded mt-1 break-all">{logo.file_url}</div>
                    </div>

                    <div>
                      <strong>File Name:</strong> {logo.file_name}
                    </div>

                    <div>
                      <strong>Aliases:</strong> {logo.aliases.join(", ")}
                    </div>

                    {/* Test Image Loading */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center">
                        <img
                          src={logo.file_url || "/placeholder.svg"}
                          alt={logo.display_name}
                          className="max-w-full max-h-full object-contain"
                          onError={(e) => {
                            console.log(`❌ Failed to load: ${logo.file_url}`)
                            ;(e.target as HTMLImageElement).style.display = "none"
                          }}
                          onLoad={() => {
                            console.log(`✅ Successfully loaded: ${logo.file_url}`)
                          }}
                        />
                      </div>

                      {isStaticPath && (
                        <div className="text-red-600 text-sm">
                          ❌ This logo needs to be re-uploaded to get a proper blob URL
                        </div>
                      )}

                      {isBlobUrl && <div className="text-green-600 text-sm">✅ This logo has a correct blob URL</div>}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {logos.length === 0 && !loading && (
          <div className="text-center py-8 text-gray-500">
            No logos found. Make sure your database is set up correctly.
          </div>
        )}
      </div>
    </div>
  )
}
