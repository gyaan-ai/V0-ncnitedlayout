"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Target, Clock, AlertTriangle } from "lucide-react"
import { toast } from "sonner"

export default function SetLiamDataForMonitoring() {
  const [loading, setLoading] = useState(false)
  const [headline, setHeadline] = useState("MONITORING: Elite Wrestler Commits to UNC - Updated at 3:15 PM")
  const [bio, setBio] = useState(
    "MONITORING DATA: Liam Hickey is an exceptional 132-pound wrestler from North Carolina who has committed to the University of North Carolina. This bio was updated at 3:15 PM on 6/18/2025 to monitor for automatic resets. If you see 'Test Bio' instead of this text, the automated process has run again.",
  )
  const [result, setResult] = useState(null)

  const updateLiamData = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/set-liam-monitoring-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          generated_headline: headline,
          generated_bio: bio,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setResult(data)
        toast.success("✅ Liam's data updated! Now monitoring for resets...")
      } else {
        throw new Error(data.error || "Failed to update")
      }
    } catch (error) {
      console.error("Update error:", error)
      toast.error(`Failed to update: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const setCurrentTime = () => {
    const now = new Date()
    const timeString = now.toLocaleTimeString()
    setHeadline(`MONITORING: Elite Wrestler Commits to UNC - Updated at ${timeString}`)
    setBio(
      `MONITORING DATA: Liam Hickey is an exceptional 132-pound wrestler from North Carolina who has committed to the University of North Carolina. This bio was updated at ${timeString} on ${now.toLocaleDateString()} to monitor for automatic resets. If you see 'Test Bio' instead of this text, the automated process has run again.`,
    )
  }

  return (
    <div className="container mx-auto p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-blue-600">🎯 Set Monitoring Data</h1>
          <p className="text-gray-600 mt-2">Update Liam's data with distinctive content to track resets</p>
        </div>
        <Button onClick={setCurrentTime} variant="outline">
          <Clock className="h-4 w-4 mr-2" />
          Use Current Time
        </Button>
      </div>

      {/* Strategy Explanation */}
      <Card className="mb-6 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center text-blue-800">
            <Target className="h-5 w-5 mr-2" />
            Monitoring Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-blue-700">
            <p>• Set distinctive content with current timestamp</p>
            <p>• Monitor when it gets overwritten back to "Test Headline" and "Test Bio"</p>
            <p>• This will help identify the exact source and timing of the automated process</p>
            <p>• Expected reset time: ~1 hour from now (around 4:15 PM)</p>
          </div>
        </CardContent>
      </Card>

      {/* Form */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Update Liam's Data</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="headline">Generated Headline</Label>
            <Input
              id="headline"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="Enter distinctive headline..."
            />
          </div>

          <div>
            <Label htmlFor="bio">Generated Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Enter distinctive bio..."
              rows={6}
            />
          </div>

          <Button onClick={updateLiamData} disabled={loading} className="w-full">
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Updating...
              </>
            ) : (
              <>
                <Target className="h-4 w-4 mr-2" />
                Update Data for Monitoring
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Result */}
      {result && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-800">✅ Data Updated Successfully!</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-green-600">New Headline:</p>
                <p className="font-medium">{result.updatedData.generated_headline}</p>
              </div>
              <div>
                <p className="text-sm text-green-600">New Bio (first 100 chars):</p>
                <p className="font-medium">{result.updatedData.generated_bio.substring(0, 100)}...</p>
              </div>
              <div>
                <p className="text-sm text-green-600">Updated At:</p>
                <p className="font-medium">{new Date(result.updatedData.updated_at).toLocaleString()}</p>
              </div>
              <div className="mt-4 p-3 bg-yellow-100 border border-yellow-300 rounded">
                <div className="flex items-center">
                  <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2" />
                  <span className="text-yellow-800 font-medium">Next Steps:</span>
                </div>
                <p className="text-yellow-700 mt-1">
                  Now go to <strong>/monitor-data-resets</strong> and start monitoring to catch when this gets
                  overwritten!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>🚀 Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button asChild variant="outline">
              <a href="/monitor-data-resets">
                <Target className="h-4 w-4 mr-2" />
                Go to Monitor
              </a>
            </Button>
            <Button asChild variant="outline">
              <a href="/test-liam-card">
                <Badge className="h-4 w-4 mr-2" />
                View Liam's Card
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
