import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../states/users/action';
import useInput from '../hooks/useInput';
import '../styles/Register.css';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const onRegister = (e) => {
    e.preventDefault();
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <form onSubmit={(e) => onRegister(e)}>
      <h1>Register</h1>
      <input type="text" placeholder="Name" value={name} onChange={onNameChange} />
      <input type="email" placeholder="Email" value={email} onChange={onEmailChange} />
      <input type="password" placeholder="Password" value={password} onChange={onPasswordChange} />
      <button type="submit" className="btn-register">Register</button>
    </form>
  );
}

export default Register;
