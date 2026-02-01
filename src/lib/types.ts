export type Habit = {
  id: string;
  name: string;
  type: "good" | "bad";
  createdAt: string;
};

export type DayLog = {
  habitId: string;
  date: string;
  status: "yes" | "no" | "partial";
};

export type Profile = {
  photo: string | null; // base64 data URL
  name: string;
  age: string;
  gender: string;
  bio: string;
};
