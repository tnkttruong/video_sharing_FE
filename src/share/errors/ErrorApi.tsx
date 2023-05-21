import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from '../partials/Modal';

import { clearError } from './error.actions';
import './error.scss';

export enum ERROR_TYPE {
  disabled = 'disabled'
}

export const ErrorApi = () => {
  const dispatch = useDispatch();

  const error = useSelector((state: any) => state.errorReducer.error);
  console.log('error ', error);

  const onCloseModalErr = () => {
    dispatch(clearError());
  };

  if (!error) {
    return (
      <Modal
        error={true}
        needToShow={error !== null}
        title={'A communication error has occurred'}
        subTitle={'Please try again later'}
        cancelFunc={() => onCloseModalErr()}
      />
    );
  }

  if (error.response)
    return (
      <Modal
        error={true}
        needToShow={error !== null}
        title=""
        subTitle={`${error?.response?.data?.error || ''}`}
        cancelFunc={() => onCloseModalErr()}
      />
    );

  return (
    <Modal
      error={true}
      needToShow={error !== null}
      title={`${error?.status || error}`}
      subTitle={`${error?.statusText || ''}`}
      cancelFunc={() => onCloseModalErr()}
      type={error?.type}
    />
  );
}
