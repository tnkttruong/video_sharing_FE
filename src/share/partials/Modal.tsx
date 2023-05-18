import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearError } from '../errors/error.actions';
import { ERROR_TYPE } from '../errors/ErrorApi';

interface ModalProps {
    error?: boolean;
    needToShow: boolean;
    title: string;
    subTitle?: string;
    btn?: {
        submit?: string;
        cancel?: string;
    };
    confirmFunc?: () => void;
    cancelFunc?: () => void;
    type?: string;
}
export const Modal = (props: ModalProps) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { error, needToShow, title, subTitle, btn, confirmFunc, cancelFunc, type } = props;

    if (!needToShow) {
        return null;
    }

    if (type === ERROR_TYPE.disabled) {
        return (
            <div className="modal-container">
                <div className="modal2 modal-error">
                    <p className="head-title">{title}</p>
                    <p className="sub-tile">{subTitle}</p>
                    <div className='btn-container btn-error-container type-disabled'>
                        <button className="btn-modal btn-cancel btn-upgrade" type="submit" onClick={() => { navigate('/pricing'); dispatch(clearError()); }}>
                            Upgrade
                        </button>
                        <button className="btn-modal btn-cancel" type="submit" onClick={cancelFunc}>
                            OK
                        </button>
                    </div>
                </div>
            </div >
        );
    }

    return (
        <div className="modal-container">
            <div className={error ? "modal2 modal-error" : "modal2"}>
                <p className="head-title">{title}</p>
                <p className="sub-tile">{subTitle}</p>
                <div className={`btn-container ${(error || !btn?.cancel) && 'btn-error-container'}`}>
                    {(btn?.cancel || error) && (
                        <button className="btn-modal btn-cancel" type="submit" onClick={cancelFunc}>
                            {error ? 'OK' : btn?.cancel}
                        </button>
                    )}
                    {!error && (
                        <button className="btn-modal btn-submit" type="submit" onClick={confirmFunc}>
                            {btn?.submit}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};
