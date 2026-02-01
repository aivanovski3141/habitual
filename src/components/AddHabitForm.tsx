"use client";

import { useState } from "react";

export function AddHabitForm({
  onAdd,
  onClose,
}: {
  onAdd: (name: string, type: "good" | "bad") => void;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [type, setType] = useState<"good" | "bad">("good");

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="glass rounded-3xl p-7 w-full max-w-sm shadow-2xl shadow-violet-500/5 border border-white/10">
        <h2 className="text-xl font-bold text-white mb-5">New Habit</h2>
        <input
          autoFocus
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 mb-4 text-sm text-white placeholder-zinc-600 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
          placeholder="e.g. Exercise, Read, No alcohol..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && name.trim()) {
              onAdd(name.trim(), type);
              onClose();
            }
          }}
        />
        <div className="flex gap-2 mb-5">
          <button
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              type === "good"
                ? "bg-emerald-500/20 text-emerald-400 ring-1 ring-emerald-500/40"
                : "bg-white/5 text-zinc-500 hover:bg-white/8"
            }`}
            onClick={() => setType("good")}
          >
            Good
          </button>
          <button
            className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
              type === "bad"
                ? "bg-red-500/20 text-red-400 ring-1 ring-red-500/40"
                : "bg-white/5 text-zinc-500 hover:bg-white/8"
            }`}
            onClick={() => setType("bad")}
          >
            Bad
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="flex-1 py-2.5 rounded-xl bg-white/5 text-zinc-400 text-sm font-medium hover:bg-white/10 transition-all cursor-pointer"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="flex-1 py-2.5 rounded-xl btn-primary text-sm font-semibold disabled:opacity-30 cursor-pointer"
            disabled={!name.trim()}
            onClick={() => {
              onAdd(name.trim(), type);
              onClose();
            }}
          >
            Add Habit
          </button>
        </div>
      </div>
    </div>
  );
}
