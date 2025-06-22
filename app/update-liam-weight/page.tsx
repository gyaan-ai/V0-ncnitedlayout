"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function UpdateLiamWeight() {
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const updateWeight = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/update-liam-weight", {
        method: "POST",
      })
      const data = await response.json()
      setResult(data)
    } catch (error) {
      console.error("Error:", error)
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Update Liam's Weight Class</h1>
        <Button onClick={updateWeight} disabled={loading}>
          {loading ? "Updating..." : "Update Weight Class to 132"}
        </Button>
      </div>

      {result && (
        <Card>
          <CardHeader>
            <CardTitle className={result.error ? "text-red-600" : "text-green-600"}>
              {result.error ? "Error" : "Update Result"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">{JSON.stringify(result, null, 2)}</pre>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
