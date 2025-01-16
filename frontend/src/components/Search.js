import React, { useState } from 'react';
import axios from 'axios';

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/search?q=${query}`);
      setResults(response.data);
      setError('');
    } catch (err) {
      setError('Failed to fetch search results');
    }
  };

  return (
    <div className="search-container">
      <h2>Search Blog Posts</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for blog posts"
          required
        />
        <button type="submit">Search</button>
      </form>
      <div className="search-results">
        {results.map((result) => (
          <div key={result.id} className="search-result">
            <h3>{result.title}</h3>
            <p>{result.excerpt}</p>
            <a href={`/post/${result.id}`}>Read more</a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Search;
