"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { createClient } from "@/lib/supabase/client"
import { AlertCircle, CheckCircle, FileSpreadsheet, Upload, Info } from "lucide-react"

type ImportStatus = "idle" | "parsing" | "uploading" | "success" | "error"

interface ParsedAthlete {
  first_name: string
  last_name: string
  graduation_year: number
  weight_class: string
  high_school: string
  club_team?: string
  gender?: string
  college_committed?: string
  college_division?: string
  commitment_date?: string
  achievements?: string[]
  image_file?: File
  image_url?: string
  email?: string
  college_name?: string // Keep original name for lookup
  high_school_name?: string // Keep original name for lookup
  club_name?: string // Keep original name for lookup
}

export default function BulkImportPage() {
  const [csvData, setCsvData] = useState("")
  const [parsedData, setParsedData] = useState<ParsedAthlete[]>([])
  const [status, setStatus] = useState<ImportStatus>("idle")
  const [currentStep, setCurrentStep] = useState(0)
  const [totalSteps, setTotalSteps] = useState(0)
  const [results, setResults] = useState<{ success: number; errors: number; messages: string[] }>({
    success: 0,
    errors: 0,
    messages: [],
  })
  const [imageFiles, setImageFiles] = useState<Record<string, File>>({})

  const supabase = createClient()

  const handleCsvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const text = event.target?.result as string
      setCsvData(text)
    }
    reader.readAsText(file)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    const newImageFiles = { ...imageFiles }

    // Process each file
    Array.from(files).forEach((file) => {
      // Use athlete name as key (assuming filename format: "firstname-lastname.jpg")
      const fileName = file.name.split(".")[0]
      newImageFiles[fileName] = file
    })

    setImageFiles(newImageFiles)

    alert(
      `${Object.keys(newImageFiles).length} images loaded. Make sure image filenames match athlete names (e.g., "john-smith.jpg").`,
    )
  }

  const parseCSV = () => {
    setStatus("parsing")

    try {
      // Simple CSV parsing (for more complex needs, consider using a library like papaparse)
      const lines = csvData.split("\n")
      const headers = lines[0].split(",").map((h) => h.trim())

      const athletes: ParsedAthlete[] = []

      for (let i = 1; i < lines.length; i++) {
        if (!lines[i].trim()) continue

        const values = lines[i].split(",").map((v) => v.trim())
        const athlete: Record<string, any> = {}

        headers.forEach((header, index) => {
          athlete[header] = values[index]
        })

        // Convert to proper types
        const parsedAthlete: ParsedAthlete = {
          first_name: athlete.first_name,
          last_name: athlete.last_name,
          graduation_year: Number.parseInt(athlete.graduation_year),
          weight_class: athlete.weight_class,
          high_school: athlete.high_school,
          club_team: athlete.club_team,
          gender: athlete.gender,
          college_committed: athlete.college_committed,
          college_division: athlete.college_division,
          commitment_date: athlete.commitment_date,
          email: athlete.email,
          achievements: athlete.achievements ? athlete.achievements.split(";") : [],
          college_name: athlete.college_committed, // Keep original name for lookup
          high_school_name: athlete.high_school, // Keep original name for lookup
          club_name: athlete.club_team, // Keep original name for lookup
        }

        // Check for image file
        const athleteKey = `${parsedAthlete.first_name.toLowerCase()}-${parsedAthlete.last_name.toLowerCase()}`
        if (imageFiles[athleteKey]) {
          parsedAthlete.image_file = imageFiles[athleteKey]
        }

        athletes.push(parsedAthlete)
      }

      setParsedData(athletes)
      setStatus("idle")
      setResults({
        success: 0,
        errors: 0,
        messages: [`Successfully parsed ${athletes.length} athletes`],
      })
    } catch (error) {
      console.error("Error parsing CSV:", error)
      setStatus("error")
      setResults({
        success: 0,
        errors: 1,
        messages: [`Error parsing CSV: ${error instanceof Error ? error.message : "Unknown error"}`],
      })
    }
  }

  const findInstitutionByName = async (name: string, type: string) => {
    if (!name) return null

    const { data, error } = await supabase
      .from("institutions")
      .select("id, name, type")
      .eq("name", name)
      .eq("type", type)
      .single()

    if (error) {
      console.error(`Error finding ${type} by name:`, error)
      return null
    }

    return data
  }

  const uploadAthletes = async () => {
    if (parsedData.length === 0) {
      alert("No data to upload. Please parse CSV first.")
      return
    }

    setStatus("uploading")
    setTotalSteps(parsedData.length)
    setCurrentStep(0)

    const uploadResults = {
      success: 0,
      errors: 0,
      messages: [] as string[],
    }

    for (let i = 0; i < parsedData.length; i++) {
      setCurrentStep(i + 1)
      const athlete = parsedData[i]

      try {
        // 1. Upload image if available
        let imageUrl = athlete.image_url
        if (athlete.image_file) {
          try {
            const formData = new FormData()
            formData.append("file", athlete.image_file)
            formData.append("category", "athletes")
            formData.append("name", `${athlete.first_name}-${athlete.last_name}`)

            const response = await fetch("/api/upload-image", {
              method: "POST",
              body: formData,
            })

            if (!response.ok) {
              throw new Error(`Failed to upload image: ${response.statusText}`)
            }

            const data = await response.json()
            imageUrl = data.url
          } catch (error) {
            console.error("Image upload error:", error)
            uploadResults.messages.push(
              `Warning: Failed to upload image for ${athlete.first_name} ${athlete.last_name}`,
            )
          }
        }

        // Before inserting athlete data, look up institution IDs
        let collegeId = null
        let highSchoolId = null
        let clubId = null

        if (athlete.college_name) {
          const college = await findInstitutionByName(athlete.college_name, "college")
          collegeId = college?.id
        }

        if (athlete.high_school_name) {
          const highSchool = await findInstitutionByName(athlete.high_school_name, "high_school")
          highSchoolId = highSchool?.id
        }

        if (athlete.club_name) {
          const club = await findInstitutionByName(athlete.club_name, "wrestling_club")
          clubId = club?.id
        }

        // 2. Create athlete profile
        const athleteData = {
          name: `${athlete.first_name} ${athlete.last_name}`,
          first_name: athlete.first_name,
          last_name: athlete.last_name,
          graduation_year: athlete.graduation_year,
          weight_class: athlete.weight_class,
          gender: athlete.gender || "Male",
          high_school: athlete.high_school,
          wrestling_club: athlete.club_team,
          college_committed: athlete.college_committed,
          college_division: athlete.college_division,
          achievements: athlete.achievements,
          image_url: imageUrl,
          commitment_date: athlete.commitment_date,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          college_id: collegeId,
          high_school_id: highSchoolId,
          wrestling_club_id: clubId,
        }

        // 3. Insert into database
        // For demo purposes, we'll just log the data
        console.log("Would insert athlete:", athleteData)

        // In production, you would use Supabase to insert the data:
        /*
        const { data, error } = await supabase
          .from('recruiting_athletes')
          .insert(athleteData)
          
        if (error) throw error
        */

        uploadResults.success++
        uploadResults.messages.push(`✅ Successfully added ${athlete.first_name} ${athlete.last_name}`)
      } catch (error) {
        console.error("Error uploading athlete:", error)
        uploadResults.errors++
        uploadResults.messages.push(
          `❌ Error adding ${athlete.first_name} ${athlete.last_name}: ${error instanceof Error ? error.message : "Unknown error"}`,
        )
      }
    }

    setResults(uploadResults)
    setStatus("success")
  }

  return (
    <div className="container mx-auto py-8">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-2xl">Bulk Athlete Import</CardTitle>
          <CardDescription>Upload multiple athlete profiles and commitment data at once</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="instructions">
            <TabsList className="mb-4">
              <TabsTrigger value="instructions">Instructions</TabsTrigger>
              <TabsTrigger value="import">Import Data</TabsTrigger>
              <TabsTrigger value="results">Results</TabsTrigger>
            </TabsList>

            <TabsContent value="instructions">
              <div className="space-y-4">
                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>CSV Format Instructions</AlertTitle>
                  <AlertDescription>Your CSV file should include the following columns:</AlertDescription>
                </Alert>

                <div className="bg-slate-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Required Columns:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>first_name</li>
                    <li>last_name</li>
                    <li>graduation_year</li>
                    <li>weight_class</li>
                    <li>high_school</li>
                  </ul>

                  <h3 className="font-medium mt-4 mb-2">Optional Columns:</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>club_team</li>
                    <li>gender (defaults to "Male")</li>
                    <li>college_committed</li>
                    <li>college_division</li>
                    <li>commitment_date (YYYY-MM-DD format)</li>
                    <li>achievements (use semicolons to separate multiple achievements)</li>
                    <li>email</li>
                  </ul>
                </div>

                <Alert>
                  <Info className="h-4 w-4" />
                  <AlertTitle>Image Upload Instructions</AlertTitle>
                  <AlertDescription>
                    Name your image files as "firstname-lastname.jpg" to automatically match them with the corresponding
                    athlete data.
                  </AlertDescription>
                </Alert>

                <div className="bg-slate-50 p-4 rounded-md">
                  <h3 className="font-medium mb-2">Example CSV:</h3>
                  <pre className="text-xs overflow-auto p-2 bg-slate-100 rounded">
                    {`first_name,last_name,graduation_year,weight_class,high_school,club_team,gender,college_committed,college_division,commitment_date,achievements
John,Smith,2025,157,Central High,NC United Blue,Male,UNC Chapel Hill,NCAA D1,2024-06-01,State Champion;NHSCA All-American
Jane,Doe,2026,132,Eastern High,NC United Gold,Female,NC State,NCAA D1,2024-05-15,2x State Champion;Fargo All-American`}
                  </pre>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="import">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Step 1: Upload CSV File</h3>
                  <div className="flex items-center gap-4">
                    <Input type="file" accept=".csv" onChange={handleCsvUpload} className="max-w-md" />
                    <Button
                      variant="outline"
                      onClick={() => {
                        const element = document.createElement("a")
                        const file = new Blob(
                          [
                            "first_name,last_name,graduation_year,weight_class,high_school,club_team,gender,college_committed,college_division,commitment_date,achievements\nJohn,Smith,2025,157,Central High,NC United Blue,Male,UNC Chapel Hill,NCAA D1,2024-06-01,State Champion;NHSCA All-American",
                          ],
                          { type: "text/csv" },
                        )
                        element.href = URL.createObjectURL(file)
                        element.download = "athlete-template.csv"
                        document.body.appendChild(element)
                        element.click()
                        document.body.removeChild(element)
                      }}
                    >
                      <FileSpreadsheet className="h-4 w-4 mr-2" />
                      Download Template
                    </Button>
                  </div>
                </div>

                {csvData && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">CSV Preview</h3>
                    <Textarea
                      value={csvData}
                      onChange={(e) => setCsvData(e.target.value)}
                      rows={10}
                      className="font-mono text-sm"
                    />
                    <Button onClick={parseCSV} className="mt-2" disabled={status === "parsing"}>
                      {status === "parsing" ? "Parsing..." : "Parse CSV"}
                    </Button>
                  </div>
                )}

                <div>
                  <h3 className="text-lg font-medium mb-2">Step 2: Upload Images (Optional)</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Upload images named as "firstname-lastname.jpg" to match with athlete data
                  </p>
                  <Input type="file" accept="image/*" multiple onChange={handleImageUpload} className="max-w-md" />
                  <div className="mt-2 text-sm text-gray-600">
                    {Object.keys(imageFiles).length > 0 ? (
                      <p>{Object.keys(imageFiles).length} images loaded</p>
                    ) : (
                      <p>No images loaded yet</p>
                    )}
                  </div>
                </div>

                {parsedData.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium mb-2">Step 3: Upload Data</h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Ready to upload {parsedData.length} athletes to the database
                    </p>
                    <Button onClick={uploadAthletes} disabled={status === "uploading"}>
                      <Upload className="h-4 w-4 mr-2" />
                      {status === "uploading" ? "Uploading..." : "Upload Athletes"}
                    </Button>

                    {status === "uploading" && (
                      <div className="mt-4">
                        <Progress value={(currentStep / totalSteps) * 100} className="mb-2" />
                        <p className="text-sm text-gray-600">
                          Uploading athlete {currentStep} of {totalSteps}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="results">
              <div className="space-y-4">
                {status === "success" || status === "error" || results.messages.length > 0 ? (
                  <>
                    <Alert variant={status === "error" ? "destructive" : "default"}>
                      {status === "error" ? <AlertCircle className="h-4 w-4" /> : <CheckCircle className="h-4 w-4" />}
                      <AlertTitle>{status === "error" ? "Import Failed" : "Import Complete"}</AlertTitle>
                      <AlertDescription>
                        {results.success} athletes successfully imported, {results.errors} errors
                      </AlertDescription>
                    </Alert>

                    <div className="bg-slate-50 p-4 rounded-md max-h-96 overflow-y-auto">
                      <h3 className="font-medium mb-2">Import Log:</h3>
                      <ul className="space-y-1 text-sm">
                        {results.messages.map((message, index) => (
                          <li key={index} className={message.includes("Error") ? "text-red-600" : ""}>
                            {message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <p className="text-gray-600">No import results yet. Upload some data first.</p>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
