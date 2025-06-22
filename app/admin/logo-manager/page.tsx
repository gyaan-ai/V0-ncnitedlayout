"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus, Edit, Trash2, Search, ImageIcon, Building, GraduationCap, Users, Upload, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Logo {
  id: number
  name: string
  display_name: string
  type: "college" | "high_school" | "club" | "team"
  file_url: string
  file_name: string
  aliases: string[]
  is_active: boolean
  created_at: string
  updated_at: string
}

// Sample logos for static export
// const sampleLogos: Logo[] = [
//   {
//     id: 1,
//     name: "unc-chapel-hill",
//     display_name: "UNC Chapel Hill",
//     type: "college",
//     file_url: "/images/logos/colleges/unc-chapel-hill.png",
//     file_name: "unc-chapel-hill.png",
//     aliases: ["UNC", "University of North Carolina", "Tar Heels"],
//     is_active: true,
//     created_at: "2024-01-01T00:00:00Z",
//     updated_at: "2024-01-01T00:00:00Z",
//   },
//   {
//     id: 2,
//     name: "cardinal-gibbons-hs",
//     display_name: "Cardinal Gibbons High School",
//     type: "high_school",
//     file_url: "/images/logos/high-schools/cardinal-gibbons.png",
//     file_name: "cardinal-gibbons.png",
//     aliases: ["Cardinal Gibbons", "Gibbons"],
//     is_active: true,
//     created_at: "2024-01-01T00:00:00Z",
//     updated_at: "2024-01-01T00:00:00Z",
//   },
//   {
//     id: 3,
//     name: "raw-wrestling",
//     display_name: "RAW Wrestling Club",
//     type: "club",
//     file_url: "/images/logos/clubs/raw-wrestling.png",
//     file_name: "raw-wrestling.png",
//     aliases: ["RAW", "RAW Wrestling"],
//     is_active: true,
//     created_at: "2024-01-01T00:00:00Z",
//     updated_at: "2024-01-01T00:00:00Z",
//   },
// ]

export default function LogoManagerPage() {
  const [logos, setLogos] = useState<Logo[]>([])
  const [filteredLogos, setFilteredLogos] = useState<Logo[]>([])
  const [selectedType, setSelectedType] = useState<string>("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [uploadLoading, setUploadLoading] = useState(false)
  const [stats, setStats] = useState<Record<string, { total: number; active: number }>>({
    college: { total: 1, active: 1 },
    high_school: { total: 1, active: 1 },
    club: { total: 1, active: 1 },
    team: { total: 0, active: 0 },
  })
  const { toast } = useToast()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form states
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingLogo, setEditingLogo] = useState<Logo | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    display_name: "",
    type: "college" as const,
    file_url: "",
    file_name: "",
    aliases: "",
    file: null as File | null,
  })
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadLogos()
  }, [])

  const loadLogos = async () => {
    setIsLoading(true)
    try {
      console.log("🔄 Loading logos from API...")
      const response = await fetch("/api/admin/logos")
      console.log("📡 API Response status:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("📊 API Response data:", data)

        if (data.success && data.logos) {
          console.log(
            `✅ Found ${data.logos.length} logos:`,
            data.logos.map((l) => ({ name: l.display_name, url: l.file_url })),
          )
          setLogos(data.logos)
          setFilteredLogos(data.logos)

          // Update stats based on actual data
          const newStats = data.logos.reduce(
            (acc, logo) => {
              if (!acc[logo.type]) {
                acc[logo.type] = { total: 0, active: 0 }
              }
              acc[logo.type].total++
              if (logo.is_active) {
                acc[logo.type].active++
              }
              return acc
            },
            {} as Record<string, { total: number; active: number }>,
          )

          setStats(newStats)
          console.log("📈 Updated stats:", newStats)
        } else {
          console.error("❌ API returned unsuccessful response:", data)
        }
      } else {
        console.error("❌ API request failed:", response.status, response.statusText)
      }
    } catch (error) {
      console.error("❌ Error loading logos:", error)
      toast({
        title: "Error Loading Logos",
        description: "Failed to load logos from database. Check console for details.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    filterLogos()
  }, [logos, selectedType, searchTerm])

  const filterLogos = () => {
    let filtered = logos

    if (selectedType !== "all") {
      filtered = filtered.filter((logo) => logo.type === selectedType)
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(
        (logo) =>
          logo.display_name.toLowerCase().includes(term) ||
          logo.name.toLowerCase().includes(term) ||
          logo.aliases.some((alias) => alias.toLowerCase().includes(term)),
      )
    }

    setFilteredLogos(filtered)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Update form data with file
    setFormData({
      ...formData,
      file,
      file_name: file.name,
    })

    // Create preview URL
    const objectUrl = URL.createObjectURL(file)
    setPreviewUrl(objectUrl)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const uploadFile = async (file: File, type: string): Promise<string> => {
    if (!file) return ""

    setUploadLoading(true)
    try {
      // Create form data for upload
      const uploadData = new FormData()
      uploadData.append("file", file)
      uploadData.append("category", `logos/${type}s`) // colleges, high_schools, clubs
      uploadData.append("name", formData.name || formData.display_name.toLowerCase().replace(/[^a-z0-9]/g, "-"))

      // Upload file using your existing API
      const response = await fetch("/api/upload-image", {
        method: "POST",
        body: uploadData,
      })

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const data = await response.json()
      setUploadLoading(false)
      return data.url
    } catch (error) {
      console.error("Error uploading file:", error)
      setUploadLoading(false)
      toast({
        title: "Upload Failed",
        description: "There was a problem uploading your logo.",
        variant: "destructive",
      })
      return ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      let fileUrl = formData.file_url

      // If there's a file to upload, upload it first
      if (formData.file) {
        fileUrl = await uploadFile(formData.file, formData.type)
        if (!fileUrl) return
      }

      const logoData = {
        name: formData.name || formData.display_name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
        display_name: formData.display_name,
        type: formData.type,
        file_url: fileUrl,
        file_name: formData.file_name || fileUrl.split("/").pop() || "",
        aliases: formData.aliases
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      }

      const method = editingLogo ? "PUT" : "POST"
      const url = editingLogo ? `/api/admin/logos/${editingLogo.id}` : "/api/admin/logos"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logoData),
      })

      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          await loadLogos() // Reload from database
          toast({
            title: editingLogo ? "Logo Updated" : "Logo Added",
            description: `${logoData.display_name} has been ${editingLogo ? "updated" : "added"} successfully.`,
          })
          if (editingLogo) {
            setEditingLogo(null)
          } else {
            setIsAddDialogOpen(false)
          }
          resetForm()
        }
      }
    } catch (error) {
      console.error("Error saving logo:", error)
      toast({
        title: "Error",
        description: "Failed to save logo. Please try again.",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    const logoToDelete = logos.find((logo) => logo.id === id)
    setLogos(logos.filter((logo) => logo.id !== id))
    toast({
      title: "Logo Deleted",
      description: `${logoToDelete?.display_name || "Logo"} has been deleted.`,
    })
  }

  const resetForm = () => {
    setFormData({
      name: "",
      display_name: "",
      type: "college",
      file_url: "",
      file_name: "",
      aliases: "",
      file: null,
    })
    setPreviewUrl("")
  }

  const startEdit = (logo: Logo) => {
    setEditingLogo(logo)
    setFormData({
      name: logo.name,
      display_name: logo.display_name,
      type: logo.type,
      file_url: logo.file_url,
      file_name: logo.file_name,
      aliases: logo.aliases.join(", "),
      file: null,
    })
    setPreviewUrl(logo.file_url)
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "college":
        return <GraduationCap className="h-4 w-4" />
      case "high_school":
        return <Building className="h-4 w-4" />
      case "club":
        return <Users className="h-4 w-4" />
      default:
        return <ImageIcon className="h-4 w-4" />
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "college":
        return "bg-blue-100 text-blue-800"
      case "high_school":
        return "bg-green-100 text-green-800"
      case "club":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handleCancelEdit = () => {
    setEditingLogo(null)
    resetForm()
  }

  const clearFileSelection = () => {
    setFormData({
      ...formData,
      file: null,
      file_name: "",
    })
    setPreviewUrl(editingLogo?.file_url || "")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <ImageIcon className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-black text-slate-800 font-oswald">Logo Management</h1>
                <p className="text-slate-600">Manage college, high school, and club logos</p>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-black text-blue-600 mb-1 font-oswald">{stats.college?.active || 0}</div>
                  <div className="text-xs text-slate-600">Colleges</div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-black text-green-600 mb-1 font-oswald">
                    {stats.high_school?.active || 0}
                  </div>
                  <div className="text-xs text-slate-600">High Schools</div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-black text-purple-600 mb-1 font-oswald">{stats.club?.active || 0}</div>
                  <div className="text-xs text-slate-600">Clubs</div>
                </CardContent>
              </Card>
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg">
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-black text-slate-600 mb-1 font-oswald">
                    {Object.values(stats).reduce((sum, stat) => sum + (stat.active || 0), 0)}
                  </div>
                  <div className="text-xs text-slate-600">Total Logos</div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search logos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="college">Colleges</SelectItem>
                <SelectItem value="high_school">High Schools</SelectItem>
                <SelectItem value="club">Clubs</SelectItem>
                <SelectItem value="team">Teams</SelectItem>
              </SelectContent>
            </Select>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-[#1a1b5c] hover:bg-[#1a1b5c]/90">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Logo
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>Add New Logo</DialogTitle>
                    <DialogDescription>Upload a new logo to the library</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="display_name">Display Name</Label>
                      <Input
                        id="display_name"
                        value={formData.display_name}
                        onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                        placeholder="e.g., UNC Chapel Hill"
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="type">Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="college">College</SelectItem>
                          <SelectItem value="high_school">High School</SelectItem>
                          <SelectItem value="club">Club</SelectItem>
                          <SelectItem value="team">Team</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Logo Upload Section */}
                    <div className="grid gap-2">
                      <Label>Logo Image</Label>
                      <div className="flex flex-col items-center gap-4">
                        {/* Preview Area */}
                        {previewUrl ? (
                          <div className="relative w-40 h-40 bg-gray-50 rounded-lg flex items-center justify-center border">
                            <img
                              src={previewUrl || "/placeholder.svg"}
                              alt="Logo preview"
                              className="max-w-full max-h-full object-contain p-2"
                            />
                            <button
                              type="button"
                              onClick={clearFileSelection}
                              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <div className="w-40 h-40 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed">
                            <ImageIcon className="h-12 w-12 text-gray-300" />
                          </div>
                        )}

                        {/* Upload Button */}
                        <div className="w-full">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="logo-upload"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadLoading}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            {uploadLoading ? "Uploading..." : "Upload Logo"}
                          </Button>
                        </div>

                        {/* Manual URL Option */}
                        <div className="w-full text-center">
                          <div className="text-xs text-gray-500 mb-2">Or enter URL manually</div>
                          <Input
                            value={formData.file_url}
                            onChange={(e) => {
                              setFormData({ ...formData, file_url: e.target.value })
                              if (e.target.value && !formData.file) {
                                setPreviewUrl(e.target.value)
                              }
                            }}
                            placeholder="/images/logos/colleges/unc-chapel-hill.png"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="aliases">Aliases (comma-separated)</Label>
                      <Textarea
                        id="aliases"
                        value={formData.aliases}
                        onChange={(e) => setFormData({ ...formData, aliases: e.target.value })}
                        placeholder="UNC, University of North Carolina, Tar Heels"
                        rows={2}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={uploadLoading || saving}>
                      {uploadLoading ? "Uploading..." : saving ? "Saving..." : "Add Logo"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Logo Grid */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading logos...</p>
            </div>
          ) : filteredLogos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredLogos.map((logo) => (
                <Card
                  key={logo.id}
                  className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <Badge className={`${getTypeBadgeColor(logo.type)} flex items-center gap-1`}>
                        {getTypeIcon(logo.type)}
                        {logo.type.replace("_", " ")}
                      </Badge>
                      <div className="flex gap-1">
                        <Button size="icon" variant="ghost" onClick={() => startEdit(logo)} className="h-8 w-8">
                          <Edit className="h-3 w-3" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-red-600 hover:text-red-700">
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Logo</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete {logo.display_name}? This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDelete(logo.id)}>Delete</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>

                    <div className="flex items-center justify-center h-20 bg-gray-50 rounded-lg mb-3">
                      <img
                        src={logo.file_url || "/placeholder.svg"}
                        alt={logo.display_name}
                        className="max-h-full max-w-full object-contain p-2"
                        onError={(e) => {
                          console.error(`❌ Failed to load logo: ${logo.display_name}`)
                          console.error(`❌ URL: ${logo.file_url}`)
                          ;(e.target as HTMLImageElement).src =
                            `/placeholder.svg?height=60&width=60&text=${encodeURIComponent(logo.display_name.substring(0, 3))}`
                        }}
                        onLoad={() => {
                          console.log(`✅ Successfully loaded logo: ${logo.display_name} from ${logo.file_url}`)
                        }}
                      />
                    </div>

                    <h3 className="font-semibold text-sm mb-1">{logo.display_name}</h3>
                    <p className="text-xs text-gray-500 mb-2">{logo.file_name}</p>

                    {logo.aliases.length > 0 && (
                      <div className="text-xs text-gray-400">
                        Aliases: {logo.aliases.slice(0, 2).join(", ")}
                        {logo.aliases.length > 2 && "..."}
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <ImageIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No logos found</h3>
              <p className="text-gray-500">Try adjusting your search or add a new logo.</p>
            </div>
          )}

          {/* Edit Dialog */}
          {editingLogo && (
            <Dialog open={!!editingLogo} onOpenChange={() => setEditingLogo(null)}>
              <DialogContent className="sm:max-w-md">
                <form onSubmit={handleSubmit}>
                  <DialogHeader>
                    <DialogTitle>Edit Logo</DialogTitle>
                    <DialogDescription>Update logo information</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="edit_display_name">Display Name</Label>
                      <Input
                        id="edit_display_name"
                        value={formData.display_name}
                        onChange={(e) => setFormData({ ...formData, display_name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="edit_type">Type</Label>
                      <Select
                        value={formData.type}
                        onValueChange={(value: any) => setFormData({ ...formData, type: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="college">College</SelectItem>
                          <SelectItem value="high_school">High School</SelectItem>
                          <SelectItem value="club">Club</SelectItem>
                          <SelectItem value="team">Team</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Logo Upload Section */}
                    <div className="grid gap-2">
                      <Label>Logo Image</Label>
                      <div className="flex flex-col items-center gap-4">
                        {/* Preview Area */}
                        {previewUrl ? (
                          <div className="relative w-40 h-40 bg-gray-50 rounded-lg flex items-center justify-center border">
                            <img
                              src={previewUrl || "/placeholder.svg"}
                              alt="Logo preview"
                              className="max-w-full max-h-full object-contain p-2"
                            />
                            {formData.file && (
                              <button
                                type="button"
                                onClick={clearFileSelection}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="w-40 h-40 bg-gray-50 rounded-lg flex items-center justify-center border border-dashed">
                            <ImageIcon className="h-12 w-12 text-gray-300" />
                          </div>
                        )}

                        {/* Upload Button */}
                        <div className="w-full">
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            id="logo-upload-edit"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            className="w-full"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploadLoading}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            {uploadLoading ? "Uploading..." : "Replace Logo"}
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="edit_aliases">Aliases (comma-separated)</Label>
                      <Textarea
                        id="edit_aliases"
                        value={formData.aliases}
                        onChange={(e) => setFormData({ ...formData, aliases: e.target.value })}
                        rows={2}
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={uploadLoading || saving}>
                      {uploadLoading ? "Uploading..." : saving ? "Saving..." : "Update Logo"}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>
    </div>
  )
}
