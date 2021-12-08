import React from 'react';

const InputField = ({ placeholder, onChange }) => {
    return (
        <input
            id="userInput"
            type="text"
            className="form-control"
            placeholder={placeholder}
            onChange={onChange}
        />
    );
}

export default InputField;