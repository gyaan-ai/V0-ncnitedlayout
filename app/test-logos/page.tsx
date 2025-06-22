"use client"

import { useState } from "react"

export default function TestLogosPage() {
  const [logoStatus, setLogoStatus] = useState<Record<string, boolean>>({})

  const testLogos = [
    {
      name: "UNC Chapel Hill",
      path: "/images/logos/colleges/unc-chapel-hill.png",
      id: "unc",
    },
    {
      name: "Cardinal Gibbons",
      path: "/images/logos/high-schools/cardinal-gibbons.png",
      id: "gibbons",
    },
    {
      name: "RAW Wrestling",
      path: "/images/logos/clubs/raw-wrestling.png",
      id: "raw",
    },
  ]

  const handleImageLoad = (id: string) => {
    setLogoStatus((prev) => ({ ...prev, [id]: true }))
  }

  const handleImageError = (id: string) => {
    setLogoStatus((prev) => ({ ...prev, [id]: false }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Logo Test Page</h1>

        <div className="grid gap-6">
          {testLogos.map((logo) => (
            <div key={logo.id} className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4">{logo.name}</h2>
              <p className="text-sm text-gray-600 mb-4">Path: {logo.path}</p>

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center p-2">
                  <img
                    src={logo.path || "/placeholder.svg"}
                    alt={logo.name}
                    className="w-full h-full object-contain"
                    onLoad={() => handleImageLoad(logo.id)}
                    onError={() => handleImageError(logo.id)}
                  />
                </div>

                <div>
                  <p className="font-medium">
                    Status:{" "}
                    {logoStatus[logo.id] === true ? (
                      <span className="text-green-600">✓ Loaded</span>
                    ) : logoStatus[logo.id] === false ? (
                      <span className="text-red-600">✗ Failed</span>
                    ) : (
                      <span className="text-gray-500">Testing...</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="font-semibold mb-2">Instructions:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>
              Create these directories in your project: <code>public/images/logos/colleges/</code>,{" "}
              <code>public/images/logos/high-schools/</code>, <code>public/images/logos/clubs/</code>
            </li>
            <li>Upload your logo files with the exact names shown above</li>
            <li>Refresh this page to test if they load</li>
            <li>Once all show "✓ Loaded", the commitment cards should work</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
