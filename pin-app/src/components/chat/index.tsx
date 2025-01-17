import {useState} from 'react';

import MessageInput from '../basics/messageInput';

import Messages from './messages/index';

import {useAuth} from '@/context/AuthContext';
import { useSocket } from '@/services/socket.ts';

interface chatProps {
  selectedContact: any,
  className?: string,
}

export default function Chat({ selectedContact, className }) {
  const { user, token } = useAuth();
  const { socket } = useSocket(token);
  const [inputMessage, setInputMessage] = useState('');

  const sendMessage = (event) => {
    event.preventDefault();

    let messageData = {
      originUserId: user._id,
      destinationUserId: selectedContact._id,
      type: 'text',
      content: inputMessage,
      date: new Date(),
      seen: false,
    };

    if(inputMessage){
      socket.emit('sendMessage', { messageData, room: localStorage.getItem('currentRoom') });
      socket.emit('typing', false);
      setInputMessage('');
    }
  };

  const handleInputChange = (event) => {
    socket.emit('typing', true);
    setInputMessage(event.target.value);
  };
  return (
    <div className={`${className} relative h-[93vh] bg-[#F8F8F8]`}>
      <div className="absolute inset-0 bg-[url('/chat-bg.jpg')] opacity-10"></div>

      <div className="absolute grid grid-col-1 w-full h-[93%]">
        <Messages selectedContact={selectedContact}/>
      </div>
      <div className="absolute inset-x-0 bottom-0 my-2 p-2 h-[7%]">
        <MessageInput
          selectedContact={selectedContact}
          onSubmit={sendMessage}
          value={inputMessage}
          onChange={handleInputChange}
          className="absolute inset-x-0"
          style={{height: '100%', overflowY: 'auto', resize: 'none'}}
        />
      </div>
    </div>
  );
}
