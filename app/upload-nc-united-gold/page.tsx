"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function UploadNCUnitedGoldPage() {
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const uploadGoldLogo = async () => {
    setUploading(true)
    try {
      // First upload the image to blob storage
      const response = await fetch(
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NC%20Gold-NnmSc5SLfaHrb3C1TYfHXi7CaVirS1.png",
      )
      const blob = await response.blob()

      const formData = new FormData()
      formData.append("file", blob, "nc-united-gold-logo.png")
      formData.append("category", "logos/teams")
      formData.append("name", "nc-united-gold")

      const uploadResponse = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      })

      const uploadData = await uploadResponse.json()

      if (uploadData.success) {
        // Now add to logo database
        const logoData = {
          name: "NC United Gold",
          display_name: "NC United Gold",
          type: "team",
          file_url: uploadData.url,
          file_name: "nc-united-gold-logo.png",
          aliases: ["NC United Gold Team", "Gold Team", "NC Gold"],
        }

        const dbResponse = await fetch("/api/admin/logos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(logoData),
        })

        const dbData = await dbResponse.json()
        setResult({ upload: uploadData, database: dbData })
      } else {
        setResult({ error: "Upload failed", details: uploadData })
      }
    } catch (error) {
      setResult({ error: "Upload failed", details: error.message })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Upload NC United Gold Logo</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NC%20Gold-NnmSc5SLfaHrb3C1TYfHXi7CaVirS1.png"
                alt="NC United Gold Logo"
                className="w-32 h-32 object-contain"
              />
            </div>

            <Button onClick={uploadGoldLogo} disabled={uploading} className="w-full">
              {uploading ? "Uploading..." : "Upload NC United Gold Logo"}
            </Button>

            {result && (
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <pre className="text-xs overflow-auto">{JSON.stringify(result, null, 2)}</pre>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
