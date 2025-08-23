"use client";

import { useLazyGetMyTournamentsQuery } from "@/redux/tournament/tournamentApi";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MatchCard from "@/components/user/MatchCard";
import { useInView } from "react-intersection-observer";
import Loader from "@/components/Loader";

const MyTournaments = () => {
  const [liveTournaments, setLiveTournaments] = useState([]);
  const [completedTournaments, setCompletedTournaments] = useState([]);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView({ threshold: 0 });

  const [trigger, { data, isLoading, isError, error, isFetching }] =
    useLazyGetMyTournamentsQuery();

  // Data fetching ke liye useEffect hook
  useEffect(() => {
    // Agar data fetch ho raha hai aur koi error nahi hai, tabhi trigger karo
    if (page > 0) {
      trigger({ page });
    }
  }, [trigger, page]);

  // Data update hone par state set karne ke liye
  useEffect(() => {
    if (data) {
      // Nullish coalescing operator (??) ka use kiya taaki null ya undefined hone par empty array mile
      const newLiveTournaments = data?.data?.liveTournaments ?? [];
      const newCompletedTournaments = data?.data?.completedTournaments ?? [];

      setLiveTournaments((prev) => [...prev, ...newLiveTournaments]);
      setCompletedTournaments((prev) => [...prev, ...newCompletedTournaments]);
    }
  }, [data]);

  // Infinite scrolling ke liye useEffect hook
  useEffect(() => {
    if (
      inView &&
      !isLoading &&
      !isFetching &&
      data?.data?.pagination?.hasNextPage
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, isLoading, isFetching, data?.data?.pagination?.hasNextPage]);

  // Render logic
  if (isLoading && page === 1) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 p-4">
        Failed to load tournaments:{" "}
        {error?.data?.message || "Something went wrong"}
      </div>
    );
  }

  return (
    <div className="px-4">
      <Tabs defaultValue="live" className="w-full dark">
        <TabsList className={"w-full bg-transparent my-4"}>
          <TabsTrigger value="live" className="bg-transparent">
            Live
          </TabsTrigger>
          <TabsTrigger value="completed" className="bg-transparent">
            Completed
          </TabsTrigger>
        </TabsList>
        <TabsContent value="live">
          {liveTournaments.length > 0 ? (
            <div className="space-y-4">
              {liveTournaments.map((e) => (
                <MatchCard
                  key={e._id}
                  id={e._id}
                  title={e.title}
                  map={e.map}
                  entryFee={e.entryFee}
                  mode={e.mode}
                  maxTeam={e.totalSpots}
                  prizePool={e.prizePool}
                  startTime={e.matchTime}
                  teamJoined={e.joinedSpots || 0}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              {isLoading || isFetching
                ? "Loading..."
                : "No live tournaments available."}
            </div>
          )}
        </TabsContent>
        <TabsContent value="completed">
          {completedTournaments.length > 0 ? (
            <div className="space-y-4">
              {completedTournaments.map((e) => (
                <MatchCard
                  key={e._id}
                  id={e._id}
                  title={e.title}
                  map={e.map}
                  entryFee={e.entryFee}
                  mode={e.mode}
                  maxTeam={e.totalSpots}
                  prizePool={e.prizePool}
                  startTime={e.matchTime}
                  teamJoined={e.joinedSpots || 0}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500">
              {isLoading || isFetching
                ? "Loading..."
                : "No completed matches found."}
            </div>
          )}
        </TabsContent>
      </Tabs>
      {data?.data?.pagination?.hasNextPage ? <div ref={ref}></div> : null}
      {isFetching && (
        <div className="w-full flex items-center justify-center pb-20">
          <Loader color="white" size={32} />
        </div>
      )}
    </div>
  );
};

export default MyTournaments;
