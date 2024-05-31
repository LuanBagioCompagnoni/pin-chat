import MessageInput from '../basics/messageInput'

export default function chat(){
    return(
        <div className=" bg-[#464b5b] w-[50vw] border-x border-[#0b111f] relative min-h-screen">
            <div class="p-4">
            </div>
            <div class="absolute inset-x-0 bottom-0 p-2">
                <MessageInput className='absolute inset-x-0 bottom-0' />
            </div>
        </div>
    )
}