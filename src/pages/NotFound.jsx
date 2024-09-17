import React from "react";
import { Link } from "react-router-dom";
import { useLanguange } from "../contexts/LanguageContext";
import { home } from "../utils/content";

const PageNotFound = () => {
  const { language } = useLanguange();

  return (
    <div className="error-container">
      <img src="/no-results.png" alt="404 Not Found" />
      <h2 className="error-message">{home[language].notFound}</h2>
      <Link className="error-link" to="/">{home[language].back}</Link>
    </div>
  );
};

export default PageNotFound;
