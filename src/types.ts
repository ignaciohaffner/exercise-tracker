export interface Exercise {
  number: number;
  state: "sin resolver" | "resuelto" | "no me salió" | "duda";
  selected?: boolean;
}

export interface Section {
  name: string;
  exercises: Exercise[];
}

export interface Topic {
  name: string;
  sections: Section[];
}

export type ThemeMode = "light" | "dark";

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  error: string;
  success: string;
  warning: string;
  border: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
}

export type ThemeProps = Theme;
