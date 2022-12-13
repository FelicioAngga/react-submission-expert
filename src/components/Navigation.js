import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { asyncUnsetAuthUser } from '../states/authUser/action';
import '../styles/Navigation.css';

function Navigation() {
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states);

  const onLogout = () => {
    dispatch(asyncUnsetAuthUser());
  };

  return (
    <nav className="nav">
      { authUser
        ? <button type="button" className="btn user-button" onClick={onLogout}>Logout</button> : (
          <div className="action">
            <Link to="/login"><button type="button" className="btn user-button">Login</button></Link>
            <Link to="/register"><button type="button" className="btn user-button">Register</button></Link>
          </div>
        )}
      <div className="menu">
        <Link to="/" className="menu-link">
          <button type="button" className="btn menu-button thread">Threads</button>
        </Link>
        <Link to="/leaderboard" className="menu-link">
          <button type="button" className="btn menu-button leaderboard">Leaderboard</button>
        </Link>
      </div>
    </nav>
  );
}

export default Navigation;
