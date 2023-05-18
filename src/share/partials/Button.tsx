import React from 'react';
import { Loading } from './Loading';

interface BtnProps {
    children: JSX.Element | string;
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled: boolean;
    onClick?: () => void;
    isLoading?: boolean;
}

const Button = (props: BtnProps) => {
    const { children, className, type, disabled, onClick, isLoading } = props;

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            return;
        }
    };

    if (isLoading) return (
        <button className={className + " loading"} type={type} disabled={!!disabled} onClick={() => handleClick()}>
            <Loading type="" />
        </button>
    )

    return (
        <button className={className} type={type} disabled={!!disabled} onClick={() => handleClick()}>
            {children}
        </button>
    );
};

export default Button;
