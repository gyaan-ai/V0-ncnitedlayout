"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Database, CheckCircle, AlertCircle } from "lucide-react"

export default function VerifyPersistence() {
  const [athletes, setAthletes] = useState([])
  const [loading, setLoading] = useState(false)
  const [lastCheck, setLastCheck] = useState(null)

  const checkPersistence = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/athletes")
      const data = await response.json()
      const athletesArray = Array.isArray(data) ? data : data.athletes || []
      setAthletes(athletesArray)
      setLastCheck(new Date().toLocaleString())
    } catch (error) {
      console.error("Error checking persistence:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    checkPersistence()
  }, [])

  const liamData = athletes.find((a) => a.first_name === "Liam" && a.last_name === "Hickey")

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">Data Persistence Verification</h1>
          <p className="text-gray-600 mt-2">Verify all athlete data is permanently saved</p>
        </div>
        <Button onClick={checkPersistence} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? "animate-spin" : ""}`} />
          Refresh Check
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-blue-600" />
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
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{athletes.filter((a) => a.is_committed).length}</p>
                <p className="text-sm text-gray-600">Committed Athletes</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <AlertCircle className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-2xl font-bold">{athletes.filter((a) => a.profile_image_url).length}</p>
                <p className="text-sm text-gray-600">With Profile Images</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liam Verification */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            🔍 Liam Hickey Verification
            {liamData ? (
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="h-3 w-3 mr-1" />
                Found & Intact
              </Badge>
            ) : (
              <Badge className="bg-red-100 text-red-800">
                <AlertCircle className="h-3 w-3 mr-1" />
                Missing
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {liamData ? (
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold">
                    {liamData.first_name} {liamData.last_name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Weight Class</p>
                  <p className="font-semibold">{liamData.weight_class}lbs</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">College</p>
                  <p className="font-semibold">{liamData.college_committed}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Record</p>
                  <p className="font-semibold">
                    {liamData.wrestling_record?.wins || 0}-{liamData.wrestling_record?.losses || 0}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  {liamData.profile_image_url ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm">Profile Image</span>
                </div>
                <div className="flex items-center gap-2">
                  {liamData.commitment_image_url ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm">Commitment Image</span>
                </div>
                <div className="flex items-center gap-2">
                  {liamData.youtube_highlight_url ? (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-600" />
                  )}
                  <span className="text-sm">YouTube Video</span>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600">Achievements</p>
                <p className="text-sm">
                  NCHSAA: {liamData.achievements?.nchsaa?.length || 0} results, NHSCA:{" "}
                  {liamData.achievements?.nhsca?.length || 0} results
                </p>
              </div>

              <div className="text-xs text-gray-500">
                <p>Created: {new Date(liamData.created_at).toLocaleString()}</p>
                <p>Updated: {new Date(liamData.updated_at).toLocaleString()}</p>
                <p>ID: {liamData.id}</p>
              </div>
            </div>
          ) : (
            <p className="text-red-600">❌ Liam Hickey not found in database!</p>
          )}
        </CardContent>
      </Card>

      {/* All Athletes List */}
      <Card>
        <CardHeader>
          <CardTitle>All Athletes in Database</CardTitle>
          {lastCheck && <p className="text-sm text-gray-600">Last checked: {lastCheck}</p>}
        </CardHeader>
        <CardContent>
          {athletes.length === 0 ? (
            <p className="text-gray-600">No athletes found</p>
          ) : (
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {athletes.map((athlete) => (
                <div key={athlete.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold">
                        {athlete.first_name} {athlete.last_name}
                      </h4>
                      {athlete.is_committed && <Badge className="bg-green-100 text-green-800">Committed</Badge>}
                      {athlete.is_featured && <Badge className="bg-yellow-100 text-yellow-800">Featured</Badge>}
                    </div>
                    <p className="text-sm text-gray-600">
                      {athlete.high_school} • {athlete.weight_class}lbs • Class of {athlete.graduation_year}
                      {athlete.college_committed && ` → ${athlete.college_committed}`}
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">{new Date(athlete.updated_at).toLocaleDateString()}</div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
