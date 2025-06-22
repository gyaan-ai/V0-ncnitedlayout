"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Medal, Award, Users } from "lucide-react"

// Static wrestler data for NHSCA 2025
const nhscaWrestlers = [
  {
    id: "aiden-white",
    name: "Aiden White",
    weightClass: "106",
    placement: 1,
    wins: 4,
    losses: 0,
    record: "4-0",
    image: "/images/aiden-white-nhsca.png",
  },
  {
    id: "brock-sullivan",
    name: "Brock Sullivan",
    weightClass: "113",
    placement: 2,
    wins: 3,
    losses: 1,
    record: "3-1",
    image: "/images/brock-sullivan-nhsca-2025.png",
  },
  {
    id: "sam-harper",
    name: "Sam Harper",
    weightClass: "120",
    placement: 3,
    wins: 3,
    losses: 1,
    record: "3-1",
    image: "/images/sam-harper-nhsca-2025.png",
  },
  {
    id: "bentley-sly",
    name: "Bentley Sly",
    weightClass: "126",
    placement: 4,
    wins: 2,
    losses: 2,
    record: "2-2",
    image: "/images/bentley-sly-nhsca-2025.png",
  },
  {
    id: "luke-richards",
    name: "Luke Richards",
    weightClass: "132",
    placement: 5,
    wins: 2,
    losses: 2,
    record: "2-2",
    image: "/images/luke-richards-nhsca-2025.png",
  },
  {
    id: "tye-johnson",
    name: "Tye Johnson",
    weightClass: "138",
    placement: 6,
    wins: 1,
    losses: 2,
    record: "1-2",
    image: "/images/tye-johnson-nhsca-2025.png",
  },
  {
    id: "sammy-gantt",
    name: "Sammy Gantt",
    weightClass: "144",
    placement: 7,
    wins: 1,
    losses: 2,
    record: "1-2",
    image: "/images/sammy-gantt-nhsca-2025.png",
  },
  {
    id: "nate-mccartney",
    name: "Nate McCartney",
    weightClass: "150",
    placement: 8,
    wins: 1,
    losses: 2,
    record: "1-2",
    image: "/images/nate-mccartney-nhsca-2025.png",
  },
  {
    id: "everest-ouellette",
    name: "Everest Ouellette",
    weightClass: "157",
    placement: 2,
    wins: 3,
    losses: 1,
    record: "3-1",
    image: "/images/everest-ouellette-nhsca-2025.png",
  },
  {
    id: "mac-johnson",
    name: "Mac Johnson",
    weightClass: "165",
    placement: 3,
    wins: 2,
    losses: 1,
    record: "2-1",
    image: "/images/mac-johnson-nhsca-2025.png",
  },
  {
    id: "jekai-sedgwick",
    name: "Jekai Sedgwick",
    weightClass: "175",
    placement: 4,
    wins: 2,
    losses: 2,
    record: "2-2",
    image: "/images/jekai-sedgwick-nhsca-2025.png",
  },
  {
    id: "lorenzo-alston",
    name: "Lorenzo Alston",
    weightClass: "190",
    placement: 5,
    wins: 1,
    losses: 2,
    record: "1-2",
    image: "/images/lorenzo-alston-nhsca-2025.png",
  },
  {
    id: "dominic-blue",
    name: "Dominic Blue",
    weightClass: "215",
    placement: 6,
    wins: 1,
    losses: 2,
    record: "1-2",
    image: "/images/dominic-blue-nhsca-2025.png",
  },
  {
    id: "xavier-wilson",
    name: "Xavier Wilson",
    weightClass: "285",
    placement: 7,
    wins: 0,
    losses: 2,
    record: "0-2",
    image: "/images/xavier-wilson-nhsca-2025.jpeg",
  },
]

function getPlacementIcon(placement: number) {
  switch (placement) {
    case 1:
      return <Trophy className="h-5 w-5 text-yellow-500" />
    case 2:
      return <Medal className="h-5 w-5 text-gray-400" />
    case 3:
      return <Award className="h-5 w-5 text-amber-600" />
    default:
      return <Users className="h-5 w-5 text-blue-500" />
  }
}

function getPlacementColor(placement: number) {
  switch (placement) {
    case 1:
      return "bg-yellow-100 text-yellow-800 border-yellow-300"
    case 2:
      return "bg-gray-100 text-gray-800 border-gray-300"
    case 3:
      return "bg-amber-100 text-amber-800 border-amber-300"
    default:
      return "bg-blue-100 text-blue-800 border-blue-300"
  }
}

export default function NHSCAResultsClient() {
  const [wrestlers, setWrestlers] = useState(nhscaWrestlers)
  const [loading, setLoading] = useState(false)

  const topPlacers = wrestlers.filter((w) => w.placement <= 3).sort((a, b) => a.placement - b.placement)
  const allWrestlers = wrestlers.sort((a, b) => a.placement - b.placement)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">NHSCA 2025 Results</h1>
        <p className="text-xl text-gray-600">NC United Wrestling Team Performance</p>
      </div>

      <Tabs defaultValue="top-performers" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="top-performers">Top Performers</TabsTrigger>
          <TabsTrigger value="all-results">All Results</TabsTrigger>
        </TabsList>

        <TabsContent value="top-performers" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topPlacers.map((wrestler) => (
              <Card key={wrestler.id} className="overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{wrestler.name}</CardTitle>
                    <div className="flex items-center gap-2">
                      {getPlacementIcon(wrestler.placement)}
                      <Badge className={getPlacementColor(wrestler.placement)}>
                        {wrestler.placement === 1 ? "1st Place" : wrestler.placement === 2 ? "2nd Place" : "3rd Place"}
                      </Badge>
                    </div>
                  </div>
                  <CardDescription>Weight Class: {wrestler.weightClass} lbs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      Record: <span className="font-semibold">{wrestler.record}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      W: {wrestler.wins} | L: {wrestler.losses}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="all-results" className="space-y-4">
          <div className="grid gap-4">
            {allWrestlers.map((wrestler) => (
              <Card key={wrestler.id} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getPlacementIcon(wrestler.placement)}
                        <Badge className={getPlacementColor(wrestler.placement)}>{wrestler.placement}</Badge>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{wrestler.name}</h3>
                        <p className="text-sm text-gray-600">{wrestler.weightClass} lbs</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{wrestler.record}</div>
                      <div className="text-sm text-gray-600">
                        {wrestler.wins}W - {wrestler.losses}L
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
