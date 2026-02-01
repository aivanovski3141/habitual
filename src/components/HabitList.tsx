"use client";

import { Habit, DayLog } from "@/lib/types";

const STATUS_OPTIONS: DayLog["status"][] = ["yes", "partial", "no"];

const STATUS_STYLES: Record<DayLog["status"], { active: string; icon: string }> = {
  yes: {
    active: "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40 status-active",
    icon: "\u2713",
  },
  partial: {
    active: "bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/40 status-active",
    icon: "\u00BD",
  },
  no: {
    active: "bg-red-500/20 text-red-400 ring-1 ring-red-500/40 status-active",
    icon: "\u2717",
  },
};

const INACTIVE = "bg-white/5 text-zinc-600 hover:bg-white/10 hover:text-zinc-400";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function HabitList({
  habits,
  getLog,
  setLog,
  deleteHabit,
}: {
  habits: Habit[];
  getLog: (habitId: string, date: string) => DayLog | undefined;
  setLog: (habitId: string, date: string, status: DayLog["status"]) => void;
  deleteHabit: (id: string) => void;
}) {
  const today = todayStr();
  const good = habits.filter((h) => h.type === "good");
  const bad = habits.filter((h) => h.type === "bad");

  const renderGroup = (title: string, items: Habit[], dotColor: string) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <div className={`w-2 h-2 rounded-full ${dotColor}`} />
          <h2 className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            {title}
          </h2>
        </div>
        <div className="space-y-2">
          {items.map((habit) => {
            const log = getLog(habit.id, today);
            return (
              <div
                key={habit.id}
                className="glass glass-hover rounded-2xl px-5 py-4 flex items-center justify-between transition-all duration-200"
              >
                <span className="text-sm font-medium text-zinc-200">{habit.name}</span>
                <div className="flex items-center gap-2">
                  {STATUS_OPTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => setLog(habit.id, today, s)}
                      className={`w-9 h-9 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
                        log?.status === s ? STATUS_STYLES[s].active : INACTIVE
                      }`}
                    >
                      {STATUS_STYLES[s].icon}
                    </button>
                  ))}
                  <button
                    onClick={() => deleteHabit(habit.id)}
                    className="ml-1 w-9 h-9 rounded-xl text-sm text-zinc-700 hover:text-red-400 hover:bg-red-500/10 transition-all cursor-pointer"
                  >
                    ×
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderGroup("Good Habits", good, "bg-emerald-500")}
      {renderGroup("Bad Habits", bad, "bg-red-500")}
      {habits.length === 0 && (
        <div className="glass rounded-2xl py-16 text-center">
          <p className="text-zinc-500 text-sm">No habits yet. Add one to get started.</p>
        </div>
      )}
    </div>
  );
}
