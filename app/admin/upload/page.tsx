"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UploadCloud, CheckCircle, AlertCircle } from "lucide-react"

export default function ImageUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [category, setCategory] = useState("wrestlers")
  const [name, setName] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [imageUrl, setImageUrl] = useState("")
  const [uploadedImages, setUploadedImages] = useState<{ url: string; name: string; category: string }[]>([])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!file || !name) return

    setUploading(true)
    setUploadStatus("idle")

    const formData = new FormData()
    formData.append("file", file)
    formData.append("category", category)
    formData.append("name", name)

    try {
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (result.success) {
        setUploadStatus("success")
        setImageUrl(result.url)
        setUploadedImages([
          ...uploadedImages,
          {
            url: result.url,
            name: name,
            category: category,
          },
        ])
        // Reset form
        setFile(null)
        setName("")
      } else {
        setUploadStatus("error")
      }
    } catch (error) {
      console.error("Error uploading image:", error)
      setUploadStatus("error")
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-4xl font-bold text-[#1a1b5c] mb-8 font-oswald">Image Upload Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Upload New Image</CardTitle>
            <CardDescription>Upload images for wrestlers, tournaments, or teams</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wrestlers">Wrestlers</SelectItem>
                    <SelectItem value="tournaments">Tournaments</SelectItem>
                    <SelectItem value="teams">Teams</SelectItem>
                    <SelectItem value="coaches">Coaches</SelectItem>
                    <SelectItem value="events">Events</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g., aiden-white or nhsca-2025"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file">Image File</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors">
                  <Input id="file" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  <label htmlFor="file" className="cursor-pointer flex flex-col items-center">
                    <UploadCloud className="h-12 w-12 text-gray-400 mb-2" />
                    <span className="text-sm font-medium text-gray-700">
                      {file ? file.name : "Click to select an image"}
                    </span>
                    {file && (
                      <span className="text-xs text-gray-500 mt-1">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    )}
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1a1b5c] hover:bg-[#13144a]"
                disabled={uploading || !file || !name}
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </Button>

              {uploadStatus === "success" && (
                <div className="flex items-center p-4 bg-green-50 text-green-700 rounded-lg">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Upload successful!</span>
                </div>
              )}

              {uploadStatus === "error" && (
                <div className="flex items-center p-4 bg-red-50 text-red-700 rounded-lg">
                  <AlertCircle className="h-5 w-5 mr-2" />
                  <span>Upload failed. Please try again.</span>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recently Uploaded Images</CardTitle>
            <CardDescription>View and copy URLs of recently uploaded images</CardDescription>
          </CardHeader>
          <CardContent>
            {uploadedImages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">No images uploaded yet</div>
            ) : (
              <div className="space-y-4">
                {uploadedImages.map((image, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 relative rounded overflow-hidden">
                        <img
                          src={image.url || "/placeholder.svg"}
                          alt={image.name}
                          className="object-cover h-full w-full"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{image.name}</p>
                        <p className="text-sm text-gray-500 capitalize">{image.category}</p>
                        <div className="mt-1 flex items-center">
                          <input
                            type="text"
                            value={image.url}
                            readOnly
                            className="text-xs bg-gray-50 rounded border px-2 py-1 flex-1 min-w-0"
                            onClick={(e) => (e.target as HTMLInputElement).select()}
                          />
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigator.clipboard.writeText(image.url)}
                            className="ml-2 text-xs"
                          >
                            Copy
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
