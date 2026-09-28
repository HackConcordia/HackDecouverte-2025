"use client";

/* =========================================================================
   Countdown
   Days / hours / minutes / seconds until the event, as spray-painted tiles.
   TODO: set the real date and start time below.
   ========================================================================= */

import { useEffect, useState } from "react";
import { useLanguage } from "../lib/i18n";

// TODO: replace with the real start date (Montréal time is UTC-5 in November).
export const EVENT_START = new Date("2026-11-14T09:00:00-05:00");

type TimeLeft = { days: number; hours: number; minutes: number; seconds: number };

function getTimeLeft(): TimeLeft | null {
  const ms = EVENT_START.getTime() - Date.now();
  if (ms <= 0) return null; // the event has started

  return {
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

export default function Countdown() {
  const { t } = useLanguage();

  // Starts empty and fills in after the page loads (the server doesn't know the visitor's time).
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null | undefined>(undefined);

  useEffect(() => {
    setTimeLeft(getTimeLeft());
    const timer = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (timeLeft === undefined) return <div className="countdown" aria-hidden="true" />;

  if (timeLeft === null) {
    return <p className="countdown-live">{t("countdown.live")}</p>;
  }

  const units = [
    { id: "days", value: timeLeft.days, label: t("countdown.days") },
    { id: "hours", value: timeLeft.hours, label: t("countdown.hours") },
    { id: "minutes", value: timeLeft.minutes, label: t("countdown.minutes") },
    { id: "seconds", value: timeLeft.seconds, label: t("countdown.seconds") },
  ];

  return (
    <div className="countdown" role="timer" aria-live="off">
      {units.map((unit, index) => (
        // Keyed by id, not the translated label, so switching EN/FR doesn't remount the tile
        <div key={unit.id} className="cd-unit" style={{ animationDelay: `${1.9 + index * 0.1}s` }}>
          {/* key={value} restarts the little "flip" animation every time the number changes */}
          <span key={unit.value} className="cd-value">
            {String(unit.value).padStart(2, "0")}
          </span>
          <span className="cd-label">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
