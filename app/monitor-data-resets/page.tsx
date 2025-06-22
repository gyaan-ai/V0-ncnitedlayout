"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Clock, Database, Activity, RefreshCw } from "lucide-react"
import { toast } from "sonner"

export default function MonitorDataResets() {
  const [monitoring, setMonitoring] = useState(false)
  const [lastCheck, setLastCheck] = useState(null)
  const [resetHistory, setResetHistory] = useState([])
  const [currentData, setCurrentData] = useState(null)
  const [logs, setLogs] = useState([])

  useEffect(() => {
    // Check immediately on load
    checkForReset()

    // Set up monitoring interval
    const interval = setInterval(() => {
      if (monitoring) {
        checkForReset()
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [monitoring])

  const checkForReset = async () => {
    try {
      const response = await fetch("/api/monitor-data-resets")
      const data = await response.json()

      if (data.success) {
        setCurrentData(data.currentData)
        setLastCheck(new Date().toISOString())

        // Check if data just changed
        if (data.resetDetected) {
          const resetEvent = {
            timestamp: new Date().toISOString(),
            previousData: data.previousData,
            currentData: data.currentData,
            timeSinceLastReset: data.timeSinceLastReset,
          }

          setResetHistory((prev) => [resetEvent, ...prev.slice(0, 9)]) // Keep last 10
          toast.error("🚨 Data reset detected!")

          // Log the event
          addLog(`🚨 RESET DETECTED at ${new Date().toLocaleTimeString()}`)
          addLog(`   Previous: ${data.previousData?.generated_headline || "N/A"}`)
          addLog(`   Current: ${data.currentData?.generated_headline || "N/A"}`)
        }
      }
    } catch (error) {
      console.error("Monitor error:", error)
      addLog(`❌ Monitor error: ${error.message}`)
    }
  }

  const addLog = (message) => {
    setLogs((prev) => [`${new Date().toLocaleTimeString()}: ${message}`, ...prev.slice(0, 49)])
  }

  const startMonitoring = () => {
    setMonitoring(true)
    addLog("🔍 Started monitoring for data resets...")
    toast.success("Monitoring started - will check every 30 seconds")
  }

  const stopMonitoring = () => {
    setMonitoring(false)
    addLog("⏹️ Stopped monitoring")
    toast.info("Monitoring stopped")
  }

  const calculateNextResetTime = () => {
    if (!currentData?.updated_at) return "Unknown"

    const lastUpdate = new Date(currentData.updated_at)
    const nextReset = new Date(lastUpdate.getTime() + 60 * 60 * 1000) // Add 1 hour
    const now = new Date()
    const timeUntilReset = nextReset.getTime() - now.getTime()

    if (timeUntilReset <= 0) {
      return "Overdue (should reset any moment)"
    }

    const minutes = Math.floor(timeUntilReset / (1000 * 60))
    const seconds = Math.floor((timeUntilReset % (1000 * 60)) / 1000)

    return `${minutes}m ${seconds}s`
  }

  return (
    <div className="container mx-auto p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-red-600">🔍 Data Reset Monitor</h1>
          <p className="text-gray-600 mt-2">Real-time monitoring to catch the automated reset process</p>
        </div>
        <div className="flex gap-2">
          {!monitoring ? (
            <Button onClick={startMonitoring} className="bg-green-600 hover:bg-green-700">
              <Activity className="h-4 w-4 mr-2" />
              Start Monitoring
            </Button>
          ) : (
            <Button onClick={stopMonitoring} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Stop Monitoring
            </Button>
          )}
          <Button onClick={checkForReset} variant="outline">
            <RefreshCw className="h-4 w-4 mr-2" />
            Check Now
          </Button>
        </div>
      </div>

      {/* Alert - Just Reset */}
      <Card className="mb-6 border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="flex items-center text-red-800">
            <AlertTriangle className="h-5 w-5 mr-2" />🚨 RESET JUST OCCURRED!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-red-700">
            <p>• The automated process just ran and reset the data back to test values</p>
            <p>• This is the perfect time to investigate what just happened</p>
            <p>• Check server logs, API calls, and scheduled functions from the last few minutes</p>
            <p>• Next reset expected in approximately 1 hour</p>
          </div>
        </CardContent>
      </Card>

      {/* Current Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Database className="h-5 w-5 mr-2" />
              Current Data Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            {currentData ? (
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Generated Headline:</p>
                  <p className="font-medium text-red-600">{currentData.generated_headline || "NULL"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Generated Bio:</p>
                  <p className="font-medium text-red-600">
                    {currentData.generated_bio ? currentData.generated_bio.substring(0, 50) + "..." : "NULL"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Last Updated:</p>
                  <p className="font-medium">{new Date(currentData.updated_at).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Next Reset Expected:</p>
                  <p className="font-medium text-orange-600">{calculateNextResetTime()}</p>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Loading current data...</p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Monitoring Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Status:</span>
                <Badge variant={monitoring ? "default" : "secondary"}>{monitoring ? "🟢 Active" : "🔴 Stopped"}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span>Check Interval:</span>
                <span>30 seconds</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Last Check:</span>
                <span>{lastCheck ? new Date(lastCheck).toLocaleTimeString() : "Never"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Resets Detected:</span>
                <Badge variant="destructive">{resetHistory.length}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reset History */}
      {resetHistory.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>🚨 Reset History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {resetHistory.map((reset, index) => (
                <div key={index} className="p-3 border border-red-200 rounded bg-red-50">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-red-800">Reset #{resetHistory.length - index}</span>
                    <span className="text-sm text-gray-600">{new Date(reset.timestamp).toLocaleString()}</span>
                  </div>
                  <div className="text-sm space-y-1">
                    <p>
                      <span className="text-gray-600">Before:</span> {reset.previousData?.generated_headline || "N/A"}
                    </p>
                    <p>
                      <span className="text-gray-600">After:</span> {reset.currentData?.generated_headline || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Live Logs */}
      <Card>
        <CardHeader>
          <CardTitle>📋 Live Monitoring Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-64 overflow-y-auto">
            {logs.length > 0 ? (
              logs.map((log, index) => (
                <div key={index} className="mb-1">
                  {log}
                </div>
              ))
            ) : (
              <div className="text-gray-500">No logs yet. Start monitoring to see activity...</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
