"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugLogoPersistence() {
  const [logs, setLogs] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`])
  }

  const testDatabaseConnection = async () => {
    setLoading(true)
    addLog("🔄 Testing database connection...")

    try {
      const response = await fetch("/api/test-db-connection")
      const data = await response.json()

      if (data.success) {
        addLog("✅ Database connection successful")
        addLog(`📊 Database info: ${JSON.stringify(data.info)}`)
      } else {
        addLog(`❌ Database connection failed: ${data.error}`)
      }
    } catch (error) {
      addLog(`❌ Error testing connection: ${error.message}`)
    }

    setLoading(false)
  }

  const testLogoTable = async () => {
    setLoading(true)
    addLog("🔄 Testing logo table...")

    try {
      const response = await fetch("/api/admin/logos")
      const data = await response.json()

      if (data.success) {
        addLog(`✅ Logo table accessible, found ${data.logos.length} logos`)
        data.logos.forEach((logo: any) => {
          addLog(`📝 Logo: ${logo.display_name} (${logo.type}) - ${logo.file_url}`)
        })
      } else {
        addLog(`❌ Logo table error: ${data.error}`)
      }
    } catch (error) {
      addLog(`❌ Error accessing logo table: ${error.message}`)
    }

    setLoading(false)
  }

  const testCreateLogo = async () => {
    setLoading(true)
    addLog("🔄 Testing logo creation...")

    const testLogo = {
      display_name: "Test University",
      type: "college",
      file_url: "https://example.com/test-logo.png",
      file_name: "test-logo.png",
      aliases: ["Test U", "Test College"],
    }

    try {
      const response = await fetch("/api/admin/logos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testLogo),
      })

      const data = await response.json()

      if (data.success) {
        addLog(`✅ Logo created successfully: ID ${data.logo.id}`)
        addLog(`📝 Created logo: ${JSON.stringify(data.logo)}`)
      } else {
        addLog(`❌ Logo creation failed: ${data.error}`)
      }
    } catch (error) {
      addLog(`❌ Error creating logo: ${error.message}`)
    }

    setLoading(false)
  }

  const clearLogs = () => {
    setLogs([])
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>🔧 Logo Persistence Debug</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2 flex-wrap">
            <Button onClick={testDatabaseConnection} disabled={loading}>
              Test DB Connection
            </Button>
            <Button onClick={testLogoTable} disabled={loading}>
              Test Logo Table
            </Button>
            <Button onClick={testCreateLogo} disabled={loading}>
              Test Create Logo
            </Button>
            <Button onClick={clearLogs} variant="outline">
              Clear Logs
            </Button>
          </div>

          <div className="bg-black text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
            {logs.length === 0 ? (
              <div className="text-gray-500">No logs yet. Click a button to start testing.</div>
            ) : (
              logs.map((log, index) => <div key={index}>{log}</div>)
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
