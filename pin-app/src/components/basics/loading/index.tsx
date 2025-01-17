import LoadingIcon from '@/components/basics/loading/loadingIcon';

export default function Loading(){
  return(
    <div className="absolute inset-0 flex items-center justify-center bg-[#464b5b] bg-opacity-75">
      <LoadingIcon className="h-6 w-6" />
    </div>
  );
}

