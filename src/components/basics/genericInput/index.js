import React from 'react';

export default function GenericInput({ inputPlaceholder, className, onChange, value }) {
  return (
    <textarea
      className={`scrollbar-custom break-words p-4 text-sm rounded-3xl bg-[#292e3d] placeholder-gray-400 text-white resize-none overflow-auto ${className}`}
      value={value}
      onChange={onChange}
      placeholder={inputPlaceholder}
      maxLength={500}
      required
    />
  );
}
