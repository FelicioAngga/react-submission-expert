import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncAddThread } from '../states/threads/action';
import useInput from '../hooks/useInput';
import '../styles/AddThread.css';

function AddThread() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, onTitleChange] = useInput('');
  const [category, onCategoryChange] = useInput('');
  const [body, setBodyChange] = useState('');

  const onBodyChange = (e) => { setBodyChange(() => e.target.textContent); };

  const onAddThread = (e) => {
    e.preventDefault();
    dispatch(asyncAddThread({ title, body, category }));
    navigate('/');
  };

  return (
    <form onSubmit={(e) => onAddThread(e)}>
      <h2>Add New Thread </h2>
      <input type="text" className="add-thread-title" placeholder="title" value={title} onChange={onTitleChange} />
      <input type="text" className="add-thread-category" placeholder="Kategori" value={category} onChange={onCategoryChange} />
      <div className="input-body" contentEditable="true" onInput={(e) => onBodyChange(e)} />
      <button type="submit" className="btn-add-thread">Add</button>
    </form>
  );
}

export default AddThread;
