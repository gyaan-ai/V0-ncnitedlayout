import ClientBlogPostPage from "./ClientBlogPostPage"

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

// Generate static params for all blog posts
export async function generateStaticParams() {
  // Mock blog posts data - same as used in the component
  const mockPosts = [
    {
      id: "1",
      slug: "nc-united-gold-empowering-champions",
    },
    {
      id: "2",
      slug: "iron-sharpens-iron-nc-united-gold",
    },
    {
      id: "3",
      slug: "united-gold-builds-momentum",
    },
    {
      id: "4",
      slug: "ultimate-club-duals-2024-recap",
    },
    {
      id: "5",
      slug: "nhsca-2025-national-duals-recap",
    },
  ]

  return mockPosts.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage() {
  return <ClientBlogPostPage />
}
