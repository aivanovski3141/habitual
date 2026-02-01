"use client";

import { useState } from "react";
import { Habit, DayLog } from "@/lib/types";
import { DayDetail } from "./DayDetail";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function formatDate(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function scoreDay(habits: Habit[], logs: DayLog[]): number | null {
  if (habits.length === 0) return null;
  const logMap = new Map(logs.map((l) => [l.habitId, l]));
  let score = 0;
  let counted = 0;

  for (const h of habits) {
    const log = logMap.get(h.id);
    if (!log) continue;
    counted++;
    const val = log.status === "yes" ? 1 : log.status === "partial" ? 0.5 : 0;
    if (h.type === "good") {
      score += val;
    } else {
      score += 1 - val;
    }
  }

  if (counted === 0) return null;
  return score / counted;
}

function cellStyle(score: number | null): string {
  if (score === null) return "bg-white/[0.03] text-zinc-700";
  if (score >= 0.8) return "bg-emerald-500/70 text-white";
  if (score >= 0.6) return "bg-emerald-500/40 text-emerald-200";
  if (score >= 0.4) return "bg-amber-500/40 text-amber-200";
  if (score >= 0.2) return "bg-red-500/40 text-red-200";
  return "bg-red-500/70 text-white";
}

export function CalendarHeatmap({
  habits,
  getLogsForDate,
}: {
  habits: Habit[];
  getLogsForDate: (date: string) => DayLog[];
}) {
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const daysInMonth = getDaysInMonth(year, month);
  const firstDow = new Date(year, month, 1).getDay();
  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
    year: "numeric",
  });

  const prev = () => {
    if (month === 0) { setMonth(11); setYear(year - 1); }
    else setMonth(month - 1);
  };

  const next = () => {
    if (month === 11) { setMonth(0); setYear(year + 1); }
    else setMonth(month + 1);
  };

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className="glass rounded-3xl p-6 border border-white/10">
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prev}
          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          ←
        </button>
        <span className="font-semibold text-white tracking-tight">{monthName}</span>
        <button
          onClick={next}
          className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-center text-[11px] mb-2">
        {DAYS.map((d) => (
          <div key={d} className="text-zinc-600 font-medium py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((day, i) => {
          if (day === null) return <div key={`empty-${i}`} />;
          const date = formatDate(year, month, day);
          const logs = getLogsForDate(date);
          const score = scoreDay(habits, logs);
          return (
            <button
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`aspect-square rounded-xl text-xs font-semibold flex items-center justify-center transition-all duration-200 hover:scale-110 hover:ring-2 hover:ring-violet-500/40 cursor-pointer ${cellStyle(score)}`}
            >
              {day}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 mt-6 text-[11px] text-zinc-600 justify-center">
        <span>Worse</span>
        {[
          "bg-red-500/70",
          "bg-red-500/40",
          "bg-amber-500/40",
          "bg-emerald-500/40",
          "bg-emerald-500/70",
        ].map((c) => (
          <div key={c} className={`w-4 h-4 rounded-md ${c}`} />
        ))}
        <span>Better</span>
      </div>

      {selectedDate && (
        <DayDetail
          date={selectedDate}
          habits={habits}
          logs={getLogsForDate(selectedDate)}
          onClose={() => setSelectedDate(null)}
        />
      )}
    </div>
  );
}
