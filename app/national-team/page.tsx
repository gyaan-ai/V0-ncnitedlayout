"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CalendarDays,
  Users,
  MapPin,
  Trophy,
  TrendingUp,
  Award,
  Quote,
  Instagram,
  Twitter,
  ArrowRight,
  CheckCircle2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function NCUnitedNationalTeam() {
  const [activeTestimonialFilter, setActiveTestimonialFilter] = useState("all")

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative text-white py-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/nhsca-team-photo-2025.jpg')",
          backgroundPosition: "center 30%",
        }}
      >
        {/* Navy and red overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent tracking-tight font-oswald">
              NC United{" "}
              <span className="text-yellow-400 relative inline-block">
                National Team
                <span className="absolute -bottom-1 left-0 w-full h-1 bg-yellow-400 rounded-full"></span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Elite wrestlers representing North Carolina on the national stage
            </p>

            {/* Quick Navigation */}
            <div className="hidden md:flex justify-center gap-6 mb-10">
              <a href="#mission" className="text-white hover:text-yellow-400 transition-colors font-oswald">
                Mission
              </a>
              <a href="#tournaments" className="text-white hover:text-yellow-400 transition-colors font-oswald">
                Tournaments
              </a>
              <a href="#coaches" className="text-white hover:text-yellow-400 transition-colors font-oswald">
                Coaches
              </a>
              <a href="#testimonials" className="text-white hover:text-yellow-400 transition-colors font-oswald">
                Testimonials
              </a>
              <a href="#upcoming" className="text-white hover:text-yellow-400 transition-colors font-oswald">
                Upcoming Events
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <a href="#mission">
                <Button
                  size="lg"
                  className="bg-[#bc0c03] hover:bg-[#9a0a02] text-white font-bold py-3 px-8 transition-colors duration-200 font-oswald tracking-wide"
                >
                  Learn Our Mission
                </Button>
              </a>
              <a href="#upcoming">
                <Button
                  size="lg"
                  className="bg-white hover:bg-gray-100 text-[#1a1b5c] font-bold py-3 px-8 transition-colors duration-200 font-oswald tracking-wide"
                >
                  Join Our Team
                </Button>
              </a>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <Trophy className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                <h3 className="font-semibold mb-1 font-oswald">National Tournaments</h3>
                <p className="text-blue-100 text-sm">2 Major Events</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <Users className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                <h3 className="font-semibold mb-1 font-oswald">Team Members</h3>
                <p className="text-blue-100 text-sm">35+ Elite Athletes</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <TrendingUp className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                <h3 className="font-semibold mb-1 font-oswald">UCD 2024 Record</h3>
                <p className="text-blue-100 text-sm">5-2 Dual Meets</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <Award className="w-8 h-8 mx-auto mb-3 text-yellow-400" />
                <h3 className="font-semibold mb-1 font-oswald">NHSCA 2025 Record</h3>
                <p className="text-blue-100 text-sm">7-1 Dual Meets</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section id="mission" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-4xl md:text-5xl font-black text-[#1a1b5c] mb-2 font-oswald">Our Mission</h2>
                <div className="w-24 h-1 bg-[#bc0c03] mb-6 rounded-full"></div>
                <p className="text-lg text-gray-700 mb-6">
                  To ensure our athletes get the exposure and opportunities they deserve, we believe it's essential to
                  unite North Carolina's top talent into a true National Team.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  When the best train and compete together, we elevate the entire state. NC United gives elite wrestlers
                  the chance to challenge themselves beyond local goals—beyond state titles. The best path to growth and
                  exposure is by competing against and defeating nationally ranked athletes and powerhouse teams on the
                  biggest stages.
                </p>
                <p className="text-lg text-gray-700 mb-6">
                  That's why we built NC United: to create a true North Carolina-only national team, unified by a shared
                  commitment. This isn't a super team pulling from multiple states—this is NC UNITED, a team built on
                  one dream, one team, forged through weekly practices, year-round dedication, and a shared vision of
                  national success.
                </p>
              </div>
              <div className="relative h-full">
                <div className="bg-gradient-to-r from-[#1a1b5c] to-[#1a1b5c]/90 text-white p-8 rounded-lg shadow-lg h-full">
                  <div className="flex items-start">
                    <Quote className="w-12 h-12 text-[#bc0c03] mr-4 flex-shrink-0" />
                    <div>
                      <p className="text-xl italic">
                        "Our goal is simple: to raise the level of wrestling in North Carolina by giving our kids the
                        chance to shine on the biggest platforms. Competing against the best opens doors: college
                        opportunities, national rankings, and lifelong connections."
                      </p>
                      <p className="mt-4 text-right text-blue-200">- Michael Macchiavello, Founder</p>
                    </div>
                  </div>

                  <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                    <h3 className="text-xl font-bold mb-4 font-oswald">Why NC United?</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Elite national competition exposure</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>College recruitment opportunities</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Training with NC's best wrestlers</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Coached by NCAA champions & Team USA members</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-yellow-400 mr-2 flex-shrink-0 mt-0.5" />
                        <span>Building a wrestling legacy for North Carolina</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament History */}
      <section id="tournaments" className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1b5c] mb-2 font-oswald">Tournament History</h2>
            <div className="w-24 h-1 bg-[#bc0c03] mx-auto mb-4 rounded-full"></div>
            <p className="text-xl text-gray-600">Our journey on the national wrestling stage</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* UCD 2024 */}
            <Card className="overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group border-0 backdrop-blur-sm">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/ucd-team-clean.png"
                  alt="NC United team in competition singlets at Ultimate Club Duals 2024"
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#bc0c03] hover:bg-[#bc0c03]">2024</Badge>
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-bold mb-2 font-oswald">Ultimate Club Duals</h3>
                  <p className="text-lg text-gray-200 mb-2">Nittany Valley Sports Centre, PA</p>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-lg font-bold font-oswald">5-2 Record</span>
                    </div>
                    <div className="bg-yellow-500/20 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-lg font-bold font-oswald">2nd Place</span>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="px-6 pt-6 pb-4 text-center bg-[#1a1b5c] text-white h-36 flex flex-col justify-between">
                <p className="text-blue-200 mb-4">
                  Our inaugural tournament appearance resulted in a strong 2nd place finish in the Gold Pool.
                </p>
                <Link href="/tournaments/ucd-2024">
                  <Button className="bg-[#bc0c03] hover:bg-[#9a0a02] text-white py-1.5 px-3 text-xs transition-colors duration-200 font-oswald">
                    View Full Results & Gallery
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* NHSCA Duals 2025 */}
            <Card className="overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group border-0 backdrop-blur-sm">
              <div className="relative h-64 overflow-hidden">
                <Image
                  src="/images/nhsca-team-photo-2025.jpg"
                  alt="NC United team at NHSCA Duals 2025 in Virginia Beach"
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute top-4 left-4">
                  <Badge className="bg-[#1a1b5c] hover:bg-[#1a1b5c]">2025</Badge>
                </div>
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-3xl font-bold mb-2 font-oswald">NHSCA Duals</h3>
                  <p className="text-lg text-gray-200 mb-2">Virginia Beach, VA</p>
                  <div className="flex items-center space-x-4">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-lg font-bold font-oswald">7-1 Record</span>
                    </div>
                    <div className="bg-yellow-500/20 backdrop-blur-sm rounded-lg px-3 py-1">
                      <span className="text-lg font-bold font-oswald">Gold Pool</span>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="px-6 pt-6 pb-4 text-center bg-[#1a1b5c] text-white h-36 flex flex-col justify-between">
                <p className="text-blue-200 mb-4">
                  Dominant performance with an 81% individual match win rate in the championship bracket.
                </p>
                <Link href="/tournaments/nhsca-2025">
                  <Button className="bg-[#bc0c03] hover:bg-[#9a0a02] text-white py-1.5 px-3 text-xs transition-colors duration-200 font-oswald">
                    View Full Results & Stats
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <div className="bg-gradient-to-r from-[#1a1b5c]/5 to-[#bc0c03]/5 p-6 rounded-lg max-w-3xl mx-auto">
              <h3 className="text-2xl font-bold text-[#1a1b5c] mb-4 font-oswald">Team Performance</h3>
              <p className="text-lg text-gray-700 mb-6">
                Combined <span className="font-bold text-[#1a1b5c]">12-3</span> dual meet record across both national
                tournaments, with <span className="font-bold text-[#bc0c03]">81%</span> individual match win rate at
                NHSCA.
              </p>
              <Link href="/tournaments">
                <Button
                  variant="outline"
                  className="border-[#1a1b5c] text-[#1a1b5c] hover:bg-[#1a1b5c] hover:text-white font-oswald"
                >
                  View All Tournament History
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Staff Section */}
      <section id="coaches" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1b5c] mb-2 font-oswald">Elite Coaching Staff</h2>
            <div className="w-24 h-1 bg-[#bc0c03] mx-auto mb-4 rounded-full"></div>
            <p className="text-xl text-gray-600">Led by North Carolina's wrestling legends and Team USA champions</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Coach 1 */}
              <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-64">
                  <Image
                    src="/images/coach-macchiavello-coaching.png"
                    alt="Michael Macchiavello coaching"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="bg-[#1a1b5c] text-white p-6">
                  <h3 className="text-xl font-bold text-center mb-2 font-oswald">Michael Macchiavello</h3>
                  <div className="text-center text-blue-200 text-sm mb-4">
                    2018 NCAA Division I Champion • Team USA • Founder of NC United
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start">
                      <span className="bg-[#bc0c03] rounded-full w-2 h-2 mr-2 mt-1.5 flex-shrink-0"></span>
                      <span>2018 NCAA Division I Champion at 197 lbs</span>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-[#bc0c03] rounded-full w-2 h-2 mr-2 mt-1.5 flex-shrink-0"></span>
                      <span>Only 2nd North Carolina native to win NCAA Division I title</span>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-[#bc0c03] rounded-full w-2 h-2 mr-2 mt-1.5 flex-shrink-0"></span>
                      <span>5-year Team USA National Team member</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Coach 2 */}
              <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-64">
                  <Image
                    src="/images/coach-palmer-tournament.png"
                    alt="Colton Palmer at tournament"
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="bg-[#1a1b5c] text-white p-6">
                  <h3 className="text-xl font-bold text-center mb-2 font-oswald">Colton Palmer</h3>
                  <div className="text-center text-blue-200 text-sm mb-4">
                    NC's All-Time Wins Leader • Founder NC United
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start">
                      <span className="bg-[#bc0c03] rounded-full w-2 h-2 mr-2 mt-1.5 flex-shrink-0"></span>
                      <span>NC State Alumni, NCAA Qualifier 2012</span>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-[#bc0c03] rounded-full w-2 h-2 mr-2 mt-1.5 flex-shrink-0"></span>
                      <span>2x NC State Champion (2005, 2007)</span>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-[#bc0c03] rounded-full w-2 h-2 mr-2 mt-1.5 flex-shrink-0"></span>
                      <span>North Carolina Most Career Wins 284 (1st All-Time)</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Coach 3 */}
              <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-64">
                  <Image
                    src="/images/coach-veronica-carlson-victory.png"
                    alt="Veronica Carlson Team USA victory"
                    fill
                    className="object-cover object-center"
                  />
                </div>
                <div className="bg-[#1a1b5c] text-white p-6">
                  <h3 className="text-xl font-bold text-center mb-2 font-oswald">Veronica Carlson</h3>
                  <div className="text-center text-blue-200 text-sm mb-4">
                    5-Year Team USA Member • World Team Champion • Women's Coach
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-start">
                      <span className="bg-[#bc0c03] rounded-full w-2 h-2 mr-2 mt-1.5 flex-shrink-0"></span>
                      <span>5 years on Team USA (2010-2015)</span>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-[#bc0c03] rounded-full w-2 h-2 mr-2 mt-1.5 flex-shrink-0"></span>
                      <span>2014 U.S. World Team Trials Champion</span>
                    </div>
                    <div className="flex items-start">
                      <span className="bg-[#bc0c03] rounded-full w-2 h-2 mr-2 mt-1.5 flex-shrink-0"></span>
                      <span>2013 U.S. Open Champion and World Team Member</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            <div className="mt-10 bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-md max-w-4xl mx-auto border border-gray-200">
              <p className="text-gray-700 text-center">
                NC United also benefits from a dedicated support system of former Division I competitors and club
                coaches from across the state, all working together to build something bigger than themselves—a true
                unified movement for North Carolina wrestling.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Impact Section */}
      <section className="py-16 bg-gradient-to-r from-[#1a1b5c] via-[#3949ab] to-[#bc0c03] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black mb-8 text-center font-oswald">The Impact</h2>
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

      {/* Recognition & Testimonials Section */}
      <section id="testimonials" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-black text-[#1a1b5c] mb-6 text-center font-oswald">
            Recognition & Testimonials
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#bc0c03] to-[#1a1b5c] mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            Hear what college coaches, club coaches, and parents are saying about NC United Wrestling
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTestimonialFilter("all")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 font-oswald ${
                activeTestimonialFilter === "all"
                  ? "bg-gradient-to-r from-[#1a1b5c] to-[#1a1b5c]/90 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md hover:scale-105"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTestimonialFilter("colleges")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 font-oswald ${
                activeTestimonialFilter === "colleges"
                  ? "bg-gradient-to-r from-[#1a1b5c] to-[#1a1b5c]/90 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md hover:scale-105"
              }`}
            >
              Colleges
            </button>
            <button
              onClick={() => setActiveTestimonialFilter("coaches")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 font-oswald ${
                activeTestimonialFilter === "coaches"
                  ? "bg-gradient-to-r from-[#1a1b5c] to-[#1a1b5c]/90 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md hover:scale-105"
              }`}
            >
              Clubs & HS Coaches
            </button>
            <button
              onClick={() => setActiveTestimonialFilter("parents")}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 font-oswald ${
                activeTestimonialFilter === "parents"
                  ? "bg-gradient-to-r from-[#1a1b5c] to-[#1a1b5c]/90 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md hover:scale-105"
              }`}
            >
              Parents
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Video Testimonial - Colleges */}
            {(activeTestimonialFilter === "all" || activeTestimonialFilter === "colleges") && (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1a1b5c] mb-4 font-oswald">UNC Associate Head Coach</h3>
                <div className="aspect-video mb-4">
                  <iframe
                    className="w-full h-full rounded-lg"
                    src="https://www.youtube.com/embed/0gfFU6hkpY4?start=1181&end=1218"
                    title="UNC Associate Head Coach on NC United Wrestling"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="text-gray-600 italic">
                  UNC's Associate Head Coach highlights NC United's success in dual meets and the quality of coaching.
                </p>
              </div>
            )}

            {/* Parent Testimonial - Parents */}
            {(activeTestimonialFilter === "all" || activeTestimonialFilter === "parents") && (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1a1b5c] mb-4 font-oswald">Parent Testimonial</h3>
                <div className="bg-white p-6 rounded-lg border-l-4 border-[#1a1b5c] mb-4 shadow-sm">
                  <p className="text-gray-700 italic">
                    "The coaches in this program are truly first class. Every time there was a dispute over a call, our
                    coaches calmly spoke with the refs. They were always there to coach the athletes during breaks,
                    offering constant guidance and support. Even after the day's competition was over, they took time
                    out of their own day to work with athletes who wanted to improve.
                    <br />
                    <br />
                    The commitment they show to these athletes is unbelievable. Thank you, coaches!"
                  </p>
                  <p className="text-gray-500 mt-4 font-medium">— Kenneth Ouellette, Parent of Heavyweight Wrestler</p>
                </div>
              </div>
            )}

            {/* Club Coach Testimonial - Coaches */}
            {(activeTestimonialFilter === "all" || activeTestimonialFilter === "coaches") && (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1a1b5c] mb-4 font-oswald">Club Coach Partnership</h3>
                <div className="bg-white p-6 rounded-lg border-l-4 border-[#bc0c03] mb-4 shadow-sm">
                  <p className="text-gray-700 italic">
                    "NCUnited's impact on North Carolina Wrestling cannot be understated. The training & competition
                    opportunities provided are next to none! NCUnited leadership works tirelessly to provide an elite
                    training environment for the growing wrestling community in North Carolina.
                    <br />
                    <br />
                    NCUnited works with Club coaches & established programs to enable the elite wrestlers within our
                    state limitless opportunities. NC Wrestling Factory is proud to partner with NCUnited for the
                    ultimate goal of fostering elite level wrestling in North Carolina."
                  </p>
                  <p className="text-gray-500 mt-4 font-medium">— Dakota Roberts, Head Coach - NC Wrestling Factory</p>
                </div>
              </div>
            )}

            {/* College Coach Testimonial - Colleges */}
            {(activeTestimonialFilter === "all" || activeTestimonialFilter === "colleges") && (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1a1b5c] mb-4 font-oswald">College Coach Recognition</h3>
                <div className="bg-white p-6 rounded-lg border-l-4 border-[#1a1b5c] mb-4 shadow-sm">
                  <p className="text-gray-700 italic">
                    "NC United is doing a phenomenal job. In a short time they have definitely elevated North Carolina
                    wrestling and our program at Roanoke definitely benefits from it!"
                  </p>
                  <p className="text-gray-500 mt-4 font-medium">— Nate Yetzer, Head Coach - Roanoke College</p>
                </div>
              </div>
            )}

            {/* NHSCA Parent Testimonial - Parents */}
            {(activeTestimonialFilter === "all" || activeTestimonialFilter === "parents") && (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1a1b5c] mb-4 font-oswald">NHSCA Parent Perspective</h3>
                <div className="bg-white p-6 rounded-lg border-l-4 border-[#bc0c03] mb-4 shadow-sm">
                  <p className="text-gray-700 italic">
                    "This mindset shift, from good to great, starts with the belief that we can compete at the national
                    level. Clubs are the foundation, building athletes and growing the sport at the grassroots level. NC
                    United builds on that foundation by providing additional resources, access to high-level
                    competition, and national-level exposure. Together, we're creating exponential growth. The future of
                    NC wrestling is bright because of this shared vision. Thank you for the vision, the hard work, and
                    for pushing North Carolina wrestling forward."
                  </p>
                  <p className="text-gray-500 mt-4 font-medium">— Chad Richards, NHSCA Duals Parent</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Tournaments */}
      <section id="upcoming" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1b5c] mb-2 font-oswald">Upcoming Tournaments</h2>
            <div className="w-24 h-1 bg-[#bc0c03] mx-auto mb-4 rounded-full"></div>
            <p className="text-xl text-gray-600">Join our national team for upcoming competitions</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-2xl border-0 backdrop-blur-sm">
              <div className="bg-gradient-to-r from-[#1a1b5c] via-[#1a1b5c] to-[#bc0c03] text-white p-8">
                <div className="text-center">
                  <Image
                    src="/images/ultimate-club-duals-logo.png"
                    alt="Ultimate Club Duals"
                    width={300}
                    height={90}
                    className="mx-auto mb-6"
                  />
                  <h3 className="text-3xl font-bold mb-4 font-oswald">2025 Ultimate Club Duals</h3>
                  <p className="text-xl text-blue-200 mb-6">Interest Form Available!</p>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="flex items-center justify-center space-x-2">
                      <CalendarDays className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="font-semibold font-oswald">September 19-21, 2025</p>
                        <p className="text-sm text-blue-200">Tournament Dates</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <MapPin className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="font-semibold font-oswald">State College, PA</p>
                        <p className="text-sm text-blue-200">Nittany Valley Sports Centre</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                      <Trophy className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="font-semibold font-oswald">Defending 2nd Place</p>
                        <p className="text-sm text-blue-200">Building on Success</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-8 text-center">
                <p className="text-lg text-gray-700 mb-6">
                  Based on our incredible 2024 performance (2nd place finish), we're excited to return to the Ultimate
                  Club Duals in 2025. Fill out our interest form to be considered for team selection.
                </p>
                <Link href="/ucd-2025-registration">
                  <Button
                    size="lg"
                    className="bg-[#bc0c03] hover:bg-[#9a0a02] text-white font-bold py-3 px-8 transition-colors duration-200 font-oswald tracking-wide"
                  >
                    Express Interest for 2025
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Get Involved Section */}
      <section id="get-involved" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1b5c] mb-2 font-oswald">Get Involved</h2>
            <div className="w-24 h-1 bg-[#bc0c03] mx-auto mb-4 rounded-full"></div>
            <p className="text-xl text-gray-600">Join the NC United movement</p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="bg-[#1a1b5c] text-white p-4">
                  <h3 className="text-xl font-bold text-center font-oswald">For Wrestlers</h3>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 text-[#bc0c03] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Express interest in joining our national team</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 text-[#bc0c03] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Attend our training camps and practices</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 text-[#bc0c03] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Compete in national tournaments</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link href="/ucd-2025-registration">
                      <Button className="w-full bg-[#1a1b5c] hover:bg-[#13144a] text-white font-oswald">
                        Join Our Team
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="bg-[#1a1b5c] text-white p-4">
                  <h3 className="text-xl font-bold text-center font-oswald">For Parents</h3>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 text-[#bc0c03] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Learn about our program and opportunities</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 text-[#bc0c03] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Volunteer to help at tournaments</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 text-[#bc0c03] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Support your wrestler's journey</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link href="/contact">
                      <Button className="w-full bg-[#1a1b5c] hover:bg-[#13144a] text-white font-oswald">
                        Contact Us
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="bg-[#1a1b5c] text-white p-4">
                  <h3 className="text-xl font-bold text-center font-oswald">For Supporters</h3>
                </div>
                <CardContent className="p-6">
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 text-[#bc0c03] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Donate to support our 501(c)(3) organization</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 text-[#bc0c03] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Sponsor a wrestler or tournament</span>
                    </li>
                    <li className="flex items-start">
                      <ArrowRight className="w-5 h-5 text-[#bc0c03] mr-2 flex-shrink-0 mt-0.5" />
                      <span>Partner with NC United</span>
                    </li>
                  </ul>
                  <div className="mt-6">
                    <Link href="/donate">
                      <Button className="w-full bg-[#1a1b5c] hover:bg-[#13144a] text-white font-oswald">
                        Support NC United
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
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
            <Link href="/ucd-2025-registration">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#1a1b5c] to-[#1a1b5c]/90 hover:from-[#13144a] hover:to-[#13144a]/90 text-white shadow-md hover:shadow-lg font-oswald"
              >
                Join Our Team
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
