"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, Plus, Save, Upload } from "lucide-react"
import { format } from "date-fns"

export default function MatchEntryPage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [matchData, setMatchData] = useState({
    tournament_id: "",
    wrestler_id: "",
    season: "2024-25",
    round: "",
    opponent_name: "",
    opponent_team: "",
    opponent_seed: "",
    wrestler_seed: "",
    result: "",
    win_type: "",
    score: "",
    time: "",
    points_scored: "",
    points_allowed: "",
    team_points: "",
    takedowns: "",
    escapes: "",
    reversals: "",
    near_falls: "",
    riding_time: "",
    match_notes: "",
  })

  const [bulkEntry, setBulkEntry] = useState("")

  const handleInputChange = (field: string, value: string) => {
    setMatchData((prev) => ({ ...prev, [field]: value }))
  }

  const handleBulkImport = () => {
    // Parse CSV or structured text input
    console.log("Bulk import:", bulkEntry)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Match Data Entry</h1>
          <p className="text-slate-600">Enter comprehensive match results for wrestling trading cards</p>
        </div>

        <Tabs defaultValue="single" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="single">Single Match</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Import</TabsTrigger>
            <TabsTrigger value="tournament">Tournament Setup</TabsTrigger>
          </TabsList>

          <TabsContent value="single">
            <Card>
              <CardHeader>
                <CardTitle>Enter Match Result</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Basic Match Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="tournament">Tournament</Label>
                    <Select
                      value={matchData.tournament_id}
                      onValueChange={(value) => handleInputChange("tournament_id", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select tournament" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nhsca-2025">NHSCA 2025</SelectItem>
                        <SelectItem value="ucd-2024">Ultimate Club Duals 2024</SelectItem>
                        <SelectItem value="states-2024">NC State Championships 2024</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="wrestler">Wrestler</Label>
                    <Select
                      value={matchData.wrestler_id}
                      onValueChange={(value) => handleInputChange("wrestler_id", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select wrestler" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="luke-richards">Luke Richards (106)</SelectItem>
                        <SelectItem value="jekai-sedgwick">Jekai Sedgwick (113)</SelectItem>
                        <SelectItem value="mac-johnson">Mac Johnson (120)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="date">Match Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} initialFocus />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="round">Round</Label>
                    <Select value={matchData.round} onValueChange={(value) => handleInputChange("round", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select round" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="prelims">Preliminaries</SelectItem>
                        <SelectItem value="round-16">Round of 16</SelectItem>
                        <SelectItem value="quarterfinals">Quarterfinals</SelectItem>
                        <SelectItem value="semifinals">Semifinals</SelectItem>
                        <SelectItem value="finals">Finals</SelectItem>
                        <SelectItem value="consolation">Consolation</SelectItem>
                        <SelectItem value="3rd-place">3rd Place</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Opponent Info */}
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="opponent_name">Opponent Name</Label>
                    <Input
                      id="opponent_name"
                      value={matchData.opponent_name}
                      onChange={(e) => handleInputChange("opponent_name", e.target.value)}
                      placeholder="John Smith"
                    />
                  </div>

                  <div>
                    <Label htmlFor="opponent_team">Opponent Team</Label>
                    <Input
                      id="opponent_team"
                      value={matchData.opponent_team}
                      onChange={(e) => handleInputChange("opponent_team", e.target.value)}
                      placeholder="Team Gotcha Illinois"
                    />
                  </div>

                  <div>
                    <Label htmlFor="opponent_seed">Opponent Seed</Label>
                    <Input
                      id="opponent_seed"
                      type="number"
                      value={matchData.opponent_seed}
                      onChange={(e) => handleInputChange("opponent_seed", e.target.value)}
                      placeholder="1"
                    />
                  </div>
                </div>

                {/* Match Result */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="result">Result</Label>
                    <Select value={matchData.result} onValueChange={(value) => handleInputChange("result", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="W/L" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="W">Win</SelectItem>
                        <SelectItem value="L">Loss</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="win_type">Win/Loss Type</Label>
                    <Select value={matchData.win_type} onValueChange={(value) => handleInputChange("win_type", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PIN">Pin</SelectItem>
                        <SelectItem value="TF">Tech Fall</SelectItem>
                        <SelectItem value="MD">Major Decision</SelectItem>
                        <SelectItem value="DEC">Decision</SelectItem>
                        <SelectItem value="FF">Forfeit</SelectItem>
                        <SelectItem value="INJ">Injury</SelectItem>
                        <SelectItem value="DQ">Disqualification</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="score">Score</Label>
                    <Input
                      id="score"
                      value={matchData.score}
                      onChange={(e) => handleInputChange("score", e.target.value)}
                      placeholder="15-3"
                    />
                  </div>

                  <div>
                    <Label htmlFor="time">Time</Label>
                    <Input
                      id="time"
                      value={matchData.time}
                      onChange={(e) => handleInputChange("time", e.target.value)}
                      placeholder="2:34"
                    />
                  </div>
                </div>

                {/* Detailed Stats */}
                <div className="grid md:grid-cols-4 gap-4">
                  <div>
                    <Label htmlFor="takedowns">Takedowns</Label>
                    <Input
                      id="takedowns"
                      type="number"
                      value={matchData.takedowns}
                      onChange={(e) => handleInputChange("takedowns", e.target.value)}
                      placeholder="3"
                    />
                  </div>

                  <div>
                    <Label htmlFor="escapes">Escapes</Label>
                    <Input
                      id="escapes"
                      type="number"
                      value={matchData.escapes}
                      onChange={(e) => handleInputChange("escapes", e.target.value)}
                      placeholder="1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="reversals">Reversals</Label>
                    <Input
                      id="reversals"
                      type="number"
                      value={matchData.reversals}
                      onChange={(e) => handleInputChange("reversals", e.target.value)}
                      placeholder="0"
                    />
                  </div>

                  <div>
                    <Label htmlFor="near_falls">Near Falls</Label>
                    <Input
                      id="near_falls"
                      type="number"
                      value={matchData.near_falls}
                      onChange={(e) => handleInputChange("near_falls", e.target.value)}
                      placeholder="2"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="match_notes">Match Notes</Label>
                  <Textarea
                    id="match_notes"
                    value={matchData.match_notes}
                    onChange={(e) => handleInputChange("match_notes", e.target.value)}
                    placeholder="Dominated from start to finish. Great takedown defense."
                    rows={3}
                  />
                </div>

                <div className="flex gap-4">
                  <Button className="flex items-center gap-2">
                    <Save className="h-4 w-4" />
                    Save Match
                  </Button>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Save & Add Another
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bulk">
            <Card>
              <CardHeader>
                <CardTitle>Bulk Import Matches</CardTitle>
                <p className="text-sm text-slate-600">
                  Import multiple matches at once using CSV format or structured text
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="bulk_data">Match Data (CSV Format)</Label>
                  <Textarea
                    id="bulk_data"
                    value={bulkEntry}
                    onChange={(e) => setBulkEntry(e.target.value)}
                    placeholder={`wrestler_name,opponent_name,opponent_team,result,win_type,score,time,team_points,round,date
Luke Richards,John Smith,Team Gotcha Illinois,W,TF,18-1,4:23,5,Prelims,2025-03-28
Jekai Sedgwick,Mike Jones,Apache Blue,W,PIN,7-0,2:34,6,Quarterfinals,2025-03-28`}
                    rows={10}
                    className="font-mono text-sm"
                  />
                </div>

                <div className="flex gap-4">
                  <Button onClick={handleBulkImport} className="flex items-center gap-2">
                    <Upload className="h-4 w-4" />
                    Import Matches
                  </Button>
                  <Button variant="outline">Download Template</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tournament">
            <Card>
              <CardHeader>
                <CardTitle>Tournament Setup</CardTitle>
                <p className="text-sm text-slate-600">Set up tournament information and bracket structure</p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-slate-500">Tournament setup form coming soon...</div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
