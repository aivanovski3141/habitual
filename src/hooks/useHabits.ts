"use client";

import { useState, useEffect, useCallback } from "react";
import { Habit } from "@/lib/types";
import { seedIfNeeded } from "@/lib/seed";

const STORAGE_KEY = "habitual-habits";

function loadHabits(): Habit[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveHabits(habits: Habit[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(habits));
}

export function useHabits() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    seedIfNeeded();
    setHabits(loadHabits());
  }, []);

  const addHabit = useCallback((name: string, type: "good" | "bad") => {
    setHabits((prev) => {
      const next = [
        ...prev,
        {
          id: crypto.randomUUID(),
          name,
          type,
          createdAt: new Date().toISOString(),
        },
      ];
      saveHabits(next);
      return next;
    });
  }, []);

  const deleteHabit = useCallback((id: string) => {
    setHabits((prev) => {
      const next = prev.filter((h) => h.id !== id);
      saveHabits(next);
      return next;
    });
  }, []);

  return { habits, addHabit, deleteHabit };
}
