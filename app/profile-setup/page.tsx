"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, ArrowRight, CheckCircle } from "lucide-react"

export default function ProfileSetupPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function loadUserAndProfile() {
      try {
        // Get the current user
        const {
          data: { user },
          error: userError,
        } = await supabase.auth.getUser()

        if (userError || !user) {
          console.error("Error loading user:", userError)
          router.push("/login")
          return
        }

        setUser(user)

        // Get the user's profile
        const { data: profile, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single()

        if (profileError && profileError.code !== "PGRST116") {
          console.error("Error loading profile:", profileError)
        }

        setProfile(profile || null)
        setLoading(false)

        // If they have a complete profile, redirect to dashboard
        if (profile && profile.onboarding_completed) {
          router.push("/dashboard")
        }
      } catch (error) {
        console.error("Unexpected error:", error)
        setLoading(false)
      }
    }

    loadUserAndProfile()
  }, [router, supabase])

  const handleStartOnboarding = () => {
    router.push("/onboarding")
  }

  const handleContinueOnboarding = () => {
    if (!profile || !profile.role) {
      router.push("/onboarding")
      return
    }

    // Route based on role and how far they've gotten
    switch (profile.role) {
      case "wrestler":
        router.push("/onboarding/wrestler")
        break
      case "parent":
        router.push("/onboarding/parent")
        break
      case "coach":
      case "high_school_coach":
      case "club_coach":
      case "college_coach":
        router.push("/onboarding/coach")
        break
      default:
        router.push("/onboarding")
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-lg">Loading your profile...</p>
        </div>
      </div>
    )
  }

  // Calculate profile completion percentage
  const getCompletionPercentage = () => {
    if (!profile) return 0

    // Basic profile exists
    let percentage = 20

    // Has selected a role
    if (profile.role) percentage += 30

    // Has filled out role-specific details
    if (profile.role_data && Object.keys(profile.role_data).length > 0) percentage += 30

    // Has profile picture
    if (profile.avatar_url) percentage += 20

    return percentage
  }

  const completionPercentage = getCompletionPercentage()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="border-2 border-blue-200 shadow-lg">
          <CardHeader className="bg-blue-50 border-b border-blue-100">
            <CardTitle className="text-2xl font-bold text-center text-blue-800">Complete Your Profile</CardTitle>
            <CardDescription className="text-center text-blue-600">
              Your profile is incomplete. Please complete it to access all features.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6 pb-2">
            <Alert className="mb-6 bg-amber-50 border-amber-200">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <AlertTitle className="text-amber-800 font-medium">Action Required</AlertTitle>
              <AlertDescription className="text-amber-700">
                Your profile needs to be completed before you can access all features of NC United Wrestling.
              </AlertDescription>
            </Alert>

            <div className="mb-6">
              <div className="flex justify-between mb-2 text-sm">
                <span>Profile Completion</span>
                <span className="font-medium">{completionPercentage}%</span>
              </div>
              <Progress value={completionPercentage} className="h-2" />
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                {profile ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-gray-300 mt-0.5" />
                )}
                <div>
                  <h3 className="font-medium">Basic Profile Created</h3>
                  <p className="text-sm text-gray-600">Your basic account has been set up</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                {profile && profile.role ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-gray-300 mt-0.5" />
                )}
                <div>
                  <h3 className="font-medium">Role Selection</h3>
                  <p className="text-sm text-gray-600">Choose your role in the wrestling community</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                {profile && profile.role_data && Object.keys(profile.role_data).length > 0 ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-gray-300 mt-0.5" />
                )}
                <div>
                  <h3 className="font-medium">Role Details</h3>
                  <p className="text-sm text-gray-600">Complete your role-specific information</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                {profile && profile.avatar_url ? (
                  <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                ) : (
                  <div className="h-5 w-5 rounded-full border-2 border-gray-300 mt-0.5" />
                )}
                <div>
                  <h3 className="font-medium">Profile Picture</h3>
                  <p className="text-sm text-gray-600">Add a profile picture to personalize your account</p>
                </div>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-center pt-2 pb-6">
            {!profile ? (
              <Button
                onClick={handleStartOnboarding}
                className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-6 text-lg"
              >
                Start Profile Setup
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button
                onClick={handleContinueOnboarding}
                className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-6 text-lg"
              >
                Continue Profile Setup
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
