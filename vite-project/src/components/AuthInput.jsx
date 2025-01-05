import React from 'react';

const AuthInput = ({label, type, name, value, error, onChange, onBlur, touched, required, autoFocus}) => {
    return (
        <div>
            <label>
                {label}{required && (<span>*</span>)}
            </label>
            <div>
                <input type={type} name={name} value={value} onChange={onChange} onBlur={onBlur} autoFocus={autoFocus}/>
                {touched && error && <span>{error}</span>}
            </div>
        </div>
    );
};

export default AuthInput;