import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import parser from 'html-react-parser';
import PropTypes from 'prop-types';
import { showFormattedDate } from '../utils';
import LanguangeContext from '../contexts/LanguageContext';

const NoteBody = ({ title, createdAt, body, id }) => {
  const { language } = useContext(LanguangeContext);

  const formattedDate = language === 'id'
    ? showFormattedDate(createdAt, 'id-ID')
    : showFormattedDate(createdAt, 'en-US');

  return (
    <div className="note-item__content" id={id}>
      <h3 className="note-item__title">
        <Link to={`/note/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__date">{formattedDate}</p>
      <p className="note-item__body">{parser(body)}</p>
    </div>
  );
};

NoteBody.propTypes = {
  title: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default NoteBody;
