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
}