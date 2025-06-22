"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { HighSchoolCoachProfileData } from "@/lib/supabase/profile-types"
import { useRouter } from "next/navigation"
import { School } from "lucide-react"

export default function HighSchoolCoachOnboarding() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [formData, setFormData] = useState<HighSchoolCoachProfileData>({
    school: "",
    position: "",
    teams: [],
    years_coaching: 0,
    wrestling_background: "",
    contact_preferences: {
      email: true,
      phone: true,
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

  const handleTeamChange = (team: string, checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      teams: checked ? [...prev.teams, team] : prev.teams.filter((t) => t !== team),
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
            <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <School className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-black text-slate-800 mb-2 font-oswald">High School Coach Profile</h1>
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
                <CardTitle className="font-oswald">School Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="school">School *</Label>
                  <Input
                    value={formData.school}
                    onChange={(e) => setFormData((prev) => ({ ...prev, school: e.target.value }))}
                    placeholder="Enter school name"
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
                <div>
                  <Label>Teams Coached</Label>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {["Varsity", "JV", "Middle School", "Youth"].map((team) => (
                      <label key={team} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={formData.teams.includes(team)}
                          onChange={(e) => handleTeamChange(team, e.target.checked)}
                          className="rounded border-gray-300"
                        />
                        <span className="text-sm">{team}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <Label htmlFor="wrestling_background">Wrestling Background</Label>
                  <Input
                    value={formData.wrestling_background}
                    onChange={(e) => setFormData((prev) => ({ ...prev, wrestling_background: e.target.value }))}
                    placeholder="Brief description of your wrestling experience"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={saving}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-semibold py-2 px-8 font-oswald"
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
