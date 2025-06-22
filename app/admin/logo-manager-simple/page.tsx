"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Upload, FolderPlus } from "lucide-react"

export default function LogoManagerSimplePage() {
  const [setupStatus, setSetupStatus] = useState<string>("")
  const [uploadStatus, setUploadStatus] = useState<Record<string, string>>({})
  const [logoFiles, setLogoFiles] = useState<Record<string, File | null>>({
    college: null,
    highSchool: null,
    club: null,
  })
  const [isUploading, setIsUploading] = useState(false)

  const logoConfig = {
    college: {
      name: "UNC Chapel Hill",
      filename: "unc-chapel-hill.png",
      path: "logos/colleges/",
    },
    highSchool: {
      name: "Cardinal Gibbons High School",
      filename: "cardinal-gibbons.png",
      path: "logos/high-schools/",
    },
    club: {
      name: "RAW Wrestling Club",
      filename: "raw-wrestling.png",
      path: "logos/clubs/",
    },
  }

  const handleSetupDirectories = async () => {
    setSetupStatus("Creating directories...")

    try {
      const response = await fetch("/api/admin/setup-directories", {
        method: "POST",
      })

      const data = await response.json()

      if (data.success) {
        setSetupStatus("✅ Directory structure created successfully!")
      } else {
        setSetupStatus(`❌ Error: ${data.error}`)
      }
    } catch (error) {
      setSetupStatus(`❌ Error: ${error.message}`)
    }
  }

  const handleFileSelect = (type: string, file: File | null) => {
    setLogoFiles((prev) => ({ ...prev, [type]: file }))
  }

  const handleUploadLogo = async (type: string) => {
    const file = logoFiles[type]
    if (!file) {
      setUploadStatus((prev) => ({ ...prev, [type]: "❌ No file selected" }))
      return
    }

    setUploadStatus((prev) => ({ ...prev, [type]: "Uploading..." }))

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("path", logoConfig[type].path)
      formData.append("filename", logoConfig[type].filename)

      const response = await fetch("/api/admin/upload-logo-blob", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (data.success) {
        setUploadStatus((prev) => ({
          ...prev,
          [type]: `✅ Uploaded successfully! URL: ${data.url}`,
        }))
      } else {
        setUploadStatus((prev) => ({
          ...prev,
          [type]: `❌ Upload failed: ${data.error}`,
        }))
      }
    } catch (error) {
      setUploadStatus((prev) => ({
        ...prev,
        [type]: `❌ Upload error: ${error.message}`,
      }))
    }
  }

  const handleUploadAll = async () => {
    setIsUploading(true)

    for (const type of Object.keys(logoConfig)) {
      if (logoFiles[type]) {
        await handleUploadLogo(type)
        // Small delay between uploads
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    }

    setIsUploading(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Simple Logo Manager</h1>

        {/* Step 1: Setup Directories */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderPlus className="h-5 w-5" />
              Step 1: Setup Directory Structure
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">First, we need to create the directory structure for storing logos.</p>
            <Button onClick={handleSetupDirectories} className="mb-4">
              Create Directories
            </Button>
            {setupStatus && (
              <Alert>
                <AlertDescription>{setupStatus}</AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* Step 2: Upload Logos */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="h-5 w-5" />
              Step 2: Upload Logo Files
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(logoConfig).map(([type, config]) => (
                <div key={type} className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">{config.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    Will be saved as: {config.path}
                    {config.filename}
                  </p>

                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex-1">
                      <Label htmlFor={`file-${type}`}>Select Logo File</Label>
                      <Input
                        id={`file-${type}`}
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileSelect(type, e.target.files?.[0] || null)}
                        className="mt-1"
                      />
                    </div>
                    <Button onClick={() => handleUploadLogo(type)} disabled={!logoFiles[type] || isUploading} size="sm">
                      Upload
                    </Button>
                  </div>

                  {uploadStatus[type] && (
                    <Alert className="mt-2">
                      <AlertDescription className="text-sm">{uploadStatus[type]}</AlertDescription>
                    </Alert>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t">
                <Button
                  onClick={handleUploadAll}
                  disabled={isUploading || !Object.values(logoFiles).some((file) => file !== null)}
                  className="w-full"
                >
                  {isUploading ? "Uploading..." : "Upload All Selected Files"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Test Results */}
        <Card>
          <CardHeader>
            <CardTitle>Step 3: Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">After uploading, test your logos and check the commitment cards:</p>
            <div className="flex gap-4">
              <Button variant="outline" asChild>
                <a href="/test-logos" target="_blank" rel="noreferrer">
                  Test Logos
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="/recruiting/commits" target="_blank" rel="noreferrer">
                  View Commitment Cards
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
