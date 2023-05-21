import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLatestSharedVideoId } from "./notification.actions";
import { db } from "../../core/services/firebase";
import { onValue, ref } from "firebase/database";
import './notification.scss'
let initialState = true;
let unsubscribeConnect:any;

export const Notifications = () => {
	const [notifications, setNotifications] = useState<any[]>([])
	const { currentUser } = useSelector((state: any) => state.authReducer);
	const dispatch = useDispatch();
  const initNotificationConnect = async () => {
    if(unsubscribeConnect) {unsubscribeConnect()}
    unsubscribeConnect = onValue(ref(db, `notifications/${currentUser?.id}`), (snapshot) => {
      const data = snapshot.val();
      if(data){
        if(initialState){
          initialState = false;
        }else{
          setNotifications(prevNotifications => [data, ...prevNotifications]);
          dispatch(setLatestSharedVideoId(data.id))
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
    </>
  );
};