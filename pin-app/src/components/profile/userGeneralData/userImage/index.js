export default function userImage(){
  return (
    <div
      className='flex flex-col justify-center items-center mt-5 rounded-full relative cursor-pointer'>
      <img
        className='rounded-full h-full w-full opacity-100 transition-opacity duration-300 ease-in-out hover:opacity-25'
        src='https://suporte.ixcsoft.com.br/atendente/services/download/thumb/65fde58731fc11e41b6b12bf?signature=e5561e3b6a2cbd37b4f330861d2c71c2f93e513b00fb3e9a31eb1f7da86e55ab'
        alt='UserImage'
      />
      <div
        className='absolute inset-0 flex justify-center items-center bg-[#8957c3] rounded-full bg-opacity-40 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 z-10'>
        <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor"
          className='text-[#EF7D00]' viewBox="0 0 16 16">
          <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
          <path
            d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0"/>
        </svg>
      </div>
    </div>
  );
}