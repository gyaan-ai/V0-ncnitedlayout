"use client"

import UCDBlogPost from "@/components/ucd-blog-post"
import UCDResultsViewer from "@/components/ucd-results-viewer"
import Image from "next/image"
import { useState } from "react"
import { Card } from "@/components/ui/card"

export default function UCD2024ResultsPage() {
  const [showTournamentDropdown, setShowTournamentDropdown] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Blog Post Section */}
      <UCDBlogPost />

      {/* Team Photos Gallery */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1e3a8a] mb-4">Team Gallery</h2>
            <p className="text-xl text-gray-600">NC United wrestlers in action at UCD 2024</p>
          </div>

          {/* Team Victory Photo */}
          <Card className="mb-12 overflow-hidden shadow-xl">
            <div className="relative h-96">
              <Image
                src="/images/ucd-team-victory-photo.png"
                alt="NC United team victory photo at Ultimate Club Duals 2024"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold mb-2">NC United - Victory Team Photo</h3>
                <p className="text-blue-200">Ultimate Club Duals 2024 • 2nd Place Finish</p>
              </div>
            </div>
          </Card>

          {/* First Row - 90-116 lbs */}
          <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8">
            <Card className="overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src="/images/carson-raper-wrestling.png"
                  alt="Carson Raper wrestling action shot"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Carson Raper</h3>
                  <p className="text-sm text-blue-200">90 lbs • 4-3 Record</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src="/images/eli-taylor-stance.png"
                  alt="Eli Taylor in wrestling stance"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Eli Taylor</h3>
                  <p className="text-sm text-blue-200">95 lbs • 3-4 Record</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src="/images/ucd-victory-celebration.png"
                  alt="Mason Brown emotional victory"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Mason Brown</h3>
                  <p className="text-sm text-blue-200">103 lbs • 5-2 Record</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src="/images/ayven-chitavong-portrait.png"
                  alt="Ayven Chitavong in NC United singlet"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Ayven Chitavong</h3>
                  <p className="text-sm text-blue-200">109 lbs • 3-4 Record</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Second Row - 116-141 lbs */}
          <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8">
            <Card className="overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src="/images/holton-quincy-action.png"
                  alt="Holton Quincy in wrestling action"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Holton Quincy</h3>
                  <p className="text-sm text-blue-200">116 lbs • 4-3 Record</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src="/images/ucd-johnson.png"
                  alt="Mac Johnson in wrestling action at UCD 2024"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Mac Johnson</h3>
                  <p className="text-sm text-blue-200">123 lbs • 3-4 Record</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src="/images/ucd-wrestler-stance.png"
                  alt="Tyler Watt in competition stance"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Tyler Watt</h3>
                  <p className="text-sm text-blue-200">129 lbs • 5-2 Record</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src="/images/ucd-another-victory.png"
                  alt="Liam Hickey victory celebration"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Liam Hickey</h3>
                  <p className="text-sm text-blue-200">135 lbs • 5-2 Record</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Third Row - 141-175 lbs */}
          <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto mb-8">
            <Card className="overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src="/images/bentley-sly-victory.png"
                  alt="Bentley Sly victory celebration after tough match"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Bentley Sly</h3>
                  <p className="text-sm text-blue-200">141 lbs • 6-1 Record</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src="/images/ucd-wrestling-technique.png"
                  alt="Tobin McNair demonstrating technique"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Tobin McNair</h3>
                  <p className="text-sm text-blue-200">148 lbs • 5-2 Record</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src="/images/ucd-wrestling-action.png"
                  alt="Finn McCafferty demonstrating control"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Finn McCafferty</h3>
                  <p className="text-sm text-blue-200">155 lbs • 3-4 Record</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src="/images/ucd-victory.png"
                  alt="Dom Blue victory celebration"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Dom Blue</h3>
                  <p className="text-sm text-blue-200">163 lbs • 4-3 Record</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Fourth Row - 175-285 lbs */}
          <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <Card className="overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src="/images/ucd-match-start.png"
                  alt="Jack Harty in wrestling position"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Jack Harty</h3>
                  <p className="text-sm text-blue-200">175 lbs • 5-2 Record</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src="/images/brock-sullivan-action.png"
                  alt="Brock Sullivan in wrestling action"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Brock Sullivan</h3>
                  <p className="text-sm text-blue-200">195 lbs • 7-0 Record</p>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden group">
              <div className="relative h-64">
                <Image
                  src="/images/ucd-ouellette-victory.png"
                  alt="Everest Ouellette victory celebration - 7-0 record"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Everest Ouellette</h3>
                  <p className="text-sm text-blue-200">285 lbs • 7-0 Record</p>
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

      {/* Detailed Results Viewer */}
      <div id="detailed-results">
        <UCDResultsViewer />
      </div>
    </div>
  )
}
