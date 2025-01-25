import type React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import type { Topic } from "../types";

interface TopicListProps {
  topics: Topic[];
  currentTopic: string;
  onTopicSelect: (topicName: string) => void;
  onTopicsReorder: (reorderedTopics: Topic[]) => void;
  onDeleteTopic: (topicName: string) => void;
}

const TopicList: React.FC<TopicListProps> = ({
  topics,
  currentTopic,
  onTopicSelect,
  onTopicsReorder,
  onDeleteTopic,
}) => {
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(topics);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onTopicsReorder(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="topics">
        {(provided) => (
          <ul
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-2"
          >
            {topics.map((topic, index) => (
              <Draggable
                key={topic.name}
                draggableId={topic.name}
                index={index}
              >
                {(provided) => (
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-3 border rounded cursor-pointer ${
                      topic.name === currentTopic ? "bg-blue-100" : "bg-white"
                    }`}
                    onClick={() => onTopicSelect(topic.name)}
                  >
                    <div className="flex justify-between items-center">
                      <span>{topic.name}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteTopic(topic.name);
                        }}
                        className="px-2 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                    </div>
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TopicList;
