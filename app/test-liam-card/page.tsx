"use client"

import { CommitCardWithLogos } from "@/components/recruiting/commit-card-with-logos"

export default function TestLiamCardPage() {
  const liamData = {
    id: "liam-hickey",
    athleteName: "Liam Hickey",
    firstName: "Liam",
    lastName: "Hickey",
    commitPhotoUrl: "/images/liam-hickey-commit-announcement.png",
    collegeName: "UNC", // Will find via alias (UNC → University of North Carolina)
    highSchool: "Cardinal Gibbons", // Need to add this logo
    club: "NC United Wrestling", // Need to add this logo
    ncUnitedTeam: "Gold", // CHANGED TO GOLD - will search for "NC United Gold"
    graduationYear: 2025,
    weightClass: "132",
    division: "NCAA Division I",
    instagramHandle: "@liam_hickey_wrestling",
    achievements: [
      "NCHSAA 2025 State Champion",
      "NCHSAA 2024 State Champion",
      "NHSCA 2025 4th Place All-American",
      "NHSCA 2024 8th Place All-American",
      "4x NCHSAA State Placer",
      "Dave Schultz Award Winner",
    ],
    aiSummary:
      "Liam Hickey is a two-time North Carolina state champion and two-time NHSCA All-American who has committed to wrestle at the University of North Carolina. Known for his technical prowess and competitive drive, Liam has established himself as one of the top wrestlers in his weight class with an impressive tournament resume including multiple state titles and national placings.",
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Liam Hickey's Commit Card - Gold Team</h1>
        <div className="flex justify-center">
          <CommitCardWithLogos {...liamData} />
        </div>

        <div className="mt-8 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">Logo Status:</h2>
          <ul className="space-y-1 text-sm">
            <li>
              ✅ <strong>UNC:</strong> Should load from blob storage
            </li>
            <li>
              ❓ <strong>Cardinal Gibbons:</strong> Need to add this logo to database
            </li>
            <li>
              ❓ <strong>NC United Wrestling:</strong> Need to add this logo to database
            </li>
            <li>
              ❓ <strong>NC United Gold:</strong> Need to add this logo to database
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
