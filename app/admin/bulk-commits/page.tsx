"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Upload, Users, GraduationCap, Plus, CheckCircle, AlertCircle } from "lucide-react"
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
const GRADUATION_YEARS = [2025, 2026, 2027, 2028, 2029, 2030]
const NC_UNITED_TEAMS = ["Blue", "Gold", "Red", "White", "Black"]
const DIVISIONS = ["NCAA Division I", "NCAA Division II", "NCAA Division III", "NAIA", "NJCAA"]

const SAMPLE_COMMITS = [
  {
    first_name: "Mason",
    last_name: "Brown",
    weight_class: "157",
    graduation_year: 2025,
    high_school: "Green Hope High School",
    nc_united_team: "Blue",
    college_committed: "NC State University",
    college_division: "NCAA Division I",
    commitment_date: "2024-11-15",
    recruiting_summary: "2x State Placer, Regional Champion",
  },
  {
    first_name: "Everest",
    last_name: "Ouellette",
    weight_class: "175",
    graduation_year: 2025,
    high_school: "Cardinal Gibbons",
    nc_united_team: "Blue",
    college_committed: "Virginia Tech",
    college_division: "NCAA Division I",
    commitment_date: "2024-10-20",
    recruiting_summary: "State Champion, NHSCA All-American",
  },
  {
    first_name: "Brock",
    last_name: "Sullivan",
    weight_class: "190",
    graduation_year: 2025,
    high_school: "Apex High School",
    nc_united_team: "Blue",
    college_committed: "Duke University",
    college_division: "NCAA Division I",
    commitment_date: "2024-09-10",
    recruiting_summary: "Multiple-time State Placer",
  },
]

export default function BulkCommitsPage() {
  const [commits, setCommits] = useState([])
  const [currentCommit, setCurrentCommit] = useState({
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
    college_committed: "",
    college_division: "NCAA Division I",
    commitment_date: "",
    recruiting_summary: "",
    is_committed: true,
    is_active: true,
    is_public: true,
    is_featured: false,
  })
  const [bulkText, setBulkText] = useState("")
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadResults, setUploadResults] = useState([])

  const addCommit = () => {
    if (!currentCommit.first_name || !currentCommit.last_name || !currentCommit.college_committed) {
      toast.error("Please fill in name and college")
      return
    }

    setCommits([...commits, { ...currentCommit, id: Date.now() }])
    setCurrentCommit({
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
      college_committed: "",
      college_division: "NCAA Division I",
      commitment_date: "",
      recruiting_summary: "",
      is_committed: true,
      is_active: true,
      is_public: true,
      is_featured: false,
    })
    toast.success("Commit added to batch!")
  }

  const removeCommit = (id) => {
    setCommits(commits.filter((c) => c.id !== id))
  }

  const loadSampleData = () => {
    const sampleCommits = SAMPLE_COMMITS.map((commit, index) => ({
      ...commit,
      id: Date.now() + index,
      email: `${commit.first_name.toLowerCase()}.${commit.last_name.toLowerCase()}@example.com`,
      gender: "Male",
      wrestling_club: "NC United Wrestling",
      is_committed: true,
      is_active: true,
      is_public: true,
      is_featured: true,
    }))
    setCommits([...commits, ...sampleCommits])
    toast.success("Sample commits loaded!")
  }

  const parseBulkText = () => {
    if (!bulkText.trim()) {
      toast.error("Please enter bulk commit data")
      return
    }

    try {
      const lines = bulkText.trim().split("\n")
      const newCommits = []

      lines.forEach((line, index) => {
        const parts = line.split(",").map((p) => p.trim())
        if (parts.length >= 4) {
          const [firstName, lastName, college, weightClass, gradYear, highSchool] = parts
          newCommits.push({
            id: Date.now() + index,
            first_name: firstName,
            last_name: lastName,
            college_committed: college,
            weight_class: weightClass || "157",
            graduation_year: Number.parseInt(gradYear) || 2025,
            high_school: highSchool || "High School",
            email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
            gender: "Male",
            wrestling_club: "NC United Wrestling",
            nc_united_team: "Blue",
            college_division: "NCAA Division I",
            commitment_date: new Date().toISOString().split("T")[0],
            recruiting_summary: "Talented wrestler committed to excellence",
            is_committed: true,
            is_active: true,
            is_public: true,
            is_featured: false,
          })
        }
      })

      setCommits([...commits, ...newCommits])
      setBulkText("")
      toast.success(`Added ${newCommits.length} commits from bulk text!`)
    } catch (error) {
      toast.error("Error parsing bulk text. Please check format.")
    }
  }

  const uploadAllCommits = async () => {
    if (commits.length === 0) {
      toast.error("No commits to upload")
      return
    }

    setUploading(true)
    setUploadProgress(0)
    setUploadResults([])

    const results = []

    for (let i = 0; i < commits.length; i++) {
      const commit = commits[i]
      try {
        console.log(`📤 Uploading commit ${i + 1}/${commits.length}:`, commit)

        const response = await fetch("/api/athletes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(commit),
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.error || `HTTP ${response.status}`)
        }

        const result = await response.json()
        results.push({
          name: `${commit.first_name} ${commit.last_name}`,
          status: "success",
          college: commit.college_committed,
          id: result.athlete?.id,
        })

        console.log(`✅ Success: ${commit.first_name} ${commit.last_name}`)
      } catch (error) {
        console.error(`❌ Failed: ${commit.first_name} ${commit.last_name}`, error)
        results.push({
          name: `${commit.first_name} ${commit.last_name}`,
          status: "error",
          error: error.message,
          college: commit.college_committed,
        })
      }

      setUploadProgress(((i + 1) / commits.length) * 100)

      // Small delay to prevent overwhelming the database
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    setUploadResults(results)
    setUploading(false)

    const successCount = results.filter((r) => r.status === "success").length
    const errorCount = results.filter((r) => r.status === "error").length

    if (successCount > 0) {
      toast.success(`Successfully uploaded ${successCount} commits!`)
    }
    if (errorCount > 0) {
      toast.error(`${errorCount} commits failed to upload`)
    }

    // Clear commits after successful upload
    if (successCount === commits.length) {
      setCommits([])
    }
  }

  const updateCurrentCommit = (field, value) => {
    setCurrentCommit((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="container mx-auto p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Bulk Commit Management</h1>
          <p className="text-gray-600 mt-2">Efficiently add multiple athlete commitments</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={loadSampleData} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Load Sample Data
          </Button>
          <Button
            onClick={uploadAllCommits}
            disabled={commits.length === 0 || uploading}
            className="bg-green-600 hover:bg-green-700"
          >
            <Upload className="h-4 w-4 mr-2" />
            Upload All ({commits.length})
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{commits.length}</p>
                <p className="text-sm text-gray-600">Commits Ready</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <GraduationCap className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{uploadResults.filter((r) => r.status === "success").length}</p>
                <p className="text-sm text-gray-600">Uploaded Successfully</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{uploadResults.filter((r) => r.status === "error").length}</p>
                <p className="text-sm text-gray-600">Upload Errors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Add Single Commit */}
        <Card>
          <CardHeader>
            <CardTitle>Add Single Commit</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>First Name *</Label>
                <Input
                  value={currentCommit.first_name}
                  onChange={(e) => updateCurrentCommit("first_name", e.target.value)}
                  placeholder="John"
                />
              </div>
              <div>
                <Label>Last Name *</Label>
                <Input
                  value={currentCommit.last_name}
                  onChange={(e) => updateCurrentCommit("last_name", e.target.value)}
                  placeholder="Smith"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Weight Class</Label>
                <Select
                  value={currentCommit.weight_class}
                  onValueChange={(value) => updateCurrentCommit("weight_class", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select weight" />
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
                <Label>Graduation Year</Label>
                <Select
                  value={currentCommit.graduation_year.toString()}
                  onValueChange={(value) => updateCurrentCommit("graduation_year", Number.parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADUATION_YEARS.map((year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>High School</Label>
              <Input
                value={currentCommit.high_school}
                onChange={(e) => updateCurrentCommit("high_school", e.target.value)}
                placeholder="High School Name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>College Committed *</Label>
                <Input
                  value={currentCommit.college_committed}
                  onChange={(e) => updateCurrentCommit("college_committed", e.target.value)}
                  placeholder="University Name"
                />
              </div>
              <div>
                <Label>Division</Label>
                <Select
                  value={currentCommit.college_division}
                  onValueChange={(value) => updateCurrentCommit("college_division", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
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
            </div>

            <div>
              <Label>NC United Team</Label>
              <Select
                value={currentCommit.nc_united_team}
                onValueChange={(value) => updateCurrentCommit("nc_united_team", value)}
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

            <div>
              <Label>Recruiting Summary</Label>
              <Textarea
                value={currentCommit.recruiting_summary}
                onChange={(e) => updateCurrentCommit("recruiting_summary", e.target.value)}
                placeholder="Brief summary of achievements..."
                rows={3}
              />
            </div>

            <Button onClick={addCommit} className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add to Batch
            </Button>
          </CardContent>
        </Card>

        {/* Bulk Text Input */}
        <Card>
          <CardHeader>
            <CardTitle>Bulk Text Input</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>Bulk Commit Data</Label>
              <p className="text-sm text-gray-600 mb-2">
                Format: FirstName, LastName, College, WeightClass, GradYear, HighSchool
              </p>
              <Textarea
                value={bulkText}
                onChange={(e) => setBulkText(e.target.value)}
                placeholder={`John, Smith, Duke University, 157, 2025, Green Hope High
Jane, Doe, UNC Chapel Hill, 132, 2026, Cardinal Gibbons
Mike, Johnson, NC State, 175, 2025, Apex High`}
                rows={10}
              />
            </div>
            <Button onClick={parseBulkText} className="w-full" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Parse Bulk Text
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Upload Progress */}
      {uploading && (
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Uploading Commits...</h3>
                <span className="text-sm text-gray-600">{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="w-full" />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Commits Queue */}
      {commits.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Commits Queue ({commits.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {commits.map((commit) => (
                <div key={commit.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">
                        {commit.first_name} {commit.last_name}
                      </h4>
                      <Badge variant="outline">{commit.weight_class}lbs</Badge>
                      <Badge variant="outline">Class of {commit.graduation_year}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {commit.high_school} → {commit.college_committed} ({commit.college_division})
                    </p>
                  </div>
                  <Button
                    onClick={() => removeCommit(commit.id)}
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Results */}
      {uploadResults.length > 0 && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Upload Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {uploadResults.map((result, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">{result.name}</h4>
                      {result.status === "success" ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Success
                        </Badge>
                      ) : (
                        <Badge className="bg-red-100 text-red-800">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          Error
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {result.college}
                      {result.error && ` - Error: ${result.error}`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
