"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

export default function AuthRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    // Create Supabase client
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)

    // Check if user is already authenticated
    const checkAuth = async () => {
      const { data, error } = await supabase.auth.getSession()

      if (data?.session) {
        // User is authenticated, redirect to dashboard
        router.push("/dashboard")
      } else {
        // User is not authenticated, redirect to login
        router.push("/login")
      }
    }

    checkAuth()
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p>Please wait while we complete your authentication.</p>
      </div>
    </div>
  )
}
