import React from 'react';
import { useLanguange } from '../contexts/LanguageContext';
import { home } from '../utils/content';

export default function Empty() {
  const { language } = useLanguange();

  return (
    <div className="empty-container">
      <img src="/empty-box.png" alt="Catatan kosong" className="empty-image" />
      <h1 className="empty-message">{home[language].empty}</h1>
    </div>
  );
}
