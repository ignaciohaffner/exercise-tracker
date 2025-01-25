import type React from "react";
import { useState, useEffect } from "react";
import ExerciseTracker from "./components/ExerciseTracker";
import JsonInput from "./components/JsonInput";
import type { Topic, Section, Exercise } from "./types";

const App: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const [showJsonInput, setShowJsonInput] = useState(false);

  useEffect(() => {
    const storedTopics = localStorage.getItem("mathTopics");
    if (storedTopics) {
      const parsedTopics = JSON.parse(storedTopics);
      setTopics(parsedTopics);
      if (parsedTopics.length > 0) {
        setCurrentTopic(parsedTopics[0].name);
      }
    }
  }, []);

  const updateExerciseState = (
    topicName: string,
    sectionName: string,
    exerciseNumber: number,
    newState: Exercise["state"]
  ) => {
    const updatedTopics = topics.map((topic) =>
      topic.name === topicName
        ? {
            ...topic,
            sections: topic.sections.map((section) =>
              section.name === sectionName
                ? {
                    ...section,
                    exercises: section.exercises.map((exercise) =>
                      exercise.number === exerciseNumber
                        ? { ...exercise, state: newState }
                        : exercise
                    ),
                  }
                : section
            ),
          }
        : topic
    );
    setTopics(updatedTopics);
    localStorage.setItem("mathTopics", JSON.stringify(updatedTopics));
  };

  const handleJsonSubmit = (data: Record<string, number[]>) => {
    if (!currentTopic) {
      alert("Por favor, crea un tema primero.");
      return;
    }
    const newSections: Section[] = Object.entries(data).map(
      ([name, numbers]) => ({
        name,
        exercises: numbers.map((num) => ({
          number: num,
          state: "sin resolver" as const,
        })),
      })
    );

    const updatedTopics = topics.map((topic) =>
      topic.name === currentTopic
        ? {
            ...topic,
            sections: [...topic.sections, ...newSections],
          }
        : topic
    );
    setTopics(updatedTopics);
    localStorage.setItem("mathTopics", JSON.stringify(updatedTopics));
    setShowJsonInput(false);
  };

  const handleTopicCreate = () => {
    const topicName = prompt("Ingrese el nombre del nuevo tema:");
    if (topicName) {
      const newTopic: Topic = { name: topicName, sections: [] };
      setTopics([...topics, newTopic]);
      setCurrentTopic(topicName);
      localStorage.setItem("mathTopics", JSON.stringify([...topics, newTopic]));
    }
  };

  const handleTopicChange = (topicName: string) => {
    setCurrentTopic(topicName);
    setShowJsonInput(false);
  };

  const currentTopicData = topics.find((topic) => topic.name === currentTopic);

  return (
    <div className="App max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Tracker de Ejercicios de Matemáticas
      </h1>
      <div className="mb-4">
        <button
          onClick={handleTopicCreate}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 mr-2"
        >
          Crear Nuevo Tema
        </button>
        <select
          value={currentTopic}
          onChange={(e) => handleTopicChange(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Seleccionar Tema</option>
          {topics.map((topic) => (
            <option key={topic.name} value={topic.name}>
              {topic.name}
            </option>
          ))}
        </select>
      </div>
      {currentTopic && (
        <>
          <button
            onClick={() => setShowJsonInput(!showJsonInput)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
          >
            {showJsonInput ? "Ocultar" : "Mostrar"} Formulario de Sección
          </button>
          {showJsonInput && <JsonInput onJsonSubmit={handleJsonSubmit} />}
          {currentTopicData && (
            <ExerciseTracker
              topic={currentTopicData}
              updateExerciseState={updateExerciseState}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
