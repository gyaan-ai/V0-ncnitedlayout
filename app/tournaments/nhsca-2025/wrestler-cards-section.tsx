"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TournamentWrestlerCard } from "@/app/components/tournament-wrestler-card"

// Updated wrestler image mapping with new NHSCA 2025 photos
const wrestlerImages = {
  "LUKE RICHARDS": "/images/luke-richards-nhsca-2025.png",
  "TYE JOHNSON": "/images/tye-johnson-nhsca-2025.png",
  "SAMMY GANTT": "/images/sammy-gantt-nhsca-2025.png",
  "JEKAI SEDGWICK": "/images/jekai-sedgwick-nhsca-2025.png",
  "MAC JOHNSON": "/images/mac-johnson-nhsca-2025.png",
  "AIDEN WHITE": "/images/aiden-white-nhsca.png",
  "BENTLEY SLY": "/images/bentley-sly-nhsca-2025.png",
  "LORENZO ALSTON": "/images/lorenzo-alston-nhsca-2025.png",
  "NATHAN MCCARTNEY": "/images/nate-mccartney-nhsca-2025.png",
  "DOMINIC BLUE": "/images/dominic-blue-nhsca-2025.png",
  "SAM HARPER": "/images/sam-harper-nhsca-2025.png",
  "BROCK SULLIVAN": "/images/brock-sullivan-nhsca-2025.png",
  "XAVIER WILSON": "/images/xavier-wilson-nhsca-2025.jpeg",
  "EVEREST OUELLETTE": "/images/everest-ouellette-nhsca-2025.png",
}

interface WrestlerCardsSectionProps {
  wrestlers: Array<{
    firstName: string
    lastName: string
    weight: number
    record: string
    points: number
    matches: Array<{
      match: number
      opponent: string
      team: string
      result: string
      points: number
      type: string
    }>
  }>
}

export function WrestlerCardsSection({ wrestlers }: WrestlerCardsSectionProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [weightFilter, setWeightFilter] = useState("all")
  const [gradeFilter, setGradeFilter] = useState("all")

  const filteredWrestlers = wrestlers.filter((wrestler) => {
    const fullName = `${wrestler.firstName} ${wrestler.lastName}`.toLowerCase()
    const matchesSearch = fullName.includes(searchTerm.toLowerCase())
    const matchesWeight = weightFilter === "all" || wrestler.weight.toString() === weightFilter
    return matchesSearch && matchesWeight
  })

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-blue-600/20 border-blue-500/30 text-blue-700 px-4 py-2">Cards</Badge>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">NC United Wrestling Cards</h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Click on any card to flip it and see detailed tournament performance
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-slate-800 mb-4">Filter Cards</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <Input
                placeholder="Search wrestler..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
              />
              <Select value={weightFilter} onValueChange={setWeightFilter}>
                <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
                  <SelectValue placeholder="All Weights" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Weights</SelectItem>
                  {[...new Set(wrestlers.map((w) => w.weight))]
                    .sort((a, b) => a - b)
                    .map((weight) => (
                      <SelectItem key={weight} value={weight.toString()}>
                        {weight} lbs
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
              <Select value={gradeFilter} onValueChange={setGradeFilter}>
                <SelectTrigger className="border-slate-200 focus:border-blue-500 focus:ring-blue-500/20">
                  <SelectValue placeholder="All Grades" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Grades</SelectItem>
                  <SelectItem value="freshman">Freshman</SelectItem>
                  <SelectItem value="sophomore">Sophomore</SelectItem>
                  <SelectItem value="junior">Junior</SelectItem>
                  <SelectItem value="senior">Senior</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchTerm("")
                  setWeightFilter("all")
                  setGradeFilter("all")
                }}
                className="border-slate-200 hover:bg-slate-50"
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWrestlers.map((wrestler) => {
              const fullName = `${wrestler.firstName} ${wrestler.lastName}`.toUpperCase()
              const imagePath =
                wrestlerImages[fullName] ||
                `/placeholder.svg?height=500&width=300&query=${wrestler.firstName}+${wrestler.lastName}+wrestling`

              // Calculate stats from matches
              const pins = wrestler.matches.filter((m) => m.type === "pin" && m.points > 0).length
              const techFalls = wrestler.matches.filter((m) => m.type === "tech_fall" && m.points > 0).length
              const majorDecisions = wrestler.matches.filter((m) => m.type === "major_decision" && m.points > 0).length
              const decisions = wrestler.matches.filter((m) => m.type === "decision" && m.points > 0).length

              return (
                <TournamentWrestlerCard
                  key={fullName}
                  athlete={{
                    first_name: wrestler.firstName,
                    last_name: wrestler.lastName,
                    current_grade: "senior", // Default for now
                    weight_class: wrestler.weight,
                    club_team: "NC United",
                    high_school_team: "Various",
                  }}
                  tournament={{
                    name: "NHSCA National Duals",
                    location: "Virginia Beach, VA",
                    date: "March 28-30, 2025",
                    division: "National",
                  }}
                  performance={{
                    record: wrestler.record,
                    team_points: wrestler.points,
                    matches: wrestler.matches.map((match) => ({
                      match: match.match,
                      round: `Match ${match.match}`,
                      opponent: match.opponent,
                      opponent_team: match.team,
                      result: match.result,
                      team_points: match.points,
                      type: match.type,
                    })),
                    stats: {
                      pins,
                      tech_falls: techFalls,
                      major_decisions: majorDecisions,
                      decisions,
                      avg_team_points: wrestler.points / wrestler.matches.length,
                    },
                  }}
                  imagePath={imagePath}
                />
              )
            })}
          </div>

          {/* No Results */}
          {filteredWrestlers.length === 0 && (
            <div className="text-center py-12 bg-slate-50 rounded-xl border border-slate-100">
              <p className="text-slate-600">No wrestlers match your filters. Try adjusting your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
