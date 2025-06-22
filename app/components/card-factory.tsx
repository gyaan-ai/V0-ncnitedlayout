"use client"

import { TournamentWrestlerCard } from "./tournament-wrestler-card"
import { RecruitingCard } from "./recruiting-card" // We'll create this next
import { SeasonSummaryCard } from "./season-summary-card" // And this

interface CardFactoryProps {
  cardType: "tournament" | "recruiting" | "season_summary"
  athleteData: any // Full athlete profile
  contextData: any // Tournament, season, or recruiting specific data
  imagePath: string
}

export function CardFactory({ cardType, athleteData, contextData, imagePath }: CardFactoryProps) {
  switch (cardType) {
    case "tournament":
      return (
        <TournamentWrestlerCard
          athlete={athleteData}
          tournament={contextData.tournament}
          performance={contextData.performance}
          imagePath={imagePath}
        />
      )

    case "recruiting":
      return (
        <RecruitingCard
          athlete={athleteData}
          academics={contextData.academics}
          recruiting={contextData.recruiting}
          imagePath={imagePath}
        />
      )

    case "season_summary":
      return <SeasonSummaryCard athlete={athleteData} season={contextData.season} imagePath={imagePath} />

    default:
      return <div>Unknown card type</div>
  }
}
