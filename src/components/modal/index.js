import React from 'react';

export default function Modal({ isVisible, onClose, children, zIndex = 50 }) {
  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-${zIndex} flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm`}>
      <div className="bg-[#464b5b] w-auto h-auto rounded-lg p-4 shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          &#x2715; {/* X icon */}
        </button>
        {children}
      </div>
    </div>
  );
}
