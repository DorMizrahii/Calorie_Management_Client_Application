import React, { useEffect, useState } from "react";
import './App.css';
import MonthlyReport from "./Components/MonthlyReport";
import AddCaloriesForm from "./components/AddCaloriesForm";
import { fetchEntries } from "./hooks/fetchEntries";

function App() {
  const [theme, setTheme] = useState('light');
  const [costItems, setCostItems] = useState([]);
  const [entries, setEntries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Define the icon based on the current theme
  const themeIcon = theme === 'light' ? '🌙' : '☀️';

  useEffect(() => {
    // Fetch entries
    fetchEntries(setEntries, setIsLoading);

          const cardElement = document.getElementById('card');
          if (cardElement) {
              cardElement.setAttribute('data-theme', theme);
          }
      }, [theme]);


    const toggleTheme = () => {
        setTheme(prevTheme => {
            const newTheme = prevTheme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            document.body.setAttribute('data-theme', newTheme);
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
