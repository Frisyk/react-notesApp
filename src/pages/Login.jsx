import React from 'react';
import LoginInput from '../components/LoginInput';
import { Link } from 'react-router-dom';
import { login, putAccessToken } from '../utils/network-data';
import { useAuth } from '../contexts/AuthContext';
import { auth } from '../utils/content';
import { useLanguange } from '../contexts/LanguageContext';
import '../styles/loginregister.css';

function Login() {
  const { toggleAuth } = useAuth();
  const { language } = useLanguange();

  const onLogin = async ({ email, password }) => {
    const { error, data } = await login({ email, password });
        
    if (!error) {
      putAccessToken(data.accessToken);
      toggleAuth();
    }
  };

  return (
    <section className='login-page'>
      <h2>{auth[language].login_prompt}</h2>
      <LoginInput login={onLogin} text={auth[language].login} />
      <p>
        {auth[language].no_account}
        <Link to="/register">{auth[language].signup_here}</Link>
      </p>
    </section>
  );
}

export default Login;
