"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function DebugLiamBio() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchLiamData()
  }, [])

  const fetchLiamData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/debug-liam-bio")
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-red-800 mb-2">Error</h2>
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Liam Hickey Bio Debug</h1>
        <Button onClick={fetchLiamData}>Refresh Data</Button>
      </div>

      {data?.athletes?.map((athlete, index) => (
        <Card key={athlete.id || index} className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>
                {athlete.first_name} {athlete.last_name} (ID: {athlete.id})
              </span>
              <div className="flex gap-2">
                {athlete.generated_bio && <Badge className="bg-green-100 text-green-800">Has Generated Bio</Badge>}
                {athlete.ai_summary && <Badge className="bg-blue-100 text-blue-800">Has AI Summary</Badge>}
                {athlete.generated_headline && <Badge className="bg-purple-100 text-purple-800">Has Headline</Badge>}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Basic Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">College</h3>
                <p>{athlete.college_committed || athlete.committed_college || "Not committed"}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Last Updated</h3>
                <p>{athlete.updated_at ? new Date(athlete.updated_at).toLocaleString() : "Unknown"}</p>
              </div>
            </div>

            {/* Generated Headline */}
            {athlete.generated_headline && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Generated Headline</h3>
                <div className="p-4 bg-purple-50 rounded-lg border">
                  <p className="text-lg font-semibold">{athlete.generated_headline}</p>
                  <p className="text-sm text-gray-500 mt-2">Length: {athlete.generated_headline.length} characters</p>
                </div>
              </div>
            )}

            {/* Generated Bio */}
            {athlete.generated_bio && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Generated Bio</h3>
                <div className="p-4 bg-green-50 rounded-lg border">
                  <p className="whitespace-pre-wrap">{athlete.generated_bio}</p>
                  <p className="text-sm text-gray-500 mt-2">Length: {athlete.generated_bio.length} characters</p>
                </div>
              </div>
            )}

            {/* AI Summary */}
            {athlete.ai_summary && (
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">AI Summary</h3>
                <div className="p-4 bg-blue-50 rounded-lg border">
                  <p className="whitespace-pre-wrap">{athlete.ai_summary}</p>
                  <p className="text-sm text-gray-500 mt-2">Length: {athlete.ai_summary.length} characters</p>
                </div>
              </div>
            )}

            {/* No Bio Warning */}
            {!athlete.generated_bio && !athlete.ai_summary && (
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h3 className="font-semibold text-yellow-800 mb-2">⚠️ No Bio Found</h3>
                <p className="text-yellow-700">This athlete record has no generated bio or AI summary.</p>
              </div>
            )}

            {/* Raw Data */}
            <details className="mt-4">
              <summary className="cursor-pointer font-semibold text-gray-700 hover:text-gray-900">
                View Raw Data
              </summary>
              <pre className="mt-2 p-4 bg-gray-100 rounded-lg text-xs overflow-auto">
                {JSON.stringify(athlete, null, 2)}
              </pre>
            </details>
          </CardContent>
        </Card>
      ))}

      {data?.summary && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{data.summary.total_records}</p>
                <p className="text-sm text-gray-600">Total Records</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">{data.summary.with_bio}</p>
                <p className="text-sm text-gray-600">With Bio</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{data.summary.with_headline}</p>
                <p className="text-sm text-gray-600">With Headline</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
