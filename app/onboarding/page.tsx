"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { UserRole } from "@/lib/supabase/profile-types"
import { useRouter } from "next/navigation"
import { Trophy, Users, GraduationCap, School, Target, ArrowRight, User } from "lucide-react"

const roleOptions = [
  {
    role: "wrestler" as UserRole,
    title: "Wrestler",
    description: "Compete and track your wrestling journey",
    icon: Trophy,
    color: "bg-blue-500",
    features: ["Tournament tracking", "Performance analytics", "College recruiting profile"],
  },
  {
    role: "parent" as UserRole,
    title: "Parent/Guardian",
    description: "Support your wrestler's development",
    icon: Users,
    color: "bg-green-500",
    features: ["Track child's progress", "Tournament schedules", "Communication with coaches"],
  },
  {
    role: "college_coach" as UserRole,
    title: "College Coach",
    description: "Recruit and develop collegiate wrestlers",
    icon: GraduationCap,
    color: "bg-purple-500",
    features: ["Recruiting tools", "Prospect database", "Performance analytics"],
  },
  {
    role: "high_school_coach" as UserRole,
    title: "High School Coach",
    description: "Lead your high school wrestling program",
    icon: School,
    color: "bg-orange-500",
    features: ["Team management", "Tournament organization", "Athlete development"],
  },
  {
    role: "club_coach" as UserRole,
    title: "Club Coach",
    description: "Train wrestlers at the club level",
    icon: Target,
    color: "bg-red-500",
    features: ["Club management", "Training programs", "Competition tracking"],
  },
  {
    role: "generic" as UserRole,
    title: "Other",
    description: "General access to the platform",
    icon: User,
    color: "bg-gray-500",
    features: ["Platform access", "Community features", "Event updates"],
  },
]

export default function OnboardingPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null)
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

  const handleRoleSelection = async (role: UserRole) => {
    if (!user) return

    try {
      // Create initial profile with selected role
      const { error } = await supabase.from("profiles").upsert({
        id: user.id,
        email: user.email,
        role: role,
        role_data: {},
        onboarding_completed: false,
      })

      if (error) {
        console.error("Error creating profile:", error)
        return
      }

      // Redirect to role-specific profile setup
      router.push(`/onboarding/${role}`)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 font-oswald">
              Welcome to NC United Wrestling
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Choose your role to get started with a personalized experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roleOptions.map((option) => {
              const IconComponent = option.icon
              return (
                <Card
                  key={option.role}
                  className={`cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${
                    selectedRole === option.role ? "ring-2 ring-blue-500 shadow-xl" : ""
                  }`}
                  onClick={() => setSelectedRole(option.role)}
                >
                  <CardHeader className="text-center">
                    <div
                      className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-oswald">{option.title}</CardTitle>
                    <CardDescription className="text-slate-600">{option.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {option.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {selectedRole && (
            <div className="mt-12 text-center">
              <Card className="max-w-md mx-auto bg-white/90 backdrop-blur-sm border-0 shadow-xl">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <Badge className="bg-blue-100 text-blue-800 border-blue-300 px-4 py-2">
                      Selected: {roleOptions.find((r) => r.role === selectedRole)?.title}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => handleRoleSelection(selectedRole)}
                    className="w-full bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 text-white font-semibold py-3 font-oswald"
                  >
                    Continue Setup
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
