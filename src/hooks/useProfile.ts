"use client";

import { useState, useEffect, useCallback } from "react";
import { Profile } from "@/lib/types";

const STORAGE_KEY = "habitual-profile";

const DEFAULT_PROFILE: Profile = {
  photo: null,
  name: "",
  age: "",
  gender: "",
  bio: "",
};

function load(): Profile {
  if (typeof window === "undefined") return DEFAULT_PROFILE;
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? { ...DEFAULT_PROFILE, ...JSON.parse(raw) } : DEFAULT_PROFILE;
}

export function useProfile() {
  const [profile, setProfile] = useState<Profile>(DEFAULT_PROFILE);

  useEffect(() => {
    setProfile(load());
  }, []);

  const updateProfile = useCallback((updates: Partial<Profile>) => {
    setProfile((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { profile, updateProfile };
}
