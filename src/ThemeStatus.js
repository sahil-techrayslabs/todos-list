import React, { useContext } from "react";
import { ThemeContext } from "./App";

const ThemeStatus = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div className={`theme-status-page ${darkMode ? "dark" : ""}`}>
      <h2>Theme Status</h2>
      <p>The current theme is: <strong>{darkMode ? "Dark Mode" : "Light Mode"}</strong></p>
      <a href="/">Go Back to Home</a>
    </div>
  );
};

export default ThemeStatus;
