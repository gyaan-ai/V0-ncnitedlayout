"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function LogoUploadWorkflow() {
  const [uploading, setUploading] = useState(false)
  const [institutionName, setInstitutionName] = useState("")
  const [institutionType, setInstitutionType] = useState<"college" | "high_school" | "club">("college")

  const handleUpload = async (file: File) => {
    setUploading(true)
    try {
      // 1. Upload file to storage (Vercel Blob, S3, etc.)
      const formData = new FormData()
      formData.append("file", file)
      formData.append("institutionName", institutionName)
      formData.append("institutionType", institutionType)

      const response = await fetch("/api/upload-logo", {
        method: "POST",
        body: formData,
      })

      const { fileUrl } = await response.json()

      // 2. Store in database
      await fetch("/api/logos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          institution_name: institutionName,
          institution_type: institutionType,
          file_url: fileUrl,
          aliases: [institutionName], // Add common variations
        }),
      })

      alert("Logo uploaded successfully!")
    } catch (error) {
      alert("Upload failed")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h3 className="text-lg font-semibold">Upload Institution Logo</h3>

      <div>
        <Label htmlFor="institution">Institution Name</Label>
        <Input
          id="institution"
          value={institutionName}
          onChange={(e) => setInstitutionName(e.target.value)}
          placeholder="e.g., University of North Carolina at Chapel Hill"
        />
      </div>

      <div>
        <Label htmlFor="type">Institution Type</Label>
        <Select value={institutionType} onValueChange={(value: any) => setInstitutionType(value)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="college">College/University</SelectItem>
            <SelectItem value="high_school">High School</SelectItem>
            <SelectItem value="club">Wrestling Club</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="logo">Logo File</Label>
        <Input
          id="logo"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file && institutionName) {
              handleUpload(file)
            }
          }}
        />
      </div>

      {uploading && <p className="text-sm text-gray-500">Uploading...</p>}
    </div>
  )
}
