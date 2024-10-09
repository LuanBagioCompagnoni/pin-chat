export default function GenericInput({ type = 'text', className, inputClassName, labelClasName, onChange, value, label, }) {
  return (
    <div className={className}>
      <div className="relative">
        <input
          type={type}
          id="message"
          className={`${inputClassName} w-full py-2 ps-4 h-14 pe-[12%] break-words text-sm rounded-3xl bg-[#FCFCFC] border-2 border-gray-300 placeholder-transparent text-[#2E2E2E] focus:border-[#8957c3] focus:border-2 focus:outline-none peer`}
          placeholder=" "
          onChange={onChange}
          value={value}
          required
        />
        <label
          htmlFor="message"
          className={`${labelClasName} mb-2 absolute left-4 z-10 origin-[0] top-1/2 transform text-sm text-[#2E2E2E] duration-300 
            ${value ? 'top-2 -translate-y-2 scale-75' : 'top-1/2 -translate-y-1/2 scale-100'}
            peer-focus:top-2 peer-focus:-translate-y-2 peer-focus:scale-75 peer-focus:text-[#6c2db4]`}
        >
          {label}
        </label>
      </div>
    </div>
  );
}

import React from 'react';
