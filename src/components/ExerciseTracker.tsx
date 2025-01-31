import type React from "react";
import type { Topic, Exercise } from "../types";
import { theme } from "../theme";

interface ExerciseTrackerProps {
  topic: Topic;
  updateExerciseState: (
    topicName: string,
    sectionName: string,
    exerciseNumber: number,
    newState: Exercise["state"]
  ) => void;
}

const ExerciseTracker: React.FC<ExerciseTrackerProps> = ({
  topic,
  updateExerciseState,
}) => {
  const stateColors: Record<Exercise["state"], string> = {
    "sin resolver": theme.colors.surface,
    resuelto: theme.colors.success,
    "no me salió": theme.colors.error,
    duda: theme.colors.warning,
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
          className="p-4 rounded-lg"
          style={{ backgroundColor: theme.colors.surface }}
        >
          <h3
            className="text-xl font-semibold mb-4"
            style={{ color: theme.colors.text }}
          >
            {section.name}
          </h3>
          <div className="flex flex-wrap gap-2">
            {section.exercises.map((exercise) => (
              <div
                key={exercise.number}
                onClick={() =>
                  handleClick(section.name, exercise.number, exercise.state)
                }
                className="w-10 h-10 flex items-center justify-center rounded cursor-pointer transition-transform hover:scale-110 shadow-sm"
                style={{
                  backgroundColor: stateColors[exercise.state],
                  color:
                    exercise.state === "sin resolver"
                      ? theme.colors.text
                      : "#FFF",
                  border: `1px solid ${theme.colors.border}`,
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
