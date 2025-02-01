import type { ThemeColors, ThemeMode } from "./types";

const lightTheme: ThemeColors = {
  primary: "#8B7355",
  secondary: "#D2B48C",
  accent: "#DEB887",
  background: "#FFF8DC",
  surface: "#FAEBD7",
  text: "#5C4033",
  textSecondary: "#8B7355",
  error: "#CD5C5C",
  success: "#8FBC8F",
  warning: "#DEB887",
  border: "#D2B48C",
  buttonText: "#FFFFFF",
};

const darkTheme: ThemeColors = {
  primary: "#3b82f6",
  secondary: "#9ca3af",
  accent: "#a78bfa",
  background: "#111827",
  surface: "#1f2937",
  text: "#f9fafb",
  textSecondary: "#d1d5db",
  error: "#f87171",
  success: "#4ade80",
  warning: "#fbbf24",
  border: "#374151",
  buttonText: "#ffffff",
};

export const theme = {
  getColors: (mode: ThemeMode): ThemeColors =>
    mode === "light" ? lightTheme : darkTheme,
};
