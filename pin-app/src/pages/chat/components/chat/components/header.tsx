export default function ChatContactInfos({contact, className, clearContact}) {
  const formatName = () => {
    const name = contact?.name;

    const prepositions = ['de', 'da', 'do', 'das', 'dos'];

    const nameParts = name.split(' ');

    const formatedName = nameParts.map(part => {
      if (prepositions.includes(part.toLowerCase())) {
        return part.toLowerCase();
      }
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    });

    return formatedName.join(' ');
  };
  return (
    <div
      className={` ${className} h-[7vh] bg-[#FCFCFC] flex flex-row items-center border-b-2 border-gray-200 relative`}>
      <img className="rounded-full ml-2 w-[45px]" src="https://cdn-icons-png.flaticon.com/512/4645/4645949.png"/>
      <div className="flex flex-col mb-1">
        <h1 className="text-xl break-words font-light ml-6 mx-1 text-gray-800 text-center">{formatName()}</h1>
        {contact?.online ?
          <div className="flex">
            <div className="rounded-full bg-[#66BD71] ml-6 text-xs mt-1 w-3.5 h-3.5"></div>
            <h1 className="text-xs mt-1 ml-1 text-gray-800 font-extralight">Online!</h1>
          </div>
          :
          <div className="flex">
            <div className="rounded-full bg-[#E57370] ml-6 text-xs mt-1 w-3.5 h-3.5"></div>
            <h1 className="text-xs mt-1 ml-1 text-gray-800">Offline!</h1>
          </div>
        }
      </div>
      <a className="text-[#ef7d00] absolute right-7 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={clearContact}>
        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-x-lg"
          viewBox="0 0 16 16">
          <path
            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>
        </svg>
      </a>
    </div>
  );
}
