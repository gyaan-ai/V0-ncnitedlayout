import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Instagram, Facebook, Twitter, Youtube } from "lucide-react"

const mediaResources = [
  { name: "Press Releases", href: "/press-releases" },
  { name: "Photo Gallery", href: "/photos" },
  { name: "Video Library", href: "/videos" },
  { name: "Media Kit", href: "/media-kit" },
]

const resources = [
  { name: "Tournament Schedule", href: "/tournaments" },
  { name: "Rankings", href: "/rankings" },
  { name: "Rules & Regulations", href: "/rules" },
  { name: "Coaching Resources", href: "/coaching" },
]

const insideUnited = [
  { name: "News & Updates", href: "/news" },
  { name: "Athlete Spotlights", href: "/athletes" },
  { name: "Coach Interviews", href: "/interviews" },
  { name: "Event Recaps", href: "/recaps" },
]

const joinMovement = [
  { name: "Become a Member", href: "/membership" },
  { name: "Volunteer", href: "/volunteer" },
  { name: "Sponsor Us", href: "/sponsors" },
  { name: "Partner With Us", href: "/partners" },
]

const socialLinks = [
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Twitter", icon: Twitter, href: "#" },
  { name: "YouTube", icon: Youtube, href: "#" },
]

export default function Footer() {
  return (
    <footer className="bg-[#1a1b5c] border-t-4 border-[#bc0c03]">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Media Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Media Resources</h3>
            <ul className="space-y-2">
              {mediaResources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-[#bc0c03] transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-[#bc0c03] transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Inside United */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Inside United</h3>
            <ul className="space-y-2">
              {insideUnited.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-[#bc0c03] transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Join the Movement */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Join the Movement</h3>
            <ul className="space-y-2">
              {joinMovement.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-[#bc0c03] transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media and Donation */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 md:pt-8 border-t border-gray-600">
          <div className="flex items-center space-x-4 mb-6 md:mb-0">
            {socialLinks.map((social) => {
              const IconComponent = social.icon
              return (
                <Link
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-[#bc0c03] hover:bg-[#9a0a02] flex items-center justify-center transition-colors duration-200"
                  aria-label={social.name}
                >
                  <IconComponent className="w-5 h-5 text-white" />
                </Link>
              )
            })}
          </div>

          <Button className="bg-[#bc0c03] hover:bg-[#9a0a02] text-white font-bold px-6 md:px-8 py-3 w-full md:w-auto">
            MAKE A DONATION
          </Button>
        </div>

        {/* Copyright */}
        <div className="text-center pt-6 md:pt-8 border-t border-gray-600 mt-6 md:mt-8">
          <p className="text-gray-300 text-sm mb-2">NC Wrestling United Inc. • 501(c)(3) Non-Profit Organization</p>
          <p className="text-gray-300 text-xs">
            © {new Date().getFullYear()} NC Wrestling United Inc. All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}
