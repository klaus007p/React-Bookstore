import { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();
export const useTheme = () => useContext(ThemeContext);

const getInitialTheme = () => {
    if (localStorage.getItem('theme')) {
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

    useEffect(() => {
        document.body.setAttribute('data-theme', theme);
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            const tag = e.target.tagName ? e.target.tagName.toLowerCase() : '';
            if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;
            if (e.key.toLowerCase() === 't') {
                toggleTheme();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};