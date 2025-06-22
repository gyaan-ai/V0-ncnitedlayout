"use client"

import { useState } from "react"

export default function DebugDataTrap() {
  const [trapResults, setTrapResults] = useState<any[]>([])
  const [monitoring, setMonitoring] = useState(false)
  const [liamData, setLiamData] = useState<any>(null)

  const startMonitoring = async () => {
    setMonitoring(true)
    setTrapResults([])

    // Set up monitoring
    const interval = setInterval(async () => {
      try {
        const response = await fetch("/api/debug-data-trap")
        const data = await response.json()

        if (data.changes_detected) {
          setTrapResults((prev) => [
            ...prev,
            {
              timestamp: new Date().toISOString(),
              ...data,
            },
          ])
        }

        setLiamData(data.current_liam_data)
      } catch (error) {
        console.error("Monitoring error:", error)
      }
    }, 2000) // Check every 2 seconds

    // Stop after 5 minutes
    setTimeout(() => {
      clearInterval(interval)
      setMonitoring(false)
    }, 300000)
  }

  const stopMonitoring = () => {
    setMonitoring(false)
  }

  const setTrapData = async () => {
    try {
      await fetch("/api/debug-data-trap/set", { method: "POST" })
      alert("Trap data set! Now monitoring for changes...")
      startMonitoring()
    } catch (error) {
      alert("Failed to set trap data")
    }
  }

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">🪤 Data Modification Trap</h1>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <h2 className="font-bold text-red-800 mb-2">🎯 Catching the Data Thief</h2>
        <p className="text-red-700">
          This will set unique trap data for Liam and monitor for ANY changes in real-time.
        </p>
      </div>

      <div className="flex gap-4 mb-6">
        <button
          onClick={setTrapData}
          disabled={monitoring}
          className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 disabled:opacity-50"
        >
          🪤 Set Trap & Start Monitoring
        </button>

        {monitoring && (
          <button onClick={stopMonitoring} className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700">
            ⏹️ Stop Monitoring
          </button>
        )}
      </div>

      {monitoring && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800 font-bold">🔍 MONITORING ACTIVE - Checking every 2 seconds...</p>
        </div>
      )}

      {liamData && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-bold text-blue-800 mb-2">Current Liam Data:</h3>
          <div className="text-sm">
            <p>
              <strong>Headline:</strong> {liamData.generated_headline || "NULL"}
            </p>
            <p>
              <strong>Bio:</strong> {liamData.generated_bio?.substring(0, 100) || "NULL"}...
            </p>
            <p>
              <strong>Last Updated:</strong> {liamData.updated_at}
            </p>
          </div>
        </div>
      )}

      {trapResults.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <h3 className="font-bold text-red-800 mb-4">🚨 CHANGES DETECTED!</h3>
          {trapResults.map((result, index) => (
            <div key={index} className="bg-white border rounded-lg p-4 mb-4">
              <p className="font-bold text-red-600">
                Change #{index + 1} at {result.timestamp}
              </p>
              <pre className="bg-gray-100 p-2 rounded text-xs mt-2 overflow-auto">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
