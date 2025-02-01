import type React from "react";
import type { Theme, UserPreferences } from "../types";

interface UserPreferencesProps {
  theme: Theme;
  preferences: UserPreferences;
  onPreferencesChange: (preferences: UserPreferences) => void;
}

const UserPreferences: React.FC<UserPreferencesProps> = ({
  theme,
  preferences,
  onPreferencesChange,
}) => {
  const handleToggle = (key: keyof UserPreferences) => {
    onPreferencesChange({
      ...preferences,
      [key]: !preferences[key],
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold" style={{ color: theme.colors.text }}>
        Preferencias de Usuario
      </h2>

      <div className="space-y-4">
        <label className="flex items-center justify-between">
          <span style={{ color: theme.colors.text }}>Modo compacto</span>
          <input
            type="checkbox"
            checked={preferences.compactMode}
            onChange={() => handleToggle("compactMode")}
            className="w-4 h-4"
          />
        </label>

        <label className="flex items-center justify-between">
          <span style={{ color: theme.colors.text }}>
            Mostrar conteo de ejercicios
          </span>
          <input
            type="checkbox"
            checked={preferences.showExerciseCounts}
            onChange={() => handleToggle("showExerciseCounts")}
            className="w-4 h-4"
          />
        </label>

        <label className="flex items-center justify-between">
          <span style={{ color: theme.colors.text }}>
            Habilitar atajos de teclado
          </span>
          <input
            type="checkbox"
            checked={preferences.enableKeyboardShortcuts}
            onChange={() => handleToggle("enableKeyboardShortcuts")}
            className="w-4 h-4"
          />
        </label>
      </div>
    </div>
  );
};

export default UserPreferences;
