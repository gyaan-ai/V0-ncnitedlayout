import { Badge } from "@/components/ui/badge"

export default function UCDBlogPost() {
  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Badge className="mb-4 bg-gradient-to-r from-[#bc0c03] to-red-600 hover:from-red-600 hover:to-[#bc0c03] text-white border-0 shadow-lg">
            Tournament Recap
          </Badge>
          <h1 className="text-5xl font-bold mb-6 font-['Oswald']">Ultimate Club Duals 2024</h1>
          <p className="text-xl mb-8 text-blue-100">
            NC United Wrestling finishes 2nd place in elite national competition
          </p>
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-8 text-left shadow-2xl">
            <h2 className="text-2xl font-bold mb-4 text-yellow-400">Tournament Highlights</h2>
            <div className="grid md:grid-cols-2 gap-6 text-blue-100">
              <div>
                <h3 className="font-bold text-white mb-2">Team Performance</h3>
                <ul className="space-y-1">
                  <li>• 2nd Place Overall Finish</li>
                  <li>• 15 wrestlers competed</li>
                  <li>• 75-21 overall team record</li>
                  <li>• Two undefeated champions</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-white mb-2">Standout Performers</h3>
                <ul className="space-y-1">
                  <li>• Brock Sullivan: 7-0 record</li>
                  <li>• Everest Ouellette: 7-0 record</li>
                  <li>• Bentley Sly: 6-1 record</li>
                  <li>• Multiple 5-2 records</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
