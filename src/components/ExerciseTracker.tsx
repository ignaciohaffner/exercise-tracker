import type React from "react";
import { type Topic, type Exercise } from "../types";

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
    "sin resolver": "bg-white",
    resuelto: "bg-green-500",
    "no me salió": "bg-red-500",
    duda: "bg-yellow-500",
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
    <div>
      <h2 className="text-2xl font-bold mb-4">{topic.name}</h2>
      {topic.sections.map((section) => (
        <div key={section.name} className="mb-6">
          <h3 className="text-xl font-semibold mb-2">{section.name}</h3>
          <div className="flex flex-wrap">
            {section.exercises.map((exercise) => (
              <div
                key={exercise.number}
                onClick={() =>
                  handleClick(section.name, exercise.number, exercise.state)
                }
                className={`
                  w-10 h-10 m-1 flex justify-center items-center cursor-pointer
                  ${stateColors[exercise.state]}
                  border border-gray-300 rounded-md transition-all duration-200 ease-in-out hover:scale-110
                `}
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
