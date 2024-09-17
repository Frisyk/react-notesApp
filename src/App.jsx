import React, { useEffect, useMemo, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import AddNote from './pages/AddNote';
import Home from './pages/Home';
import Archived from './pages/ArchivedNote';
import DetailsNote from './pages/DetailsNote';
import PageNotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';
import { AuthProvider } from './contexts/AuthContext';
import { deleteAccessToken, getAccessToken } from './utils/network-data';
import { ThemeProvider } from './contexts/ThemeContext';
import { LanguangeProvider } from './contexts/LanguageContext';

function App() {
  const navigate = useNavigate();
  const [auth, setAuth] = useState(() => !!getAccessToken());
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'id');

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleAuth = () => {
    if (auth) {
      deleteAccessToken();
      setAuth(false);
      navigate('/login');
    } else {
      setAuth(true);
      navigate('/');
    }
  };

  const changeTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const changeLanguage = () => {
    setLanguage(prevLanguage => (prevLanguage === 'id' ? 'en' : 'id'));
  };

  const authContextValue = useMemo(() => ({ auth, toggleAuth }), [auth]);
  const themeContextValue = useMemo(() => ({ theme, changeTheme }), [theme]);
  const languageContextValue = useMemo(() => ({ language, changeLanguage }), [language]);

  return (
    <AuthProvider value={authContextValue}>
      <ThemeProvider value={themeContextValue}>
        <LanguangeProvider value={languageContextValue}>
          <main className="app-container">
            <Header />
            <Routes>
              {!auth ? (
                <>
                  <Route path="/*" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                </>
              ) : (
                <>
                  <Route path="/" element={<Home />} />
                  <Route path="/note/:id" element={<DetailsNote />} />
                  <Route path="/archived" element={<Archived />} />
                  <Route path="/addnote" element={<AddNote />} />
                  <Route path="*" element={<PageNotFound />} />
                </>
              )}
            </Routes>
          </main>
        </LanguangeProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
