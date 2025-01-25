import type React from "react";
import { useState } from "react";

interface JsonInputProps {
  onJsonSubmit: (data: Record<string, number[]>) => void;
}

const JsonInput: React.FC<JsonInputProps> = ({ onJsonSubmit }) => {
  const [jsonInput, setJsonInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedData = JSON.parse(jsonInput);
      onJsonSubmit(parsedData);
    } catch (error) {
      alert("Error al parsear el JSON. Por favor, verifica el formato.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Pega aquí tu JSON de secciones y ejercicios"
        className="w-full h-40 p-2 border rounded"
      />
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Crear Secciones
      </button>
    </form>
  );
};

export default JsonInput;
