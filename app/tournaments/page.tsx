import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Trophy, Users } from "lucide-react"

// Static tournament data to avoid database dependency during build
const tournaments = [
  {
    id: "nhsca-2025",
    name: "NHSCA 2025",
    description: "National High School Coaches Association Tournament",
    date: "March 2025",
    location: "Virginia Beach, VA",
    status: "upcoming",
    participants: 15,
  },
  {
    id: "ucd-2024",
    name: "Ultimate Club Duals 2024",
    description: "Premier club wrestling tournament",
    date: "December 2024",
    location: "Virginia Beach, VA",
    status: "completed",
    participants: 18,
  },
]

export default function TournamentsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">NC United Tournaments</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Follow our athletes as they compete in premier wrestling tournaments across the nation.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tournaments.map((tournament) => (
            <Card key={tournament.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl">{tournament.name}</CardTitle>
                  <Badge variant={tournament.status === "completed" ? "default" : "secondary"}>
                    {tournament.status}
                  </Badge>
                </div>
                <CardDescription>{tournament.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <CalendarDays className="w-4 h-4 mr-2" />
                    {tournament.date}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Trophy className="w-4 h-4 mr-2" />
                    {tournament.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    {tournament.participants} NC United Athletes
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href={`/tournaments/${tournament.id}`}
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    View Tournament
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
