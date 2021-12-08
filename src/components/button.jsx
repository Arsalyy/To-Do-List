import React from 'react';

const Button = ({ onClick, text, className }) => {
    return (
        <button
            className={className}
            type="button"
            onClick={onClick}
        >
            {text}
        </button>
    );
}

export default Button;