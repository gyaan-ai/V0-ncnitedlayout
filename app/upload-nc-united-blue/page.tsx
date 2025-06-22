"use client"

import type React from "react"

import { useState } from "react"

export default function UploadNCUnitedBlue() {
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<any>(null)

  const handleUpload = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setUploading(true)

    const formData = new FormData(e.currentTarget)

    try {
      const response = await fetch("/api/admin/upload-nc-united-blue-logo", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()
      setResult(data)
    } catch (error) {
      setResult({ error: "Upload failed" })
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Upload NC United Blue Logo</h1>

        <form onSubmit={handleUpload} className="bg-white p-6 rounded-lg shadow">
          <div className="mb-4">
            <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-2">
              Select NC United Blue Logo
            </label>
            <input
              type="file"
              id="file"
              name="file"
              accept="image/*"
              required
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload Logo"}
          </button>
        </form>

        {result && (
          <div className="mt-6 p-4 rounded-lg bg-white shadow">
            {result.success ? (
              <div className="text-green-600">
                <p className="font-semibold">✅ Success!</p>
                <p className="text-sm mt-1">{result.message}</p>
                <p className="text-xs text-gray-500 mt-2 break-all">URL: {result.url}</p>
              </div>
            ) : (
              <div className="text-red-600">
                <p className="font-semibold">❌ Error</p>
                <p className="text-sm mt-1">{result.error}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
