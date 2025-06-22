"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CollegeCoachProfileData } from "@/lib/supabase/profile-types"
import { useRouter } from "next/navigation"
import { GraduationCap } from "lucide-react"

const divisions = ["D1", "D2", "D3", "NAIA", "NJCAA"]

export default function CollegeCoachOnboarding() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<CollegeCoachProfileData>({
    university: "",
    position: "",
    division: "",
    conference: "",
    recruiting_classes: [],
    specialties: [],
    coaching_experience: 0,
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

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <GraduationCap className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-slate-800 mb-2 font-oswald">College Coach Profile</h1>
            <p className="text-slate-600">Set up your coaching profile</p>
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
                <CardTitle className="font-oswald">Coaching Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="university">University *</Label>
                  <Input
                    value={formData.university}
                    onChange={(e) => setFormData((prev) => ({ ...prev, university: e.target.value }))}
                    placeholder="Enter university name"
                    required
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="position">Position *</Label>
                    <Input
                      value={formData.position}
                      onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
                      placeholder="e.g., Head Coach, Assistant Coach"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="division">Division *</Label>
                    <Select
                      value={formData.division}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, division: value }))}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select division" />
                      </SelectTrigger>
                      <SelectContent>
                        {divisions.map((division) => (
                          <SelectItem key={division} value={division}>
                            {division}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="conference">Conference</Label>
                    <Input
                      value={formData.conference}
                      onChange={(e) => setFormData((prev) => ({ ...prev, conference: e.target.value }))}
                      placeholder="e.g., Big Ten, ACC"
                    />
                  </div>
                  <div>
                    <Label htmlFor="experience">Years Coaching</Label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.coaching_experience}
                      onChange={(e) =>
                        setFormData((prev) => ({ ...prev, coaching_experience: Number.parseInt(e.target.value) || 0 }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="font-oswald">Contact Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.contact_preferences.email}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contact_preferences: { ...prev.contact_preferences, email: e.target.checked },
                        }))
                      }
                      className="rounded border-gray-300"
                    />
                    <span>Email communications</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.contact_preferences.phone}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contact_preferences: { ...prev.contact_preferences, phone: e.target.checked },
                        }))
                      }
                      className="rounded border-gray-300"
                    />
                    <span>Phone calls</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.contact_preferences.text}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          contact_preferences: { ...prev.contact_preferences, text: e.target.checked },
                        }))
                      }
                      className="rounded border-gray-300"
                    />
                    <span>Text messages</span>
                  </label>
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 px-8 font-oswald"
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
