import type React from "react";
import type { Exercise, Theme } from "../types";

interface ExerciseStatsProps {
  exercises: Exercise[];
  theme: Theme;
}

const ExerciseStats: React.FC<ExerciseStatsProps> = ({ exercises, theme }) => {
  const total = exercises.length;
  const completed = exercises.filter((ex) => ex.state === "resuelto").length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

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
