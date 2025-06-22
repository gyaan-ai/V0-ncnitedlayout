"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Search,
  Download,
  Mail,
  Phone,
  Calendar,
  User,
  Trophy,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  UserCheck,
} from "lucide-react"
import Link from "next/link"

export default function UCD2025Registrations() {
  const [interests, setInterests] = useState<any[]>([])
  const [filteredInterests, setFilteredInterests] = useState<any[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [teamFilter, setTeamFilter] = useState("all")
  const [returningFilter, setReturningFilter] = useState("all")
  const [selectedRegistration, setSelectedRegistration] = useState<any>(null)
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
    blueTeam: 0,
    goldTeam: 0,
    returning: 0,
    new: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchInterests()
  }, [])

  useEffect(() => {
    let filtered = interests

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (reg) =>
          reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          reg.highSchool.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((reg) => reg.status === statusFilter)
    }

    // Apply team filter
    if (teamFilter !== "all") {
      filtered = filtered.filter((reg) => reg.team === teamFilter)
    }

    // Apply returning filter
    if (returningFilter !== "all") {
      const isReturning = returningFilter === "returning"
      filtered = filtered.filter((reg) => {
        const hasExperience =
          reg.previousExperience &&
          (reg.previousExperience.includes("UCD 2024") || reg.previousExperience.includes("2025 NHSCA Duals"))
        return isReturning ? hasExperience : !hasExperience
      })
    }

    setFilteredInterests(filtered)
  }, [searchTerm, statusFilter, teamFilter, returningFilter, interests])

  const fetchInterests = async () => {
    try {
      const response = await fetch("/api/registrations/ucd-2025")
      const data = await response.json()

      if (data.success) {
        setInterests(data.registrations || []) // Add fallback to empty array
        setStats(
          data.stats || {
            total: 0,
            pending: 0,
            approved: 0,
            rejected: 0,
            blueTeam: 0,
            goldTeam: 0,
            returning: 0,
            new: 0,
          },
        )
      }
    } catch (error) {
      console.error("Error fetching interests:", error)
      setInterests([]) // Set empty array on error
    } finally {
      setLoading(false)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-amber-100 text-amber-800 border-amber-300">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge className="bg-emerald-100 text-emerald-800 border-emerald-300">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      const response = await fetch("/api/registrations/ucd-2025", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, status: newStatus }),
      })

      if (response.ok) {
        // Refresh data
        fetchInterests()
      }
    } catch (error) {
      console.error("Error updating status:", error)
    }
  }

  const isReturningWrestler = (reg: any) => {
    return (
      reg.previousExperience &&
      (reg.previousExperience.includes("UCD 2024") || reg.previousExperience.includes("2025 NHSCA Duals"))
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Loading registrations...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-4xl font-black text-slate-800 font-oswald">UCD 2025 Interest Forms</h1>
                <p className="text-slate-600">Manage team selection interest submissions</p>
              </div>
              <div className="flex gap-3">
                <Link href="/admin">
                  <Button variant="outline">← Back to Admin</Button>
                </Link>
                <Button className="bg-emerald-600 hover:bg-emerald-700">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-black text-slate-800 mb-1 font-oswald">{stats.total}</div>
                  <div className="text-xs text-slate-600">Total</div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-black text-blue-600 mb-1 font-oswald">{stats.blueTeam}</div>
                  <div className="text-xs text-slate-600">Blue Team</div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-black text-amber-600 mb-1 font-oswald">{stats.goldTeam}</div>
                  <div className="text-xs text-slate-600">Gold Team</div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-black text-purple-600 mb-1 font-oswald">{stats.returning}</div>
                  <div className="text-xs text-slate-600">Returning</div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-black text-green-600 mb-1 font-oswald">{stats.new}</div>
                  <div className="text-xs text-slate-600">New</div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-64">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search by name, email, or school..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select value={teamFilter} onValueChange={setTeamFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Team" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Teams</SelectItem>
                  <SelectItem value="Blue">Blue Team</SelectItem>
                  <SelectItem value="Gold">Gold Team</SelectItem>
                </SelectContent>
              </Select>
              <Select value={returningFilter} onValueChange={setReturningFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Wrestlers</SelectItem>
                  <SelectItem value="returning">Returning</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Registrations List */}
          <div className="grid gap-4">
            {filteredInterests && filteredInterests.length > 0
              ? filteredInterests.map((registration) => (
                  <Card
                    key={registration.id}
                    className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-red-600 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <h3 className="text-lg font-black text-slate-800 font-oswald">{registration.name}</h3>
                            <p className="text-sm text-slate-600">
                              {registration.highSchool} • Grade {registration.grade}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          {getStatusBadge(registration.status)}
                          <Badge
                            className={`${registration.team === "Blue" ? "bg-blue-100 text-blue-800 border-blue-300" : "bg-amber-100 text-amber-800 border-amber-300"}`}
                          >
                            {registration.team} Team
                          </Badge>
                          {isReturningWrestler(registration) && (
                            <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                              <UserCheck className="h-3 w-3 mr-1" />
                              Returning
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Mail className="h-4 w-4" />
                          <span>{registration.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Phone className="h-4 w-4" />
                          <span>{registration.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Trophy className="h-4 w-4" />
                          <span>{registration.weightClass}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(registration.submittedAt).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-slate-600">
                          <strong>Parent:</strong> {registration.parentName} • {registration.parentEmail}
                          {registration.previousExperience && (
                            <div className="mt-1">
                              <strong>Experience:</strong> {registration.previousExperience}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => setSelectedRegistration(registration)}>
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          {registration.status === "pending" && (
                            <>
                              <Button
                                size="sm"
                                className="bg-emerald-600 hover:bg-emerald-700"
                                onClick={() => updateStatus(registration.id, "approved")}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => updateStatus(registration.id, "rejected")}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              : null}
          </div>

          {filteredInterests.length === 0 && (
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
              <CardContent className="p-12 text-center">
                <div className="text-slate-400 mb-4">
                  <Search className="h-12 w-12 mx-auto" />
                </div>
                <h3 className="text-lg font-black text-slate-800 mb-2 font-oswald">No interest forms found</h3>
                <p className="text-slate-600">Try adjusting your search or filter criteria</p>
              </CardContent>
            </Card>
          )}

          {/* Registration Detail Modal */}
          {selectedRegistration && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <Card className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-oswald">{selectedRegistration.name} - Interest Details</CardTitle>
                    <Button variant="ghost" onClick={() => setSelectedRegistration(null)}>
                      ×
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Wrestler Information</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Name:</strong> {selectedRegistration.name}
                        </p>
                        <p>
                          <strong>Age:</strong> {selectedRegistration.age}
                        </p>
                        <p>
                          <strong>Grade:</strong> {selectedRegistration.grade}
                        </p>
                        <p>
                          <strong>High School:</strong> {selectedRegistration.highSchool}
                        </p>
                        <p>
                          <strong>Club:</strong> {selectedRegistration.club || "None"}
                        </p>
                        <p>
                          <strong>Team Interest:</strong> {selectedRegistration.team} Team
                        </p>
                        <p>
                          <strong>Weight Class:</strong> {selectedRegistration.weightClass}
                        </p>
                        <p>
                          <strong>Previous Experience:</strong> {selectedRegistration.previousExperience}
                        </p>
                        {isReturningWrestler(selectedRegistration) && (
                          <Badge className="bg-purple-100 text-purple-800 border-purple-300">
                            <UserCheck className="h-3 w-3 mr-1" />
                            Returning Wrestler
                          </Badge>
                        )}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Contact Information</h4>
                      <div className="space-y-2 text-sm">
                        <p>
                          <strong>Parent Name:</strong> {selectedRegistration.parentName}
                        </p>
                        <p>
                          <strong>Parent Email:</strong> {selectedRegistration.parentEmail}
                        </p>
                        <p>
                          <strong>Parent Phone:</strong> {selectedRegistration.parentPhone}
                        </p>
                        <p>
                          <strong>Date of Birth:</strong> {selectedRegistration.dateOfBirth}
                        </p>
                        <p>
                          <strong>Submitted:</strong> {new Date(selectedRegistration.submittedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  {selectedRegistration.additionalInfo && (
                    <div>
                      <h4 className="font-semibold text-slate-800 mb-2">Additional Information</h4>
                      <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded">
                        {selectedRegistration.additionalInfo}
                      </p>
                    </div>
                  )}
                  <div className="flex gap-3 pt-4">
                    {selectedRegistration.status === "pending" && (
                      <>
                        <Button
                          className="bg-emerald-600 hover:bg-emerald-700"
                          onClick={() => {
                            updateStatus(selectedRegistration.id, "approved")
                            setSelectedRegistration(null)
                          }}
                        >
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Accept Interest
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={() => {
                            updateStatus(selectedRegistration.id, "rejected")
                            setSelectedRegistration(null)
                          }}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Decline Interest
                        </Button>
                      </>
                    )}
                    <Button variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
