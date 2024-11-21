import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Layout from '../../components/Layout';
import WYSIWYGEditor from '../../components/WYSIWYGEditor';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await axios.get('/api/posts');
    setPosts(response.data);
  };

  const handleCreatePost = async () => {
    const response = await axios.post('/api/posts', { title, slug, content });
    setPosts([...posts, response.data]);
    setTitle('');
    setSlug('');
    setContent('');
  };

  const handleUpdatePost = async () => {
    const response = await axios.put(`/api/posts/${editingPost.id}`, { title, slug, content });
    setPosts(posts.map(post => (post.id === editingPost.id ? response.data : post)));
    setEditingPost(null);
    setTitle('');
    setSlug('');
    setContent('');
  };

  const handleDeletePost = async (id) => {
    await axios.delete(`/api/posts/${id}`);
    setPosts(posts.filter(post => post.id !== id));
  };

  const startEditing = (post) => {
    setEditingPost(post);
    setTitle(post.title);
    setSlug(post.slug);
    setContent(post.content);
  };

  return (
    <Layout>
      <h1>Manage Posts</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
        />
        <WYSIWYGEditor value={content} onChange={setContent} />
        {editingPost ? (
          <button onClick={handleUpdatePost}>Update Post</button>
        ) : (
          <button onClick={handleCreatePost}>Create Post</button>
        )}
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.slug}</p>
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            <button onClick={() => startEditing(post)}>Edit</button>
            <button onClick={() => handleDeletePost(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Posts;
