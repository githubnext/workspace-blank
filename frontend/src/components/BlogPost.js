import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

function BlogPost({ match }) {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`/api/posts/${match.params.id}`);
        setPost(response.data);
      } catch (err) {
        setError('Failed to fetch blog post');
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get(`/api/posts/${match.params.id}/comments`);
        setComments(response.data);
      } catch (err) {
        setError('Failed to fetch comments');
      }
    };

    fetchPost();
    fetchComments();
  }, [match.params.id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `/api/posts/${match.params.id}/comments`,
        { content: newComment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setNewComment('');
      fetchComments();
    } catch (err) {
      setError('Failed to add comment');
    }
  };

  return (
    <div className="blog-post-container">
      {error && <p className="error">{error}</p>}
      {post && (
        <div>
          <h2>{post.title}</h2>
          <ReactMarkdown>{post.content}</ReactMarkdown>
          <div className="comments-section">
            <h3>Comments</h3>
            {comments.map((comment) => (
              <div key={comment.id} className="comment">
                <p>{comment.content}</p>
                <small>By {comment.username} on {new Date(comment.createdAt).toLocaleString()}</small>
              </div>
            ))}
            <form onSubmit={handleCommentSubmit}>
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment"
                required
              />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogPost;
