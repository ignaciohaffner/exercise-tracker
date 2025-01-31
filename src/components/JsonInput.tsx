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

      let formattedData: Record<string, number[]> = {};

      if (Array.isArray(parsedData)) {
        parsedData.forEach((sectionObj) => {
          const sectionName = Object.keys(sectionObj)[0];
          formattedData[sectionName] = sectionObj[sectionName];
        });
      } else if (parsedData.sections) {
        formattedData = parsedData.sections;
      } else {
        formattedData = parsedData;
      }

      Object.entries(formattedData).forEach(([key, value]) => {
        if (
          !Array.isArray(value) ||
          !value.every((num) => typeof num === "number")
        ) {
          throw new Error(
            `La sección "${key}" debe contener un array de números`
          );
        }
      });

      onJsonSubmit(formattedData);
      setJsonInput("");
    } catch (error) {
      alert(`Error al parsear el JSON`);
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
