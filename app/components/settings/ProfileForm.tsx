"use client";

import { User, Mail, Phone, Camera, FileText } from "lucide-react";

export interface ProfileData {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  phone?: string;
  bio?: string;
  avatar?: string;
}

interface ProfileFormProps {
  profile: ProfileData;
  onChange: (field: keyof ProfileData, value: string) => void;
}

export default function ProfileForm({
  profile,
  onChange,
}: ProfileFormProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">

      {/* Header */}

      <div className="border-b border-slate-200 p-6">

        <h2 className="text-2xl font-bold text-slate-800">
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Update your personal information.
        </p>

      </div>

      {/* Body */}

      <div className="space-y-8 p-8">

        {/* Avatar */}

        <div className="flex flex-col items-center gap-4 sm:flex-row">

          <div className="flex h-28 w-28 items-center justify-center overflow-hidden rounded-full border-4 border-indigo-100 bg-slate-100">

            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt="Avatar"
                className="h-full w-full object-cover"
              />
            ) : (
              <User className="h-12 w-12 text-slate-400" />
            )}

          </div>

          <div>

            <button
              type="button"
              className="flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
            >
              <Camera className="h-4 w-4" />
              Change Photo
            </button>

            <p className="mt-2 text-sm text-slate-500">
              JPG, PNG or GIF. Max size 5MB.
            </p>

          </div>

        </div>

        {/* Names */}

        <div className="grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-600">
              First Name
            </label>

            <input
              value={profile.first_name}
              onChange={(e) =>
                onChange("first_name", e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

          <div>

            <label className="mb-2 block text-sm font-medium text-slate-600">
              Last Name
            </label>

            <input
              value={profile.last_name}
              onChange={(e) =>
                onChange("last_name", e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

        </div>

        {/* Username */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">
            Username
          </label>

          <div className="relative">

            <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              value={profile.username}
              onChange={(e) =>
                onChange("username", e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

        </div>

        {/* Email */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">
            Email Address
          </label>

          <div className="relative">

            <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="email"
              value={profile.email}
              onChange={(e) =>
                onChange("email", e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

        </div>

        {/* Phone */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">
            Phone Number
          </label>

          <div className="relative">

            <Phone className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              value={profile.phone || ""}
              onChange={(e) =>
                onChange("phone", e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
            />

          </div>

        </div>

        {/* Bio */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-600">
            Bio
          </label>

          <div className="relative">

            <FileText className="absolute left-4 top-5 h-5 w-5 text-slate-400" />

            <textarea
              rows={5}
              value={profile.bio || ""}
              onChange={(e) =>
                onChange("bio", e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
              placeholder="Tell us something about yourself..."
            />

          </div>

        </div>

      </div>

    </div>
  );
}