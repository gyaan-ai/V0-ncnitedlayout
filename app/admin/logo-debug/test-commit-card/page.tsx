"use client"

import { CommitCard } from "@/components/recruiting/commit-card"

export default function TestCommitCardPage() {
  const testCommit = {
    id: 1,
    athleteName: "Liam Hickey",
    firstName: "Liam",
    lastName: "Hickey",
    commitPhotoUrl: "/images/liam-hickey-commit-announcement.png",
    collegeName: "University of North Carolina at Chapel Hill",
    collegeLogo: "/images/logos/colleges/unc-chapel-hill.png", // Direct path
    highSchool: "Cardinal Gibbons High School",
    highSchoolLogo: "/images/logos/high-schools/cardinal-gibbons.png", // Direct path
    club: "RAW Wrestling Club",
    clubLogo: "/images/logos/clubs/raw-wrestling.png", // Direct path
    graduationYear: 2025,
    weightClass: "160",
    division: "Division I",
    instagramHandle: "@liam_hickey",
    achievements: ["2024 NHSCA National Champion", "3x North Carolina State Champion", "2024 UCD Champion"],
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-black text-slate-800 font-oswald mb-2">Test Commit Card</h1>
            <p className="text-slate-600">Testing commit card with direct logo paths</p>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Logo Path Test</h2>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center">
                <p className="text-sm font-medium mb-2">College Logo</p>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border mx-auto p-2">
                  <img
                    src="/images/logos/colleges/unc-chapel-hill.png"
                    alt="UNC Logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      console.error("College logo failed to load")
                      e.currentTarget.style.display = "none"
                    }}
                    onLoad={() => console.log("✅ College logo loaded")}
                  />
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm font-medium mb-2">High School Logo</p>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border mx-auto p-2">
                  <img
                    src="/images/logos/high-schools/cardinal-gibbons.png"
                    alt="Cardinal Gibbons Logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      console.error("High school logo failed to load")
                      e.currentTarget.style.display = "none"
                    }}
                    onLoad={() => console.log("✅ High school logo loaded")}
                  />
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm font-medium mb-2">Club Logo</p>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border mx-auto p-2">
                  <img
                    src="/images/logos/clubs/raw-wrestling.png"
                    alt="RAW Wrestling Logo"
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      console.error("Club logo failed to load")
                      e.currentTarget.style.display = "none"
                    }}
                    onLoad={() => console.log("✅ Club logo loaded")}
                  />
                </div>
              </div>
            </div>
          </div>

          <CommitCard {...testCommit} />
        </div>
      </div>
    </div>
  )
}
