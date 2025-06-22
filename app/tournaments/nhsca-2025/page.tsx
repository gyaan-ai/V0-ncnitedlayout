"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, ArrowUp, ArrowDown, Trophy, Target, Zap, Medal } from "lucide-react"
import { useState } from "react"
import { WrestlerCardsSection } from "./wrestler-cards-section"

// Hard-coded wrestler image mapping to prevent mix-ups - UPDATED WITH MORE NHSCA TOURNAMENT PHOTOS
const wrestlerImages = {
  "Luke Richards": "/images/nhsca-luke-richards-action-new.png",
  "Jekai Sedgwick": "/images/jekai-sedgwick-nhsca-2025.png",
  "Mac Johnson": "/images/mac-johnson-nhsca.png",
  "Tye Johnson": "/images/tye-johnson-nhsca.png",
  "Aiden White": "/images/aiden-white-nhsca-2025.png",
  "Sammy Gantt": "/images/sammy-gantt-nhsca.png",
  "Bentley Sly": "/images/bentley-sly-nhsca-2025.png",
  "Lorenzo Alston": "/images/nhsca-lorenzo-alston-technique.png",
  "Nate McCartney": "/images/nate-mccartney-nhsca.png",
  "Dominic Blue": "/images/dominic-blue-nhsca.png",
  "Brad Harper": "/images/sam-harper-nhsca-2025.png",
  "Brock Sullivan": "/images/brock-sullivan-nhsca-2025.png",
  "Xavier Wilson": "/images/xavier-wilson-nhsca.png",
  "Everest Ouellette": "/images/everest-ouellette-nhsca-2025.png",
}

// NHSCA 2025 VERIFIED and ACCURATE data from official results spreadsheet
const nhscaResults = [
  {
    firstName: "LUKE",
    lastName: "RICHARDS",
    weight: 106,
    record: "6-2",
    points: 22,
    matches: [
      {
        match: 1,
        opponent: "Team Gotcha Illinois",
        team: "Team Gotcha Illinois",
        result: "W-TF 18-1",
        points: 5,
        type: "tech_fall",
      },
      { match: 2, opponent: "Apache Blue", team: "Apache Blue", result: "W-TF 16-0", points: 5, type: "tech_fall" },
      {
        match: 3,
        opponent: "Knights Wrestling",
        team: "Knights Wrestling",
        result: "W-MD 9-1",
        points: 4,
        type: "major_decision",
      },
      {
        match: 4,
        opponent: "Alien Spaceship",
        team: "Alien Spaceship",
        result: "W-DEC 9-4",
        points: 3,
        type: "decision",
      },
      { match: 5, opponent: "Ragin Raisins", team: "Ragin Raisins", result: "W-PIN 3-0", points: 6, type: "pin" },
      { match: 6, opponent: "Superior Elite", team: "Superior Elite", result: "L-DEC 0-4", points: -3, type: "loss" },
      { match: 7, opponent: "CKWA", team: "CKWA", result: "W-TF 17-2", points: 5, type: "tech_fall" },
      { match: 8, opponent: "Team Shutt", team: "Team Shutt", result: "L-DEC 0-7", points: -3, type: "loss" },
    ],
  },
  {
    firstName: "JEKAI",
    lastName: "SEDGWICK",
    weight: 113,
    record: "6-2",
    points: 27,
    matches: [
      {
        match: 1,
        opponent: "Team Gotcha Illinois",
        team: "Team Gotcha Illinois",
        result: "W-PIN 3-0",
        points: 6,
        type: "pin",
      },
      { match: 2, opponent: "Apache Blue", team: "Apache Blue", result: "W-PIN 3-0", points: 6, type: "pin" },
      {
        match: 3,
        opponent: "Knights Wrestling",
        team: "Knights Wrestling",
        result: "W-FOR",
        points: 6,
        type: "forfeit",
      },
      { match: 4, opponent: "Alien Spaceship", team: "Alien Spaceship", result: "W-PIN 3-0", points: 6, type: "pin" },
      { match: 5, opponent: "Ragin Raisins", team: "Ragin Raisins", result: "L-DEC 0-7", points: -3, type: "loss" },
      { match: 6, opponent: "Superior Elite", team: "Superior Elite", result: "W-PIN 3-2", points: 6, type: "pin" },
      { match: 7, opponent: "CKWA", team: "CKWA", result: "W-PIN 3-0", points: 6, type: "pin" },
      { match: 8, opponent: "Team Shutt", team: "Team Shutt", result: "L-PIN 0-3", points: -6, type: "loss" },
    ],
  },
  {
    firstName: "MAC",
    lastName: "JOHNSON",
    weight: 120,
    record: "6-2",
    points: 24,
    matches: [
      {
        match: 1,
        opponent: "Team Gotcha Illinois",
        team: "Team Gotcha Illinois",
        result: "W-PIN 3-0",
        points: 6,
        type: "pin",
      },
      { match: 2, opponent: "Apache Blue", team: "Apache Blue", result: "W-PIN 12-3", points: 6, type: "pin" },
      {
        match: 3,
        opponent: "Knights Wrestling",
        team: "Knights Wrestling",
        result: "W-FOR",
        points: 6,
        type: "forfeit",
      },
      { match: 4, opponent: "Alien Spaceship", team: "Alien Spaceship", result: "W-PIN 6-1", points: 6, type: "pin" },
      { match: 5, opponent: "Ragin Raisins", team: "Ragin Raisins", result: "W-PIN 3-0", points: 6, type: "pin" },
      {
        match: 6,
        opponent: "Superior Elite",
        team: "Superior Elite",
        result: "W-DEC 9-8",
        points: 3,
        type: "decision",
      },
      { match: 7, opponent: "CKWA", team: "CKWA", result: "L-PIN 0-6", points: -6, type: "loss" },
      { match: 8, opponent: "Team Shutt", team: "Team Shutt", result: "L-DEC 0-3", points: -3, type: "loss" },
    ],
  },
  {
    firstName: "TYE",
    lastName: "JOHNSON",
    weight: 126,
    record: "7-1",
    points: 25,
    matches: [
      {
        match: 1,
        opponent: "Team Gotcha Illinois",
        team: "Team Gotcha Illinois",
        result: "W-MD 10-2",
        points: 4,
        type: "major_decision",
      },
      { match: 2, opponent: "Apache Blue", team: "Apache Blue", result: "W-TF 19-4", points: 5, type: "tech_fall" },
      {
        match: 3,
        opponent: "Knights Wrestling",
        team: "Knights Wrestling",
        result: "W-TF 20-5",
        points: 5,
        type: "tech_fall",
      },
      {
        match: 4,
        opponent: "Alien Spaceship",
        team: "Alien Spaceship",
        result: "W-DEC 6-1",
        points: 3,
        type: "decision",
      },
      { match: 5, opponent: "Ragin Raisins", team: "Ragin Raisins", result: "W-TF 17-1", points: 5, type: "tech_fall" },
      { match: 6, opponent: "Superior Elite", team: "Superior Elite", result: "L-DEC 0-7", points: -3, type: "loss" },
      { match: 7, opponent: "CKWA", team: "CKWA", result: "W-DEC 4-1", points: 3, type: "decision" },
      { match: 8, opponent: "Team Shutt", team: "Team Shutt", result: "W-DEC 4-1", points: 3, type: "decision" },
    ],
  },
  {
    firstName: "AIDEN",
    lastName: "WHITE",
    weight: 132,
    record: "6-2",
    points: 21,
    matches: [
      {
        match: 1,
        opponent: "Team Gotcha Illinois",
        team: "Team Gotcha Illinois",
        result: "W-TF 19-3",
        points: 5,
        type: "tech_fall",
      },
      { match: 2, opponent: "Apache Blue", team: "Apache Blue", result: "W-PIN 12-2", points: 6, type: "pin" },
      {
        match: 3,
        opponent: "Knights Wrestling",
        team: "Knights Wrestling",
        result: "L-DEC 3-9",
        points: -3,
        type: "loss",
      },
      {
        match: 4,
        opponent: "Alien Spaceship",
        team: "Alien Spaceship",
        result: "W-MD 14-2",
        points: 4,
        type: "major_decision",
      },
      { match: 5, opponent: "Ragin Raisins", team: "Ragin Raisins", result: "W-DEC 8-5", points: 3, type: "decision" },
      { match: 6, opponent: "Superior Elite", team: "Superior Elite", result: "W-FOR", points: 6, type: "forfeit" },
      { match: 7, opponent: "CKWA", team: "CKWA", result: "W-DEC 5-2", points: 3, type: "decision" },
      { match: 8, opponent: "Team Shutt", team: "Team Shutt", result: "L-DEC 0-4", points: -3, type: "loss" },
    ],
  },
  {
    firstName: "SAMMY",
    lastName: "GANTT",
    weight: 138,
    record: "4-4",
    points: 3,
    matches: [
      {
        match: 1,
        opponent: "Team Gotcha Illinois",
        team: "Team Gotcha Illinois",
        result: "W-PIN 13-1",
        points: 6,
        type: "pin",
      },
      { match: 2, opponent: "Apache Blue", team: "Apache Blue", result: "W-TF 17-2", points: 5, type: "tech_fall" },
      {
        match: 3,
        opponent: "Knights Wrestling",
        team: "Knights Wrestling",
        result: "W-TF 16-0",
        points: 5,
        type: "tech_fall",
      },
      {
        match: 4,
        opponent: "Alien Spaceship",
        team: "Alien Spaceship",
        result: "W-DEC 2-0",
        points: 3,
        type: "decision",
      },
      { match: 5, opponent: "Ragin Raisins", team: "Ragin Raisins", result: "L-PIN 0-3", points: -6, type: "loss" },
      { match: 6, opponent: "Superior Elite", team: "Superior Elite", result: "L-DEC 0-4", points: -3, type: "loss" },
      { match: 7, opponent: "CKWA", team: "CKWA", result: "L-DEC 0-5", points: -3, type: "loss" },
      { match: 8, opponent: "Team Shutt", team: "Team Shutt", result: "L-MD 0-13", points: -4, type: "loss" },
    ],
  },
  {
    firstName: "BENTLEY",
    lastName: "SLY",
    weight: 145,
    record: "7-1",
    points: 29,
    matches: [
      {
        match: 1,
        opponent: "Team Gotcha Illinois",
        team: "Team Gotcha Illinois",
        result: "W-TF 18-0",
        points: 5,
        type: "tech_fall",
      },
      { match: 2, opponent: "Apache Blue", team: "Apache Blue", result: "W-FOR", points: 6, type: "forfeit" },
      {
        match: 3,
        opponent: "Knights Wrestling",
        team: "Knights Wrestling",
        result: "W-FOR",
        points: 6,
        type: "forfeit",
      },
      {
        match: 4,
        opponent: "Alien Spaceship",
        team: "Alien Spaceship",
        result: "W-TF 16-1",
        points: 5,
        type: "tech_fall",
      },
      {
        match: 5,
        opponent: "Ragin Raisins",
        team: "Ragin Raisins",
        result: "W-MD 11-2",
        points: 4,
        type: "major_decision",
      },
      {
        match: 6,
        opponent: "Superior Elite",
        team: "Superior Elite",
        result: "W-DEC 9-2",
        points: 3,
        type: "decision",
      },
      { match: 7, opponent: "CKWA", team: "CKWA", result: "W-DEC 2-0", points: 3, type: "decision" },
      { match: 8, opponent: "Team Shutt", team: "Team Shutt", result: "L-DEC 0-4", points: -3, type: "loss" },
    ],
  },
  {
    firstName: "LORENZO",
    lastName: "ALSTON",
    weight: 152,
    record: "8-0",
    points: 41,
    matches: [
      {
        match: 1,
        opponent: "Team Gotcha Illinois",
        team: "Team Gotcha Illinois",
        result: "W-PIN 19-3",
        points: 6,
        type: "pin",
      },
      { match: 2, opponent: "Apache Blue", team: "Apache Blue", result: "W-TF 19-3", points: 5, type: "tech_fall" },
      {
        match: 3,
        opponent: "Knights Wrestling",
        team: "Knights Wrestling",
        result: "W-FOR",
        points: 6,
        type: "forfeit",
      },
      { match: 4, opponent: "Alien Spaceship", team: "Alien Spaceship", result: "W-PIN 9-2", points: 6, type: "pin" },
      { match: 5, opponent: "Ragin Raisins", team: "Ragin Raisins", result: "W-TF 21-6", points: 5, type: "tech_fall" },
      { match: 6, opponent: "Superior Elite", team: "Superior Elite", result: "W-FOR", points: 6, type: "forfeit" },
      { match: 7, opponent: "CKWA", team: "CKWA", result: "W-DEC 4-0", points: 3, type: "decision" },
      { match: 8, opponent: "Team Shutt", team: "Team Shutt", result: "W-MD 9-1", points: 4, type: "major_decision" },
    ],
  },
  {
    firstName: "NATHAN",
    lastName: "MCCARTNEY",
    weight: 160,
    record: "7-1",
    points: 29,
    matches: [
      {
        match: 1,
        opponent: "Team Gotcha Illinois",
        team: "Team Gotcha Illinois",
        result: "W-TF 19-3",
        points: 5,
        type: "tech_fall",
      },
      { match: 2, opponent: "Apache Blue", team: "Apache Blue", result: "W-TF 25-8", points: 5, type: "tech_fall" },
      {
        match: 3,
        opponent: "Knights Wrestling",
        team: "Knights Wrestling",
        result: "W-TF 20-3",
        points: 5,
        type: "tech_fall",
      },
      {
        match: 4,
        opponent: "Alien Spaceship",
        team: "Alien Spaceship",
        result: "W-DEC 8-5",
        points: 3,
        type: "decision",
      },
      { match: 5, opponent: "Ragin Raisins", team: "Ragin Raisins", result: "W-PIN 13-2", points: 6, type: "pin" },
      {
        match: 6,
        opponent: "Superior Elite",
        team: "Superior Elite",
        result: "W-TF 19-4",
        points: 5,
        type: "tech_fall",
      },
      { match: 7, opponent: "CKWA", team: "CKWA", result: "W-DEC 4-2", points: 3, type: "decision" },
      { match: 8, opponent: "Team Shutt", team: "Team Shutt", result: "L-DEC 0-5", points: -3, type: "loss" },
    ],
  },
  {
    firstName: "DOMINIC",
    lastName: "BLUE",
    weight: 170,
    record: "8-0",
    points: 41,
    matches: [
      {
        match: 1,
        opponent: "Team Gotcha Illinois",
        team: "Team Gotcha Illinois",
        result: "W-MD 10-2",
        points: 4,
        type: "major_decision",
      },
      { match: 2, opponent: "Apache Blue", team: "Apache Blue", result: "W-FOR", points: 6, type: "forfeit" },
      {
        match: 3,
        opponent: "Knights Wrestling",
        team: "Knights Wrestling",
        result: "W-TF 22-4",
        points: 5,
        type: "tech_fall",
      },
      { match: 4, opponent: "Alien Spaceship", team: "Alien Spaceship", result: "W-FOR", points: 6, type: "forfeit" },
      { match: 5, opponent: "Ragin Raisins", team: "Ragin Raisins", result: "W-FOR", points: 6, type: "forfeit" },
      {
        match: 6,
        opponent: "Superior Elite",
        team: "Superior Elite",
        result: "W-TF 16-0",
        points: 5,
        type: "tech_fall",
      },
      { match: 7, opponent: "CKWA", team: "CKWA", result: "W-DEC 4-0", points: 3, type: "decision" },
      { match: 8, opponent: "Team Shutt", team: "Team Shutt", result: "W-FOR", points: 6, type: "forfeit" },
    ],
  },
  {
    firstName: "SAM",
    lastName: "HARPER",
    weight: 182,
    record: "5-3",
    points: 17,
    matches: [
      {
        match: 1,
        opponent: "Team Gotcha Illinois",
        team: "Team Gotcha Illinois",
        result: "W-PIN 3-0",
        points: 6,
        type: "pin",
      },
      { match: 2, opponent: "Apache Blue", team: "Apache Blue", result: "W-PIN 1-3", points: 6, type: "pin" },
      {
        match: 3,
        opponent: "Knights Wrestling",
        team: "Knights Wrestling",
        result: "W-FOR",
        points: 6,
        type: "forfeit",
      },
      { match: 4, opponent: "Alien Spaceship", team: "Alien Spaceship", result: "W-PIN 11-0", points: 6, type: "pin" },
      { match: 5, opponent: "Ragin Raisins", team: "Ragin Raisins", result: "L-MD 0-12", points: -4, type: "loss" },
      { match: 6, opponent: "Superior Elite", team: "Superior Elite", result: "L-DEC 0-2", points: -3, type: "loss" },
      { match: 7, opponent: "CKWA", team: "CKWA", result: "W-DEC 14-15", points: 3, type: "decision" },
      { match: 8, opponent: "Team Shutt", team: "Team Shutt", result: "L-DEC 0-4", points: -3, type: "loss" },
    ],
  },
  {
    firstName: "BROCK",
    lastName: "SULLIVAN",
    weight: 195,
    record: "7-1",
    points: 35,
    matches: [
      {
        match: 1,
        opponent: "Team Gotcha Illinois",
        team: "Team Gotcha Illinois",
        result: "W-FOR",
        points: 6,
        type: "forfeit",
      },
      { match: 2, opponent: "Apache Blue", team: "Apache Blue", result: "W-FOR", points: 6, type: "forfeit" },
      {
        match: 3,
        opponent: "Knights Wrestling",
        team: "Knights Wrestling",
        result: "W-TF 18-3",
        points: 5,
        type: "tech_fall",
      },
      { match: 4, opponent: "Alien Spaceship", team: "Alien Spaceship", result: "W-FOR", points: 6, type: "forfeit" },
      { match: 5, opponent: "Ragin Raisins", team: "Ragin Raisins", result: "W-FOR", points: 6, type: "forfeit" },
      {
        match: 6,
        opponent: "Superior Elite",
        team: "Superior Elite",
        result: "W-DEC 4-1",
        points: 3,
        type: "decision",
      },
      { match: 7, opponent: "CKWA", team: "CKWA", result: "W-PIN 15-2", points: 6, type: "pin" },
      { match: 8, opponent: "Team Shutt", team: "Team Shutt", result: "L-DEC 0-9", points: -3, type: "loss" },
    ],
  },
  {
    firstName: "XAVIER",
    lastName: "WILSON",
    weight: 220,
    record: "6-2",
    points: 23,
    matches: [
      {
        match: 1,
        opponent: "Team Gotcha Illinois",
        team: "Team Gotcha Illinois",
        result: "W-TF 16-1",
        points: 5,
        type: "tech_fall",
      },
      { match: 2, opponent: "Apache Blue", team: "Apache Blue", result: "W-FOR", points: 6, type: "forfeit" },
      {
        match: 3,
        opponent: "Knights Wrestling",
        team: "Knights Wrestling",
        result: "W-DEC 15-8",
        points: 3,
        type: "decision",
      },
      { match: 4, opponent: "Alien Spaceship", team: "Alien Spaceship", result: "W-FOR", points: 6, type: "forfeit" },
      { match: 5, opponent: "Ragin Raisins", team: "Ragin Raisins", result: "W-PIN 3-0", points: 6, type: "pin" },
      {
        match: 6,
        opponent: "Superior Elite",
        team: "Superior Elite",
        result: "W-DEC 3-1",
        points: 3,
        type: "decision",
      },
      { match: 7, opponent: "CKWA", team: "CKWA", result: "L-DEC 0-2", points: -3, type: "loss" },
      { match: 8, opponent: "Team Shutt", team: "Team Shutt", result: "L-DEC 0-7", points: -3, type: "loss" },
    ],
  },
  {
    firstName: "EVEREST",
    lastName: "OUELLETTE",
    weight: 285,
    record: "8-0",
    points: 41,
    matches: [
      {
        match: 1,
        opponent: "Team Gotcha Illinois",
        team: "Team Gotcha Illinois",
        result: "W-FOR",
        points: 6,
        type: "forfeit",
      },
      { match: 2, opponent: "Apache Blue", team: "Apache Blue", result: "W-FOR", points: 6, type: "forfeit" },
      {
        match: 3,
        opponent: "Knights Wrestling",
        team: "Knights Wrestling",
        result: "W-FOR",
        points: 6,
        type: "forfeit",
      },
      {
        match: 4,
        opponent: "Alien Spaceship",
        team: "Alien Spaceship",
        result: "W-MD 11-2",
        points: 4,
        type: "major_decision",
      },
      {
        match: 5,
        opponent: "Ragin Raisins",
        team: "Ragin Raisins",
        result: "W-MD 19-5",
        points: 4,
        type: "major_decision",
      },
      { match: 6, opponent: "Superior Elite", team: "Superior Elite", result: "W-FOR 4-1", points: 6, type: "forfeit" },
      { match: 7, opponent: "CKWA", team: "CKWA", result: "W-DEC 1-0", points: 3, type: "decision" },
      { match: 8, opponent: "Team Shutt", team: "Team Shutt", result: "W-FOR", points: 6, type: "forfeit" },
    ],
  },
]

export default function NHSCA2025ResultsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [weightFilter, setWeightFilter] = useState("all")
  const [recordFilter, setRecordFilter] = useState("all")
  const [expandedWrestler, setExpandedWrestler] = useState<string | null>(null)
  const [sortField, setSortField] = useState<string>("weight")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")
  const [activeSection, setActiveSection] = useState<"cards" | "table">("cards")

  const filteredResults = nhscaResults.filter((wrestler) => {
    const fullName = `${wrestler.firstName} ${wrestler.lastName}`.toLowerCase()
    const matchesSearch = fullName.includes(searchTerm.toLowerCase())
    const matchesWeight = weightFilter === "all" || wrestler.weight.toString() === weightFilter
    const matchesRecord = recordFilter === "all" || wrestler.record.includes(recordFilter)

    return matchesSearch && matchesWeight && matchesRecord
  })

  // Sorting logic
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const getSortedResults = (results: typeof nhscaResults) => {
    return [...results].sort((a, b) => {
      let aValue: any
      let bValue: any

      switch (sortField) {
        case "weight":
          aValue = a.weight
          bValue = b.weight
          break
        case "name":
          aValue = `${a.lastName} ${a.firstName}`
          bValue = `${b.lastName} ${b.firstName}`
          break
        case "record":
          // Parse record like "8-0" to sort by wins first, then losses
          const [aWins, aLosses] = a.record.split("-").map(Number)
          const [bWins, bLosses] = b.record.split("-").map(Number)
          if (aWins !== bWins) {
            aValue = aWins
            bValue = bWins
          } else {
            aValue = -aLosses // Negative so fewer losses come first
            bValue = -bLosses
          }
          break
        case "points":
          aValue = a.points
          bValue = b.points
          break
        default:
          return 0
      }

      if (typeof aValue === "string") {
        return sortDirection === "asc" ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue)
      } else {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      }
    })
  }

  const getSortIcon = (field: string) => {
    if (sortField !== field) {
      return <ArrowUpDown className="h-4 w-4 text-gray-400" />
    }
    return sortDirection === "asc" ? (
      <ArrowUp className="h-4 w-4 text-blue-600" />
    ) : (
      <ArrowDown className="h-4 w-4 text-blue-600" />
    )
  }

  // Sort by the selected field and direction
  const sortedResults = getSortedResults(filteredResults)

  const getMatchResultColor = (type: string) => {
    switch (type) {
      case "pin":
        return "bg-emerald-500/10 text-emerald-700 border-emerald-200"
      case "tech_fall":
        return "bg-blue-500/10 text-blue-700 border-blue-200"
      case "major_decision":
        return "bg-purple-500/10 text-purple-700 border-purple-200"
      case "decision":
        return "bg-amber-500/10 text-amber-700 border-amber-200"
      case "forfeit":
        return "bg-indigo-500/10 text-indigo-700 border-indigo-200"
      case "loss":
        return "bg-red-500/10 text-red-700 border-red-200"
      default:
        return "bg-gray-500/10 text-gray-700 border-gray-200"
    }
  }

  const getMatchTypeIcon = (type: string) => {
    switch (type) {
      case "pin":
        return <Trophy className="h-4 w-4 text-emerald-600" />
      case "tech_fall":
        return <Zap className="h-4 w-4 text-blue-600" />
      case "major_decision":
        return <Target className="h-4 w-4 text-purple-600" />
      case "decision":
        return <Medal className="h-4 w-4 text-amber-600" />
      case "forfeit":
        return <Trophy className="h-4 w-4 text-indigo-600" />
      case "loss":
        return <div className="h-4 w-4 rounded-full bg-red-500/20 border border-red-300"></div>
      default:
        return <div className="h-4 w-4 rounded-full bg-gray-500/20 border border-gray-300"></div>
    }
  }

  const getRecordColor = (record: string) => {
    if (record === "8-0") return "bg-gradient-to-r from-emerald-500 to-green-600"
    if (record.includes("7-1")) return "bg-gradient-to-r from-blue-500 to-blue-600"
    if (record.includes("6-2")) return "bg-gradient-to-r from-amber-500 to-orange-500"
    return "bg-gradient-to-r from-gray-500 to-gray-600"
  }

  const toggleWrestlerExpansion = (wrestlerName: string) => {
    setExpandedWrestler(expandedWrestler === wrestlerName ? null : wrestlerName)
  }

  // Calculate team stats
  const teamStats = {
    totalWrestlers: nhscaResults.length,
    totalMatches: nhscaResults.reduce((acc, wrestler) => acc + wrestler.matches.length, 0),
    totalWins: nhscaResults.reduce((acc, wrestler) => acc + wrestler.matches.filter((m) => m.points > 0).length, 0),
    totalLosses: nhscaResults.reduce((acc, wrestler) => acc + wrestler.matches.filter((m) => m.points < 0).length, 0),
    teamRecord: "7-1",
    undefeatedCount: nhscaResults.filter((w) => w.record === "8-0").length,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Modern Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full px-4 py-2 mb-6">
              <Trophy className="h-4 w-4 text-red-400" />
              <span className="text-red-200 text-sm font-medium">NHSCA National Duals Championship</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent tracking-tight">
              NHSCA 2025
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Historic achievement: First All-North Carolina team to reach Round of 16 at NHSCA Duals
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <span className="text-blue-200">Virginia Beach, VA</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <span className="text-blue-200">March 28-30, 2025</span>
              </div>
              <div className="bg-emerald-500/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-emerald-400/30">
                <span className="text-emerald-200 font-semibold">7-1 Team Record</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Stats Section */}
      <section className="py-16 bg-white/80 backdrop-blur-sm border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-slate-800 mb-2">{teamStats.totalWrestlers}</div>
                <div className="text-slate-600 font-medium">Wrestlers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-emerald-600 mb-2">{teamStats.totalWins}</div>
                <div className="text-slate-600 font-medium">Total Wins</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-blue-600 mb-2">{teamStats.undefeatedCount}</div>
                <div className="text-slate-600 font-medium">Undefeated</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-purple-600 mb-2">{teamStats.teamRecord}</div>
                <div className="text-slate-600 font-medium">Team Record</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elite Victories Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content Side */}
              <div className="text-white space-y-8">
                <div>
                  <Badge className="mb-4 bg-red-600/20 border-red-500/30 text-red-300 px-4 py-2">
                    Elite Competition
                  </Badge>
                  <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                    Elite Victories
                  </h2>
                  <p className="text-xl text-blue-100 leading-relaxed">
                    Wins over nationally-ranked wrestlers, state champions, placers, and elite athletes.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Trophy className="h-6 w-6 text-emerald-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Tye Johnson</h3>
                        <p className="text-blue-200 mb-1">Victory over Nationally ranked D1 commit</p>
                        <p className="text-emerald-300 font-semibold">Braiden Weaver</p>
                        <Badge className="mt-2 bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
                          Electric
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Medal className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Mac Johnson</h3>
                        <p className="text-blue-200 mb-1">Victory over NHSCA Finalist</p>
                        <p className="text-blue-300 font-semibold">Eli Gabrielson</p>
                        <Badge className="mt-2 bg-blue-500/20 text-blue-300 border-blue-400/30">Clutch</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Zap className="h-6 w-6 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">Everest Ouellette</h3>
                        <p className="text-blue-200 mb-1">Pin over NHSCA Champion</p>
                        <p className="text-purple-300 font-semibold">Alex Bajoras</p>
                        <Badge className="mt-2 bg-purple-500/20 text-purple-300 border-purple-400/30">
                          Unforgettable
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="/images/nhsca-team-celebration-elite-wins.png"
                    alt="NC United team celebrating elite victories at NHSCA 2025"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Championship Moments</h3>
                    <p className="text-blue-200">
                      NC United wrestlers celebrating historic victories over elite competition
                    </p>
                  </div>
                </div>

                {/* Floating Stats */}
                <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/20">
                  <div className="text-center">
                    <div className="text-2xl font-black text-emerald-600">3</div>
                    <div className="text-xs font-semibold text-slate-600">Elite Wins</div>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-white/20">
                  <div className="text-center">
                    <div className="text-2xl font-black text-blue-600">100%</div>
                    <div className="text-xs font-semibold text-slate-600">Clutch Factor</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Gallery Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-600/20 border-blue-500/30 text-blue-700 px-4 py-2">Team Gallery</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">NC United Warriors</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                NC United wrestlers in action at NHSCA Duals 2025 - showcasing the excellence of our athletes
              </p>
            </div>

            {/* Team Photo */}
            <div className="mb-16">
              <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
                <div className="relative">
                  <img
                    src="/images/nhsca-team-photo-2025.jpg"
                    alt="NC United team at NHSCA Duals 2025"
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl">
                      <h3 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">
                        NC United - NHSCA Duals 2025
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-slate-600">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="font-semibold">Virginia Beach, VA</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-emerald-600" />
                          <span className="font-semibold text-emerald-600">7-1 Record</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Medal className="h-4 w-4 text-blue-600" />
                          <span className="font-semibold">Round of 16</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Results Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container relative mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-red-600/20 border-red-500/30 text-red-300 px-4 py-2">
                Tournament Performance
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Tournament Bracket & Final Standings</h2>
              <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                Complete breakdown of NC United's historic NHSCA Duals performance
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Tournament Results */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                    <Trophy className="h-4 w-4 text-white" />
                  </div>
                  Tournament Results
                </h3>
                <div className="space-y-4">
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white text-lg">vs Team Gotcha Illinois</span>
                        <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 text-lg font-black shadow-lg">
                          W 75-0
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white text-lg">vs Apache Blue</span>
                        <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 text-lg font-black shadow-lg">
                          W 79-0
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white text-lg">vs Knights Wrestling Club-Black</span>
                        <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 text-lg font-black shadow-lg">
                          W 68-3
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white text-lg">vs Alien Spaceship</span>
                        <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 text-lg font-black shadow-lg">
                          W 67-0
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Additional Matches */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <Target className="h-4 w-4 text-white" />
                  </div>
                  Additional Matches
                </h3>
                <div className="space-y-4">
                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white text-lg">vs Ragin Raisins Catawba HS</span>
                        <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 text-lg font-black shadow-lg">
                          W 57-13
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white text-lg">vs Superior Elite</span>
                        <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 text-lg font-black shadow-lg">
                          W 46-12
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white text-lg">vs CKWA</span>
                        <Badge className="bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 text-lg font-black shadow-lg">
                          W 41-12
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-white text-lg">vs Team Shutt</span>
                        <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-3 text-lg font-black shadow-lg">
                          L 19-34
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Tournament Summary */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
                  <Medal className="h-4 w-4 text-white" />
                </div>
                Tournament Summary
              </h3>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="bg-white/10 backdrop-blur-sm border border-emerald-400/30 hover:bg-white/15 transition-all duration-300 shadow-xl">
                  <CardContent className="text-center p-6">
                    <div className="text-4xl font-black text-emerald-400 mb-2">3</div>
                    <div className="font-semibold text-white mb-1">Undefeated Wrestlers</div>
                    <div className="text-sm text-blue-200">Alston, Blue, Ouellette</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border border-blue-400/30 hover:bg-white/15 transition-all duration-300 shadow-xl">
                  <CardContent className="text-center p-6">
                    <div className="text-4xl font-black text-blue-400 mb-2">4</div>
                    <div className="font-semibold text-white mb-1">7-1 Records</div>
                    <div className="text-sm text-blue-200">Sullivan, Sly, McCartney, T. Johnson</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border border-purple-400/30 hover:bg-white/15 transition-all duration-300 shadow-xl">
                  <CardContent className="text-center p-6">
                    <div className="text-4xl font-black text-purple-400 mb-2">81%</div>
                    <div className="font-semibold text-white mb-1">Team Win Rate</div>
                    <div className="text-sm text-blue-200">91 wins, 21 losses</div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-sm border border-amber-400/30 hover:bg-white/15 transition-all duration-300 shadow-xl">
                  <CardContent className="text-center p-6">
                    <div className="text-4xl font-black text-amber-400 mb-2">377</div>
                    <div className="font-semibold text-white mb-1">Total Team Points</div>
                    <div className="text-sm text-blue-200">Across all wrestlers</div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Staff Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">Championship Coaching</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                The leadership behind NC United's historic NHSCA performance
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Coach Macchiavello */}
              <Card className="overflow-hidden bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="relative">
                  <img
                    src="/images/coach-macchiavello-coaching.png"
                    alt="Coach Macchiavello coaching at NHSCA"
                    className="w-full h-72 object-cover object-[center_35%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">Coach Macchiavello</h3>
                    <p className="text-blue-200">Assistant Coach</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-slate-600">
                      Instrumental in developing the technical skills and mental toughness that led to multiple elite
                      victories over nationally-ranked opponents.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Coach Colton */}
              <Card className="overflow-hidden bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <div className="relative">
                  <img
                    src="/images/coach-palmer-tournament.png"
                    alt="Coach Colton at tournament"
                    className="w-full h-72 object-cover object-[center_25%]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">Coach Colton</h3>
                    <p className="text-blue-200">Head Coach</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <p className="text-slate-600">
                      Led NC United to their historic first Round of 16 appearance at NHSCA Duals, establishing the
                      program as a national contender.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Section Toggle */}
      <section className="py-8 bg-white/50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-center">
              <div className="bg-white rounded-lg p-1 shadow-lg border border-slate-200">
                <Button
                  variant={activeSection === "cards" ? "default" : "ghost"}
                  onClick={() => setActiveSection("cards")}
                  className="px-6 py-2"
                >
                  Cards
                </Button>
                <Button
                  variant={activeSection === "table" ? "default" : "ghost"}
                  onClick={() => setActiveSection("table")}
                  className="px-6 py-2"
                >
                  Individual Results
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conditional Content */}
      {activeSection === "cards" ? (
        <WrestlerCardsSection wrestlers={nhscaResults} />
      ) : (
        /* Individual Results Section (existing table) */
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              {/* Filters and Search */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Input
                  type="text"
                  placeholder="Search wrestler..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 min-w-[200px]"
                />

                <Select value={weightFilter} onValueChange={setWeightFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter Weight" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Weights</SelectItem>
                    {[...new Set(nhscaResults.map((w) => w.weight))]
                      .sort((a, b) => a - b)
                      .map((weight) => (
                        <SelectItem key={weight} value={weight.toString()}>
                          {weight}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>

                <Select value={recordFilter} onValueChange={setRecordFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter Record" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Records</SelectItem>
                    {[...new Set(nhscaResults.map((w) => w.record))].map((record) => (
                      <SelectItem key={record} value={record}>
                        {record}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Results Table */}
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <Button variant="ghost" onClick={() => handleSort("name")} className="gap-2">
                          Name {getSortIcon("name")}
                        </Button>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <Button variant="ghost" onClick={() => handleSort("weight")} className="gap-2">
                          Weight {getSortIcon("weight")}
                        </Button>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <Button variant="ghost" onClick={() => handleSort("record")} className="gap-2">
                          Record {getSortIcon("record")}
                        </Button>
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        <Button variant="ghost" onClick={() => handleSort("points")} className="gap-2">
                          Points {getSortIcon("points")}
                        </Button>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sortedResults.map((wrestler) => (
                      <tr key={wrestler.lastName + wrestler.firstName} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {wrestler.firstName} {wrestler.lastName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{wrestler.weight}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <Badge className={getRecordColor(wrestler.record)}>{wrestler.record}</Badge>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{wrestler.points}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
