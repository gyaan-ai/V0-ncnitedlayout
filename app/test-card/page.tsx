import { CommitCardSigned } from "@/components/recruiting/commit-card-signed"

export default function TestCardPage() {
  const liamData = {
    id: 1,
    athleteName: "Liam Hickey",
    firstName: "Liam",
    lastName: "Hickey",
    commitPhotoUrl: "/images/liam-hickey-commit-announcement.png",
    collegeName: "University of North Carolina at Chapel Hill",
    highSchool: "Cardinal Gibbons High School",
    club: "RAW Wrestling",
    ncUnitedTeam: "Blue" as const,
    graduationYear: 2025,
    weightClass: "157",
    division: "NCAA Division I",
    instagramHandle: "@liamhickey_",
    achievements: [
      "2024 NHSCA National Champion (157 lbs)",
      "3x North Carolina State Champion (2022, 2023, 2024)",
      "2023 Super32 3rd Place All-American",
      "2023 Fargo 5th Place All-American (Freestyle)",
      "2024 Beast of the East Champion",
      "2023 Powerade Tournament Champion",
      "2024 Academic All-American (3.8+ GPA)",
      "4x Regional Champion",
      "2024 Team Captain - Cardinal Gibbons",
      "2023 Outstanding Wrestler Award - NC State Championships",
      "2024 Ironman Tournament Finalist",
      "3x All-Conference Selection",
      "2024 NC United Blue Team Captain",
      "2023 Knockout Sportswear Classic Champion",
      "2024 Virginia Duals Champion",
      "2022 Freshman State Champion",
      "2024 Most Valuable Wrestler - Cardinal Gibbons",
      "2023 Shrine Bowl Wrestling Champion",
    ],
    location: "RALEIGH, NC",
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">Liam Hickey - Commit Card Test</h1>
        <div className="flex justify-center">
          <CommitCardSigned {...liamData} />
        </div>
      </div>
    </div>
  )
}
