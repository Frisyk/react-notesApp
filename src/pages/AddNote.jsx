import React, { useState } from 'react';
import { BiCheckCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { addNote } from '../utils/network-data';
import { useLanguange } from '../contexts/LanguageContext';
import { form } from '../utils/content';

const NotesAddForm = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const { language } = useLanguange();
  const navigate = useNavigate();

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleBodyChange = (event) => {
    setBody(event.target.innerHTML);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (title && body) {
      addNote({ title, body });
      setTitle('');
      setBody('');
      navigate('/');
    }
  };

  return (
    <form className="note-input" onSubmit={handleSubmit}>
      <h2>{form[language].addTitle}</h2>
      <input
        className="note-input__title"
        type="text"
        placeholder={form[language].titlePlaceholder}
        maxLength={50}
        value={title}
        onChange={handleTitleChange}
      />
      <div
        className="add-new-page__input__body"
        data-placeholder={form[language].bodyPlaceholder}
        contentEditable
        onInput={handleBodyChange}
      />
      <button type="submit" className="submit-btn">
        <BiCheckCircle className="submit-icon" />
        {form[language].save}
      </button>
    </form>
  );
};

export default NotesAddForm;
