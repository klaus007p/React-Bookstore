import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const getInitialTheme = () => {
    // Check in localstorage for saved theme 
    if(localStorage.getItem('theme')) {
        return localStorage.getItem('theme');
    }

    const modeDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return modeDark ? 'dark' : 'light';
};


export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(getInitialTheme);

    const toggleTheme = () => {
        setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
    };

    // By applying theme to body and saving in localstorage

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // ADDITIONAL :- Keyboard shortcut to toggle := press " T "

    useEffect(() => {
        const handleKeyDown = (e) => {
            if(e.key.toLowerCase() === 't') toggleTheme();
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    },[]);

    return(
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};