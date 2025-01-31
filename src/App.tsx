import type React from "react";
import { useState, useEffect } from "react";
import ExerciseTracker from "./components/ExerciseTracker";
import JsonInput from "./components/JsonInput";
import TopicList from "./components/TopicList";
import type { Topic, Section, Exercise } from "./types";
import { theme } from "./theme";

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

  const handleDeleteTopic = (topicName: string) => {
    const updatedTopics = topics.filter((topic) => topic.name !== topicName);
    setTopics(updatedTopics);
    localStorage.setItem("mathTopics", JSON.stringify(updatedTopics));
    setCurrentTopic(updatedTopics.length > 0 ? updatedTopics[0].name : "");
  };

  const handleDeleteSection = (topicName: string, sectionName: string) => {
    const updatedTopics = topics.map((topic) =>
      topic.name === topicName
        ? {
            ...topic,
            sections: topic.sections.filter(
              (section) => section.name !== sectionName
            ),
          }
        : topic
    );
    setTopics(updatedTopics);
    localStorage.setItem("mathTopics", JSON.stringify(updatedTopics));
  };

  const handleTopicsReorder = (reorderedTopics: Topic[]) => {
    setTopics(reorderedTopics);
    localStorage.setItem("mathTopics", JSON.stringify(reorderedTopics));
  };

  const currentTopicData = topics.find((topic) => topic.name === currentTopic);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: theme.colors.background }}
    >
      <div className="max-w-6xl mx-auto p-4">
        <h1
          className="text-3xl font-bold mb-6"
          style={{ color: theme.colors.text }}
        >
          Tracker de Ejercicios de Matemáticas
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <button
              onClick={handleTopicCreate}
              className="w-full px-4 py-2 rounded mb-4 text-white"
              style={{ backgroundColor: theme.colors.primary }}
            >
              Crear Nuevo Tema
            </button>
            <TopicList
              topics={topics}
              currentTopic={currentTopic}
              onTopicSelect={setCurrentTopic}
              onTopicsReorder={handleTopicsReorder}
              onDeleteTopic={handleDeleteTopic}
              onDeleteSection={handleDeleteSection}
            />
          </div>
          <div className="md:col-span-2">
            {currentTopic && (
              <>
                <button
                  onClick={() => setShowJsonInput(!showJsonInput)}
                  className="px-4 py-2 rounded mb-4 text-white"
                  style={{ backgroundColor: theme.colors.accent }}
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
        </div>
      </div>
    </div>
  );
};

export default App;
