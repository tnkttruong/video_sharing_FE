import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux';
import { NewVideo } from './new';
import { createVideo } from './video.actions';
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
const middleware = createSagaMiddleware();
import appReducer from "../../app/reducers";
import appMiddleware from "../../app/middlewares";
const store = createStore(appReducer, applyMiddleware(middleware));
jest.mock('./video.actions', () => ({
  createVideo: jest.fn().mockImplementation(() => () => {}),
}));

describe('NewVideo', () => {
  afterEach(() => {
    cleanup()
    jest.clearAllMocks();
  });
  
  it('renders without crashing', () => {
    render(
      <Provider store={store}>
        <NewVideo />
      </Provider>
    );

    const shareMovieHeading = screen.getByText(/Share your Youtube movie/i);
    expect(shareMovieHeading).toBeInTheDocument();
  });

  it('shows error message when url is not provided', async () => {
    render(
      <Provider store={store}>
        <NewVideo />
      </Provider>
    );

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    const errorMessage = await screen.findByText(/Please input Url/i);
    expect(errorMessage).toBeInTheDocument();
  });
});
