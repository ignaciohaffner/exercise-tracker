import type React from "react";
import { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import type { Topic, Theme } from "../types";
import { Share2, Trash2 } from "lucide-react";
import Modal from "./Modal";

interface TopicListProps {
  topics: Topic[];
  currentTopic: string;
  theme: Theme;
  onTopicSelect: (topicName: string) => void;
  onTopicsReorder: (reorderedTopics: Topic[]) => void;
  onDeleteTopic: (topicName: string) => void;
  onDeleteSection: (topicName: string, sectionName: string) => void;
}

const TopicList: React.FC<TopicListProps> = ({
  topics,
  currentTopic,
  theme,
  onTopicSelect,
  onTopicsReorder,
  onDeleteTopic,
  onDeleteSection,
}) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState<{
    topic: string;
    section?: string;
  } | null>(null);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(topics);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onTopicsReorder(items);
  };

  const handleShare = (topic: Topic) => {
    const shareData = topic.sections.map((section) => ({
      [section.name]: section.exercises.map((ex) => ex.number),
    }));

    navigator.clipboard
      .writeText(JSON.stringify(shareData, null, 2))
      .then(() => alert("¡Datos copiados al portapapeles!"))
      .catch(() => alert("Error al copiar los datos"));
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="topics">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
              style={{ backgroundColor: theme.colors.background }}
            >
              {topics.map((topic, index) => (
                <Draggable
                  key={topic.name}
                  draggableId={topic.name}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="rounded-lg overflow-hidden shadow-sm"
                      style={{ backgroundColor: theme.colors.surface }}
                    >
                      <div
                        className="p-3 cursor-pointer border-l-4"
                        style={{
                          borderColor:
                            topic.name === currentTopic
                              ? theme.colors.primary
                              : "transparent",
                        }}
                        onClick={() => onTopicSelect(topic.name)}
                      >
                        <div className="flex justify-between items-center">
                          <span style={{ color: theme.colors.text }}>
                            {topic.name}
                          </span>
                          <div className="space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleShare(topic);
                              }}
                              className="p-1 rounded hover:opacity-80"
                              style={{ backgroundColor: theme.colors.accent }}
                            >
                              <Share2 size={16} />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setDeleteConfirmation({ topic: topic.name });
                              }}
                              className="p-1 rounded hover:opacity-80"
                              style={{ backgroundColor: theme.colors.error }}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                      {topic.name === currentTopic && (
                        <div className="px-3 pb-3">
                          {topic.sections.map((section) => (
                            <div
                              key={section.name}
                              className="mt-2 p-2 rounded"
                              style={{
                                backgroundColor: theme.colors.background,
                              }}
                            >
                              <div className="flex justify-between items-center">
                                <span style={{ color: theme.colors.text }}>
                                  {section.name}
                                </span>
                                <button
                                  onClick={() =>
                                    setDeleteConfirmation({
                                      topic: topic.name,
                                      section: section.name,
                                    })
                                  }
                                  className="p-1 rounded hover:opacity-80"
                                  style={{
                                    backgroundColor: theme.colors.error,
                                  }}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Modal
        isOpen={deleteConfirmation !== null}
        onClose={() => setDeleteConfirmation(null)}
        theme={theme}
      >
        <h2
          className="text-xl font-bold mb-4"
          style={{ color: theme.colors.text }}
        >
          Confirmar eliminación
        </h2>
        <p className="mb-4" style={{ color: theme.colors.text }}>
          ¿Estás seguro que deseas borrar{" "}
          {deleteConfirmation?.section
            ? `la sección '${deleteConfirmation.section}' del tema '${deleteConfirmation.topic}'`
            : `el tema '${deleteConfirmation?.topic}'`}
          ?
        </p>
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => setDeleteConfirmation(null)}
            className="px-4 py-2 rounded"
            style={{ backgroundColor: theme.colors.secondary }}
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              if (deleteConfirmation?.section) {
                onDeleteSection(
                  deleteConfirmation.topic,
                  deleteConfirmation.section
                );
              } else if (deleteConfirmation?.topic) {
                onDeleteTopic(deleteConfirmation.topic);
              }
              setDeleteConfirmation(null);
            }}
            className="px-4 py-2 rounded text-white"
            style={{ backgroundColor: theme.colors.error }}
          >
            Eliminar
          </button>
        </div>
      </Modal>
    </>
  );
};

export default TopicList;
