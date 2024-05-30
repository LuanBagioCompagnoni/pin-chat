export default function services(){
    return(
        <ul className={`
                flex flex-col gap-5 items-center justify-center
            `}>
                <li className="flex w-full">
                    <a className="hover:bg-purple-900 w-full h-full py-2 cursor-pointer">
                        <h1 className="text-lg font-bold mx-1">Client Name</h1>
                        <div className="flex">
                            <div className="bg-black rounded mx-1">
                                <h2 className="text-xs font-light text-gray-50 px-1 ">Departament name</h2>
                            </div>
                            <div className="bg-orange-300 rounded">
                                <h2 className="text-xs font-light text-gray-50 px-1">Tag name</h2>
                            </div>
                        </div>
                    </a>
                </li>
        </ul>
    )
}