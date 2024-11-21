import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const WYSIWYGEditor = ({ value, onChange }) => {
  const [editorValue, setEditorValue] = useState(value);

  const handleChange = (content) => {
    setEditorValue(content);
    onChange(content);
  };

  return (
    <ReactQuill value={editorValue} onChange={handleChange} />
  );
};

export default WYSIWYGEditor;
