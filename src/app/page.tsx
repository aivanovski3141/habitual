"use client";

import { useState } from "react";
import { useHabits } from "@/hooks/useHabits";
import { useLogs } from "@/hooks/useLogs";
import { HabitList } from "@/components/HabitList";
import { AddHabitForm } from "@/components/AddHabitForm";

export default function Home() {
  const { habits, addHabit, deleteHabit } = useHabits();
  const { getLog, setLog } = useLogs();
  const [showForm, setShowForm] = useState(false);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Today</h1>
          <p className="text-sm text-zinc-500 mt-1">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary px-5 py-2.5 rounded-xl text-sm font-semibold cursor-pointer"
        >
          + Add Habit
        </button>
      </div>

      <HabitList
        habits={habits}
        getLog={getLog}
        setLog={setLog}
        deleteHabit={deleteHabit}
      />

      {showForm && (
        <AddHabitForm onAdd={addHabit} onClose={() => setShowForm(false)} />
      )}
    </div>
  );
}
