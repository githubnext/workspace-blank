import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Layout from '../../components/Layout';
import WYSIWYGEditor from '../../components/WYSIWYGEditor';

const Pages = () => {
  const [pages, setPages] = useState([]);
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [editingPage, setEditingPage] = useState(null);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    const response = await axios.get('/api/pages');
    setPages(response.data);
  };

  const handleCreatePage = async () => {
    const response = await axios.post('/api/pages', { title, slug, content });
    setPages([...pages, response.data]);
    setTitle('');
    setSlug('');
    setContent('');
  };

  const handleUpdatePage = async () => {
    const response = await axios.put(`/api/pages/${editingPage.id}`, { title, slug, content });
    setPages(pages.map(page => (page.id === editingPage.id ? response.data : page)));
    setEditingPage(null);
    setTitle('');
    setSlug('');
    setContent('');
  };

  const handleDeletePage = async (id) => {
    await axios.delete(`/api/pages/${id}`);
    setPages(pages.filter(page => page.id !== id));
  };

  const startEditing = (page) => {
    setEditingPage(page);
    setTitle(page.title);
    setSlug(page.slug);
    setContent(page.content);
  };

  return (
    <Layout>
      <h1>Manage Pages</h1>
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
        {editingPage ? (
          <button onClick={handleUpdatePage}>Update Page</button>
        ) : (
          <button onClick={handleCreatePage}>Create Page</button>
        )}
      </div>
      <ul>
        {pages.map((page) => (
          <li key={page.id}>
            <h2>{page.title}</h2>
            <p>{page.slug}</p>
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
            <button onClick={() => startEditing(page)}>Edit</button>
            <button onClick={() => handleDeletePage(page.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </Layout>
  );
};

export default Pages;
