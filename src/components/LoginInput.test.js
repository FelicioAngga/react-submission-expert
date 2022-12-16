import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './LoginInput';
import '@testing-library/jest-dom';

describe('Login Input', () => {
  it('should handle email typing correctly', () => {
    render(<LoginInput login={() => {}} />);

    const emailInput = screen.getByPlaceholderText('Email');
    userEvent.type(emailInput, 'emailtest@gmail.com');
    expect(emailInput).toHaveValue('emailtest@gmail.com');
  });

  it('should handle password typing correctly', () => {
    render(<LoginInput login={() => {}} />);

    const passwordInput = screen.getByPlaceholderText('Password');
    userEvent.type(passwordInput, 'qweqwe');
    expect(passwordInput).toHaveValue('qweqwe');
  });

  it('should call login function when login button is clicked', () => {
    const mockLogin = jest.fn();
    render(<LoginInput login={mockLogin} />);

    const emailInput = screen.getByPlaceholderText('Email');
    userEvent.type(emailInput, 'emailtest@gmail.com');
    const passwordInput = screen.getByPlaceholderText('Password');
    userEvent.type(passwordInput, 'passwordtest');
    const loginButton = screen.getByRole('button', { name: 'Login' });
    userEvent.click(loginButton);

    expect(mockLogin).toBeCalledWith({
      email: 'emailtest@gmail.com',
      password: 'passwordtest',
    });
  });
});
