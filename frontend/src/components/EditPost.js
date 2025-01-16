import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function EditPost({ match }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${match.params.id}`);
        setTitle(response.data.title);
        setContent(response.data.content);
      } catch (err) {
        setError('Failed to fetch blog post');
      }
    };

    fetchPost();
  }, [match.params.id]);

  const handlePostUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `/api/posts/${match.params.id}`,
        { title, content },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setError('');
    } catch (err) {
      setError('Failed to update blog post');
    }
  };

  return (
    <div className="edit-post-container">
      <h2>Edit Blog Post</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handlePostUpdate}>
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
        <button type="submit">Update Post</button>
      </form>
      <div className="markdown-preview">
        <h3>Markdown Preview</h3>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default EditPost;
