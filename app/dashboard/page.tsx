"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarDays, Edit, Medal, User, LogOut, RefreshCw, AlertTriangle, CheckCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Link from "next/link"

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [profile, setProfile] = useState<any>(null)
  const [authStatus, setAuthStatus] = useState<"checking" | "authenticated" | "unauthenticated" | "offline">("checking")
  const [showOfflineMode, setShowOfflineMode] = useState(false)

  // Try auth but don't block the UI
  const tryAuth = async () => {
    try {
      const supabase = createClient()

      // Quick check - if this hangs, we'll show offline mode
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error("timeout")), 3000)
      })

      const authPromise = supabase.auth.getUser()
      const { data, error } = (await Promise.race([authPromise, timeoutPromise])) as any

      if (error) throw error

      if (data?.user) {
        setUser(data.user)
        setAuthStatus("authenticated")

        // Try to get profile (non-blocking)
        try {
          const { data: profile } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()
          setProfile(profile || null)
        } catch (e) {
          console.log("Profile fetch failed, continuing without profile")
        }
      } else {
        setAuthStatus("unauthenticated")
      }
    } catch (error: any) {
      console.log("Auth check failed:", error.message)
      setAuthStatus("offline")
      setShowOfflineMode(true)
    }
  }

  useEffect(() => {
    tryAuth()
  }, [])

  const handleSignOut = async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      setAuthStatus("unauthenticated")
    } catch (error) {
      console.error("Sign out error:", error)
      // Even if sign out fails, clear local state
      setUser(null)
      setProfile(null)
      setAuthStatus("unauthenticated")
    }
  }

  const getUserDisplayName = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name} ${profile.last_name}`
    }
    if (user?.email) {
      return user.email.split("@")[0]
    }
    return "User"
  }

  const getUserInitials = () => {
    if (profile?.first_name && profile?.last_name) {
      return `${profile.first_name[0]}${profile.last_name[0]}`.toUpperCase()
    }
    if (user?.email) {
      return user.email[0].toUpperCase()
    }
    return "U"
  }

  // Show loading only briefly
  if (authStatus === "checking") {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-gray-600 mb-2">Checking authentication...</p>
        <Button variant="outline" onClick={() => setAuthStatus("offline")} className="mt-4">
          Continue Without Auth
        </Button>
      </div>
    )
  }

  // Offline/Demo Mode Dashboard
  if (authStatus === "offline" || showOfflineMode) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Dashboard (Demo Mode)</h1>
          <div className="flex gap-2">
            <Button onClick={tryAuth} variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Auth Again
            </Button>
            <Button asChild>
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>

        <Alert className="mb-6 border-yellow-200 bg-yellow-50">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-800">
            Authentication service is unavailable. You're viewing the dashboard in demo mode.
            <Button variant="link" className="p-0 h-auto text-yellow-800 underline ml-1" onClick={tryAuth}>
              Try connecting again
            </Button>
          </AlertDescription>
        </Alert>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Demo Profile Card */}
          <Card className="md:col-span-1">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Your Profile</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent className="flex flex-col items-center pt-6">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarFallback>DM</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">Demo User</h3>
              <p className="text-sm text-muted-foreground">Member</p>
              <p className="text-xs text-gray-500 mt-1">demo@example.com</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" className="w-full">
                <Link href="/login">
                  <Edit className="mr-2 h-4 w-4" />
                  Sign In to Edit Profile
                </Link>
              </Button>
            </CardFooter>
          </Card>

          {/* Demo Content */}
          <div className="md:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
                <TabsTrigger value="team">Team</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Welcome to NC United Wrestling!</CardTitle>
                    <CardDescription>
                      This is a preview of your dashboard. Sign in to access your personal data.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center py-8">
                      <h3 className="text-lg font-medium mb-2">Dashboard Demo Mode</h3>
                      <p className="text-gray-600 mb-4">
                        The authentication service is temporarily unavailable, but you can still explore the interface.
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Button asChild>
                          <Link href="/login">Sign In</Link>
                        </Button>
                        <Button variant="outline" asChild>
                          <Link href="/">Explore Site</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                      <Medal className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">Sign in to view your activity</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                      <CalendarDays className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">Sign in to view your events</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="events" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>Sign in to view and manage your events.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Authentication required to view events.</p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="team" className="space-y-4 mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Team Members</CardTitle>
                    <CardDescription>Sign in to view your team.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Authentication required to view team members.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    )
  }

  // Unauthenticated state
  if (authStatus === "unauthenticated") {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Dashboard Access</CardTitle>
            <CardDescription>Please sign in to access your personal dashboard</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className="border-blue-200 bg-blue-50">
              <CheckCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800">
                Authentication service is working properly. Please sign in to continue.
              </AlertDescription>
            </Alert>

            <div className="flex flex-col gap-2">
              <Button asChild className="w-full">
                <Link href="/login">Sign In</Link>
              </Button>

              <Button variant="outline" onClick={tryAuth} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Check Auth Again
              </Button>

              <Button variant="ghost" onClick={() => setShowOfflineMode(true)} className="w-full">
                View Demo Dashboard
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Link href="/" className="text-sm text-blue-600 hover:underline">
              Return to Homepage
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }

  // Authenticated state - full dashboard
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <Button onClick={handleSignOut} variant="outline">
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>

      <Alert className="mb-6 border-green-200 bg-green-50">
        <CheckCircle className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          Successfully authenticated! Welcome back, {getUserDisplayName()}.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="md:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Profile</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex flex-col items-center pt-6">
            <Avatar className="h-24 w-24 mb-4">
              <AvatarImage src={profile?.avatar_url || ""} alt={getUserDisplayName()} />
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-bold">{getUserDisplayName()}</h3>
            <p className="text-sm text-muted-foreground capitalize">{profile?.role?.replace("_", " ") || "Member"}</p>
            <p className="text-xs text-gray-500 mt-1">{user.email}</p>
          </CardContent>
          <CardFooter>
            <Button asChild variant="outline" className="w-full">
              <Link href="/profile/edit">
                <Edit className="mr-2 h-4 w-4" />
                Edit Profile
              </Link>
            </Button>
          </CardFooter>
        </Card>

        {/* Main Content Area */}
        <div className="md:col-span-2">
          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Welcome back, {getUserDisplayName()}!</CardTitle>
                  <CardDescription>Here's what's happening with your wrestling activities.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center py-8">
                    <h3 className="text-lg font-medium mb-2">Dashboard Loaded Successfully! 🎉</h3>
                    <p className="text-gray-600 mb-4">
                      Your authentication is working properly. You can now access all features.
                    </p>
                    {!profile && (
                      <Button asChild>
                        <Link href="/profile/edit">Complete Your Profile</Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                    <Medal className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">No recent activity</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                    <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">No upcoming events</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="events" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                  <CardDescription>View and manage your upcoming events.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No upcoming events scheduled.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="team" className="space-y-4 mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>View your team or training partners.</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">No team members found.</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
