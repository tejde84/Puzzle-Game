import React from "react";

export default function HeatmapCell({ activity, intensityMap }) {
  const level = activity?.solved
    ? Math.min(activity.difficulty + (activity.score === 100 ? 1 : 0), 4)
    : 0;

  return (
    <div
      className={`w-4 h-4 rounded ${intensityMap[level]}`}
      title={
        activity
          ? `${activity.date} | Score: ${activity.score} | Time: ${activity.timeTaken}s`
          : "Not played"
      }
    />
  );
}