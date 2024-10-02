import ContactInfos from './destinationUserInfos';
import Observations from './observations';

export default function RightAside({contact}) {
  return (
    <div className="bg-[#373d4c] h-screen flex flex-col w-[24vw] items-center overflow-auto scrollbar-custom">
      <img className='rounded-full w-[200px] mt-6' src='https://cdn-icons-png.flaticon.com/512/4645/4645949.png' />
      <h1 className="text-3xl break-words font-bold mx-1 text-gray-50 text-center pt-5">{contact.name}</h1>
      {/*<ContactInfos contact={contact} />*/}
      <Observations />
    </div>
  );
}
