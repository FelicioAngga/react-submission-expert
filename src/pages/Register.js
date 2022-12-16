import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../states/users/action';
import '../styles/Register.css';
import RegisterInput from '../components/RegisterInput';

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <>
      <h1>Register</h1>
      <RegisterInput register={onRegister} />
    </>
  );
}

export default Register;
