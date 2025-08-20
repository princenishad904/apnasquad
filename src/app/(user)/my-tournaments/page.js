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
  const [trigger, { data, isLoading, isError, error, isFetching }] =
    useLazyGetMyTournamentsQuery();

  const { ref, inView } = useInView({
    threshold: 0,
  });
  // useEffect ka use data update hone par state set karne ke liye
  useEffect(() => {
    if (data) {
      setLiveTournaments(
        (prev) => [...prev, ...data?.data?.liveTournaments] || []
      );
      setCompletedTournaments(
        (prev) => [...prev, ...data?.data?.completedTournaments] || []
      );
    }
  }, [data]); // data dependency array mein daali gayi hai

  useEffect(() => {
    trigger({ page });
  }, [trigger, page]); // trigger ko useEffect ke dependency array mein rakha hai

  useEffect(() => {
    // Ye tabhi trigger hoga jab 'inView' true ho aur data fetch na ho raha ho
    if (inView && !isLoading && data?.data?.pagination?.hasNextPage) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, isLoading, data?.data?.pagination?.hasNextPage]);
  if (isLoading) {
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
    <div>
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
                  key={e._id} // Har item ke liye unique key zaroori hai
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
              No live tournaments available.
            </div>
          )}
        </TabsContent>
        <TabsContent value="completed">
          {completedTournaments.length > 0 ? (
            <div className="space-y-4">
              {completedTournaments.map((e) => (
                <MatchCard
                  key={e._id} // Har item ke liye unique key zaroori hai
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
              No completed matches found.
            </div>
          )}
        </TabsContent>
      </Tabs>
      {data?.data?.pagination?.hasNextPage ? <div ref={ref}></div> : ""}{" "}
      {isFetching ? (
        <div className="w-full flex items-center justify-center pb-20">
          {" "}
          <Loader color="white" size={32} />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MyTournaments;
