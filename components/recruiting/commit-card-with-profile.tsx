"use client"
import { CommitCardSigned, type CommitCardSignedProps } from "./commit-card-signed"
import { getAthleteByName } from "@/lib/athlete-lookup"

interface CommitCardWithProfileProps {
  firstName: string
  lastName: string
  overrides?: Partial<CommitCardSignedProps>
}

export function CommitCardWithProfile({ firstName, lastName, overrides = {} }: CommitCardWithProfileProps) {
  // Get athlete profile data
  const athleteProfile = getAthleteByName(firstName, lastName)

  if (!athleteProfile) {
    return (
      <div className="w-full max-w-lg mx-auto p-8 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-semibold mb-2">Profile Not Found</h3>
          <p className="text-red-600">
            Could not find profile for {firstName} {lastName}
          </p>
        </div>
      </div>
    )
  }

  // Build commit card props from profile data
  const commitCardProps: CommitCardSignedProps = {
    id: athleteProfile.id,
    athleteName: athleteProfile.name,
    firstName: athleteProfile.firstName || firstName,
    lastName: athleteProfile.lastName || lastName,
    commitPhotoUrl: athleteProfile.image_url,
    collegeName: athleteProfile.college_committed || "TBD",
    highSchool: athleteProfile.high_school || "Unknown High School",
    club: athleteProfile.wrestling_club,
    ncUnitedTeam: athleteProfile.ncUnitedTeam,
    graduationYear: athleteProfile.graduation_year,
    weightClass: athleteProfile.weight_class,
    division: athleteProfile.college_division,
    instagramHandle: athleteProfile.instagramHandle,
    achievements: athleteProfile.achievements || [],
    commitmentDate: athleteProfile.commitment_date,
    location: "RALEIGH, NC",
    ...overrides, // Allow overriding any props
  }

  return <CommitCardSigned {...commitCardProps} />
}
