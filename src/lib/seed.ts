import { Habit, DayLog } from "./types";

const SEED_KEY = "habitual-seeded";

const HABITS: Habit[] = [
  { id: "h1", name: "Exercise", type: "good", createdAt: "2025-11-01T00:00:00Z" },
  { id: "h2", name: "Read 30 minutes", type: "good", createdAt: "2025-11-01T00:00:00Z" },
  { id: "h3", name: "Drink 2L water", type: "good", createdAt: "2025-11-01T00:00:00Z" },
  { id: "h4", name: "Meditate", type: "good", createdAt: "2025-12-01T00:00:00Z" },
  { id: "h5", name: "No alcohol", type: "bad", createdAt: "2025-11-01T00:00:00Z" },
  { id: "h6", name: "No junk food", type: "bad", createdAt: "2025-11-01T00:00:00Z" },
  { id: "h7", name: "No doomscrolling", type: "bad", createdAt: "2025-12-01T00:00:00Z" },
];

// Deterministic pseudo-random from a seed string
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function dateRange(startStr: string, endStr: string): string[] {
  const dates: string[] = [];
  const d = new Date(startStr);
  const end = new Date(endStr);
  while (d <= end) {
    dates.push(d.toISOString().slice(0, 10));
    d.setDate(d.getDate() + 1);
  }
  return dates;
}

function generateLogs(): DayLog[] {
  const today = new Date();
  const twoMonthsAgo = new Date(today);
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
  const startDate = twoMonthsAgo.toISOString().slice(0, 10);
  const endDate = today.toISOString().slice(0, 10);
  const days = dateRange(startDate, endDate);
  const rand = mulberry32(42);
  const logs: DayLog[] = [];

  // Per-habit probability profiles to make data feel realistic
  const profiles: Record<string, { yes: number; partial: number }> = {
    // Exercise: pretty consistent, some misses on weekends
    h1: { yes: 0.6, partial: 0.15 },
    // Reading: very consistent
    h2: { yes: 0.7, partial: 0.15 },
    // Water: easy habit, high compliance
    h3: { yes: 0.8, partial: 0.1 },
    // Meditate: newer habit, building up
    h4: { yes: 0.45, partial: 0.2 },
    // No alcohol: mostly good, slip on weekends
    h5: { yes: 0.15, partial: 0.1 },
    // No junk food: moderate slips
    h6: { yes: 0.25, partial: 0.15 },
    // No doomscrolling: hard to quit
    h7: { yes: 0.35, partial: 0.25 },
  };

  for (const date of days) {
    const dow = new Date(date).getDay();
    const isWeekend = dow === 0 || dow === 6;

    for (const habit of HABITS) {
      // Skip if habit didn't exist yet
      if (date < habit.createdAt.slice(0, 10)) continue;

      const p = profiles[habit.id];
      const r = rand();

      let status: DayLog["status"];

      if (habit.type === "good") {
        // Weekends: slightly less likely to exercise/meditate
        const weekendPenalty = isWeekend && (habit.id === "h1" || habit.id === "h4") ? 0.2 : 0;
        if (r < p.yes - weekendPenalty) status = "yes";
        else if (r < p.yes + p.partial - weekendPenalty) status = "partial";
        else status = "no";
      } else {
        // Bad habits: "yes" = did the bad thing, "no" = avoided it
        // Weekend more likely to slip for alcohol/junk food
        const weekendSlip = isWeekend && (habit.id === "h5" || habit.id === "h6") ? 0.2 : 0;
        if (r < p.yes + weekendSlip) status = "yes";
        else if (r < p.yes + p.partial + weekendSlip) status = "partial";
        else status = "no";
      }

      // ~10% chance of no log at all (forgot to track)
      if (rand() < 0.1) continue;

      logs.push({ habitId: habit.id, date, status });
    }
  }

  return logs;
}

export function seedIfNeeded() {
  if (typeof window === "undefined") return;
  if (localStorage.getItem(SEED_KEY)) return;

  localStorage.setItem("habitual-habits", JSON.stringify(HABITS));
  localStorage.setItem("habitual-logs", JSON.stringify(generateLogs()));
  localStorage.setItem(SEED_KEY, "true");
}
