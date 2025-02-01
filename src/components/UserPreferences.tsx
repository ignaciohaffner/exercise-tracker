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

  const handleCustomStatesToggle = () => {
    onPreferencesChange({
      ...preferences,
      customStates: {
        ...preferences.customStates,
        enabled: !preferences.customStates.enabled,
      },
    });
  };

  return (
    <div className="space-y-6">
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

        <div className="space-y-2">
          <label className="flex items-center justify-between">
            <span style={{ color: theme.colors.text }}>
              Estados personalizados
            </span>
            <input
              type="checkbox"
              checked={preferences.customStates.enabled}
              onChange={handleCustomStatesToggle}
              className="w-4 h-4"
            />
          </label>

          {preferences.customStates.enabled && (
            <div className="pl-4 space-y-2">
              {preferences.customStates.states.map((state, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={state.name}
                    onChange={(e) => {
                      const newStates = [...preferences.customStates.states];
                      newStates[index] = { ...state, name: e.target.value };
                      onPreferencesChange({
                        ...preferences,
                        customStates: {
                          ...preferences.customStates,
                          states: newStates,
                        },
                      });
                    }}
                    className="px-2 py-1 rounded"
                    style={{
                      backgroundColor: theme.colors.surface,
                      color: theme.colors.text,
                      border: `1px solid ${theme.colors.border}`,
                    }}
                  />
                  <input
                    type="color"
                    value={state.color}
                    onChange={(e) => {
                      const newStates = [...preferences.customStates.states];
                      newStates[index] = { ...state, color: e.target.value };
                      onPreferencesChange({
                        ...preferences,
                        customStates: {
                          ...preferences.customStates,
                          states: newStates,
                        },
                      });
                    }}
                  />
                </div>
              ))}
              <button
                onClick={() => {
                  onPreferencesChange({
                    ...preferences,
                    customStates: {
                      ...preferences.customStates,
                      states: [
                        ...preferences.customStates.states,
                        { name: "Nuevo estado", color: "#808080" },
                      ],
                    },
                  });
                }}
                className="px-4 py-2 rounded text-sm"
                style={{
                  backgroundColor: theme.colors.primary,
                  color: theme.colors.buttonText,
                }}
              >
                Agregar estado
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPreferences;
