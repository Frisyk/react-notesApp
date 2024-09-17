import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import { MdArchive, MdDelete, MdUnarchive } from 'react-icons/md';
import parser from 'html-react-parser';
import { showFormattedDate } from '../utils';
import { getNote } from '../utils/network-data';
import Loading from '../components/Loading';
import { useLanguange } from '../contexts/LanguageContext';

export default function DetailsNote() {
  const [note, setNote] = useState(null);
  const { language } = useLanguange();
  const { id } = useParams();

  useEffect(() => {
    const fetchNote = async () => {
      const response = await getNote(id);
      if (!response.error) {
        setNote(response.data);
      }
    };
    fetchNote();
  }, [id]);

  if (!note) {
    return <Loading />;
  }

  return (
    <main className="note-details">
      <h1 className="note-title">{note.title}</h1>
      <h3 className="note-date">
        {showFormattedDate(note.createdAt, language === 'id' ? 'id-ID' : 'en-US')}
      </h3>
      <p className="note-body">{parser(note.body)}</p>
      <div className="note-actions">
        <Button id={note.id} icon={<MdDelete />} type="delete" />
        {!note.archived ? (
          <Button id={note.id} icon={<MdArchive />} type="archive" />
        ) : (
          <Button id={note.id} icon={<MdUnarchive />} type="unarchive" />
        )}
      </div>
    </main>
  );
}
