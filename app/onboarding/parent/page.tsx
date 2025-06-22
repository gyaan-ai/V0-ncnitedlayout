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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CheckCircle } from "lucide-react"

export default function ParentOnboarding() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    emergencyContact: "",
    emergencyPhone: "",
    childrenNames: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    // Parental consent fields
    generalConsent: false,
    mediaConsent: false,
    medicalConsent: false,
    consentDate: "",
    consentName: "",
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
          phone: rd.phone || "",
          emergencyContact: rd.emergencyContact || "",
          emergencyPhone: rd.emergencyPhone || "",
          childrenNames: rd.childrenNames || "",
          address: rd.address || "",
          city: rd.city || "",
          state: rd.state || "",
          zip: rd.zip || "",
          generalConsent: rd.generalConsent || false,
          mediaConsent: rd.mediaConsent || false,
          medicalConsent: rd.medicalConsent || false,
          consentDate: rd.consentDate || "",
          consentName: rd.consentName || "",
        })
      }

      setLoading(false)
    }

    getUser()
  }, [router, supabase])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
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
        role: "parent",
        role_data: {
          phone: formData.phone,
          emergencyContact: formData.emergencyContact,
          emergencyPhone: formData.emergencyPhone,
          childrenNames: formData.childrenNames,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          zip: formData.zip,
          generalConsent: formData.generalConsent,
          mediaConsent: formData.mediaConsent,
          medicalConsent: formData.medicalConsent,
          consentDate: formData.consentDate,
          consentName: formData.consentName,
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
            <h1 className="text-3xl font-black text-slate-800 mb-2 font-oswald">Parent Profile Setup</h1>
            <p className="text-slate-600">Complete your profile to support your wrestler</p>
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

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                </div>

                <div>
                  <Label htmlFor="childrenNames">Children's Names</Label>
                  <Textarea
                    id="childrenNames"
                    name="childrenNames"
                    value={formData.childrenNames}
                    onChange={handleChange}
                    placeholder="List the names of your children who are wrestlers"
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl font-oswald">Address Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="state">State</Label>
                    <Input id="state" name="state" value={formData.state} onChange={handleChange} required />
                  </div>
                  <div>
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" name="zip" value={formData.zip} onChange={handleChange} required />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl font-oswald">Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                  <Input
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                  <Input
                    id="emergencyPhone"
                    name="emergencyPhone"
                    type="tel"
                    value={formData.emergencyPhone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="text-xl font-oswald">Parental Consent</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="generalConsent"
                      name="generalConsent"
                      checked={formData.generalConsent}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <Label htmlFor="generalConsent" className="text-sm font-medium">
                      I consent for my child to participate in NC United Wrestling activities
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="mediaConsent"
                      name="mediaConsent"
                      checked={formData.mediaConsent}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <Label htmlFor="mediaConsent" className="text-sm font-medium">
                      I consent for photos/videos of my child to be used for promotional purposes
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="medicalConsent"
                      name="medicalConsent"
                      checked={formData.medicalConsent}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      required
                    />
                    <Label htmlFor="medicalConsent" className="text-sm font-medium">
                      I consent for emergency medical treatment if needed
                    </Label>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="consentName">Parent/Guardian Name</Label>
                      <Input
                        id="consentName"
                        name="consentName"
                        value={formData.consentName}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="consentDate">Date</Label>
                      <Input
                        id="consentDate"
                        name="consentDate"
                        type="date"
                        value={formData.consentDate}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
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
