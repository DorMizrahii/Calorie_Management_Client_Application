/* 
Developers:
First name: Tal, Dor, Yamit
Last name: Lilo, Mizrahi, Segev
ID:   206361321 , 315429175 , 206776486 
*/

import React, { createContext, useContext, useState } from 'react';

// Context for theme state management across the app.
const ThemeContext = createContext();

// Hook for accessing theme context (theme state and toggler).
export function useTheme() {
    return useContext(ThemeContext);
}

// Provides theme state and toggle function to child components.
export function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light'); // 'light' is the default theme.

    // Toggles theme between 'light' and 'dark'.
    const toggleTheme = () => setTheme(curr => curr === 'light' ? 'dark' : 'light');

    // Context.Provider passes theme data down the component tree.
    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
