import React, { useEffect, useState } from 'react';
import { BiArchive, BiHome } from 'react-icons/bi';
import { MdDarkMode, MdLightMode, MdTranslate } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getUserLogged } from '../utils/network-data';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguange } from '../contexts/LanguageContext';
import { header } from '../utils/content';
import '../styles/header.css';

export default function Header() {
  const { auth, toggleAuth } = useAuth();
  const { theme, changeTheme } = useTheme();  
  const { language, changeLanguage } = useLanguange();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await getUserLogged();
      if (!response.error) setUser(response.data);
    };
    fetchUser();
  }, []);

  return (
    <nav className="note-nav">
      <div className="nav-brand">
        <Link to="/" className="nav-logo">
          <h1>BANG.</h1>
        </Link>
      </div>

      {auth && (
        <div className="nav-links">
          <Link to="/" className="nav-link">
            <BiHome className="icon" />
            {header[language].home}
          </Link>
          <Link to="/archived" className="nav-link">
            <BiArchive className="icon" />
            {header[language].archive}
          </Link>
        </div>
      )}

      <div className="user-preferences">
        {auth && (
          <div className="user">
            <h1 className="user-name">Hi, {user ? user.name : 'User'}!</h1>
            <button onClick={toggleAuth} className="nav-btn logout-btn">
              <FiLogOut className="icon" />
            </button>
          </div>
        )}

        <button onClick={changeLanguage} className="nav-btn">
          <MdTranslate className="icon" />
        </button>
        <button onClick={changeTheme} className="nav-btn">
          {theme === 'light' ? <MdLightMode className="icon" /> : <MdDarkMode className="icon" />}
        </button>
      </div>
    </nav>
  );
}
