"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Trophy, Zap, Target, Medal } from "lucide-react"

interface Match {
  match: number
  opponent: string
  team: string
  result: string
  points: number
  type: string
}

interface WrestlerCardProps {
  firstName: string
  lastName: string
  weight: number
  record: string
  points: number
  matches: Match[]
  imagePath: string
}

export function WrestlerCardFlip({
  firstName,
  lastName,
  weight,
  record,
  points,
  matches,
  imagePath,
}: WrestlerCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const toggleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  const getRecordColor = (record: string) => {
    if (record === "8-0") return "bg-gradient-to-r from-emerald-500 to-green-600"
    if (record.includes("7-1")) return "bg-gradient-to-r from-blue-500 to-blue-600"
    if (record.includes("6-2")) return "bg-gradient-to-r from-amber-500 to-orange-500"
    return "bg-gradient-to-r from-gray-500 to-gray-600"
  }

  const getMatchTypeIcon = (type: string) => {
    switch (type) {
      case "pin":
        return <Trophy className="h-3 w-3 text-emerald-600" />
      case "tech_fall":
        return <Zap className="h-3 w-3 text-blue-600" />
      case "major_decision":
        return <Target className="h-3 w-3 text-purple-600" />
      case "decision":
        return <Medal className="h-3 w-3 text-amber-600" />
      case "forfeit":
        return <Trophy className="h-3 w-3 text-indigo-600" />
      case "loss":
        return <div className="h-3 w-3 rounded-full bg-red-500/20 border border-red-300"></div>
      default:
        return <div className="h-3 w-3 rounded-full bg-gray-500/20 border border-gray-300"></div>
    }
  }

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

  // Calculate win-loss stats
  const wins = matches.filter((match) => match.points > 0).length
  const pins = matches.filter((match) => match.type === "pin" && match.points > 0).length
  const techFalls = matches.filter((match) => match.type === "tech_fall" && match.points > 0).length

  return (
    <div className="relative w-full aspect-[3/4] perspective-1000 cursor-pointer" onClick={toggleFlip}>
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front of Card */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-xl border-2 border-slate-200">
          {/* Image Container */}
          <div className="relative w-full h-full">
            {/* Fallback for images that might not load */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-100 to-blue-50 flex items-center justify-center">
              <div className="text-xl font-bold text-slate-400">
                {firstName} {lastName}
              </div>
            </div>

            {/* Actual Image */}
            <img
              src={imagePath || "/placeholder.svg"}
              alt={`${firstName} ${lastName} wrestling action`}
              className="w-full h-full object-cover z-10 relative"
              onError={(e) => {
                // If image fails to load, show fallback
                e.currentTarget.style.opacity = "0"
              }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-20"></div>

            {/* Card Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 z-30 text-white">
              <h3 className="font-bold text-xl mb-1">
                {firstName} {lastName}
              </h3>
              <div className="flex items-center justify-between">
                <span className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 text-sm">{weight} lbs</span>
                <Badge className={`${getRecordColor(record)} text-white font-semibold`}>{record}</Badge>
              </div>
              <div className="mt-2 text-xs text-blue-200">{points} team points</div>
            </div>

            {/* Flip Indicator */}
            <div className="absolute top-3 right-3 z-30 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-600"
              >
                <path d="M21 2v6h-6"></path>
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                <path d="M3 22v-6h6"></path>
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Back of Card - FIXED SCROLLING */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-xl overflow-hidden shadow-xl border-2 border-slate-200">
          <div className="flex flex-col h-full">
            {/* Header - Fixed at top */}
            <div className="flex-shrink-0 p-3 bg-white border-b border-slate-200">
              <h3 className="font-bold text-sm text-slate-800">
                {firstName} {lastName} <span className="text-xs font-normal text-slate-500">({weight} lbs)</span>
              </h3>
              <div className="flex items-center justify-between mt-1">
                <Badge className={`${getRecordColor(record)} text-white font-semibold text-xs`}>{record}</Badge>
                <span className="text-xs font-medium text-slate-600">{points} team points</span>
              </div>
            </div>

            {/* Stats Summary - Fixed below header */}
            <div className="flex-shrink-0 p-3 border-b border-slate-100">
              <div className="grid grid-cols-3 gap-1">
                <div className="bg-blue-50 rounded p-1 text-center">
                  <div className="text-sm font-bold text-blue-700">{wins}</div>
                  <div className="text-[9px] text-slate-600">Wins</div>
                </div>
                <div className="bg-emerald-50 rounded p-1 text-center">
                  <div className="text-sm font-bold text-emerald-700">{pins}</div>
                  <div className="text-[9px] text-slate-600">Pins</div>
                </div>
                <div className="bg-purple-50 rounded p-1 text-center">
                  <div className="text-sm font-bold text-purple-700">{techFalls}</div>
                  <div className="text-[9px] text-slate-600">Tech Falls</div>
                </div>
              </div>
            </div>

            {/* Match Results - Scrollable area that takes remaining space */}
            <div className="flex-1 overflow-hidden">
              <div className="p-3 pb-1">
                <h4 className="font-semibold text-xs text-slate-700 mb-2">All {matches.length} Match Results:</h4>
              </div>
              <div className="px-3 pb-3 h-full overflow-y-auto">
                <div className="space-y-1 pr-1">
                  {matches.map((match, index) => {
                    const isWin = match.points > 0
                    return (
                      <div
                        key={`${match.match}-${index}`}
                        className={`p-1.5 rounded text-[9px] ${
                          isWin ? "bg-emerald-50 border border-emerald-100" : "bg-red-50 border border-red-100"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-0.5">
                          <div className="flex items-center gap-1">
                            {getMatchTypeIcon(match.type)}
                            <span className="font-medium">Match {match.match}</span>
                          </div>
                          <Badge
                            className={`${isWin ? "bg-emerald-500" : "bg-red-500"} text-white text-[8px] px-1 py-0`}
                          >
                            {isWin ? "W" : "L"}
                          </Badge>
                        </div>
                        <div className="text-[8px] text-slate-600 truncate mb-0.5">{match.team}</div>
                        <div className="flex justify-between items-center">
                          <Badge
                            variant="outline"
                            className={`${getMatchResultColor(match.type)} text-[8px] px-0.5 py-0 h-3 border`}
                          >
                            {match.result}
                          </Badge>
                          <span className={`text-[8px] font-medium ${isWin ? "text-emerald-600" : "text-red-600"}`}>
                            {match.points > 0 ? "+" : ""}
                            {match.points} pts
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>

            {/* Flip Indicator - Fixed at top right */}
            <div className="absolute top-3 right-3 bg-slate-100 rounded-full p-1 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-600"
              >
                <path d="M21 2v6h-6"></path>
                <path d="M3 12a9 9 0 0 1 15-6.7L21 8"></path>
                <path d="M3 22v-6h6"></path>
                <path d="M21 12a9 9 0 0 1-15 6.7L3 16"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
