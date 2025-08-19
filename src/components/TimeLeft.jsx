// hooks/useTimeLeft.js
"use client";
import { useEffect, useState, useMemo } from "react";

export default function useTimeLeft(time) {
  const targetTime = useMemo(() => {
    if (!time) return null;
    const parsed = new Date(time);
    return isNaN(parsed.getTime()) ? null : parsed;
  }, [time]);

  const calculateTimeLeft = () => {
    if (!targetTime) {
      return {
        hours: "--",
        minutes: "--",
        seconds: "--",
        started: false,
        isToday: false,
      };
    }
    const now = new Date();
    const difference = targetTime - now;

    return {
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      started: difference < 0,
      isToday:
        now.getFullYear() === targetTime.getFullYear() &&
        now.getMonth() === targetTime.getMonth() &&
        now.getDate() === targetTime.getDate(),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
    if (!targetTime) return;
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, [targetTime]);

  return timeLeft;
}
