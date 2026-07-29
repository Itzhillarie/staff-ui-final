"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Edit3,
  Loader2,
  Save,
  Search,
  Trash2,
  UserPlus,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { canManageUsers, canViewUsers, useAuthHydrated } from "@/app/lib/access";
import {
  AppUser,
  UserPayload,
  createUser,
  deleteUser,
  getUsers,
  updateUser,
} from "@/app/lib/users";
import { useAuthStore } from "@/app/store/authstore";

const roles = ["Employee", "Peer Reviewer", "Product Manager", "Administrator"];

const emptyForm: UserPayload = {
  username: "",
  email: "",
  role: "Employee",
  first_name: "",
  last_name: "",
  password: "",
  department: "",
};

function displayName(user: AppUser) {
  const fullName = [user.first_name, user.last_name].filter(Boolean).join(" ");
  return user.name || fullName || user.username;
}

export default function UsersPage() {
  const router = useRouter();
  const currentUser = useAuthStore((state) => state.user);
  const authHydrated = useAuthHydrated();
  const canManage = canManageUsers(currentUser?.role);

  const [users, setUsers] = useState<AppUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<AppUser | null>(null);
  const [form, setForm] = useState<UserPayload>(emptyForm);

  useEffect(() => {
    if (authHydrated && !canViewUsers(currentUser?.role)) {
      router.replace("/dashboard");
      return;
    }

    if (authHydrated) {
      void loadUsers();
    }
  }, [authHydrated, currentUser?.role, router]);

  async function loadUsers() {
    try {
      setLoading(true);
      setUsers(await getUsers());
    } catch (error) {
      console.error(error);
      toast.error("Unable to load users.");
    } finally {
      setLoading(false);
    }
  }

  const filteredUsers = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return users;
    }

    return users.filter((user) =>
      [
        displayName(user),
        user.username,
        user.email,
        user.role,
        user.department,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(keyword)
    );
  }, [search, users]);

  function startCreate() {
    setEditingUser(null);
    setForm(emptyForm);
    setFormOpen(true);
  }

  function startEdit(user: AppUser) {
    setEditingUser(user);
    setForm({
      username: user.username,
      email: user.email ?? "",
      role: user.role,
      first_name: user.first_name ?? "",
      last_name: user.last_name ?? "",
      password: "",
      department: user.department ?? "",
    });
    setFormOpen(true);
  }

  async function submitUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!canManage) {
      toast.error("Only administrators can manage users.");
      return;
    }

    if (!form.username.trim() || !form.email.trim() || !form.role.trim()) {
      toast.error("Username, email and role are required.");
      return;
    }

    if (!editingUser && !form.password?.trim()) {
      toast.error("Password is required for new users.");
      return;
    }

    try {
      setSaving(true);
      const payload = {
        ...form,
        username: form.username.trim(),
        email: form.email.trim(),
        first_name: form.first_name?.trim(),
        last_name: form.last_name?.trim(),
        department: form.department?.trim(),
        password: form.password?.trim() || undefined,
      };

      if (editingUser) {
        await updateUser(editingUser.id, payload);
        toast.success("User updated.");
      } else {
        await createUser(payload);
        toast.success("User created.");
      }

      setFormOpen(false);
      setEditingUser(null);
      setForm(emptyForm);
      await loadUsers();
    } catch (error) {
      console.error(error);
      toast.error(editingUser ? "Unable to update user." : "Unable to create user.");
    } finally {
      setSaving(false);
    }
  }

  async function removeUser(user: AppUser) {
    if (!canManage) {
      toast.error("Only administrators can delete users.");
      return;
    }

    const confirmed = window.confirm(`Delete ${displayName(user)}?`);

    if (!confirmed) {
      return;
    }

    try {
      await deleteUser(user.id);
      toast.success("User deleted.");
      await loadUsers();
    } catch (error) {
      console.error(error);
      toast.error("Unable to delete user.");
    }
  }

  if (!authHydrated || !canViewUsers(currentUser?.role)) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Users
          </h1>
          <p className="mt-2 text-slate-500 dark:text-slate-400">
            Manage staff accounts and role assignments.
          </p>
        </div>

        {canManage && (
          <button
            onClick={startCreate}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <UserPlus size={18} />
            Add User
          </button>
        )}
      </div>

      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="relative">
          <Search className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users..."
            className="w-full rounded-lg border border-slate-300 bg-white p-3 pl-10 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
          />
        </div>
      </section>

      {formOpen && canManage && (
        <form
          onSubmit={submitUser}
          className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              {editingUser ? "Edit User" : "New User"}
            </h2>
            <button
              type="button"
              aria-label="Close user form"
              onClick={() => setFormOpen(false)}
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <input
              value={form.username}
              onChange={(event) =>
                setForm((current) => ({ ...current, username: event.target.value }))
              }
              placeholder="Username"
              className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <input
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((current) => ({ ...current, email: event.target.value }))
              }
              placeholder="Email"
              className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <input
              value={form.first_name}
              onChange={(event) =>
                setForm((current) => ({ ...current, first_name: event.target.value }))
              }
              placeholder="First name"
              className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <input
              value={form.last_name}
              onChange={(event) =>
                setForm((current) => ({ ...current, last_name: event.target.value }))
              }
              placeholder="Last name"
              className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <select
              value={form.role}
              onChange={(event) =>
                setForm((current) => ({ ...current, role: event.target.value }))
              }
              className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
            <input
              value={form.department}
              onChange={(event) =>
                setForm((current) => ({ ...current, department: event.target.value }))
              }
              placeholder="Department"
              className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
            />
            <input
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((current) => ({ ...current, password: event.target.value }))
              }
              placeholder={editingUser ? "New password (optional)" : "Password"}
              className="rounded-lg border border-slate-300 bg-white p-3 text-slate-900 outline-none focus:border-blue-600 dark:border-slate-700 dark:bg-slate-950 dark:text-white md:col-span-2"
            />
          </div>

          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {saving ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
              Save User
            </button>
            <button
              type="button"
              onClick={() => setFormOpen(false)}
              className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={36} />
          </div>
        ) : filteredUsers.length === 0 ? (
          <div className="p-16 text-center text-slate-500 dark:text-slate-400">
            No users found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-slate-50 dark:bg-slate-950">
                <tr>
                  {["User", "Email", "Role", "Department", "Status", ""].map(
                    (heading) => (
                      <th
                        key={heading}
                        className="px-6 py-4 text-left text-sm font-semibold text-slate-500 dark:text-slate-400"
                      >
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredUsers.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {displayName(user)}
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        @{user.username}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">
                      {user.email || "-"}
                    </td>
                    <td className="px-6 py-5">
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-950/50 dark:text-blue-300">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">
                      {user.department || "-"}
                    </td>
                    <td className="px-6 py-5 text-sm text-slate-600 dark:text-slate-300">
                      {user.is_active === false ? "Inactive" : "Active"}
                    </td>
                    <td className="px-6 py-5">
                      {canManage && (
                        <div className="flex justify-end gap-2">
                          <button
                            aria-label="Edit user"
                            onClick={() => startEdit(user)}
                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                          >
                            <Edit3 size={18} />
                          </button>
                          <button
                            aria-label="Delete user"
                            onClick={() => removeUser(user)}
                            className="rounded-lg p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
