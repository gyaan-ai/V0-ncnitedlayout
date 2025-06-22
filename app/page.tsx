"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowRight, Calendar, Users, Target, Award, Trophy, GraduationCap, BarChart3, BookOpen } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const code = searchParams.get("code")
  const [scrollY, setScrollY] = useState(0)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    // Handle auth code if present, but don't let it break the page
    if (code) {
      const handleAuthCode = async () => {
        try {
          // Only attempt auth if we have the necessary environment variables
          if (
            typeof window !== "undefined" &&
            process.env.NEXT_PUBLIC_SUPABASE_URL &&
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
          ) {
            const { createClient } = await import("@supabase/supabase-js")
            const supabase = createClient(
              process.env.NEXT_PUBLIC_SUPABASE_URL,
              process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            )

            const { error } = await supabase.auth.exchangeCodeForSession(code)

            if (!error) {
              router.push("/dashboard")
            } else {
              console.warn("Auth exchange failed:", error.message)
              setAuthError("Authentication failed")
            }
          }
        } catch (error) {
          console.warn("Auth handling error:", error)
          setAuthError("Authentication service unavailable")
        }
      }

      handleAuthCode()
    }
  }, [code, router])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen">
      {/* Show auth error if present */}
      {authError && (
        <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4">
          <p className="font-bold">Notice:</p>
          <p>{authError}</p>
        </div>
      )}

      {/* Hero Section with Wrestling Arena Background */}
      <section
        className="relative h-[500px] md:h-[600px] bg-cover bg-no-repeat flex items-center"
        style={{
          backgroundImage:
            "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NC%20United%20Site%204.jpg-UshPJUTXp7i5PYHErkJWjYvtFc3DSI.jpeg')",
          backgroundPosition: "center 60%",
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>

        {/* Hero Content - Constrained width */}
        <div className="relative z-10 w-full">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold text-white leading-tight font-oswald">
                NORTH
                <br />
                CAROLINA
                <br />
                WRESTLING
                <br />
                UNITED
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Unity Quote Section - Constrained width */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-start">
            {/* Left Column - Image and Unity Section */}
            <div>
              {/* Wrestling Image */}
              <div className="relative mb-6 md:mb-8">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NC%20United%20Site%202.jpg-erUKPyURcMbuwoEGKnzHct6BAYrHGR.jpeg"
                  alt="Two young wrestlers in face-to-face position during a match, one in blue and one in navy"
                  className="w-full h-auto"
                />
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-6 md:mb-8 font-oswald leading-tight tracking-tight">
                WHERE THERE IS UNITY, THERE IS VICTORY
              </h2>

              {/* Percentage Bars - Matching Current Design */}
              <div className="space-y-3 md:space-y-4 mb-8">
                <div className="bg-[#1a1b5c] text-white p-3 md:p-4 flex justify-between items-center">
                  <span className="font-bold text-base md:text-lg font-oswald italic">DEDICATION</span>
                  <span className="font-bold text-base md:text-lg font-oswald italic">100%</span>
                </div>

                <div className="bg-[#1a1b5c] text-white p-3 md:p-4 flex justify-between items-center">
                  <span className="font-bold text-base md:text-lg font-oswald italic">DETERMINATION</span>
                  <span className="font-bold text-base md:text-lg font-oswald italic">100%</span>
                </div>

                <div className="bg-[#1a1b5c] text-white p-3 md:p-4 flex justify-between items-center">
                  <span className="font-bold text-base md:text-lg font-oswald italic">DISCIPLINE</span>
                  <span className="font-bold text-base md:text-lg font-oswald italic">100%</span>
                </div>
              </div>
            </div>

            {/* Right Column - Forging Future Champions */}
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-black mb-3 md:mb-4 font-oswald leading-tight tracking-tight">
                FORGING FUTURE CHAMPIONS
              </h2>
              <h3 className="text-base md:text-lg text-gray-600 font-bold mb-6 md:mb-8 font-oswald tracking-wide">
                FOSTERING EXCELLENCE, UNITY, AND OPPORTUNITY FOR ALL ATHLETES
              </h3>

              <div className="space-y-4 md:space-y-6 text-gray-700 text-base leading-relaxed">
                <p>
                  NC Wrestling United is dedicated to elevating North Carolina to a premier wrestling state. Our mission
                  is to foster a culture of unity and excellence, cultivating our athletes' potential by bringing
                  together the state's most gifted wrestlers for national-level competition.
                </p>
                <p>
                  We aim to create a system that maximizes our wrestlers' potential at the high school level, prepares
                  them to excel in college, and provides access to opportunities beyond the mat.
                </p>

                <div className="pt-4">
                  <Link
                    href="/about"
                    className="inline-flex items-center bg-[#1a1b5c] hover:bg-[#13144a] text-white font-bold py-3 px-6 md:px-8 transition-colors duration-200 font-oswald tracking-wide"
                  >
                    LEARN MORE
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Empowering Athletes Section - Constrained width */}
      <section className="py-10 md:py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="order-1 md:order-1">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#1a1b5c] mb-4 md:mb-6 font-oswald leading-tight">
                EMPOWERING ATHLETES
                <br />
                BUILDING CHAMPIONS
              </h2>

              <p className="text-gray-700 mb-6 md:mb-8 text-base md:text-lg">
                NC Wrestling United is committed to elevating North Carolina wrestling through comprehensive programs,
                community engagement, and unwavering support for athletes. By fostering a culture of unity and
                excellence, we aim to create lasting positive change in the lives of our wrestlers.
              </p>

              <div className="flex flex-wrap gap-3 md:gap-4 mb-8 md:mb-0">
                <Link
                  href="/about"
                  className="bg-[#1a1b5c] text-white font-bold py-2 md:py-3 px-4 md:px-6 transition-colors duration-200 hover:bg-[#13144a] font-oswald"
                >
                  MISSION
                </Link>
                <Link
                  href="/about"
                  className="bg-[#1a1b5c] text-white font-bold py-2 md:py-3 px-4 md:px-6 transition-colors duration-200 hover:bg-[#13144a] font-oswald"
                >
                  VISION
                </Link>
                <Link
                  href="/about"
                  className="bg-[#1a1b5c] text-white font-bold py-2 md:py-3 px-4 md:px-6 transition-colors duration-200 hover:bg-[#13144a] font-oswald"
                >
                  OBJECTIVES
                </Link>
              </div>
            </div>

            <div className="relative order-2 md:order-2">
              <img
                src="/images/wrestler-victory-ouellette.jpg"
                alt="NC wrestler with raised arm in victory, wearing North Carolina wrestling singlet"
                className="rounded-lg shadow-xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Inside NC United Section - Full width background with constrained content */}
      <section className="relative py-20 md:py-32">
        {/* Mobile: Regular image */}
        <div className="block md:hidden">
          <div className="relative">
            <img
              src="/images/wrestling-celebration-tournament.jpg"
              alt="Wrestling team celebration at tournament with arms raised in victory"
              className="w-full h-[600px] object-cover"
            />
            {/* Dark overlay for mobile */}
            <div className="absolute inset-0 bg-black bg-opacity-75"></div>

            {/* Content overlay for mobile - constrained */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
                <h2 className="text-4xl font-black text-white mb-4 font-oswald">INSIDE NC UNITED</h2>
                <div className="max-w-2xl">
                  <p className="text-base text-white mb-6 leading-relaxed">
                    Inside United blog is your go-to source for all things North Carolina wrestling. Stay up to date
                    with the latest news, events, and stories from NC Wrestling United.
                  </p>
                  <Link
                    href="/blog"
                    className="inline-flex items-center bg-[#bc0c03] hover:bg-[#9a0a02] text-white font-bold py-3 px-6 transition-colors duration-200 font-oswald"
                  >
                    READ THE LATEST
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Background with constrained content */}
        <div
          className="hidden md:block relative bg-cover bg-center py-32 md:py-40"
          style={{
            backgroundImage: "url('/images/wrestling-celebration-tournament.jpg')",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          {/* Dark overlay for desktop */}
          <div className="absolute inset-0 bg-black bg-opacity-75"></div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
            <h2 className="text-5xl font-black text-white mb-4 font-oswald">INSIDE NC UNITED</h2>

            <div className="max-w-2xl">
              <p className="text-lg text-white mb-8">
                Inside United blog is your go-to source for all things North Carolina wrestling. Stay up to date with
                the latest news, events, and stories from NC Wrestling United, including athlete highlights, training
                insights, and community initiatives.
              </p>

              <Link
                href="/blog"
                className="inline-flex items-center bg-[#bc0c03] hover:bg-[#9a0a02] text-white font-bold py-3 px-8 transition-colors duration-200 font-oswald"
              >
                READ THE LATEST
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Programs Section - Constrained width */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center mb-4">
              <Trophy className="w-8 h-8 text-[#bc0c03] mr-3" />
              <h2 className="text-4xl md:text-5xl font-black text-[#1a1b5c] font-oswald">
                ATHLETE DEVELOPMENT PROGRAMS
              </h2>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Comprehensive programs designed to develop wrestlers at every level, from elite competition to career
              preparation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {/* NC United Blue */}
            <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-[#4a5cb8] to-[#1a1b5c] group-hover:from-[#bc0c03] group-hover:to-[#8b0902] p-6 transition-all duration-300">
                <div className="flex items-center mb-3">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NC-United-Blue-Logo-1536x1536-2F0MpLwc7DCUiD0eWXabPhIS320PJN.png"
                    alt="United Blue Logo"
                    className="w-12 h-12 mr-3"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white font-oswald">NC UNITED BLUE</h3>
                    <p className="text-blue-200 text-sm italic">Elite Men's Program</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Invitation-only program for top NC wrestlers. National-level training, competition, and college
                  exposure.
                </p>
                <Link
                  href="/programs"
                  className="inline-flex items-center text-[#bc0c03] hover:text-[#9a0a02] font-bold text-sm transition-colors duration-200"
                >
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* NC United Gold */}
            <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-[#4a5cb8] to-[#1a1b5c] group-hover:from-[#bc0c03] group-hover:to-[#8b0902] p-6 transition-all duration-300">
                <div className="flex items-center mb-3">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NC%20Gold-6M1zaqmGfyb4NtArkTHgKcN7kXpLHY.png"
                    alt="United Gold Logo"
                    className="w-12 h-12 mr-3"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white font-oswald">NC UNITED GOLD</h3>
                    <p className="text-yellow-200 text-sm italic">Elite Women's Freestyle Program</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  For State Champs, Placers & All-Americans. Collegiate-style training and national competition.
                </p>
                <Link
                  href="/programs"
                  className="inline-flex items-center text-[#bc0c03] hover:text-[#9a0a02] font-bold text-sm transition-colors duration-200"
                >
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* National Dual Teams */}
            <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-[#4a5cb8] to-[#1a1b5c] group-hover:from-[#bc0c03] group-hover:to-[#8b0902] p-6 transition-all duration-300">
                <div className="flex items-center mb-3">
                  <Trophy className="w-12 h-12 text-yellow-400 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold text-white font-oswald">NATIONAL DUAL TEAMS</h3>
                    <p className="text-blue-200 text-sm italic">Compete at the Highest Level</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Teams selected for premier events like Ultimate Club Duals and NHSCA Duals. Built on performance,
                  participation & commitment.
                </p>
                <Link
                  href="/national-team"
                  className="inline-flex items-center text-[#bc0c03] hover:text-[#9a0a02] font-bold text-sm transition-colors duration-200"
                >
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Legacy Builders */}
            <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-[#4a5cb8] to-[#1a1b5c] group-hover:from-[#bc0c03] group-hover:to-[#8b0902] p-6 transition-all duration-300">
                <div className="flex items-center mb-3">
                  <GraduationCap className="w-12 h-12 text-yellow-400 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold text-white font-oswald">LEGACY BUILDERS</h3>
                    <p className="text-yellow-200 text-sm italic">College Athletes Giving Back</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  NC college wrestlers train with and mentor our high school athletes—building a culture of leadership
                  and unity.
                </p>
                <Link
                  href="/programs"
                  className="inline-flex items-center text-[#bc0c03] hover:text-[#9a0a02] font-bold text-sm transition-colors duration-200"
                >
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* NC United Academy */}
            <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-[#4a5cb8] to-[#1a1b5c] group-hover:from-[#bc0c03] group-hover:to-[#8b0902] p-6 transition-all duration-300">
                <div className="flex items-center mb-3">
                  <BookOpen className="w-12 h-12 text-yellow-400 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold text-white font-oswald">NC UNITED ACADEMY</h3>
                    <p className="text-blue-200 text-sm italic">Education & Wellness Series</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  Monthly Zoom sessions on nutrition, weight management, strength training, recruiting, and more—led by
                  trusted experts.
                </p>
                <Link
                  href="/programs"
                  className="inline-flex items-center text-[#bc0c03] hover:text-[#9a0a02] font-bold text-sm transition-colors duration-200"
                >
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* College Recruiting & Data Portal */}
            <div className="group bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="bg-gradient-to-r from-[#4a5cb8] to-[#1a1b5c] group-hover:from-[#bc0c03] group-hover:to-[#8b0902] p-6 transition-all duration-300">
                <div className="flex items-center mb-3">
                  <BarChart3 className="w-12 h-12 text-yellow-400 mr-3" />
                  <div>
                    <h3 className="text-xl font-bold text-white font-oswald">RECRUITING & DATA PORTAL</h3>
                    <p className="text-yellow-200 text-sm italic">Rankings, Commitments & Results</p>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <div className="text-gray-700 text-sm leading-relaxed mb-4">
                  <ul className="space-y-1">
                    <li>• Prospect rankings</li>
                    <li>• Commit announcements</li>
                    <li>• Tournament performance tracking</li>
                    <li>• Historical archives & analysis</li>
                  </ul>
                </div>
                <Link
                  href="/recruiting"
                  className="inline-flex items-center text-[#bc0c03] hover:text-[#9a0a02] font-bold text-sm transition-colors duration-200"
                >
                  Learn More <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/programs"
              className="inline-flex items-center bg-[#1a1b5c] hover:bg-[#bc0c03] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 font-oswald tracking-wide"
            >
              VIEW ALL PROGRAMS
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#1a1b5c] mb-4 font-oswald">LATEST NEWS</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Stay up to date with the latest news, events, and stories from NC Wrestling United
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* News Card 1 */}
            <Link href="/blog" className="group block h-full">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-06-04%20at%2012.18.53%E2%80%AFPM-G1PGhXq8f0I0Lg5e1FpaoLvNJ3ixoU.png"
                    alt="United Gold women's wrestling team and coaches at NC State training facility"
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-[#4a5cb8] to-[#1a1b5c] group-hover:from-[#bc0c03] group-hover:to-[#8b0902] text-white transition-all duration-300">
                  <h3 className="text-xl font-bold mb-3 font-oswald uppercase leading-tight">
                    UNITED GOLD BUILDS MOMENTUM: SECOND WOMEN'S FREESTYLE PRACTICE
                  </h3>
                  <div className="flex items-center text-yellow-400 text-sm mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="font-medium">May 14, 2025</span>
                  </div>
                  <p className="text-gray-100 text-sm leading-relaxed mb-4 flex-1">
                    NC United Gold's May 10th women's freestyle session delivered high-level technical drilling, elite
                    mentorship, and fresh talent—cementing our commitment to excellence.
                  </p>
                  <span className="text-yellow-400 font-bold italic">Read More →</span>
                </div>
              </div>
            </Link>

            {/* News Card 2 */}
            <Link href="/blog" className="group block h-full">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-06-04%20at%2012.23.55%E2%80%AFPM-4F5Z63TW7egfxA5JNC2Wv3LBJvXMmy.png"
                    alt="United Gold women's wrestling team and coaches at Greensboro College facility for inaugural 2025 practice"
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-[#4a5cb8] to-[#1a1b5c] group-hover:from-[#bc0c03] group-hover:to-[#8b0902] text-white transition-all duration-300">
                  <h3 className="text-xl font-bold mb-3 font-oswald uppercase leading-tight">
                    IRON SHARPENS IRON: NC UNITED GOLD'S INAUGURAL PRACTICE
                  </h3>
                  <div className="flex items-center text-yellow-400 text-sm mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="font-medium">April 29, 2025</span>
                  </div>
                  <p className="text-gray-100 text-sm leading-relaxed mb-4 flex-1">
                    NC United Gold kicked off its 2025 season with an elite women's freestyle practice at Greensboro
                    College, uniting high school and college athletes for intensive training.
                  </p>
                  <span className="text-yellow-400 font-bold italic">Read More →</span>
                </div>
              </div>
            </Link>

            {/* News Card 3 */}
            <Link href="/blog" className="group block h-full">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NC%20Gold.jpg-mJBIjUqSwNi0Xx2xxj6Ntse9sqzxm1.jpeg"
                    alt="NC United Gold women's wrestling promotional image featuring female wrestlers in competition"
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-40 transition-all duration-300"></div>
                </div>
                <div className="p-6 flex-1 flex flex-col bg-gradient-to-b from-[#4a5cb8] to-[#1a1b5c] group-hover:from-[#bc0c03] group-hover:to-[#8b0902] text-white transition-all duration-300">
                  <h3 className="text-xl font-bold mb-3 font-oswald uppercase leading-tight">
                    NC UNITED GOLD: EMPOWERING CHAMPIONS, ELEVATING WOMEN'S WRESTLING
                  </h3>
                  <div className="flex items-center text-yellow-400 text-sm mb-4">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span className="font-medium">April 23, 2025</span>
                  </div>
                  <p className="text-gray-100 text-sm leading-relaxed mb-4 flex-1">
                    NC United Gold is elevating women's wrestling in North Carolina—uniting elite athletes across high
                    school, college, and beyond through comprehensive freestyle training programs.
                  </p>
                  <span className="text-yellow-400 font-bold italic">Read More →</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-flex items-center bg-[#1a1b5c] hover:bg-[#bc0c03] text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 font-oswald tracking-wide"
            >
              VIEW ALL NEWS
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Wrestling Action Banner Section */}
      <section className="relative py-20 md:py-32">
        {/* Mobile: Regular image */}
        <div className="block md:hidden">
          <div className="relative">
            <img
              src="/images/wrestling-match-action.jpg"
              alt="Wrestler executing a dynamic throw during a match with spectators watching"
              className="w-full h-[600px] object-cover"
            />
            {/* Dark overlay for mobile */}
            <div className="absolute inset-0 bg-black bg-opacity-60"></div>

            {/* Content overlay for mobile - constrained */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
                <h2 className="text-4xl font-black text-white mb-4 font-oswald">ELITE COMPETITION</h2>
                <div className="max-w-2xl">
                  <p className="text-base text-white mb-6 leading-relaxed">
                    NC Wrestling United athletes compete at the highest levels, developing technical skills and mental
                    toughness through rigorous competition.
                  </p>
                  <Link
                    href="/tournaments"
                    className="inline-flex items-center bg-[#bc0c03] hover:bg-[#9a0a02] text-white font-bold py-3 px-6 transition-colors duration-200 font-oswald"
                  >
                    UPCOMING EVENTS
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop: Background with constrained content */}
        <div
          className="hidden md:block relative bg-cover bg-center py-32 md:py-40"
          style={{
            backgroundImage: "url('/images/wrestling-match-action.jpg')",
            backgroundAttachment: "fixed",
            backgroundSize: "cover",
            backgroundPosition: "center center",
          }}
        >
          {/* Dark overlay for desktop */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>

          <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
            <h2 className="text-5xl font-black text-white mb-4 font-oswald">ELITE COMPETITION</h2>

            <div className="max-w-2xl">
              <p className="text-lg text-white mb-8">
                NC Wrestling United athletes compete at the highest levels, developing technical skills and mental
                toughness through rigorous competition and dedicated coaching.
              </p>

              <Link
                href="/tournaments"
                className="inline-flex items-center bg-[#bc0c03] hover:bg-[#9a0a02] text-white font-bold py-3 px-8 transition-colors duration-200 font-oswald"
              >
                UPCOMING EVENTS
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ways to Get Involved Section */}
      <section
        className="relative py-16 md:py-24 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=600&width=1200')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-75"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 md:mb-8 font-oswald leading-tight">
                WAYS TO GET INVOLVED
              </h2>
              <p className="text-lg text-gray-200 mb-8">
                There are numerous ways you can support NC Wrestling United and help us elevate wrestling in North
                Carolina. Volunteer your time, make a donation, sponsor a program, or simply spread the word!
              </p>
              <Link
                href="/about"
                className="inline-flex items-center bg-[#bc0c03] hover:bg-[#9a0a02] text-white font-bold py-3 px-8 transition-colors duration-200 font-oswald"
              >
                LEARN MORE
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg text-white">
                <Users className="w-8 h-8 mb-4 text-[#bc0c03]" />
                <h3 className="text-lg font-bold mb-2 font-oswald">BECOME A MEMBER</h3>
                <p className="text-sm text-gray-200">
                  Join our community of passionate wrestling enthusiasts and receive exclusive benefits.
                </p>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg text-white">
                <Target className="w-8 h-8 mb-4 text-[#bc0c03]" />
                <h3 className="text-lg font-bold mb-2 font-oswald">VOLUNTEER</h3>
                <p className="text-sm text-gray-200">
                  Volunteers are the backbone of our organization. Your skills and time are invaluable.
                </p>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg text-white">
                <Award className="w-8 h-8 mb-4 text-[#bc0c03]" />
                <h3 className="text-lg font-bold mb-2 font-oswald">MAKE A DONATION</h3>
                <p className="text-sm text-gray-200">
                  Your financial contributions help fund scholarships, training programs, and community outreach.
                </p>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm p-6 rounded-lg text-white">
                <Calendar className="w-8 h-8 mb-4 text-[#bc0c03]" />
                <h3 className="text-lg font-bold mb-2 font-oswald">SPREAD THE WORD</h3>
                <p className="text-sm text-gray-200">
                  Help us raise awareness by sharing our mission and programs with your network.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
