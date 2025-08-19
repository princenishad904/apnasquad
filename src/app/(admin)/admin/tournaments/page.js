"use client";
import TournamentCard from "@/components/admin/TournamentCard";
import Loader from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useLazyGetHomePageTournamentQuery } from "@/redux/tournament/tournamentApi";
import React, { useEffect, useState } from "react";

const bgmiMap = [
  "Erangle",
  "Livik",
  "miramar",
  "Tdm",
  "vikendi",
  "sanhok",
  "krakin",
];
const mode = ["Solo", "Duo", "Squad"];
const status = ["Live", "End", "Upcoming"];

const Tournaments = () => {
  const [query, setQuery] = useState({
    map: "",
    mode: "",
    matchTime: "",
    status: "",
  });

  const [trigger, { data, isLoading }] = useLazyGetHomePageTournamentQuery();

  const handleQuery = (name, value) => {
    setQuery((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    trigger(query);
  }, [trigger, query]);

  if (isLoading) {
    return (
      <div className="w-full h-[50vh] grid place-content-center">
        <Loader size={24} color="white" />
      </div>
    );
  }
  if (!data?.data) {
    return (
      <div className="w-full h-[50vh] grid place-content-center">
        No matches
      </div>
    );
  }
  return (
    <div className="p-4">
      <div className="dark flex items-center gap-4">
        {/* map filter */}
        <div>
          <Select
            value={query.map}
            onValueChange={(value) => handleQuery("map", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Map" />
            </SelectTrigger>
            <SelectContent className={"dark"}>
              <SelectGroup>
                <SelectLabel>Select Map</SelectLabel>
                {bgmiMap.map((e, idx) => (
                  <SelectItem key={idx} value={e.toLowerCase()}>
                    {e.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* mode filter */}
        <div>
          <Select
            value={query.mode}
            onValueChange={(value) => handleQuery("mode", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select MODE" />
            </SelectTrigger>
            <SelectContent className={"dark"}>
              <SelectGroup>
                <SelectLabel>Select MODE</SelectLabel>
                {mode.map((e, idx) => (
                  <SelectItem key={idx} value={e.toLowerCase()}>
                    {e.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        {/* status filter */}
        <div>
          <Select
            value={query.status}
            onValueChange={(value) => handleQuery("status", value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select MODE" />
            </SelectTrigger>
            <SelectContent className={"dark"}>
              <SelectGroup>
                <SelectLabel>Select MODE</SelectLabel>
                {status.map((e, idx) => (
                  <SelectItem key={idx} value={e.toLowerCase()}>
                    {e.toUpperCase()}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Input
            id="matchTime"
            type="datetime-local"
            value={query.matchTime}
            onChange={(e) => setQuery({ ...query, matchTime: e.target.value })}
          />
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button
            variant={"outline"}
            onClick={() =>
              setQuery({ map: "", mode: "", matchTime: "", status: "" })
            }
            className={"bg-transparent cursor-pointer"}
          >
            Reset filter
          </Button>
          <Button
            variant={"outline"}
            onClick={() => trigger()}
            className={"bg-transparent cursor-pointer"}
          >
            Refetch
          </Button>
        </div>
      </div>

      <div>
        {data?.data?.tournaments?.map((e) => (
          <div key={e._id}>
            <TournamentCard tournament={e} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tournaments;
