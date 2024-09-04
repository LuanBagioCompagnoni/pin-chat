export default function serviceInfos(){
  const date = new Date();
  return(
    <div className="border-y-2 border-gray-50 text-gray-50 border-dashed my-5 w-full text-left space-y-2">
      <div className="m-2 space-y-2">
        <h1>Atendimento aberto em data </h1>
        <h1>Tempo total de atendimento - tempo do atendimento</h1>
        <h1>Protocolo: </h1>
      </div>
    </div>
  );
}