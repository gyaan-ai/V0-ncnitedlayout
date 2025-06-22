"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function GenerateLiamBio() {
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [generatedContent, setGeneratedContent] = useState(null)
  const [editedHeadline, setEditedHeadline] = useState("")
  const [editedBio, setEditedBio] = useState("")
  const [saveResult, setSaveResult] = useState(null)
  const [error, setError] = useState(null)

  const generateAIBio = async () => {
    try {
      setGenerating(true)
      setError(null)
      setSaveResult(null)

      console.log("🤖 Calling AI to generate bio...")

      const response = await fetch("/api/generate-liam-bio", {
        method: "POST",
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate bio")
      }

      console.log("✅ AI generated content:", data)

      setGeneratedContent(data)
      setEditedHeadline(data.generated_headline)
      setEditedBio(data.generated_bio)
    } catch (err) {
      console.error("❌ Generation error:", err)
      setError(err.message)
    } finally {
      setGenerating(false)
    }
  }

  const saveBio = async () => {
    try {
      setSaving(true)
      setError(null)

      const response = await fetch("/api/save-liam-bio", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          headline: editedHeadline,
          bio: editedBio,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to save bio")
      }

      setSaveResult(data)
    } catch (err) {
      console.error("❌ Save error:", err)
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Generate Liam Hickey Bio</h1>
        <Button onClick={generateAIBio} disabled={generating} className="bg-purple-600 hover:bg-purple-700">
          {generating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              AI Generating...
            </>
          ) : (
            "🤖 AI Generate Bio"
          )}
        </Button>
      </div>

      {/* Current Status */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Current Database Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Badge className="bg-yellow-100 text-yellow-800">Current Headline</Badge>
              <p className="mt-2 p-3 bg-gray-50 rounded text-sm">"Test Headline" (13 chars)</p>
            </div>
            <div>
              <Badge className="bg-yellow-100 text-yellow-800">Current Bio</Badge>
              <p className="mt-2 p-3 bg-gray-50 rounded text-sm">"Test Bio" (8 chars)</p>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            👆 This is placeholder data. Use AI Generate to create proper content.
          </p>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Card className="mb-6 border-red-200 bg-red-50">
          <CardContent className="p-6">
            <h3 className="font-bold text-red-800 mb-2">❌ Error</h3>
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* AI Generated Content - Editable */}
      {generatedContent && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center gap-2">
                🤖 AI Generated Content
                <Badge className="bg-green-100 text-green-800">Ready to Edit</Badge>
              </span>
              <Button
                onClick={saveBio}
                disabled={saving || !editedHeadline || !editedBio}
                className="bg-green-600 hover:bg-green-700"
              >
                {saving ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Saving...
                  </>
                ) : (
                  "💾 Save Bio"
                )}
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Editable Headline */}
            <div>
              <Label className="text-base font-semibold">Headline (Edit as needed)</Label>
              <Input
                value={editedHeadline}
                onChange={(e) => setEditedHeadline(e.target.value)}
                placeholder="Enter compelling headline..."
                className="mt-2 text-lg"
              />
              <p className="text-sm text-gray-500 mt-1">Length: {editedHeadline.length} characters</p>
            </div>

            {/* Editable Bio */}
            <div>
              <Label className="text-base font-semibold">Bio (Edit as needed)</Label>
              <Textarea
                value={editedBio}
                onChange={(e) => setEditedBio(e.target.value)}
                rows={15}
                placeholder="Enter comprehensive bio..."
                className="mt-2"
              />
              <p className="text-sm text-gray-500 mt-1">Length: {editedBio.length} characters</p>
            </div>

            {/* Live Preview */}
            <div className="border-2 border-blue-200 bg-blue-50 p-6 rounded-lg">
              <h3 className="text-lg font-bold text-blue-800 mb-4">Live Preview</h3>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-center space-y-4">
                  <img
                    src="https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/athletes/profile-ce1bf191-623d-46dd-a0ca-5929e85871f1-1750076017914.png"
                    alt="Liam Hickey"
                    className="w-24 h-24 object-cover rounded-full mx-auto shadow-md"
                  />
                  <h2 className="text-xl font-bold text-gray-800">{editedHeadline || "No headline"}</h2>
                  <div className="text-gray-700 leading-relaxed max-w-2xl mx-auto text-left">
                    {editedBio ? (
                      editedBio.split("\n").map((paragraph, index) => (
                        <p key={index} className="mb-3">
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p className="text-gray-400 italic">No bio content</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Save Success */}
      {saveResult && (
        <Card className="mb-6 border-green-200 bg-green-50">
          <CardContent className="p-6">
            <h3 className="font-bold text-green-800 mb-2">✅ Bio Saved Successfully!</h3>
            <p className="text-green-700 mb-4">The bio has been updated in the database.</p>
            <div className="flex gap-4">
              <Button
                onClick={() => window.open("/recruiting/athletes/liam-hickey", "_blank")}
                className="bg-blue-600 hover:bg-blue-700"
              >
                View Profile Page
              </Button>
              <Button onClick={() => window.open("/debug-liam-bio", "_blank")} variant="outline">
                Check Debug Page
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reference Data */}
      <Card>
        <CardHeader>
          <CardTitle>Liam's Data (AI Reference)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Wrestling Record</h4>
              <p>179-6 (128 pins, 23 tech falls)</p>

              <h4 className="font-semibold mb-2 mt-4">College</h4>
              <p>University of North Carolina (NCAA Division I)</p>
              <p>Committed: June 9, 2024</p>

              <h4 className="font-semibold mb-2 mt-4">Academic</h4>
              <p>3.6 GPA, Business Administration</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Major Achievements</h4>
              <ul className="space-y-1">
                <li>• 2025 NCHSAA 3A State Champion (132lbs)</li>
                <li>• 2024 NCHSAA 3A State Champion (138lbs)</li>
                <li>• 2025 NHSCA 4th Place (132lbs)</li>
                <li>• 2024 NHSCA 8th Place (132lbs)</li>
                <li>• 2024 Southeast Regionals 2nd Place</li>
                <li>• 2024 Ultimate Club Duals Champion</li>
                <li>• Patriot Open 4th Place (College Division)</li>
                <li>• Dave Schultz Award Winner</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
