"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export default function EditProfile() {
  const [status, setStatus] = useState("Checking your profile...")
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function redirectToCorrectProfile() {
      try {
        console.log("🔍 Profile edit redirect starting...")
        setStatus("🔍 Checking authentication...")

        const { data: userData, error: userError } = await supabase.auth.getUser()

        if (userError || !userData?.user) {
          console.log("❌ No user found, redirecting to login")
          setStatus("❌ Not logged in, redirecting to login...")
          setTimeout(() => {
            router.push("/login?redirect=/profile/edit")
          }, 1000)
          return
        }

        console.log("✅ User found:", userData.user.email)
        setStatus("👤 Loading your profile...")

        // Get the user's profile to determine their role
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", userData.user.id)
          .single()

        console.log("📊 Profile query result:", { profileData, profileError })

        if (profileError) {
          console.error("Profile error:", profileError)
          if (profileError.code === "PGRST116") {
            // No profile found
            setStatus("⚠️ No profile found, redirecting to onboarding...")
            setTimeout(() => {
              router.push("/onboarding")
            }, 1000)
          } else {
            setStatus("❌ Error loading profile, redirecting to dashboard...")
            setTimeout(() => {
              router.push("/dashboard")
            }, 1000)
          }
          return
        }

        // Redirect based on role
        const role = profileData?.role
        console.log("🎯 Found role:", role)
        setStatus(`🎯 Found ${role} profile, redirecting...`)

        setTimeout(() => {
          switch (role) {
            case "wrestler":
              router.push("/profile/edit/wrestler")
              break
            case "parent":
            case "college_coach":
            case "high_school_coach":
            case "club_coach":
            default:
              // For now, all non-wrestler roles go to the general profile edit
              router.push("/profile/edit/general")
              break
          }
        }, 1000)
      } catch (error) {
        console.error("Redirect error:", error)
        setStatus("❌ Error occurred, redirecting to login...")
        setTimeout(() => {
          router.push("/login")
        }, 1000)
      }
    }

    redirectToCorrectProfile()
  }, [router, supabase])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center justify-center p-8 space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-center text-gray-600">{status}</p>
          <p className="text-xs text-gray-400">This should only take a moment...</p>
        </CardContent>
      </Card>
    </div>
  )
}
