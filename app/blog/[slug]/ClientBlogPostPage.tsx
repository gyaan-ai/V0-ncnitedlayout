"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  ThumbsUp,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Mail,
} from "lucide-react"

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
  author_bio?: string
  published_at: string
  category: string
  tags: string[]
  reading_time: number
}

export default function ClientBlogPostPage() {
  const router = useRouter()
  const params = useParams()
  const slug = params.slug as string

  const [post, setPost] = useState<BlogPost | null>(null)
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [showShareOptions, setShowShareOptions] = useState(false)
  const [likes, setLikes] = useState(0)
  const [hasLiked, setHasLiked] = useState(false)

  useEffect(() => {
    async function fetchPost() {
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
            content: `<p>NC United Gold is revolutionizing women's wrestling in North Carolina through a comprehensive approach that unites athletes across all levels—from high school competitors to collegiate stars and beyond.</p>
            
            <h2>A Vision for Women's Wrestling</h2>
            <p>When we launched NC United Gold, our vision was clear: create an elite training environment that elevates women's freestyle wrestling throughout North Carolina. The program addresses a critical gap in our wrestling ecosystem by providing high-level technical instruction, competitive opportunities, and mentorship specifically designed for female athletes.</p>
            
            <p>"We've seen tremendous growth in women's wrestling at the high school level, but there was a clear need for more advanced training opportunities," explains Veronica Carlson, NC United Gold's lead coach and former national team member. "Our goal is to build a pipeline that helps these athletes reach their full potential—whether that's competing for state championships, earning college scholarships, or pursuing international success."</p>
            
            <h2>Elite Training Structure</h2>
            <p>The program operates through monthly training sessions hosted at premier college facilities across the state, including NC State, UNC Greensboro, and Queens University. Each practice brings together:</p>
            
            <ul>
              <li>High school state champions and placers</li>
              <li>Current collegiate wrestlers from programs across the region</li>
              <li>Post-collegiate athletes continuing their competitive careers</li>
              <li>Guest clinicians with national and international experience</li>
            </ul>
            
            <p>This multi-generational approach creates a powerful learning environment where knowledge and techniques are passed down, relationships are formed, and a true community develops.</p>
            
            <h2>Beyond Technique: The Complete Athlete</h2>
            <p>NC United Gold goes beyond mat skills to develop complete athletes. The program incorporates:</p>
            
            <ul>
              <li>Sport-specific strength and conditioning guidance</li>
              <li>Mental performance training</li>
              <li>Nutritional education tailored for wrestlers</li>
              <li>College recruiting support and guidance</li>
            </ul>
            
            <p>"We're building champions, but we're also building leaders," says Matt Hickey, NC United's founder. "The skills these young women develop through wrestling—discipline, resilience, work ethic—will serve them throughout their lives, regardless of where their paths lead."</p>
            
            <h2>Early Success and Future Growth</h2>
            <p>Though still in its inaugural year, NC United Gold is already showing impressive results. Program participants have secured multiple state championships, All-American honors at national tournaments, and college scholarship opportunities.</p>
            
            <p>Looking ahead, plans include:</p>
            
            <ul>
              <li>Expanding to bi-weekly practices during peak season</li>
              <li>Organizing team travel to major national competitions</li>
              <li>Developing a youth component to start the pipeline earlier</li>
              <li>Creating coaching education opportunities focused on women's wrestling</li>
            </ul>
            
            <p>"This is just the beginning," Carlson emphasizes. "The talent in North Carolina is incredible, and with the right support system, there's no limit to what these athletes can achieve."</p>
            
            <h2>Join the Movement</h2>
            <p>NC United Gold welcomes female wrestlers of all levels who are committed to excellence and growth. For information about upcoming practices, eligibility, or how to support the program, contact us through the NC United website or follow us on social media for regular updates.</p>
            
            <p>Together, we're not just developing champions—we're changing the landscape of women's wrestling in North Carolina.</p>`,
            featured_image:
              "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/NC%20Gold.jpg-mJBIjUqSwNi0Xx2xxj6Ntse9sqzxm1.jpeg",
            author: "Matt Hickey",
            author_image: "/images/matt-hickey-transparent.jpg",
            author_bio:
              "Matt Hickey is the founder of NC United Wrestling and has over 20 years of coaching experience at the high school, club, and collegiate levels.",
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
            author_bio:
              "Colton Palmer is the head coach of NC United Blue and a former Division I All-American wrestler.",
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
            author_bio:
              "Veronica Carlson is the lead coach for NC United Gold and a former national team member with extensive coaching experience.",
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
            author_bio:
              "Michael Macchiavello is a coach with NC United and former NCAA Champion and World Team member.",
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
            author_bio:
              "Matt Hickey is the founder of NC United Wrestling and has over 20 years of coaching experience at the high school, club, and collegiate levels.",
            published_at: "2025-03-31",
            category: "Tournament Results",
            tags: ["NHSCA", "National Duals", "Tournament"],
            reading_time: 7,
          },
        ]

        // Find the post with matching slug
        const foundPost = mockPosts.find((p) => p.slug === slug)

        if (foundPost) {
          setPost(foundPost)

          // Find related posts (same category or tags)
          const related = mockPosts
            .filter(
              (p) =>
                p.id !== foundPost.id &&
                (p.category === foundPost.category || p.tags.some((tag) => foundPost.tags.includes(tag))),
            )
            .slice(0, 3)

          setRelatedPosts(related)

          // Set random likes count
          setLikes(Math.floor(Math.random() * 50) + 10)
        } else {
          router.push("/blog")
        }
      } catch (error) {
        console.error("Error fetching blog post:", error)
        router.push("/blog")
      } finally {
        setLoading(false)
      }
    }

    if (slug) {
      fetchPost()
    }
  }, [slug, router])

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Handle like
  const handleLike = () => {
    if (!hasLiked) {
      setLikes((prev) => prev + 1)
      setHasLiked(true)
    } else {
      setLikes((prev) => prev - 1)
      setHasLiked(false)
    }
  }

  // Share functions
  const shareUrl = typeof window !== "undefined" ? window.location.href : ""
  const shareTitle = post?.title || "NC United Wrestling Blog"

  const shareOnFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
      "_blank",
    )
  }

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank")
  }

  const shareByEmail = () => {
    window.location.href = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`Check out this article: ${shareUrl}`)}`
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a1b5c]"></div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-8">The article you're looking for doesn't exist or has been moved.</p>
        <Button onClick={() => router.push("/blog")}>Back to Blog</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-[#1a1b5c] to-[#13144a] text-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push("/blog")}
            className="text-gray-300 hover:text-white mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>

          <div className="flex items-center space-x-2 mb-4">
            <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-0">{post.category}</Badge>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-oswald mb-6 leading-tight">{post.title}</h1>

          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-300">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden mr-3">
                <img
                  src={post.author_image || "/placeholder.svg?height=40&width=40&query=person"}
                  alt={post.author}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-medium">{post.author}</span>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2" />
              <span>{formatDate(post.published_at)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              <span>{post.reading_time} min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      <div className="relative -mt-12 md:-mt-16 mb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src={post.featured_image || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-[300px] md:h-[400px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-3/4">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map((tag) => (
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

            {/* Article Body */}
            <article className="prose prose-lg max-w-none mb-8">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </article>

            {/* Interaction Bar */}
            <div className="flex items-center justify-between border-t border-b py-4 mb-8">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLike}
                  className={`flex items-center ${hasLiked ? "text-red-500" : "text-gray-600"}`}
                >
                  <ThumbsUp className={`mr-1 h-5 w-5 ${hasLiked ? "fill-current" : ""}`} />
                  <span>{likes}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => router.push(`/blog/${post.slug}#comments`)}
                  className="flex items-center text-gray-600"
                >
                  <MessageSquare className="mr-1 h-5 w-5" />
                  <span>Comments</span>
                </Button>
              </div>
              <div className="relative">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowShareOptions(!showShareOptions)}
                  className="flex items-center text-gray-600"
                >
                  <Share2 className="mr-1 h-5 w-5" />
                  <span>Share</span>
                </Button>

                {showShareOptions && (
                  <Card className="absolute right-0 mt-2 z-10 w-48">
                    <CardContent className="p-2">
                      <div className="flex flex-col space-y-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={shareOnFacebook}
                          className="flex items-center justify-start text-blue-600"
                        >
                          <Facebook className="mr-2 h-4 w-4" />
                          <span>Facebook</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={shareOnTwitter}
                          className="flex items-center justify-start text-blue-400"
                        >
                          <Twitter className="mr-2 h-4 w-4" />
                          <span>Twitter</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={shareOnLinkedIn}
                          className="flex items-center justify-start text-blue-700"
                        >
                          <Linkedin className="mr-2 h-4 w-4" />
                          <span>LinkedIn</span>
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={shareByEmail}
                          className="flex items-center justify-start text-gray-600"
                        >
                          <Mail className="mr-2 h-4 w-4" />
                          <span>Email</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Author Bio */}
            <div className="bg-gray-50 rounded-lg p-6 mb-12">
              <div className="flex items-start">
                <Avatar className="h-16 w-16 mr-4">
                  <AvatarImage
                    src={post.author_image || "/placeholder.svg?height=64&width=64&query=person"}
                    alt={post.author}
                  />
                  <AvatarFallback>
                    {post.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-bold mb-2">About {post.author}</h3>
                  <p className="text-gray-600 mb-4">
                    {post.author_bio || `${post.author} is a contributor to the NC United Wrestling blog.`}
                  </p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/blog?author=${encodeURIComponent(post.author)}`)}
                  >
                    View All Articles
                  </Button>
                </div>
              </div>
            </div>

            {/* Comments Section */}
            <div id="comments" className="mb-8">
              <h3 className="text-2xl font-bold font-oswald text-[#1a1b5c] mb-4">Comments</h3>
              <p className="text-gray-600 mb-4">Comments are coming soon! Check back later to join the conversation.</p>
              <Button disabled>Leave a Comment</Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="md:w-1/4">
            {/* Related Articles */}
            <div className="mb-8">
              <h3 className="text-xl font-bold font-oswald text-[#1a1b5c] mb-4">Related Articles</h3>
              <div className="space-y-4">
                {relatedPosts.length > 0 ? (
                  relatedPosts.map((relatedPost) => (
                    <div key={relatedPost.id} className="group">
                      <Link href={`/blog/${relatedPost.slug}`} className="block">
                        <div className="relative h-32 rounded-lg overflow-hidden mb-2">
                          <img
                            src={relatedPost.featured_image || "/placeholder.svg"}
                            alt={relatedPost.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <h4 className="font-medium text-[#1a1b5c] group-hover:text-[#bc0c03] transition-colors duration-200 line-clamp-2">
                          {relatedPost.title}
                        </h4>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <Calendar className="w-3 h-3 mr-1" />
                          <span>{formatDate(relatedPost.published_at)}</span>
                        </div>
                      </Link>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No related articles found.</p>
                )}
              </div>
            </div>

            {/* Categories */}
            <div className="mb-8">
              <h3 className="text-xl font-bold font-oswald text-[#1a1b5c] mb-4">Categories</h3>
              <div className="space-y-2">
                <Link href="/blog?category=Women's Wrestling" className="block text-gray-700 hover:text-[#bc0c03]">
                  Women's Wrestling
                </Link>
                <Link href="/blog?category=Training" className="block text-gray-700 hover:text-[#bc0c03]">
                  Training
                </Link>
                <Link href="/blog?category=Tournament Results" className="block text-gray-700 hover:text-[#bc0c03]">
                  Tournament Results
                </Link>
                <Link href="/blog?category=College Recruiting" className="block text-gray-700 hover:text-[#bc0c03]">
                  College Recruiting
                </Link>
                <Link href="/blog" className="block text-[#bc0c03] font-medium mt-2">
                  View All Categories
                </Link>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-bold text-[#1a1b5c] mb-2">Stay Updated</h3>
              <p className="text-sm text-gray-600 mb-4">
                Get the latest NC United news and articles delivered to your inbox.
              </p>
              <Button className="w-full bg-[#1a1b5c] hover:bg-[#13144a]" onClick={() => router.push("/newsletter")}>
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
