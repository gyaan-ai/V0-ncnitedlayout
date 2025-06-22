"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Edit, Save, X, Plus, Eye, Users, Award, GraduationCap, Upload, ImageIcon, Play } from "lucide-react"
import { toast } from "sonner"

const WEIGHT_CLASSES = [
  "106",
  "113",
  "120",
  "126",
  "132",
  "138",
  "144",
  "150",
  "157",
  "165",
  "175",
  "190",
  "215",
  "285",
]

const FEMALE_WEIGHT_CLASSES = [
  "100",
  "105",
  "110",
  "115",
  "120",
  "125",
  "130",
  "135",
  "140",
  "145",
  "155",
  "170",
  "190",
  "235",
]

const COLLEGE_WEIGHTS = ["125", "133", "141", "149", "157", "165", "174", "184", "197", "285"]
const GRADUATION_YEARS = [2025, 2026, 2027, 2028, 2029, 2030]
const NC_UNITED_TEAMS = ["Blue", "Gold", "Red", "White", "Black"]
const DIVISIONS = ["NCAA Division I", "NCAA Division II", "NCAA Division III", "NAIA", "NJCAA"]
const INTEREST_LEVELS = ["High", "Medium", "Low", "Committed"]
const GRADES = [
  "Pre-K",
  "Kindergarten",
  "1st Grade",
  "2nd Grade",
  "3rd Grade",
  "4th Grade",
  "5th Grade",
  "6th Grade",
  "7th Grade",
  "8th Grade",
  "9th Grade",
  "10th Grade",
  "11th Grade",
  "12th Grade",
  "College Freshman",
  "College Sophomore",
  "College Junior",
  "College Senior",
  "Graduate",
]

const NC_UNITED_NATIONAL_TEAMS = ["2024 UCD", "2025 NHSCA", "2025 UCD", "2026 NHSCA"]

const calculateAge = (dateOfBirth) => {
  if (!dateOfBirth) return null
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDiff = today.getMonth() - birthDate.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

const suggestGradeFromGradYear = (graduationYear) => {
  if (!graduationYear) return null

  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth() + 1 // 1-12

  // School year starts in August/September, so if we're past July, we're in the next school year
  const schoolYear = currentMonth >= 8 ? currentYear + 1 : currentYear

  const yearsUntilGrad = graduationYear - schoolYear

  switch (yearsUntilGrad) {
    case 0:
      return "12th Grade" // Graduating this school year
    case 1:
      return "11th Grade"
    case 2:
      return "10th Grade"
    case 3:
      return "9th Grade"
    case 4:
      return "8th Grade"
    case 5:
      return "7th Grade"
    case 6:
      return "6th Grade"
    default:
      if (yearsUntilGrad < 0) return "Graduate" // Already graduated
      if (yearsUntilGrad > 6) return "Elementary" // Too young to determine
      return null
  }
}

// YouTube URL validation helper
const isValidYouTubeUrl = (url) => {
  if (!url) return false
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/
  return youtubeRegex.test(url)
}

// Tournament achievement helpers
const addTournamentAchievement = (editForm, updateForm, tournament) => {
  const achievements = editForm.achievements || {}
  const tournamentAchievements = achievements[tournament] || []

  const newAchievement = {
    year: new Date().getFullYear(),
    placement: "",
    weight_class: editForm.weight_class || "",
    record: "",
    ...(tournament === "fargo" && { style: "freestyle" }),
    ...(tournament === "nchsaa" && { grade: editForm.grade || "" }),
  }

  updateForm("achievements", {
    ...achievements,
    [tournament]: [...tournamentAchievements, newAchievement],
  })
}

const updateTournamentAchievement = (editForm, updateForm, tournament, index, field, value) => {
  const achievements = editForm.achievements || {}
  const tournamentAchievements = [...(achievements[tournament] || [])]
  tournamentAchievements[index] = {
    ...tournamentAchievements[index],
    [field]: value,
  }

  updateForm("achievements", {
    ...achievements,
    [tournament]: tournamentAchievements,
  })
}

const removeTournamentAchievement = (editForm, updateForm, tournament, index) => {
  const achievements = editForm.achievements || {}
  const tournamentAchievements = [...(achievements[tournament] || [])]
  tournamentAchievements.splice(index, 1)

  updateForm("achievements", {
    ...achievements,
    [tournament]: tournamentAchievements,
  })
}

const addOtherAchievement = (editForm, updateForm) => {
  const achievements = editForm.achievements || {}
  const otherAchievements = achievements.other_achievements || []

  updateForm("achievements", {
    ...achievements,
    other_achievements: [...otherAchievements, ""],
  })
}

const updateOtherAchievement = (editForm, updateForm, index, value) => {
  const achievements = editForm.achievements || {}
  const otherAchievements = [...(achievements.other_achievements || [])]
  otherAchievements[index] = value

  updateForm("achievements", {
    ...achievements,
    other_achievements: otherAchievements,
  })
}

const removeOtherAchievement = (editForm, updateForm, index) => {
  const achievements = editForm.achievements || {}
  const otherAchievements = [...(achievements.other_achievements || [])]
  otherAchievements.splice(index, 1)

  updateForm("achievements", {
    ...achievements,
    other_achievements: otherAchievements,
  })
}

export default function ProfileManagement() {
  const [athletes, setAthletes] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedAthlete, setSelectedAthlete] = useState(null)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editForm, setEditForm] = useState({})
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCommitted, setFilterCommitted] = useState("all")
  const [uploadingCommitPhoto, setUploadingCommitPhoto] = useState(false)
  const [uploadingProfileImage, setUploadingProfileImage] = useState(false)
  const [generatingBio, setGeneratingBio] = useState(false)
  const [saving, setSaving] = useState(false)

  // Load athletes
  useEffect(() => {
    loadAthletes()
  }, [])

  const loadAthletes = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/athletes")

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch athletes`)
      }

      const data = await response.json()
      console.log("📊 Loaded athletes:", data)

      // Handle both array and object responses
      const athletesArray = Array.isArray(data) ? data : data.athletes || []
      setAthletes(athletesArray)
    } catch (error) {
      console.error("Error loading athletes:", error)
      toast.error(`Failed to load athlete profiles: ${error.message}`)
      setAthletes([])
    } finally {
      setLoading(false)
    }
  }

  const openEdit = (athlete) => {
    console.log("🔍 OPENING EDIT - Full AI Summary Check:", {
      athlete_id: athlete.id,
      athlete_name: `${athlete.first_name} ${athlete.last_name}`,
      generated_headline: athlete.generated_headline,
      generated_bio: athlete.generated_bio?.substring(0, 100) + "...",
      full_athlete_data: athlete,
    })

    setSelectedAthlete(athlete)
    // PRESERVE ALL REAL DATA - don't override anything
    setEditForm({
      ...athlete,
      // Ensure we keep the real AI data exactly as it comes from the database
      generated_headline: athlete.generated_headline || "",
      generated_bio: athlete.generated_bio || "",
    })
    setIsEditOpen(true)
  }

  const openCreate = () => {
    setEditForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      gender: "Male",
      weight_class: "",
      graduation_year: 2025,
      high_school: "",
      wrestling_club: "",
      nc_united_team: "Blue",
      is_active: true,
      is_committed: false,
      is_featured: false,
      is_public: true,
      // REMOVE ANY TEST VALUES - leave these empty
      generated_headline: "",
      generated_bio: "",
      achievements: {
        nchsaa: [],
        nhsca: [],
        super32: [],
        fargo: [],
        southeast_regionals: [],
        other_achievements: [],
      },
      wrestling_record: {},
    })
    setIsCreateOpen(true)
  }

  const closeDialogs = () => {
    setIsEditOpen(false)
    setIsCreateOpen(false)
    setSelectedAthlete(null)
    setEditForm({})
  }

  const saveAthlete = async () => {
    try {
      setSaving(true)
      const url = selectedAthlete ? `/api/athletes/${selectedAthlete.id}` : "/api/athletes"
      const method = selectedAthlete ? "PUT" : "POST"

      // Ensure we have the required fields
      if (!editForm.first_name || !editForm.last_name) {
        toast.error("First name and last name are required")
        return
      }

      // Create a clean payload without timestamp fields that might cause errors
      const payload = {
        ...editForm,
        // Explicitly include AI summary fields but not timestamps
        generated_headline: editForm.generated_headline || null,
        generated_bio: editForm.generated_bio || null,
      }

      console.log("💾 Saving athlete data with AI fields:", {
        id: selectedAthlete?.id,
        generated_headline: payload.generated_headline,
        generated_bio: payload.generated_bio?.substring(0, 50) + "...",
      })

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("❌ Save failed:", errorData)
        throw new Error(errorData.error || `HTTP ${response.status}: Failed to save athlete`)
      }

      const result = await response.json()
      console.log("✅ Save successful with AI fields:", {
        saved_headline: result.athlete?.generated_headline?.substring(0, 50) + "...",
        saved_bio: result.athlete?.generated_bio?.substring(0, 50) + "...",
      })

      toast.success(selectedAthlete ? "Profile updated successfully!" : "Profile created successfully!")
      closeDialogs()
      loadAthletes()
    } catch (error) {
      console.error("Save error:", error)
      toast.error(`Failed to save profile: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const updateForm = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }))
  }

  const addAchievement = () => {
    const achievements = Array.isArray(editForm.achievements) ? editForm.achievements : []
    updateForm("achievements", [...achievements, ""])
  }

  const updateAchievement = (index, value) => {
    const achievements = Array.isArray(editForm.achievements) ? [...editForm.achievements] : []
    achievements[index] = value
    updateForm("achievements", achievements)
  }

  const removeAchievement = (index) => {
    const achievements = Array.isArray(editForm.achievements) ? [...editForm.achievements] : []
    achievements.splice(index, 1)
    updateForm("achievements", achievements)
  }

  const handleCommitPhotoUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploadingCommitPhoto(true)

      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", "commitment")
      formData.append("athleteId", selectedAthlete?.id || "new")
      formData.append("athleteName", `${editForm.first_name || ""} ${editForm.last_name || ""}`.trim())

      const response = await fetch("/api/admin/upload-athlete-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const data = await response.json()
      updateForm("commitment_image_url", data.url)
      toast.success("Commitment photo uploaded successfully!")
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Failed to upload commitment photo")
    } finally {
      setUploadingCommitPhoto(false)
    }
  }

  const handleProfileImageUpload = async (event) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploadingProfileImage(true)

      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", "profile")
      formData.append("athleteId", selectedAthlete?.id || "new")
      formData.append("athleteName", `${editForm.first_name || ""} ${editForm.last_name || ""}`.trim())

      const response = await fetch("/api/admin/upload-athlete-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const data = await response.json()
      updateForm("profile_image_url", data.url)
      toast.success("Profile image uploaded successfully!")
    } catch (error) {
      console.error("Upload error:", error)
      toast.error("Failed to upload profile image")
    } finally {
      setUploadingProfileImage(false)
    }
  }

  // Filter athletes
  const filteredAthletes = athletes.filter((athlete) => {
    const matchesSearch =
      athlete.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.high_school?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      athlete.college_committed?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCommitted =
      filterCommitted === "all" ||
      (filterCommitted === "committed" && athlete.is_committed) ||
      (filterCommitted === "uncommitted" && !athlete.is_committed)

    return matchesSearch && matchesCommitted
  })

  const generateBio = async () => {
    if (!editForm.first_name || !editForm.last_name) {
      toast.error("Please enter athlete's name first")
      return
    }

    try {
      setGeneratingBio(true)

      // Use the correct form data structure
      const athleteData = {
        first_name: editForm.first_name,
        last_name: editForm.last_name,
        weight_class: editForm.weight_class,
        graduation_year: editForm.graduation_year,
        high_school: editForm.high_school,
        wrestling_club: editForm.wrestling_club,
        college_committed: editForm.college_committed,
        college_division: editForm.college_division,
        nc_united_team: editForm.nc_united_team,
        hometown: editForm.hometown,
        gpa: editForm.gpa,
        achievements: editForm.achievements || {},
        wrestling_record: editForm.wrestling_record || {},
      }

      const response = await fetch("/api/admin/generate-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ athlete: athleteData }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate bio")
      }

      const data = await response.json()

      if (data.success) {
        // Update form with generated content
        setEditForm((prev) => ({
          ...prev,
          generated_headline: data.generated_headline,
          generated_bio: data.generated_bio,
        }))

        toast.success("Bio generated successfully!")
      } else {
        throw new Error(data.error || "Failed to generate bio")
      }
    } catch (error) {
      console.error("Bio generation error:", error)
      toast.error("Failed to generate bio. Please try again.")
    } finally {
      setGeneratingBio(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg">Loading athlete profiles...</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Profile Management</h1>
          <p className="text-gray-600 mt-2">Comprehensive athlete profile system - the heart of NC United</p>
        </div>
        <Button onClick={openCreate} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          New Profile
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{athletes.length}</p>
                <p className="text-sm text-gray-600">Total Athletes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{athletes.filter((a) => a.is_committed).length}</p>
                <p className="text-sm text-gray-600">Committed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Award className="h-8 w-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{athletes.filter((a) => a.is_featured).length}</p>
                <p className="text-sm text-gray-600">Featured</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Eye className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{athletes.filter((a) => a.is_public).length}</p>
                <p className="text-sm text-gray-600">Public Profiles</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1">
              <Input
                placeholder="Search athletes by name, school, or college..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterCommitted} onValueChange={setFilterCommitted}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Athletes</SelectItem>
                <SelectItem value="committed">Committed Only</SelectItem>
                <SelectItem value="uncommitted">Uncommitted Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Athletes List */}
      <div className="space-y-4">
        {filteredAthletes.length === 0 ? (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Athletes Found</h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || filterCommitted !== "all"
                  ? "No athletes match your current filters."
                  : "Get started by creating your first athlete profile."}
              </p>
              {!searchTerm && filterCommitted === "all" && (
                <Button onClick={openCreate}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Profile
                </Button>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredAthletes.map((athlete) => (
            <Card key={athlete.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold">
                        {athlete.first_name} {athlete.last_name}
                      </h3>
                      <div className="flex gap-2">
                        {athlete.is_committed && <Badge className="bg-green-100 text-green-800">Committed</Badge>}
                        {athlete.is_featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                        {athlete.youtube_highlight_url && (
                          <Badge className="bg-red-100 text-red-800">
                            <Play className="h-3 w-3 mr-1" />
                            Video
                          </Badge>
                        )}
                        <Badge
                          variant="outline"
                          className={`${
                            athlete.nc_united_team === "Blue"
                              ? "border-blue-500 text-blue-700"
                              : athlete.nc_united_team === "Gold"
                                ? "border-yellow-500 text-yellow-700"
                                : "border-gray-500 text-gray-700"
                          }`}
                        >
                          NC United {athlete.nc_united_team}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-gray-600 space-y-1">
                      <p>
                        <span className="font-medium">{athlete.high_school}</span> •
                        <span className="ml-1">{athlete.weight_class}lbs</span> •
                        <span className="ml-1">Class of {athlete.graduation_year}</span>
                        {athlete.date_of_birth && (
                          <span className="ml-1">• Age {calculateAge(athlete.date_of_birth)}</span>
                        )}
                      </p>
                      {athlete.grade && (
                        <p>
                          <span className="font-medium">Grade:</span> {athlete.grade}
                        </p>
                      )}
                      {athlete.wrestling_club && (
                        <p>
                          <span className="font-medium">Club:</span> {athlete.wrestling_club}
                        </p>
                      )}
                      {athlete.college_committed && (
                        <p className="text-green-700">
                          <span className="font-medium">Committed to:</span> {athlete.college_committed}
                          {athlete.college_division && ` (${athlete.college_division})`}
                        </p>
                      )}
                    </div>
                  </div>
                  <Button onClick={() => openEdit(athlete)} variant="outline">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Edit/Create Dialog */}
      <Dialog open={isEditOpen || isCreateOpen} onOpenChange={closeDialogs}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              {selectedAthlete
                ? `Edit ${selectedAthlete.first_name} ${selectedAthlete.last_name}`
                : "Create New Profile"}
            </DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-8">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="wrestling">Wrestling</TabsTrigger>
              <TabsTrigger value="academic">Academic</TabsTrigger>
              <TabsTrigger value="commitment">Commitment</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="media">Media</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
            </TabsList>

            {/* Summary Tab */}
            <TabsContent value="summary" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    AI-Generated Profile Summary
                    <Button
                      onClick={generateBio}
                      disabled={generatingBio || !editForm.first_name || !editForm.last_name}
                      variant="outline"
                    >
                      {generatingBio ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Award className="h-4 w-4 mr-2" />
                          Generate Bio
                        </>
                      )}
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Hero Image Section */}
                  <div className="text-center">
                    <div className="relative inline-block">
                      <img
                        src={
                          editForm.profile_image_url || "/placeholder.svg?height=200&width=200&query=athlete+headshot"
                        }
                        alt="Profile"
                        className="w-48 h-48 object-cover rounded-full mx-auto shadow-lg border-4 border-white"
                      />
                    </div>
                  </div>

                  {/* Generated Headline */}
                  <div>
                    <Label>Generated Headline</Label>
                    <Input
                      value={editForm.generated_headline || ""}
                      onChange={(e) => updateForm("generated_headline", e.target.value)}
                      placeholder="AI will generate a compelling headline..."
                      className="text-lg font-semibold"
                    />
                  </div>

                  {/* Generated Bio */}
                  <div>
                    <Label>Generated Bio</Label>
                    <Textarea
                      value={editForm.generated_bio || ""}
                      onChange={(e) => updateForm("generated_bio", e.target.value)}
                      placeholder="AI will generate a comprehensive bio using all profile data..."
                      rows={8}
                      className="text-base leading-relaxed"
                    />
                  </div>

                  {/* Quick Stats Preview */}
                  <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-blue-600">{editForm.weight_class || "---"}</p>
                      <p className="text-sm text-gray-600">Weight Class</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-green-600">{editForm.graduation_year || "---"}</p>
                      <p className="text-sm text-gray-600">Grad Year</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-purple-600">{editForm.gpa || "---"}</p>
                      <p className="text-sm text-gray-600">GPA</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold text-orange-600">
                        {editForm.wrestling_record?.wins || 0}-{editForm.wrestling_record?.losses || 0}
                      </p>
                      <p className="text-sm text-gray-600">Record</p>
                    </div>
                  </div>

                  {/* Preview Card */}
                  {(editForm.generated_headline || editForm.generated_bio) && (
                    <Card className="border-2 border-blue-200 bg-blue-50">
                      <CardHeader>
                        <CardTitle className="text-blue-800">Public Profile Preview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center space-y-4">
                          <img
                            src={
                              editForm.profile_image_url ||
                              "/placeholder.svg?height=150&width=150&query=athlete+headshot" ||
                              "/placeholder.svg" ||
                              "/placeholder.svg" ||
                              "/placeholder.svg" ||
                              "/placeholder.svg" ||
                              "/placeholder.svg" ||
                              "/placeholder.svg" ||
                              "/placeholder.svg" ||
                              "/placeholder.svg" ||
                              "/placeholder.svg" ||
                              "/placeholder.svg"
                            }
                            alt="Preview"
                            className="w-32 h-32 object-cover rounded-full mx-auto shadow-md"
                          />
                          {editForm.generated_headline && (
                            <h2 className="text-xl font-bold text-gray-800">{editForm.generated_headline}</h2>
                          )}
                          {editForm.generated_bio && (
                            <p className="text-gray-700 leading-relaxed max-w-2xl mx-auto">{editForm.generated_bio}</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Basic Info Tab */}
            <TabsContent value="basic" className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>First Name *</Label>
                  <Input
                    value={editForm.first_name || ""}
                    onChange={(e) => updateForm("first_name", e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label>Last Name *</Label>
                  <Input
                    value={editForm.last_name || ""}
                    onChange={(e) => updateForm("last_name", e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={editForm.email || ""}
                    onChange={(e) => updateForm("email", e.target.value)}
                    placeholder="athlete@example.com"
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    value={editForm.phone || ""}
                    onChange={(e) => updateForm("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div>
                  <Label>Date of Birth</Label>
                  <Input
                    type="date"
                    value={editForm.date_of_birth || ""}
                    onChange={(e) => updateForm("date_of_birth", e.target.value)}
                  />
                  {editForm.date_of_birth && (
                    <p className="text-sm text-gray-500 mt-1">Age: {calculateAge(editForm.date_of_birth)} years old</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Gender</Label>
                  <Select value={editForm.gender || "Male"} onValueChange={(value) => updateForm("gender", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Male</SelectItem>
                      <SelectItem value="Female">Female</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Grade</Label>
                  <Select value={editForm.grade || ""} onValueChange={(value) => updateForm("grade", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {GRADES.map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Hometown</Label>
                <Input
                  value={editForm.hometown || ""}
                  onChange={(e) => updateForm("hometown", e.target.value)}
                  placeholder="City, State"
                />
              </div>

              {/* Add High School and Wrestling Club here */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>High School *</Label>
                  <Input
                    value={editForm.high_school || ""}
                    onChange={(e) => updateForm("high_school", e.target.value)}
                    placeholder="Enter high school name"
                  />
                </div>
                <div>
                  <Label>Wrestling Club</Label>
                  <Input
                    value={editForm.wrestling_club || ""}
                    onChange={(e) => updateForm("wrestling_club", e.target.value)}
                    placeholder="Enter wrestling club"
                  />
                </div>
              </div>
            </TabsContent>

            {/* Wrestling Tab */}
            <TabsContent value="wrestling" className="space-y-6">
              {/* Basic Wrestling Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Wrestling Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>Weight Class *</Label>
                      <Select
                        value={editForm.weight_class || ""}
                        onValueChange={(value) => updateForm("weight_class", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select weight" />
                        </SelectTrigger>
                        <SelectContent>
                          {(editForm.gender === "Female" ? FEMALE_WEIGHT_CLASSES : WEIGHT_CLASSES).map((weight) => (
                            <SelectItem key={weight} value={weight}>
                              {weight}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Graduation Year *</Label>
                      <Select
                        value={editForm.graduation_year?.toString() || ""}
                        onValueChange={(value) => {
                          const year = Number.parseInt(value)
                          updateForm("graduation_year", year)

                          // Auto-suggest grade if not already set
                          if (!editForm.grade) {
                            const suggestedGrade = suggestGradeFromGradYear(year)
                            if (suggestedGrade) {
                              updateForm("grade", suggestedGrade)
                            }
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select year" />
                        </SelectTrigger>
                        <SelectContent>
                          {GRADUATION_YEARS.map((year) => (
                            <SelectItem key={year} value={year.toString()}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {editForm.graduation_year && !editForm.grade && (
                        <p className="text-sm text-blue-600 mt-1">
                          Suggested grade: {suggestGradeFromGradYear(editForm.graduation_year)}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label>NC United Team</Label>
                      <Select
                        value={editForm.nc_united_team || "Blue"}
                        onValueChange={(value) => updateForm("nc_united_team", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {NC_UNITED_TEAMS.map((team) => (
                            <SelectItem key={team} value={team}>
                              {team}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label>Wrestling Record</Label>
                    <div className="grid grid-cols-4 gap-4 mt-2">
                      <div>
                        <Label className="text-sm">Wins</Label>
                        <Input
                          type="number"
                          value={editForm.wrestling_record?.wins || ""}
                          onChange={(e) =>
                            updateForm("wrestling_record", {
                              ...(editForm.wrestling_record || {}),
                              wins: Number.parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Losses</Label>
                        <Input
                          type="number"
                          value={editForm.wrestling_record?.losses || ""}
                          onChange={(e) =>
                            updateForm("wrestling_record", {
                              ...(editForm.wrestling_record || {}),
                              losses: Number.parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Pins</Label>
                        <Input
                          type="number"
                          value={editForm.wrestling_record?.pins || ""}
                          onChange={(e) =>
                            updateForm("wrestling_record", {
                              ...(editForm.wrestling_record || {}),
                              pins: Number.parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Tech Falls</Label>
                        <Input
                          type="number"
                          value={editForm.wrestling_record?.tech_falls || ""}
                          onChange={(e) =>
                            updateForm("wrestling_record", {
                              ...(editForm.wrestling_record || {}),
                              tech_falls: Number.parseInt(e.target.value) || 0,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Achievements */}
              <Card>
                <CardHeader>
                  <CardTitle>Individual Achievements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* NCHSAA State Championships */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-lg font-semibold">NCHSAA State Championships</Label>
                      <Button
                        onClick={() => addTournamentAchievement(editForm, updateForm, "nchsaa")}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add State Result
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {(editForm.achievements?.nchsaa || []).map((achievement, index) => (
                        <div key={index} className="grid grid-cols-6 gap-3 p-3 border rounded-lg">
                          <div>
                            <Label className="text-sm">Year</Label>
                            <Select
                              value={achievement.year?.toString() || ""}
                              onValueChange={(value) =>
                                updateTournamentAchievement(
                                  editForm,
                                  updateForm,
                                  "nchsaa",
                                  index,
                                  "year",
                                  Number.parseInt(value),
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent>
                                {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map((year) => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Grade</Label>
                            <Select
                              value={achievement.grade || ""}
                              onValueChange={(value) =>
                                updateTournamentAchievement(editForm, updateForm, "nchsaa", index, "grade", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Grade" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="freshman">Freshman</SelectItem>
                                <SelectItem value="sophomore">Sophomore</SelectItem>
                                <SelectItem value="junior">Junior</SelectItem>
                                <SelectItem value="senior">Senior</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Placement</Label>
                            <Select
                              value={achievement.placement || ""}
                              onValueChange={(value) =>
                                updateTournamentAchievement(editForm, updateForm, "nchsaa", index, "placement", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Place" />
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  "1st",
                                  "2nd",
                                  "3rd",
                                  "4th",
                                  "5th",
                                  "6th",
                                  "7th",
                                  "8th",
                                  "9th",
                                  "10th",
                                  "11th",
                                  "12th",
                                  "13th",
                                  "14th",
                                  "15th",
                                  "16th",
                                  "DNP",
                                ].map((place) => (
                                  <SelectItem key={place} value={place}>
                                    {place}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Weight Class</Label>
                            <Select
                              value={achievement.weight_class || ""}
                              onValueChange={(value) =>
                                updateTournamentAchievement(
                                  editForm,
                                  updateForm,
                                  "nchsaa",
                                  index,
                                  "weight_class",
                                  value,
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Weight" />
                              </SelectTrigger>
                              <SelectContent>
                                {WEIGHT_CLASSES.map((weight) => (
                                  <SelectItem key={weight} value={weight}>
                                    {weight}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Record</Label>
                            <Input
                              value={achievement.record || ""}
                              onChange={(e) =>
                                updateTournamentAchievement(
                                  editForm,
                                  updateForm,
                                  "nchsaa",
                                  index,
                                  "record",
                                  e.target.value,
                                )
                              }
                              placeholder="4-0"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button
                              onClick={() => removeTournamentAchievement(editForm, updateForm, "nchsaa", index)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* NHSCA */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-lg font-semibold">NHSCA Nationals</Label>
                      <Button
                        onClick={() => addTournamentAchievement(editForm, updateForm, "nhsca")}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add NHSCA Result
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {(editForm.achievements?.nhsca || []).map((achievement, index) => (
                        <div key={index} className="grid grid-cols-5 gap-3 p-3 border rounded-lg">
                          <div>
                            <Label className="text-sm">Year</Label>
                            <Select
                              value={achievement.year?.toString() || ""}
                              onValueChange={(value) =>
                                updateTournamentAchievement(
                                  editForm,
                                  updateForm,
                                  "nhsca",
                                  index,
                                  "year",
                                  Number.parseInt(value),
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent>
                                {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map((year) => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Placement</Label>
                            <Select
                              value={achievement.placement || ""}
                              onValueChange={(value) =>
                                updateTournamentAchievement(editForm, updateForm, "nhsca", index, "placement", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Place" />
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  "1st",
                                  "2nd",
                                  "3rd",
                                  "4th",
                                  "5th",
                                  "6th",
                                  "7th",
                                  "8th",
                                  "9th",
                                  "10th",
                                  "11th",
                                  "12th",
                                  "13th",
                                  "14th",
                                  "15th",
                                  "16th",
                                  "DNP",
                                ].map((place) => (
                                  <SelectItem key={place} value={place}>
                                    {place}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Weight Class</Label>
                            <Select
                              value={achievement.weight_class || ""}
                              onValueChange={(value) =>
                                updateTournamentAchievement(editForm, updateForm, "nhsca", index, "weight_class", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Weight" />
                              </SelectTrigger>
                              <SelectContent>
                                {WEIGHT_CLASSES.map((weight) => (
                                  <SelectItem key={weight} value={weight}>
                                    {weight}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Record</Label>
                            <Input
                              value={achievement.record || ""}
                              onChange={(e) =>
                                updateTournamentAchievement(
                                  editForm,
                                  updateForm,
                                  "nhsca",
                                  index,
                                  "record",
                                  e.target.value,
                                )
                              }
                              placeholder="5-1"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button
                              onClick={() => removeTournamentAchievement(editForm, updateForm, "nhsca", index)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Super32 */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-lg font-semibold">Super32</Label>
                      <Button
                        onClick={() => addTournamentAchievement(editForm, updateForm, "super32")}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Super32 Result
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {(editForm.achievements?.super32 || []).map((achievement, index) => (
                        <div key={index} className="grid grid-cols-5 gap-3 p-3 border rounded-lg">
                          <div>
                            <Label className="text-sm">Year</Label>
                            <Select
                              value={achievement.year?.toString() || ""}
                              onValueChange={(value) =>
                                updateTournamentAchievement(
                                  editForm,
                                  updateForm,
                                  "super32",
                                  index,
                                  "year",
                                  Number.parseInt(value),
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent>
                                {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map((year) => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Placement</Label>
                            <Select
                              value={achievement.placement || ""}
                              onValueChange={(value) =>
                                updateTournamentAchievement(editForm, updateForm, "super32", index, "placement", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Place" />
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  "1st",
                                  "2nd",
                                  "3rd",
                                  "4th",
                                  "5th",
                                  "6th",
                                  "7th",
                                  "8th",
                                  "9th",
                                  "10th",
                                  "11th",
                                  "12th",
                                  "13th",
                                  "14th",
                                  "15th",
                                  "16th",
                                  "DNP",
                                ].map((place) => (
                                  <SelectItem key={place} value={place}>
                                    {place}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Weight Class</Label>
                            <Select
                              value={achievement.weight_class || ""}
                              onValueChange={(value) =>
                                updateTournamentAchievement(
                                  editForm,
                                  updateForm,
                                  "super32",
                                  index,
                                  "weight_class",
                                  value,
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Weight" />
                              </SelectTrigger>
                              <SelectContent>
                                {WEIGHT_CLASSES.map((weight) => (
                                  <SelectItem key={weight} value={weight}>
                                    {weight}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Record</Label>
                            <Input
                              value={achievement.record || ""}
                              onChange={(e) =>
                                updateTournamentAchievement(
                                  editForm,
                                  updateForm,
                                  "super32",
                                  index,
                                  "record",
                                  e.target.value,
                                )
                              }
                              placeholder="4-1"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button
                              onClick={() => removeTournamentAchievement(editForm, updateForm, "super32", index)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Fargo */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-lg font-semibold">Fargo Nationals</Label>
                      <Button
                        onClick={() => addTournamentAchievement(editForm, updateForm, "fargo")}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Fargo Result
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {(editForm.achievements?.fargo || []).map((achievement, index) => (
                        <div key={index} className="grid grid-cols-6 gap-3 p-3 border rounded-lg">
                          <div>
                            <Label className="text-sm">Year</Label>
                            <Select
                              value={achievement.year?.toString() || ""}
                              onValueChange={(value) =>
                                updateTournamentAchievement(
                                  editForm,
                                  updateForm,
                                  "fargo",
                                  index,
                                  "year",
                                  Number.parseInt(value),
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent>
                                {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map((year) => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Style</Label>
                            <Select
                              value={achievement.style || ""}
                              onValueChange={(value) =>
                                updateTournamentAchievement(editForm, updateForm, "fargo", index, "style", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Style" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="freestyle">Freestyle</SelectItem>
                                <SelectItem value="greco">Greco-Roman</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Placement</Label>
                            <Select
                              value={achievement.placement || ""}
                              onValueChange={(value) =>
                                updateTournamentAchievement(editForm, updateForm, "fargo", index, "placement", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Place" />
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  "1st",
                                  "2nd",
                                  "3rd",
                                  "4th",
                                  "5th",
                                  "6th",
                                  "7th",
                                  "8th",
                                  "9th",
                                  "10th",
                                  "11th",
                                  "12th",
                                  "13th",
                                  "14th",
                                  "15th",
                                  "16th",
                                  "DNP",
                                ].map((place) => (
                                  <SelectItem key={place} value={place}>
                                    {place}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Weight Class</Label>
                            <Select
                              value={achievement.weight_class || ""}
                              onValueChange={(value) =>
                                updateTournamentAchievement(editForm, updateForm, "fargo", index, "weight_class", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Weight" />
                              </SelectTrigger>
                              <SelectContent>
                                {WEIGHT_CLASSES.map((weight) => (
                                  <SelectItem key={weight} value={weight}>
                                    {weight}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Record</Label>
                            <Input
                              value={achievement.record || ""}
                              onChange={(e) =>
                                updateTournamentAchievement(
                                  editForm,
                                  updateForm,
                                  "fargo",
                                  index,
                                  "record",
                                  e.target.value,
                                )
                              }
                              placeholder="3-2"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button
                              onClick={() => removeTournamentAchievement(editForm, updateForm, "fargo", index)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Southeast Regionals */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-lg font-semibold">Southeast Regionals</Label>
                      <Button
                        onClick={() => addTournamentAchievement(editForm, updateForm, "southeast_regionals")}
                        variant="outline"
                        size="sm"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add SE Regional Result
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {(editForm.achievements?.southeast_regionals || []).map((achievement, index) => (
                        <div key={index} className="grid grid-cols-5 gap-3 p-3 border rounded-lg">
                          <div>
                            <Label className="text-sm">Year</Label>
                            <Select
                              value={achievement.year?.toString() || ""}
                              onValueChange={(value) =>
                                updateTournamentAchievement(
                                  editForm,
                                  updateForm,
                                  "southeast_regionals",
                                  index,
                                  "year",
                                  Number.parseInt(value),
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent>
                                {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018].map((year) => (
                                  <SelectItem key={year} value={year.toString()}>
                                    {year}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Placement</Label>
                            <Select
                              value={achievement.placement || ""}
                              onValueChange={(value) =>
                                updateTournamentAchievement(
                                  editForm,
                                  updateForm,
                                  "southeast_regionals",
                                  index,
                                  "placement",
                                  value,
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Place" />
                              </SelectTrigger>
                              <SelectContent>
                                {[
                                  "1st",
                                  "2nd",
                                  "3rd",
                                  "4th",
                                  "5th",
                                  "6th",
                                  "7th",
                                  "8th",
                                  "9th",
                                  "10th",
                                  "11th",
                                  "12th",
                                  "13th",
                                  "14th",
                                  "15th",
                                  "16th",
                                  "DNP",
                                ].map((place) => (
                                  <SelectItem key={place} value={place}>
                                    {place}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Weight Class</Label>
                            <Select
                              value={achievement.weight_class || ""}
                              onValueChange={(value) =>
                                updateTournamentAchievement(
                                  editForm,
                                  updateForm,
                                  "southeast_regionals",
                                  index,
                                  "weight_class",
                                  value,
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Weight" />
                              </SelectTrigger>
                              <SelectContent>
                                {WEIGHT_CLASSES.map((weight) => (
                                  <SelectItem key={weight} value={weight}>
                                    {weight}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-sm">Record</Label>
                            <Input
                              value={achievement.record || ""}
                              onChange={(e) =>
                                updateTournamentAchievement(
                                  editForm,
                                  updateForm,
                                  "southeast_regionals",
                                  index,
                                  "record",
                                  e.target.value,
                                )
                              }
                              placeholder="2-2"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button
                              onClick={() =>
                                removeTournamentAchievement(editForm, updateForm, "southeast_regionals", index)
                              }
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Other Achievements */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label className="text-lg font-semibold">Other Achievements</Label>
                      <Button onClick={() => addOtherAchievement(editForm, updateForm)} variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        Add Achievement
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {(editForm.achievements?.other_achievements || []).map((achievement, index) => (
                        <div key={index} className="grid grid-cols-5 gap-3 p-3 border rounded-lg">
                          <div className="col-span-4">
                            <Label className="text-sm">Achievement</Label>
                            <Input
                              value={achievement || ""}
                              onChange={(e) => updateOtherAchievement(editForm, updateForm, index, e.target.value)}
                              placeholder="Describe achievement"
                            />
                          </div>
                          <div className="flex items-end">
                            <Button
                              onClick={() => removeOtherAchievement(editForm, updateForm, index)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Academic Tab */}
            <TabsContent value="academic" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Academic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>GPA</Label>
                      <Input
                        type="number"
                        value={editForm.gpa || ""}
                        onChange={(e) => updateForm("gpa", e.target.value)}
                        placeholder="4.0"
                      />
                    </div>
                    <div>
                      <Label>SAT Score</Label>
                      <Input
                        type="number"
                        value={editForm.sat_score || ""}
                        onChange={(e) => updateForm("sat_score", e.target.value)}
                        placeholder="1600"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Academic Achievements</Label>
                    <Textarea
                      value={editForm.academic_achievements || ""}
                      onChange={(e) => updateForm("academic_achievements", e.target.value)}
                      placeholder="List academic achievements"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Commitment Tab */}
            <TabsContent value="commitment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>College Commitment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Committed?</Label>
                      <Switch
                        checked={editForm.is_committed || false}
                        onChecked
                        checked={editForm.is_committed || false}
                        onCheckedChange={(checked) => updateForm("is_committed", checked)}
                      />
                    </div>
                    {editForm.is_committed && (
                      <div>
                        <Label>College Committed To</Label>
                        <Input
                          value={editForm.college_committed || ""}
                          onChange={(e) => updateForm("college_committed", e.target.value)}
                          placeholder="Enter college name"
                        />
                      </div>
                    )}
                  </div>

                  {editForm.is_committed && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>College Division</Label>
                          <Select
                            value={editForm.college_division || ""}
                            onValueChange={(value) => updateForm("college_division", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select division" />
                            </SelectTrigger>
                            <SelectContent>
                              {DIVISIONS.map((division) => (
                                <SelectItem key={division} value={division}>
                                  {division}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>College Weight</Label>
                          <Select
                            value={editForm.college_weight || ""}
                            onValueChange={(value) => updateForm("college_weight", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select weight" />
                            </SelectTrigger>
                            <SelectContent>
                              {COLLEGE_WEIGHTS.map((weight) => (
                                <SelectItem key={weight} value={weight}>
                                  {weight}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label>Commitment Image</Label>
                        <Input
                          type="file"
                          id="commitment-image-upload"
                          accept="image/*"
                          onChange={handleCommitPhotoUpload}
                          className="hidden"
                        />
                        <div className="flex items-center justify-between">
                          <Button asChild variant="outline" disabled={uploadingCommitPhoto}>
                            <Label htmlFor="commitment-image-upload" className="cursor-pointer">
                              {uploadingCommitPhoto ? (
                                <>
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                                  Uploading...
                                </>
                              ) : (
                                <>
                                  <Upload className="h-4 w-4 mr-2" />
                                  Upload Image
                                </>
                              )}
                            </Label>
                          </Button>
                          {editForm.commitment_image_url && (
                            <a
                              href={editForm.commitment_image_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                            >
                              View Image
                            </a>
                          )}
                        </div>
                        {editForm.commitment_image_url && (
                          <div className="relative w-48 h-32 mt-2">
                            <img
                              src={editForm.commitment_image_url || "/placeholder.svg"}
                              alt="Commitment"
                              className="object-cover rounded-md shadow-md"
                            />
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Parent/Guardian Name</Label>
                    <Input
                      value={editForm.parent_name || ""}
                      onChange={(e) => updateForm("parent_name", e.target.value)}
                      placeholder="Enter parent/guardian name"
                    />
                  </div>
                  <div>
                    <Label>Parent/Guardian Email</Label>
                    <Input
                      type="email"
                      value={editForm.parent_email || ""}
                      onChange={(e) => updateForm("parent_email", e.target.value)}
                      placeholder="parent@example.com"
                    />
                  </div>
                  <div>
                    <Label>Parent/Guardian Phone</Label>
                    <Input
                      value={editForm.parent_phone || ""}
                      onChange={(e) => updateForm("parent_phone", e.target.value)}
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <Label>Address</Label>
                    <Input
                      value={editForm.address || ""}
                      onChange={(e) => updateForm("address", e.target.value)}
                      placeholder="Enter address"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Media Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Profile Image</Label>
                    <Input
                      type="file"
                      id="profile-image-upload"
                      accept="image/*"
                      onChange={handleProfileImageUpload}
                      className="hidden"
                    />
                    <div className="flex items-center justify-between">
                      <Button asChild variant="outline" disabled={uploadingProfileImage}>
                        <Label htmlFor="profile-image-upload" className="cursor-pointer">
                          {uploadingProfileImage ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                              Uploading...
                            </>
                          ) : (
                            <>
                              <ImageIcon className="h-4 w-4 mr-2" />
                              Upload Image
                            </>
                          )}
                        </Label>
                      </Button>
                      {editForm.profile_image_url && (
                        <a
                          href={editForm.profile_image_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          View Image
                        </a>
                      )}
                    </div>
                    {editForm.profile_image_url && (
                      <div className="relative w-48 h-32 mt-2">
                        <img
                          src={editForm.profile_image_url || "/placeholder.svg"}
                          alt="Profile"
                          className="object-cover rounded-md shadow-md"
                        />
                      </div>
                    )}
                  </div>
                  <div>
                    <Label>YouTube Highlight URL</Label>
                    <Input
                      type="url"
                      value={editForm.youtube_highlight_url || ""}
                      onChange={(e) => updateForm("youtube_highlight_url", e.target.value)}
                      placeholder="https://www.youtube.com/watch?v=xxxxxxxxxxx"
                    />
                    {!isValidYouTubeUrl(editForm.youtube_highlight_url) && editForm.youtube_highlight_url && (
                      <p className="text-red-500 text-sm mt-1">Invalid YouTube URL</p>
                    )}
                  </div>
                  <div>
                    <Label>Additional Links</Label>
                    <Textarea
                      value={editForm.additional_links || ""}
                      onChange={(e) => updateForm("additional_links", e.target.value)}
                      placeholder="List additional links"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Goals Tab */}
            <TabsContent value="goals" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Goals and Interests</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Wrestling Goals</Label>
                    <Textarea
                      value={editForm.wrestling_goals || ""}
                      onChange={(e) => updateForm("wrestling_goals", e.target.value)}
                      placeholder="Describe wrestling goals"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>Academic Goals</Label>
                    <Textarea
                      value={editForm.academic_goals || ""}
                      onChange={(e) => updateForm("academic_goals", e.target.value)}
                      placeholder="Describe academic goals"
                      rows={4}
                    />
                  </div>
                  <div>
                    <Label>Interest Level</Label>
                    <Select
                      value={editForm.interest_level || ""}
                      onChange={(e) => updateForm("interest_level", e.target.value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select interest level" />
                      </SelectTrigger>
                      <SelectContent>
                        {INTEREST_LEVELS.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Notes</Label>
                    <Textarea
                      value={editForm.notes || ""}
                      onChange={(e) => updateForm("notes", e.target.value)}
                      placeholder="Add any notes"
                      rows={4}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end mt-4">
            <Button type="button" variant="secondary" onClick={closeDialogs} className="mr-2">
              Cancel
            </Button>
            <Button onClick={saveAthlete} disabled={saving}>
              {saving ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white-600 mr-2"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
