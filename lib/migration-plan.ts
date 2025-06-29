// Migration plan that preserves your hard work
export const MIGRATION_PLAN = {
  // KEEP - No changes needed
  PRESERVE_COMPLETELY: [
    "app/national-team/page.tsx", // Your masterpiece
    "app/tournaments/nhsca-2025/page.tsx", // Tournament pages
    "app/tournaments/ucd-2024/page.tsx",
    "app/components/header.tsx", // Navigation
    "app/components/footer.tsx",
    "app/our-team/page.tsx", // Coach profiles
    "app/testimonials/page.tsx",
    "public/images/*", // All your images
  ],

  // CLEAN DATABASE - Only affects backend
  REBUILD_BACKEND: [
    "lib/athletes-db.ts", // Replace with clean DB
    "app/api/athletes/*", // Clean API routes
    "app/recruiting/*", // Athlete profiles
    "components/recruiting/*", // Commit cards
  ],

  // DELETE - Debug/migration files
  REMOVE_COMPLETELY: [
    "scripts/*", // 67 migration files
    "app/debug-*", // All debug routes
    "app/test-*", // Test pages
    "app/api/debug-*", // Debug APIs
  ],
}
