import MessageInput from '../basics/messageInput'
import Messages from './messages'

export default function chat(){
    return(
        <div className=" bg-[#464b5b] w-[50vw] border-x border-[#0b111f] relative h-screen ">
            <div className='absolute grid grid-col-1 overflow-auto w-full h-[93%] bottom-gradient-scrollbar'>
                <Messages />
            </div>
            <div class="absolute inset-x-0 bottom-0 p-2 h-[7%]">
                <MessageInput className='absolute inset-x-0 bottom-0' />
            </div>
        </div>
    )
}