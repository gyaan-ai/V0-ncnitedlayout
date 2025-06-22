import { CommitCardMobile } from "@/components/recruiting/commit-card-mobile"
import { CommitCardSigned } from "@/components/recruiting/commit-card-signed"
import { createClient } from "@/lib/supabase/server"

async function getCommittedAthletes() {
  try {
    const supabase = createClient()

    const { data: athletes, error } = await supabase
      .from("athletes")
      .select("*")
      .eq("is_committed", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error)
      return []
    }

    return athletes || []
  } catch (error) {
    console.error("Error fetching committed athletes:", error)
    return []
  }
}

// Function to get logo URLs based on institution names
function getLogoUrls(athlete: any) {
  const logos = {
    college: "",
    highSchool: "",
    club: "",
    ncUnited: "",
  }

  // Debug info
  console.log("Matching logos for:", {
    name: `${athlete.first_name} ${athlete.last_name}`,
    college: athlete.college_committed,
    highSchool: athlete.high_school,
    club: athlete.wrestling_club,
    ncUnitedTeam: athlete.nc_united_team,
  })

  // College logos - expanded matching
  const collegeName = (athlete.college_committed || "").toLowerCase()
  if (collegeName.includes("north carolina") || collegeName.includes("unc") || collegeName.includes("chapel hill")) {
    logos.college =
      "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/colleges/unc-chapel-hill-1749915543451.png"
  } else if (collegeName.includes("campbell")) {
    logos.college = "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/colleges/campbell-university.png"
  } else if (collegeName.includes("queens")) {
    logos.college = "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/colleges/queens-university.png"
  } else if (collegeName.includes("presbyterian")) {
    logos.college = "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/colleges/presbyterian-college.png"
  } else if (collegeName.includes("nc state") || collegeName.includes("north carolina state")) {
    logos.college = "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/colleges/nc-state-university.png"
  } else if (collegeName.includes("appalachian") || collegeName.includes("app state")) {
    logos.college = "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/colleges/appalachian-state.png"
  }

  // High School logos - expanded matching
  const highSchoolName = (athlete.high_school || "").toLowerCase()
  if (highSchoolName.includes("cardinal gibbons")) {
    logos.highSchool =
      "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/high_schools/cardinal-gibbons-hs-1749915555760.png"
  } else if (highSchoolName.includes("green hope")) {
    logos.highSchool =
      "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/high_schools/green-hope-high-school.png"
  } else if (highSchoolName.includes("corinth holders")) {
    logos.highSchool =
      "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/high_schools/corinth-holders-high-school.png"
  } else if (highSchoolName.includes("cary")) {
    logos.highSchool = "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/high_schools/cary-high-school.png"
  } else if (highSchoolName.includes("apex")) {
    logos.highSchool = "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/high_schools/apex-high-school.png"
  } else if (highSchoolName.includes("wake forest")) {
    logos.highSchool =
      "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/high_schools/wake-forest-high-school.png"
  }

  // Club logos - expanded matching
  const clubName = (athlete.wrestling_club || "").toLowerCase()
  if (clubName.includes("raw")) {
    logos.club = "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/clubs/raw-wrestling-1749915562203.png"
  } else if (clubName.includes("nc united")) {
    logos.club = "/images/nc-united-logo.png"
  } else if (clubName.includes("team roc")) {
    logos.club = "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/clubs/team-roc-wrestling.png"
  } else if (clubName.includes("darkhorse")) {
    logos.club = "https://mywtgp0pq4hutlsp.public.blob.vercel-storage.com/logos/clubs/darkhorse-wrestling.png"
  }

  // NC United team logos - handle case insensitively
  const ncUnitedTeam = (athlete.nc_united_team || "").toLowerCase()
  if (ncUnitedTeam === "blue") {
    logos.ncUnited = "/images/nc-united-blue-logo.png"
  } else if (ncUnitedTeam === "gold") {
    logos.ncUnited = "/images/nc-united-gold-logo.png"
  }

  return logos
}

export default async function CommitsPage() {
  const committedAthletes = await getCommittedAthletes()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">College Commits</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrating our NC United wrestlers who have committed to compete at the collegiate level
          </p>
        </div>

        {committedAthletes.length === 0 ? (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">No Commitments Yet</h3>
            <p className="text-gray-500">Check back soon as our athletes make their college decisions!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {committedAthletes.map((athlete: any) => {
              const logos = getLogoUrls(athlete)

              return (
                <div key={athlete.id}>
                  {/* Mobile Card */}
                  <div className="block md:hidden">
                    <CommitCardMobile
                      id={athlete.id}
                      athleteName={`${athlete.first_name} ${athlete.last_name}`}
                      firstName={athlete.first_name}
                      lastName={athlete.last_name}
                      commitPhotoUrl={athlete.commitment_image_url || athlete.profile_image_url}
                      collegeName={athlete.college_committed}
                      collegeLogo={logos.college}
                      highSchool={athlete.high_school}
                      highSchoolLogo={logos.highSchool}
                      club={athlete.wrestling_club}
                      clubLogo={logos.club}
                      ncUnitedTeam={athlete.nc_united_team}
                      ncUnitedLogo={logos.ncUnited}
                      graduationYear={athlete.graduation_year}
                      weightClass={athlete.weight_class}
                      division={athlete.college_division}
                      instagramHandle={athlete.instagram_handle}
                      achievements={athlete.achievements?.other_achievements || []}
                      aiSummary={athlete.generated_bio || athlete.bio}
                    />
                  </div>

                  {/* Desktop Card */}
                  <div className="hidden md:block">
                    <CommitCardSigned
                      id={athlete.id}
                      athleteName={`${athlete.first_name} ${athlete.last_name}`}
                      firstName={athlete.first_name}
                      lastName={athlete.last_name}
                      commitPhotoUrl={athlete.commitment_image_url || athlete.profile_image_url}
                      collegeName={athlete.college_committed}
                      collegeLogo={logos.college}
                      highSchool={athlete.high_school}
                      highSchoolLogo={logos.highSchool}
                      club={athlete.wrestling_club}
                      clubLogo={logos.club}
                      ncUnitedTeam={athlete.nc_united_team}
                      ncUnitedLogo={logos.ncUnited}
                      graduationYear={athlete.graduation_year}
                      weightClass={athlete.weight_class}
                      division={athlete.college_division}
                      instagramHandle={athlete.instagram_handle}
                      achievements={athlete.achievements?.other_achievements || []}
                      aiSummary={athlete.generated_bio || athlete.bio}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
