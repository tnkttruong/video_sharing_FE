import React from 'react';
import { Provider } from 'react-redux';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store';
import { Header } from './index';
import { MemoryRouter } from 'react-router-dom';

const mockStore = configureStore([]);

describe('<Header />', () => {
  it('renders welcome message, Share a movie link, and Logout button when user is logged in', () => {
    const store = mockStore({
      authReducer: {
        currentUser: { email: 'test@test.com', id: 1 },
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Wellcome/i)).toBeInTheDocument();
    expect(screen.getByText(/test@test.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Share a movie/i)).toBeInTheDocument();
    expect(screen.getByText(/Logout/i)).toBeInTheDocument();
  });

  it('renders login form when user is not logged in', () => {
    const store = mockStore({
      authReducer: {
        currentUser: null,
      },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );


    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Login \/ Register/i)).toBeInTheDocument();
  });

  it('renders login form when user logs out', async () => {
    let store = mockStore({
      authReducer: {
        currentUser: { email: 'test@test.com', id: 1 },
      },
    });

    const { rerender } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText(/Logout/i));
    
    store = mockStore({
      authReducer: {
        currentUser: null,
      },
    });

    rerender(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByText(/Login \/ Register/i)).toBeInTheDocument();
  });


  it('allows user to login with valid credentials', async () => {
    let store = mockStore({
      authReducer: {
        currentUser: null,
      },
    });

    const { rerender } = render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.input(screen.getByPlaceholderText(/Email/i), {
      target: { value: 'test@test.com' },
    });

    fireEvent.input(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'testpassword' },
    });

    fireEvent.click(screen.getByText(/Login \/ Register/i));

    store = mockStore({
      authReducer: {
        currentUser: { email: 'test@test.com', id: 1 },
      },
    });

    rerender(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Logout/i)).toBeInTheDocument();
    });
  });

});
