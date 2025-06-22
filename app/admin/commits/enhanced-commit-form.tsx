"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SmartInstitutionInput } from "@/components/ui/smart-institution-input"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, AlertCircle, Upload } from "lucide-react"

interface CommitFormData {
  athleteName: string
  firstName: string
  lastName: string
  collegeName: string
  highSchool: string
  club?: string
  graduationYear: number
  weightClass: string
  achievements: string[]
}

interface LogoStatus {
  college: { found: boolean; url?: string; needsUpload: boolean }
  highSchool: { found: boolean; url?: string; needsUpload: boolean }
  club: { found: boolean; url?: string; needsUpload: boolean }
}

export function EnhancedCommitForm() {
  const [formData, setFormData] = useState<CommitFormData>({
    athleteName: "",
    firstName: "",
    lastName: "",
    collegeName: "",
    highSchool: "",
    club: "",
    graduationYear: new Date().getFullYear(),
    weightClass: "",
    achievements: [],
  })

  const [logoStatus, setLogoStatus] = useState<LogoStatus>({
    college: { found: false, needsUpload: false },
    highSchool: { found: false, needsUpload: false },
    club: { found: false, needsUpload: false },
  })

  const [missingLogos, setMissingLogos] = useState<string[]>([])

  // Check for existing logos when institutions are selected
  useEffect(() => {
    const checkLogos = async () => {
      if (!formData.collegeName && !formData.highSchool && !formData.club) return

      try {
        // This would call your logo management API
        const logoChecks = await Promise.all([
          formData.collegeName ? checkLogoExists(formData.collegeName, "college") : null,
          formData.highSchool ? checkLogoExists(formData.highSchool, "high_school") : null,
          formData.club ? checkLogoExists(formData.club, "club") : null,
        ])

        setLogoStatus({
          college: logoChecks[0] || { found: false, needsUpload: false },
          highSchool: logoChecks[1] || { found: false, needsUpload: false },
          club: logoChecks[2] || { found: false, needsUpload: false },
        })

        // Track missing logos
        const missing = []
        if (formData.collegeName && !logoChecks[0]?.found) missing.push(formData.collegeName)
        if (formData.highSchool && !logoChecks[1]?.found) missing.push(formData.highSchool)
        if (formData.club && !logoChecks[2]?.found) missing.push(formData.club)
        setMissingLogos(missing)
      } catch (error) {
        console.error("Error checking logos:", error)
      }
    }

    checkLogos()
  }, [formData.collegeName, formData.highSchool, formData.club])

  // Mock function - replace with actual API call
  const checkLogoExists = async (name: string, type: string) => {
    // This would call: await findLogoByName(name, type)
    return { found: Math.random() > 0.7, url: "/placeholder.svg", needsUpload: Math.random() > 0.7 }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Save the commitment
    const commitmentData = {
      ...formData,
      logoStatus,
      needsLogoUpload: missingLogos.length > 0,
    }

    console.log("Saving commitment:", commitmentData)

    // If logos are missing, show upload workflow
    if (missingLogos.length > 0) {
      alert(`Commitment saved! Please upload logos for: ${missingLogos.join(", ")}`)
      // Redirect to logo manager with pre-filled institution names
      window.open(`/admin/logo-manager?institutions=${missingLogos.join(",")}`, "_blank")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Commitment</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, firstName: e.target.value }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData((prev) => ({ ...prev, lastName: e.target.value }))}
                  required
                />
              </div>
            </div>

            {/* Institution Selection with Logo Status */}
            <div className="space-y-4">
              <div>
                <Label>College</Label>
                <div className="flex items-center gap-2">
                  <SmartInstitutionInput
                    type="college"
                    value={formData.collegeName}
                    onChange={(value) => setFormData((prev) => ({ ...prev, collegeName: value }))}
                    placeholder="Type college name..."
                    className="flex-1"
                  />
                  <LogoStatusBadge status={logoStatus.college} />
                </div>
              </div>

              <div>
                <Label>High School</Label>
                <div className="flex items-center gap-2">
                  <SmartInstitutionInput
                    type="high_school"
                    value={formData.highSchool}
                    onChange={(value) => setFormData((prev) => ({ ...prev, highSchool: value }))}
                    placeholder="Type high school name..."
                    className="flex-1"
                  />
                  <LogoStatusBadge status={logoStatus.highSchool} />
                </div>
              </div>

              <div>
                <Label>Wrestling Club</Label>
                <div className="flex items-center gap-2">
                  <SmartInstitutionInput
                    type="club"
                    value={formData.club || ""}
                    onChange={(value) => setFormData((prev) => ({ ...prev, club: value }))}
                    placeholder="Type club name..."
                    className="flex-1"
                  />
                  <LogoStatusBadge status={logoStatus.club} />
                </div>
              </div>
            </div>

            {/* Missing Logos Alert */}
            {missingLogos.length > 0 && (
              <Card className="border-orange-200 bg-orange-50">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-orange-800">Missing Logos</h4>
                      <p className="text-sm text-orange-700 mb-2">
                        The following institutions don't have logos in our system:
                      </p>
                      <div className="flex flex-wrap gap-2 mb-3">
                        {missingLogos.map((institution) => (
                          <Badge key={institution} variant="outline" className="border-orange-300">
                            {institution}
                          </Badge>
                        ))}
                      </div>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => window.open("/admin/logo-manager", "_blank")}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Logos
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Wrestling Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="graduationYear">Graduation Year</Label>
                <Input
                  id="graduationYear"
                  type="number"
                  value={formData.graduationYear}
                  onChange={(e) => setFormData((prev) => ({ ...prev, graduationYear: Number(e.target.value) }))}
                  required
                />
              </div>
              <div>
                <Label htmlFor="weightClass">Weight Class</Label>
                <Input
                  id="weightClass"
                  value={formData.weightClass}
                  onChange={(e) => setFormData((prev) => ({ ...prev, weightClass: e.target.value }))}
                  placeholder="133"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex gap-2">
              <Button type="submit" className="flex-1">
                Save Commitment
              </Button>
              {missingLogos.length > 0 && (
                <Button type="button" variant="outline" onClick={() => window.open("/admin/logo-manager", "_blank")}>
                  Manage Logos
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

// Logo Status Badge Component
function LogoStatusBadge({ status }: { status: { found: boolean; url?: string; needsUpload: boolean } }) {
  if (status.found) {
    return (
      <Badge className="bg-green-100 text-green-800 border-green-300">
        <CheckCircle className="h-3 w-3 mr-1" />
        Logo Found
      </Badge>
    )
  }

  if (status.needsUpload) {
    return (
      <Badge className="bg-orange-100 text-orange-800 border-orange-300">
        <Upload className="h-3 w-3 mr-1" />
        Upload Needed
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="text-gray-500">
      <AlertCircle className="h-3 w-3 mr-1" />
      No Logo
    </Badge>
  )
}
