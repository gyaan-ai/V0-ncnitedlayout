"use client"

import { CommitCardWithLogos } from "@/components/recruiting/commit-card-with-logos"

export default function TestPresbyterianCardPage() {
  // Test with Presbyterian College (full name)
  const johnData = {
    id: "john-test",
    athleteName: "John Smith",
    firstName: "John",
    lastName: "Smith",
    commitPhotoUrl: "/images/john-commitment.jpg",
    collegeName: "Presbyterian College", // Full name that should work
    highSchool: "Corinth Holders",
    club: "RAW",
    ncUnitedTeam: "Blue",
    graduationYear: 2025,
    weightClass: "165",
    division: "NCAA Division I",
    instagramHandle: "@john_wrestler",
    achievements: ["Regional Champion 2024", "State Qualifier 2023"],
    aiSummary: "John is a technical wrestler with great conditioning.",
  }

  // Test with Presbyterian (short name)
  const janeData = {
    id: "jane-test",
    athleteName: "Jane Doe",
    firstName: "Jane",
    lastName: "Doe",
    commitPhotoUrl: "/images/jane-commitment.jpg",
    collegeName: "Presbyterian", // Short name that should work with aliases
    highSchool: "Corinth Holders",
    club: "RAW",
    ncUnitedTeam: "Blue",
    graduationYear: 2025,
    weightClass: "165",
    division: "NCAA Division I",
    instagramHandle: "@jane_wrestler",
    achievements: ["Regional Champion 2024", "State Qualifier 2023"],
    aiSummary: "John is a technical wrestler with great conditioning.",
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Presbyterian Logo Test</h1>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-xl font-bold mb-4 text-center">Presbyterian College</h2>
            <CommitCardWithLogos {...johnData} />
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4 text-center">Presbyterian (short)</h2>
            <CommitCardWithLogos {...janeData} />
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-bold mb-2">Debug Info:</h2>
          <p className="text-sm text-gray-600">
            Check the browser console to see logo matching. Both cards should show the Presbyterian logo.
          </p>
        </div>
      </div>
    </div>
  )
}
