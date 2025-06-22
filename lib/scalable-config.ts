// Recommended configuration for 5K users
export const SCALABILITY_CONFIG = {
  database: {
    service: "Neon PostgreSQL",
    tier: "Pro ($19/month)",
    capacity: "Up to 100K users",
    features: ["Auto-scaling", "Connection pooling", "Read replicas"],
  },

  storage: {
    service: "Vercel Blob",
    tier: "Pro ($20/month)",
    capacity: "1TB storage, unlimited bandwidth",
    features: ["Global CDN", "Image optimization", "Fast uploads"],
  },

  cache: {
    service: "Vercel KV (Upstash Redis)",
    tier: "Pro ($20/month)",
    capacity: "100K requests/day",
    features: ["Global edge cache", "Sub-ms latency", "Auto-scaling"],
  },

  hosting: {
    service: "Vercel",
    tier: "Pro ($20/month)",
    capacity: "Unlimited users",
    features: ["Global CDN", "Edge functions", "Analytics"],
  },
}

// Total monthly cost for 5K users: ~$80/month
// Cost per user: ~$0.016/month (very affordable!)
