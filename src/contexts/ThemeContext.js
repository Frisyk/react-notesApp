import React, { useContext } from 'react';
 
const ThemeContext = React.createContext();
export const useTheme = () => useContext(ThemeContext);
export const ThemeProvider = ThemeContext.Provider;
 
export default ThemeContext;