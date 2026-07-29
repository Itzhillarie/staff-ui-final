"use client";

import { useEffect, useState } from "react";

import { useAuthStore } from "@/app/store/authstore";

export type AppRole =
  | "employee"
  | "peer_reviewer"
  | "product_manager"
  | "administrator";

type OwnableRecord = {
  creator?: unknown;
  created_by?: unknown;
  created_by_name?: unknown;
  created_by_username?: unknown;
  owner?: unknown;
  owner_name?: unknown;
  owner_username?: unknown;
  author?: unknown;
  user?: unknown;
  idea_creator?: unknown;
};

export function normalizeRole(role?: string | null): AppRole | null {
  const value = role?.trim().toLowerCase().replace(/[\s-]+/g, "_");

  switch (value) {
    case "admin":
    case "administrator":
      return "administrator";
    case "pm":
    case "product_manager":
    case "productmanager":
      return "product_manager";
    case "peer_reviewer":
    case "peerreviewer":
    case "reviewer":
      return "peer_reviewer";
    case "employee":
    case "staff":
      return "employee";
    default:
      return null;
  }
}

export function canAccessEverywhere(role?: string | null) {
  const normalized = normalizeRole(role);

  return normalized === "administrator" || normalized === "product_manager";
}

export function canAccessPMReview(role?: string | null) {
  return canAccessEverywhere(role);
}

export function canManageUsers(role?: string | null) {
  return normalizeRole(role) === "administrator";
}

export function canViewUsers(role?: string | null) {
  return canAccessEverywhere(role);
}

export function isEmployee(role?: string | null) {
  return normalizeRole(role) === "employee";
}

export function getOwnerValue(value: unknown): string | null {
  if (typeof value === "string" || typeof value === "number") {
    return String(value);
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;

    for (const key of ["username", "name", "email", "id"]) {
      const nextValue = record[key];

      if (typeof nextValue === "string" || typeof nextValue === "number") {
        return String(nextValue);
      }
    }
  }

  return null;
}

export function hasOwnershipFields(record: OwnableRecord) {
  return [
    "creator",
    "created_by",
    "created_by_name",
    "created_by_username",
    "owner",
    "owner_name",
    "owner_username",
    "author",
    "user",
    "idea_creator",
  ].some((key) => key in record && record[key as keyof OwnableRecord] != null);
}

export function isOwnedByUser(record: OwnableRecord, username?: string | null) {
  const currentUser = username?.trim().toLowerCase();

  if (!currentUser) {
    return false;
  }

  return [
    record.creator,
    record.created_by,
    record.created_by_name,
    record.created_by_username,
    record.owner,
    record.owner_name,
    record.owner_username,
    record.author,
    record.user,
    record.idea_creator,
  ].some((value) => getOwnerValue(value)?.trim().toLowerCase() === currentUser);
}

export function useAuthHydrated() {
  const [hydrated, setHydrated] = useState(
    useAuthStore.persist.hasHydrated()
  );

  useEffect(() => {
    const unsubscribe = useAuthStore.persist.onFinishHydration(() => {
      setHydrated(true);
    });
    const timer = window.setTimeout(() => {
      setHydrated(useAuthStore.persist.hasHydrated());
    }, 0);

    return () => {
      window.clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  return hydrated;
}
