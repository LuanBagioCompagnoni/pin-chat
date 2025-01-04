import React from 'react';

import cn from '../../shared/utils/cn';

interface FormProps {
    className?: string;
    handleSubmit?: (event: React.FormEvent) => Promise<void>;
    children?: React.ReactNode;
}

export default function Form({ className, handleSubmit, children }: FormProps) {
  return (
    <form
      className={cn(
        'w-[85%] h-[95%] sm:h-[85%] sm:w-[75%] md:h-[75%] md:w-[65%] rounded-3xl bg-purple-500 flex flex-col items-center px-4 justify-center relative space-y-10 p-8 bg-opacity-25 backdrop-blur-2xl border-2 border-purple-300',
        className
      )}
      onSubmit={handleSubmit}
    >{children}</form>
  );
}
