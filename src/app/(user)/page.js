"use client";

import MatchCard from "@/components/user/MatchCard";
import MatchCategories from "@/components/user/MatchCategories";
import { useLazyGetHomePageTournamentQuery } from "@/redux/tournament/tournamentApi";
import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useInView } from "react-intersection-observer";

const Page = () => {
  const [tournaments, setTournaments] = useState([]);
  const [query, setQuery] = useState({
    page: 1,
    limit: 5,
    map: "",
    mode: "",
  });

  // Use ref to prevent unnecessary re-renders from intersection observer
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: false,
  });

  const [trigger, { data, error, isLoading, isFetching }] =
    useLazyGetHomePageTournamentQuery();

  // Memoized data values to prevent effect dependencies from changing unnecessarily
  const paginationData = useMemo(() => data?.data, [data]);
  const currentPage = useMemo(() => paginationData?.pagination?.currentPage, [paginationData]);
  const totalPages = useMemo(() => paginationData?.pagination?.totalPages, [paginationData]);
  const newTournaments = useMemo(() => paginationData?.tournaments, [paginationData]);

  // Stable callback for fetching data
  const fetchTournaments = useCallback(() => {
    if (query.page === 1) {
      setTournaments([]);
    }
    trigger(query);
  }, [query, trigger]);

  // Fetch tournaments when query changes - optimized with ref
  const isInitialMount = useRef(true);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      fetchTournaments();
    } else {
      fetchTournaments();
    }
  }, [fetchTournaments]);

  // Append new data to tournaments list - optimized
  useEffect(() => {
    if (newTournaments?.length) {
      setTournaments((prev) => [...prev, ...newTournaments]);
    }
  }, [newTournaments]);

  // Infinite scrolling logic - optimized
  const shouldLoadMore = useMemo(() => 
    inView && 
    !isFetching && 
    currentPage < totalPages,
    [inView, isFetching, currentPage, totalPages]
  );

  useEffect(() => {
    if (shouldLoadMore) {
      setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  }, [shouldLoadMore]);

  // Memoized handler functions
  const handleMapSelect = useCallback((name) => {
    setTournaments([]);
    setQuery(prev => ({ ...prev, map: name, page: 1 }));
  }, []);

  const handleModSelect = useCallback((mode) => {
    setTournaments([]);
    setQuery(prev => ({ ...prev, mode: mode, page: 1 }));
  }, []);

  const handleResetFilter = useCallback(() => {
    if (!query.map && !query.mode) return;
    setTournaments([]);
    setQuery({
      page: 1,
      limit: 5,
      map: "",
      mode: "",
    });
  }, [query.map, query.mode]);

  // Memoized loading states
  const showInitialLoader = useMemo(() => 
    isLoading && tournaments.length === 0,
    [isLoading, tournaments.length]
  );

  const showEmptyState = useMemo(() => 
    !isLoading && !isFetching && tournaments.length === 0,
    [isLoading, isFetching, tournaments.length]
  );

  const showLoadMoreIndicator = useMemo(() => 
    isFetching && tournaments.length > 0,
    [isFetching, tournaments.length]
  );

  // Memoized tournament cards to prevent re-renders
  const tournamentCards = useMemo(() => 
    tournaments.map((e) => (
      <div key={e._id} className="w-full">
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
    )),
    [tournaments]
  );

  return (
    <div className=" bg-transaparent">
     

      {/* Main Content */}
      <div className="mx-auto px-4 py-6 max-w-6xl">
        {/* Categories Section */}
        <div className="mb-4">
          <div className="bg-gray-800/30 rounded-2xl p-4 md:p-6 border border-gray-700/50 backdrop-blur-sm">
            <h2 className="text-lg md:text-xl font-semibold text-white mb-4">
              Filter Matches
            </h2>
            <MatchCategories
              onSelectMap={handleMapSelect}
              onSelectMode={handleModSelect}
              onResetFilter={handleResetFilter}
            />
          </div>
        </div>

        {/* Loading States */}
        {showInitialLoader && (
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-800/20 rounded-2xl border border-gray-700/30 backdrop-blur-sm">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p className="text-gray-300 text-lg">Loading tournaments...</p>
          </div>
        )}

        {/* Empty State */}
        {showEmptyState && (
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-800/20 rounded-2xl border border-gray-700/30 backdrop-blur-sm p-8 text-center">
            <div className="w-24 h-24 mb-4 text-gray-500">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No Matches Found</h2>
            <p className="text-gray-400 max-w-md">
              {query.map || query.mode 
                ? "Try adjusting your filters to find more matches."
                : "There are no tournaments available at the moment. Please check back later."}
            </p>
            {(query.map || query.mode) && (
              <button
                onClick={handleResetFilter}
                className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                Reset Filters
              </button>
            )}
          </div>
        )}

        {/* Tournament Grid */}
        {tournaments.length > 0 && (
          <div className="mb-8">
          
            
            {/* Grid Layout for different screen sizes */}
            <div className="grid grid-cols-1 ">
              {tournamentCards}
            </div>
          </div>
        )}

        {/* Loading More Indicator */}
        {showLoadMoreIndicator && (
          <div className="flex justify-center items-center py-8">
            <div className="flex items-center space-x-3 bg-gray-800/50 rounded-2xl px-6 py-4 border border-gray-700/50">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-blue-500 border-t-transparent"></div>
              <span className="text-gray-300">Loading more tournaments...</span>
            </div>
          </div>
        )}


        {/* Infinite scroll trigger - hidden element */}
        {tournaments.length > 0 && currentPage < totalPages && (
          <div ref={ref} className="h-10 opacity-0" />
        )}
      </div>

      {/* Bottom spacing for mobile */}
      <div className="h-6 md:h-8"></div>
    </div>
  );
};

export default React.memo(Page);