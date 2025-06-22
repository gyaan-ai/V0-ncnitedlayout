import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Target, Medal, TrendingUp } from "lucide-react"

export default function UCDResultsViewer() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-[#bc0c03] to-red-600 hover:from-red-600 hover:to-[#bc0c03] text-white border-0 shadow-lg">
            Tournament Performance
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4 font-['Oswald']">Tournament Bracket & Final Standings</h2>
          <p className="text-xl text-blue-100">Complete breakdown of NC United's Ultimate Club Duals performance</p>
        </div>

        {/* Tournament Results */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Tournament Results Column */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Trophy className="h-6 w-6 text-yellow-400" />
                <h3 className="text-2xl font-bold text-white">Tournament Results</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white font-medium">vs Team Triumph</span>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">W 39-22</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white font-medium">vs Meatballs (Pool)</span>
                  <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">L 27-45</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white font-medium">vs Michigan Premier Gold</span>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">W 61-12</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white font-medium">vs Mat Assassins Blue</span>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">W 42-30</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white font-medium">vs Brothers of WOW</span>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">W 49-20</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white font-medium">vs Team Gotcha (Semi)</span>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">W 38-31</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white font-medium">vs Meatballs (Final)</span>
                  <Badge className="bg-gradient-to-r from-red-500 to-red-600 text-white">L 22-48</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Final Stats Column */}
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl hover:bg-white/15 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Target className="h-6 w-6 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Final Stats</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white font-medium">Tournament Finish</span>
                  <Badge className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">2nd</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white font-medium">Pool Finish</span>
                  <Badge className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">Gold Pool</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white font-medium">Dual Meet Record</span>
                  <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white">7-2</Badge>
                </div>
                <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <span className="text-white font-medium">Individual Matches</span>
                  <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">61-44</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tournament Summary */}
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-white mb-8 font-['Oswald']">Tournament Summary</h3>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <Card className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-md border border-green-400/30 shadow-2xl hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Medal className="h-8 w-8 text-green-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-green-400 mb-2">2</div>
              <div className="text-white font-semibold mb-1">Undefeated Wrestlers</div>
              <div className="text-green-200 text-sm">Sullivan, Ouellette</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-md border border-blue-400/30 shadow-2xl hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-blue-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-blue-400 mb-2">7-2</div>
              <div className="text-white font-semibold mb-1">Dual Record</div>
              <div className="text-blue-200 text-sm">Championship Final</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 backdrop-blur-md border border-purple-400/30 shadow-2xl hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 text-purple-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-purple-400 mb-2">78%</div>
              <div className="text-white font-semibold mb-1">Win Rate</div>
              <div className="text-purple-200 text-sm">7 wins, 2 losses</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 backdrop-blur-md border border-orange-400/30 shadow-2xl hover:scale-105 transition-all duration-300">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 text-orange-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-orange-400 mb-2">2nd</div>
              <div className="text-white font-semibold mb-1">Place Finish</div>
              <div className="text-orange-200 text-sm">Championship Final</div>
            </CardContent>
          </Card>
        </div>

        {/* Tournament Path */}
        <div className="mt-12">
          <Card className="bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">Tournament Path to Finals</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-emerald-400 mb-3">Pool Play</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-white">Gold Pool Finish</div>
                    <div className="text-xs text-blue-200">Advanced to Semifinals</div>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-blue-400 mb-3">Semifinals</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-white">Beat Team Gotcha 38-31</div>
                    <div className="text-xs text-blue-200">Advanced to Championship</div>
                  </div>
                </div>
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-orange-400 mb-3">Championship</h4>
                  <div className="space-y-2">
                    <div className="text-sm text-white">Lost to Meatballs 22-48</div>
                    <div className="text-xs text-blue-200">2nd Place Finish</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
