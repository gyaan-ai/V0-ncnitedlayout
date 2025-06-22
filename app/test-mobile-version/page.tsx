"use client"

import { CommitCardMobile } from "@/components/recruiting/commit-card-mobile"

export default function TestMobileVersionPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Mobile Commit Card Test</h1>

        <div className="flex justify-center">
          <CommitCardMobile
            id="liam-hickey"
            athleteName="Liam Hickey"
            firstName="Liam"
            lastName="Hickey"
            commitPhotoUrl="/images/liam-hickey-commit-announcement.png"
            collegeName="University of North Carolina"
            highSchool="Green Hope High School"
            club="NC United Wrestling"
            ncUnitedTeam="Blue"
            graduationYear={2025}
            weightClass="132"
            division="NCAA Division I"
            instagramHandle="@liamhickey_"
            achievements={[
              "2024 NHSCA National Champion",
              "3x North Carolina State Champion",
              "2024 Fargo National Champion",
            ]}
            aiSummary="Elite wrestler with exceptional technique and mental toughness. Known for his aggressive style and ability to perform under pressure."
          />
        </div>
      </div>
    </div>
  )
}
