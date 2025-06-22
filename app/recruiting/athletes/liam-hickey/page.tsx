import { notFound } from "next/navigation"
import AthletePublicProfile from "../[id]/AthletePublicProfile"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export default async function LiamHickeyProfilePage() {
  try {
    // Look for Liam Hickey specifically
    const { data: athlete, error } = await supabase
      .from("athletes")
      .select("*")
      .ilike("first_name", "liam")
      .ilike("last_name", "hickey")
      .single()

    if (!athlete || error) {
      console.log("Liam Hickey not found:", error)
      notFound()
    }

    console.log("Found Liam Hickey:", {
      name: `${athlete.first_name} ${athlete.last_name}`,
      college: athlete.committed_college || athlete.college_name,
      id: athlete.id,
    })

    return <AthletePublicProfile athlete={athlete} />
  } catch (error) {
    console.error("Error loading Liam Hickey profile:", error)
    notFound()
  }
}

export async function generateMetadata() {
  return {
    title: "Liam Hickey - NC United Wrestling",
    description: "Liam Hickey wrestling profile and achievements.",
  }
}
