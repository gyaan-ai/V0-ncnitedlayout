"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestSimpleSave() {
  const [athlete, setAthlete] = useState({
    id: "b1adf5a8-7887-4af1-935d-07267f186df9", // Liam's ID
    first_name: "Liam",
    last_name: "Hickey",
    high_school: "Test High School",
    weight_class: "157",
    graduation_year: 2025,
  })
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState(null)

  const handleSave = async () => {
    setSaving(true)
    setResult(null)

    try {
      const response = await fetch("/api/admin/athletes/simple-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(athlete),
      })

      const data = await response.json()
      setResult(data)

      if (data.success) {
        alert("✅ Save successful!")
      } else {
        alert("❌ Save failed: " + data.error)
      }
    } catch (error) {
      setResult({ error: error.message })
      alert("❌ Save failed: " + error.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container mx-auto p-8">
      <Card>
        <CardHeader>
          <CardTitle>🧪 Simple Save Test</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input
            placeholder="First Name"
            value={athlete.first_name}
            onChange={(e) => setAthlete({ ...athlete, first_name: e.target.value })}
          />
          <Input
            placeholder="Last Name"
            value={athlete.last_name}
            onChange={(e) => setAthlete({ ...athlete, last_name: e.target.value })}
          />
          <Input
            placeholder="High School"
            value={athlete.high_school}
            onChange={(e) => setAthlete({ ...athlete, high_school: e.target.value })}
          />
          <Input
            placeholder="Weight Class"
            value={athlete.weight_class}
            onChange={(e) => setAthlete({ ...athlete, weight_class: e.target.value })}
          />

          <Button onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "💾 Save Athlete"}
          </Button>

          {result && <pre className="bg-gray-100 p-4 rounded text-sm">{JSON.stringify(result, null, 2)}</pre>}
        </CardContent>
      </Card>
    </div>
  )
}
