import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RegisterInput from './RegisterInput';

describe('Register Input', () => {
  it('should handle name typing correctly', () => {
    render(<RegisterInput register={() => {}} />);

    const nameInput = screen.getByPlaceholderText('Name');
    userEvent.type(nameInput, 'namaTes');
    expect(nameInput).toHaveValue('namaTes');
  });

  it('should handle email typing correctly', () => {
    render(<RegisterInput register={() => {}} />);

    const emailInput = screen.getByPlaceholderText('Email');
    userEvent.type(emailInput, 'emailtest@gmail.com');
    expect(emailInput).toHaveValue('emailtest@gmail.com');
  });

  it('should handle password typing correctly', () => {
    render(<RegisterInput register={() => {}} />);

    const passwordInput = screen.getByPlaceholderText('Password');
    userEvent.type(passwordInput, 'qweqwe');
    expect(passwordInput).toHaveValue('qweqwe');
  });

  it('should call register function when register button is clicked', () => {
    const mockRegister = jest.fn();
    render(<RegisterInput register={mockRegister} />);

    const nameInput = screen.getByPlaceholderText('Name');
    userEvent.type(nameInput, 'namaTes');
    const emailInput = screen.getByPlaceholderText('Email');
    userEvent.type(emailInput, 'emailtest@gmail.com');
    const passwordInput = screen.getByPlaceholderText('Password');
    userEvent.type(passwordInput, 'passwordtest');
    const loginButton = screen.getByRole('button', { name: 'Register' });
    userEvent.click(loginButton);

    expect(mockRegister).toBeCalledWith({
      email: 'emailtest@gmail.com',
      name: 'namaTes',
      password: 'passwordtest',
    });
  });
});
