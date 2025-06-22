"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export default function WrestlerOnboarding() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    weightClass: "",
    age: "",
    gradeLevel: "",
    school: "",
    yearsExperience: "",
    achievements: "",
    goals: "",
  })

  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser()

      if (error || !data?.user) {
        router.push("/login")
        return
      }

      setUser(data.user)

      // Check if profile exists and pre-fill data
      const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

      if (profile && profile.role_data) {
        const rd = profile.role_data
        setFormData({
          firstName: profile.first_name || "",
          lastName: profile.last_name || "",
          weightClass: rd.weightClass || "",
          age: rd.age || "",
          gradeLevel: rd.gradeLevel || "",
          school: rd.school || "",
          yearsExperience: rd.yearsExperience || "",
          achievements: rd.achievements || "",
          goals: rd.goals || "",
        })
      }

      setLoading(false)
    }

    getUser()
  }, [router, supabase])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      if (!user) return

      // Update profile with role-specific data
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        first_name: formData.firstName,
        last_name: formData.lastName,
        role: "wrestler",
        role_data: {
          weightClass: formData.weightClass,
          age: formData.age,
          gradeLevel: formData.gradeLevel,
          school: formData.school,
          yearsExperience: formData.yearsExperience,
          achievements: formData.achievements,
          goals: formData.goals,
        },
        onboarding_completed: true, // Mark as completed
        updated_at: new Date().toISOString(),
      })

      if (error) {
        console.error("Error updating profile:", error)
        return
      }

      setSuccess(true)

      // Redirect to home page after a short delay
      setTimeout(() => {
        router.push("/")
      }, 1500)
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
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-black text-slate-800 mb-2 font-oswald">Wrestler Profile Setup</h1>
            <p className="text-slate-600">Tell us about yourself to complete your wrestler profile</p>
          </div>

          {success && (
            <Alert className="mb-6 bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Profile saved successfully! Redirecting to home page...
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-oswald">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="age">Age</Label>
                    <Input id="age" name="age" type="number" value={formData.age} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="gradeLevel">Grade Level</Label>
                    <Select
                      value={formData.gradeLevel}
                      onValueChange={(value) => handleSelectChange("gradeLevel", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6th Grade</SelectItem>
                        <SelectItem value="7">7th Grade</SelectItem>
                        <SelectItem value="8">8th Grade</SelectItem>
                        <SelectItem value="9">9th Grade (Freshman)</SelectItem>
                        <SelectItem value="10">10th Grade (Sophomore)</SelectItem>
                        <SelectItem value="11">11th Grade (Junior)</SelectItem>
                        <SelectItem value="12">12th Grade (Senior)</SelectItem>
                        <SelectItem value="college">College</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="school">School</Label>
                  <Input id="school" name="school" value={formData.school} onChange={handleChange} required />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl font-oswald">Wrestling Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="weightClass">Weight Class</Label>
                    <Select
                      value={formData.weightClass}
                      onValueChange={(value) => handleSelectChange("weightClass", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select weight class" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="106">106 lbs</SelectItem>
                        <SelectItem value="113">113 lbs</SelectItem>
                        <SelectItem value="120">120 lbs</SelectItem>
                        <SelectItem value="126">126 lbs</SelectItem>
                        <SelectItem value="132">132 lbs</SelectItem>
                        <SelectItem value="138">138 lbs</SelectItem>
                        <SelectItem value="145">145 lbs</SelectItem>
                        <SelectItem value="152">152 lbs</SelectItem>
                        <SelectItem value="160">160 lbs</SelectItem>
                        <SelectItem value="170">170 lbs</SelectItem>
                        <SelectItem value="182">182 lbs</SelectItem>
                        <SelectItem value="195">195 lbs</SelectItem>
                        <SelectItem value="220">220 lbs</SelectItem>
                        <SelectItem value="285">285 lbs</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="yearsExperience">Years of Experience</Label>
                    <Input
                      id="yearsExperience"
                      name="yearsExperience"
                      type="number"
                      value={formData.yearsExperience}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="achievements">Achievements</Label>
                  <Textarea
                    id="achievements"
                    name="achievements"
                    value={formData.achievements}
                    onChange={handleChange}
                    placeholder="List your major wrestling achievements"
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="goals">Wrestling Goals</Label>
                  <Textarea
                    id="goals"
                    name="goals"
                    value={formData.goals}
                    onChange={handleChange}
                    placeholder="What are your wrestling goals?"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <div className="mt-8 text-center">
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white px-8 py-3 text-lg"
                disabled={saving}
              >
                {saving ? "Saving..." : "Complete Profile Setup"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
