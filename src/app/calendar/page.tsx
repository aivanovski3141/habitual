"use client";

import { useHabits } from "@/hooks/useHabits";
import { useLogs } from "@/hooks/useLogs";
import { CalendarHeatmap } from "@/components/CalendarHeatmap";

export default function CalendarPage() {
  const { habits } = useHabits();
  const { getLogsForDate } = useLogs();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Calendar</h1>
        <p className="text-sm text-zinc-500 mt-1">Your habit history at a glance</p>
      </div>
      <CalendarHeatmap habits={habits} getLogsForDate={getLogsForDate} />
    </div>
  );
}
