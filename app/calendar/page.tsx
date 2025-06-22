"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Calendar, Clock, MapPin, Users, Plus, Download, ChevronLeft, ChevronRight, Filter, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Calendar event type
type CalendarEvent = {
  id: string
  title: string
  date: string
  startTime: string
  endTime: string
  location: string
  type: "blue" | "gold" | "tournament"
  description?: string
  created_at: string
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

export default function WrestlingCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [showAddEventModal, setShowAddEventModal] = useState(false)
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    startTime: "",
    endTime: "",
    location: "",
    type: "",
    description: "",
  })

  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  // Fetch events from database
  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/calendar/events")
      const data = await response.json()

      if (data.success) {
        setEvents(data.events)
      } else {
        console.error("Failed to fetch events:", data.error)
      }
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setLoading(false)
    }
  }

  // Get first day of month and number of days
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate()

  // Filter events based on selected filter
  const filteredEvents = events.filter((event) => {
    if (selectedFilter === "all") return true
    if (selectedFilter === "blue") return event.type === "blue"
    if (selectedFilter === "gold") return event.type === "gold"
    if (selectedFilter === "tournaments") return event.type === "tournament"
    return true
  })

  // Get events for a specific date
  const getEventsForDate = (date: number) => {
    const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(date).padStart(2, "0")}`
    return filteredEvents.filter((event) => event.date === dateString)
  }

  // Navigate months
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1))
  }

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1))
  }

  // Get event type styling
  const getEventTypeStyle = (type: string) => {
    switch (type) {
      case "blue":
        return "bg-blue-600 text-white border-blue-700"
      case "gold":
        return "bg-gradient-to-r from-yellow-500 to-red-600 text-white border-yellow-600"
      case "tournament":
        return "bg-gray-600 text-white border-gray-700"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getEventDotStyle = (type: string) => {
    switch (type) {
      case "blue":
        return "bg-blue-600"
      case "gold":
        return "bg-gradient-to-r from-yellow-500 to-red-600"
      case "tournament":
        return "bg-gray-600"
      default:
        return "bg-gray-500"
    }
  }

  // Format time for display
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":")
    const hour = Number.parseInt(hours)
    const ampm = hour >= 12 ? "PM" : "AM"
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
  }

  // Handle form input changes
  const handleInputChange = (field: string, value: string) => {
    setNewEvent((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  // Handle form submission
  const handleAddEvent = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await fetch("/api/calendar/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEvent),
      })

      const data = await response.json()

      if (data.success) {
        // Refresh events list
        await fetchEvents()

        // Reset form and close modal
        setNewEvent({
          title: "",
          date: "",
          startTime: "",
          endTime: "",
          location: "",
          type: "",
          description: "",
        })
        setShowAddEventModal(false)

        alert("Event added successfully!")
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error("Error creating event:", error)
      alert("Failed to create event. Please try again.")
    }
  }

  // Handle event deletion
  const handleDeleteEvent = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event?")) {
      return
    }

    try {
      const response = await fetch(`/api/calendar/events?id=${eventId}`, {
        method: "DELETE",
      })

      const data = await response.json()

      if (data.success) {
        // Refresh events list
        await fetchEvents()
        setSelectedEvent(null)
        alert("Event deleted successfully!")
      } else {
        alert(`Error: ${data.error}`)
      }
    } catch (error) {
      console.error("Error deleting event:", error)
      alert("Failed to delete event. Please try again.")
    }
  }

  // Generate calendar days
  const calendarDays = []

  // Previous month's trailing days
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    calendarDays.push({
      date: daysInPrevMonth - i,
      isCurrentMonth: false,
      events: [],
    })
  }

  // Current month's days
  for (let date = 1; date <= daysInMonth; date++) {
    calendarDays.push({
      date,
      isCurrentMonth: true,
      events: getEventsForDate(date),
    })
  }

  // Next month's leading days
  const remainingDays = 42 - calendarDays.length
  for (let date = 1; date <= remainingDays; date++) {
    calendarDays.push({
      date,
      isCurrentMonth: false,
      events: [],
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1a1b5c] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading calendar events...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-black text-[#1a1b5c] font-oswald">NC UNITED WRESTLING CALENDAR</h1>
              <p className="text-gray-600 mt-1">Practice sessions, tournaments, and team events</p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                className="bg-[#1a1b5c] hover:bg-[#bc0c03] text-white font-oswald"
                onClick={() => setShowAddEventModal(true)}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Event
              </Button>
              <Button variant="outline" className="font-oswald">
                <Download className="w-4 h-4 mr-2" />
                Sync Calendar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Button
            variant={selectedFilter === "all" ? "default" : "outline"}
            onClick={() => setSelectedFilter("all")}
            className={`font-oswald ${selectedFilter === "all" ? "bg-[#1a1b5c] hover:bg-[#bc0c03]" : ""}`}
          >
            <Filter className="w-4 h-4 mr-2" />
            All Events ({filteredEvents.length})
          </Button>
          <Button
            variant={selectedFilter === "blue" ? "default" : "outline"}
            onClick={() => setSelectedFilter("blue")}
            className={`font-oswald ${selectedFilter === "blue" ? "bg-blue-600 hover:bg-blue-700" : "border-blue-600 text-blue-600 hover:bg-blue-50"}`}
          >
            <Users className="w-4 h-4 mr-2" />
            Blue Program ({events.filter((e) => e.type === "blue").length})
          </Button>
          <Button
            variant={selectedFilter === "gold" ? "default" : "outline"}
            onClick={() => setSelectedFilter("gold")}
            className={`font-oswald ${selectedFilter === "gold" ? "bg-gradient-to-r from-yellow-500 to-red-600 hover:from-yellow-600 hover:to-red-700" : "border-yellow-500 text-yellow-600 hover:bg-yellow-50"}`}
          >
            <Users className="w-4 h-4 mr-2" />
            Gold Program ({events.filter((e) => e.type === "gold").length})
          </Button>
          <Button
            variant={selectedFilter === "tournaments" ? "default" : "outline"}
            onClick={() => setSelectedFilter("tournaments")}
            className={`font-oswald ${selectedFilter === "tournaments" ? "bg-gray-600 hover:bg-gray-700" : "border-gray-600 text-gray-600 hover:bg-gray-50"}`}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Tournaments ({events.filter((e) => e.type === "tournament").length})
          </Button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Calendar */}
          <div className="xl:col-span-3">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                {/* Calendar Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-[#1a1b5c] font-oswald">
                    {months[currentMonth]} {currentYear}
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={goToPreviousMonth} className="p-2">
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={goToNextMonth} className="p-2">
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {daysOfWeek.map((day) => (
                    <div key={day} className="p-3 text-center font-bold text-gray-600 text-sm">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      className={`min-h-[100px] p-2 border border-gray-200 ${
                        day.isCurrentMonth ? "bg-white hover:bg-gray-50" : "bg-gray-50 text-gray-400"
                      } transition-colors duration-200`}
                    >
                      <div className="font-medium text-sm mb-1">{day.date}</div>
                      <div className="space-y-1">
                        {day.events.slice(0, 2).map((event) => (
                          <div
                            key={event.id}
                            className={`text-xs p-1 rounded cursor-pointer hover:opacity-80 transition-opacity ${getEventTypeStyle(event.type)}`}
                            onClick={() => setSelectedEvent(event)}
                          >
                            <div className="font-medium truncate">{event.title}</div>
                            <div className="opacity-90">{formatTime(event.startTime)}</div>
                          </div>
                        ))}
                        {day.events.length > 2 && (
                          <div className="text-xs text-gray-500 font-medium">+{day.events.length - 2} more</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Events Sidebar */}
          <div className="xl:col-span-1">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-[#1a1b5c] mb-4 font-oswald">Upcoming Events</h3>
                <div className="space-y-4">
                  {filteredEvents.slice(0, 5).map((event) => (
                    <div
                      key={event.id}
                      className="group cursor-pointer p-4 rounded-lg border border-gray-200 hover:shadow-md transition-all duration-200 hover:border-gray-300"
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-3 h-3 rounded-full mt-1 ${getEventDotStyle(event.type)}`}></div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-gray-900 group-hover:text-[#1a1b5c] transition-colors">
                            {event.title}
                          </h4>
                          <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                            <Calendar className="w-3 h-3" />
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatTime(event.startTime)}</span>
                          </div>
                          <div className="flex items-center gap-1 text-xs text-gray-600 mt-1">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Legend */}
            <Card className="shadow-lg mt-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-[#1a1b5c] mb-4 font-oswald">Event Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-blue-600"></div>
                    <span className="text-sm font-medium">NC United Blue</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-gradient-to-r from-yellow-500 to-red-600"></div>
                    <span className="text-sm font-medium">NC United Gold</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded bg-gray-600"></div>
                    <span className="text-sm font-medium">Tournaments</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Badge className={`${getEventTypeStyle(selectedEvent.type)} font-oswald`}>
                  {selectedEvent.type === "blue"
                    ? "NC United Blue"
                    : selectedEvent.type === "gold"
                      ? "NC United Gold"
                      : "Tournament"}
                </Badge>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedEvent(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>

              <h3 className="text-xl font-bold text-[#1a1b5c] mb-4 font-oswald">{selectedEvent.title}</h3>

              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-500" />
                  <span>
                    {new Date(selectedEvent.date).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span>
                    {formatTime(selectedEvent.startTime)} - {formatTime(selectedEvent.endTime)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <span>{selectedEvent.location}</span>
                </div>
              </div>

              {selectedEvent.description && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{selectedEvent.description}</p>
                </div>
              )}

              <div className="flex gap-3 mt-6">
                <Button className="flex-1 bg-[#1a1b5c] hover:bg-[#bc0c03] font-oswald">Add to Calendar</Button>
                <Button
                  variant="outline"
                  className="flex-1 font-oswald text-red-600 border-red-600 hover:bg-red-50"
                  onClick={() => handleDeleteEvent(selectedEvent.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Event Modal */}
      {showAddEventModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-[#1a1b5c] font-oswald">Add New Event</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowAddEventModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </Button>
              </div>

              <form onSubmit={handleAddEvent} className="space-y-6">
                {/* Event Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-sm font-medium">
                    Event Title *
                  </Label>
                  <Input
                    id="title"
                    value={newEvent.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="e.g., NC United Blue Practice"
                    required
                    className="w-full"
                  />
                </div>

                {/* Event Type */}
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-sm font-medium">
                    Event Type *
                  </Label>
                  <Select value={newEvent.type} onValueChange={(value) => handleInputChange("type", value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">NC United Blue Program</SelectItem>
                      <SelectItem value="gold">NC United Gold Program</SelectItem>
                      <SelectItem value="tournament">Tournament</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Date and Time Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date" className="text-sm font-medium">
                      Date *
                    </Label>
                    <Input
                      id="date"
                      type="date"
                      value={newEvent.date}
                      onChange={(e) => handleInputChange("date", e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startTime" className="text-sm font-medium">
                      Start Time *
                    </Label>
                    <Input
                      id="startTime"
                      type="time"
                      value={newEvent.startTime}
                      onChange={(e) => handleInputChange("startTime", e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endTime" className="text-sm font-medium">
                      End Time *
                    </Label>
                    <Input
                      id="endTime"
                      type="time"
                      value={newEvent.endTime}
                      onChange={(e) => handleInputChange("endTime", e.target.value)}
                      required
                      className="w-full"
                    />
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-sm font-medium">
                    Location *
                  </Label>
                  <Input
                    id="location"
                    value={newEvent.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    placeholder="e.g., Elite Wrestling Academy"
                    required
                    className="w-full"
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={newEvent.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Additional details about the event..."
                    rows={3}
                    className="w-full"
                  />
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-4">
                  <Button type="submit" className="flex-1 bg-[#1a1b5c] hover:bg-[#bc0c03] font-oswald">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Event
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="flex-1 font-oswald"
                    onClick={() => setShowAddEventModal(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
