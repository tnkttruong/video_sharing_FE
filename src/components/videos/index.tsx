import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getVideoList, getVideo } from "./video.actions";
import { Modal } from '../../share/partials/Modal';
import './video.scss'
import { db } from "../../core/services/firebase";
import { remove, onValue, ref } from "firebase/database";
let initialState = true;
let unsubscribeConnect:any;
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
  const [notifications, setNotifications] = useState<any[]>([])
  const [listVideos, setListVideos] = useState<any[]>([])
  const loader = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1)
  const { currentUser } = useSelector((state: any) => state.authReducer);
  
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
  const initNotificationConnect = async () => {
    if(unsubscribeConnect) {unsubscribeConnect()}
    unsubscribeConnect = onValue(ref(db, `notifications/${currentUser?.id}`), (snapshot) => {
      const data = snapshot.val();
      if(data){
        if(initialState){
          initialState = false;
        }else{
          setNotifications(prevNotifications => [data, ...prevNotifications]);
          getVideoAndPushToList(data.id)
          setTimeout(() => {
            removeNotification(data);
          }, 5000);
        }
      }
    });
  }
  const closeNotification = (notificationToRemove:any) => {
    removeNotification(notificationToRemove);
  };
  const removeNotification = (notificationToRemove:any) =>{
    setNotifications(prevNotifications => prevNotifications.filter(notification => notification !== notificationToRemove));
  }
  useEffect(() => {
    handleListVideos();
    if(currentUser){initNotificationConnect()}
  }, [])
  useEffect(() => {
    if(!currentUser){
      if(unsubscribeConnect) {unsubscribeConnect()}
    }else{
      initNotificationConnect()
    }
  }, [currentUser])

  return (
    <>
      <div className="notification">
        {notifications.map((notification, index) => (
            <div key={index} className="alert alert-success alert-dismissible" role="alert">
              <span>  {notification.user_email} just share </span><span>  {notification.title}  </span>
              <button type="button" className="btn-close" onClick={() => closeNotification(notification)}></button>
            </div>
        ))}
      </div>
      <h1> Video List </h1>
      {
        listVideos && listVideos.map((item: any) => <Video video={{ ...item }} />)
      }
    </>
  );
};
