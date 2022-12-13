import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';
import Navigation from './components/Navigation';
import Login from './pages/Login';
import Register from './pages/Register';
import Leaderboards from './pages/Leaderboards';
import Loading from './components/Loading';
import { asyncPreloadProcess } from './states/isPreload/action';
import AddThread from './pages/AddThread';
import ThreadDetail from './pages/ThreadDetail';

function App() {
  const dispatch = useDispatch();
  const { isPreload = false } = useSelector((states) => states);

  useEffect(() => {
    dispatch(asyncPreloadProcess());
  }, [dispatch]);

  if (isPreload) {
    return null;
  }
  return (
    <>
      <header>
        <Navigation />
        <Loading />
      </header>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/leaderboard" element={<Leaderboards />} />
        <Route path="/add-thread" element={<AddThread />} />
        <Route path="/threads/:threadId" element={<ThreadDetail />} />
      </Routes>
    </>
  );
}

export default App;
