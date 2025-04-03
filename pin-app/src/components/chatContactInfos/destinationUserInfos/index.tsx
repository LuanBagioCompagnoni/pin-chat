export default function contactInfos({contact}){
  const date = new Date();
  return(
    <div className="border-y-2 border-gray-50 text-gray-50 border-dashed my-5 w-full text-left space-y-2">
      <div className="m-2 space-y-2">
        <h1>Contato iniciado em {contact?.date ? contact.date : ''}</h1>
      </div>
    </div>
  );
}