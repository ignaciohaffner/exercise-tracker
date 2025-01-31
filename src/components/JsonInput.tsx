import React, { useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";

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

  const exampleJson = ` Ejemplo: {
    "Sección 1.1": [14, 15, 24, 25, 28], "Seccion 1.2": [1, 2, 3, 4, 5, 6]
  }`;

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <textarea
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        placeholder="Pega aquí tu JSON de secciones y ejercicios"
        className="w-full h-40 p-2 border rounded"
        data-tooltip-id="json-example-tooltip"
        data-tooltip-content={exampleJson}
      />
      <ReactTooltip
        id="json-example-tooltip"
        place="top"
        type="dark"
        effect="solid"
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
