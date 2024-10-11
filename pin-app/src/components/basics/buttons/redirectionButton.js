import React from 'react';
import { PencilAltIcon } from '@heroicons/react/solid';

const RedirectButton = ({ onClick, text, className, color = 'text-white', size = 'h-5 w-5'}) => {
  return (
    <button
      onClick={onClick}
      className={`font-medium rounded-lg text-sm ${className, color}`}
    >
      <span className="mr-2">{text}</span>
      <PencilAltIcon className={`${size}`} />
    </button>
  );
};

export default RedirectButton;
