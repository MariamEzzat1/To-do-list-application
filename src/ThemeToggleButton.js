import useTheme from "./ThemeProvider";
import { ToggleButton } from "react-bootstrap";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <ToggleButton
      id="theme-toggle"
      type="checkbox"
      variant="secondary"
      checked={theme === "dark"}
      value="1"
      onChange={toggleTheme}
      className="rounded-pill"
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </ToggleButton>
  );
}
