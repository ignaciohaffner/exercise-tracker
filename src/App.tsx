import type React from "react";
import { useState, useEffect } from "react";
import ExerciseTracker from "./components/ExerciseTracker";
import JsonInput from "./components/JsonInput";
import TopicList from "./components/TopicList";
import Modal from "./components/Modal";
import SectionCreator from "./components/SectionCreator";
import type { Topic, Section, Exercise } from "./types";
import { theme } from "./theme";

const App: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const [showJsonInput, setShowJsonInput] = useState(false);
  const [showNewTopicModal, setShowNewTopicModal] = useState(false);
  const [newTopicName, setNewTopicName] = useState("");
  const [showSectionCreator, setShowSectionCreator] = useState(false);

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
    if (newTopicName) {
      const newTopic: Topic = { name: newTopicName, sections: [] };
      setTopics([...topics, newTopic]);
      setCurrentTopic(newTopicName);
      localStorage.setItem("mathTopics", JSON.stringify([...topics, newTopic]));
      setNewTopicName("");
      setShowNewTopicModal(false);
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

  const handleSectionCreate = (sectionName: string, exercises: number[]) => {
    if (!currentTopic) {
      alert("Por favor, selecciona un tema primero.");
      return;
    }
    const newSection: Section = {
      name: sectionName,
      exercises: exercises.map((num) => ({
        number: num,
        state: "sin resolver" as const,
      })),
    };
    const updatedTopics = topics.map((topic) =>
      topic.name === currentTopic
        ? { ...topic, sections: [...topic.sections, newSection] }
        : topic
    );
    setTopics(updatedTopics);
    localStorage.setItem("mathTopics", JSON.stringify(updatedTopics));
    setShowSectionCreator(false);
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
              onClick={() => setShowNewTopicModal(true)}
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
                <div className="flex space-x-2 mb-4">
                  <button
                    onClick={() => setShowSectionCreator(true)}
                    className="px-4 py-2 rounded text-white"
                    style={{ backgroundColor: theme.colors.primary }}
                  >
                    Crear Nueva Sección
                  </button>
                  <button
                    onClick={() => setShowJsonInput(!showJsonInput)}
                    className="px-4 py-2 rounded text-white"
                    style={{ backgroundColor: theme.colors.accent }}
                  >
                    {showJsonInput ? "Ocultar" : "Mostrar"} Importar JSON
                  </button>
                </div>
                {showJsonInput && <JsonInput onJsonSubmit={handleJsonSubmit} />}
                {showSectionCreator && (
                  <Modal
                    isOpen={showSectionCreator}
                    onClose={() => setShowSectionCreator(false)}
                  >
                    <SectionCreator onSectionCreate={handleSectionCreate} />
                  </Modal>
                )}
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
      <Modal
        isOpen={showNewTopicModal}
        onClose={() => setShowNewTopicModal(false)}
      >
        <h2
          className="text-xl font-bold mb-4"
          style={{ color: theme.colors.text }}
        >
          Crear Nuevo Tema
        </h2>
        <input
          type="text"
          value={newTopicName}
          onChange={(e) => setNewTopicName(e.target.value)}
          className="w-full p-2 mb-4 border rounded"
          style={{ borderColor: theme.colors.border }}
          placeholder="Nombre del nuevo tema"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setShowNewTopicModal(false)}
            className="px-4 py-2 rounded"
            style={{ backgroundColor: theme.colors.secondary }}
          >
            Cancelar
          </button>
          <button
            onClick={handleTopicCreate}
            className="px-4 py-2 rounded text-white"
            style={{ backgroundColor: theme.colors.primary }}
          >
            Crear
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default App;
