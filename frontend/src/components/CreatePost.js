import React, { useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        '/api/posts',
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setTitle('');
      setContent('');
      setError('');
    } catch (err) {
      setError('Failed to create blog post');
    }
  };

  return (
    <div className="create-post-container">
      <h2>Create a New Blog Post</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handlePostSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Post</button>
      </form>
      <div className="markdown-preview">
        <h3>Markdown Preview</h3>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default CreatePost;
