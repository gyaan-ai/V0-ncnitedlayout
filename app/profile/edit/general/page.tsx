"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { ArrowLeft, User, Save } from "lucide-react"

export default function GeneralProfileEdit() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phone, setPhone] = useState("")

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function loadProfile() {
      console.log("🔍 Loading general profile...")

      try {
        const { data: userData, error: userError } = await supabase.auth.getUser()

        if (userError || !userData?.user) {
          console.log("❌ No user found, redirecting to login")
          router.push("/login")
          return
        }

        console.log("✅ User found:", userData.user.email)
        setUser(userData.user)

        // Get the profile data
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", userData.user.id)
          .single()

        if (profileError) {
          console.error("❌ Error loading profile:", profileError)
          setError("Failed to load profile data")
        } else {
          console.log("✅ Profile loaded:", profileData)
          setProfile(profileData)
          setFirstName(profileData.first_name || "")
          setLastName(profileData.last_name || "")
          setPhone(profileData.phone || "")
        }
      } catch (error) {
        console.error("💥 Unexpected error:", error)
        setError("An unexpected error occurred")
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [router, supabase])

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    console.log("💾 Saving profile data...")

    try {
      if (!user) {
        setError("No user found")
        setSaving(false)
        return
      }

      // Get fresh user data to ensure we have the latest email
      const { data: freshUserData, error: userRefreshError } = await supabase.auth.getUser()

      if (userRefreshError || !freshUserData?.user?.email) {
        console.error("❌ Could not get fresh user data:", userRefreshError)
        setError("Could not verify user email. Please try logging out and back in.")
        setSaving(false)
        return
      }

      const email = freshUserData.user.email
      const userId = freshUserData.user.id

      console.log("👤 Fresh user data:", { userId, email })
      console.log("📝 Preparing to save with data:", {
        id: userId,
        email: email,
        first_name: firstName,
        last_name: lastName,
        phone: phone,
      })

      // First, try to check if profile exists
      const { data: existingProfile, error: checkError } = await supabase
        .from("profiles")
        .select("id, email, role")
        .eq("id", userId)
        .single()

      console.log("🔍 Existing profile check:", { existingProfile, checkError })

      let result
      if (existingProfile) {
        // Profile exists, update it
        console.log("📝 Updating existing profile...")
        result = await supabase
          .from("profiles")
          .update({
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            // Don't update email or role for existing profiles
          })
          .eq("id", userId)
          .select()
      } else {
        // Profile doesn't exist, create it
        console.log("🆕 Creating new profile...")
        result = await supabase
          .from("profiles")
          .insert({
            id: userId,
            email: email,
            first_name: firstName,
            last_name: lastName,
            phone: phone,
            role: "guest",
          })
          .select()
      }

      const { data, error: saveError } = result

      if (saveError) {
        console.error("❌ Error saving profile:", saveError)
        setError(`Failed to save: ${saveError.message}`)
        return
      }

      console.log("✅ Profile saved successfully:", data)
      router.push("/dashboard?updated=true")
    } catch (error) {
      console.error("💥 Error:", error)
      setError("An error occurred while saving")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.push("/dashboard")} className="mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
          <p className="text-gray-600">Update your personal information</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        <form onSubmit={handleSave}>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="first_name">First Name</Label>
                  <Input
                    id="first_name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <Label htmlFor="last_name">Last Name</Label>
                  <Input
                    id="last_name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter last name"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email || ""} disabled className="bg-gray-50" />
              </div>

              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <Label>Role</Label>
                <Input value={profile?.role || "Not set"} disabled className="bg-gray-50" />
                {profile?.role === "wrestler" && (
                  <p className="text-sm text-blue-600 mt-1">
                    For wrestler-specific information, use the{" "}
                    <button
                      type="button"
                      onClick={() => router.push("/profile/edit/wrestler")}
                      className="underline hover:text-blue-800"
                    >
                      wrestler profile editor
                    </button>
                  </p>
                )}
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => router.push("/dashboard")}>
                  Cancel
                </Button>
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    "Saving..."
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}
