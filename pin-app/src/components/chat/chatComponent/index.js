import Chat from '@/components/chat/index.js';
import ChatContactInfos from '@/components/chatContactInfos/index.js';

export default function ChatComponent({ className, selectedContact, lastMessage, clearContact }) {

  const handleLastMessage = (message) => {
    lastMessage(message);
  };

  return(
    <div className="flex flex-col">
      <ChatContactInfos contact={selectedContact} className={className} clearContact={clearContact} />
      <Chat selectedContact={selectedContact} className={className} lastMessage={handleLastMessage} />
    </div>

  );
}
