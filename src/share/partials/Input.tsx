/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

interface InputProps {
    type: any;
    name: string;
    register: any;
    control?: any;
    errors?: any;
    className?: string;
    placeholder?: string;
    showError?: boolean;
    prefix?: string;
    note?: string;
    warning?: string;
    onChange?: (e: any) => void;
    setError?: any;
    maxLength?: number;
    numbericOnly?: boolean;
    inputMode?: any;
}

export const Input = (props: InputProps) => {
    const handleChange = (e: any) => {
        if (props.onChange) {
            props.onChange(e);
        } else {
            return;
        }
    };

    return (
        <>
            <input
                className={`${props.className ? props.className : ''} ${props.errors && props.errors[props.name] ? 'form-controls-error' : ''
                    }`}
                type={props.type}
                id={props.name}
                name={props.name}
                placeholder={props.placeholder}
                ref={props.register}
                inputMode={props.inputMode}
                {...(props.maxLength ? { maxLength: props.maxLength } : {})}
                onChange={handleChange}
            />
            {props?.warning && <span className="text-note txt-warning-code">{props.warning}</span>}
            {props?.note && <span className="text-note">{props.note}</span>}
            {props.errors && props?.errors[props.name] && props?.showError && (
                <span className="text-error">{props?.errors[props.name].message}</span>
            )}
        </>
    );
};

Input.defaultProps = {
    showError: true,
    numbericOnly: false,
    radioType: false,
    onChange: (e: any) => null,
};
