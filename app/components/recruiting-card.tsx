"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { GraduationCap, MapPin } from "lucide-react"

interface RecruitingCardProps {
  athlete: {
    first_name: string
    last_name: string
    graduation_year: number
    current_school: string
    hometown: string
    height?: string
    weight_class: number
  }
  academics: {
    gpa: number
    sat_score?: number
    act_score?: number
    class_rank?: string
    academic_honors: string[]
  }
  recruiting: {
    status: "uncommitted" | "committed" | "signed"
    committed_school?: string
    scholarship_offers: Array<{
      school: string
      offer_date: string
      scholarship_type: string
    }>
    college_visits: Array<{
      school: string
      date: string
      type: string
    }>
  }
  imagePath: string
}

export function RecruitingCard({ athlete, academics, recruiting, imagePath }: RecruitingCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div
      className="relative w-full aspect-[3/4] perspective-1000 cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}
      >
        {/* Front - Commit Photo/Profile */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-xl border-2 border-slate-200">
          <div className="relative w-full h-full">
            <img
              src={imagePath || "/placeholder.svg"}
              alt={`${athlete.first_name} ${athlete.last_name} recruiting profile`}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

            {/* Recruiting Status */}
            <div className="absolute top-3 left-3 right-3">
              <Badge
                className={`${
                  recruiting.status === "committed"
                    ? "bg-green-600"
                    : recruiting.status === "signed"
                      ? "bg-blue-600"
                      : "bg-orange-600"
                } text-white font-bold`}
              >
                {recruiting.status.toUpperCase()}
              </Badge>

              {recruiting.committed_school && (
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-2 mt-2">
                  <div className="text-sm font-bold text-slate-800">{recruiting.committed_school}</div>
                  <div className="text-xs text-slate-600">Class of {athlete.graduation_year}</div>
                </div>
              )}
            </div>

            {/* Athlete Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <h3 className="font-bold text-xl mb-1">
                {athlete.first_name} {athlete.last_name}
              </h3>

              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 text-sm text-center">
                  {athlete.weight_class} lbs
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded px-2 py-1 text-sm text-center">
                  Class of {athlete.graduation_year}
                </div>
              </div>

              <div className="text-xs space-y-1">
                <div className="flex items-center gap-1">
                  <GraduationCap className="h-3 w-3" />
                  <span>{athlete.current_school}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{athlete.hometown}</span>
                </div>
                <div className="flex justify-between">
                  <span>GPA:</span>
                  <span className="font-bold">{academics.gpa}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back - Academic & Recruiting Details */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white rounded-xl overflow-hidden shadow-xl border-2 border-slate-200">
          <div className="p-3 h-full flex flex-col text-xs">
            {/* Header */}
            <div className="border-b border-slate-200 pb-2 mb-2">
              <h3 className="font-bold text-sm">
                {athlete.first_name} {athlete.last_name}
              </h3>
              <div className="text-xs text-slate-600">
                {athlete.current_school} • Class of {athlete.graduation_year}
              </div>
            </div>

            {/* Academic Stats */}
            <div className="mb-3">
              <h4 className="font-semibold text-xs mb-1 flex items-center gap-1">
                <GraduationCap className="h-3 w-3" />
                ACADEMICS
              </h4>
              <div className="grid grid-cols-3 gap-1 text-[10px]">
                <div className="bg-blue-50 rounded p-1 text-center">
                  <div className="font-bold text-blue-700">{academics.gpa}</div>
                  <div className="text-slate-600">GPA</div>
                </div>
                {academics.sat_score && (
                  <div className="bg-emerald-50 rounded p-1 text-center">
                    <div className="font-bold text-emerald-700">{academics.sat_score}</div>
                    <div className="text-slate-600">SAT</div>
                  </div>
                )}
                {academics.act_score && (
                  <div className="bg-purple-50 rounded p-1 text-center">
                    <div className="font-bold text-purple-700">{academics.act_score}</div>
                    <div className="text-slate-600">ACT</div>
                  </div>
                )}
              </div>
            </div>

            {/* Scholarship Offers */}
            <div className="mb-3">
              <h4 className="font-semibold text-xs mb-1">SCHOLARSHIP OFFERS</h4>
              <div className="space-y-1 max-h-20 overflow-y-auto">
                {recruiting.scholarship_offers.map((offer, index) => (
                  <div key={index} className="bg-slate-50 rounded p-1">
                    <div className="font-medium text-[10px]">{offer.school}</div>
                    <div className="flex justify-between text-[9px] text-slate-600">
                      <span>{offer.scholarship_type}</span>
                      <span>{offer.offer_date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* College Visits */}
            <div className="flex-grow overflow-y-auto">
              <h4 className="font-semibold text-xs mb-1">COLLEGE VISITS</h4>
              <div className="space-y-1">
                {recruiting.college_visits.map((visit, index) => (
                  <div key={index} className="bg-slate-50 rounded p-1">
                    <div className="font-medium text-[10px]">{visit.school}</div>
                    <div className="flex justify-between text-[9px] text-slate-600">
                      <span className="capitalize">{visit.type}</span>
                      <span>{visit.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card Footer */}
            <div className="border-t border-slate-200 pt-1 mt-2 text-center">
              <div className="text-[9px] text-slate-500">
                NC United Wrestling • Recruiting Class {athlete.graduation_year}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
