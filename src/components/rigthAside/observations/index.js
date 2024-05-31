export default function Observations(){
    const date = new Date()
    return(
        <div className="justify-center w-full items-center text-gray-50 flex flex-col space-y-5 relative">
            <h1 className="font-extrabold text-xl">Observations</h1>
            <div className="w-[80%] h-28 bg-[#464b5b] items-center justify-center rounded-xl border border-gray-400 text-justify">
                <h1 className="m-2 break-words h1-custom">Exemplo de observação grande que pode exceder o tamanho do campo de observação, deve quebrar linha e adicionar reticências ao final do texto</h1>
                <h1 className="m-2 break-words h1-custom text-center font-light text-sm">Luan Compagnoni - {date.toLocaleDateString()}</h1>
            </div>
            <div>
                <button type="button" class="text-white bg-purple-900 hover:bg-purple-700 focus:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Nova Observação</button>
                <button type="button" class="text-white bg-gray-500 hover:bg-gray-400 focus:bg-gray-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 ">Ver Observações</button>
            </div>
        </div>
    )
}