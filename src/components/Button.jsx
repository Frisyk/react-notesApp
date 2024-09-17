import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { archiveNote, deleteNote, unarchiveNote } from '../utils/network-data';

function Button({ id, icon, type }) {
  const navigate = useNavigate(); 

  const handleClick = () => {
    if(type == 'delete') {
      deleteNote(id)
      navigate('/'); 
    }
    if(type == 'archive') {
      archiveNote(id)
      navigate('/archived'); 
    }
    if(type == 'unarchive') {
      unarchiveNote(id)
      navigate('/'); 
    }
  };
  return (
    <button className={`action-btn ${type}`} onClick={handleClick}>
      {icon}
    </button>
  )
}

Button.propTypes = {
  id: PropTypes.string,
  icon: PropTypes.element.isRequired,
  type: PropTypes.string.isRequired,
}

export default Button;