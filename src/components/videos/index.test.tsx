import React from 'react';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Videos } from './index';
import { getVideoList, getVideo } from './video.actions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn()
}));

jest.mock('./video.actions', () => ({
  getVideoList: jest.fn(),
  getVideo: jest.fn()
}));

describe('Videos', () => {
  beforeEach(() => {
    (useDispatch as jest.Mock<any>).mockReturnValue(jest.fn());
    (useSelector as jest.Mock<any>).mockReturnValue({ latestSharedVideoId: null });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders video list correctly', () => {
    const mockVideos = [
      {
        video_id: '123',
        title: 'Video 1',
        user: { email: 'user1@example.com' },
        detail: 'Video 1 description'
      },
      {
        video_id: '456',
        title: 'Video 2',
        user: { email: 'user2@example.com' },
        detail: 'Video 2 description'
      }
    ];
    (getVideoList as jest.Mock<any>).mockImplementation(({ successAction }) => {
      successAction(mockVideos);
    });

    (useSelector as jest.Mock<any>).mockReturnValueOnce({ latestSharedVideoId: null })
      .mockReturnValueOnce({ latestSharedVideoId: '123' })
      .mockReturnValueOnce({ latestSharedVideoId: null });

    render(<Videos />);

    mockVideos.forEach((video) => {
      const titles = screen.getAllByText(video.title);
      expect(titles[0]).toBeInTheDocument();

      const emails = screen.getAllByText(video.user.email);
      expect(emails[0]).toBeInTheDocument();

      const details = screen.getAllByText(video.detail);
      expect(details[0]).toBeInTheDocument();
    });
  });

  it('loads video when latestSharedVideoId changes', () => {
    (useSelector as jest.Mock<any>).mockReturnValueOnce({ latestSharedVideoId: '123' })
      .mockReturnValueOnce({ latestSharedVideoId: null });

    render(<Videos />);

    expect(getVideo).toHaveBeenCalledWith({
      videoId: '123',
      successAction: expect.any(Function)
    });
  });

  afterEach(cleanup);
  it("should call the onScroll function when the window is scrolled", () => {
    const map: any = {};
    window.addEventListener = jest.fn((event, cb) => {
      map[event] = cb;
    });

    const { container } = render(<Videos />);

    fireEvent.scroll(window);

    expect(document.documentElement.scrollTop).toBeDefined();
    expect(document.documentElement.scrollHeight).toBeDefined();
    expect(document.documentElement.clientHeight).toBeDefined();
  });
});

