import type { ThemeColors, ThemeMode } from "./types";

const lightTheme: ThemeColors = {
  primary: "#8B7355",
  secondary: "#D2B48C",
  accent: "#DEB887",
  background: "#FFF8DC",
  surface: "#FAEBD7",
  text: "#5C4033",
  error: "#CD5C5C",
  success: "#8FBC8F",
  warning: "#DEB887",
  border: "#D2B48C",
};

const darkTheme: ThemeColors = {
  primary: "#CCCCCC",
  secondary: "#999999",
  accent: "#666666",
  background: "#1A1A1A",
  surface: "#2C2C2C",
  text: "#FFFFFF",
  error: "#FF6666",
  success: "#66FF66",
  warning: "#FFCC66",
  border: "#444444",
};

export const theme = {
  getColors: (mode: ThemeMode): ThemeColors =>
    mode === "light" ? lightTheme : darkTheme,
};
