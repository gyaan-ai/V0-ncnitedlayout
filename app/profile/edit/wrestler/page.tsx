"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, AlertCircle, RefreshCw, Save } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

const weightClasses = ["106", "113", "120", "126", "132", "138", "144", "150", "157", "165", "175", "190", "215", "285"]

export default function EditWrestlerProfile() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Basic profile state
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [graduationYear, setGraduationYear] = useState(new Date().getFullYear() + 4)
  const [weightClass, setWeightClass] = useState("")
  const [gender, setGender] = useState("")
  const [highSchool, setHighSchool] = useState("")
  const [club, setClub] = useState("")
  const [hometown, setHometown] = useState("")

  // Parent contact
  const [parentName, setParentName] = useState("")
  const [parentPhone, setParentPhone] = useState("")
  const [parentEmail, setParentEmail] = useState("")
  const [parentRelationship, setParentRelationship] = useState("")

  // Academic info
  const [gpa, setGpa] = useState("")
  const [satScore, setSatScore] = useState("")
  const [actScore, setActScore] = useState("")

  // College commitment
  const [isCommitted, setIsCommitted] = useState(false)
  const [commitmentUniversity, setCommitmentUniversity] = useState("")
  const [commitmentDivision, setCommitmentDivision] = useState("")
  const [commitmentWeight, setCommitmentWeight] = useState("")
  const [commitmentDate, setCommitmentDate] = useState("")
  const [commitmentPhoto, setCommitmentPhoto] = useState("")
  const [announcementText, setAnnouncementText] = useState("")

  // College recruiting permissions
  const [shareAcademicInfo, setShareAcademicInfo] = useState(false)
  const [shareAthleticInfo, setShareAthleticInfo] = useState(false)

  // Team affiliations
  const [ncUnitedTeams, setNcUnitedTeams] = useState<string[]>([])
  const [profilePhoto, setProfilePhoto] = useState("")

  // Achievements - change to arrays for multiple years
  const [super32Results, setSuper32Results] = useState<any[]>([])
  const [nhscaResults, setNhscaResults] = useState<any[]>([])
  const [fargoResults, setFargoResults] = useState<any[]>([])
  const [nchsaaResults, setNchsaaResults] = useState<any[]>([])
  const [otherAchievements, setOtherAchievements] = useState("")

  // Image upload states
  const [uploadingCommitmentPhoto, setUploadingCommitmentPhoto] = useState(false)
  const [commitmentPhotoPreview, setCommitmentPhotoPreview] = useState("")

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function checkAuthAndLoadProfile() {
      try {
        const { data, error } = await supabase.auth.getUser()

        if (error || !data?.user) {
          setError("No authenticated user found. Please log in again.")
          setLoading(false)
          return
        }

        setUser(data.user)

        // Load profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .single()

        if (profileError && profileError.code !== "PGRST116") {
          setError(`Profile error: ${profileError.message}`)
          setLoading(false)
          return
        }

        if (profileData) {
          setFirstName(profileData.first_name || "")
          setLastName(profileData.last_name || "")

          if (profileData.role_data) {
            const wrestlerData = profileData.role_data
            setGraduationYear(wrestlerData.graduation_year || new Date().getFullYear() + 4)
            setWeightClass(wrestlerData.weight_class || "")
            setGender(wrestlerData.gender || "")
            setHighSchool(wrestlerData.high_school || "")
            setClub(wrestlerData.club_team || "")
            setHometown(wrestlerData.hometown || "")

            if (wrestlerData.parent_contact) {
              setParentName(wrestlerData.parent_contact.name || "")
              setParentPhone(wrestlerData.parent_contact.phone || "")
              setParentEmail(wrestlerData.parent_contact.email || "")
              setParentRelationship(wrestlerData.parent_contact.relationship || "")
            }

            // Academic info
            setGpa(wrestlerData.gpa?.toString() || "")
            setSatScore(wrestlerData.sat_score?.toString() || "")
            setActScore(wrestlerData.act_score?.toString() || "")

            // College commitment
            if (wrestlerData.college_commit) {
              setIsCommitted(true)
              setCommitmentUniversity(wrestlerData.college_commit.university || "")
              setCommitmentDivision(wrestlerData.college_commit.division || "")
              setCommitmentWeight(wrestlerData.college_commit.anticipated_weight || "")
              setCommitmentDate(wrestlerData.college_commit.commitment_date || "")
              setCommitmentPhoto(wrestlerData.college_commit.commitment_photo_url || "")
              setCommitmentPhotoPreview(wrestlerData.college_commit.commitment_photo_url || "")
              setAnnouncementText(wrestlerData.college_commit.announcement_text || "")
            }

            // College recruiting permissions
            if (wrestlerData.recruiting_permissions) {
              setShareAcademicInfo(wrestlerData.recruiting_permissions.share_academic || false)
              setShareAthleticInfo(wrestlerData.recruiting_permissions.share_athletic || false)
            }

            // Team affiliations
            setNcUnitedTeams(wrestlerData.nc_united_teams || [])
            setProfilePhoto(wrestlerData.profile_photo_url || "")

            // Achievements
            if (wrestlerData.achievements) {
              setSuper32Results(wrestlerData.achievements.super32 || [])
              setNhscaResults(wrestlerData.achievements.nhsca || [])
              setFargoResults(wrestlerData.achievements.fargo || [])
              setNchsaaResults(wrestlerData.achievements.nchsaa || [])
              setOtherAchievements(wrestlerData.achievements.freeform_achievements?.join(", ") || "")
            }
          }
        }

        setLoading(false)
      } catch (error) {
        console.error("Unexpected error:", error)
        setError(`Unexpected error: ${error instanceof Error ? error.message : "Unknown error"}`)
        setLoading(false)
      }
    }

    checkAuthAndLoadProfile()
  }, [router, supabase])

  const handleCommitmentPhotoUpload = async (file: File) => {
    if (!file) return

    setUploadingCommitmentPhoto(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const { url } = await response.json()
      setCommitmentPhoto(url)
      setCommitmentPhotoPreview(url)
    } catch (error) {
      console.error("Error uploading image:", error)
      setError("Failed to upload image. Please try again.")
    } finally {
      setUploadingCommitmentPhoto(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      if (!user) {
        setError("No user found. Please log in again.")
        setSaving(false)
        return
      }

      const roleData = {
        weight_class: weightClass,
        grade: "",
        graduation_year: graduationYear,
        high_school: highSchool,
        club_team: club,
        hometown: hometown,
        gender: gender,
        achievements: {
          super32: super32Results,
          nhsca: nhscaResults,
          fargo: fargoResults,
          nchsaa: nchsaaResults,
          freeform_achievements: otherAchievements
            .split(",")
            .map((a) => a.trim())
            .filter((a) => a),
          achievement_paragraph: "",
        },
        wrestling_style: [],
        competition_level: "high_school",
        college_interests: [],
        parent_contact: {
          name: parentName,
          email: parentEmail,
          phone: parentPhone,
          relationship: parentRelationship,
        },
        emergency_contact: {
          name: parentName,
          phone: parentPhone,
          relationship: parentRelationship,
        },
        gpa: gpa ? Number.parseFloat(gpa) : undefined,
        sat_score: satScore ? Number.parseInt(satScore) : undefined,
        act_score: actScore ? Number.parseInt(actScore) : undefined,
        nc_united_teams: ncUnitedTeams,
        profile_photo_url: profilePhoto,
        college_commit: isCommitted
          ? {
              commitment_date: commitmentDate,
              university: commitmentUniversity,
              anticipated_weight: commitmentWeight,
              division: commitmentDivision,
              commitment_photo_url: commitmentPhoto,
              announcement_text: announcementText,
            }
          : undefined,
        recruiting_permissions: {
          share_academic: shareAcademicInfo,
          share_athletic: shareAthleticInfo,
        },
      }

      // Get fresh user data
      const { data: freshUserData, error: userRefreshError } = await supabase.auth.getUser()

      if (userRefreshError || !freshUserData?.user?.email) {
        setError("Could not verify user email. Please try logging out and back in.")
        return
      }

      const email = freshUserData.user.email
      const userId = freshUserData.user.id

      // Check if profile exists
      const { data: existingProfile } = await supabase.from("profiles").select("id").eq("id", userId).single()

      let result
      if (existingProfile) {
        // Update existing profile
        result = await supabase
          .from("profiles")
          .update({
            first_name: firstName,
            last_name: lastName,
            role: "wrestler",
            role_data: roleData,
            onboarding_completed: true,
          })
          .eq("id", userId)
      } else {
        // Create new profile
        result = await supabase.from("profiles").insert({
          id: userId,
          email: email,
          first_name: firstName,
          last_name: lastName,
          role: "wrestler",
          role_data: roleData,
          onboarding_completed: true,
        })
      }

      const { error } = result

      if (error) {
        setError(`Failed to save profile: ${error.message}`)
        return
      }

      console.log("✅ Profile saved successfully")
      router.push("/dashboard?updated=true")
    } catch (error) {
      console.error("Error:", error)
      setError(`An error occurred: ${error instanceof Error ? error.message : "Unknown error"}`)
    } finally {
      setSaving(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h1 className="text-xl font-bold mb-2">Loading Profile</h1>
          <p className="text-gray-600 mb-4">Checking authentication and loading data...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error && !user) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Authentication Issue</h1>
          <p className="mb-4">{error}</p>
          <div className="space-y-2">
            <Button onClick={() => router.push("/login?redirect=/profile/edit/wrestler")} className="w-full">
              Go to Login
            </Button>
            <Button onClick={() => window.location.reload()} variant="outline" className="w-full">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Main form (same structure as before)
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-black text-slate-800 font-oswald">Edit Wrestler Profile</h1>
              <p className="text-slate-600">Update your information</p>
              {user && <p className="text-sm text-gray-500">Logged in as: {user.email}</p>}
            </div>
            <Button
              onClick={() => router.push("/dashboard")}
              variant="outline"
              className="border-blue-600 text-blue-600"
            >
              Back to Dashboard
            </Button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Rest of the form remains the same */}
            <Tabs defaultValue="basic" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="basic">Basic Info</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="other">Other</TabsTrigger>
              </TabsList>

              {/* Form content remains the same as before */}
              <TabsContent value="basic">
                {/* Basic info form content */}
                <div className="grid lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <Card>
                      <CardHeader>
                        <CardTitle className="font-oswald">Basic Information</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="first_name">First Name *</Label>
                            <Input
                              id="first_name"
                              value={firstName}
                              onChange={(e) => setFirstName(e.target.value)}
                              placeholder="Enter first name"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="last_name">Last Name *</Label>
                            <Input
                              id="last_name"
                              value={lastName}
                              onChange={(e) => setLastName(e.target.value)}
                              placeholder="Enter last name"
                              required
                            />
                          </div>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                          <div>
                            <Label htmlFor="graduation_year">Graduation Year *</Label>
                            <Select
                              value={graduationYear.toString()}
                              onValueChange={(value) => setGraduationYear(Number.parseInt(value))}
                              required
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {Array.from({ length: 8 }, (_, i) => {
                                  const year = new Date().getFullYear() + i - 4
                                  return (
                                    <SelectItem key={year} value={year.toString()}>
                                      {year}
                                    </SelectItem>
                                  )
                                })}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="weight_class">Weight Class *</Label>
                            <Select value={weightClass} onValueChange={setWeightClass} required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select weight" />
                              </SelectTrigger>
                              <SelectContent>
                                {weightClasses.map((weight) => (
                                  <SelectItem key={weight} value={weight}>
                                    {weight}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label htmlFor="gender">Gender *</Label>
                            <Select value={gender} onValueChange={setGender} required>
                              <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="male">Male</SelectItem>
                                <SelectItem value="female">Female</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="high_school">High School *</Label>
                            <Input
                              value={highSchool}
                              onChange={(e) => setHighSchool(e.target.value)}
                              placeholder="Enter your high school"
                              required
                            />
                          </div>
                          <div>
                            <Label htmlFor="club_team">Wrestling Club</Label>
                            <Input
                              value={club}
                              onChange={(e) => setClub(e.target.value)}
                              placeholder="Enter your wrestling club"
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="hometown">Hometown</Label>
                            <Input
                              placeholder="City, State"
                              value={hometown}
                              onChange={(e) => setHometown(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" value={user?.email || ""} disabled className="bg-gray-50" />
                          </div>
                        </div>

                        {/* Parent Contact */}
                        <div className="border-t pt-6">
                          <h3 className="text-lg font-semibold mb-4">Parent/Guardian Contact</h3>
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <Label htmlFor="parent_name">Parent Name *</Label>
                              <Input value={parentName} onChange={(e) => setParentName(e.target.value)} required />
                            </div>
                            <div>
                              <Label htmlFor="parent_phone">Parent Phone *</Label>
                              <Input
                                type="tel"
                                value={parentPhone}
                                onChange={(e) => setParentPhone(e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="parent_email">Parent Email *</Label>
                              <Input
                                type="email"
                                value={parentEmail}
                                onChange={(e) => setParentEmail(e.target.value)}
                                required
                              />
                            </div>
                            <div>
                              <Label htmlFor="relationship">Relationship *</Label>
                              <Select value={parentRelationship} onValueChange={setParentRelationship} required>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select relationship" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="mother">Mother</SelectItem>
                                  <SelectItem value="father">Father</SelectItem>
                                  <SelectItem value="guardian">Guardian</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Profile Preview */}
                  <div className="lg:col-span-1">
                    <Card className="sticky top-8">
                      <CardHeader>
                        <CardTitle className="font-oswald">Profile Preview</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="aspect-square bg-gradient-to-br from-blue-100 to-red-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                          <div className="text-center">
                            <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-500">Profile Photo</p>
                            <p className="text-xs text-gray-400">Upload later</p>
                          </div>
                        </div>

                        <div className="text-center">
                          <h3 className="text-xl font-bold font-oswald">
                            {firstName || "First"} {lastName || "Last"}
                          </h3>
                          <p className="text-gray-600">Class of {graduationYear}</p>
                          <p className="text-gray-600">
                            {weightClass && `${weightClass} • `}
                            {highSchool || "High School"}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>

              {/* Achievements and Other tabs remain the same */}
              <TabsContent value="achievements">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-oswald">Achievements</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Achievement tracking coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="other">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-oswald">Other Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Additional settings coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <div className="mt-8 flex justify-end">
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white font-semibold py-2 px-8 font-oswald"
                >
                  {saving ? (
                    "Saving Profile..."
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" /> Save Profile
                    </>
                  )}
                </Button>
              </div>
            </Tabs>
          </form>
        </div>
      </div>
    </div>
  )
}
