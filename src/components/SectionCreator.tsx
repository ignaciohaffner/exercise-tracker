import type React from "react";
import { useState } from "react";
import { theme } from "../theme";

interface SectionCreatorProps {
  onSectionCreate: (sectionName: string, exercises: number[]) => void;
}

const SectionCreator: React.FC<SectionCreatorProps> = ({ onSectionCreate }) => {
  const [sectionName, setSectionName] = useState("");
  const [exercisesInput, setExercisesInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sectionName && exercisesInput) {
      const exercises = exercisesInput
        .split(",")
        .map((num) => Number.parseInt(num.trim()))
        .filter((num) => !isNaN(num));
      onSectionCreate(sectionName, exercises);
      setSectionName("");
      setExercisesInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="sectionName"
          className="block mb-1"
          style={{ color: theme.colors.text }}
        >
          Nombre de la sección:
        </label>
        <input
          id="sectionName"
          type="text"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          className="w-full p-2 border rounded"
          style={{ borderColor: theme.colors.border }}
          required
        />
      </div>
      <div>
        <label
          htmlFor="exercises"
          className="block mb-1"
          style={{ color: theme.colors.text }}
        >
          Ejercicios (separados por comas):
        </label>
        <input
          id="exercises"
          type="text"
          value={exercisesInput}
          onChange={(e) => setExercisesInput(e.target.value)}
          className="w-full p-2 border rounded"
          style={{ borderColor: theme.colors.border }}
          placeholder="1, 2, 3, 4, 5"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 rounded text-white"
        style={{ backgroundColor: theme.colors.primary }}
      >
        Crear Sección
      </button>
    </form>
  );
};

export default SectionCreator;
