"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react"

export function ProfileEditRedirect() {
  const [status, setStatus] = useState("Checking your profile...")
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function redirectToCorrectProfile() {
      try {
        setStatus("🔍 Checking authentication...")

        const { data: userData, error: userError } = await supabase.auth.getUser()

        if (userError || !userData?.user) {
          setStatus("❌ Not logged in, redirecting to login...")
          router.push("/login?redirect=/profile/edit")
          return
        }

        setStatus("👤 Loading your profile...")

        // Get the user's profile to determine their role
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", userData.user.id)
          .single()

        if (profileError) {
          console.error("Profile error:", profileError)
          setStatus("⚠️ Profile not found, redirecting to onboarding...")
          router.push("/onboarding")
          return
        }

        // Redirect based on role
        const role = profileData?.role
        setStatus(`🎯 Found ${role} profile, redirecting...`)

        switch (role) {
          case "wrestler":
            router.push("/profile/edit/wrestler")
            break
          case "parent":
          case "college-coach":
          case "high-school-coach":
          case "club-coach":
          default:
            // For now, all non-wrestler roles go to the general profile edit
            router.push("/profile/edit/general")
            break
        }
      } catch (error) {
        console.error("Redirect error:", error)
        setStatus("❌ Error occurred, redirecting to login...")
        router.push("/login")
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
        </CardContent>
      </Card>
    </div>
  )
}
