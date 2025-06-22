"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CheckCircle, AlertCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface UploadResult {
  success: boolean
  message: string
  path?: string
}

export default function LogoUploadPage() {
  const [uploading, setUploading] = useState(false)
  const [results, setResults] = useState<Record<string, UploadResult>>({})

  const logoRequirements = [
    {
      id: "college",
      name: "UNC Chapel Hill Logo",
      path: "/images/logos/colleges/unc-chapel-hill.png",
      description: "University of North Carolina at Chapel Hill logo",
    },
    {
      id: "highschool",
      name: "Cardinal Gibbons Logo",
      path: "/images/logos/high-schools/cardinal-gibbons.png",
      description: "Cardinal Gibbons High School logo",
    },
    {
      id: "club",
      name: "RAW Wrestling Logo",
      path: "/images/logos/clubs/raw-wrestling.png",
      description: "RAW Wrestling Club logo",
    },
  ]

  const handleFileUpload = async (logoId: string, file: File, targetPath: string) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("path", targetPath)

    try {
      const response = await fetch("/api/admin/upload-logo", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()
      setResults((prev) => ({
        ...prev,
        [logoId]: result,
      }))
    } catch (error) {
      setResults((prev) => ({
        ...prev,
        [logoId]: {
          success: false,
          message: error instanceof Error ? error.message : "Upload failed",
        },
      }))
    }
  }

  const testLogoPaths = async () => {
    setUploading(true)
    const testResults: Record<string, UploadResult> = {}

    for (const logo of logoRequirements) {
      try {
        const response = await fetch(logo.path)
        testResults[logo.id] = {
          success: response.ok,
          message: response.ok ? "Logo file exists and is accessible" : `File not found (${response.status})`,
          path: logo.path,
        }
      } catch (error) {
        testResults[logo.id] = {
          success: false,
          message: "Failed to check file existence",
        }
      }
    }

    setResults(testResults)
    setUploading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-slate-800 font-oswald mb-2">Logo Upload Manager</h1>
            <p className="text-slate-600">Upload logos to the correct directory structure</p>
          </div>

          <div className="mb-6">
            <Button onClick={testLogoPaths} disabled={uploading}>
              {uploading ? "Testing..." : "Test Current Logo Paths"}
            </Button>
          </div>

          <div className="grid gap-6">
            {logoRequirements.map((logo) => (
              <Card key={logo.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{logo.name}</CardTitle>
                    {results[logo.id] && (
                      <Badge variant={results[logo.id].success ? "default" : "destructive"}>
                        {results[logo.id].success ? (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        ) : (
                          <AlertCircle className="h-3 w-3 mr-1" />
                        )}
                        {results[logo.id].success ? "Ready" : "Missing"}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">{logo.description}</p>
                  <p className="text-xs text-gray-500 font-mono">{logo.path}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor={`file-${logo.id}`}>Upload Logo File</Label>
                      <Input
                        id={`file-${logo.id}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleFileUpload(logo.id, file, logo.path)
                          }
                        }}
                      />
                    </div>

                    {results[logo.id] && (
                      <div className="mt-4">
                        <p className={`text-sm ${results[logo.id].success ? "text-green-600" : "text-red-600"}`}>
                          {results[logo.id].message}
                        </p>

                        {results[logo.id].success && results[logo.id].path && (
                          <div className="mt-2">
                            <p className="text-sm font-medium mb-2">Preview:</p>
                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border p-2">
                              <img
                                src={results[logo.id].path || "/placeholder.svg"}
                                alt={logo.name}
                                className="w-full h-full object-contain"
                                onError={() => console.error(`Preview failed for ${logo.name}`)}
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Manual Setup Instructions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-600">
                  If the upload tool doesn't work, you can manually create these directories and upload the files:
                </p>

                <div className="bg-gray-100 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">Required Directory Structure:</h4>
                  <pre className="text-xs text-gray-700">
                    {`public/
├── images/
    └── logos/
        ├── colleges/
        │   └── unc-chapel-hill.png
        ├── high-schools/
        │   └── cardinal-gibbons.png
        └── clubs/
            └── raw-wrestling.png`}
                  </pre>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Steps:</h4>
                  <ol className="text-sm text-gray-600 space-y-1 list-decimal list-inside">
                    <li>Create the directory structure shown above in your project's public folder</li>
                    <li>Upload your logo files with the exact names shown</li>
                    <li>Ensure files are PNG format for best compatibility</li>
                    <li>Test the paths using the "Test Current Logo Paths" button</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
