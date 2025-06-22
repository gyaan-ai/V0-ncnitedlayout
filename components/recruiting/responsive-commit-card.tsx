"use client"

import { CommitCardSigned } from "./commit-card-signed"
import { CommitCardMobile } from "./commit-card-mobile"
import { useIsMobile } from "@/hooks/use-mobile"

export interface ResponsiveCommitCardProps {
  id: string | number
  athleteName: string
  firstName: string
  lastName: string
  commitPhotoUrl?: string
  collegeName: string
  collegeLogo?: string
  collegeColors?: {
    primary: string
    secondary: string
  }
  highSchool: string
  highSchoolLogo?: string
  club?: string
  clubLogo?: string
  ncUnitedTeam?: "Blue" | "Gold" | null
  ncUnitedLogo?: string
  graduationYear: number
  weightClass: string
  division?: string
  instagramHandle?: string
  achievements: string[]
  aiSummary?: string
  commitmentDate?: string
  className?: string
}

export function ResponsiveCommitCard(props: ResponsiveCommitCardProps) {
  const isMobile = useIsMobile()

  // On mobile, use the mobile card (from /test-mobile-version)
  if (isMobile) {
    return <CommitCardMobile {...props} />
  }

  // On desktop, use the existing signed card (unchanged)
  return <CommitCardSigned {...props} />
}
