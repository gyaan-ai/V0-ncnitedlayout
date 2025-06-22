"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Zap, Medal, RotateCcw } from "lucide-react"

interface TournamentWrestlerCardProps {
  athlete: {
    first_name: string
    last_name: string
    current_grade: string
    weight_class: number
    club_team: string
    high_school_team: string
  }
  tournament: {
    name: string
    location: string
    date: string
    division: string
  }
  performance: {
    seed?: number
    final_placement?: number
    record: string
    team_points: number
    matches: Array<{
      match: number
      round: string
      opponent: string
      opponent_team: string
      result: string
      win_type?: string
      score?: string
      time?: string
      team_points: number
      type: string
    }>
    stats: {
      pins: number
      tech_falls: number
      major_decisions: number
      decisions: number
      avg_team_points: number
    }
  }
  imagePath: string
}

export function TournamentWrestlerCard({ athlete, tournament, performance, imagePath }: TournamentWrestlerCardProps) {
  // Explicitly set to false to ensure front shows first
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="flip-card w-full h-[500px]" style={{ perspective: "1000px" }}>
      <div
        className={`flip-card-inner relative w-full h-full transition-transform duration-700 cursor-pointer ${
          isFlipped ? "flipped" : ""
        }`}
        style={{ transformStyle: "preserve-3d" }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of Card - Full Background Photo with Overlay */}
        <Card
          className="flip-card-front absolute inset-0 w-full h-full bg-white border-0 shadow-xl overflow-hidden rounded-2xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative h-full">
            {/* Full Background Photo */}
            <img
              src={imagePath || "/placeholder.svg"}
              alt={`${athlete.first_name} ${athlete.last_name} wrestling action`}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = `/placeholder.svg?height=500&width=300&query=${athlete.first_name}+${athlete.last_name}+wrestling+action`
              }}
            />

            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Flip Icon - Top Right */}
            <div className="absolute top-4 right-4">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <RotateCcw className="h-4 w-4 text-white" />
              </div>
            </div>

            {/* Weight Class Badge - Top Left - Consistent Styling */}
            <div className="absolute top-4 left-4">
              <div className="bg-slate-600/80 backdrop-blur-sm text-white font-medium text-sm px-3 py-1.5 rounded-lg border border-slate-500/30">
                {athlete.weight_class} lbs
              </div>
            </div>

            {/* Main Content - Bottom */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              {/* Wrestler Name */}
              <h3 className="text-3xl font-black text-white mb-3 tracking-tight">
                {athlete.first_name} {athlete.last_name}
              </h3>

              {/* Record and Team Points - Consistent Pill Styling */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Consistent Record Badge - Same Style as Example */}
                  <div className="bg-slate-600/80 backdrop-blur-sm text-white font-medium text-lg px-4 py-2 rounded-lg border border-slate-500/30">
                    {performance.record}
                  </div>
                </div>
                <div className="text-white text-lg font-semibold">{performance.team_points} team points</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Back of Card - FIXED SCROLLING LAYOUT */}
        <Card
          className="flip-card-back absolute inset-0 w-full h-full bg-white border-0 shadow-xl overflow-hidden rounded-2xl"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="flex flex-col h-full">
            {/* Header - Fixed at top */}
            <div className="flex-shrink-0 p-3 border-b border-slate-200">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-lg font-black text-slate-800">
                  {athlete.first_name} {athlete.last_name}
                </h3>
                <span className="text-sm text-slate-600 font-medium">{athlete.club_team}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-600">
                  {athlete.weight_class} lbs • {athlete.current_grade}
                </span>
              </div>
            </div>

            {/* Tournament Results - Fixed below header */}
            <div className="flex-shrink-0 p-3 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 mb-1 flex items-center gap-1">
                <Trophy className="h-3 w-3 text-slate-600" />
                TOURNAMENT RESULTS
              </h4>
              <div className="grid grid-cols-3 gap-1 text-center">
                <div className="bg-blue-50 rounded p-1">
                  <div className="text-sm font-bold text-blue-600">{performance.record}</div>
                  <div className="text-[10px] text-slate-600">Record</div>
                </div>
                <div className="bg-emerald-50 rounded p-1">
                  <div className="text-sm font-bold text-emerald-600">{performance.team_points}</div>
                  <div className="text-[10px] text-slate-600">Team Pts</div>
                </div>
                <div className="bg-purple-50 rounded p-1">
                  <div className="text-sm font-bold text-purple-600">{performance.final_placement || "N/A"}</div>
                  <div className="text-[10px] text-slate-600">Place</div>
                </div>
              </div>
            </div>

            {/* Win Breakdown - Fixed below results */}
            <div className="flex-shrink-0 p-3 border-b border-slate-100">
              <h4 className="text-xs font-bold text-slate-800 mb-1">WIN BREAKDOWN</h4>
              <div className="grid grid-cols-2 gap-x-2 gap-y-0 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Trophy className="h-2 w-2 text-emerald-600" />
                    <span>Pins</span>
                  </div>
                  <span className="font-bold">{performance.stats.pins}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Zap className="h-2 w-2 text-blue-600" />
                    <span>Tech Falls</span>
                  </div>
                  <span className="font-bold">{performance.stats.tech_falls}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Target className="h-2 w-2 text-purple-600" />
                    <span>Major Dec</span>
                  </div>
                  <span className="font-bold">{performance.stats.major_decisions}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Medal className="h-2 w-2 text-amber-600" />
                    <span>Decisions</span>
                  </div>
                  <span className="font-bold">{performance.stats.decisions}</span>
                </div>
              </div>
            </div>

            {/* Match Results - Scrollable area that takes remaining space */}
            <div className="flex-1 overflow-hidden">
              <div className="p-3 pb-1">
                <h4 className="text-xs font-bold text-slate-800 mb-2 flex items-center gap-1">
                  <Trophy className="h-3 w-3 text-blue-600" />
                  MATCH RESULTS ({performance.matches.length} matches)
                </h4>
              </div>
              <div className="px-3 pb-3 h-full overflow-y-auto">
                <div className="space-y-1.5 pr-1">
                  {performance.matches.map((match, index) => {
                    const isWin = match.team_points > 0
                    return (
                      <div key={index} className="bg-white rounded border border-slate-200 p-1.5">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-xs">Match {match.match}</span>
                          <div className="flex items-center gap-2">
                            <Badge
                              className={`text-xs px-2 py-1 ${isWin ? "bg-emerald-500" : "bg-red-500"} text-white`}
                            >
                              {match.result}
                            </Badge>
                            <span className={`text-sm font-bold ${isWin ? "text-emerald-600" : "text-red-600"}`}>
                              {match.team_points > 0 ? "+" : ""}
                              {match.team_points}
                            </span>
                          </div>
                        </div>
                        {/* Single line for opponent - wrestler name if available, otherwise just team */}
                        <div className="text-xs text-slate-500">
                          {match.opponent && match.opponent.trim() !== ""
                            ? `${match.opponent} (${match.opponent_team})`
                            : match.opponent_team}
                        </div>
                        {match.time && <div className="text-xs text-slate-400 mt-1">{match.time}</div>}
                      </div>
                    )
                  })}
                  {/* Extra padding at bottom to ensure scrolling works properly */}
                  <div className="h-4"></div>
                </div>
              </div>
            </div>

            {/* Minimal Footer - Fixed at bottom */}
            <div className="flex-shrink-0 text-center p-2 border-t border-slate-100">
              <div className="text-[10px] text-slate-500">
                {athlete.club_team} • {tournament.name.split(" ")[0]} • {tournament.date.split(" ")[1]}
              </div>
            </div>
          </div>
        </Card>
      </div>

      <style jsx>{`
        .flip-card-inner {
          transform-style: preserve-3d;
        }
        .flip-card-front,
        .flip-card-back {
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .flip-card-inner.flipped {
          transform: rotateY(180deg);
        }
        .scrollbar-thin {
          scrollbar-width: thin;
        }
        .scrollbar-thumb-slate-300::-webkit-scrollbar-thumb {
          background-color: #cbd5e1;
          border-radius: 4px;
        }
        .scrollbar-track-slate-100::-webkit-scrollbar-track {
          background-color: #f1f5f9;
        }
        ::-webkit-scrollbar {
          width: 6px;
        }
      `}</style>
    </div>
  )
}
