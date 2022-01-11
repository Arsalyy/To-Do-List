import React from 'react';

const InputField = ({ placeholder, onChange, type, id }) => {

    if(!type){
        type = "text"
    }

    if(!id){
        id = "userInput"
    }

    return (
        <input
            id={id}
            type={type}
            className="form-control"
            placeholder={placeholder}
            onChange={onChange}
        />
    );
}

export default InputField;