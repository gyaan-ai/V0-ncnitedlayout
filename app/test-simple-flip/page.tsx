"use client"

import { CommitCardSimpleFlip } from "@/components/recruiting/commit-card-simple-flip"

const sampleAthletes = [
  {
    id: "1",
    athleteName: "Liam Hickey",
    firstName: "Liam",
    lastName: "Hickey",
    commitPhotoUrl: "/images/liam-hickey-commit-announcement.png",
    collegeName: "University of North Carolina at Chapel Hill",
    collegeLogo:
      "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/colleges/unc-chapel-hill-1749915543451.png",
    highSchool: "Cardinal Gibbons High School",
    highSchoolLogo:
      "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/high_schools/cardinal-gibbons-hs-1749915555760.png",
    club: "RAW Wrestling",
    clubLogo: "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/clubs/raw-wrestling-1749915562203.png",
    ncUnitedTeam: "Blue",
    ncUnitedLogo:
      "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/teams/nc-united-blue-1750109925117.png",
    graduationYear: 2025,
    weightClass: "132",
    division: "NCAA Division I",
    instagramHandle: "@liamhickey_",
  },
  // Test with different aspect ratio image
  {
    id: "2",
    athleteName: "Test Athlete",
    firstName: "Test",
    lastName: "Athlete",
    commitPhotoUrl: "/placeholder.svg?height=600&width=400",
    collegeName: "Duke University",
    highSchool: "Test High School",
    graduationYear: 2025,
    weightClass: "157",
    division: "NCAA Division I",
  },
]

export default function TestSimpleFlip() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Simple Flip Card Test</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleAthletes.map((athlete) => (
            <CommitCardSimpleFlip key={athlete.id} {...athlete} />
          ))}
        </div>

        <div className="text-center text-sm text-gray-600 mt-8 max-w-2xl mx-auto">
          <h2 className="font-semibold mb-2">Design Benefits:</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Front:</strong> Shows full commit photo in original format
            </li>
            <li>
              <strong>Back:</strong> Clean info + prominent "View Full Profile" button
            </li>
            <li>
              <strong>No accomplishments list</strong> - keeps it simple
            </li>
            <li>
              <strong>Works with any photo</strong> - portrait, landscape, square
            </li>
            <li>
              <strong>Mobile-friendly</strong> - tap to flip works great
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
