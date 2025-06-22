"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Trophy, Zap, Target, Medal } from "lucide-react"

interface EnhancedWrestlerCardProps {
  wrestler: {
    firstName: string
    lastName: string
    weight: number
    grade: string
    school: string
    hometown?: string
    yearsWrestling?: number
    careerRecord: string
    seasonRecord: string
    careerStats: {
      totalMatches: number
      pins: number
      techFalls: number
      majorDecisions: number
      decisions: number
      winPercentage: number
      fastestPin?: string
      longestMatch?: string
      currentStreak?: number
      tournamentTitles?: number
    }
    seasonStats: {
      matches: number
      wins: number
      losses: number
      teamPoints: number
      tournamentsEntered: number
      tournamentWins: number
    }
    recentMatches: Array<{
      date: string
      tournament: string
      opponent: string
      result: string
      type: string
      score: string
      time?: string
    }>
  }
  imagePath: string
}

export function EnhancedWrestlerCard({ wrestler, imagePath }: EnhancedWrestlerCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="relative w-full aspect-[3/4] perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* Front of Card - Enhanced */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-xl border-2 border-slate-200">
          <div className="relative w-full h-full">
            <img
              src={imagePath || "/placeholder.svg"}
              alt={`${wrestler.firstName} ${wrestler.lastName}`}
              className="w-full h-full object-cover"
            />

            {/* Enhanced overlay with more stats */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-bold text-xl mb-1">
                {wrestler.firstName} {wrestler.lastName}
              </h3>

              <div className="grid grid-cols-2 gap-2 mb-2">
                <span className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 text-sm">{wrestler.weight} lbs</span>
                <span className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 text-sm">{wrestler.grade}</span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <Badge className="bg-blue-600 text-white">Career: {wrestler.careerRecord}</Badge>
                <Badge className="bg-emerald-600 text-white">Season: {wrestler.seasonRecord}</Badge>
              </div>

              <div className="text-xs space-y-1">
                <div className="flex justify-between">
                  <span>Win %:</span>
                  <span>{wrestler.careerStats.winPercentage}%</span>
                </div>
                {wrestler.careerStats.currentStreak && (
                  <div className="flex justify-between">
                    <span>Streak:</span>
                    <span className="text-emerald-300">{wrestler.careerStats.currentStreak}W</span>
                  </div>
                )}
              </div>
            </div>

            {/* Card number */}
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded px-2 py-1 text-xs font-bold text-slate-700">
              #{wrestler.weight}
            </div>
          </div>
        </div>

        {/* Back of Card - Comprehensive Stats */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-xl overflow-hidden shadow-xl border-2 border-slate-200">
          <div className="p-3 h-full flex flex-col text-xs">
            {/* Header */}
            <div className="border-b border-slate-200 pb-2 mb-2">
              <h3 className="font-bold text-sm">
                {wrestler.firstName} {wrestler.lastName}
              </h3>
              <div className="flex justify-between text-xs text-slate-600">
                <span>
                  {wrestler.weight} lbs • {wrestler.grade}
                </span>
                <span>{wrestler.school}</span>
              </div>
            </div>

            {/* Career Overview */}
            <div className="mb-3">
              <h4 className="font-semibold text-xs mb-1">CAREER STATS</h4>
              <div className="grid grid-cols-2 gap-1 text-[10px]">
                <div className="bg-slate-50 rounded p-1">
                  <div className="font-bold text-blue-700">{wrestler.careerRecord}</div>
                  <div className="text-slate-600">Overall</div>
                </div>
                <div className="bg-slate-50 rounded p-1">
                  <div className="font-bold text-emerald-700">{wrestler.careerStats.winPercentage}%</div>
                  <div className="text-slate-600">Win Rate</div>
                </div>
              </div>
            </div>

            {/* Win Types Breakdown */}
            <div className="mb-3">
              <h4 className="font-semibold text-xs mb-1">WIN BREAKDOWN</h4>
              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Trophy className="h-3 w-3 text-emerald-600" />
                    <span>Pins</span>
                  </div>
                  <span className="font-bold">{wrestler.careerStats.pins}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3 text-blue-600" />
                    <span>Tech Falls</span>
                  </div>
                  <span className="font-bold">{wrestler.careerStats.techFalls}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Target className="h-3 w-3 text-purple-600" />
                    <span>Major Dec</span>
                  </div>
                  <span className="font-bold">{wrestler.careerStats.majorDecisions}</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <Medal className="h-3 w-3 text-amber-600" />
                    <span>Decisions</span>
                  </div>
                  <span className="font-bold">{wrestler.careerStats.decisions}</span>
                </div>
              </div>
            </div>

            {/* Season Performance */}
            <div className="mb-3">
              <h4 className="font-semibold text-xs mb-1">2024-25 SEASON</h4>
              <div className="grid grid-cols-3 gap-1 text-[10px]">
                <div className="bg-blue-50 rounded p-1 text-center">
                  <div className="font-bold text-blue-700">{wrestler.seasonStats.teamPoints}</div>
                  <div className="text-slate-600">Team Pts</div>
                </div>
                <div className="bg-emerald-50 rounded p-1 text-center">
                  <div className="font-bold text-emerald-700">{wrestler.seasonStats.tournamentWins}</div>
                  <div className="text-slate-600">Titles</div>
                </div>
                <div className="bg-purple-50 rounded p-1 text-center">
                  <div className="font-bold text-purple-700">{wrestler.seasonStats.tournamentsEntered}</div>
                  <div className="text-slate-600">Events</div>
                </div>
              </div>
            </div>

            {/* Recent Matches */}
            <div className="flex-grow overflow-y-auto">
              <h4 className="font-semibold text-xs mb-1">RECENT MATCHES</h4>
              <div className="space-y-1">
                {wrestler.recentMatches.slice(0, 4).map((match, index) => (
                  <div key={index} className="bg-slate-50 rounded p-1">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-[10px]">{match.tournament}</span>
                      <Badge
                        className={`text-[8px] px-1 py-0 h-3 ${
                          match.result.startsWith("W") ? "bg-emerald-500" : "bg-red-500"
                        } text-white`}
                      >
                        {match.result}
                      </Badge>
                    </div>
                    <div className="text-[9px] text-slate-600 truncate">{match.opponent}</div>
                    <div className="flex justify-between text-[9px] text-slate-500">
                      <span>{match.score}</span>
                      {match.time && <span>{match.time}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Info */}
            <div className="border-t border-slate-200 pt-1 mt-2 text-center">
              <div className="text-[9px] text-slate-500">NC United Wrestling • Card #{wrestler.weight} • 2024-25</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
