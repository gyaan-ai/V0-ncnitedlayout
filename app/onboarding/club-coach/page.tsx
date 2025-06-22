"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { ClubCoachProfileData } from "@/lib/supabase/profile-types"
import { useRouter } from "next/navigation"
import { Target } from "lucide-react"

export default function ClubCoachOnboarding() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<ClubCoachProfileData>({
    club_name: "",
    position: "",
    location: {
      city: "",
      state: "",
      address: "",
    },
    specialties: [],
    certifications: [],
    years_coaching: 0,
    contact_preferences: {
      email: true,
      phone: true,
      text: false,
    },
  })

  const router = useRouter()
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data?.user) {
        router.push("/login")
        return
      }

      setUser(data.user)
      setLoading(false)
    }

    getUser()
  }, [router, supabase])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          role_data: formData,
          onboarding_completed: true,
        })
        .eq("id", user.id)

      if (error) {
        console.error("Error saving profile:", error)
        return
      }

      router.push("/dashboard")
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setSaving(false)
    }
  }

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      specialties: checked ? [...prev.specialties, specialty] : prev.specialties.filter((s) => s !== specialty),
    }))
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-slate-800 mb-2 font-oswald">Club Coach Profile</h1>
            <p className="text-slate-600">Set up your club coaching profile</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-oswald">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>First Name</Label>
                    <Input value={user?.user_metadata?.first_name || ""} disabled className="bg-gray-50" />
                  </div>
                  <div>
                    <Label>Last Name</Label>
                    <Input value={user?.user_metadata?.last_name || ""} disabled className="bg-gray-50" />
                  </div>
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={user?.email || ""} disabled className="bg-gray-50" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-oswald">Club Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="club_name">Club Name *</Label>
                  <Input
                    value={formData.club_name}
                    onChange={(e) => setFormData((prev) => ({ ...prev, club_name: e.target.value }))}
                    placeholder="Enter club name"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="position">Position *</Label>
                    <Input
                      value={formData.position}
                      onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
                      placeholder="e.g., Head Coach, Owner"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="years_coaching">Years Coaching</Label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.years_coaching}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, years_coaching: Number.parseInt(e.target.value) || 0 }))
                      }
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      value={formData.location.city}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: { ...prev.location, city: e.target.value },
                        }))
                      }
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      value={formData.location.state}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: { ...prev.location, state: e.target.value },
                        }))
                      }
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="address">Club Address</Label>
                  <Input
                    value={formData.location.address}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        location: { ...prev.location, address: e.target.value },
                      }))
                    }
                    placeholder="Street address (optional)"
                  />
                </div>
                <div>
                  <Label>Specialties</Label>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {["Youth", "High School", "Freestyle", "Greco-Roman", "Folkstyle", "Technique", "Conditioning"].map(
                      (specialty) => (
                        <label key={specialty} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.specialties.includes(specialty)}
                            onChange={(e) => handleSpecialtyChange(specialty, e.target.checked)}
                            className="rounded border-gray-300"
                          />
                          <span className="text-sm">{specialty}</span>
                        </label>
                      ),
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-semibold py-2 px-8 font-oswald"
              >
                {saving ? "Creating Profile..." : "Create Profile"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
