"use client"

import { CommitCardWithLogos } from "@/components/recruiting/commit-card-with-logos"

export default function TestAnnaCardPage() {
  const annaData = {
    id: "anna-test",
    athleteName: "Anna Smith",
    firstName: "Anna",
    lastName: "Smith",
    commitPhotoUrl: "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/commit-photos/anna-smith-commitment.jpg",
    collegeName: "Presbyterian", // Will find via alias
    highSchool: "Corinth Holders", // Will find exact match
    club: "RAW", // Will find exact match
    ncUnitedTeam: "Gold", // CHANGED TO GOLD - will search for "NC United Gold"
    graduationYear: 2025,
    weightClass: "120",
    division: "NCAA Division I",
    instagramHandle: "@anna_wrestler",
    achievements: ["State Champion 2024", "Regional Champion 2023", "All-American 2024", "Team Captain"],
    aiSummary: "Anna is a dominant wrestler with exceptional technique and leadership skills from North Carolina.",
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Anna's Commit Card - Gold Team</h1>
        <div className="flex justify-center">
          <CommitCardWithLogos {...annaData} />
        </div>

        <div className="mt-8 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">Logo Search Logic:</h2>
          <ul className="space-y-1 text-sm">
            <li>
              🏛️ <strong>Presbyterian:</strong> Searches for "Presbyterian" (type: college) → finds via alias
            </li>
            <li>
              🏫 <strong>Corinth Holders:</strong> Searches for "Corinth Holders" (type: high_school) → exact match
            </li>
            <li>
              🤼 <strong>RAW:</strong> Searches for "RAW" (type: club) → exact match
            </li>
            <li>
              🟡 <strong>Gold Team:</strong> Searches for "NC United Gold" (type: team) → needs this logo in database
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
