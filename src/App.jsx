/* 
Developers:
First name: Tal, Dor, Yamit
Last name: Lilo, Mizrahi, Segev
ID:   206361321 , 315429175 , 206776486 
*/

import React, { useEffect, useState } from "react";
import "./styles/app.css";
import MonthlyReport from "./Components/MonthlyReport";
import AddCaloriesForm from "./Components/AddCaloriesForm";
import { fetchEntries } from "./hooks/fetchEntries";

function App() {
  const [theme, setTheme] = useState('light'); // Initialize theme.
  const [entries, setEntries] = useState([]); // State for storing entries.
  const [isLoading, setIsLoading] = useState(true); // Loading state.

  const themeIcon = theme === 'light' ? '🌙' : '☀️'; // Theme toggle icon.

  useEffect(() => {
    fetchEntries(setEntries, setIsLoading); // Fetch entries on mount.

    // Update card element's theme.
    const cardElement = document.getElementById('card');
    if (cardElement) cardElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme); // Save theme preference.
      document.body.setAttribute('data-theme', newTheme); // Apply theme globally.
      return newTheme;
    });
  };

  return (
    <div>
      <button onClick={toggleTheme} className="theme-toggle-button">
        {themeIcon}
      </button>
      <div id="card" className={`app ${theme}`}>
        <h1 className="card__title">Calorie Management App</h1>
        <AddCaloriesForm setEntries={setEntries}/>
        <MonthlyReport entries={entries} isLoading={isLoading}/>
      </div>
    </div>
  );
}

export default App;
