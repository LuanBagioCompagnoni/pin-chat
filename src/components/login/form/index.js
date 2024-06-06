import GenericButton from "@/components/basics/buttons/genericButton.js";

export default function Form(){
    return (
        <div className="w-full h-full bg-[#292e3d] items-center justify-center flex flex-col">
            <form className="w-[30%] h-[50%] bg-[#464b5b] rounded-xl border border-gray-300 flex flex-col items-center px-4 justify-center relative space-y-16">
                <h1 className="text-gray-50 font-extrabold text-5xl py-4 absolute top-4">Login</h1>
                <div className="w-full ">
                    <input placeholder='E-mail' className="w-full h-auto overflow-hidden break-words p-4 text-sm rounded-3xl bg-[#292e3d] placeholder-gray-400 text-white resize-none"/>
                </div>
                <div className="w-full ">
                    <input placeholder='Senha' className="w-full h-auto overflow-hidden break-words p-4 text-sm rounded-3xl bg-[#292e3d] placeholder-gray-400 text-white resize-none"/>
                </div>
                <GenericButton className='w-[50%] h-auto p-4' nameButton='Entrar' />
            </form>
        </div>
    )
}