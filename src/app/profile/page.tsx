"use client";

import { useRef } from "react";
import { useProfile } from "@/hooks/useProfile";

export default function ProfilePage() {
  const { profile, updateProfile } = useProfile();
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => updateProfile({ photo: reader.result as string });
    reader.readAsDataURL(file);
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">Profile</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage your personal info</p>
      </div>

      <div className="glass rounded-3xl p-8 border border-white/10">
        {/* Photo */}
        <div className="flex flex-col items-center mb-8">
          <button
            onClick={() => fileRef.current?.click()}
            className="relative group cursor-pointer"
          >
            {profile.photo ? (
              <img
                src={profile.photo}
                alt="Profile"
                className="w-28 h-28 rounded-full object-cover ring-2 ring-violet-500/40"
              />
            ) : (
              <div className="w-28 h-28 rounded-full bg-white/5 ring-2 ring-white/10 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-zinc-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
            )}
            <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <span className="text-white text-xs font-semibold">Change</span>
            </div>
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handlePhoto}
          />
          {profile.photo && (
            <button
              onClick={() => updateProfile({ photo: null })}
              className="mt-3 text-xs text-zinc-600 hover:text-red-400 transition-colors cursor-pointer"
            >
              Remove photo
            </button>
          )}
        </div>

        {/* Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
              Name
            </label>
            <input
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
              placeholder="Your name"
              value={profile.name}
              onChange={(e) => updateProfile({ name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
                Age
              </label>
              <input
                type="number"
                min="1"
                max="150"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all"
                placeholder="25"
                value={profile.age}
                onChange={(e) => updateProfile({ age: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
                Gender
              </label>
              <select
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all appearance-none cursor-pointer"
                value={profile.gender}
                onChange={(e) => updateProfile({ gender: e.target.value })}
              >
                <option value="" className="bg-zinc-900">Select</option>
                <option value="male" className="bg-zinc-900">Male</option>
                <option value="female" className="bg-zinc-900">Female</option>
                <option value="non-binary" className="bg-zinc-900">Non-binary</option>
                <option value="other" className="bg-zinc-900">Other</option>
                <option value="prefer-not-to-say" className="bg-zinc-900">Prefer not to say</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-widest text-zinc-500 mb-2">
              Bio
            </label>
            <textarea
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none focus:border-violet-500/50 focus:ring-1 focus:ring-violet-500/30 transition-all resize-none"
              rows={3}
              placeholder="A few words about yourself..."
              value={profile.bio}
              maxLength={200}
              onChange={(e) => updateProfile({ bio: e.target.value })}
            />
            <p className="text-right text-[11px] text-zinc-600 mt-1">
              {profile.bio.length}/200
            </p>
          </div>
        </div>

        <p className="text-xs text-zinc-600 mt-6 text-center">
          Saved automatically to your browser
        </p>
      </div>
    </div>
  );
}
