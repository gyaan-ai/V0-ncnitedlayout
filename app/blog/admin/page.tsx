"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ChevronLeft, ChevronRight, Edit, Eye, FileText, ImageIcon, Plus, Save, Trash2, Upload, X } from "lucide-react"

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
  status: "draft" | "published"
}

export default function BlogAdminPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [postToDelete, setPostToDelete] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 10

  // New post form state
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    featured_image: "",
    category: "",
    tags: [] as string[],
    status: "draft" as "draft" | "published",
  })
  const [tagInput, setTagInput] = useState("")

  useEffect(() => {
    async function checkAuth() {
      try {
        const supabase = createClient()
        const {
          data: { user },
        } = await supabase.auth.getUser()

        if (user) {
          // In a real app, check if user has admin role
          // For now, we'll just set isAdmin to true
          setIsAuthenticated(true)
          setIsAdmin(true)

          // Fetch posts
          fetchPosts()
        } else {
          router.push("/login?redirect=/blog/admin")
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        router.push("/login?redirect=/blog/admin")
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [router])

  async function fetchPosts() {
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
          status: "published",
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
          status: "published",
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
          status: "published",
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
          status: "published",
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
          status: "published",
        },
        {
          id: "6",
          title: "Summer Training Camp 2025 Announcement",
          slug: "summer-training-camp-2025-announcement",
          excerpt:
            "Registration is now open for our 2025 Summer Training Camp featuring guest clinicians from multiple Division I programs.",
          content: "Draft content here...",
          featured_image: "/placeholder.svg?height=600&width=1200",
          author: "Matt Hickey",
          author_image: "/images/matt-hickey-transparent.jpg",
          published_at: "2025-06-01",
          category: "Announcements",
          tags: ["Training Camp", "Summer", "Registration"],
          reading_time: 2,
          status: "draft",
        },
      ]

      setPosts(mockPosts)
    } catch (error) {
      console.error("Error fetching posts:", error)
    }
  }

  // Filter posts based on active tab and search query
  const filteredPosts = posts.filter((post) => {
    // Filter by tab
    if (activeTab === "published" && post.status !== "published") return false
    if (activeTab === "drafts" && post.status !== "draft") return false

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.category.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
      )
    }

    return true
  })

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const currentPosts = filteredPosts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Handle delete post
  const handleDeletePost = async () => {
    if (!postToDelete) return

    try {
      // In a real app, this would delete from Supabase
      // For now, we'll just filter the posts array
      setPosts(posts.filter((post) => post.id !== postToDelete))
      setShowDeleteDialog(false)
      setPostToDelete(null)
    } catch (error) {
      console.error("Error deleting post:", error)
    }
  }

  // Handle new post form
  const handleNewPostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setNewPost((prev) => ({ ...prev, [name]: value }))
  }

  const handleAddTag = () => {
    if (tagInput.trim() && !newPost.tags.includes(tagInput.trim())) {
      setNewPost((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }))
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setNewPost((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }))
  }

  const handleStatusChange = (value: string) => {
    setNewPost((prev) => ({ ...prev, status: value as "draft" | "published" }))
  }

  const handleCreatePost = async () => {
    try {
      // In a real app, this would create a post in Supabase
      // For now, we'll just add to the posts array
      const newPostWithId: BlogPost = {
        ...newPost,
        id: Date.now().toString(),
        author: "Current User", // In a real app, this would be the current user
        author_image: "/placeholder.svg?height=40&width=40",
        published_at: new Date().toISOString().split("T")[0],
        reading_time: Math.ceil(newPost.content.length / 1000), // Rough estimate
      }

      setPosts((prev) => [newPostWithId, ...prev])
      setShowNewPostForm(false)
      setNewPost({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        featured_image: "",
        category: "",
        tags: [] as string[],
        status: "draft" as "draft" | "published",
      })
    } catch (error) {
      console.error("Error creating post:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a1b5c]"></div>
      </div>
    )
  }

  if (!isAuthenticated || !isAdmin) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Access Denied</h1>
        <p className="text-gray-600 mb-8">You don't have permission to access this page.</p>
        <Button onClick={() => router.push("/login?redirect=/blog/admin")}>Sign In</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <h1 className="text-3xl font-bold font-oswald text-[#1a1b5c] mb-4 md:mb-0">Blog Administration</h1>
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <Button
              onClick={() => setShowNewPostForm(true)}
              className="bg-[#1a1b5c] hover:bg-[#13144a] flex items-center"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Post
            </Button>
            <Button variant="outline" onClick={() => router.push("/blog")} className="flex items-center">
              <Eye className="mr-2 h-4 w-4" />
              View Blog
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle>Blog Posts</CardTitle>
            <CardDescription>Manage your blog posts, create new content, and track performance.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
              <Tabs defaultValue="all" className="w-full sm:w-auto" onValueChange={setActiveTab}>
                <TabsList>
                  <TabsTrigger value="all">All Posts</TabsTrigger>
                  <TabsTrigger value="published">Published</TabsTrigger>
                  <TabsTrigger value="drafts">Drafts</TabsTrigger>
                </TabsList>
              </Tabs>
              <div className="w-full sm:w-64">
                <Input
                  type="text"
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            {currentPosts.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {currentPosts.map((post) => (
                      <TableRow key={post.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            <div className="w-10 h-10 rounded overflow-hidden mr-3 flex-shrink-0">
                              <ImageIcon
                                src={post.featured_image || "/placeholder.svg"}
                                alt={post.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="truncate max-w-xs">{post.title}</div>
                          </div>
                        </TableCell>
                        <TableCell>{post.category}</TableCell>
                        <TableCell>{formatDate(post.published_at)}</TableCell>
                        <TableCell>
                          <Badge variant={post.status === "published" ? "default" : "outline"}>
                            {post.status === "published" ? "Published" : "Draft"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button variant="ghost" size="sm" onClick={() => router.push(`/blog/${post.slug}`)}>
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => router.push(`/blog/admin/edit/${post.id}`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                  onClick={() => {
                                    setPostToDelete(post.id)
                                    setShowDeleteDialog(true)
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the post.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel onClick={() => setPostToDelete(null)}>Cancel</AlertDialogCancel>
                                  <AlertDialogAction onClick={handleDeletePost} className="bg-red-500 hover:bg-red-600">
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-1">No posts found</h3>
                <p className="text-gray-500 mb-4">
                  {searchQuery
                    ? "Try adjusting your search query."
                    : activeTab === "drafts"
                      ? "You don't have any draft posts yet."
                      : activeTab === "published"
                        ? "You don't have any published posts yet."
                        : "You don't have any posts yet."}
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setActiveTab("all")
                    setShowNewPostForm(true)
                  }}
                >
                  Create Your First Post
                </Button>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-6">
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
          </CardContent>
        </Card>
      </div>

      {/* New Post Dialog */}
      <Dialog open={showNewPostForm} onOpenChange={setShowNewPostForm}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Create New Post</DialogTitle>
            <DialogDescription>Fill in the details below to create a new blog post.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={newPost.title}
                  onChange={handleNewPostChange}
                  placeholder="Enter post title"
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug</Label>
                <Input
                  id="slug"
                  name="slug"
                  value={newPost.slug}
                  onChange={handleNewPostChange}
                  placeholder="enter-post-slug"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  name="excerpt"
                  value={newPost.excerpt}
                  onChange={handleNewPostChange}
                  placeholder="Brief summary of the post"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={newPost.content}
                  onChange={handleNewPostChange}
                  placeholder="Full post content (supports HTML)"
                  rows={8}
                />
              </div>

              <div>
                <Label htmlFor="featured_image">Featured Image URL</Label>
                <div className="flex space-x-2">
                  <Input
                    id="featured_image"
                    name="featured_image"
                    value={newPost.featured_image}
                    onChange={handleNewPostChange}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1"
                  />
                  <Button variant="outline" className="flex-shrink-0">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select
                  name="category"
                  onValueChange={(value) => handleNewPostChange({ target: { name: "category", value } } as any)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Women's Wrestling">Women's Wrestling</SelectItem>
                    <SelectItem value="Training">Training</SelectItem>
                    <SelectItem value="Tournament Results">Tournament Results</SelectItem>
                    <SelectItem value="College Recruiting">College Recruiting</SelectItem>
                    <SelectItem value="Announcements">Announcements</SelectItem>
                    <SelectItem value="Coaching">Coaching</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="tags">Tags</Label>
                <div className="flex space-x-2">
                  <Input
                    id="tags"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Add a tag"
                    className="flex-1"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        handleAddTag()
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline" className="flex-shrink-0">
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {newPost.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTag(tag)} />
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={newPost.status} onValueChange={handleStatusChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewPostForm(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreatePost} className="bg-[#1a1b5c] hover:bg-[#13144a]">
              <Save className="h-4 w-4 mr-2" />
              Create Post
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
