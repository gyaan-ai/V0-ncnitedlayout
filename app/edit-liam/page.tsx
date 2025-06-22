"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { toast } from "sonner"

export default function EditLiamPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [liam, setLiam] = useState<any>(null)

  // Liam's ID from the debug data
  const LIAM_ID = "d4087b7c-e162-41bf-b01d-5d063543bb0a"

  useEffect(() => {
    async function loadLiam() {
      try {
        const response = await fetch(`/api/debug-raw-athletes`)
        if (response.ok) {
          const data = await response.json()
          const liamRecord = data.recent_athletes.find(
            (athlete: any) => athlete.first_name === "Liam" && athlete.last_name === "Hickey",
          )
          if (liamRecord) {
            setLiam(liamRecord)
          }
        }
      } catch (error) {
        console.error("Error loading Liam:", error)
        toast.error("Failed to load Liam's profile")
      } finally {
        setLoading(false)
      }
    }

    loadLiam()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch(`/api/update-liam`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(liam),
      })

      if (response.ok) {
        toast.success("Liam's profile updated successfully!")
      } else {
        throw new Error("Failed to update profile")
      }
    } catch (error) {
      console.error("Error saving:", error)
      toast.error("Failed to save profile")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">Loading Liam's profile...</div>
      </div>
    )
  }

  if (!liam) {
    return (
      <div className="container mx-auto p-8">
        <div className="text-center">Liam's profile not found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Edit Liam Hickey's Profile</h1>
        <Button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Profile"}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Info */}
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="first_name">First Name</Label>
                <Input
                  id="first_name"
                  value={liam.first_name || ""}
                  onChange={(e) => setLiam({ ...liam, first_name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="last_name">Last Name</Label>
                <Input
                  id="last_name"
                  value={liam.last_name || ""}
                  onChange={(e) => setLiam({ ...liam, last_name: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weight_class">Weight Class</Label>
                <Select
                  value={liam.weight_class || ""}
                  onValueChange={(value) => setLiam({ ...liam, weight_class: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select weight" />
                  </SelectTrigger>
                  <SelectContent>
                    {[
                      "106",
                      "113",
                      "120",
                      "126",
                      "132",
                      "138",
                      "144",
                      "150",
                      "157",
                      "165",
                      "175",
                      "190",
                      "215",
                      "285",
                    ].map((weight) => (
                      <SelectItem key={weight} value={weight}>
                        {weight}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="graduation_year">Graduation Year</Label>
                <Input
                  id="graduation_year"
                  type="number"
                  value={liam.graduation_year || ""}
                  onChange={(e) => setLiam({ ...liam, graduation_year: Number.parseInt(e.target.value) })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="high_school">High School</Label>
              <Input
                id="high_school"
                value={liam.high_school || ""}
                onChange={(e) => setLiam({ ...liam, high_school: e.target.value })}
              />
            </div>

            <div>
              <Label htmlFor="wrestling_club">Wrestling Club</Label>
              <Input
                id="wrestling_club"
                value={liam.wrestling_club || ""}
                onChange={(e) => setLiam({ ...liam, wrestling_club: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={liam.email || ""}
                  onChange={(e) => setLiam({ ...liam, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={liam.phone || ""}
                  onChange={(e) => setLiam({ ...liam, phone: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* College & Team Info */}
        <Card>
          <CardHeader>
            <CardTitle>College & Team</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="college_commitment">College Commitment</Label>
              <Input
                id="college_commitment"
                value={liam.college_commitment || ""}
                onChange={(e) => setLiam({ ...liam, college_commitment: e.target.value })}
                placeholder="University of North Carolina at Chapel Hill"
              />
            </div>

            <div>
              <Label htmlFor="division">Division</Label>
              <Select value={liam.division || ""} onValueChange={(value) => setLiam({ ...liam, division: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select division" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NCAA Division I">NCAA Division I</SelectItem>
                  <SelectItem value="NCAA Division II">NCAA Division II</SelectItem>
                  <SelectItem value="NCAA Division III">NCAA Division III</SelectItem>
                  <SelectItem value="NAIA">NAIA</SelectItem>
                  <SelectItem value="NJCAA">NJCAA</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Switch
                  id="blue_team"
                  checked={liam.blue_team || false}
                  onCheckedChange={(checked) => setLiam({ ...liam, blue_team: checked })}
                />
                <Label htmlFor="blue_team">NC United Blue Team</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="gold_team"
                  checked={liam.gold_team || false}
                  onCheckedChange={(checked) => setLiam({ ...liam, gold_team: checked })}
                />
                <Label htmlFor="gold_team">NC United Gold Team</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="is_featured"
                  checked={liam.is_featured || false}
                  onCheckedChange={(checked) => setLiam({ ...liam, is_featured: checked })}
                />
                <Label htmlFor="is_featured">Featured Athlete</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Images */}
        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="image_url">Profile Image URL</Label>
              <Input
                id="image_url"
                value={liam.image_url || ""}
                onChange={(e) => setLiam({ ...liam, image_url: e.target.value })}
                placeholder="/images/liam-hickey-profile.png"
              />
            </div>

            <div>
              <Label htmlFor="commitment_photo_url">Commitment Photo URL</Label>
              <Input
                id="commitment_photo_url"
                value={liam.commitment_photo_url || ""}
                onChange={(e) => setLiam({ ...liam, commitment_photo_url: e.target.value })}
                placeholder="/images/liam-hickey-commit-announcement.png"
              />
            </div>
          </CardContent>
        </Card>

        {/* Achievements */}
        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
          </CardHeader>
          <CardContent>
            <div>
              <Label htmlFor="achievements">Achievements (JSON or Text)</Label>
              <Textarea
                id="achievements"
                value={liam.achievements || ""}
                onChange={(e) => setLiam({ ...liam, achievements: e.target.value })}
                rows={6}
                placeholder="Enter achievements as JSON or plain text"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 flex justify-center">
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? "Saving Profile..." : "Save Liam's Profile"}
        </Button>
      </div>
    </div>
  )
}
