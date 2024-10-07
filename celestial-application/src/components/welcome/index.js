
export default function Welcome({user, className}) {
  return (
    <div className={`${className} flex flex-col bg-[#ffffff] justify-center`}>
      <h1 className='text-7xl font-extrabold text-center mt-15 text-[#ef7d00]'><b>Bem vindo!</b></h1>
      <img src='/welcome.png' alt='' />
    </div>
  );
}