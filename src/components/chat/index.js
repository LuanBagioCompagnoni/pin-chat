import { useState } from 'react';
import MessageInput from '../basics/messageInput';
import Messages from './messages';

export default function chat(){
  const [messages, setMessages] = useState([
    { id: 1, text: 'Olá, tudo bem?', type: 'sent', date: new Date() },
    { id: 2, text: 'Sim, e você?', type: 'received', date: new Date() },
    { id: 3, text: 'Estou bem também!', type: 'sent', date: new Date() },
  ]);
  const [inputValue, setInputValue] = useState('');
  const handleSubmit = (event) => {
    setMessages([...messages, ]);
    
  }; 
  return(
    <div className=" bg-[#464b5b] w-[50vw] border-x border-[#0b111f] relative h-screen ">
      <div className='absolute grid grid-col-1 w-full h-[93%] bottom-gradient-scrollbar'>
        <Messages content={messages}/>
      </div>
      <div class="absolute inset-x-0 bottom-0 my-2 p-2 h-[7%]">
        <MessageInput className='absolute inset-x-0' style={{ height: '100%', overflowY: 'auto', resize: 'none' }} />
      </div>
    </div>
  );
}