"use client";

import { useState, useEffect, useCallback } from "react";
import { DayLog } from "@/lib/types";
import { seedIfNeeded } from "@/lib/seed";

const STORAGE_KEY = "habitual-logs";

function loadLogs(): DayLog[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveLogs(logs: DayLog[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function useLogs() {
  const [logs, setLogs] = useState<DayLog[]>([]);

  useEffect(() => {
    seedIfNeeded();
    setLogs(loadLogs());
  }, []);

  const setLog = useCallback(
    (habitId: string, date: string, status: "yes" | "no" | "partial") => {
      setLogs((prev) => {
        const next = prev.filter(
          (l) => !(l.habitId === habitId && l.date === date)
        );
        next.push({ habitId, date, status });
        saveLogs(next);
        return next;
      });
    },
    []
  );

  const getLog = useCallback(
    (habitId: string, date: string): DayLog | undefined => {
      return logs.find((l) => l.habitId === habitId && l.date === date);
    },
    [logs]
  );

  const getLogsForDate = useCallback(
    (date: string): DayLog[] => {
      return logs.filter((l) => l.date === date);
    },
    [logs]
  );

  const getLogsForMonth = useCallback(
    (year: number, month: number): DayLog[] => {
      const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
      return logs.filter((l) => l.date.startsWith(prefix));
    },
    [logs]
  );

  return { logs, setLog, getLog, getLogsForDate, getLogsForMonth };
}
