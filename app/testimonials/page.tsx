"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Quote, Star, Instagram, Twitter } from "lucide-react"
import Link from "next/link"

export default function TestimonialsPage() {
  const [activeFilter, setActiveFilter] = useState("all")

  return (
    <div>
      {/* Hero Banner */}
      <section className="relative text-white py-20 bg-gradient-to-r from-[#1a1b5c] via-[#3949ab] to-[#bc0c03]">
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 font-oswald">
            Testimonials & <span className="text-yellow-400">Feedback</span>
          </h1>
          <p className="text-2xl md:text-3xl mb-8 max-w-4xl mx-auto text-yellow-200 font-semibold font-oswald">
            Hear from coaches, parents, and athletes about the NC United impact
          </p>
          <div className="flex items-center justify-center gap-2 text-yellow-300">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-8 h-8 fill-current" />
            ))}
            <span className="ml-2 text-xl font-semibold">Trusted by the wrestling community</span>
          </div>
        </div>
      </section>

      {/* Filter Buttons */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 font-oswald ${
                activeFilter === "all"
                  ? "bg-gradient-to-r from-[#1a1b5c] to-[#1a1b5c]/90 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md hover:scale-105"
              }`}
            >
              All Testimonials
            </button>
            <button
              onClick={() => setActiveFilter("colleges")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 font-oswald ${
                activeFilter === "colleges"
                  ? "bg-gradient-to-r from-[#1a1b5c] to-[#1a1b5c]/90 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md hover:scale-105"
              }`}
            >
              College Coaches
            </button>
            <button
              onClick={() => setActiveFilter("coaches")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 font-oswald ${
                activeFilter === "coaches"
                  ? "bg-gradient-to-r from-[#1a1b5c] to-[#1a1b5c]/90 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md hover:scale-105"
              }`}
            >
              Club & HS Coaches
            </button>
            <button
              onClick={() => setActiveFilter("parents")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 font-oswald ${
                activeFilter === "parents"
                  ? "bg-gradient-to-r from-[#1a1b5c] to-[#1a1b5c]/90 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md hover:scale-105"
              }`}
            >
              Parents
            </button>
            <button
              onClick={() => setActiveFilter("wrestlers")}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 font-oswald ${
                activeFilter === "wrestlers"
                  ? "bg-gradient-to-r from-[#1a1b5c] to-[#1a1b5c]/90 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 hover:shadow-md hover:scale-105"
              }`}
            >
              Wrestlers
            </button>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Video Testimonial - Colleges */}
            {(activeFilter === "all" || activeFilter === "colleges") && (
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
            {(activeFilter === "all" || activeFilter === "parents") && (
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
            {(activeFilter === "all" || activeFilter === "coaches") && (
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
            {(activeFilter === "all" || activeFilter === "colleges") && (
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
            {(activeFilter === "all" || activeFilter === "parents") && (
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

            {/* NHSCA Parent Testimonial - Erin Johnson - Parents */}
            {(activeFilter === "all" || activeFilter === "parents") && (
              <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200">
                <h3 className="text-2xl font-bold text-[#1a1b5c] mb-4 font-oswald">NHSCA Parent Gratitude</h3>
                <div className="bg-white p-6 rounded-lg border-l-4 border-[#1a1b5c] mb-4 shadow-sm">
                  <p className="text-gray-700 italic">
                    "We can't thank NC United enough for everything you are doing. I am so honored! My kids are honored!
                    This weekend was definitely unforgettable!!"
                  </p>
                  <p className="text-gray-500 mt-4 font-medium">— Erin Johnson, NHSCA Duals Parent</p>
                </div>
              </div>
            )}

            {/* No testimonials message for wrestlers filter */}
            {activeFilter === "wrestlers" && (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500 text-lg mb-4">
                  Wrestler testimonials coming soon! Check back for updates from our amazing athletes.
                </p>
                <div className="bg-gradient-to-r from-[#1a1b5c] to-[#bc0c03] text-white p-6 rounded-lg max-w-2xl mx-auto">
                  <h4 className="text-xl font-bold mb-2 font-oswald">Want to Share Your Story?</h4>
                  <p className="mb-4">
                    Are you an NC United wrestler with a story to tell? We'd love to hear about your experience!
                  </p>
                  <Link href="/testimonials/submit">
                    <Button className="bg-white text-[#1a1b5c] hover:bg-gray-100 font-oswald">
                      Submit Your Testimonial
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Submit Testimonial Section */}
      <section className="py-16 bg-gradient-to-r from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-[#1a1b5c] mb-6 font-oswald">Share Your NC United Experience</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#bc0c03] to-[#1a1b5c] mx-auto mb-8 rounded-full"></div>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Have you been impacted by NC United Wrestling? We'd love to hear your story and share it with our community.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Quote className="w-12 h-12 text-[#1a1b5c] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#1a1b5c] mb-2 font-oswald">Parents</h3>
              <p className="text-gray-600">Share how NC United has impacted your experience</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Quote className="w-12 h-12 text-[#bc0c03] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#1a1b5c] mb-2 font-oswald">Coaches</h3>
              <p className="text-gray-600">Tell us about your partnership with NC United</p>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <Quote className="w-12 h-12 text-[#1a1b5c] mx-auto mb-4" />
              <h3 className="text-lg font-bold text-[#1a1b5c] mb-2 font-oswald">Athletes</h3>
              <p className="text-gray-600">Share your NC United wrestling experience</p>
            </Card>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/testimonials/submit">
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#1a1b5c] to-[#1a1b5c]/90 hover:from-[#13144a] hover:to-[#13144a]/90 text-white shadow-md hover:shadow-lg font-oswald"
              >
                Submit Your Feedback
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
