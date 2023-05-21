import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorApi } from './ErrorApi';
import { clearError } from './error.actions';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

jest.mock('./error.actions', () => ({
  clearError: jest.fn()
}));

describe('ErrorApi', () => {
  beforeEach(() => {
    (useDispatch as jest.Mock).mockReturnValue(jest.fn());
    (useSelector as jest.Mock<any>).mockReturnValue(null);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders no error message when error is null', () => {
    render(<ErrorApi />);

    expect(screen.queryByText(/communication error/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/try again later/i)).not.toBeInTheDocument();
  });


  it('renders specific error message when error.response exists', () => {
    (useSelector as jest.Mock).mockReturnValue({
      response: {
        data: {
          error: 'Some error message'
        }
      }
    });

    render(<ErrorApi />);

    expect(screen.getByText(/some error message/i)).toBeInTheDocument();
  });
});
