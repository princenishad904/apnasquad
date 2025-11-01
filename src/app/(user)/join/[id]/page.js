"use client";
import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams } from "next/navigation";
import { toast } from "sonner";
import {
  useGetTournamentDetailsQuery,
} from "@/redux/tournament/tournamentApi";
import { formatISODateToLocal } from "@/lib/convertUTCToIST";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import Squad from "@/components/mode/Squad";
import Duo from "@/components/mode/Duo";
import Solo from "@/components/mode/Solo";
import JoinTeamPopup from "@/components/user/JoinTeamPopup";
import Loader from "@/components/Loader";
import TextCopy from "@/components/TextCopy";
import useTimeLeft from "@/components/TimeLeft";
import  { SwipeButton } from "@/components/user/RegisterConfirmation";

const PrizeIcon = () => (
  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
    <path
      fillRule="evenodd"
      d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z"
      clipRule="evenodd"
    />
  </svg>
);

const EntryFeeIcon = () => (
  <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
      clipRule="evenodd"
    />
  </svg>
);

const TournamentJoin = () => {
  const { id } = useParams();

  const { data, error, isLoading } = useGetTournamentDetailsQuery({
    tournamentId: id,
  });

  const tournament = data?.data?.tournament;
  const teams = data?.data?.teams || [];
  const isJoined = data?.data?.isJoined || false;
  const teamId = data?.data?.teamId || false;
  const teamPassword = data?.data?.teamPassword || false;

  const calculateTimeLeft = useCallback(() => {
    const matchTime = tournament?.matchTime;
    if (!matchTime) {
      return {
        started: false,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isToday: false,
      };
    }

    const targetDate = new Date(matchTime);
    if (isNaN(targetDate.getTime())) {
      console.error("Invalid matchTime format:", matchTime);
      return {
        started: false,
        hours: 0,
        minutes: 0,
        seconds: 0,
        isToday: false,
      };
    }

    const now = new Date();
    const difference = targetDate - now;

    const isToday =
      now.getFullYear() === targetDate.getFullYear() &&
      now.getMonth() === targetDate.getMonth() &&
      now.getDate() === targetDate.getDate();

    if (difference <= 0) {
      return { started: true, hours: 0, minutes: 0, seconds: 0, isToday };
    }

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      started: false,
      isToday,
    };
  }, [tournament?.matchTime]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    if (!tournament?.matchTime) return;

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [calculateTimeLeft, tournament?.matchTime]);

  const progressPercentage = useMemo(() => {
    if (!tournament?.totalSpots || teams.length === 0) return 0;
    return Math.round((teams.length / tournament.totalSpots) * 100);
  }, [teams.length, tournament?.totalSpots]);

  const playerText = useMemo(() => {
    if (!tournament?.mode) return "";

    const modeText =
      {
        solo: "players",
        duo: "Duo",
        squad: "Squad",
      }[tournament.mode] || "Squad";

    return `${teams.length}/${tournament?.totalSpots} ${modeText}`;
  }, [teams.length, tournament?.totalSpots, tournament?.mode]);


  const renderTeamSlots = () => {
    if (!tournament?.totalSpots) return null;

    const TeamComponent =
      {
        squad: Squad,
        duo: Duo,
        solo: Solo,
      }[tournament.mode] || Solo;

    return Array.from({ length: tournament.totalSpots }).map((_, index) => {
      const team = teams[index] || null;
      const players = team?.players || [];
      const slot = team?.slot || index + 1;

      return (
        <div key={index} className="my-2">
          <TeamComponent players={players} slot={slot} />
        </div>
      );
    });
  };

  if (isLoading)
    return (
      <div className="w-full h-[80vh] grid place-content-center">
        {" "}
        <Loader size={30} color="white" />
      </div>
    );
  if (error)
    return (
      <div className="text-center py-8">Error loading tournament details</div>
    );
  if (!tournament)
    return <div className="text-center py-8">No tournament found</div>;

  return (
    <div className="space-y-4 px-4">
      {/* Tournament Header Card */}
      <div className="relative w-full min-h-96  overflow-hidden rounded-xl bg-black/50 dark">
        <div className="absolute inset-0.5 flex items-center justify-center backdrop-blur-5xl bg-black/80 rounded-xl">
          <div className="relative z-10 p-4 w-full space-y-4">
            {/* Title and Timer */}
            <span className="text-xl font-semibold text-yellow-500 uppercase tracking-wider">
              {tournament.title}
            </span>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-white mt-1 uppercase">
                  {tournament.map}
                </h3>
                <h3 className="text-sm text-gray-300">
                  {formatISODateToLocal(tournament.matchTime)}
                </h3>
              </div>

              <div
                className={`px-3 py-2 rounded-lg ${
                  timeLeft.started ? "bg-green-500/20" : "bg-transparent"
                }`}
              >
                {timeLeft.isToday ? (
                  <div className="text-center">
                    <p className="text-xs text-white/80">
                      {timeLeft.started ? "LIVE" : "STARTS IN"}
                    </p>
                    {timeLeft.started ? (
                      <p className="font-bold text-green-400">JOIN NOW</p>
                    ) : (
                      <p className="font-mono font-bold text-white text-lg">
                        {String(timeLeft.hours).padStart(2, "0")}:
                        {String(timeLeft.minutes).padStart(2, "0")}:
                        {String(timeLeft.seconds).padStart(2, "0")}
                      </p>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            {/* Registration Progress */}
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-blue-300">{playerText}</span>
                <span className="text-white/80">
                  {progressPercentage}% FULL
                </span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-2 rounded-full"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Tournament Info */}
            <div className="flex justify-between items-center pt-4 border-t border-gray-800/50">
              <div className="text-center">
                <p className="text-xs text-white/60">Entry Fee</p>
                <p className="font-bold text-yellow-400 flex items-center justify-center">
                  ₹ {tournament.entryFee}/ {tournament.mode}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-white/60">Type</p>
                <p className="font-bold text-white">
                  {tournament.mode.toUpperCase()}
                </p>
              </div>

              <div className="text-center">
                <p className="text-xs text-white/60">Prize Pool</p>
                <p className="font-bold text-green-400 flex items-center justify-center">
                  <PrizeIcon />
                  {tournament.prizePool}
                </p>
              </div>
            </div>

            {/* Registration Buttons */}
            {!isJoined && (
              <div
                className={`grid ${
                  tournament.mode === "solo" ? "grid-cols-1" : "grid-cols-1"
                } gap-4`}
              >
                {tournament.mode !== "solo" && <JoinTeamPopup />}
              
              </div>
            )}

            {/* Room Info */}
            {tournament?.roomId && teamId && (
              <div className="grid grid-cols-2 gap-4 py-4 rounded-2xl bg-black/40">
                <div>
                  <Label className="mb-1 text-gray-400">Room ID</Label>
                  <TextCopy text={tournament.roomId} />
                </div>
                <div>
                  <Label className="mb-1 text-gray-400">Room Password</Label>
                  <TextCopy text={tournament.password || 123} />
                </div>
              </div>
            )}
            {tournament?.roomId && teamId ? (
              ""
            ) : (
              <>
               <p className="text-center text-gray-400 text-sm">
                Match start hone se {tournament.map === "tdm" ? "10" : "30" } minutes pahale hi room and password yehi
                show hoga 👉
              </p>
              </>
             
            )}
          </div>
        </div>
        <div className="absolute w-96 h-66 bg-green-950 blur-[50px] left-20 top-1/2" />
      </div>


      {/* swipe to register */}


         {!isJoined && (
              <SwipeButton id={id}  />
            )}

               


      {/* Team Info */}
      {teamId && tournament.mode !== "solo" && (
        <div className=" gap-2 p-4 rounded-2xl bg-black/40">
          <div>
            <Label className="mb-1 text-gray-400">Team ID</Label>
            <TextCopy text={teamId} />
          </div>
       
        </div>
      )}

      {/* Teams and Prize Pool Tabs */}
      <Tabs defaultValue="Teams" className="w-full dark">
        <TabsList className="w-full bg-transparent text-white">
          <TabsTrigger value="Teams" className="py-2 text-white">
            Teams
          </TabsTrigger>
          <TabsTrigger value="Prize Pool" className="py-2 text-white">
            Prize Pool
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Teams">
          <div
            className={`mt-1 ${
              tournament.mode === "squad"
                ? "grid sm:grid-cols-2 "
                : "flex flex-wrap justify-center"
            }`}
          >
            {renderTeamSlots()}
          </div>
        </TabsContent>

        <TabsContent value="Prize Pool">
          {tournament?.prizeDistribution?.map((e, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between border-b border-gray-700 p-2"
            >
              <span className="text-gray-400 font-semibold">
                Rank #{e.rank}
              </span>
              <span>₹{e.prize}</span>
            </div>
          ))}
        </TabsContent>
      </Tabs>








      
    </div>
  );
};

export default React.memo(TournamentJoin);
