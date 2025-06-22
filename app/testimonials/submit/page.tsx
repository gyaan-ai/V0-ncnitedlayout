"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { StarIcon } from "lucide-react"

export default function FeedbackSubmissionPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    program: "",
    rating: 0,
    feedback: "",
    allowSharing: false,
  })
  const [hoveredRating, setHoveredRating] = useState(0)
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleRatingChange = (rating: number) => {
    setFormData((prev) => ({ ...prev, rating }))
    // Clear error when field is edited
    if (errors.rating) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors.rating
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, allowSharing: checked }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid"
    }

    if (!formData.role) {
      newErrors.role = "Please select your role"
    }

    if (!formData.program) {
      newErrors.program = "Please select a program"
    }

    if (formData.rating === 0) {
      newErrors.rating = "Please provide a rating"
    }

    if (!formData.feedback.trim()) {
      newErrors.feedback = "Feedback is required"
    } else if (formData.feedback.length < 10) {
      newErrors.feedback = "Feedback must be at least 10 characters"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      // In a real app, this would submit to a server
      console.log("Submitting feedback:", formData)

      // Show success state
      setSubmitted(true)
    }
  }

  const getRatingText = (rating: number) => {
    switch (rating) {
      case 1:
        return "Poor"
      case 2:
        return "Fair"
      case 3:
        return "Good"
      case 4:
        return "Very Good"
      case 5:
        return "Excellent"
      default:
        return ""
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-md mx-auto px-4">
          <Card className="shadow-lg">
            <CardHeader className="text-center bg-gradient-to-r from-[#1a1b5c] to-[#13144a] text-white rounded-t-lg">
              <CardTitle className="text-2xl font-oswald">Thank You!</CardTitle>
              <CardDescription className="text-gray-200">
                Your feedback has been submitted successfully.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 pb-4 text-center">
              <div className="mb-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Feedback Received</h3>
                <p className="text-gray-600">
                  We appreciate you taking the time to share your thoughts with us. Your feedback helps us improve our
                  programs.
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-center space-x-4">
              <Button variant="outline" onClick={() => router.push("/testimonials")}>
                View Testimonials
              </Button>
              <Button onClick={() => router.push("/")} className="bg-[#1a1b5c] hover:bg-[#13144a]">
                Return Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-md mx-auto px-4">
        <Card className="shadow-lg">
          <CardHeader className="bg-gradient-to-r from-[#1a1b5c] to-[#13144a] text-white rounded-t-lg">
            <CardTitle className="text-2xl font-oswald">Share Your Feedback</CardTitle>
            <CardDescription className="text-gray-200">
              Help us improve by sharing your experience with NC United Wrestling
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">Your Role</Label>
                  <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                    <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="parent">Parent/Guardian</SelectItem>
                      <SelectItem value="club_coach">Club Coach</SelectItem>
                      <SelectItem value="hs_coach">High School Coach</SelectItem>
                      <SelectItem value="college_coach">College Coach</SelectItem>
                      <SelectItem value="wrestler">Wrestler/Athlete</SelectItem>
                      <SelectItem value="tournament_director">Tournament Director</SelectItem>
                      <SelectItem value="official">Wrestling Official</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.role && <p className="text-red-500 text-sm">{errors.role}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="program">Program/Area of Feedback</Label>
                  <Select value={formData.program} onValueChange={(value) => handleSelectChange("program", value)}>
                    <SelectTrigger className={errors.program ? "border-red-500" : ""}>
                      <SelectValue placeholder="Select program or area" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="national_team">National Team Program</SelectItem>
                      <SelectItem value="elite_training">Elite Training & Development</SelectItem>
                      <SelectItem value="tournament">Tournament Competition</SelectItem>
                      <SelectItem value="recruiting">College Recruiting Support</SelectItem>
                      <SelectItem value="nhsca">NHSCA National Duals</SelectItem>
                      <SelectItem value="ucd">Ultimate Club Duals</SelectItem>
                      <SelectItem value="training_camps">Training Camps</SelectItem>
                      <SelectItem value="overall">Overall NC United Experience</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.program && <p className="text-red-500 text-sm">{errors.program}</p>}
                </div>

                <div className="space-y-2">
                  <Label>Rating</Label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        className="p-1 focus:outline-none"
                        onClick={() => handleRatingChange(rating)}
                        onMouseEnter={() => setHoveredRating(rating)}
                        onMouseLeave={() => setHoveredRating(0)}
                      >
                        {rating <= (hoveredRating || formData.rating) ? (
                          <StarIcon className="h-8 w-8 text-yellow-400 fill-current" />
                        ) : (
                          <StarIcon className="h-8 w-8 text-gray-300" />
                        )}
                      </button>
                    ))}
                    <span className="ml-2 text-sm font-medium text-gray-700">
                      {formData.rating > 0 ? getRatingText(formData.rating) : ""}
                    </span>
                  </div>
                  {errors.rating && <p className="text-red-500 text-sm">{errors.rating}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback">Your Feedback</Label>
                  <Textarea
                    id="feedback"
                    name="feedback"
                    placeholder="Please share your experience, suggestions, or comments..."
                    value={formData.feedback}
                    onChange={handleInputChange}
                    rows={5}
                    className={errors.feedback ? "border-red-500" : ""}
                  />
                  <p className="text-sm text-gray-500">{formData.feedback.length} characters (minimum 10)</p>
                  {errors.feedback && <p className="text-red-500 text-sm">{errors.feedback}</p>}
                </div>

                <div className="flex items-start space-x-2">
                  <Checkbox id="allowSharing" checked={formData.allowSharing} onCheckedChange={handleCheckboxChange} />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="allowSharing"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I allow NC United Wrestling to share my feedback publicly
                    </label>
                    <p className="text-sm text-gray-500">
                      Your feedback may be featured on our website or social media.
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/testimonials")}>
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="bg-[#1a1b5c] hover:bg-[#13144a]"
              disabled={Object.keys(errors).length > 0}
            >
              Submit Feedback
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}
