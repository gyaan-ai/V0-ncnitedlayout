"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function DebugPage() {
  const [status, setStatus] = useState("Checking...")
  const [envVars, setEnvVars] = useState<any>({})

  useEffect(() => {
    const checkSupabase = async () => {
      try {
        const supabase = createClient()

        // Check environment variables
        setEnvVars({
          url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing",
          key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? "✅ Set" : "❌ Missing",
        })

        // Test connection
        const { data, error } = await supabase.auth.getSession()

        if (error) {
          setStatus(`❌ Error: ${error.message}`)
        } else {
          setStatus("✅ Supabase connection working!")
        }
      } catch (err: any) {
        setStatus(`❌ Connection failed: ${err.message}`)
      }
    }

    checkSupabase()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase Debug</h1>

      <div className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Environment Variables:</h2>
          <p>NEXT_PUBLIC_SUPABASE_URL: {envVars.url}</p>
          <p>NEXT_PUBLIC_SUPABASE_ANON_KEY: {envVars.key}</p>
        </div>

        <div>
          <h2 className="text-lg font-semibold">Connection Status:</h2>
          <p>{status}</p>
        </div>
      </div>
    </div>
  )
}
