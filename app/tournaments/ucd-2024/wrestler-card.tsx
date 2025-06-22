"use client"

import { TournamentWrestlerCard } from "@/app/components/tournament-wrestler-card"

interface WrestlerProps {
  wrestler: {
    firstName?: string
    lastName?: string
    name?: string
    weight: number | string
    record: string
    grade?: string
    points?: number
    matches?: Array<{
      match: number
      opponent: string
      team: string
      result: string
      points: number
      type: string
    }>
  }
}

const WrestlerCard = ({ wrestler }: WrestlerProps) => {
  // Handle both formats of wrestler data (legacy and new format)
  const firstName = wrestler.firstName || (wrestler.name ? wrestler.name.split(" ")[0] : "")
  const lastName = wrestler.lastName || (wrestler.name ? wrestler.name.split(" ").slice(1).join(" ") : "")
  const weight = typeof wrestler.weight === "string" ? Number.parseInt(wrestler.weight) : wrestler.weight

  // Format data for TournamentWrestlerCard
  const athlete = {
    first_name: firstName,
    last_name: lastName,
    current_grade: wrestler.grade || "Freshman",
    weight_class: weight,
    club_team: "NC United",
    high_school_team: "",
  }

  const tournament = {
    name: "Ultimate Club Duals 2024",
    location: "Virginia Beach, VA",
    date: "May 2024",
    division: "Youth",
  }

  // Calculate stats from matches
  const stats = {
    pins: wrestler.matches?.filter((m) => m.type === "pin").length || 0,
    tech_falls: wrestler.matches?.filter((m) => m.type === "tech_fall").length || 0,
    major_decisions: wrestler.matches?.filter((m) => m.type === "major_decision").length || 0,
    decisions: wrestler.matches?.filter((m) => m.type === "decision").length || 0,
    avg_team_points: wrestler.matches
      ? wrestler.matches.reduce((sum, m) => sum + m.points, 0) / wrestler.matches.length
      : 0,
  }

  // Format matches for TournamentWrestlerCard
  const formattedMatches =
    wrestler.matches?.map((match) => ({
      match: match.match,
      round: match.match <= 5 ? "Pool Play" : "Finals",
      opponent: match.opponent,
      opponent_team: match.team,
      result: match.result,
      win_type: match.type !== "loss" ? match.type : undefined,
      score: match.result.includes("-") ? match.result.split("-")[1] : undefined,
      time: undefined,
      team_points: match.points,
      type: match.type,
    })) || []

  const performance = {
    record: wrestler.record,
    team_points: wrestler.points || 0,
    matches: formattedMatches,
    stats: stats,
  }

  // Updated image mapping - SIMPLIFIED
  const getImagePath = (firstName: string, lastName: string) => {
    const name = `${firstName.toLowerCase()}-${lastName.toLowerCase()}`

    // Direct mapping for Liam Hickey
    if (name === "liam-hickey") {
      return "/images/liam-hickey-ucd-2024.png"
    }

    // Map other wrestlers
    const imageMap: { [key: string]: string } = {
      "carson-raper": "/images/carson-raper-ucd.png",
      "eli-taylor": "/images/eli-taylor-ucd.png",
      "holton-quincy": "/images/holton-quincy-ucd-2024.png",
      "mac-johnson": "/images/mac-johnson-ucd.png",
      "tyler-watt": "/images/tyler-watt-ucd-2024.png",
      "bentley-sly": "/images/bentley-sly-ucd-2024.png",
      "tobin-mcnair": "/images/tobin-mcnair-ucd.png",
      "finnius-mccafferty": "/images/finn-mccafferty-ucd.png",
      "dominic-blue": "/images/dom-blue-ucd.png",
      "jack-harty": "/images/jack-harty-ucd.png",
      "brock-sullivan": "/images/brock-sullivan-ucd.png",
      "everest-ouellette": "/images/everest-ouellette-ucd.png",
      "mason-brown": "/images/mason-brown-ucd.png",
      "ayven-chitavong": "/images/ayven-chitavong-ucd.png",
    }

    return imageMap[name] || `/placeholder.svg?height=400&width=300&text=${firstName}+${lastName}`
  }

  const imagePath = getImagePath(firstName, lastName)

  return (
    <TournamentWrestlerCard athlete={athlete} tournament={tournament} performance={performance} imagePath={imagePath} />
  )
}

export default WrestlerCard
