"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface LogoUpload {
  name: string
  displayName: string
  type: "college" | "high_school" | "club"
  file: File | null
  uploaded: boolean
}

export default function LogoSetupPage() {
  const [logos, setLogos] = useState<LogoUpload[]>([
    {
      name: "unc-chapel-hill",
      displayName: "University of North Carolina at Chapel Hill",
      type: "college",
      file: null,
      uploaded: false,
    },
    {
      name: "cardinal-gibbons-hs",
      displayName: "Cardinal Gibbons High School",
      type: "high_school",
      file: null,
      uploaded: false,
    },
    {
      name: "raw-wrestling",
      displayName: "RAW Wrestling Club",
      type: "club",
      file: null,
      uploaded: false,
    },
  ])

  const { toast } = useToast()

  const handleFileSelect = (index: number, file: File) => {
    const updatedLogos = [...logos]
    updatedLogos[index].file = file
    setLogos(updatedLogos)
  }

  const uploadLogo = async (logo: LogoUpload, index: number) => {
    if (!logo.file) return

    try {
      // Upload the file
      const formData = new FormData()
      formData.append("file", logo.file)
      formData.append("category", `logos/${logo.type}s`)
      formData.append("name", logo.name)

      const uploadResponse = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      })

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload image")
      }

      const uploadData = await uploadResponse.json()

      // Save to logo management system
      const logoData = {
        name: logo.name,
        display_name: logo.displayName,
        type: logo.type,
        file_url: uploadData.url,
        file_name: logo.file.name,
        aliases: getAliases(logo.displayName),
      }

      const saveResponse = await fetch("/api/admin/logos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logoData),
      })

      if (!saveResponse.ok) {
        throw new Error("Failed to save logo to database")
      }

      // Mark as uploaded
      const updatedLogos = [...logos]
      updatedLogos[index].uploaded = true
      setLogos(updatedLogos)

      toast({
        title: "Logo Uploaded",
        description: `${logo.displayName} logo has been uploaded successfully.`,
      })
    } catch (error) {
      console.error("Error uploading logo:", error)
      toast({
        title: "Upload Failed",
        description: `Failed to upload ${logo.displayName} logo.`,
        variant: "destructive",
      })
    }
  }

  const getAliases = (displayName: string): string[] => {
    const aliases: Record<string, string[]> = {
      "University of North Carolina at Chapel Hill": ["UNC", "UNC Chapel Hill", "Tar Heels"],
      "Cardinal Gibbons High School": ["Cardinal Gibbons", "Gibbons"],
      "RAW Wrestling Club": ["RAW", "RAW Wrestling"],
    }
    return aliases[displayName] || []
  }

  const uploadAllLogos = async () => {
    for (let i = 0; i < logos.length; i++) {
      if (logos[i].file && !logos[i].uploaded) {
        await uploadLogo(logos[i], i)
        // Add small delay between uploads
        await new Promise((resolve) => setTimeout(resolve, 500))
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-slate-800 font-oswald mb-2">Logo Setup</h1>
            <p className="text-slate-600">Upload the required logos for your commitment cards</p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Required Logos for Liam Hickey's Commitment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {logos.map((logo, index) => (
                  <div key={logo.name} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold">{logo.displayName}</h3>
                        <p className="text-sm text-gray-500 capitalize">{logo.type.replace("_", " ")}</p>
                      </div>
                      {logo.uploaded ? (
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      ) : (
                        <AlertCircle className="h-6 w-6 text-orange-600" />
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor={`file-${index}`}>Upload Logo File</Label>
                        <Input
                          id={`file-${index}`}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0]
                            if (file) handleFileSelect(index, file)
                          }}
                          disabled={logo.uploaded}
                        />
                      </div>

                      <div className="flex items-end">
                        <Button
                          onClick={() => uploadLogo(logo, index)}
                          disabled={!logo.file || logo.uploaded}
                          className="w-full"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          {logo.uploaded ? "Uploaded" : "Upload Logo"}
                        </Button>
                      </div>
                    </div>

                    {logo.file && (
                      <div className="mt-4">
                        <p className="text-sm text-gray-600">Selected: {logo.file.name}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t">
                <Button
                  onClick={uploadAllLogos}
                  className="w-full bg-[#1a1b5c] hover:bg-[#1a1b5c]/90"
                  disabled={logos.every((logo) => logo.uploaded) || logos.some((logo) => !logo.file)}
                >
                  Upload All Logos
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Upload the logo files above</li>
                <li>
                  Go to the{" "}
                  <a href="/recruiting/commits" className="text-blue-600 hover:underline">
                    Commits page
                  </a>{" "}
                  to see the logos in action
                </li>
                <li>
                  Use the{" "}
                  <a href="/admin/logo-manager" className="text-blue-600 hover:underline">
                    Logo Manager
                  </a>{" "}
                  to add more logos
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
