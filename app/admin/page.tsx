"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  GraduationCap,
  Upload,
  Settings,
  Database,
  FileText,
  Trophy,
  Star,
  Target,
  BarChart3,
  UserPlus,
  ImageIcon,
  Globe,
} from "lucide-react"
import Link from "next/link"

export default function AdminDashboard() {
  const adminSections = [
    {
      title: "Athlete Management",
      description: "Central hub for all athlete profiles, commitments, and recruiting data",
      icon: Users,
      href: "/admin/athlete-management",
      color: "bg-blue-500",
      badge: "Primary",
      features: ["Create & edit profiles", "Track achievements", "Manage commitments", "Recruiting portal data"],
    },
    {
      title: "Commitments Portal",
      description: "Manage college commitments and commitment cards",
      icon: GraduationCap,
      href: "/admin/commits",
      color: "bg-green-500",
      badge: "Ready",
      features: ["Add commitments", "Generate cards", "Track college choices", "Manage announcements"],
    },
    {
      title: "Tournament Management",
      description: "Manage tournament registrations and results",
      icon: Trophy,
      href: "/admin/tournaments",
      color: "bg-yellow-500",
      features: ["UCD 2025 Registration", "NHSCA Results", "Tournament Cards"],
    },
    {
      title: "Content Management",
      description: "Manage website content and blog posts",
      icon: FileText,
      href: "/admin/content",
      color: "bg-green-500",
      features: ["Blog posts", "News articles", "Team updates"],
    },
    {
      title: "Logo & Media Manager",
      description: "Upload and manage college logos and media assets",
      icon: ImageIcon,
      href: "/admin/logo-manager-simple",
      color: "bg-purple-500",
      features: ["College logos", "Team photos", "Media library"],
    },
    {
      title: "Bulk Import Tools",
      description: "Import athlete data and institutional information",
      icon: Upload,
      href: "/admin/bulk-import",
      color: "bg-orange-500",
      features: ["CSV import", "Institution data", "Batch operations"],
    },
    {
      title: "System Settings",
      description: "Configure system settings and integrations",
      icon: Settings,
      href: "/admin/settings",
      color: "bg-gray-500",
      features: ["Database setup", "API configuration", "User management"],
    },
  ]

  const quickStats = [
    { label: "Total Athletes", value: "156", icon: Users, color: "text-blue-600" },
    { label: "Committed", value: "23", icon: GraduationCap, color: "text-green-600" },
    { label: "Featured", value: "8", icon: Star, color: "text-yellow-600" },
    { label: "Active Profiles", value: "142", icon: Target, color: "text-red-600" },
  ]

  const recentActivity = [
    { action: "New athlete profile created", item: "John Smith", time: "2 hours ago" },
    { action: "Commitment updated", item: "Sarah Johnson → Duke University", time: "4 hours ago" },
    { action: "Achievement added", item: "Mike Wilson - NHSCA Champion", time: "6 hours ago" },
    { action: "Logo uploaded", item: "University of North Carolina", time: "1 day ago" },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Manage all aspects of NC United Wrestling - Using Neon Database</p>
        </div>
        <div className="flex gap-3">
          <Link href="/">
            <Button variant="outline">
              <Globe className="h-4 w-4 mr-2" />
              View Site
            </Button>
          </Link>
          <Link href="/admin/athlete-management">
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Quick Add Athlete
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Admin Sections */}
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-6">Admin Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {adminSections.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${section.color} text-white`}>
                      <section.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{section.title}</CardTitle>
                      {section.badge && (
                        <Badge variant="secondary" className="mt-1">
                          {section.badge}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1 text-sm text-gray-600 mb-4">
                    {section.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={section.href}>
                    <Button className="w-full">Access {section.title}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex flex-col gap-1">
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-sm text-blue-600">{activity.item}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    {index < recentActivity.length - 1 && <div className="border-b mt-2" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Link href="/admin/athlete-management">
                <Button variant="outline" className="w-full justify-start">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add New Athlete
                </Button>
              </Link>
              <Link href="/admin/commits">
                <Button variant="outline" className="w-full justify-start">
                  <GraduationCap className="h-4 w-4 mr-2" />
                  Add Commitment
                </Button>
              </Link>
              <Link href="/admin/bulk-import">
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                </Button>
              </Link>
              <Link href="/admin/logo-manager-simple">
                <Button variant="outline" className="w-full justify-start">
                  <ImageIcon className="h-4 w-4 mr-2" />
                  Upload Logo
                </Button>
              </Link>
              <Link href="/blog/admin">
                <Button variant="outline" className="w-full justify-start">
                  <FileText className="h-4 w-4 mr-2" />
                  Create Post
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Neon Database</span>
                  <Badge variant="default" className="bg-green-500">
                    Online
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">File Storage</span>
                  <Badge variant="default" className="bg-green-500">
                    Online
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">API Status</span>
                  <Badge variant="default" className="bg-green-500">
                    Ready
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Data Entry Portal</span>
                  <Badge variant="default" className="bg-green-500">
                    Ready for Tomorrow
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
