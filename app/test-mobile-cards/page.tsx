"use client"

import { CommitCardMobileOptimized } from "@/components/recruiting/commit-card-mobile-optimized"

const sampleAthlete = {
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
  ncUnitedLogo: "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/teams/nc-united-blue-1750109925117.png",
  graduationYear: 2025,
  weightClass: "132",
  division: "NCAA Division I",
  instagramHandle: "@liamhickey_",
  achievements: [
    "NCHSAA 2025 State Champion",
    "NCHSAA 2024 State Champion",
    "NHSCA 2025 4th Place All-American",
    "NHSCA 2024 8th Place All-American",
    "4th Place Patriot Division I College Open",
    "Dave Schultz Award Winner",
    "Cardinal Gibbons Athlete of the Year",
  ],
  aiSummary:
    "Liam Hickey is a dominant 132-pound wrestler from Cardinal Gibbons High School who has committed to the University of North Carolina at Chapel Hill. A two-time NCHSAA State Champion and two-time NHSCA All-American, Liam has established himself as one of the top wrestlers in North Carolina. His impressive tournament resume includes a 4th place finish at the prestigious Patriot Division I College Open, demonstrating his ability to compete at the collegiate level.",
}

export default function TestMobileCards() {
  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-center mb-6">Mobile Card Test</h1>

        <CommitCardMobileOptimized {...sampleAthlete} />

        <div className="text-center text-sm text-gray-600 mt-8">
          <p>Test this on mobile devices to verify:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Profile summary is visible</li>
            <li>Expand/collapse works smoothly</li>
            <li>Full Profile button is prominent</li>
            <li>Touch interactions work well</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
