"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, AlertCircle, CheckCircle, XCircle } from "lucide-react"

interface Logo {
  id: number
  name: string
  display_name: string
  type: string
  file_url: string
  file_name: string
  aliases: string[]
  is_active: boolean
  created_at: string
}

interface DebugResult {
  step: string
  status: "success" | "error" | "warning"
  message: string
  data?: any
}

export default function LogoDebugPage() {
  const [debugResults, setDebugResults] = useState<DebugResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [logos, setLogos] = useState<Logo[]>([])

  const addResult = (step: string, status: "success" | "error" | "warning", message: string, data?: any) => {
    setDebugResults((prev) => [...prev, { step, status, message, data }])
  }

  const runDiagnostics = async () => {
    setIsRunning(true)
    setDebugResults([])

    try {
      // Step 1: Check database connection
      addResult("Database", "success", "Testing database connection...")

      // Step 2: Check logo table
      addResult("Logo Table", "success", "Checking logo_library table...")
      const logoResponse = await fetch("/api/admin/logos/debug")
      const logoData = await logoResponse.json()

      if (logoResponse.ok) {
        setLogos(logoData.logos || [])
        addResult("Logo Table", "success", `Found ${logoData.logos?.length || 0} logos in database`, logoData.logos)
      } else {
        addResult("Logo Table", "error", `Database error: ${logoData.error}`)
      }

      // Step 3: Check specific logos for Liam
      addResult("Liam's Logos", "success", "Checking logos for Liam's institutions...")

      const institutions = [
        { name: "University of North Carolina at Chapel Hill", type: "college" },
        { name: "Cardinal Gibbons High School", type: "high_school" },
        { name: "RAW Wrestling", type: "club" },
      ]

      for (const institution of institutions) {
        const matchResponse = await fetch(
          `/api/admin/logos/match?name=${encodeURIComponent(institution.name)}&type=${institution.type}`,
        )
        const matchData = await matchResponse.json()

        if (matchResponse.ok && matchData.logo) {
          addResult("Logo Match", "success", `✅ Found logo for ${institution.name}`, matchData.logo)

          // Test if the image URL actually works
          try {
            const imageResponse = await fetch(matchData.logo.file_url, { method: "HEAD" })
            if (imageResponse.ok) {
              addResult("Image Access", "success", `✅ Image accessible: ${matchData.logo.file_url}`)
            } else {
              addResult(
                "Image Access",
                "error",
                `❌ Image not accessible: ${matchData.logo.file_url} (${imageResponse.status})`,
              )
            }
          } catch (error) {
            addResult("Image Access", "error", `❌ Image fetch failed: ${matchData.logo.file_url}`)
          }
        } else {
          addResult("Logo Match", "warning", `⚠️ No logo found for ${institution.name}`)
        }
      }

      // Step 4: Check commit card integration
      addResult("Integration", "success", "Testing commit card integration...")
      const commitResponse = await fetch("/api/recruiting/commits/1") // Liam's commit
      if (commitResponse.ok) {
        const commitData = await commitResponse.json()
        addResult("Integration", "success", "✅ Commit data accessible", commitData)
      } else {
        addResult("Integration", "warning", "⚠️ Could not fetch commit data")
      }
    } catch (error) {
      addResult("System", "error", `System error: ${error}`)
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "border-green-200 bg-green-50"
      case "error":
        return "border-red-200 bg-red-50"
      case "warning":
        return "border-yellow-200 bg-yellow-50"
      default:
        return "border-gray-200 bg-gray-50"
    }
  }

  const forceSetup = async () => {
    setIsRunning(true)
    addResult("Force Setup", "success", "Creating logo system from scratch...")

    try {
      const response = await fetch("/api/admin/logos/setup", { method: "POST" })
      const data = await response.json()

      if (response.ok) {
        addResult("Force Setup", "success", "✅ Logo system created successfully!", data)
        // Re-run diagnostics
        setTimeout(() => runDiagnostics(), 1000)
      } else {
        addResult("Force Setup", "error", `❌ Setup failed: ${data.error}`)
      }
    } catch (error) {
      addResult("Force Setup", "error", `❌ Setup error: ${error}`)
    }

    setIsRunning(false)
  }

  useEffect(() => {
    runDiagnostics()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-black text-slate-800 font-oswald">Logo System Debug</h1>
                <p className="text-slate-600">Diagnose why uploaded logos aren't showing</p>
              </div>
              <div className="flex gap-2">
                <Button onClick={forceSetup} disabled={isRunning} variant="destructive">
                  🔧 Force Setup
                </Button>
                <Button onClick={runDiagnostics} disabled={isRunning} className="bg-[#1a1b5c] hover:bg-[#1a1b5c]/90">
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRunning ? "animate-spin" : ""}`} />
                  {isRunning ? "Running..." : "Run Diagnostics"}
                </Button>
              </div>
            </div>
          </div>

          {/* Diagnostic Results */}
          <div className="space-y-4 mb-8">
            {debugResults.map((result, index) => (
              <Card key={index} className={`border-2 ${getStatusColor(result.status)}`}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    {getStatusIcon(result.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline">{result.step}</Badge>
                        <span className="text-sm font-medium">{result.message}</span>
                      </div>
                      {result.data && (
                        <pre className="text-xs bg-white/50 p-2 rounded mt-2 overflow-auto">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Logo Inventory */}
          {logos.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Logo Inventory ({logos.length} total)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {logos.map((logo) => (
                    <div key={logo.id} className="border rounded-lg p-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                          <img
                            src={logo.file_url || "/placeholder.svg"}
                            alt={logo.display_name}
                            className="w-full h-full object-contain rounded-full"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).style.display = "none"
                              const parent = (e.target as HTMLImageElement).parentElement
                              if (parent) {
                                parent.innerHTML = `<span class="text-xs font-bold">${logo.display_name.substring(0, 2).toUpperCase()}</span>`
                              }
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{logo.display_name}</p>
                          <p className="text-xs text-gray-500">{logo.type}</p>
                        </div>
                      </div>
                      <p className="text-xs text-gray-400 break-all">{logo.file_url}</p>
                      {logo.aliases.length > 0 && (
                        <p className="text-xs text-gray-500 mt-1">Aliases: {logo.aliases.join(", ")}</p>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button asChild variant="outline">
                  <a href="/admin/logo-manager">Logo Manager</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/recruiting/commits">View Commits</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/api/admin/logos/debug" target="_blank" rel="noreferrer">
                    Raw API Data
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
