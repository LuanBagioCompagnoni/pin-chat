export default function services(){
    return(
        <ul className={`
                flex flex-col gap-5 items-center justify-center
            `}>
                <li className="flex w-full">
                    <a className="hover:bg-purple-900 w-full h-full py-2 cursor-pointer">
                        <h1 className="text-lg font-bold mx-1 text-gray-50">Cliente</h1>
                        <div className="flex">
                            <div className="bg-black rounded-3xl mx-1">
                                <h2 className="text-xs font-light text-gray-50 px-2 p-0.5">Departamento</h2>
                            </div>
                            <div className="bg-orange-300 rounded-3xl">
                                <h2 className="text-xs font-light text-gray-50 px-2 p-0.5">Etiqueta</h2>
                            </div>
                        </div>
                    </a>
                </li>
        </ul>
    )
}