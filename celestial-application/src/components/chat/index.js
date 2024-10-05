import {useEffect, useState} from 'react';
import MessageInput from '../basics/messageInput';
import Messages from './messages';
import { useSocket } from '@/services/socket.js';
import {useAuth} from '@/context/AuthContext.js';

export default function Chat({ selectedContact, chatClassName }) {
  const { user, token } = useAuth();
  const { socket } = useSocket(token);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = (event) => {
    event.preventDefault();

    let newMessage = {
      originUserId: user._id,
      destinationUserId: selectedContact._id,
      type: 'text',
      content: inputMessage,
      date: new Date()
    };

    if(inputMessage){
      socket.emit('sendMessage', newMessage);
      socket.emit('typing', false);
      setInputMessage('');
    }
  };

  const handleInputChange = (event) => {
    socket.emit('typing', true);
    setInputMessage(event.target.value);
  };
  return (
    <div className={`${chatClassName} bg-[#464b5b] relative h-screen`}>
      <div className='absolute grid grid-col-1 w-full h-[93%] bottom-gradient-scrollbar'>
        <Messages selectedContact={selectedContact} />
      </div>
      <div className="absolute inset-x-0 bottom-0 my-2 p-2 h-[7%]">
        <MessageInput
          selectedContact={selectedContact}
          onSubmit={sendMessage}
          value={inputMessage}
          onChange={handleInputChange}
          className='absolute inset-x-0'
          style={{ height: '100%', overflowY: 'auto', resize: 'none' }}
        />
      </div>
    </div>
  );
}
