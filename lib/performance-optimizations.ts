// Performance optimizations for 5K users
export const PERFORMANCE_OPTIMIZATIONS = {
  caching: {
    // Cache tournament data for 1 hour
    tournamentData: "1 hour TTL",
    // Cache wrestler profiles for 24 hours
    wrestlerProfiles: "24 hour TTL",
    // Cache match results for 1 week
    matchResults: "1 week TTL",
  },

  database: {
    // Use connection pooling
    connectionPooling: true,
    // Index frequently queried fields
    indexes: ["wrestler_id", "tournament_id", "weight_class"],
    // Use read replicas for queries
    readReplicas: true,
  },

  images: {
    // Optimize images automatically
    optimization: "automatic",
    // Use WebP format
    format: "webp",
    // Lazy load images
    lazyLoading: true,
  },
}
