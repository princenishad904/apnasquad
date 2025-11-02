"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState, useCallback } from "react";
import { useCreateTournamentMutation } from "@/redux/tournament/tournamentApi";
import { toast } from "sonner";
import Loader from "@/components/Loader";

const CreateTournamentPage = () => {
  const [prizeDistribution, setPrizeDistribution] = useState([
    { rank: "", prize: "" },
  ]);

  // Optimized prize change handler with useCallback
  const handlePrizeChange = useCallback((index, event) => {
    const { name, value } = event.target;
    setPrizeDistribution(prev => 
      prev.map((item, i) => 
        i === index ? { ...item, [name]: value } : item
      )
    );
  }, []);

  // Optimized add/remove handlers
  const addPrizeRank = useCallback(() => {
    setPrizeDistribution(prev => [...prev, { rank: "", prize: "" }]);
  }, []);

  const removePrizeRank = useCallback((index) => {
    if (prizeDistribution.length > 1) {
      setPrizeDistribution(prev => prev.filter((_, i) => i !== index));
    }
  }, [prizeDistribution.length]);

  // Get current Indian time in correct format for datetime-local
  const getCurrentIndianTime = () => {
    const now = new Date();
    // Convert to IST (UTC+5:30)
    const istOffset = 5.5 * 60 * 60 * 1000;
    const istTime = new Date(now.getTime() + istOffset);
    
    // Format to YYYY-MM-DDTHH:mm for datetime-local input
    return istTime.toISOString().slice(0, 16);
  };

  const [matchTime, setMatchTime] = useState(getCurrentIndianTime());

  // Form submission
  const [createTournament, { isLoading }] = useCreateTournamentMutation();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    // Convert matchTime to proper format for backend
    const finalData = { 
      ...data, 
      prizeDistribution,
      matchTime: new Date(matchTime).toISOString()
    };

    try {
      const { data: res, error } = await createTournament(finalData);

      if (error) {
        toast.error(error?.data?.message || "Failed to create tournament");
        return;
      }

      if (res?.success) {
        toast.success(res?.message || "Tournament created successfully");
        // Reset form
        setPrizeDistribution([{ rank: "", prize: "" }]);
        setMatchTime(getCurrentIndianTime());
        event.target.reset();
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <main className="relative min-h-screen w-full bg-slate-950">
      {/* Aurora effect blobs */}
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute left-[10%] top-[20%] h-[200px] w-[500px] rounded-full bg-blue-500/80 blur-[150px]"></div>
        <div className="absolute bottom-[5%] right-[10%] h-[300px] w-[400px] rounded-full bg-purple-600/70 blur-[150px]"></div>
        <div className="absolute bottom-[25%] left-[25%] h-[200px] w-[300px] rounded-full bg-pink-500/60 blur-[120px]"></div>
      </div>

      {/* Form Content */}
      <div className="relative z-10 flex h-full w-full items-center justify-center p-4">
        <div className="dark w-full max-w-4xl rounded-xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-md md:p-8">
          <div className="h-auto pr-2">
            <h2 className="mb-6 text-2xl font-semibold text-white md:text-3xl">
              Create Tournament
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                {/* Title field */}
                <div className="grid gap-2">
                  <Label htmlFor="title" className="text-white">
                    Tournament Title
                  </Label>
                  <Input 
                    id="title" 
                    type="text" 
                    name="title" 
                    required 
                    className="bg-slate-800 border-slate-600 text-white"
                  />
                </div>

                {/* Entry fee, Prize Pool, Total Spots */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="entryFee" className="text-white">
                      Entry Fee
                    </Label>
                    <Input
                      id="entryFee"
                      type="number"
                      name="entryFee"
                      min="0"
                      required
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="prizePool" className="text-white">
                      Prize Pool
                    </Label>
                    <Input
                      id="prizePool"
                      type="number"
                      name="prizePool"
                      min="0"
                      required
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="totalSpots" className="text-white">
                      Total Spots
                    </Label>
                    <Input
                      id="totalSpots"
                      type="number"
                      name="totalSpots"
                      min="1"
                      required
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                  </div>
                </div>

                {/* Dynamic Prize Distribution Section */}
                <div className="grid gap-4 rounded-lg border border-white/10 p-4">
                  <Label className="text-white">Prize Distribution</Label>
                  {prizeDistribution.map((field, index) => (
                    <div key={index} className="flex items-end gap-2 md:gap-4">
                      <div className="grid flex-grow gap-2">
                        <Label htmlFor={`rank-${index}`} className="text-white">
                          Rank
                        </Label>
                        <Input
                          id={`rank-${index}`}
                          name="rank"
                          type="number"
                          placeholder="1"
                          value={field.rank}
                          onChange={(e) => handlePrizeChange(index, e)}
                          min="1"
                          required
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                      <div className="grid flex-grow gap-2">
                        <Label htmlFor={`prize-${index}`} className="text-white">
                          Prize
                        </Label>
                        <Input
                          id={`prize-${index}`}
                          name="prize"
                          type="number"
                          placeholder="5000"
                          value={field.prize}
                          onChange={(e) => handlePrizeChange(index, e)}
                          min="0"
                          required
                          className="bg-slate-800 border-slate-600 text-white"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removePrizeRank(index)}
                        disabled={prizeDistribution.length === 1}
                        className="h-10 px-3"
                      >
                        ×
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addPrizeRank}
                    className="mt-2 border-slate-600 text-white hover:bg-slate-700"
                  >
                    Add More Ranks
                  </Button>
                </div>

                {/* Match Date, Map, Mode */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="matchTime" className="text-white">
                      Tournament Date (IST)
                    </Label>
                    <Input
                      id="matchTime"
                      type="datetime-local"
                      name="matchTime"
                      value={matchTime}
                      onChange={(e) => setMatchTime(e.target.value)}
                      min={getCurrentIndianTime()}
                      required
                      className="bg-slate-800 border-slate-600 text-white"
                    />
                    <p className="text-xs text-slate-400">
                      Indian Standard Time (UTC+5:30)
                    </p>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="map" className="text-white">
                      Select Map
                    </Label>
                    <Select name="map" required>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue placeholder="Select a MAP" />
                      </SelectTrigger>
                      <SelectContent className="dark bg-slate-800 border-slate-600">
                        <SelectItem value="erangel">Erangel</SelectItem>
                        <SelectItem value="tdm">TDM</SelectItem>
                        <SelectItem value="livik">Livik</SelectItem>
                        <SelectItem value="miramar">Miramar</SelectItem>
                        <SelectItem value="sanhok">Sanhok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mode" className="text-white">
                      Mode
                    </Label>
                    <Select name="mode" required>
                      <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                        <SelectValue placeholder="Select a MODE" />
                      </SelectTrigger>
                      <SelectContent className="dark bg-slate-800 border-slate-600">
                        <SelectItem value="solo">Solo</SelectItem>
                        <SelectItem value="duo">Duo</SelectItem>
                        <SelectItem value="squad">Squad</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                disabled={isLoading}
                className="mt-6 w-full text-md bg-gradient-to-br from-slate-800 to-slate-950 text-white cursor-pointer hover:from-slate-700 hover:to-slate-900 disabled:opacity-50"
              >
                {isLoading ? <Loader /> : "Create Tournament"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreateTournamentPage;