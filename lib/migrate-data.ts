// One-time migration script to move existing data
import { DB } from "./database-clean"

export async function migrateExistingData() {
  // This would run once to move your current athlete data
  // to the clean schema

  console.log("🚀 Starting data migration...")

  // Example: Migrate Liam Hickey
  const liam = await DB.createAthlete({
    first_name: "Liam",
    last_name: "Hickey",
    weight_class: 132,
    graduation_year: 2025,
    high_school: "Providence High School",
    nc_united_team: "Blue",
    is_committed: true,
    college_committed: "University of North Carolina",
    ai_generated_headline: "Elite 132lb wrestler committed to UNC",
    ai_generated_bio: "Liam Hickey is a standout wrestler...",
    achievements: {
      nhsca: [{ year: 2025, placement: "3rd", weight_class: "132" }],
    },
  })

  console.log("✅ Migration complete!")
  return liam
}
