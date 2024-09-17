import React from 'react';
import NoteBody from './NoteBody';
import PropTypes from 'prop-types';

const NotesList = ({ notes }) => (
  <div className="notes-list">
    {notes.map((note) => (
      <NoteBody
        key={note.id}
        id={note.id}
        body={note.body}
        createdAt={note.createdAt}
        title={note.title}
      />
    ))}
  </div>
);

NotesList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      createdAt: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default NotesList;
