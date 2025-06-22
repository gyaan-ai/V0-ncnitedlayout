"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface Institution {
  id: string
  display_name: string
  short_name?: string
  aliases?: string[]
  logo_url?: string
  metadata?: any
}

interface SmartInstitutionInputProps {
  type: "college" | "high_school" | "club"
  value: string
  onChange: (value: string, institution?: Institution) => void
  placeholder?: string
  className?: string
}

export function SmartInstitutionInput({ type, value, onChange, placeholder, className }: SmartInstitutionInputProps) {
  const [suggestions, setSuggestions] = useState<Institution[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const suggestionsRef = useRef<HTMLDivElement>(null)

  // Mock data - in real app this would come from your database
  const mockInstitutions: Record<string, Institution[]> = {
    college: [
      {
        id: "unc",
        display_name: "University of North Carolina at Chapel Hill",
        short_name: "UNC",
        aliases: ["UNC", "Carolina", "North Carolina", "Tar Heels", "UNC Chapel Hill"],
        logo_url: "/images/logos/unc-logo.png",
        metadata: { division: "NCAA D1", colors: { primary: "#7BAFD4", secondary: "#FFFFFF" } },
      },
      {
        id: "ncsu",
        display_name: "North Carolina State University",
        short_name: "NC State",
        aliases: ["NCSU", "State", "Wolfpack", "NC State"],
        logo_url: "/images/logos/ncsu-logo.png",
        metadata: { division: "NCAA D1", colors: { primary: "#CC0000", secondary: "#FFFFFF" } },
      },
      {
        id: "app",
        display_name: "Appalachian State University",
        short_name: "App State",
        aliases: ["App", "Mountaineers", "Appalachian"],
        logo_url: "/images/logos/app-state-logo.png",
        metadata: { division: "NCAA D1", colors: { primary: "#FFCC00", secondary: "#000000" } },
      },
      {
        id: "duke",
        display_name: "Duke University",
        short_name: "Duke",
        aliases: ["Blue Devils"],
        logo_url: "/images/logos/duke-logo.png",
        metadata: { division: "NCAA D1", colors: { primary: "#003087", secondary: "#FFFFFF" } },
      },
    ],
    high_school: [
      {
        id: "cardinal-gibbons",
        display_name: "Cardinal Gibbons High School",
        short_name: "Cardinal Gibbons",
        aliases: ["Gibbons", "CGHS", "Cardinal Gibbons", "CG"],
        logo_url: "/images/logos/cardinal-gibbons-logo.png",
      },
      {
        id: "millbrook",
        display_name: "Millbrook High School",
        short_name: "Millbrook",
        aliases: ["MHS", "Wildcats"],
        logo_url: "/images/logos/millbrook-logo.png",
      },
      {
        id: "leesville",
        display_name: "Leesville Road High School",
        short_name: "Leesville",
        aliases: ["LRHS", "Pride"],
        logo_url: "/images/logos/leesville-logo.png",
      },
      {
        id: "green-hope",
        display_name: "Green Hope High School",
        short_name: "Green Hope",
        aliases: ["GHHS", "Falcons"],
        logo_url: "/images/logos/green-hope-logo.png",
      },
    ],
    club: [
      {
        id: "nc-united",
        display_name: "NC United Wrestling",
        short_name: "NC United",
        aliases: ["United", "NCU", "NC United"],
        logo_url: "/images/nc-united-logo.png",
      },
      {
        id: "raw",
        display_name: "RAW Wrestling",
        short_name: "RAW",
        aliases: ["RAW", "Real American Wrestling"],
        logo_url: "/images/logos/raw-wrestling-logo.png",
      },
      {
        id: "triangle",
        display_name: "Triangle Wrestling Club",
        short_name: "Triangle",
        aliases: ["TWC"],
        logo_url: "/images/logos/triangle-wrestling-logo.png",
      },
    ],
  }

  // Find matching institutions based on input
  const findMatches = (input: string): Institution[] => {
    if (!input || input.length < 2) return []

    const searchTerm = input.toLowerCase().trim()
    const institutions = mockInstitutions[type] || []

    return institutions
      .filter((institution) => {
        // Check display name
        if (institution.display_name.toLowerCase().includes(searchTerm)) return true

        // Check short name
        if (institution.short_name?.toLowerCase().includes(searchTerm)) return true

        // Check aliases
        if (institution.aliases?.some((alias) => alias.toLowerCase().includes(searchTerm))) return true

        return false
      })
      .slice(0, 5) // Limit to 5 suggestions
  }

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    onChange(inputValue)

    const matches = findMatches(inputValue)
    setSuggestions(matches)
    setShowSuggestions(matches.length > 0)
    setSelectedIndex(-1)

    // Auto-match if exact match found
    const exactMatch = matches.find(
      (inst) =>
        inst.display_name.toLowerCase() === inputValue.toLowerCase() ||
        inst.short_name?.toLowerCase() === inputValue.toLowerCase() ||
        inst.aliases?.some((alias) => alias.toLowerCase() === inputValue.toLowerCase()),
    )

    if (exactMatch) {
      onChange(inputValue, exactMatch)
    }
  }

  // Handle suggestion selection
  const selectSuggestion = (institution: Institution) => {
    onChange(institution.display_name, institution)
    setShowSuggestions(false)
    setSelectedIndex(-1)
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => Math.min(prev + 1, suggestions.length - 1))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => Math.max(prev - 1, -1))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          selectSuggestion(suggestions[selectedIndex])
        }
        break
      case "Escape":
        setShowSuggestions(false)
        setSelectedIndex(-1)
        break
    }
  }

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative">
      <Input
        ref={inputRef}
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={() => {
          if (suggestions.length > 0) setShowSuggestions(true)
        }}
        placeholder={placeholder}
        className={className}
      />

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {suggestions.map((institution, index) => (
            <div
              key={institution.id}
              className={cn(
                "flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-50",
                selectedIndex === index && "bg-blue-50",
              )}
              onClick={() => selectSuggestion(institution)}
            >
              {institution.logo_url && (
                <img
                  src={institution.logo_url || "/placeholder.svg"}
                  alt={`${institution.display_name} logo`}
                  className="w-6 h-6 object-contain flex-shrink-0"
                  onError={(e) => {
                    // Hide image if it fails to load
                    ;(e.target as HTMLImageElement).style.display = "none"
                  }}
                />
              )}
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">{institution.display_name}</div>
                {institution.short_name && <div className="text-xs text-gray-500">{institution.short_name}</div>}
              </div>
              <Check className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
