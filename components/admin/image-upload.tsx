"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, X, ImageIcon } from "lucide-react"
import { toast } from "sonner"

interface ImageUploadProps {
  label: string
  currentImageUrl?: string
  onImageChange: (url: string | null) => void
  athleteId?: string
  type: "profile" | "commitment" | "action" | "headshot"
  maxSize?: number // in MB
  aspectRatio?: string
  description?: string
}

export function ImageUpload({
  label,
  currentImageUrl,
  onImageChange,
  athleteId = "new",
  type,
  maxSize = 5,
  aspectRatio,
  description,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)

  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file")
      return
    }

    if (file.size > maxSize * 1024 * 1024) {
      toast.error(`File size must be less than ${maxSize}MB`)
      return
    }

    setUploading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", `athlete-${type}`)
      formData.append("athleteId", athleteId)

      const response = await fetch("/api/admin/upload-athlete-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const { url } = await response.json()
      onImageChange(url)
      toast.success("Image uploaded successfully!")
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Failed to upload image")
    } finally {
      setUploading(false)
    }
  }

  const handleFileInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault()
    setDragOver(false)
    const file = event.dataTransfer.files[0]
    if (file) {
      handleFileSelect(file)
    }
  }

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = () => {
    setDragOver(false)
  }

  const removeImage = () => {
    onImageChange(null)
    toast.success("Image removed")
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {description && <p className="text-sm text-gray-600">{description}</p>}

      {currentImageUrl ? (
        <Card>
          <CardContent className="p-4">
            <div className="relative">
              <img
                src={currentImageUrl || "/placeholder.svg"}
                alt={label}
                className={`w-full max-w-xs object-cover rounded border ${
                  aspectRatio === "square" ? "aspect-square" : "aspect-video"
                }`}
              />
              <Button
                size="sm"
                variant="destructive"
                className="absolute top-2 right-2"
                onClick={removeImage}
                disabled={uploading}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
            <div className="mt-2 flex gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                disabled={uploading}
                className="hidden"
                id={`file-${type}`}
              />
              <Label htmlFor={`file-${type}`} className="cursor-pointer">
                <Button variant="outline" disabled={uploading} asChild>
                  <span>
                    <Upload className="h-4 w-4 mr-2" />
                    Replace Image
                  </span>
                </Button>
              </Label>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card
          className={`border-2 border-dashed transition-colors ${
            dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <CardContent className="p-8">
            <div className="text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Drag and drop an image here, or click to select</p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleFileInput}
                  disabled={uploading}
                  className="hidden"
                  id={`file-upload-${type}`}
                />
                <Label htmlFor={`file-upload-${type}`} className="cursor-pointer">
                  <Button variant="outline" disabled={uploading} asChild>
                    <span>
                      <Upload className="h-4 w-4 mr-2" />
                      {uploading ? "Uploading..." : "Select Image"}
                    </span>
                  </Button>
                </Label>
              </div>
              <p className="text-xs text-gray-500 mt-2">Max file size: {maxSize}MB • Supported: JPG, PNG, WebP</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
