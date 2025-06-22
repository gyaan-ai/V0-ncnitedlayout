"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function DebugAuthPage() {
  const searchParams = useSearchParams()
  const [urlInfo, setUrlInfo] = useState<any>({})

  useEffect(() => {
    setUrlInfo({
      fullUrl: window.location.href,
      code: searchParams.get("code"),
      token: searchParams.get("token"),
      type: searchParams.get("type"),
      allParams: Object.fromEntries(searchParams.entries()),
    })
  }, [searchParams])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Auth Debug Info</h1>
      <pre className="bg-gray-100 p-4 rounded text-sm">{JSON.stringify(urlInfo, null, 2)}</pre>
    </div>
  )
}
