import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/action';
import useInput from '../hooks/useInput';
import '../styles/Login.css';

function Login() {
  const { authUser } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onLogin = (e) => {
    e.preventDefault();
    dispatch(asyncSetAuthUser({ email, password }));
  };

  useEffect(() => {
    if (authUser) navigate('/');
  }, [authUser, navigate]);

  return (
    <form onSubmit={(e) => onLogin(e)}>
      <h1>Login</h1>
      <input type="email" placeholder="Email" value={email} onChange={onEmailChange} />
      <input type="password" placeholder="Password" value={password} onChange={onPasswordChange} />
      <button type="submit" className="btn-login">Login</button>
      <p>
        Belum punya akun?
        <Link to="/register" className="register">Daftar disini</Link>
      </p>
    </form>
  );
}

export default Login;
