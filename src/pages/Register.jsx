import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../utils/network-data';
import RegisterInput from '../components/RegisterInput';
import { useAuth } from '../contexts/AuthContext';
import { useLanguange } from '../contexts/LanguageContext';
import { auth } from '../utils/content';
import '../styles/loginregister.css';

function RegisterPage() {
  const { toggleAuth } = useAuth();
  const { language } = useLanguange();
  const navigate = useNavigate();

  const onRegisterHandler = async (user) => {
    const { error } = await register(user);
    
    if (!error) {
      toggleAuth();
      navigate('/');
    }
  };

  return (
    <section className='register-page'>
      <h2>{auth[language].register_prompt}</h2>
      <RegisterInput register={onRegisterHandler} />
      <p>
        <Link to="/">{auth[language].back_to_login}</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
