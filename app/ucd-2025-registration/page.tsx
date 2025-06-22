"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Trophy, Medal, Award, Target, Zap } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const mensWeightClasses = [
  "90 LBS",
  "95 LBS",
  "103 LBS",
  "109 LBS",
  "116 LBS",
  "123 LBS",
  "129 LBS",
  "135 LBS",
  "141 LBS",
  "148 LBS",
  "155 LBS",
  "163 LBS",
  "175 LBS",
  "195 LBS",
  "HWT",
]

const womensWeightClasses = [
  "55",
  "60",
  "64",
  "68",
  "73",
  "77",
  "84",
  "88",
  "95",
  "101",
  "110",
  "117",
  "124",
  "128",
  "135",
  "139",
  "146",
  "157",
  "168",
  "181",
  "232",
]

export default function UCD2025Registration() {
  const [formData, setFormData] = useState({
    name: "",
    weightClass: "",
    dateOfBirth: "",
    age: "",
    grade: "",
    highSchool: "",
    club: "",
    parentName: "",
    parentEmail: "",
    parentPhone: "",
    additionalInfo: "",
    team: "",
    previousCompetition: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")
  const [submissionStep, setSubmissionStep] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "name":
        return value.trim().length < 2 ? "Name must be at least 2 characters" : ""
      case "parentName":
        return value.trim().length < 2 ? "Parent name must be at least 2 characters" : ""
      case "parentEmail":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return !emailRegex.test(value) ? "Please enter a valid email address" : ""
      case "parentPhone":
        const phoneRegex = /^[\d\s\-()]+$/
        return !phoneRegex.test(value.replace(/\D/g, "")) ? "Please enter a valid phone number" : ""
      case "highSchool":
        return value.trim().length < 2 ? "High school name is required" : ""
      case "dateOfBirth":
        if (!value) return "Date of birth is required"
        const age = Number.parseInt(calculateAge(value))
        return age < 5 || age > 25 ? "Age must be between 5 and 25 years" : ""
      case "team":
        return !value ? "Please select a team" : ""
      case "weightClass":
        return !value ? "Please select a weight class" : ""
      case "grade":
        return !value ? "Please select a grade" : ""
      case "previousCompetition":
        return !value ? "Please select your previous experience" : ""
      default:
        return ""
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setTouched((prev) => ({ ...prev, [name]: true }))
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const calculateAge = (dob: string) => {
    if (!dob) return ""
    const today = new Date()
    const birthDate = new Date(dob)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age.toString()
  }

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dob = e.target.value
    const age = calculateAge(dob)
    setFormData((prev) => ({
      ...prev,
      dateOfBirth: dob,
      age: age,
    }))
    if (touched.dateOfBirth) {
      const error = validateField("dateOfBirth", dob)
      setErrors((prev) => ({ ...prev, dateOfBirth: error }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate all fields
    const newErrors: Record<string, string> = {}
    const requiredFields = [
      "name",
      "parentName",
      "parentEmail",
      "parentPhone",
      "highSchool",
      "dateOfBirth",
      "team",
      "weightClass",
      "grade",
      "previousCompetition",
    ]

    requiredFields.forEach((field) => {
      const value = formData[field as keyof typeof formData]
      const error = validateField(field, value)
      if (error) newErrors[field] = error
    })

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setTouched(requiredFields.reduce((acc, field) => ({ ...acc, [field]: true }), {}))
      setSubmitMessage("Please correct the errors below before submitting.")
      return
    }

    setIsSubmitting(true)
    setSubmitMessage("")
    setErrors({})
    setShowSuccess(false)
    setSubmissionStep("Preparing submission...")

    try {
      const form = e.target as HTMLFormElement
      const formDataObj = new FormData(form)

      // Add the calculated age to form data
      formDataObj.set("age", formData.age)

      setSubmissionStep("Validating information...")

      // Submit to API
      const response = await fetch("/api/registrations/ucd-2025", {
        method: "POST",
        body: formDataObj,
      })

      const result = await response.json()

      if (result.success) {
        setSubmissionStep("Success! Processing complete.")
        setSubmitMessage(
          "Thank you for expressing your interest! Your submission has been received and our coaching staff will review your information. You will receive a confirmation email shortly.",
        )
        setShowSuccess(true)

        // Reset form after delay
        setTimeout(() => {
          setFormData({
            name: "",
            weightClass: "",
            dateOfBirth: "",
            age: "",
            grade: "",
            highSchool: "",
            club: "",
            parentName: "",
            parentEmail: "",
            parentPhone: "",
            additionalInfo: "",
            team: "",
            previousCompetition: "",
          })
          setErrors({})
          setTouched({})
          form.reset()
          setSubmissionStep("")
          setShowSuccess(false)
        }, 5000)
      } else {
        throw new Error(result.message || "Submission failed")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setSubmissionStep("")
      setSubmitMessage("An error occurred while submitting your registration. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getWeightClasses = () => {
    if (formData.team === "Gold") {
      return womensWeightClasses
    } else if (formData.team === "Blue") {
      return mensWeightClasses
    }
    return [] // No weight classes if no team selected
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      {/* Modern Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1600')] bg-cover bg-center opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-red-600/20 backdrop-blur-sm border border-red-500/30 rounded-full px-4 py-2 mb-6">
              <Trophy className="h-4 w-4 text-red-400" />
              <span className="text-red-200 text-sm font-medium">Ultimate Club Duals Championship</span>
            </div>

            <h1 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent tracking-tight font-oswald">
              UCD 2025
            </h1>

            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Join NC United's quest to defend our 2nd place finish at the premier club wrestling tournament
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <span className="text-blue-200">State College, PA</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/20">
                <span className="text-blue-200">Sept. 19-21, 2025</span>
              </div>
              <div className="bg-emerald-500/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-emerald-400/30">
                <span className="text-emerald-200 font-semibold">Interest Form Open</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Stats Section */}
      <section className="py-16 bg-white/80 backdrop-blur-sm border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-slate-800 mb-2 font-oswald">20+</div>
                <div className="text-slate-600 font-medium">Elite Teams</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-emerald-600 mb-2 font-oswald">2nd</div>
                <div className="text-slate-600 font-medium">2024 Finish</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-blue-600 mb-2 font-oswald">5-2</div>
                <div className="text-slate-600 font-medium">2024 Record</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-black text-purple-600 mb-2 font-oswald">PA</div>
                <div className="text-slate-600 font-medium">Nittany Valley</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Information Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="container relative mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-red-600/20 border-red-500/30 text-red-300 px-4 py-2">Elite Competition</Badge>
              <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent font-oswald">
                Tournament Details
              </h2>
              <p className="text-xl text-blue-100 leading-relaxed max-w-2xl mx-auto">
                The premier club wrestling tournament featuring teams from over 20 states competing for the prestigious
                Torch Trophy
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Men's Division */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 font-oswald">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">M</span>
                  </div>
                  Men's Blue Teams (Folkstyle)
                </h3>
                <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-3 gap-3">
                      {mensWeightClasses.map((weight) => (
                        <div key={weight} className="bg-white/20 rounded-lg px-3 py-2 text-center">
                          <span className="text-sm font-semibold text-white">{weight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Women's Division */}
              <div>
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3 font-oswald">
                  <div className="w-8 h-8 bg-amber-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">W</span>
                  </div>
                  Women's Gold Team (Freestyle)
                </h3>
                <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-7 gap-2">
                      {womensWeightClasses.map((weight) => (
                        <div key={weight} className="bg-white/20 rounded-lg px-2 py-1 text-center">
                          <span className="text-xs font-semibold text-white">{weight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Tournament Highlights */}
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Trophy className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-oswald">Torch Trophy</h3>
                  <p className="text-blue-200">Awarded to division champions, symbolizing wrestling excellence</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="h-6 w-6 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-oswald">Elite Competition</h3>
                  <p className="text-blue-200">State champions and nationally ranked wrestlers from 20+ states</p>
                </CardContent>
              </Card>

              <Card className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-6 w-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 font-oswald">College Exposure</h3>
                  <p className="text-blue-200">Showcase your skills to college coaches and scouts</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* 2024 Success Story */}
      <section className="py-20 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-blue-600/20 border-blue-500/30 text-blue-700 px-4 py-2">
                Building on Success
              </Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 font-oswald">2024 Championship Run</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                NC United's historic 2nd place finish sets the stage for an even stronger 2025 campaign
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Stats Side */}
              <div className="space-y-8">
                <div className="grid grid-cols-2 gap-6">
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                    <CardContent className="text-center p-6">
                      <div className="w-12 h-12 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Medal className="h-6 w-6 text-amber-600" />
                      </div>
                      <div className="text-3xl font-black text-amber-600 mb-2 font-oswald">2nd</div>
                      <div className="font-semibold text-slate-700">Gold Pool Finish</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                    <CardContent className="text-center p-6">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Award className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="text-3xl font-black text-blue-600 mb-2 font-oswald">5-2</div>
                      <div className="font-semibold text-slate-700">Dual Meet Record</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                    <CardContent className="text-center p-6">
                      <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Trophy className="h-6 w-6 text-emerald-600" />
                      </div>
                      <div className="text-3xl font-black text-emerald-600 mb-2 font-oswald">2</div>
                      <div className="font-semibold text-slate-700">Undefeated Wrestlers</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                    <CardContent className="text-center p-6">
                      <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Target className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="text-3xl font-black text-purple-600 mb-2 font-oswald">61-44</div>
                      <div className="font-semibold text-slate-700">Individual Matches</div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold text-slate-800 mb-4 font-oswald">Key Highlights</h3>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        Dominant 61-12 victory over Michigan Premier Gold
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        Two wrestlers went undefeated (7-0 records)
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                        Reached tournament finals
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                        2nd place Gold Pool finish
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Link href="/tournaments/ucd-2024">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 font-oswald">
                    View Complete 2024 Results & Gallery
                  </Button>
                </Link>
              </div>

              {/* Image Side */}
              <div className="relative">
                <Card className="overflow-hidden bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
                  <div className="relative h-96">
                    <Image
                      src="/images/ucd-team-clean.png"
                      alt="NC United team at UCD 2024"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
                        <h3 className="text-xl font-bold text-slate-800 mb-2 font-oswald">UCD 2024 Champions</h3>
                        <p className="text-slate-600">
                          NC United wrestlers celebrating their historic 2nd place finish
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-red-600/20 border-red-500/30 text-red-700 px-4 py-2">Team Selection</Badge>
              <h2 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 font-oswald">Interest Form</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Express your interest in being considered for the NC United 2025 UCD team
              </p>
            </div>

            <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-slate-900 via-blue-900 to-slate-800 text-white">
                <CardTitle className="text-2xl text-center font-oswald">Team Interest Form</CardTitle>
                <CardDescription className="text-blue-200 text-center">
                  Express your interest in joining NC United's quest for the 2025 UCD championship
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8">
                <form
                  onSubmit={handleSubmit}
                  className={`space-y-6 ${isSubmitting ? "pointer-events-none opacity-75" : ""}`}
                >
                  {/* Wrestler Information */}
                  <div className="space-y-4">
                    <h4 className="font-black text-slate-800 border-b-2 border-blue-600 pb-2 font-oswald text-lg">
                      Wrestler Information
                    </h4>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name" className="text-sm font-semibold">
                          Full Name *
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, name: e.target.value }))
                            if (touched.name) {
                              const error = validateField("name", e.target.value)
                              setErrors((prev) => ({ ...prev, name: error }))
                            }
                          }}
                          onBlur={handleBlur}
                          required
                          className={`mt-1 ${touched.name && errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                        />
                        {touched.name && errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <Label htmlFor="highSchool" className="text-sm font-semibold">
                          High School *
                        </Label>
                        <Input
                          id="highSchool"
                          name="highSchool"
                          value={formData.highSchool}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, highSchool: e.target.value }))
                            if (touched.highSchool) {
                              const error = validateField("highSchool", e.target.value)
                              setErrors((prev) => ({ ...prev, highSchool: error }))
                            }
                          }}
                          onBlur={handleBlur}
                          required
                          className={`mt-1 ${touched.highSchool && errors.highSchool ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                        />
                        {touched.highSchool && errors.highSchool && (
                          <p className="text-red-500 text-xs mt-1">{errors.highSchool}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="dateOfBirth" className="text-sm font-semibold">
                          Date of Birth *
                        </Label>
                        <Input
                          id="dateOfBirth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleDateChange}
                          onBlur={handleBlur}
                          required
                          className={`mt-1 ${touched.dateOfBirth && errors.dateOfBirth ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                        />
                        {touched.dateOfBirth && errors.dateOfBirth && (
                          <p className="text-red-500 text-xs mt-1">{errors.dateOfBirth}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="age" className="text-sm font-semibold">
                          Age
                        </Label>
                        <Input
                          id="age"
                          name="age"
                          value={formData.age}
                          readOnly
                          className="mt-1 bg-gray-50"
                          placeholder="Auto-calculated"
                        />
                      </div>
                      <div>
                        <Label htmlFor="grade" className="text-sm font-semibold">
                          Grade *
                        </Label>
                        <Select
                          name="grade"
                          value={formData.grade}
                          onValueChange={(value) => {
                            setFormData((prev) => ({ ...prev, grade: value }))
                            handleSelectChange("grade", value)
                          }}
                          required
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1st">1st Grade</SelectItem>
                            <SelectItem value="2nd">2nd Grade</SelectItem>
                            <SelectItem value="3rd">3rd Grade</SelectItem>
                            <SelectItem value="4th">4th Grade</SelectItem>
                            <SelectItem value="5th">5th Grade</SelectItem>
                            <SelectItem value="6th">6th Grade</SelectItem>
                            <SelectItem value="7th">7th Grade</SelectItem>
                            <SelectItem value="8th">8th Grade</SelectItem>
                            <SelectItem value="9th">9th Grade</SelectItem>
                            <SelectItem value="10th">10th Grade</SelectItem>
                            <SelectItem value="11th">11th Grade</SelectItem>
                            <SelectItem value="12th">12th Grade</SelectItem>
                            <SelectItem value="Post-Graduate">Post-Graduate</SelectItem>
                          </SelectContent>
                        </Select>
                        <input type="hidden" name="grade" value={formData.grade} />
                        {touched.grade && errors.grade && <p className="text-red-500 text-xs mt-1">{errors.grade}</p>}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="team" className="text-sm font-semibold">
                          Team Interest *
                        </Label>
                        <Select
                          name="team"
                          value={formData.team}
                          onValueChange={(value) => {
                            setFormData((prev) => ({ ...prev, team: value, weightClass: "" }))
                            handleSelectChange("team", value)
                          }}
                          required
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder="Select team" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Blue">Blue Team (Men's Folkstyle)</SelectItem>
                            <SelectItem value="Gold">Gold Team (Women's Freestyle)</SelectItem>
                          </SelectContent>
                        </Select>
                        <input type="hidden" name="team" value={formData.team} />
                        {touched.team && errors.team && <p className="text-red-500 text-xs mt-1">{errors.team}</p>}
                      </div>

                      <div>
                        <Label htmlFor="weightClass" className="text-sm font-semibold">
                          Weight Class *
                        </Label>
                        <Select
                          name="weightClass"
                          value={formData.weightClass}
                          onValueChange={(value) => {
                            setFormData((prev) => ({ ...prev, weightClass: value }))
                            handleSelectChange("weightClass", value)
                          }}
                          required
                          disabled={!formData.team}
                        >
                          <SelectTrigger className="mt-1">
                            <SelectValue placeholder={formData.team ? "Select weight class" : "Select team first"} />
                          </SelectTrigger>
                          <SelectContent>
                            {getWeightClasses().map((weight, index) => (
                              <SelectItem key={weight} value={weight}>
                                {weight}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <input type="hidden" name="weightClass" value={formData.weightClass} />
                        {touched.weightClass && errors.weightClass && (
                          <p className="text-red-500 text-xs mt-1">{errors.weightClass}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-semibold">Previous NC United Experience *</Label>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="ucd2024"
                            name="previousCompetition"
                            value="UCD 2024"
                            checked={formData.previousCompetition.includes("UCD 2024")}
                            onChange={(e) => {
                              const value = e.target.value
                              setFormData((prev) => ({
                                ...prev,
                                previousCompetition: e.target.checked
                                  ? prev.previousCompetition
                                    ? `${prev.previousCompetition}, ${value}`
                                    : value
                                  : prev.previousCompetition
                                      .replace(new RegExp(`${value},?\\s*`), "")
                                      .replace(/,\s*$/, ""),
                              }))
                              setTouched((prev) => ({ ...prev, previousCompetition: true }))
                            }}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor="ucd2024" className="text-sm font-normal">
                            UCD 2024
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="nhsca2025"
                            name="previousCompetition"
                            value="2025 NHSCA Duals"
                            checked={formData.previousCompetition.includes("2025 NHSCA Duals")}
                            onChange={(e) => {
                              const value = e.target.value
                              setFormData((prev) => ({
                                ...prev,
                                previousCompetition: e.target.checked
                                  ? prev.previousCompetition
                                    ? `${prev.previousCompetition}, ${value}`
                                    : value
                                  : prev.previousCompetition
                                      .replace(new RegExp(`${value},?\\s*`), "")
                                      .replace(/,\s*$/, ""),
                              }))
                              setTouched((prev) => ({ ...prev, previousCompetition: true }))
                            }}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor="nhsca2025" className="text-sm font-normal">
                            2025 NHSCA Duals
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="noExperience"
                            name="previousCompetition"
                            value="No Previous Experience"
                            checked={formData.previousCompetition.includes("No Previous Experience")}
                            onChange={(e) => {
                              const value = e.target.value
                              if (e.target.checked) {
                                setFormData((prev) => ({ ...prev, previousCompetition: value }))
                              } else {
                                setFormData((prev) => ({ ...prev, previousCompetition: "" }))
                              }
                              setTouched((prev) => ({ ...prev, previousCompetition: true }))
                            }}
                            className="rounded border-gray-300"
                          />
                          <Label htmlFor="noExperience" className="text-sm font-normal">
                            No Previous Experience
                          </Label>
                        </div>
                      </div>
                      <input type="hidden" name="previousCompetition" value={formData.previousCompetition} />
                      {touched.previousCompetition && errors.previousCompetition && (
                        <p className="text-red-500 text-xs mt-1">{errors.previousCompetition}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="club" className="text-sm font-semibold">
                        Current Club/Team
                      </Label>
                      <Input
                        id="club"
                        name="club"
                        value={formData.club}
                        onChange={(e) => setFormData((prev) => ({ ...prev, club: e.target.value }))}
                        onBlur={handleBlur}
                        className="mt-1"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  {/* Parent/Guardian Information */}
                  <div className="space-y-4">
                    <h4 className="font-black text-slate-800 border-b-2 border-blue-600 pb-2 font-oswald text-lg">
                      Parent/Guardian Information
                    </h4>

                    <div>
                      <Label htmlFor="parentName" className="text-sm font-semibold">
                        Parent/Guardian Name *
                      </Label>
                      <Input
                        id="parentName"
                        name="parentName"
                        value={formData.parentName}
                        onChange={(e) => {
                          setFormData((prev) => ({ ...prev, parentName: e.target.value }))
                          if (touched.parentName) {
                            const error = validateField("parentName", e.target.value)
                            setErrors((prev) => ({ ...prev, parentName: error }))
                          }
                        }}
                        onBlur={handleBlur}
                        required
                        className={`mt-1 ${touched.parentName && errors.parentName ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                      />
                      {touched.parentName && errors.parentName && (
                        <p className="text-red-500 text-xs mt-1">{errors.parentName}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="parentEmail" className="text-sm font-semibold">
                          Email *
                        </Label>
                        <Input
                          id="parentEmail"
                          name="parentEmail"
                          type="email"
                          value={formData.parentEmail}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, parentEmail: e.target.value }))
                            if (touched.parentEmail) {
                              const error = validateField("parentEmail", e.target.value)
                              setErrors((prev) => ({ ...prev, parentEmail: error }))
                            }
                          }}
                          onBlur={handleBlur}
                          required
                          className={`mt-1 ${touched.parentEmail && errors.parentEmail ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                        />
                        {touched.parentEmail && errors.parentEmail && (
                          <p className="text-red-500 text-xs mt-1">{errors.parentEmail}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="parentPhone" className="text-sm font-semibold">
                          Phone *
                        </Label>
                        <Input
                          id="parentPhone"
                          name="parentPhone"
                          type="tel"
                          value={formData.parentPhone}
                          onChange={(e) => {
                            setFormData((prev) => ({ ...prev, parentPhone: e.target.value }))
                            if (touched.parentPhone) {
                              const error = validateField("parentPhone", e.target.value)
                              setErrors((prev) => ({ ...prev, parentPhone: error }))
                            }
                          }}
                          onBlur={handleBlur}
                          required
                          className={`mt-1 ${touched.parentPhone && errors.parentPhone ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}`}
                        />
                        {touched.parentPhone && errors.parentPhone && (
                          <p className="text-red-500 text-xs mt-1">{errors.parentPhone}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div>
                    <Label htmlFor="additionalInfo" className="text-sm font-semibold">
                      Additional Information
                    </Label>
                    <Textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      value={formData.additionalInfo}
                      onChange={(e) => setFormData((prev) => ({ ...prev, additionalInfo: e.target.value }))}
                      placeholder="Wrestling experience, achievements, questions..."
                      className="mt-1"
                      rows={4}
                    />
                  </div>

                  {submissionStep && (
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
                      <div className="flex items-center space-x-3">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
                        <span className="text-blue-800 font-medium">{submissionStep}</span>
                      </div>
                      <div className="mt-2 bg-blue-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-500 ease-out"
                          style={{
                            width: submissionStep.includes("Preparing")
                              ? "25%"
                              : submissionStep.includes("Validating")
                                ? "50%"
                                : submissionStep.includes("Submitting")
                                  ? "75%"
                                  : submissionStep.includes("Success")
                                    ? "100%"
                                    : "0%",
                          }}
                        ></div>
                      </div>
                    </div>
                  )}

                  {submitMessage && !submissionStep && (
                    <div
                      className={`p-4 rounded-md text-sm border ${
                        submitMessage.includes("success") || submitMessage.includes("received")
                          ? "bg-green-50 text-green-800 border-green-200"
                          : "bg-red-50 text-red-800 border-red-200"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        {submitMessage.includes("success") || submitMessage.includes("received") ? (
                          <div className="flex-shrink-0">
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        ) : (
                          <div className="flex-shrink-0">
                            <svg className="w-5 h-5 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}
                        <span className="font-medium">{submitMessage}</span>
                      </div>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 font-bold transition-all duration-200 font-oswald text-lg ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 hover:shadow-xl"
                    } text-white disabled:opacity-50`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center space-x-2">
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Processing...</span>
                      </div>
                    ) : (
                      "Express Interest in Team Selection"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
