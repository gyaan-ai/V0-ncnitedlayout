"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function TestLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleTest = async () => {
    setLoading(true)
    setMessage("Testing...")

    try {
      const supabase = createClient()
      console.log("Supabase client created:", supabase)

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })

      console.log("Sign in result:", { data, error })

      if (error) {
        setMessage(`❌ Error: ${error.message}`)
      } else {
        setMessage("✅ Sign in successful!")
        console.log("User:", data.user)
      }
    } catch (err: any) {
      console.error("Catch error:", err)
      setMessage(`❌ Catch error: ${err.message}`)
    }

    setLoading(false)
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test Login</h1>

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <button
          onClick={handleTest}
          disabled={loading}
          className="w-full p-2 bg-blue-500 text-white rounded disabled:opacity-50"
        >
          {loading ? "Testing..." : "Test Sign In"}
        </button>

        {message && <div className="p-2 border rounded bg-gray-50">{message}</div>}
      </div>
    </div>
  )
}
