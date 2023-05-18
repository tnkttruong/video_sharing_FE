import { all } from 'redux-saga/effects';
import { watchLogin } from '../share/components/header/login.middleware';
import { watchVideo } from '../components/videos/video.middleware';
export default function* appMiddleware() {
    yield all([watchLogin(), watchVideo()]);
}
