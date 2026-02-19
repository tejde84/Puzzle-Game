import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import { useActivityStorage } from "../hooks/useActivityStorage";
import HeatmapCell from "./HeatmapCell";

const intensityMap = {
  0: "bg-gray-200",   // no play
  1: "bg-green-200",  // <1 hour
  2: "bg-green-400",  // 1–2 hours
  3: "bg-green-600",  // 2–3 hours
  4: "bg-green-800",  // >3 hours
};

export default function HeatmapContainer() {
  const { getAllActivity } = useActivityStorage();
  const [activity, setActivity] = useState({});

  useEffect(() => {
    (async () => {
      try {
        const all = await getAllActivity();
        const map = {};
        all.forEach((a) => {
          const date = dayjs(a.date).format("YYYY-MM-DD");
          // accumulate hours played per day
          map[date] = (map[date] || 0) + (a.hoursPlayed || 0);
        });
        setActivity(map);
      } catch (err) {
        console.error("Error loading activity:", err);
      }
    })();
  }, []);

  // Generate all days in current year
  const startOfYear = dayjs().startOf("year");
  const totalDays = startOfYear.add(1, "year").diff(startOfYear, "day");
  const days = [];
  for (let i = 0; i < totalDays; i++) {
    days.push(startOfYear.add(i, "day").format("YYYY-MM-DD"));
  }

  // Group into weeks (like GitHub heatmap)
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return (
    <div className="p-4">
      <h2 className="text-brandBlue font-bold mb-2">🔥 Daily Sudoko Playtime</h2>
      <div className="flex space-x-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col space-y-1">
            {week.map((day) => {
              const hours = activity[day] || 0;
              let level = 0;
              if (hours >= 3) level = 4;
              else if (hours >= 2) level = 3;
              else if (hours >= 1) level = 2;
              else if (hours > 0) level = 1;

              return (
                <HeatmapCell
                  key={day}
                  activity={{ date: day, hours }}
                  intensityMap={intensityMap}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
const API_BASE = process.env.REACT_APP_API_URL;

