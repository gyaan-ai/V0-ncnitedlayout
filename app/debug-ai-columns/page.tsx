"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DebugAiColumns() {
  const [columnData, setColumnData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkColumns()
  }, [])

  const checkColumns = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/check-ai-columns")
      const data = await response.json()
      setColumnData(data)
    } catch (error) {
      console.error("Error checking columns:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">AI Columns Debug</h1>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Column Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              <strong>Total Columns:</strong> {columnData?.allColumns}
            </p>
            <p>
              <strong>Has AI Columns:</strong> {columnData?.hasAiColumns ? "✅ Yes" : "❌ No"}
            </p>
            <p>
              <strong>AI Columns Found:</strong> {columnData?.aiColumns?.length || 0}
            </p>

            {columnData?.aiColumns?.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">AI Columns:</h3>
                <ul className="list-disc list-inside space-y-1">
                  {columnData.aiColumns.map((col, index) => (
                    <li key={index}>
                      <strong>{col.column_name}</strong> ({col.data_type}) -{" "}
                      {col.is_nullable === "YES" ? "Nullable" : "Not Null"}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <Button onClick={checkColumns} className="mt-4">
            Refresh Check
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
