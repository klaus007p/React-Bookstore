import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle-button ${isDark ? "dark" : "light"}`}
      title={isDark ? "Switch to Light Mode (Press T)" : "Switch to Dark Mode (Press T)"}
      aria-label="Toggle Theme"
    >
      <div className="theme-toggle-icon">
        {isDark ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
      </div>
      <span className="theme-toggle-label">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}

export default ThemeToggle;
