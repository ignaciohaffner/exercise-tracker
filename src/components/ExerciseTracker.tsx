import type React from "react";
import type { Topic, Exercise, Theme, UserPreferences } from "../types";
import ExerciseStats from "./ExerciseStats";

interface ExerciseTrackerProps {
  topic: Topic;
  updateExerciseState: (
    topicName: string,
    sectionName: string,
    exerciseNumber: number,
    newState: Exercise["state"]
  ) => void;
  theme: Theme;
  userPreferences: UserPreferences;
}

const ExerciseTracker: React.FC<ExerciseTrackerProps> = ({
  topic,
  updateExerciseState,
  theme,
  userPreferences,
}) => {
  const { colors } = theme;

  // Use default values if userPreferences is undefined
  const compactMode = userPreferences?.compactMode ?? false;
  const showExerciseCounts = userPreferences?.showExerciseCounts ?? true;

  const stateColors: Record<Exercise["state"], string> = {
    "sin resolver": colors.surface,
    resuelto: colors.success,
    "no me salió": colors.error,
    duda: colors.warning,
  };

  const handleClick = (
    sectionName: string,
    exerciseNumber: number,
    currentState: Exercise["state"]
  ) => {
    const states: Exercise["state"][] = [
      "sin resolver",
      "resuelto",
      "no me salió",
      "duda",
    ];
    const nextStateIndex = (states.indexOf(currentState) + 1) % states.length;
    const nextState = states[nextStateIndex];
    updateExerciseState(topic.name, sectionName, exerciseNumber, nextState);
  };

  return (
    <div className="space-y-6">
      {topic.sections.map((section) => (
        <div
          key={section.name}
          className={`rounded-lg ${compactMode ? "p-2" : "p-4"}`}
          style={{ backgroundColor: colors.surface }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3
              className="text-xl font-semibold"
              style={{ color: colors.text }}
            >
              {section.name}
            </h3>
            {showExerciseCounts && (
              <ExerciseStats
                exercises={section.exercises}
                theme={theme}
                variant="compact"
              />
            )}
          </div>
          <div className={`flex flex-wrap ${compactMode ? "gap-1" : "gap-2"}`}>
            {section.exercises.map((exercise) => (
              <div
                key={exercise.number}
                onClick={() =>
                  handleClick(section.name, exercise.number, exercise.state)
                }
                className={`flex items-center justify-center rounded cursor-pointer transition-transform hover:scale-110 shadow-sm ${
                  compactMode ? "w-8 h-8 text-sm" : "w-10 h-10"
                }`}
                style={{
                  backgroundColor: stateColors[exercise.state],
                  color:
                    exercise.state === "sin resolver"
                      ? colors.text
                      : colors.buttonText,
                  border: `1px solid ${colors.border}`,
                }}
              >
                {exercise.number}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExerciseTracker;
