 "use client";

import { useState } from "react";
import { User } from "lucide-react";

export interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  department: string;
  position: string;
}

interface ProfileFormProps {
  profile: Profile;
  onSave: (profile: Profile) => void;
}

export default function ProfileForm({
  profile,
  onSave,
}: ProfileFormProps) {
  const [form, setForm] = useState(profile);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="rounded-xl bg-white p-6 shadow-sm">

      {/* Header */}

      <div className="mb-6 flex items-center gap-3">

        <div className="rounded-lg bg-indigo-100 p-3">
          <User
            size={22}
            className="text-indigo-600"
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold">
            Profile Information
          </h2>

          <p className="text-sm text-slate-500">
            Update your personal information.
          </p>
        </div>

      </div>

      {/* Form */}

      <div className="grid gap-4 md:grid-cols-2">

        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="rounded-lg border p-3"
        />

        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="rounded-lg border p-3"
        />

        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="rounded-lg border p-3"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          className="rounded-lg border p-3"
        />

        <input
          name="department"
          value={form.department}
          onChange={handleChange}
          placeholder="Department"
          className="rounded-lg border p-3"
        />

        <input
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="Position"
          className="rounded-lg border p-3"
        />

      </div>

      {/* Actions */}

      <div className="mt-6 flex justify-end">

        <button
          onClick={() => onSave(form)}
          className="rounded-lg bg-indigo-600 px-6 py-2 text-white hover:bg-indigo-700"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}