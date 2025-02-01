import type React from "react";
import type { Theme, ThemeMode } from "../types";

interface SettingsProps {
  theme: Theme;
  setTheme: (mode: ThemeMode) => void;
  exportData: (type: "full" | "structure") => void;
  importData: (data: string) => void;
}

const Settings: React.FC<SettingsProps> = ({
  theme,
  setTheme,
  exportData,
  importData,
}) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result;
        if (typeof content === "string") {
          importData(content);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: theme.colors.text }}>
        Configuración
      </h2>

      <div>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={theme.mode === "dark"}
            onChange={() => setTheme(theme.mode === "light" ? "dark" : "light")}
          />
          <span style={{ color: theme.colors.text }}>Modo oscuro</span>
        </label>
      </div>

      <div className="space-y-2">
        <button
          onClick={() => exportData("full")}
          className="w-full px-4 py-2 rounded text-white"
          style={{ backgroundColor: theme.colors.primary }}
        >
          Exportar backup completo
        </button>
        <button
          onClick={() => exportData("structure")}
          className="w-full px-4 py-2 rounded text-white"
          style={{ backgroundColor: theme.colors.secondary }}
        >
          Exportar estructura
        </button>
      </div>

      <div>
        <label className="block">
          <span style={{ color: theme.colors.text }}>Importar datos:</span>
          <input
            type="file"
            accept=".json"
            onChange={handleFileUpload}
            className="mt-1 block w-full"
          />
        </label>
      </div>
    </div>
  );
};

export default Settings;
