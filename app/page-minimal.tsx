import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">NC United Wrestling</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Elite wrestling training and competition in North Carolina
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle>Training Programs</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Professional coaching and training programs for all skill levels.</p>
              <Button>Learn More</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tournaments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Compete in premier wrestling tournaments across the region.</p>
              <Button>View Schedule</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recruiting</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Connect with college coaches and showcase your talent.</p>
              <Button>Get Started</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
