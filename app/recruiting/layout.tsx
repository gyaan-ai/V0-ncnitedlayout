import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Wrestling Recruiting Portal | NC United Wrestling",
    template: "%s | NC United Wrestling",
  },
  description:
    "Track North Carolina's wrestling talent and college commitments with NC United Wrestling's recruiting portal.",
}

export default function RecruitingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="min-h-screen flex flex-col">{children}</div>
}
