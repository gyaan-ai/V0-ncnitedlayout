import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Quote, Instagram, Twitter } from "lucide-react"

export default function AboutPage() {
  return (
    <div>
      {/* Hero Banner */}
      <section
        className="relative text-white py-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/wrestling-celebration-tournament.jpg')",
          backgroundPosition: "center center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1b5c]/95 to-[#bc0c03]/85"></div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-oswald">
            NC United <span className="text-yellow-400">National</span> <span className="text-yellow-400">Team</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-8 max-w-4xl mx-auto bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent font-semibold font-oswald">
            One State. One Team. One Dream.
          </p>
          <Button
            size="lg"
            className="bg-[#bc0c03] hover:bg-[#9a0a02] text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl font-oswald"
          >
            Join the Movement
          </Button>
        </div>
      </section>

      {/* Why NC United Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-[#1a1b5c] mb-6 text-center font-oswald">
              Why NC United National Team?
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-[#bc0c03] to-[#1a1b5c] mx-auto mb-8 rounded-full"></div>

            <div className="relative mb-12">
              <div className="absolute opacity-5 inset-0 flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  alt="North Carolina Map Watermark"
                  width={600}
                  height={400}
                  className="object-contain"
                />
              </div>

              <div className="relative z-10 text-lg text-gray-700 space-y-4">
                <p>
                  To ensure our athletes get the exposure and opportunities they deserve, we believe it's essential to
                  unite North Carolina's top talent into a true National Team.
                </p>
                <p>
                  When the best train and compete together, we elevate the entire state. NC United gives elite wrestlers
                  the chance to challenge themselves beyond local goals—beyond state titles. The best path to growth and
                  exposure is by competing against and defeating nationally ranked athletes and powerhouse teams on the
                  biggest stages.
                </p>
                <p>
                  That's why we built NC United: to create a true North Carolina-only national team, unified by a shared
                  commitment. This isn't a super team pulling from multiple states—this is NC UNITED, a team built on
                  one dream, one team, forged through weekly practices, year-round dedication, and a shared vision of
                  national success.
                </p>
                <p>
                  Our goal is simple: to raise the level of wrestling in North Carolina by giving our kids the chance to
                  shine on the biggest platforms. Competing against the best opens doors: college opportunities,
                  national rankings, and lifelong connections.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#1a1b5c] to-[#1a1b5c]/90 text-white p-8 rounded-lg shadow-lg">
              <div className="flex items-start">
                <Quote className="w-12 h-12 text-[#bc0c03] mr-4 flex-shrink-0" />
                <p className="text-xl italic">
                  "To ensure our athletes get the exposure and opportunities they deserve, we believe it's essential to
                  unite North Carolina's top talent into a true National Team."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coaches Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#1a1b5c] mb-6 text-center font-oswald">Elite Coaching Staff</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#bc0c03] to-[#1a1b5c] mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
            Led by North Carolina's wrestling legends and Team USA champions
          </p>

          <div className="grid gap-8 max-w-6xl mx-auto">
            {/* Coach 1 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/3 h-80 md:h-auto">
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt="Michael Macchiavello coaching at wrestling practice"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="bg-gradient-to-r from-[#1a1b5c] to-[#1a1b5c]/90 text-white p-6 w-full md:w-2/3">
                  <h3 className="text-xl font-bold text-center mb-2 font-oswald">Michael Macchiavello</h3>
                  <div className="text-center text-blue-200 text-sm mb-4">
                    2018 NCAA Division I Champion • Team USA • Founder of NC United
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-[#bc0c03] mr-2">●</span>
                      2018 NCAA Division I Champion at 197 lbs
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#bc0c03] mr-2">●</span>
                      Only 2nd North Carolina native to win NCAA Division I title
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#bc0c03] mr-2">●</span>
                      5-year Team USA National Team member
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#bc0c03] mr-2">●</span>
                      NC High School State Champion
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Coach 2 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/3 h-80 md:h-auto">
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt="Colton Palmer coaching at wrestling tournament"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="bg-gradient-to-r from-[#1a1b5c] to-[#1a1b5c]/90 text-white p-6 w-full md:w-2/3">
                  <h3 className="text-xl font-bold text-center mb-2 font-oswald">Colton Palmer</h3>
                  <div className="text-center text-blue-200 text-sm mb-4">
                    NC's All-Time Wins Leader • Founder NC United
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-[#bc0c03] mr-2">●</span>
                      NC State Alumni, NCAA Qualifier 2012
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#bc0c03] mr-2">●</span>
                      All-ACC (3rd place 2012)
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#bc0c03] mr-2">●</span>
                      Super32 All American
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#bc0c03] mr-2">●</span>
                      2x NC State Champion (2005, 2007)
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#bc0c03] mr-2">●</span>
                      North Carolina Most Career Wins 284 (1st All-Time)
                    </li>
                  </ul>
                </div>
              </div>
            </Card>

            {/* Coach 3 */}
            <Card className="overflow-hidden shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 border border-gray-200">
              <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-1/3 h-80 md:h-auto">
                  <Image
                    src="/placeholder.svg?height=400&width=300"
                    alt="Veronica Carlson celebrating victory in Team USA singlet"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="bg-gradient-to-r from-[#1a1b5c] to-[#1a1b5c]/90 text-white p-6 w-full md:w-2/3">
                  <h3 className="text-xl font-bold text-center mb-2 font-oswald">Veronica Carlson</h3>
                  <div className="text-center text-blue-200 text-sm mb-4">
                    5-Year Team USA Member • World Team Champion • Women's Coach
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="text-[#bc0c03] mr-2">●</span>5 years on Team USA (2010-2015)
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#bc0c03] mr-2">●</span>
                      2014-15 Team USA Ranking: No. 2 at 69 KG
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#bc0c03] mr-2">●</span>
                      2014 U.S. World Team Trials Champion
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#bc0c03] mr-2">●</span>
                      2013 U.S. Open Champion and World Team Member
                    </li>
                    <li className="flex items-start">
                      <span className="text-[#bc0c03] mr-2">●</span>
                      Multiple World Championships competitor
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>

          <div className="mt-10 bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto border border-gray-200">
            <p className="text-gray-700 text-center">
              NC United also benefits from a dedicated support system of former Division I competitors and club coaches
              from across the state, all working together to build something bigger than themselves—a true unified
              movement for North Carolina wrestling.
            </p>
          </div>
        </div>
      </section>

      {/* The Impact Section */}
      <section className="py-16 bg-gradient-to-r from-[#1a1b5c] via-[#3949ab] to-[#bc0c03] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold mb-8 text-center font-oswald">The Impact</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-200 mx-auto mb-8 rounded-full"></div>

            <div className="text-center mb-12">
              <p className="text-2xl font-semibold mb-4 font-oswald">
                NC United is already making waves across the country. People are noticing.
              </p>
              <p className="text-xl">This is a movement that's running like a freight train.</p>
            </div>

            <div className="text-center space-y-6">
              <p className="text-lg">
                We're creating real opportunities for North Carolina athletes at the highest levels—college coaches are
                mat-side, watching our kids compete, and NC wrestlers are gaining national exposure that opens doors.
              </p>
              <p className="text-lg">
                At every major event, you'll see NC kids mat-side cheering for each other—whether they're wearing an NC
                United singlet or not.
              </p>
              <p className="text-lg">
                We're raising the bar for what's possible in North Carolina wrestling, building a culture of excellence,
                and showing the nation what happens when we come together as one team, one state, one dream.
              </p>
              <p className="text-2xl font-bold mt-8 font-oswald">This is NC United.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-[#1a1b5c] mb-6 font-oswald">Ready to join the NC United Movement?</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#bc0c03] to-[#1a1b5c] mx-auto mb-8 rounded-full"></div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/get-involved">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#1a1b5c] to-[#1a1b5c]/90 hover:from-[#13144a] hover:to-[#13144a]/90 text-white shadow-md hover:shadow-lg font-oswald"
              >
                Learn More
              </Button>
            </Link>
            <Link href="/donate">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#bc0c03] to-[#bc0c03]/90 hover:from-[#9a0a02] hover:to-[#9a0a02]/90 text-white shadow-md hover:shadow-lg font-oswald"
              >
                Support NC United
              </Button>
            </Link>
            <div className="flex gap-2">
              <a href="https://www.instagram.com/ncwrestlingunited/" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#1a1b5c] text-[#1a1b5c] flex items-center gap-2 hover:bg-[#1a1b5c]/5 font-oswald"
                >
                  <Instagram className="w-5 h-5" />
                  Follow on Instagram
                </Button>
              </a>
              <a href="https://x.com/NCUnited_" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-[#1a1b5c] text-[#1a1b5c] flex items-center gap-2 hover:bg-[#1a1b5c]/5 font-oswald"
                >
                  <Twitter className="w-5 h-5" />
                  Follow on Twitter
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
