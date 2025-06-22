"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Edit, Eye } from "lucide-react"

interface Commit {
  id: string
  first_name: string
  last_name: string
  college_committed: string
  college_division: string
  commitment_date: string
  profile_image_url?: string
  commitment_image_url?: string
  is_featured: boolean
}

export default function CommitList() {
  const [commits, setCommits] = useState<Commit[]>([])
  const [filteredCommits, setFilteredCommits] = useState<Commit[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCommits()
  }, [])

  useEffect(() => {
    const filtered = commits.filter(
      (commit) =>
        `${commit.first_name} ${commit.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        commit.college_committed?.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    setFilteredCommits(filtered)
  }, [commits, searchTerm])

  const fetchCommits = async () => {
    try {
      const response = await fetch("/api/admin/commits")
      if (response.ok) {
        const data = await response.json()
        setCommits(data)
      }
    } catch (error) {
      console.error("Error fetching commits:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading commits...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search commits by name or college..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Badge variant="secondary">{filteredCommits.length} commits</Badge>
      </div>

      <div className="grid gap-4">
        {filteredCommits.map((commit) => (
          <Card key={commit.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {commit.profile_image_url && (
                    <img
                      src={commit.profile_image_url || "/placeholder.svg"}
                      alt={`${commit.first_name} ${commit.last_name}`}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">
                      {commit.first_name} {commit.last_name}
                    </h3>
                    <p className="text-gray-600">
                      {commit.college_committed} • {commit.college_division}
                    </p>
                    {commit.commitment_date && (
                      <p className="text-sm text-gray-500">
                        Committed: {new Date(commit.commitment_date).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {commit.is_featured && <Badge variant="default">Featured</Badge>}
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCommits.length === 0 && !loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">No commits found matching your search.</p>
        </div>
      )}
    </div>
  )
}
