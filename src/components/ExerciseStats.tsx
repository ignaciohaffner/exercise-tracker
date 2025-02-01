import type React from "react";
import type { Exercise, Theme } from "../types";

interface ExerciseStatsProps {
  exercises: Exercise[];
  theme: Theme;
  variant?: "full" | "compact";
}

const ExerciseStats: React.FC<ExerciseStatsProps> = ({
  exercises,
  theme,
  variant = "full",
}) => {
  const total = exercises.length;
  const completed = exercises.filter((ex) => ex.state === "resuelto").length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  if (variant === "compact") {
    return (
      <span className="text-sm" style={{ color: theme.colors.textSecondary }}>
        {completed}/{total} ejercicios completados
      </span>
    );
  }

  return (
    <div
      className="flex items-center gap-2 text-sm"
      style={{ color: theme.colors.textSecondary }}
    >
      <span className="font-medium">
        {completed}/{total} ejercicios completados
      </span>
      <div className="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-700">
        <div
          className="h-2 rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: theme.colors.success,
          }}
        />
      </div>
      <span className="font-medium">{percentage}%</span>
    </div>
  );
};

export default ExerciseStats;
