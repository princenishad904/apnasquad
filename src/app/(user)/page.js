"use client";

import MatchCard from "@/components/user/MatchCard";
import MatchCategories from "@/components/user/MatchCategories";
import { useLazyGetHomePageTournamentQuery } from "@/redux/tournament/tournamentApi";
import React, { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

const Page = () => {
  const [tournaments, setTournaments] = useState([]);
  const [query, setQuery] = useState({
    page: 1,
    limit: 5,
    map: "",
    mode: "",
  });


 

  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false, // Change this to false for infinite scroll
  });

  const [trigger, { data, error, isLoading, isFetching }] =
    useLazyGetHomePageTournamentQuery();

  // Fetch tournaments when query changes
  useEffect(() => {
    // Ye condition add karne se initial load par hi call hogi
    if (query.page === 1) {
      setTournaments([]);
    }
    trigger(query);
  }, [query, trigger]);

  // Append new data to tournaments list
  useEffect(() => {
    if (data?.data?.tournaments) {
      setTournaments((prev) => [...prev, ...data.data.tournaments]);
    }
  }, [data]);

  // Infinite scrolling logic
  useEffect(() => {
    if (
      inView &&
      !isFetching &&
      data?.data?.pagination?.currentPage < data?.data?.pagination?.totalPages
    ) {
      setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  }, [inView, isFetching, data]);

  // Handler functions for filter changes
  const handleMapSelect = (name) => {
    setTournaments([]); // Reset tournaments on filter change
    setQuery({ ...query, map: name, page: 1 });
  };

  const handleModSelect = (mode) => {
    setTournaments([]); // Reset tournaments on filter change
    setQuery({ ...query, mode: mode, page: 1 });
  };

  const handleResetFilter = () => {
    setTournaments([]); // Reset tournaments on filter change
    setQuery({
      page: 1,
      limit: 5,
      map: "",
      mode: "",
    });
  };

  return (
    <div className="px-4">
      <MatchCategories
        onSelectMap={handleMapSelect}
        onSelectMode={handleModSelect}
        onResetFilter={handleResetFilter}
      />
      {/* Initial load and empty state management */}
      {isLoading && tournaments.length === 0 && (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        </div>
      )}
      {!isLoading && !isFetching && tournaments.length === 0 && (
        <div className="flex flex-col items-center justify-center p-8 text-center rounded-lg bg-black/20">
          <h2 className="text-xl text-white">No Matches Found</h2>
        </div>
      )}
      {/* Display tournaments */}
      <div className="space-y-4">
        {tournaments.map((e, index) => (
          <div key={e._id}>
            <MatchCard
              id={e._id}
              title={e.title}
              map={e.map}
              entryFee={e.entryFee}
              mode={e.mode}
              maxTeam={e.totalSpots}
              prizePool={e.prizePool}
              startTime={e.matchTime}
              teamJoined={e.registrationCount || 0}
            />
          </div>
        ))}
      </div>
      {/* Subsequent page loading indicator */}
      {isFetching ? (
        <div className="text-center p-4 mb-20">
          <p>Loading more tournaments...</p>
        </div>
      ) : (
        ""
      )}
      {/* The observer element for infinite scroll */}
      {tournaments.length > 0 && <div ref={ref} className="h-1" />}
    </div>
  );
};

export default Page;
