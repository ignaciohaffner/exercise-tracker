type ThemeMode = "light" | "dark";

const lightTheme = {
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

const darkTheme = {
  primary: "#9370DB",
  secondary: "#B19CD9",
  accent: "#9F79EE",
  background: "#483D8B",
  surface: "#6A5ACD",
  text: "#E6E6FA",
  error: "#FF6A6A",
  success: "#90EE90",
  warning: "#FFB90F",
  border: "#9F79EE",
};

export const getTheme = (mode: ThemeMode) => {
  return mode === "light" ? lightTheme : darkTheme;
};

export const theme = {
  getColors: (mode: ThemeMode) => getTheme(mode),
};
