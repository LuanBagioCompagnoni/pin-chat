import {useState} from 'react';

import MessageInput from '../../../../components/basics/messageInput';

import Messages from './messages';

import {useAuth} from '@/context/AuthContext';
import { useSocket } from '@/services/socket';

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
        />
      </div>
    </div>
  );
}
