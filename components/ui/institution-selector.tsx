"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

export interface Institution {
  id: string
  display_name: string
  short_name?: string
  aliases?: string[]
  logo_url?: string
  metadata?: {
    [key: string]: any
  }
}

interface InstitutionSelectorProps {
  type: "college" | "high_school" | "club"
  value?: string
  onSelect: (institution: Institution) => void
  placeholder?: string
  className?: string
}

export function InstitutionSelector({
  type,
  value = "",
  onSelect,
  placeholder = "Search...",
  className,
}: InstitutionSelectorProps) {
  const [open, setOpen] = useState(false)
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        // In a real implementation, this would fetch from your API
        // For now, we'll use mock data
        const mockData: Record<string, Institution[]> = {
          college: [
            {
              id: "unc",
              display_name: "University of North Carolina at Chapel Hill",
              short_name: "UNC",
              aliases: ["UNC", "Carolina", "North Carolina", "Tar Heels"],
              logo_url: "/placeholder.svg?height=100&width=100",
              metadata: {
                division: "NCAA D1",
                colors: {
                  primary: "#7BAFD4",
                  secondary: "#FFFFFF",
                },
              },
            },
            {
              id: "ncsu",
              display_name: "North Carolina State University",
              short_name: "NC State",
              aliases: ["NCSU", "State", "Wolfpack"],
              logo_url: "/placeholder.svg?height=100&width=100",
              metadata: {
                division: "NCAA D1",
                colors: {
                  primary: "#CC0000",
                  secondary: "#FFFFFF",
                },
              },
            },
            {
              id: "app",
              display_name: "Appalachian State University",
              short_name: "App State",
              aliases: ["App", "Mountaineers"],
              logo_url: "/placeholder.svg?height=100&width=100",
              metadata: {
                division: "NCAA D1",
                colors: {
                  primary: "#FFCC00",
                  secondary: "#000000",
                },
              },
            },
          ],
          high_school: [
            {
              id: "cg",
              display_name: "Cardinal Gibbons High School",
              short_name: "Cardinal Gibbons",
              aliases: ["Gibbons", "CGHS"],
              logo_url: "/placeholder.svg?height=100&width=100",
            },
            {
              id: "millbrook",
              display_name: "Millbrook High School",
              short_name: "Millbrook",
              aliases: ["MHS"],
              logo_url: "/placeholder.svg?height=100&width=100",
            },
          ],
          club: [
            {
              id: "ncunited",
              display_name: "NC United Wrestling",
              short_name: "NC United",
              aliases: ["United", "NCU"],
              logo_url: "/images/nc-united-logo.png",
            },
            {
              id: "raw",
              display_name: "RAW Wrestling",
              short_name: "RAW",
              aliases: [],
              logo_url: "/placeholder.svg?height=100&width=100",
            },
          ],
        }

        // Simulate API delay
        setTimeout(() => {
          setInstitutions(mockData[type] || [])
          setLoading(false)
        }, 500)
      } catch (error) {
        console.error("Error fetching institutions:", error)
        setLoading(false)
      }
    }

    fetchInstitutions()
  }, [type])

  // Function to check if an institution matches the search value
  const matchesSearch = (institution: Institution, searchValue: string): boolean => {
    if (!searchValue) return true

    const search = searchValue.toLowerCase()

    // Check display name
    if (institution.display_name && institution.display_name.toLowerCase().includes(search)) return true

    // Check short name
    if (institution.short_name && institution.short_name.toLowerCase().includes(search)) return true

    // Check aliases
    if (institution.aliases && institution.aliases.some((alias) => alias && alias.toLowerCase().includes(search)))
      return true

    return false
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-full justify-between", className)}
        >
          {value || placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${type.replace("_", " ")}...`} />
          <CommandList>
            <CommandEmpty>{loading ? "Loading..." : "No results found."}</CommandEmpty>
            <CommandGroup>
              {institutions.map((institution) => (
                <CommandItem
                  key={institution.id}
                  value={institution.id}
                  onSelect={() => {
                    onSelect(institution)
                    setOpen(false)
                  }}
                >
                  <div className="flex items-center gap-2">
                    {institution.logo_url && (
                      <img
                        src={institution.logo_url || "/placeholder.svg"}
                        alt={`${institution.display_name} logo`}
                        className="h-6 w-6 object-contain"
                      />
                    )}
                    <span>{institution.display_name}</span>
                  </div>
                  <Check
                    className={cn("ml-auto h-4 w-4", value === institution.display_name ? "opacity-100" : "opacity-0")}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
