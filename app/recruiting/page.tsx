import { FeaturedCommits } from "./components/featured-commits"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trophy, Users, Target, Star } from "lucide-react"

export default function RecruitingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            NC United Wrestling
            <span className="block text-yellow-400">Recruiting</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Connecting elite North Carolina wrestlers with top college programs nationwide
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/recruiting/athletes">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3">
                View All Athletes
              </Button>
            </Link>
            <Link href="/profile-setup">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3"
              >
                Create Athlete Profile
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardHeader>
                <Trophy className="h-12 w-12 text-yellow-600 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-blue-900">50+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">College Commitments</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-blue-900">200+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Active Athletes</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Target className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-blue-900">15+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Division I Programs</p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Star className="h-12 w-12 text-red-600 mx-auto mb-4" />
                <CardTitle className="text-3xl font-bold text-blue-900">25+</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">All-Americans</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Commitments */}
      <FeaturedCommits />

      {/* Call to Action */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Take Your Wrestling to the Next Level?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join NC United Wrestling and get connected with college coaches looking for talent like yours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/profile-setup">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3">
                Start Your Profile
              </Button>
            </Link>
            <Link href="/our-team">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-3"
              >
                Meet Our Coaches
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
