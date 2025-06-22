"use client"

import { useState, useEffect } from "react"

export default function TestLogoDisplay() {
  const [athleteData, setAthleteData] = useState<any>(null)

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/athletes/by-name?firstName=Liam&lastName=Hickey")
      const data = await response.json()
      setAthleteData(data)
    }
    fetchData()
  }, [])

  if (!athleteData) return <div>Loading...</div>

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Logo Display Test</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {/* UNC Logo */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">UNC Logo</h3>
            {athleteData.logos?.college ? (
              <div>
                <img
                  src={athleteData.logos.college || "/placeholder.svg"}
                  alt="UNC Logo"
                  className="w-16 h-16 object-contain mx-auto"
                  onError={(e) => {
                    console.error("UNC logo failed to load:", athleteData.logos.college)
                    e.currentTarget.style.display = "none"
                  }}
                  onLoad={() => console.log("UNC logo loaded successfully")}
                />
                <p className="text-xs text-gray-500 mt-2 break-all">{athleteData.logos.college}</p>
              </div>
            ) : (
              <div className="w-16 h-16 bg-gray-200 flex items-center justify-center mx-auto">
                <span className="text-xs text-gray-500">No Logo</span>
              </div>
            )}
          </div>

          {/* Cardinal Gibbons Logo */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">Cardinal Gibbons</h3>
            {athleteData.logos?.high_school ? (
              <div>
                <img
                  src={athleteData.logos.high_school || "/placeholder.svg"}
                  alt="Cardinal Gibbons Logo"
                  className="w-16 h-16 object-contain mx-auto"
                  onError={(e) => {
                    console.error("Cardinal Gibbons logo failed to load:", athleteData.logos.high_school)
                    e.currentTarget.style.display = "none"
                  }}
                />
                <p className="text-xs text-gray-500 mt-2 break-all">{athleteData.logos.high_school}</p>
              </div>
            ) : (
              <div className="w-16 h-16 bg-gray-200 flex items-center justify-center mx-auto">
                <span className="text-xs text-gray-500">No Logo</span>
              </div>
            )}
          </div>

          {/* RAW Logo */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">RAW Wrestling</h3>
            {athleteData.logos?.club ? (
              <div>
                <img
                  src={athleteData.logos.club || "/placeholder.svg"}
                  alt="RAW Logo"
                  className="w-16 h-16 object-contain mx-auto"
                  onError={(e) => {
                    console.error("RAW logo failed to load:", athleteData.logos.club)
                    e.currentTarget.style.display = "none"
                  }}
                />
                <p className="text-xs text-gray-500 mt-2 break-all">{athleteData.logos.club}</p>
              </div>
            ) : (
              <div className="w-16 h-16 bg-gray-200 flex items-center justify-center mx-auto">
                <span className="text-xs text-gray-500">No Logo</span>
              </div>
            )}
          </div>

          {/* NC United Blue Logo */}
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="font-semibold mb-2">NC United Blue</h3>
            {athleteData.logos?.nc_united ? (
              <div>
                <img
                  src={athleteData.logos.nc_united || "/placeholder.svg"}
                  alt="NC United Blue Logo"
                  className="w-16 h-16 object-contain mx-auto"
                  onError={(e) => {
                    console.error("NC United Blue logo failed to load:", athleteData.logos.nc_united)
                    e.currentTarget.style.display = "none"
                  }}
                />
                <p className="text-xs text-gray-500 mt-2 break-all">{athleteData.logos.nc_united}</p>
              </div>
            ) : (
              <div className="w-16 h-16 bg-gray-200 flex items-center justify-center mx-auto">
                <span className="text-xs text-gray-500">No Logo</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Debug Info</h2>
          <pre className="text-sm bg-gray-100 p-4 rounded overflow-auto">
            {JSON.stringify(athleteData.logos, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  )
}
