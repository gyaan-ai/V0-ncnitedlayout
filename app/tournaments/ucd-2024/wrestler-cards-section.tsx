"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import WrestlerCard from "./wrestler-card"

const ucdResults = [
  {
    firstName: "Carson",
    lastName: "Raper",
    weight: 90,
    record: "3-4",
    points: 1,
    matches: [
      { match: 1, opponent: "Opponent 1", team: "Team 1", result: "W-DEC 5-3", points: 3, type: "decision" },
      { match: 2, opponent: "Opponent 2", team: "Team 2", result: "L-PIN 0-6", points: 0, type: "loss" },
      { match: 3, opponent: "Opponent 3", team: "Team 3", result: "W-PIN 3-0", points: 6, type: "pin" },
      { match: 4, opponent: "Opponent 4", team: "Team 4", result: "L-DEC 2-5", points: 0, type: "loss" },
      { match: 5, opponent: "Opponent 5", team: "Team 5", result: "L-DEC 1-4", points: 0, type: "loss" },
      { match: 6, opponent: "Opponent 6", team: "Team 6", result: "W-MD 8-2", points: 4, type: "major_decision" },
      { match: 7, opponent: "Opponent 7", team: "Team 7", result: "L-DEC 0-3", points: 0, type: "loss" },
    ],
  },
  {
    firstName: "Eli",
    lastName: "Taylor",
    weight: 95,
    record: "2-5",
    points: -18,
    matches: [
      { match: 1, opponent: "John Ross", team: "Triumph Blue", result: "L-PIN", points: 0, type: "loss" },
      { match: 2, opponent: "Kooper Deputy", team: "Meatballs", result: "L-TF 0-17", points: 0, type: "loss" },
      {
        match: 3,
        opponent: "Dakota Harmer",
        team: "Michigan Premier Gold",
        result: "W-TF 18-2",
        points: 5,
        type: "tech_fall",
      },
      { match: 4, opponent: "Gavin Lovell", team: "Mat Assassins Blue", result: "W-PIN 3-0", points: 6, type: "pin" },
      { match: 5, opponent: "Nolan DeShon", team: "Brothers of WOW", result: "L-PIN 0-3", points: 0, type: "loss" },
      { match: 6, opponent: "Carter Smith", team: "Team Gotcha", result: "L-PIN 0-3", points: 0, type: "loss" },
      { match: 7, opponent: "Kooper Deputy", team: "Meatballs", result: "L-PIN 0-6", points: 0, type: "loss" },
    ],
  },
  {
    firstName: "Mason",
    lastName: "Brown",
    weight: 103,
    record: "5-2",
    points: 19,
    matches: [
      { match: 1, opponent: "Opponent 1", team: "Team 1", result: "W-DEC 5-2", points: 3, type: "decision" },
      { match: 2, opponent: "Opponent 2", team: "Team 2", result: "W-PIN 6-0", points: 6, type: "pin" },
      { match: 3, opponent: "Opponent 3", team: "Team 3", result: "W-TF 15-0", points: 5, type: "tech_fall" },
      { match: 4, opponent: "Opponent 4", team: "Team 4", result: "W-DEC 4-2", points: 3, type: "decision" },
      { match: 5, opponent: "Opponent 5", team: "Team 5", result: "L-PIN 0-3", points: 0, type: "loss" },
      { match: 6, opponent: "Opponent 6", team: "Team 6", result: "W-MD 8-0", points: 4, type: "major_decision" },
      { match: 7, opponent: "Opponent 7", team: "Team 7", result: "L-DEC 1-4", points: 0, type: "loss" },
    ],
  },
  {
    firstName: "Ayven",
    lastName: "Chitavong",
    weight: 109,
    record: "2-5",
    points: -18,
    matches: [
      { match: 1, opponent: "Opponent 1", team: "Team 1", result: "L-DEC 3-6", points: 0, type: "loss" },
      { match: 2, opponent: "Opponent 2", team: "Team 2", result: "L-PIN 0-6", points: 0, type: "loss" },
      { match: 3, opponent: "Opponent 3", team: "Team 3", result: "W-TF 15-0", points: 5, type: "tech_fall" },
      { match: 4, opponent: "Opponent 4", team: "Team 4", result: "L-PIN 0-3", points: 0, type: "loss" },
      { match: 5, opponent: "Opponent 5", team: "Team 5", result: "L-DEC 2-5", points: 0, type: "loss" },
      { match: 6, opponent: "Opponent 6", team: "Team 6", result: "W-DEC 7-4", points: 3, type: "decision" },
      { match: 7, opponent: "Opponent 7", team: "Team 7", result: "L-MD 0-8", points: 0, type: "loss" },
    ],
  },
  {
    firstName: "Holton",
    lastName: "Quincy",
    weight: 116,
    record: "3-4",
    points: 0,
    matches: [
      { match: 1, opponent: "Sean Kenny", team: "Triumph Blue", result: "L-DEC 0-9", points: 0, type: "loss" },
      { match: 2, opponent: "Kael Davis", team: "Meatballs", result: "W-PIN 9-3", points: 6, type: "pin" },
      {
        match: 3,
        opponent: "Cole Cichocki",
        team: "Michigan Premier Gold",
        result: "W-DEC 7-3",
        points: 3,
        type: "decision",
      },
      { match: 4, opponent: "Santino Aniska", team: "Mat Assassins Blue", result: "W-PIN 3-0", points: 6, type: "pin" },
      { match: 5, opponent: "Eli Herring", team: "Brothers of WOW", result: "L-DEC 0-8", points: 0, type: "loss" },
      { match: 6, opponent: "Jacob Buffum", team: "Team Gotcha", result: "L-MD 0-8", points: 0, type: "loss" },
      { match: 7, opponent: "Mateo Gallegos", team: "Meatballs", result: "L-TF 0-19", points: 0, type: "loss" },
    ],
  },
  {
    firstName: "Mac",
    lastName: "Johnson",
    weight: 123,
    record: "2-5",
    points: -9,
    matches: [
      { match: 1, opponent: "Joseph DeAngelo", team: "Triumph Blue", result: "L-DEC 0-7", points: 0, type: "loss" },
      { match: 2, opponent: "Tanner Guenot", team: "Meatballs", result: "L-PIN 0-3", points: 0, type: "loss" },
      {
        match: 3,
        opponent: "Joshua Ledford",
        team: "Michigan Premier Gold",
        result: "L-DEC 0-13",
        points: 0,
        type: "loss",
      },
      {
        match: 4,
        opponent: "Jake Schiavone",
        team: "Mat Assassins Blue",
        result: "W-MD 9-1",
        points: 4,
        type: "major_decision",
      },
      { match: 5, opponent: "Justin Jones", team: "Brothers of WOW", result: "L-DEC 0-10", points: 0, type: "loss" },
      { match: 6, opponent: "FOR", team: "Team Gotcha", result: "W-FOR", points: 6, type: "forfeit" },
      { match: 7, opponent: "Tanner Guenot", team: "Meatballs", result: "L-MD 0-13", points: 0, type: "loss" },
    ],
  },
  {
    firstName: "Tyler",
    lastName: "Watt",
    weight: 129,
    record: "5-2",
    points: 15,
    matches: [
      { match: 1, opponent: "Paul Kenny", team: "Triumph Blue", result: "L-MD 0-12", points: 0, type: "loss" },
      { match: 2, opponent: "Jon Whitbred", team: "Meatballs", result: "W-DEC 13-6", points: 3, type: "decision" },
      {
        match: 3,
        opponent: "Vincent Stamm",
        team: "Michigan Premier Gold",
        result: "W-TF 18-3",
        points: 5,
        type: "tech_fall",
      },
      {
        match: 4,
        opponent: "Kyle Scartelli",
        team: "Mat Assassins Blue",
        result: "W-PIN 3-0",
        points: 6,
        type: "pin",
      },
      {
        match: 5,
        opponent: "Owen Marshall",
        team: "Brothers of WOW",
        result: "W-DEC 1-0",
        points: 3,
        type: "decision",
      },
      { match: 6, opponent: "Vincent Augello", team: "Team Gotcha", result: "W-PIN 3-0", points: 6, type: "pin" },
      { match: 7, opponent: "Aiden Kunes", team: "Meatballs", result: "L-MD 0-16", points: 0, type: "loss" },
    ],
  },
  {
    firstName: "Liam",
    lastName: "Hickey",
    weight: 135,
    record: "5-2",
    points: 19,
    matches: [
      { match: 1, opponent: "Steven Perez", team: "Triumph Blue", result: "W-PIN 6-0", points: 6, type: "pin" },
      { match: 2, opponent: "Dominic Deputy", team: "Meatballs", result: "L-MD 0-13", points: 0, type: "loss" },
      {
        match: 3,
        opponent: "Quinten Cassiday",
        team: "Michigan Premier Gold",
        result: "W-PIN 9-1",
        points: 6,
        type: "pin",
      },
      {
        match: 4,
        opponent: "Conner Novakowski",
        team: "Mat Assassins Blue",
        result: "W-TF 16-1",
        points: 5,
        type: "tech_fall",
      },
      {
        match: 5,
        opponent: "Azuan Gonzales-Rice",
        team: "Brothers of WOW",
        result: "W-PIN 12-0",
        points: 6,
        type: "pin",
      },
      { match: 6, opponent: "Gino Schinina", team: "Team Gotcha", result: "W-DEC 9-6", points: 3, type: "decision" },
      { match: 7, opponent: "Dominic Deputy", team: "Meatballs", result: "L-DEC 2-4", points: 0, type: "loss" },
    ],
  },
  {
    firstName: "Bentley",
    lastName: "Sly",
    weight: 141,
    record: "6-1",
    points: 26,
    matches: [
      {
        match: 1,
        opponent: "William Sakoutis",
        team: "Triumph Blue",
        result: "W-DEC 7-2",
        points: 3,
        type: "decision",
      },
      { match: 2, opponent: "Gavin Green", team: "Meatballs", result: "L-DEC 0-6", points: 0, type: "loss" },
      {
        match: 3,
        opponent: "Malachi Kapenga",
        team: "Michigan Premier Gold",
        result: "W-TF 17-0",
        points: 5,
        type: "tech_fall",
      },
      {
        match: 4,
        opponent: "Angelo Hill",
        team: "Mat Assassins Blue",
        result: "W-PIN 7-0",
        points: 6,
        type: "pin",
      },
      {
        match: 5,
        opponent: "Mathius Garza",
        team: "Brothers of WOW",
        result: "W-PIN 10-0",
        points: 6,
        type: "pin",
      },
      { match: 6, opponent: "Makael Aguayo", team: "Team Gotcha", result: "W-TF 16-0", points: 5, type: "tech_fall" },
      { match: 7, opponent: "Gavin Green", team: "Meatballs", result: "W-MD 14-2", points: 4, type: "major_decision" },
    ],
  },
  {
    firstName: "Tobin",
    lastName: "McNair",
    weight: 148,
    record: "5-2",
    points: 22,
    matches: [
      {
        match: 1,
        opponent: "Attila Vigilante",
        team: "Triumph Blue",
        result: "W-MD 13-2",
        points: 4,
        type: "major_decision",
      },
      { match: 2, opponent: "James Whitbred", team: "Meatballs", result: "L-DEC 0-3", points: 0, type: "loss" },
      {
        match: 3,
        opponent: "Gavin Drenten",
        team: "Michigan Premier Gold",
        result: "W-PIN 5-3",
        points: 6,
        type: "pin",
      },
      {
        match: 4,
        opponent: "FOR",
        team: "Mat Assassins Blue",
        result: "W-FOR",
        points: 6,
        type: "forfeit",
      },
      {
        match: 5,
        opponent: "Logan Hiller",
        team: "Brothers of WOW",
        result: "W-PIN 7-0",
        points: 6,
        type: "pin",
      },
      { match: 6, opponent: "Beau McArthur", team: "Team Gotcha", result: "W-PIN 5-0", points: 6, type: "pin" },
      { match: 7, opponent: "James Whitbred", team: "Meatballs", result: "L-DEC 0-4", points: 0, type: "loss" },
    ],
  },
  {
    firstName: "Finnius",
    lastName: "McCafferty",
    weight: 155,
    record: "2-5",
    points: -13,
    matches: [
      {
        match: 1,
        opponent: "Robert Connelley",
        team: "Triumph Blue",
        result: "W-MD 17-7",
        points: 4,
        type: "major_decision",
      },
      { match: 2, opponent: "Cameron Milheim", team: "Meatballs", result: "L-TF 0-17", points: 0, type: "loss" },
      {
        match: 3,
        opponent: "Braylenn Aulbach",
        team: "Michigan Premier Gold",
        result: "L-PIN 1-6",
        points: 0,
        type: "loss",
      },
      {
        match: 4,
        opponent: "Tom Schechterly",
        team: "Mat Assassins Blue",
        result: "L-DEC 0-6",
        points: 0,
        type: "loss",
      },
      {
        match: 5,
        opponent: "Aiden Flowers",
        team: "Brothers of WOW",
        result: "W-TF 19-4",
        points: 5,
        type: "tech_fall",
      },
      { match: 6, opponent: "Steel Meyers", team: "Team Gotcha", result: "L-TF 0-18", points: 0, type: "loss" },
      { match: 7, opponent: "Ezra Swisher", team: "Meatballs", result: "L-DEC 0-10", points: 0, type: "loss" },
    ],
  },
  {
    firstName: "Dominic",
    lastName: "Blue",
    weight: 163,
    record: "5-2",
    points: 12,
    matches: [
      {
        match: 1,
        opponent: "Adam Blumberg",
        team: "Triumph Blue",
        result: "W-DEC 8-5",
        points: 3,
        type: "decision",
      },
      { match: 2, opponent: "Reagan Milheim", team: "Meatballs", result: "L-MD 0-16", points: 0, type: "loss" },
      {
        match: 3,
        opponent: "Cooper Lengkeek",
        team: "Michigan Premier Gold",
        result: "W-PIN 8-0",
        points: 6,
        type: "pin",
      },
      {
        match: 4,
        opponent: "FOR",
        team: "Mat Assassins Blue",
        result: "W-FOR",
        points: 6,
        type: "forfeit",
      },
      {
        match: 5,
        opponent: "Jayden OFarrill",
        team: "Brothers of WOW",
        result: "W-DEC 12-8",
        points: 3,
        type: "decision",
      },
      { match: 6, opponent: "Blake Jones", team: "Team Gotcha", result: "W-DEC 4-3", points: 3, type: "decision" },
      { match: 7, opponent: "Luke Sipes", team: "Meatballs", result: "L-TF 0-18", points: 0, type: "loss" },
    ],
  },
  {
    firstName: "Jack",
    lastName: "Harty",
    weight: 175,
    record: "5-2",
    points: 10,
    matches: [
      {
        match: 1,
        opponent: "Brock Oizerowitz",
        team: "Triumph Blue",
        result: "W-DEC 4-1",
        points: 3,
        type: "decision",
      },
      { match: 2, opponent: "Asher Cunningham", team: "Meatballs", result: "L-PIN 0-10", points: 0, type: "loss" },
      {
        match: 3,
        opponent: "John Beckett",
        team: "Michigan Premier Gold",
        result: "W-MD 10-2",
        points: 4,
        type: "major_decision",
      },
      {
        match: 4,
        opponent: "Robert Booth",
        team: "Mat Assassins Blue",
        result: "W-PIN 3-0",
        points: 6,
        type: "pin",
      },
      {
        match: 5,
        opponent: "Ryan Solomon",
        team: "Brothers of WOW",
        result: "W-TF 19-4",
        points: 5,
        type: "tech_fall",
      },
      { match: 6, opponent: "Jaden Simpson", team: "Team Gotcha", result: "W-DEC 5-4", points: 3, type: "decision" },
      { match: 7, opponent: "Asher Cunningham", team: "Meatballs", result: "L-TF 0-21", points: 0, type: "loss" },
    ],
  },
  {
    firstName: "Brock",
    lastName: "Sullivan",
    weight: 195,
    record: "7-0",
    points: 37,
    matches: [
      {
        match: 1,
        opponent: "Tyler Palumbo",
        team: "Triumph Blue",
        result: "W-DEC 9-2",
        points: 3,
        type: "decision",
      },
      { match: 2, opponent: "Luke Hockenberry", team: "Meatballs", result: "W-PIN 15-4", points: 6, type: "pin" },
      {
        match: 3,
        opponent: "Thomas Prins",
        team: "Michigan Premier Gold",
        result: "W-TF 20-4",
        points: 5,
        type: "tech_fall",
      },
      {
        match: 4,
        opponent: "Mason Marolo",
        team: "Mat Assassins Blue",
        result: "W-TF 21-5",
        points: 5,
        type: "tech_fall",
      },
      {
        match: 5,
        opponent: "Stosh Zalota",
        team: "Brothers of WOW",
        result: "W-PIN 10-6",
        points: 6,
        type: "pin",
      },
      { match: 6, opponent: "FOR", team: "Team Gotcha", result: "W-FOR", points: 6, type: "forfeit" },
      { match: 7, opponent: "Luke Hockenberry", team: "Meatballs", result: "W-PIN 19-5", points: 6, type: "pin" },
    ],
  },
  {
    firstName: "Everest",
    lastName: "Ouellette",
    weight: 285,
    record: "7-0",
    points: 33,
    matches: [
      {
        match: 1,
        opponent: "Riyan Bhutto",
        team: "Triumph Blue",
        result: "W-DEC 8-1",
        points: 3,
        type: "decision",
      },
      { match: 2, opponent: "Noah Johnson", team: "Meatballs", result: "W-PIN 3-0", points: 6, type: "pin" },
      {
        match: 3,
        opponent: "FOR",
        team: "Michigan Premier Gold",
        result: "W-FOR",
        points: 6,
        type: "forfeit",
      },
      {
        match: 4,
        opponent: "FOR",
        team: "Mat Assassins Blue",
        result: "W-FOR",
        points: 6,
        type: "forfeit",
      },
      {
        match: 5,
        opponent: "Connor Williams",
        team: "Brothers of WOW",
        result: "W-DEC 2-1",
        points: 3,
        type: "decision",
      },
      {
        match: 6,
        opponent: "Salvatore Marchese",
        team: "Team Gotcha",
        result: "W-DEC 12-9",
        points: 3,
        type: "decision",
      },
      { match: 7, opponent: "FOR", team: "Meatballs", result: "W-FOR", points: 6, type: "forfeit" },
    ],
  },
]

export function WrestlerCardsSection() {
  const [searchTerm, setSearchTerm] = useState("")
  const [weightFilter, setWeightFilter] = useState("all")
  const [gradeFilter, setGradeFilter] = useState("all")

  const filteredWrestlers = ucdResults.filter((wrestler) => {
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
                  {[...new Set(ucdResults.map((w) => w.weight))]
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

          {/* Cards Grid - Matching NHSCA layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWrestlers.map((wrestler, index) => (
              <WrestlerCard key={index} wrestler={wrestler} />
            ))}
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

export default WrestlerCardsSection
