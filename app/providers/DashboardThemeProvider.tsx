"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type DashboardTheme = "light" | "dark";

interface DashboardThemeContextValue {
  theme: DashboardTheme;
  toggleTheme: () => void;
  setTheme: (theme: DashboardTheme) => void;
}

const DashboardThemeContext =
  createContext<DashboardThemeContextValue | null>(null);

const storageKey = "dashboard-theme";

function getInitialTheme(): DashboardTheme {
  if (typeof window === "undefined") {
    return "light";
  }

  const storedTheme = window.localStorage.getItem(storageKey);

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyTheme(theme: DashboardTheme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  document.documentElement.dataset.dashboardTheme = theme;
}

export function DashboardThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setThemeState] =
    useState<DashboardTheme>("light");
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      const initialTheme = getInitialTheme();

      applyTheme(initialTheme);
      setThemeState(initialTheme);
      setInitialized(true);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    if (!initialized) {
      return;
    }

    applyTheme(theme);
    window.localStorage.setItem(storageKey, theme);
  }, [initialized, theme]);

  const value = useMemo<DashboardThemeContextValue>(
    () => ({
      theme,
      setTheme: setThemeState,
      toggleTheme: () => {
        setThemeState((currentTheme) =>
          currentTheme === "dark" ? "light" : "dark"
        );
      },
    }),
    [theme]
  );

  return (
    <DashboardThemeContext.Provider value={value}>
      {children}
    </DashboardThemeContext.Provider>
  );
}

export function useDashboardTheme() {
  const context = useContext(DashboardThemeContext);

  if (!context) {
    throw new Error(
      "useDashboardTheme must be used inside DashboardThemeProvider."
    );
  }

  return context;
}
