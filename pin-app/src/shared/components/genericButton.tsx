import cn from '@/shared/utils/cn';

interface genericButtonProps {
  buttonName?: string;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
}

export default function genericButton({buttonName, className, type = 'submit', disabled}: genericButtonProps){
  return(
    <button type={type} className={cn('font-medium bg-[#581c87] md:w-[25%] hover:bg-[#7e22ce] rounded-3xl text-md px-3', className)} disabled={disabled}>
      {buttonName}
    </button>
  );
}