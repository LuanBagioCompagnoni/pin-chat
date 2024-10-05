import Chat from '@/components/chat/index.js';
import RightAside from '@/components/rigthAside/index.js';
import {useState} from 'react';

export default function chatGroup({ chatClassName, rigthAsideClassName, selectedContact, lastMessage }) {

  const handleLastMessage = (message) => {
    lastMessage(message);
  };

  return(
    <div className="flex">
      <Chat selectedContact={selectedContact} chatClassName={chatClassName} lastMessage={handleLastMessage} />
      <RightAside contact={selectedContact} rigthAsideClassName={rigthAsideClassName} />
    </div>

  );
}
