"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

export default function TestLogosSimple() {
  const [logoUrls, setLogoUrls] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const testLogos = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/admin/get-logo-urls", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          logos: [
            { type: "college", path: "logos/colleges/unc-chapel-hill.png" },
            { type: "highSchool", path: "logos/high-schools/cardinal-gibbons.png" },
            { type: "club", path: "logos/clubs/raw-wrestling.png" },
          ],
        }),
      })

      const data = await response.json()

      if (data.success) {
        setLogoUrls(data.urls)
      } else {
        setError(data.error || "Failed to fetch logos")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Logo Test - Simple</h1>

      <Button onClick={testLogos} disabled={loading} className="mb-6">
        {loading ? "Testing..." : "Test Logo URLs"}
      </Button>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">Error: {error}</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["college", "highSchool", "club"].map((type) => (
          <div key={type} className="border rounded-lg p-4">
            <h3 className="font-semibold mb-2 capitalize">{type} Logo</h3>
            {logoUrls[type] ? (
              <div>
                <img
                  src={logoUrls[type] || "/placeholder.svg"}
                  alt={`${type} logo`}
                  className="w-20 h-20 object-contain mb-2"
                />
                <p className="text-sm text-green-600">✓ Found</p>
                <p className="text-xs text-gray-500 break-all">{logoUrls[type]}</p>
              </div>
            ) : (
              <div className="w-20 h-20 bg-gray-200 rounded flex items-center justify-center mb-2">
                <span className="text-gray-500">No Logo</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
