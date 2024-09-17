import React, { useState, useEffect } from 'react';
import NotesList from '../components/NotesList';
import Search from '../components/Search';
import Empty from '../components/Empty';
import { useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getArchivedNotes } from '../utils/network-data';
import Loading from '../components/Loading';
import { home } from '../utils/content';
import { useLanguange } from '../contexts/LanguageContext';

export default function ArchivedPageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const updateSearchParams = (keyword) => setSearchParams({ keyword });

  return (
    <Archived
      defaultKeyword={keyword}
      keywordChange={updateSearchParams}
    />
  );
}

function Archived({ defaultKeyword, keywordChange }) {
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { language } = useLanguange();

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await getArchivedNotes();
      if (!error) {
        setNotes(data);
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  useEffect(() => {
    keywordChange(keyword);
  }, [keyword]);

  return (
    <main className="notes-container">
      <div className="notes-header">
        <h1 className="title">{home[language].archiveTitle}</h1>
        <Search
          placeholder={home[language].placeholder}
          onSearchChange={(e) => setKeyword(e.target.value)}
          searchValue={keyword}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          {filteredNotes.length ? (
            <NotesList notes={filteredNotes} />
          ) : (
            <Empty />
          )}
        </>
      )}
    </main>
  );
}

Archived.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};
