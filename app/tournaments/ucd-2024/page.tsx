"use client"

import UCDBlogPost from "@/components/ucd-blog-post"
import UCDResultsViewer from "@/components/ucd-results-viewer"
import UCDWrestlerCardsSection from "./wrestler-cards-section"
import Image from "next/image"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

// UCD 2024 wrestler data for table view
const ucdResults = [
  {
    firstName: "Carson",
    lastName: "Raper",
    weight: 90,
    record: "3-4",
    points: 1,
  },
  {
    firstName: "Eli",
    lastName: "Taylor",
    weight: 95,
    record: "2-5",
    points: -18,
  },
  {
    firstName: "Mason",
    lastName: "Brown",
    weight: 103,
    record: "5-2",
    points: 19,
  },
  {
    firstName: "Ayven",
    lastName: "Chitavong",
    weight: 109,
    record: "2-5",
    points: -18,
  },
  {
    firstName: "Holton",
    lastName: "Quincy",
    weight: 116,
    record: "3-4",
    points: 0,
  },
  {
    firstName: "Mac",
    lastName: "Johnson",
    weight: 123,
    record: "2-5",
    points: -9,
  },
  {
    firstName: "Tyler",
    lastName: "Watt",
    weight: 129,
    record: "5-2",
    points: 15,
  },
  {
    firstName: "Liam",
    lastName: "Hickey",
    weight: 135,
    record: "5-2",
    points: 19,
  },
  {
    firstName: "Bentley",
    lastName: "Sly",
    weight: 141,
    record: "6-1",
    points: 26,
  },
  {
    firstName: "Tobin",
    lastName: "McNair",
    weight: 148,
    record: "5-2",
    points: 22,
  },
  {
    firstName: "Finn",
    lastName: "McCafferty",
    weight: 155,
    record: "2-5",
    points: -13,
  },
  {
    firstName: "Dom",
    lastName: "Blue",
    weight: 163,
    record: "5-2",
    points: 12,
  },
  {
    firstName: "Jack",
    lastName: "Harty",
    weight: 175,
    record: "5-2",
    points: 10,
  },
  {
    firstName: "Brock",
    lastName: "Sullivan",
    weight: 195,
    record: "7-0",
    points: 37,
  },
  {
    firstName: "Everest",
    lastName: "Ouellette",
    weight: 285,
    record: "7-0",
    points: 33,
  },
]

export default function UCD2024ResultsPage() {
  const [showTournamentDropdown, setShowTournamentDropdown] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [activeSection, setActiveSection] = useState<"cards" | "table">("cards")
  const [searchTerm, setSearchTerm] = useState("")
  const [weightFilter, setWeightFilter] = useState("all")
  const [recordFilter, setRecordFilter] = useState("all")
  const [sortField, setSortField] = useState<string>("weight")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  const filteredResults = ucdResults.filter((wrestler) => {
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

  const getSortedResults = (results: typeof ucdResults) => {
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
          // Parse record like "7-0" to sort by wins first, then losses
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

  const sortedResults = getSortedResults(filteredResults)

  const getRecordColor = (record: string) => {
    if (record === "7-0") return "bg-gradient-to-r from-emerald-500 to-green-600"
    if (record.includes("6-1")) return "bg-gradient-to-r from-blue-500 to-blue-600"
    if (record.includes("5-2")) return "bg-gradient-to-r from-purple-500 to-purple-600"
    return "bg-gradient-to-r from-gray-500 to-gray-600"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blog Post Section */}
      <UCDBlogPost />

      {/* Team Photos Gallery */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1e3a8a] mb-4 font-['Oswald']">Ultimate Club Duals 2024</h2>
            <p className="text-xl text-gray-600">NC United wrestlers in action at UCD 2024</p>
          </div>

          {/* Team Victory Photo - Updated with clean UCD 2024 team photo */}
          <Card className="mb-12 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
            <div className="relative h-[450px]">
              <Image
                src="/images/ucd-team-clean.png"
                alt="NC United team at Ultimate Club Duals 2024"
                fill
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">NC United Wrestling Team</h3>
                <p className="text-blue-200">Ultimate Club Duals 2024 • 2nd Place Finish</p>
              </div>
            </div>
          </Card>

          {/* Team Photos - Back View and Casual */}
          <div className="grid md:grid-cols-2 gap-6 max-w-7xl mx-auto mb-12">
            <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="relative h-80">
                <Image
                  src="/images/ucd-team-back.png"
                  alt="NC United team back view showing names on singlets"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Team Lineup</h3>
                  <p className="text-blue-200">NC United singlets with wrestler names</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-300">
              <div className="relative h-80">
                <Image
                  src="/images/ucd-team-casual.png"
                  alt="NC United team casual photo after competition"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-bold mb-2">Post-Tournament Celebration</h3>
                  <p className="text-blue-200">Team and coaches after successful competition</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-600 italic mb-4">
              Photos from Ultimate Club Duals 2024 - showcasing the dedication and skill of NC United wrestlers
            </p>
          </div>
        </div>
      </section>

      {/* Tournament Bracket and Final Results - Moved up */}
      <div id="detailed-results">
        <UCDResultsViewer />
      </div>

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

      {/* Conditional Content - Cards moved down */}
      {activeSection === "cards" ? (
        <UCDWrestlerCardsSection />
      ) : (
        /* Individual Results Section (table) */
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
                    {[...new Set(ucdResults.map((w) => w.weight))]
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
                    {[...new Set(ucdResults.map((w) => w.record))].map((record) => (
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
