import { useState } from 'react';
import MessageInput from '../basics/messageInput';
import Messages from './messages';

export default function Chat(){
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default form submission behavior
    setMessages([...messages, { id: messages.length + 1, text: inputValue, type: 'invite', date: new Date() }]);
    setInputValue(''); // Clear the input field after submitting
  }; 

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return(
    <div className="bg-[#464b5b] w-[50vw] border-x border-[#0b111f] relative h-screen">
      <div className='absolute grid grid-col-1 w-full h-[93%] bottom-gradient-scrollbar'>
        <Messages content={messages}/>
      </div>
      <div className="absolute inset-x-0 bottom-0 my-2 p-2 h-[7%]">
        <MessageInput 
          onSubmit={handleSubmit} 
          value={inputValue} 
          onChange={handleInputChange} 
          className='absolute inset-x-0' 
          style={{ height: '100%', overflowY: 'auto', resize: 'none' }} 
        />
      </div>
    </div>
  );
}
