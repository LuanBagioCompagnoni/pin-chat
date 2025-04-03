import React from 'react';

import cn from '@/shared/utils/cn';

interface authFormInputProps {
    className?: string;
    inputClassName?: string;
    type?: string;
    placeholder?: string;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function AuthFormInput({ className, inputClassName, type, placeholder, value, onChange, onBlur }: authFormInputProps) {
  return (
    <div className={cn('flex items-center border-b py-2', className)}>
      <input
        className={cn('appearance-none bg-transparent border-none w-full mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-gray-50', inputClassName)}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
      />
    </div>
  );
}
