import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { asyncSetAuthUser } from '../states/authUser/action';
import '../styles/Login.css';
import LoginInput from '../components/LoginInput';

function Login() {
  const { authUser } = useSelector((states) => states);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  useEffect(() => {
    if (authUser) navigate('/');
  }, [authUser, navigate]);

  return (
    <div className="login">
      <h1>Login</h1>
      <LoginInput login={onLogin} />
      <p>
        Belum punya akun?
        <Link to="/register">Daftar disini</Link>
      </p>
    </div>
  );
}

export default Login;
