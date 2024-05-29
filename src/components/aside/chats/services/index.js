export default function services(){
    return(
        <ul className={`
                flex flex-col gap-5 items-center justify-center
            `}>
                <li className="flex border-y w-full">
                    <a>
                        <h1 className="text-lg font-bold">Client Name</h1>
                        <div className="bg-black rounded">
                            <h2 className="text-xs font-light text-gray-50 m-0.5">Departament name</h2>
                        </div>
                    </a>
                </li>
        </ul>
    )
}