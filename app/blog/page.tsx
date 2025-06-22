"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, ChevronLeft, ChevronRight, Clock, Filter, Search, Tag } from "lucide-react"

// Types for blog posts
type BlogPost = {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  featured_image: string
  author: string
  author_image?: string
  published_at: string
  category: string
  tags: string[]
  reading_time: number
}

export default function BlogPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [featuredPost, setFeaturedPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 6

  const category = searchParams.get("category") || "all"
  const tag = searchParams.get("tag") || ""
  const page = Number.parseInt(searchParams.get("page") || "1")

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      try {
        // In a real app, this would fetch from Supabase
        // For now, we'll use mock data
        const mockPosts: BlogPost[] = [
          {
            id: "1",
            title: "NC United Gold: Empowering Champions, Elevating Women's Wrestling",
            slug: "nc-united-gold-empowering-champions",
            excerpt:
              "NC United Gold is elevating women's wrestling in North Carolina—uniting elite athletes across high school, college, and beyond through comprehensive freestyle training programs.",
            content: "Full content here...",
            featured_image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NC%20Gold.jpg-mJBIjUqSwNi0Xx2xxj6Ntse9sqzxm1.jpeg",
            author: "Matt Hickey",
            author_image: "/images/matt-hickey-transparent.jpg",
            published_at: "2025-04-23",
            category: "Women's Wrestling",
            tags: ["United Gold", "Women's Wrestling", "Freestyle"],
            reading_time: 4,
          },
          {
            id: "2",
            title: "Iron Sharpens Iron: NC United Gold's Inaugural Practice",
            slug: "iron-sharpens-iron-nc-united-gold",
            excerpt:
              "NC United Gold kicked off its 2025 season with an elite women's freestyle practice at Greensboro College, uniting high school and college athletes for intensive training.",
            content: "Full content here...",
            featured_image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-06-04%20at%2012.23.55%E2%80%AFPM-4F5Z63TW7egfxA5JNC2Wv3LBJvXMmy.png",
            author: "Colton Palmer",
            author_image: "/images/colton-palmer-headshot.jpg",
            published_at: "2025-04-29",
            category: "Training",
            tags: ["United Gold", "Women's Wrestling", "Practice"],
            reading_time: 5,
          },
          {
            id: "3",
            title: "United Gold Builds Momentum: Second Women's Freestyle Practice",
            slug: "united-gold-builds-momentum",
            excerpt:
              "NC United Gold's May 10th women's freestyle session at NC State delivered high-level technical drilling, elite mentorship, and fresh talent—cementing our commitment to excellence.",
            content: "Full content here...",
            featured_image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-06-04%20at%2012.18.53%E2%80%AFPM-G1PGhXq8f0I0Lg5e1FpaoLvNJ3ixoU.png",
            author: "Veronica Carlson",
            author_image: "/images/veronica-carlson-headshot.jpg",
            published_at: "2025-05-14",
            category: "Women's Wrestling",
            tags: ["United Gold", "Women's Wrestling", "NC State"],
            reading_time: 3,
          },
          {
            id: "4",
            title: "Ultimate Club Duals 2024: NC United Finishes 2nd in Elite Competition",
            slug: "ultimate-club-duals-2024-recap",
            excerpt:
              "NC United Wrestling secured an impressive 2nd place finish at the 2024 Ultimate Club Duals, with standout performances from Brock Sullivan and Everest Ouellette who both went undefeated.",
            content: "Full content here...",
            featured_image: "/images/ucd-team-clean.png",
            author: "Michael Macchiavello",
            author_image: "/images/michael-macchiavello-headshot.jpg",
            published_at: "2024-12-18",
            category: "Tournament Results",
            tags: ["Ultimate Club Duals", "Tournament", "Results"],
            reading_time: 6,
          },
          {
            id: "5",
            title: "NHSCA 2025 National Duals: NC United's Historic Performance",
            slug: "nhsca-2025-national-duals-recap",
            excerpt:
              "NC United made history at the 2025 NHSCA National Duals with our strongest showing yet, highlighted by breakthrough performances from our rising stars.",
            content: "Full content here...",
            featured_image: "/images/nhsca-team-photo-2025.jpg",
            author: "Matt Hickey",
            author_image: "/images/matt-hickey-transparent.jpg",
            published_at: "2025-03-31",
            category: "Tournament Results",
            tags: ["NHSCA", "National Duals", "Tournament"],
            reading_time: 7,
          },
          {
            id: "6",
            title: "College Recruiting: How NC United Is Changing the Game",
            slug: "college-recruiting-changing-the-game",
            excerpt:
              "Our innovative approach to college recruiting is opening doors for North Carolina wrestlers at all levels, with record numbers of commitments to Division I programs.",
            content: "Full content here...",
            featured_image: "/placeholder.svg?height=600&width=1200",
            author: "Araad Fisher",
            author_image: "/images/araad-fisher-headshot.jpg",
            published_at: "2025-02-15",
            category: "College Recruiting",
            tags: ["Recruiting", "College", "Commitments"],
            reading_time: 5,
          },
          {
            id: "7",
            title: "Training Camp Spotlight: Summer Intensive 2024",
            slug: "training-camp-spotlight-summer-2024",
            excerpt:
              "Our 2024 Summer Intensive Training Camp brought together 80+ wrestlers for a transformative week of technical development, conditioning, and mental preparation.",
            content: "Full content here...",
            featured_image: "/placeholder.svg?height=600&width=1200",
            author: "Colton Palmer",
            author_image: "/images/colton-palmer-headshot.jpg",
            published_at: "2024-08-10",
            category: "Training",
            tags: ["Training Camp", "Summer", "Development"],
            reading_time: 4,
          },
        ]

        // Sort by date (newest first)
        mockPosts.sort((a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime())

        // Set the first post as featured
        setFeaturedPost(mockPosts[0])

        // Filter remaining posts
        const filteredPosts = mockPosts.slice(1).filter((post) => {
          // Filter by category if not "all"
          if (category !== "all" && post.category !== category) {
            return false
          }

          // Filter by tag if provided
          if (tag && !post.tags.includes(tag)) {
            return false
          }

          // Filter by search query
          if (
            searchQuery &&
            !post.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
            !post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
          ) {
            return false
          }

          return true
        })

        setPosts(filteredPosts)
      } catch (error) {
        console.error("Error fetching blog posts:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [category, tag, searchQuery, page])

  // Get all unique categories from posts
  const categories = ["all", ...Array.from(new Set(posts.map((post) => post.category)))]

  // Get all unique tags from posts
  const tags = Array.from(new Set(posts.flatMap((post) => post.tags)))

  // Calculate pagination
  const totalPages = Math.ceil(posts.length / postsPerPage)
  const currentPosts = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Featured Post */}
      {featuredPost && (
        <section className="relative bg-gradient-to-b from-[#1a1b5c] to-[#13144a] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <div className="flex items-center space-x-2 mb-4">
                  <Badge className="bg-[#bc0c03] hover:bg-[#a00b03] text-white border-0">Featured</Badge>
                  <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-0">{featuredPost.category}</Badge>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-oswald mb-4 leading-tight">
                  {featuredPost.title}
                </h1>
                <p className="text-lg text-gray-200 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                      <img
                        src={featuredPost.author_image || "/placeholder.svg?height=40&width=40&query=person"}
                        alt={featuredPost.author}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-sm font-medium">{featuredPost.author}</span>
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>{formatDate(featuredPost.published_at)}</span>
                  </div>
                  <div className="flex items-center text-gray-300 text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    <span>{featuredPost.reading_time} min read</span>
                  </div>
                </div>
                <Button
                  onClick={() => router.push(`/blog/${featuredPost.slug}`)}
                  className="bg-[#bc0c03] hover:bg-[#a00b03] text-white font-medium"
                >
                  Read Article
                </Button>
              </div>
              <div className="order-1 lg:order-2">
                <div className="relative rounded-lg overflow-hidden shadow-xl">
                  <img
                    src={featuredPost.featured_image || "/placeholder.svg"}
                    alt={featuredPost.title}
                    className="w-full h-[300px] md:h-[400px] object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Blog Content Section */}
      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <h2 className="text-3xl font-bold font-oswald text-[#1a1b5c] mb-4 md:mb-0">Latest Articles</h2>
            <div className="w-full md:w-auto flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Button variant="outline" className="flex items-center" onClick={() => router.push("/blog/categories")}>
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <Tabs defaultValue={activeCategory} className="mb-8" onValueChange={setActiveCategory}>
            <TabsList className="w-full sm:w-auto overflow-x-auto flex-nowrap">
              {categories.map((cat) => (
                <TabsTrigger key={cat} value={cat} className="whitespace-nowrap">
                  {cat === "all" ? "All Categories" : cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          {/* Blog Posts Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a1b5c]"></div>
            </div>
          ) : currentPosts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {currentPosts.map((post) => (
                  <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={post.featured_image || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-0">{post.category}</Badge>
                      </div>
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{formatDate(post.published_at)}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{post.reading_time} min read</span>
                        </div>
                      </div>
                      <CardTitle className="text-xl font-bold font-oswald text-[#1a1b5c] line-clamp-2">
                        {post.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between items-center pt-0">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full overflow-hidden mr-2">
                          <img
                            src={post.author_image || "/placeholder.svg?height=32&width=32&query=person"}
                            alt={post.author}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-sm font-medium">{post.author}</span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => router.push(`/blog/${post.slug}`)}
                        className="text-[#bc0c03] hover:text-[#a00b03] hover:bg-red-50"
                      >
                        Read More
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  {Array.from({ length: totalPages }).map((_, i) => (
                    <Button
                      key={i}
                      variant={currentPage === i + 1 ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(i + 1)}
                      className={currentPage === i + 1 ? "bg-[#1a1b5c] hover:bg-[#13144a]" : ""}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No articles found</h3>
              <p className="text-gray-500 mb-6">We couldn't find any articles matching your criteria.</p>
              <Button
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("all")
                  router.push("/blog")
                }}
              >
                View All Articles
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Popular Tags Section */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center mb-6">
            <Tag className="w-5 h-5 text-[#1a1b5c] mr-2" />
            <h3 className="text-2xl font-bold font-oswald text-[#1a1b5c]">Popular Topics</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="px-3 py-1 text-sm cursor-pointer hover:bg-blue-50"
                onClick={() => router.push(`/blog?tag=${tag}`)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-[#1a1b5c] to-[#13144a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold font-oswald mb-4">Want to Contribute to Our Blog?</h2>
          <p className="text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            Share your wrestling insights, tournament experiences, or coaching tips with the NC United community.
          </p>
          <Button
            onClick={() => router.push("/blog/submit")}
            className="bg-[#bc0c03] hover:bg-[#a00b03] text-white font-medium"
          >
            Submit an Article
          </Button>
        </div>
      </section>
    </div>
  )
}
