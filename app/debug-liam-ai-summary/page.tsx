"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Save, Database, Search } from "lucide-react"
import { toast } from "sonner"

export default function DebugLiamAISummary() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [liamRecords, setLiamRecords] = useState([])
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [editForm, setEditForm] = useState({
    generated_headline: "",
    generated_bio: "",
  })

  useEffect(() => {
    loadLiamRecords()
  }, [])

  const loadLiamRecords = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/debug-liam-ai-summary")

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch Liam records`)
      }

      const data = await response.json()
      console.log("🔍 Liam Records Debug:", data)

      setLiamRecords(data.records || [])

      // Auto-select the first record if available
      if (data.records && data.records.length > 0) {
        selectRecord(data.records[0])
      }
    } catch (error) {
      console.error("Error loading Liam records:", error)
      toast.error(`Failed to load records: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const selectRecord = (record) => {
    setSelectedRecord(record)
    setEditForm({
      generated_headline: record.generated_headline || "",
      generated_bio: record.generated_bio || "",
    })
  }

  const updateForm = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }))
  }

  const saveCorrectData = async () => {
    if (!selectedRecord) {
      toast.error("No record selected")
      return
    }

    try {
      setSaving(true)

      const payload = {
        generated_headline: "Liam Hickey Caps Elite Career with D1 Open Milestone and UNC Commitment",
        generated_bio: `Graduating senior Liam Hickey, a UNC wrestling commit from Kinston High School, has established himself as one of North Carolina's premier wrestlers. Competing at 132 pounds for NC United Blue, Hickey has consistently performed at the highest levels of competition.

His wrestling resume includes standout performances at national tournaments, with notable appearances at NHSCA Nationals and other elite competitions. Hickey's technical skill and competitive drive have made him a key contributor to NC United's success in team competitions.

Academically, Hickey has maintained strong grades while balancing the demands of elite-level wrestling. His commitment to the University of North Carolina represents the culmination of years of hard work both on the mat and in the classroom.

As he prepares for his final high school season, Hickey continues to train with NC United Blue, working toward his goals of competing at the highest levels and making an immediate impact in college wrestling.`,
      }

      console.log("💾 SAVE ATTEMPT - Payload:", payload)
      console.log("💾 SAVE ATTEMPT - Record ID:", selectedRecord.id)
      console.log("💾 SAVE ATTEMPT - API URL:", `/api/athletes/${selectedRecord.id}`)

      const response = await fetch(`/api/athletes/${selectedRecord.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
        body: JSON.stringify(payload),
      })

      console.log("📡 RESPONSE STATUS:", response.status)
      console.log("📡 RESPONSE OK:", response.ok)

      const responseText = await response.text()
      console.log("📡 RESPONSE TEXT:", responseText)

      let result
      try {
        result = JSON.parse(responseText)
        console.log("✅ PARSED RESPONSE:", result)
      } catch (parseError) {
        console.error("❌ JSON PARSE ERROR:", parseError)
        throw new Error(`Invalid JSON response: ${responseText}`)
      }

      if (!response.ok) {
        throw new Error(result.error || `HTTP ${response.status}: ${responseText}`)
      }

      console.log("✅ Save successful:", result)
      toast.success("AI summary data corrected successfully!")

      // Force refresh the data immediately
      console.log("🔄 Force refreshing data...")
      await loadLiamRecords()

      // Also try to clear any potential cache
      await fetch(`/api/athletes/${selectedRecord.id}?refresh=true&t=${Date.now()}`)

      // Refresh again after a short delay
      setTimeout(async () => {
        console.log("🔄 Secondary refresh...")
        await loadLiamRecords()
      }, 1000)
    } catch (error) {
      console.error("❌ SAVE ERROR:", error)
      toast.error(`Failed to save: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const directFix = async () => {
    try {
      setSaving(true)
      console.log("🔧 DIRECT FIX: Starting direct database fix...")

      const response = await fetch("/api/debug-liam-ai-summary/fix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
        },
      })

      const result = await response.json()
      console.log("🔧 DIRECT FIX RESULT:", result)

      if (!response.ok) {
        throw new Error(result.error || `HTTP ${response.status}`)
      }

      if (result.success) {
        toast.success("Direct database fix successful!")
        console.log("✅ Verification:", result.verification)

        // Clear all possible caches
        if ("caches" in window) {
          caches.keys().then((names) => {
            names.forEach((name) => {
              caches.delete(name)
            })
          })
        }

        // Force reload the page to clear all React state and caches
        window.location.reload()
      } else {
        throw new Error("Direct fix failed")
      }
    } catch (error) {
      console.error("❌ Direct fix error:", error)
      toast.error(`Direct fix failed: ${error.message}`)
    } finally {
      setSaving(false)
    }
  }

  const refreshCache = async () => {
    try {
      setRefreshing(true)

      // Force refresh the athletes API
      const response = await fetch("/api/athletes?refresh=true")
      if (response.ok) {
        toast.success("Cache refreshed!")
        await loadLiamRecords()
      } else {
        throw new Error("Failed to refresh cache")
      }
    } catch (error) {
      console.error("Refresh error:", error)
      toast.error("Failed to refresh cache")
    } finally {
      setRefreshing(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg">Loading Liam's records...</p>
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
          <h1 className="text-4xl font-bold text-gray-900">Debug Liam's AI Summary</h1>
          <p className="text-gray-600 mt-2">Fix the "Test Headline" and "Test Bio" issue</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={refreshCache} disabled={refreshing} variant="outline">
            {refreshing ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600 mr-2"></div>
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh Cache
              </>
            )}
          </Button>
          <Button onClick={loadLiamRecords} variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Reload Data
          </Button>
        </div>
      </div>

      {/* Records Found */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Liam Hickey Records Found: {liamRecords.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {liamRecords.length === 0 ? (
            <p className="text-gray-500">No records found for Liam Hickey</p>
          ) : (
            <div className="space-y-4">
              {liamRecords.map((record, index) => (
                <div
                  key={record.id}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    selectedRecord?.id === record.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => selectRecord(record)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">
                      Record #{index + 1}: {record.first_name} {record.last_name}
                    </h3>
                    <div className="flex gap-2">
                      <Badge variant="outline">{record.id.substring(0, 8)}...</Badge>
                      {record.is_committed && <Badge className="bg-green-100 text-green-800">Committed</Badge>}
                      {record.college_committed && (
                        <Badge className="bg-blue-100 text-blue-800">{record.college_committed}</Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>
                      <strong>Email:</strong> {record.email || "N/A"}
                    </p>
                    <p>
                      <strong>High School:</strong> {record.high_school || "N/A"}
                    </p>
                    <p>
                      <strong>Weight:</strong> {record.weight_class || "N/A"}lbs
                    </p>
                    <p>
                      <strong>Graduation:</strong> {record.graduation_year || "N/A"}
                    </p>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div>
                      <strong className="text-sm">Generated Headline:</strong>
                      <p
                        className={`text-sm ${record.generated_headline === "Test Headline" ? "text-red-600 font-bold" : "text-green-600"}`}
                      >
                        {record.generated_headline || "NULL"}
                      </p>
                    </div>
                    <div>
                      <strong className="text-sm">Generated Bio:</strong>
                      <p
                        className={`text-sm ${record.generated_bio === "Test Bio" ? "text-red-600 font-bold" : "text-green-600"}`}
                      >
                        {record.generated_bio ? `${record.generated_bio.substring(0, 100)}...` : "NULL"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Selected Record */}
      {selectedRecord && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Fix AI Summary for {selectedRecord.first_name} {selectedRecord.last_name}
              <div className="flex gap-2">
                <Button onClick={saveCorrectData} disabled={saving} className="bg-blue-600 hover:bg-blue-700">
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save via API
                    </>
                  )}
                </Button>
                <Button onClick={directFix} disabled={saving} className="bg-red-600 hover:bg-red-700">
                  {saving ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Fixing...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Direct DB Fix
                    </>
                  )}
                </Button>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Data */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-red-600">❌ Current (Wrong) Data</h3>
                <div className="space-y-3">
                  <div>
                    <Label>Current Headline</Label>
                    <div className="p-3 bg-red-50 border border-red-200 rounded">
                      <p className="text-red-800 font-medium">{selectedRecord.generated_headline || "NULL"}</p>
                    </div>
                  </div>
                  <div>
                    <Label>Current Bio</Label>
                    <div className="p-3 bg-red-50 border border-red-200 rounded max-h-32 overflow-y-auto">
                      <p className="text-red-800 text-sm">{selectedRecord.generated_bio || "NULL"}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3 text-green-600">✅ Correct Data (Will Save)</h3>
                <div className="space-y-3">
                  <div>
                    <Label>Correct Headline</Label>
                    <div className="p-3 bg-green-50 border border-green-200 rounded">
                      <p className="text-green-800 font-medium">
                        Liam Hickey Caps Elite Career with D1 Open Milestone and UNC Commitment
                      </p>
                    </div>
                  </div>
                  <div>
                    <Label>Correct Bio</Label>
                    <div className="p-3 bg-green-50 border border-green-200 rounded max-h-32 overflow-y-auto">
                      <p className="text-green-800 text-sm">
                        Graduating senior Liam Hickey, a UNC wrestling commit from Kinston High School, has established
                        himself as one of North Carolina's premier wrestlers. Competing at 132 pounds for NC United
                        Blue, Hickey has consistently performed at the highest levels of competition...
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Record Details */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold mb-3">Record Details</h3>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <strong>ID:</strong> {selectedRecord.id}
                </div>
                <div>
                  <strong>User ID:</strong> {selectedRecord.user_id || "NULL"}
                </div>
                <div>
                  <strong>Created:</strong>{" "}
                  {selectedRecord.created_at ? new Date(selectedRecord.created_at).toLocaleString() : "N/A"}
                </div>
                <div>
                  <strong>Updated:</strong>{" "}
                  {selectedRecord.updated_at ? new Date(selectedRecord.updated_at).toLocaleString() : "N/A"}
                </div>
                <div>
                  <strong>Is Active:</strong> {selectedRecord.is_active ? "Yes" : "No"}
                </div>
                <div>
                  <strong>Is Public:</strong> {selectedRecord.is_public ? "Yes" : "No"}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
