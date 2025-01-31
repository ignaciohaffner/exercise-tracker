import type React from "react";
import { useState, useEffect } from "react";
import ExerciseTracker from "./components/ExerciseTracker";
import JsonInput from "./components/JsonInput";
import TopicList from "./components/TopicList";
import type { Topic, Section, Exercise } from "./types";

const App: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const [showJsonInput, setShowJsonInput] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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
    setShowDeleteConfirm(false);
  };

  const handleDeleteTopic = (topicName: string) => {
    setShowDeleteConfirm(true);
    setCurrentTopic(topicName);
  };

  const confirmDeleteTopic = () => {
    const updatedTopics = topics.filter((topic) => topic.name !== currentTopic);
    setTopics(updatedTopics);
    localStorage.setItem("mathTopics", JSON.stringify(updatedTopics));
    setCurrentTopic(updatedTopics.length > 0 ? updatedTopics[0].name : "");
    setShowDeleteConfirm(false);
  };

  const handleTopicsReorder = (reorderedTopics: Topic[]) => {
    setTopics(reorderedTopics);
    localStorage.setItem("mathTopics", JSON.stringify(reorderedTopics));
  };

  const currentTopicData = topics.find((topic) => topic.name === currentTopic);

  return (
    <div className="App max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        Tracker de Ejercicios de Matemáticas
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1">
          <button
            onClick={handleTopicCreate}
            className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 mb-4"
          >
            Crear Nuevo Tema
          </button>
          <TopicList
            topics={topics}
            currentTopic={currentTopic}
            onTopicSelect={handleTopicChange}
            onTopicsReorder={handleTopicsReorder}
            onDeleteTopic={handleDeleteTopic}
          />
        </div>
        <div className="md:col-span-2">
          {showDeleteConfirm && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 rounded">
              <p className="mb-2">
                ¿Estás seguro de que quieres eliminar este tema?
              </p>
              <button
                onClick={confirmDeleteTopic}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
              >
                Confirmar Eliminación
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          )}
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
      </div>
    </div>
  );
};

export default App;
