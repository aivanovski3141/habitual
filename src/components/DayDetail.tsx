"use client";

import { Habit, DayLog } from "@/lib/types";

export function DayDetail({
  date,
  habits,
  logs,
  onClose,
}: {
  date: string;
  habits: Habit[];
  logs: DayLog[];
  onClose: () => void;
}) {
  const logMap = new Map(logs.map((l) => [l.habitId, l]));

  const formatted = new Date(date + "T00:00:00").toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass rounded-3xl p-7 w-full max-w-sm shadow-2xl shadow-violet-500/5 border border-white/10">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-lg font-bold text-white">{formatted}</h2>
            <p className="text-xs text-zinc-500 mt-0.5">{date}</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-zinc-500 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            ×
          </button>
        </div>
        {habits.length === 0 ? (
          <p className="text-zinc-500 text-sm">No habits tracked.</p>
        ) : (
          <div className="space-y-2">
            {habits.map((h) => {
              const log = logMap.get(h.id);
              const statusLabel = log
                ? { yes: "Done", partial: "Partial", no: "Missed" }[log.status]
                : "No data";
              const statusStyle = log
                ? {
                    yes: "text-emerald-400 bg-emerald-500/10",
                    partial: "text-amber-400 bg-amber-500/10",
                    no: "text-red-400 bg-red-500/10",
                  }[log.status]
                : "text-zinc-600 bg-white/5";
              return (
                <div
                  key={h.id}
                  className="flex justify-between items-center text-sm bg-white/[0.03] rounded-xl px-4 py-3"
                >
                  <span className="text-zinc-300">
                    <span className={h.type === "good" ? "text-emerald-500" : "text-red-500"}>
                      {h.type === "good" ? "+" : "−"}
                    </span>{" "}
                    {h.name}
                  </span>
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${statusStyle}`}
                  >
                    {statusLabel}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
