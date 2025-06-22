"use client"

import { useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface TeamMember {
  id: string
  name: string
  title: string
  image: string
  bio: string
  specialties: string[]
  experience: string
  achievements: string[]
  imagePosition?: string // Custom image position for head alignment
}

const teamMembers: TeamMember[] = [
  {
    id: "mh",
    name: "Matt Hickey",
    title: "Founder",
    image: "/images/matt-hickey-transparent.jpg",
    imagePosition: "object-[center_25%]", // Adjusted to align head
    bio: "Matt Hickey grew up on Long Island as the youngest of five brothers, all of whom share a passion for wrestling. He started wrestling at the age of 6 and went on to earn a place in the Long Island Century Club with over 100 high school wins. He took 2nd place in the prestigious New York State Wrestling Championships before continuing his career at Hofstra University.\n\nHe completed his academic journey at North Carolina State University, graduating with a degree in Public Relations. With over 25 years of experience as a business leader and entrepreneur, Matt has founded and built successful teams and companies in the technology industry.\n\nHis leadership and vision have driven him, along with his partners Michael Macchiavello and Colton Palmer, to co-found NC United, where they combine their passion for North Carolina wrestling and commitment to elevating the state to a premier wrestling powerhouse by fostering unity, excellence, and expanding opportunities for all levels of wrestlers throughout the state.\n\nMatt lives in Raleigh, NC, with his wife of 21 years, Lisa, and their three children: daughter Abigail and sons Liam and Gavin.",
    specialties: ["Leadership & Vision", "Business Development", "Team Building"],
    experience: "Co-Founder",
    achievements: [
      "Long Island Century Club (100+ HS wins)",
      "2nd Place NY State Wrestling Championships",
      "Hofstra University Wrestler",
      "NC State Graduate (Public Relations)",
      "Technology Industry Entrepreneur",
    ],
  },
  {
    id: "cp",
    name: "Colton Palmer",
    title: "Founder",
    image: "/images/colton-palmer-headshot.jpg",
    imagePosition: "object-[center_50%]", // Much further down to make smaller
    bio: "Colton Palmer's wrestling journey began at the age of 5 in Durham, North Carolina, following in the footsteps of his older brothers, Austen and Brandon. He quickly made his mark on the national stage, earning All-American honors and winning an NHSCA National Championship by the 8th grade.\n\nIn high school, Colton competed for Riverside High School, where he helped secure two NCHSAA State Dual titles and captured his first individual state championship with a perfect 61-0 record in 2005. Despite an injury in his junior year, he bounced back to claim a second state title in 2007, ending his career with 284 wins, a national record at the time.\n\nColton continued his career at NC State University, where he was a four-year letter winner, co-captain, and a nationally ranked NCAA Tournament qualifier. Now, as VP Enterprise Strategy & Development at Strategic Executives Agency, Colton brings the same leadership and dedication to his professional endeavors helping organizations achieve sustainable growth and operational excellence.\n\nAs the founder of NC Wrestling United and a volunteer coach, and board member for NC USA Wrestling, Colton continues to share his passion for wrestling and inspire the next generation of athletes.",
    specialties: ["Elite Competition", "Strategic Development", "Youth Mentorship"],
    experience: "Co-Founder",
    achievements: [
      "NHSCA National Champion (8th grade)",
      "2x NCHSAA State Champion (2005, 2007)",
      "Perfect 61-0 season (2005)",
      "284 career wins (national record)",
      "NC State 4-year letter winner & co-captain",
      "NCAA Tournament qualifier",
      "NC USA Wrestling board member",
    ],
  },
  {
    id: "maach",
    name: "Michael Macchiavello",
    title: "Founder",
    image: "/images/michael-macchiavello-headshot.jpg",
    imagePosition: "object-[center_25%]", // Adjusted to align head
    bio: "Michael Macchiavello grew up in the Monroe/Indian Trail area of North Carolina. A Union County native, he is the second oldest of five siblings, one who also shares a passion for wrestling and currently wrestles for NC State University his Alma Mater (Andrew Macchiavello). He started wrestling at the age of 14.\n\nHe went on to become a 1x NC High School state champion before continuing his career at NC State University where he capped off his career with a National Championship at 197lbs becoming only the second NC Native to ever win a Division I NCAA Championship in the history of the state.\n\nMichael went on to graduate from North Carolina State University with a Business Administration degree concentrating in Finance while also obtaining a Masters Degree in Arts in Liberal Studies focusing on communication, psychology, and business.\n\nHaving gone on to represent Team USA internationally competing as part of the US National Team for the past 5 years, Michael has also served on the USA Wrestling Board of Directors, USA Wrestling Executive Committee as well as the Athlete Advisory Committee which serves to the voice of the athletes similar to the NFLPA and NBPA. Having been born and raised in the state of NC, Michael shares a deeply rooted connection to the state of North Carolina.",
    specialties: ["Elite Technical Training", "International Competition", "Athletic Leadership"],
    experience: "Co-Founder",
    achievements: [
      "NCAA Division I National Champion (197lbs)",
      "2nd NC Native to win D1 NCAA Championship",
      "NC High School State Champion",
      "Team USA International Competitor",
      "USA Wrestling Board of Directors",
      "USA Wrestling Executive Committee",
      "Athlete Advisory Committee Member",
      "NC State Graduate (Business Administration & Masters)",
    ],
  },
  {
    id: "veronica",
    name: "Veronica Carlson",
    title: "Board Member - Coach",
    image: "/images/veronica-carlson-headshot.jpg",
    imagePosition: "object-[center_40%]", // Further down to make smaller
    bio: "Originally from Illinois and now residing in Asheville, North Carolina, Veronica Carlson is a former Team USA standout and World Team member who brings world-class experience and leadership to the NC United women's program.\n\nVeronica spent five years on Team USA (2010–2015), earning a No. 2 national ranking at 69 KG in the 2014–2015 season. She was the 2014 U.S. World Team Trials Champion and the 2013 U.S. Open Champion and World Team member. Her international resume includes top finishes at the World Championships, World Cup, and Junior World Championships, establishing her as one of the country's top competitors during her career.\n\nOff the mat, Veronica is a certified yoga instructor and a dedicated advocate for athlete development. She has served on USA Wrestling's Board of Directors since 2016 and was named the 2022 USA Wrestling Woman of the Year for her impactful contributions as an Athlete Representative.",
    specialties: ["Women's Wrestling", "International Competition", "Athlete Development"],
    experience: "Board Member - Coach",
    achievements: [
      "5 years on Team USA (2010-2015)",
      "No. 2 national ranking at 69 KG",
      "2014 U.S. World Team Trials Champion",
      "2013 U.S. Open Champion",
      "World Team member",
      "USA Wrestling Board of Directors since 2016",
      "2022 USA Wrestling Woman of the Year",
      "Certified Yoga Instructor",
    ],
  },
  {
    id: "araad",
    name: "Araad Fisher",
    title: "Coach",
    image: "/images/araad-fisher-headshot.jpg",
    imagePosition: "object-[center_25%]", // Adjusted to align head
    bio: "Araad Fisher is originally from San Jose, California, where he was introduced to wrestling at the age of 10. He honed his grappling skills at Riverside High School in Durham, NC, where he became an NCHSAA State Finalist, a High School All-American, and an NHSCA Academic All-American, finishing his prep career with over 140 wins.\n\nAraad continued his wrestling career at Duke University, where he was a four-year letter winner and starter, competing for the Blue Devils at 184, 197, and Heavyweight. He also garnered acclaim as a 4x ACC Academic Honor Roll and 4x Dean's List Honoree.\n\nHe graduated from Duke with degrees in Political Science and History before pursuing a Master's in Sports Administration from The University of North Carolina at Chapel Hill. His graduate work earned him the Graduate Student Research Award for his thesis and research.\n\nAraad was also a youth coach for the Blue Blood Wrestling Club during his time at Duke. With a strong foundation in coaching, competition, and academics, Araad is committed to developing well-rounded student-athletes and preparing them for success at the next level.",
    specialties: ["Academic Excellence", "Student-Athlete Development", "Youth Coaching"],
    experience: "Coach",
    achievements: [
      "NCHSAA State Finalist",
      "High School All-American",
      "NHSCA Academic All-American",
      "140+ high school wins",
      "Duke University 4-year letter winner",
      "4x ACC Academic Honor Roll",
      "4x Dean's List Honoree",
      "Duke Graduate (Political Science & History)",
      "UNC Masters (Sports Administration)",
      "Graduate Student Research Award",
      "Blue Blood Wrestling Club Coach",
    ],
  },
]

function TruncatedBio({ bio, memberId, memberTitle }: { bio: string; memberId: string; memberTitle: string }) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Use a consistent character count for all bios (approximately 150 characters)
  const previewLength = 150
  const previewText = bio.substring(0, previewLength) + (bio.length > previewLength ? "..." : "")

  // Replace \n\n with paragraph breaks for HTML rendering
  const formattedBio = isExpanded
    ? bio.split("\n\n").map((paragraph, index) => (
        <p key={index} className="mb-3 last:mb-0">
          {paragraph}
        </p>
      ))
    : previewText

  // Different button colors based on role
  const isFounder = memberTitle === "Founder"
  const buttonClasses = isFounder
    ? "mt-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1 rounded-full"
    : "mt-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-medium px-3 py-1 rounded-full"

  return (
    <div>
      <h4 className="font-semibold text-slate-800 mb-2 text-xs uppercase tracking-wide">About</h4>
      <div className="text-slate-600 leading-relaxed text-sm">{formattedBio}</div>
      {bio.length > previewLength && (
        <Button variant="default" size="sm" onClick={() => setIsExpanded(!isExpanded)} className={buttonClasses}>
          {isExpanded ? "Read less" : "Read more"}
        </Button>
      )}
    </div>
  )
}

export default function OurTeamPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Modern Hero Section - Matching NHSCA page style */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full px-4 py-2 mb-6">
              <div className="h-4 w-4 text-red-400">✨</div>
              <span className="text-red-200 text-sm font-medium">Meet Our Leadership Team</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent tracking-tight">
              OUR TEAM
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Meet the passionate leaders driving NC United Wrestling to new heights. Our team combines decades of elite
              wrestling experience with innovative leadership to develop champions on and off the mat.
            </p>
          </div>
        </div>
      </section>

      {/* Team Members Section */}
      <section className="py-20 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card
                  key={member.id}
                  className="group hover:shadow-2xl transition-all duration-500 bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-2xl overflow-hidden hover:-translate-y-2"
                >
                  {/* Profile Image - Show full photo to display NC United logos on shirts */}
                  <div className="relative h-[28rem] overflow-hidden bg-white p-4">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className={`object-cover ${member.imagePosition || "object-center"} group-hover:scale-105 transition-transform duration-500`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Title Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge
                        className={`backdrop-blur-sm px-4 py-2 ${
                          member.title === "Founder"
                            ? "bg-blue-600/20 border-blue-500/30 text-blue-300"
                            : "bg-purple-600/20 border-purple-500/30 text-purple-300"
                        }`}
                      >
                        {member.title}
                      </Badge>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    {/* Name and Experience */}
                    <div className="mb-4">
                      <h3 className="text-2xl font-black text-slate-800 mb-1">{member.name}</h3>
                      <p
                        className={`font-semibold text-sm ${
                          member.title === "Founder" ? "text-blue-600" : "text-purple-600"
                        }`}
                      >
                        {member.experience}
                      </p>
                    </div>

                    {/* Specialties */}
                    <div className="mb-4">
                      <h4 className="font-semibold text-slate-800 mb-2 text-xs uppercase tracking-wide">Specialties</h4>
                      <div className="flex flex-wrap gap-1">
                        {member.specialties.map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className={`text-xs border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors ${
                              member.title === "Founder"
                                ? "text-blue-700"
                                : "text-purple-700 border-purple-200 bg-purple-50 hover:bg-purple-100"
                            }`}
                          >
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Truncated Bio with Read More */}
                    <TruncatedBio bio={member.bio} memberId={member.id} memberTitle={member.title} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Philosophy Section - Matching NHSCA style */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-red-600/20 border-red-500/30 text-red-300 px-4 py-2">Our Philosophy</Badge>
              <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                How We Lead
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
                Our leadership philosophy is built on three core principles that guide everything we do at NC United
                Wrestling.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white text-2xl">🏆</div>
                </div>
                <h3 className="font-black text-xl mb-3 text-white">Excellence</h3>
                <p className="text-blue-100">
                  We pursue excellence in every aspect of training, competition, and character development, setting the
                  highest standards for ourselves and our athletes.
                </p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white text-2xl">💪</div>
                </div>
                <h3 className="font-black text-xl mb-3 text-white">Dedication</h3>
                <p className="text-blue-100">
                  Our unwavering commitment extends beyond wrestling technique to developing life skills, leadership
                  qualities, and personal growth.
                </p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white text-2xl">🤝</div>
                </div>
                <h3 className="font-black text-xl mb-3 text-white">Unity</h3>
                <p className="text-blue-100">
                  We foster a strong team culture where every wrestler supports and elevates their teammates, creating
                  an environment of mutual respect and growth.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NC United Legacy */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-600/20 border-blue-500/30 text-blue-700 px-4 py-2">Our Legacy</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4">The NC United Legacy</h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Our founders bring together an unprecedented combination of wrestling excellence, business acumen, and
                deep North Carolina roots to elevate the state's wrestling program.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-6 text-slate-800">Championship Pedigree</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4" />
                      <span className="text-slate-600">NCAA Division I National Champion</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4" />
                      <span className="text-slate-600">Multiple State Championships</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4" />
                      <span className="text-slate-600">International Team USA Experience</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full mr-4" />
                      <span className="text-slate-600">USA Wrestling Leadership Roles</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-black mb-6 text-slate-800">Our Vision for NC Wrestling</h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mr-4" />
                      <span className="text-slate-600">Develop elite wrestling talent statewide</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mr-4" />
                      <span className="text-slate-600">Create pathways from youth to international competition</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mr-4" />
                      <span className="text-slate-600">Unite wrestling programs across North Carolina</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-3 h-3 bg-blue-400 rounded-full mr-4" />
                      <span className="text-slate-600">Build character through wrestling excellence</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
