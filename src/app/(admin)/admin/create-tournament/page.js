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
import React, { useState } from "react";
import { useCreateTournamentMutation } from "@/redux/tournament/tournamentApi";
import { toast } from "sonner";
import Loader from "@/components/Loader";

const CreateTournamentPage = () => {
  // State to manage the prize distribution array
  const [prizeDistribution, setPrizeDistribution] = useState([
    { rank: "", prize: "" },
  ]);

  // Function to handle changes in prize distribution inputs
  const handlePrizeChange = (index, event) => {
    const values = [...prizeDistribution];
    values[index][event.target.name] = event.target.value;
    setPrizeDistribution(values);
  };

  // Function to add a new rank field
  const addPrizeRank = () => {
    setPrizeDistribution([...prizeDistribution, { rank: "", prize: "" }]);
  };

  // Function to remove a rank field
  const removePrizeRank = (index) => {
    if (prizeDistribution.length > 1) {
      const values = [...prizeDistribution];
      values.splice(index, 1);
      setPrizeDistribution(values);
    }
  };

  // Function to handle form submission
  const [createTournament, { isLoading }] = useCreateTournamentMutation();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    const finalData = { ...data, prizeDistribution };
    console.log(finalData);

    const { data: res, error } = await createTournament(finalData);

    if (error) {
      return toast.error(error?.data?.message || "failed");
    }

    if (res.success) {
      toast.success(res?.message || "tournament created");
    }

    if (error) {
      return toast.error(
        error?.data?.data?.message || "failed to create tournament"
      );
    }
  };

  return (
    // Main container with Aurora background
    <main className="relative min-h-screen w-full  bg-slate-950">
      {/* Aurora effect blobs */}
      <div className="absolute inset-0 z-0 opacity-50">
        <div className="absolute left-[10%] top-[20%] h-[200px] w-[500px] rounded-full bg-blue-500/80 blur-[150px]"></div>
        <div className="absolute bottom-[5%] right-[10%] h-[300px] w-[400px] rounded-full bg-purple-600/70 blur-[150px]"></div>
        <div className="absolute bottom-[25%] left-[25%] h-[200px] w-[300px] rounded-full bg-pink-500/60 blur-[120px]"></div>
      </div>

      {/* Form Content */}
      <div className="relative z-10 flex h-full w-full items-center justify-center p-4">
        <div className="dark w-full max-w-4xl rounded-xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl backdrop-blur-md md:p-8">
          <div className="h-auto  pr-2">
            <h2 className="mb-6 text-2xl font-semibold text-white md:text-3xl">
              Create Tournament
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-6">
                {/* Title field */}
                <div className="grid gap-2">
                  <Label htmlFor="title">Tournament Title</Label>
                  <Input id="title" type="text" name="title" required />
                </div>

                {/* Entry fee, Prize Pool, Total Spots */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="entryFee">Entry Fee</Label>
                    <Input
                      id="entryFee"
                      type="number"
                      name="entryFee"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="prizePool">Prize Pool</Label>
                    <Input
                      id="prizePool"
                      type="number"
                      name="prizePool"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="totalSpots">Total Spots</Label>
                    <Input
                      id="totalSpots"
                      type="number"
                      name="totalSpots"
                      required
                    />
                  </div>
                </div>

                {/* Dynamic Prize Distribution Section */}
                <div className="grid gap-4 rounded-lg border border-white/10 p-4">
                  <Label>Prize Distribution</Label>
                  {prizeDistribution.map((field, index) => (
                    <div key={index} className="flex items-end gap-2 md:gap-4">
                      <div className="grid flex-grow gap-2">
                        <Label htmlFor={`rank-${index}`}>Rank</Label>
                        <Input
                          id={`rank-${index}`}
                          name="rank"
                          type="number"
                          placeholder="1"
                          value={field.rank}
                          onChange={(e) => handlePrizeChange(index, e)}
                          required
                        />
                      </div>
                      <div className="grid flex-grow gap-2">
                        <Label htmlFor={`prize-${index}`}>Prize</Label>
                        <Input
                          id={`prize-${index}`}
                          name="prize"
                          type="number"
                          placeholder="5000"
                          value={field.prize}
                          onChange={(e) => handlePrizeChange(index, e)}
                          required
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        onClick={() => removePrizeRank(index)}
                        disabled={prizeDistribution.length === 1}
                      >
                        X
                      </Button>
                    </div>
                  ))}
                  <Button
                    type="button"
                    variant="outline"
                    onClick={addPrizeRank}
                    className="mt-2"
                  >
                    Add More Ranks
                  </Button>
                </div>

                {/* Match Date, Map, Mode */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="matchTime">Tournament Date</Label>
                    <Input
                      id="matchTime"
                      type="datetime-local"
                      name="matchTime"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="map">Select Map</Label>
                    <Select name="map" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a MAP" />
                      </SelectTrigger>
                      <SelectContent className={"dark"}>
                        <SelectItem value="erangel">Erangel</SelectItem>
                        <SelectItem value="tdm">TDM</SelectItem>
                        <SelectItem value="livik">Livik</SelectItem>
                        <SelectItem value="miramar">Miramar</SelectItem>
                        <SelectItem value="sanhok">Sanhok</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="mode">Mode</Label>
                    <Select name="mode" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a MODE" />
                      </SelectTrigger>
                      <SelectContent className={"dark"}>
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
                variant={"outline"}
                className="mt-6 w-full text-md  bg-gradient-to-br from-slate-800 to-slate-950 text-white cursor-pointer"
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
