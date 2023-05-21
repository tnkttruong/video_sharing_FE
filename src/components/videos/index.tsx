import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoList, getVideo } from "./video.actions";
import './video.scss'

const Video = ({ video }: any) => {
  const videoUrl = `https://www.youtube.com/embed/${video.video_id}`
  return (
    <>
      <div className="container mt-4 video-item">
        <div className="row">
          <div className="col-md-6">
            <div className="embed-responsive embed-responsive-16by9">
              <iframe width="560" height="315" className="embed-responsive-item" src={videoUrl} allowFullScreen></iframe>
            </div>
          </div>
          <div className="col-md-6 video-information">
            <h2>{ video.title }</h2>
            <p><strong>Shared by:</strong>{video.user.email}</p>
            <p><strong>Description:</strong></p>
            <p>{ video.detail }</p>
          </div>
        </div>
      </div>
    </>)
}

export const Videos = () => {
  const dispatch = useDispatch();
  const [listVideos, setListVideos] = useState<any[]>([])
  const [page, setPage] = useState(1)
  const { latestSharedVideoId } = useSelector((state: any) => state.notificationReducer);
  
  const handleListVideos = () => {
    dispatch(getVideoList({
      data: {page: page},
      successAction: (res: any) => {
        if (res && res.length > 0) {
          setListVideos(prevListVideos => [...prevListVideos, ...res]);
        }
      },
    }))
  }
  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(page + 1)
    }
  }
  useEffect(() => {
    handleListVideos();
  }, [page])
  useEffect(() => {
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [listVideos])

  const getVideoAndPushToList = (videoId: number) => {
    dispatch(getVideo({
      videoId: videoId,
      successAction: (res: any) => {
        setListVideos(prevListVideos => [res, ...prevListVideos]);
      },
    }))
  }
  useEffect(() => {
    if(latestSharedVideoId){getVideoAndPushToList(latestSharedVideoId);}
  }, [latestSharedVideoId])
  return (
    <>
      <h1> Video List </h1>
      {
        listVideos && listVideos.map((item: any) => <Video video={{ ...item }} />)
      }
    </>
  );
};
