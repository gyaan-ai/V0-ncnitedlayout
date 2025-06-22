"use client"

import { useState } from "react"
import { CommitCard } from "@/components/recruiting/commit-card-production"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestLiamCard() {
  const [showCard, setShowCard] = useState(true)

  // Liam's data
  const liamData = {
    id: 1,
    athleteName: "Liam Hickey",
    firstName: "Liam",
    lastName: "Hickey",
    commitPhotoUrl: "/images/liam-hickey-commit-announcement.png",
    collegeName: "University of North Carolina at Chapel Hill",
    collegeColors: {
      primary: "#4B9CD3", // Carolina Blue
      secondary: "#FFFFFF",
    },
    highSchool: "Cardinal Gibbons High School",
    club: "RAW Wrestling",
    graduationYear: 2025,
    weightClass: "157",
    division: "NCAA D1",
    instagramHandle: "@liamhickey_wrestling",
    achievements: [
      "2x North Carolina State Champion",
      "NHSCA All-American",
      "Fargo National Qualifier",
      "Team Captain - Cardinal Gibbons",
      "Regional Champion",
      "Conference Player of the Year",
    ],
    commitmentDate: "2024-11-15",
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-black text-slate-800 font-oswald mb-2">Test Liam's Commitment Card</h1>
          <p className="text-slate-600">
            This shows how the logos will appear on the back of Liam's card once the logo system is working
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card Preview */}
          <div>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Live Card Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Click the card to flip it and see the back with logos</p>
                <Button onClick={() => setShowCard(!showCard)} variant="outline" className="mb-4">
                  {showCard ? "Hide Card" : "Show Card"}
                </Button>
              </CardContent>
            </Card>

            {showCard && (
              <div className="max-w-md mx-auto">
                <CommitCard {...liamData} />
              </div>
            )}
          </div>

          {/* Logo Explanation */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Expected Logos on Back of Card</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">UNC</span>
                  </div>
                  <div>
                    <p className="font-medium">University of North Carolina at Chapel Hill</p>
                    <p className="text-sm text-gray-500">College Logo (Large, top section)</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">CG</span>
                  </div>
                  <div>
                    <p className="font-medium">Cardinal Gibbons High School</p>
                    <p className="text-sm text-gray-500">High School Logo (Bottom left)</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">RAW</span>
                  </div>
                  <div>
                    <p className="font-medium">RAW Wrestling</p>
                    <p className="text-sm text-gray-500">Club Logo (Bottom right)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How Logo Loading Works</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="list-decimal list-inside space-y-2 text-sm">
                  <li>Card loads with athlete data</li>
                  <li>
                    System searches logo database for:
                    <ul className="list-disc list-inside ml-4 mt-1 space-y-1">
                      <li>"University of North Carolina at Chapel Hill" (college)</li>
                      <li>"Cardinal Gibbons High School" (high_school)</li>
                      <li>"RAW Wrestling" (club)</li>
                    </ul>
                  </li>
                  <li>If logos found, displays actual images</li>
                  <li>If not found, shows colored initials as fallback</li>
                  <li>Console logs show loading status for debugging</li>
                </ol>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Current Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">Logo database table missing</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-sm">No logos uploaded yet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm">Fallback initials showing</span>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800">Next Steps:</p>
                  <ol className="list-decimal list-inside text-sm text-blue-700 mt-1">
                    <li>Fix logo database (Force Setup button)</li>
                    <li>Upload UNC, Cardinal Gibbons, RAW logos</li>
                    <li>Logos will automatically appear on card</li>
                  </ol>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
