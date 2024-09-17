import React, { useState, useEffect } from 'react';
import NotesList from '../components/NotesList';
import { Link, useSearchParams } from 'react-router-dom';
import Search from '../components/Search';
import { GrAdd } from 'react-icons/gr';
import Empty from '../components/Empty';
import PropTypes from 'prop-types';
import { getActiveNotes } from '../utils/network-data';
import Loading from '../components/Loading';
import { home } from '../utils/content';
import { useLanguange } from '../contexts/LanguageContext';

export default function HomePageWrapper() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword') || '';

  const changeSearchParams = (keyword) => setSearchParams({ keyword });

  return <Home defaultKeyword={keyword} keywordChange={changeSearchParams} />;
}

function Home({ defaultKeyword, keywordChange }) {
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const {language} = useLanguange()

  useEffect(() => {
    const fetchNotes = async () => {
      const { data, error } = await getActiveNotes();
      if (!error) {
        setNotes(data);
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, []);

  useEffect(() => {
    keywordChange(keyword);
  }, [keyword]);

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <main className="notes-container">
      <div className="notes-header">
        <h1>{home[language].title}</h1>
        <Search placeholder={home[language].placeholder} onSearchChange={(e) => setKeyword(e.target.value)} searchValue={keyword} />
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
      <Link to="/addnote" className="action-btn add">
        <GrAdd className="add-icon" />
      </Link>
    </main>
  );
}

Home.propTypes = {
  defaultKeyword: PropTypes.string,
  keywordChange: PropTypes.func.isRequired,
};
