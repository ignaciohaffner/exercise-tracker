import type React from "react";
import { useState } from "react";

interface SectionCreatorProps {
  onSectionCreate: (sectionName: string) => void;
}

const SectionCreator: React.FC<SectionCreatorProps> = ({ onSectionCreate }) => {
  const [sectionName, setSectionName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sectionName.trim()) {
      onSectionCreate(sectionName.trim());
      setSectionName("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={sectionName}
        onChange={(e) => setSectionName(e.target.value)}
        placeholder="Nombre de la nueva sección"
        className="p-2 border rounded mr-2"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Crear Sección
      </button>
    </form>
  );
};

export default SectionCreator;
