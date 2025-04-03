import Loading from '@/shared/components/icons/loading';

export default function LoadingLayout(){
  return(
    <div className="absolute inset-0 flex items-center justify-center bg-[#464b5b] bg-opacity-75">
      <Loading className="h-6 w-6" />
    </div>
  );
}

