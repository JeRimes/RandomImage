import React, { createContext, useState } from 'react';

const DarkModeContext = createContext();

function DarkModeProvider(props) {
    const [darkMode, setDarkMode] = useState(false);
    console.log(darkMode);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };
    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            {props.children}
        </DarkModeContext.Provider>
    )
};

export { DarkModeContext, DarkModeProvider };