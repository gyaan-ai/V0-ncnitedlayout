"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export default function CoachOnboarding() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    bio: "",
    yearsCoaching: "",
    certifications: "",
    // Coach types
    isHighSchoolCoach: false,
    highSchoolName: "",
    highSchoolPosition: "",
    isClubCoach: false,
    clubName: "",
    clubPosition: "",
    isCollegeCoach: false,
    collegeName: "",
    collegePosition: "",
    collegeConference: "",
    collegeRecruiting: false,
  })

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data?.user) {
        router.push("/login")
        return
      }

      setUser(data.user)

      // Check if profile exists and pre-fill data
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

      if (profile && profile.role_data) {
        const rd = profile.role_data
        setFormData({
          firstName: profile.first_name || "",
          lastName: profile.last_name || "",
          phone: rd.phone || "",
          bio: rd.bio || "",
          yearsCoaching: rd.yearsCoaching || "",
          certifications: rd.certifications || "",
          isHighSchoolCoach: rd.isHighSchoolCoach || false,
          highSchoolName: rd.highSchoolName || "",
          highSchoolPosition: rd.highSchoolPosition || "",
          isClubCoach: rd.isClubCoach || false,
          clubName: rd.clubName || "",
          clubPosition: rd.clubPosition || "",
          isCollegeCoach: rd.isCollegeCoach || false,
          collegeName: rd.collegeName || "",
          collegePosition: rd.collegePosition || "",
          collegeConference: rd.collegeConference || "",
          collegeRecruiting: rd.collegeRecruiting || false,
        })
      }

      setLoading(false)
    }

    getUser()
  }, [router, supabase])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      [name]: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (!user) return

      // Determine primary role based on selections
      let primaryRole = "coach"
      if (formData.isCollegeCoach) {
        primaryRole = "college_coach"
      } else if (formData.isHighSchoolCoach) {
        primaryRole = "high_school_coach"
      } else if (formData.isClubCoach) {
        primaryRole = "club_coach"
      }

      // Update profile with role-specific data
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: primaryRole,
        role_data: {
          phone: formData.phone,
          bio: formData.bio,
          yearsCoaching: formData.yearsCoaching,
          certifications: formData.certifications,
          isHighSchoolCoach: formData.isHighSchoolCoach,
          highSchoolName: formData.highSchoolName,
          highSchoolPosition: formData.highSchoolPosition,
          isClubCoach: formData.isClubCoach,
          clubName: formData.clubName,
          clubPosition: formData.clubPosition,
          isCollegeCoach: formData.isCollegeCoach,
          collegeName: formData.collegeName,
          collegePosition: formData.collegePosition,
          collegeConference: formData.collegeConference,
          collegeRecruiting: formData.collegeRecruiting,
        },
        onboarding_completed: true, // Mark as completed
        updated_at: new Date().toISOString(),
      })

      if (error) {
        console.error("Error updating profile:", error)
        return
      }

      setSuccess(true)

      // Redirect to home page after a short delay
      setTimeout(() => {
        router.push("/")
      }, 1500)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-800 mb-2 font-oswald">Coach Profile Setup</h1>
            <p className="text-slate-600">Complete your coaching profile</p>
          </div>

          {success && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Profile saved successfully! Redirecting to home page...
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-oswald">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                </div>

                <div>
                  <Label htmlFor="bio">Coaching Bio</Label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    placeholder="Tell us about your coaching background and philosophy"
                    rows={4}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="yearsCoaching">Years of Coaching Experience</Label>
                    <Input
                      id="yearsCoaching"
                      name="yearsCoaching"
                      type="number"
                      value={formData.yearsCoaching}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="certifications">Certifications</Label>
                    <Input
                      id="certifications"
                      name="certifications"
                      value={formData.certifications}
                      onChange={handleChange}
                      placeholder="USAW, NCEP, etc."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl font-oswald">Coaching Roles</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <p className="text-sm text-slate-600">Select all coaching roles that apply to you</p>

                {/* High School Coach Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isHighSchoolCoach"
                      checked={formData.isHighSchoolCoach}
                      onCheckedChange={(checked) => handleCheckboxChange("isHighSchoolCoach", checked as boolean)}
                    />
                    <Label htmlFor="isHighSchoolCoach" className="font-medium">
                      High School Coach
                    </Label>
                  </div>

                  {formData.isHighSchoolCoach && (
                    <div className="pl-6 space-y-4 border-l-2 border-blue-100">
                      <div>
                        <Label htmlFor="highSchoolName">High School Name</Label>
                        <Input
                          id="highSchoolName"
                          name="highSchoolName"
                          value={formData.highSchoolName}
                          onChange={handleChange}
                          required={formData.isHighSchoolCoach}
                        />
                      </div>
                      <div>
                        <Label htmlFor="highSchoolPosition">Position</Label>
                        <Input
                          id="highSchoolPosition"
                          name="highSchoolPosition"
                          value={formData.highSchoolPosition}
                          onChange={handleChange}
                          placeholder="Head Coach, Assistant Coach, etc."
                          required={formData.isHighSchoolCoach}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Club Coach Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isClubCoach"
                      checked={formData.isClubCoach}
                      onCheckedChange={(checked) => handleCheckboxChange("isClubCoach", checked as boolean)}
                    />
                    <Label htmlFor="isClubCoach" className="font-medium">
                      Club Coach
                    </Label>
                  </div>

                  {formData.isClubCoach && (
                    <div className="pl-6 space-y-4 border-l-2 border-blue-100">
                      <div>
                        <Label htmlFor="clubName">Club Name</Label>
                        <Input
                          id="clubName"
                          name="clubName"
                          value={formData.clubName}
                          onChange={handleChange}
                          required={formData.isClubCoach}
                        />
                      </div>
                      <div>
                        <Label htmlFor="clubPosition">Position</Label>
                        <Input
                          id="clubPosition"
                          name="clubPosition"
                          value={formData.clubPosition}
                          onChange={handleChange}
                          placeholder="Head Coach, Owner, etc."
                          required={formData.isClubCoach}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* College Coach Section */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isCollegeCoach"
                      checked={formData.isCollegeCoach}
                      onCheckedChange={(checked) => handleCheckboxChange("isCollegeCoach", checked as boolean)}
                    />
                    <Label htmlFor="isCollegeCoach" className="font-medium">
                      College Coach
                    </Label>
                  </div>

                  {formData.isCollegeCoach && (
                    <div className="pl-6 space-y-4 border-l-2 border-blue-100">
                      <div>
                        <Label htmlFor="collegeName">College/University Name</Label>
                        <Input
                          id="collegeName"
                          name="collegeName"
                          value={formData.collegeName}
                          onChange={handleChange}
                          required={formData.isCollegeCoach}
                        />
                      </div>
                      <div>
                        <Label htmlFor="collegePosition">Position</Label>
                        <Input
                          id="collegePosition"
                          name="collegePosition"
                          value={formData.collegePosition}
                          onChange={handleChange}
                          placeholder="Head Coach, Assistant Coach, etc."
                          required={formData.isCollegeCoach}
                        />
                      </div>
                      <div>
                        <Label htmlFor="collegeConference">Conference</Label>
                        <Input
                          id="collegeConference"
                          name="collegeConference"
                          value={formData.collegeConference}
                          onChange={handleChange}
                          placeholder="ACC, Big Ten, etc."
                          required={formData.isCollegeCoach}
                        />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="collegeRecruiting"
                          checked={formData.collegeRecruiting}
                          onCheckedChange={(checked) => handleCheckboxChange("collegeRecruiting", checked as boolean)}
                        />
                        <Label htmlFor="collegeRecruiting">I am actively recruiting wrestlers</Label>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-3 text-lg"
                disabled={saving}
              >
                {saving ? "Saving..." : "Complete Profile Setup"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
