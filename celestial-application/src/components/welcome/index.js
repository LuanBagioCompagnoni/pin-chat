
export default function Welcome({user, className}) {
  return (
    <div className={`${className} flex bg-[#464b5b] justify-center`}>
      <h1 className='text-7xl font-extrabold text-center mt-20'><b>Bem vindo!</b></h1>
      <h1 className='absolute bottom-5 text-center font-bold'><b>{user?.name }</b></h1>
    </div>
  );
}