import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoList } from "./video.actions";
import './video.scss'

const Video = ({ video }: any) => {
  const [showToggle, setShowToggle] = useState(false);
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
  const [listVideos, setListVideos] = useState<any>();
  const handleListVideos = () => {
    dispatch(getVideoList({
      successAction: (res: any) => {
        if (res && res.length > 0) {
          setListVideos(res)
        }
      },
    }))
  }

  useEffect(() => {
    handleListVideos();
  }, [])



  return (
    <>
      <h1> Video List </h1>
      {
        listVideos && listVideos.map((item: any) => <Video video={{ ...item }} />)
      }
    </>
  );
};
